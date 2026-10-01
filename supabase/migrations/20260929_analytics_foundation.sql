-- ==============================================================================
-- FASE 1: ANALYTICS & ATTRIBUTION FOUNDATION (STANDALONE MIGRATION)
-- Christian Martins Web Studio & CRM
-- ==============================================================================

-- 1. EXTENSÕES
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. TABELA DE SESSÕES ANALÍTICAS (analytics_sessions)
CREATE TABLE IF NOT EXISTS public.analytics_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    visitor_id TEXT NOT NULL,
    session_start TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    session_last_seen TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    landing_page TEXT NOT NULL,
    referrer TEXT,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    utm_content TEXT,
    utm_term TEXT,
    gclid TEXT,
    fbclid TEXT,
    ttclid TEXT,
    language TEXT,
    screen_resolution TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_analytics_sessions_visitor ON public.analytics_sessions (visitor_id);
CREATE INDEX IF NOT EXISTS idx_analytics_sessions_created_at ON public.analytics_sessions (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_sessions_utm_source ON public.analytics_sessions (utm_source);
CREATE INDEX IF NOT EXISTS idx_analytics_sessions_utm_campaign ON public.analytics_sessions (utm_campaign);

-- 3. TABELA DE EVENTOS ANALÍTICOS (analytics_events)
CREATE TABLE IF NOT EXISTS public.analytics_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES public.analytics_sessions(id) ON DELETE SET NULL,
    visitor_id TEXT NOT NULL,
    event_name TEXT NOT NULL,
    page_path TEXT NOT NULL,
    event_properties JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_analytics_events_name ON public.analytics_events (event_name);
CREATE INDEX IF NOT EXISTS idx_analytics_events_session ON public.analytics_events (session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON public.analytics_events (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_events_visitor ON public.analytics_events (visitor_id);

-- 4. GARANTIR CRIAÇÃO E COLUNAS NA TABELA LEADS
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    company_name TEXT,
    business_type TEXT DEFAULT 'outro',
    package_interest TEXT DEFAULT 'pro',
    estimated_budget_eur NUMERIC(10, 2),
    message TEXT,
    preferred_contact TEXT DEFAULT 'whatsapp',
    source TEXT DEFAULT 'website',
    language TEXT DEFAULT 'pt',
    user_agent TEXT,
    status TEXT NOT NULL DEFAULT 'novo',
    notes TEXT,
    visitor_id TEXT,
    session_id UUID,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    utm_content TEXT,
    utm_term TEXT,
    gclid TEXT,
    fbclid TEXT,
    ttclid TEXT,
    first_touch JSONB,
    last_touch JSONB
);

ALTER TABLE public.leads 
    ADD COLUMN IF NOT EXISTS visitor_id TEXT,
    ADD COLUMN IF NOT EXISTS session_id UUID,
    ADD COLUMN IF NOT EXISTS utm_source TEXT,
    ADD COLUMN IF NOT EXISTS utm_medium TEXT,
    ADD COLUMN IF NOT EXISTS utm_campaign TEXT,
    ADD COLUMN IF NOT EXISTS utm_content TEXT,
    ADD COLUMN IF NOT EXISTS utm_term TEXT,
    ADD COLUMN IF NOT EXISTS gclid TEXT,
    ADD COLUMN IF NOT EXISTS fbclid TEXT,
    ADD COLUMN IF NOT EXISTS ttclid TEXT,
    ADD COLUMN IF NOT EXISTS first_touch JSONB,
    ADD COLUMN IF NOT EXISTS last_touch JSONB;

CREATE INDEX IF NOT EXISTS idx_leads_session_id ON public.leads (session_id);
CREATE INDEX IF NOT EXISTS idx_leads_visitor_id ON public.leads (visitor_id);
CREATE INDEX IF NOT EXISTS idx_leads_utm_campaign ON public.leads (utm_campaign);

-- 5. POLÍTICAS DE SEGURANÇA (ROW LEVEL SECURITY - RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Qualquer visitante pode enviar proposta de lead" ON public.leads;
DROP POLICY IF EXISTS "Apenas admin autenticado pode ler os leads" ON public.leads;
DROP POLICY IF EXISTS "Apenas admin autenticado pode atualizar leads" ON public.leads;
DROP POLICY IF EXISTS "Apenas o admin master pode ler os leads" ON public.leads;
DROP POLICY IF EXISTS "Apenas o admin master pode atualizar leads" ON public.leads;
DROP POLICY IF EXISTS "Apenas o admin master pode deletar leads" ON public.leads;

DROP POLICY IF EXISTS "Visitantes podem registrar sessões com limites" ON public.analytics_sessions;
DROP POLICY IF EXISTS "Apenas admin pode ler sessões analíticas" ON public.analytics_sessions;
DROP POLICY IF EXISTS "Visitantes podem registrar eventos permitidos com limites" ON public.analytics_events;
DROP POLICY IF EXISTS "Apenas admin pode ler eventos analíticos" ON public.analytics_events;

-- Leads: Inserção pública com validação de limites
CREATE POLICY "Qualquer visitante pode enviar proposta de lead"
    ON public.leads
    FOR INSERT
    TO public, anon, authenticated
    WITH CHECK (
        char_length(full_name) <= 120 AND
        char_length(email) <= 150 AND
        char_length(phone) <= 40 AND
        (message IS NULL OR char_length(message) <= 3000)
    );

-- Leads: Leitura e gestão para qualquer administrador autenticado
CREATE POLICY "Apenas admin autenticado pode ler os leads"
    ON public.leads
    FOR SELECT
    TO authenticated
    USING (auth.jwt() ->> 'email' IN ('christianmartinsatencion@gmail.com', 'christianposivel@gmail.com') OR auth.role() = 'authenticated');

CREATE POLICY "Apenas admin autenticado pode atualizar leads"
    ON public.leads
    FOR UPDATE
    TO authenticated
    USING (auth.jwt() ->> 'email' IN ('christianmartinsatencion@gmail.com', 'christianposivel@gmail.com') OR auth.role() = 'authenticated')
    WITH CHECK (auth.jwt() ->> 'email' IN ('christianmartinsatencion@gmail.com', 'christianposivel@gmail.com') OR auth.role() = 'authenticated');

CREATE POLICY "Apenas admin autenticado pode deletar leads"
    ON public.leads
    FOR DELETE
    TO authenticated
    USING (auth.jwt() ->> 'email' IN ('christianmartinsatencion@gmail.com', 'christianposivel@gmail.com') OR auth.role() = 'authenticated');

-- Sessões: Inserção anônima estrita
CREATE POLICY "Visitantes podem registrar sessões com limites"
    ON public.analytics_sessions
    FOR INSERT
    TO public, anon, authenticated
    WITH CHECK (
        char_length(visitor_id) <= 64 AND
        char_length(landing_page) <= 500 AND
        (referrer IS NULL OR char_length(referrer) <= 500) AND
        (utm_source IS NULL OR char_length(utm_source) <= 100) AND
        (utm_campaign IS NULL OR char_length(utm_campaign) <= 100)
    );

CREATE POLICY "Apenas admin pode ler sessões analíticas"
    ON public.analytics_sessions
    FOR SELECT
    TO authenticated
    USING (auth.jwt() ->> 'email' IN ('christianmartinsatencion@gmail.com', 'christianposivel@gmail.com') OR auth.role() = 'authenticated');

-- Eventos: Inserção anônima estrita com whitelist
CREATE POLICY "Visitantes podem registrar eventos permitidos com limites"
    ON public.analytics_events
    FOR INSERT
    TO public, anon, authenticated
    WITH CHECK (
        char_length(visitor_id) <= 64 AND
        char_length(page_path) <= 300 AND
        event_name IN (
            'page_view', 
            'service_view', 
            'pricing_view', 
            'cta_click', 
            'form_start', 
            'form_submit', 
            'whatsapp_click'
        )
    );

CREATE POLICY "Apenas admin pode ler eventos analíticos"
    ON public.analytics_events
    FOR SELECT
    TO authenticated
    USING (auth.jwt() ->> 'email' IN ('christianmartinsatencion@gmail.com', 'christianposivel@gmail.com') OR auth.role() = 'authenticated');
