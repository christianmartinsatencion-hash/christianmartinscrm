-- ==============================================================================
-- CHRISTIAN MARTINS WEB STUDIO & CRM - MASTER SUPABASE SCHEMA (CONSOLIDADO)
-- ==============================================================================
-- Execute este script completo no Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql
-- ==============================================================================

-- 1. Extensões
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 2. TABELA DE LEADS & ORÇAMENTOS (Com Atribuição de Marketing)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    
    -- Contato
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    company_name TEXT,
    
    -- Pedido
    business_type TEXT DEFAULT 'outro',
    package_interest TEXT DEFAULT 'pro',
    estimated_budget_eur NUMERIC(10, 2),
    message TEXT,
    preferred_contact TEXT DEFAULT 'whatsapp',
    source TEXT DEFAULT 'website',
    language TEXT DEFAULT 'pt',
    user_agent TEXT,
    
    -- CRM Status
    status TEXT NOT NULL DEFAULT 'novo',
    notes TEXT,
    
    -- Tracking & Marketing Attribution (Fase 1)
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

-- Garantir colunas caso a tabela já existisse previamente
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

CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads (status);
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads (email);
CREATE INDEX IF NOT EXISTS idx_leads_visitor_id ON public.leads (visitor_id);
CREATE INDEX IF NOT EXISTS idx_leads_session_id ON public.leads (session_id);

-- ==============================================================================
-- 3. TABELA DE SESSÕES ANALÍTICAS (analytics_sessions)
-- ==============================================================================
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

-- ==============================================================================
-- 4. TABELA DE EVENTOS ANALÍTICOS (analytics_events)
-- ==============================================================================
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

-- ==============================================================================
-- 5. TABELAS DE PORTFÓLIO, PREÇOS E CONFIGURAÇÕES
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.portfolio_models (
    id TEXT PRIMARY KEY,
    number TEXT NOT NULL,
    category TEXT NOT NULL,
    title TEXT NOT NULL,
    tagline TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    badge TEXT NOT NULL,
    features JSONB NOT NULL DEFAULT '[]'::jsonb,
    demo_url TEXT,
    active BOOLEAN NOT NULL DEFAULT true,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.pricing_packages (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    price_eur NUMERIC(10, 2) NOT NULL,
    featured BOOLEAN NOT NULL DEFAULT false,
    featured_badge TEXT,
    pages_count TEXT NOT NULL,
    deliverables JSONB NOT NULL DEFAULT '[]'::jsonb,
    cta_text TEXT NOT NULL,
    payment_url TEXT,
    active BOOLEAN NOT NULL DEFAULT true,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    brand_name TEXT NOT NULL DEFAULT 'Christian Martins',
    tagline TEXT NOT NULL DEFAULT 'Web Studio',
    phone TEXT NOT NULL DEFAULT '+34 617 796 921',
    phone_raw TEXT NOT NULL DEFAULT '34617796921',
    email TEXT NOT NULL DEFAULT 'christianmartinsatencion@gmail.com',
    instagram TEXT NOT NULL DEFAULT '@christianmartins.web',
    instagram_url TEXT NOT NULL DEFAULT 'https://instagram.com/christianmartins.web',
    whatsapp_initial_message TEXT NOT NULL DEFAULT 'Olá Christian! Vi os modelos de sites e gostaria de solicitar um orçamento para o meu negócio.',
    location TEXT NOT NULL DEFAULT 'Espanha & Atendimento Internacional',
    copyright_year INT NOT NULL DEFAULT 2026,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- 6. FUNÇÃO E TRIGGERS AUTOMÁTICOS PARA UPDATED_AT
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_leads_updated_at ON public.leads;
CREATE TRIGGER set_leads_updated_at BEFORE UPDATE ON public.leads FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_portfolio_updated_at ON public.portfolio_models;
CREATE TRIGGER set_portfolio_updated_at BEFORE UPDATE ON public.portfolio_models FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_pricing_updated_at ON public.pricing_packages;
CREATE TRIGGER set_pricing_updated_at BEFORE UPDATE ON public.pricing_packages FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_settings_updated_at ON public.site_settings;
CREATE TRIGGER set_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ==============================================================================
-- 7. POLÍTICAS DE SEGURANÇA REFORÇADAS (ROW LEVEL SECURITY - RLS)
-- ==============================================================================
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Limpar policies anteriores
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

DROP POLICY IF EXISTS "Leitura pública de modelos de portfólio" ON public.portfolio_models;
DROP POLICY IF EXISTS "Modificação de portfólio apenas para admin" ON public.portfolio_models;
DROP POLICY IF EXISTS "Leitura pública de pacotes de preços" ON public.pricing_packages;
DROP POLICY IF EXISTS "Modificação de preços apenas para admin" ON public.pricing_packages;
DROP POLICY IF EXISTS "Leitura pública de configurações gerais" ON public.site_settings;
DROP POLICY IF EXISTS "Modificação de configurações apenas para admin" ON public.site_settings;

-- 7.1 Políticas LEADS
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

-- 7.2 Políticas ANALYTICS
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

-- 7.3 Políticas Catálogo e Configurações
CREATE POLICY "Leitura pública de modelos de portfólio"
    ON public.portfolio_models FOR SELECT TO public, anon, authenticated
    USING (active = true OR auth.role() = 'authenticated');

CREATE POLICY "Modificação de portfólio apenas para admin"
    ON public.portfolio_models FOR ALL TO authenticated
    USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Leitura pública de pacotes de preços"
    ON public.pricing_packages FOR SELECT TO public, anon, authenticated
    USING (active = true OR auth.role() = 'authenticated');

CREATE POLICY "Modificação de preços apenas para admin"
    ON public.pricing_packages FOR ALL TO authenticated
    USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Leitura pública de configurações gerais"
    ON public.site_settings FOR SELECT TO public, anon, authenticated USING (true);

CREATE POLICY "Modificação de configurações apenas para admin"
    ON public.site_settings FOR ALL TO authenticated
    USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- ==============================================================================
-- 8. SEED DATA (Valores Iniciais)
-- ==============================================================================
INSERT INTO public.site_settings (key, brand_name, tagline, phone, phone_raw, email, instagram, instagram_url, whatsapp_initial_message, location, copyright_year)
VALUES (
    'general',
    'Christian Martins',
    'Web Studio',
    '+34 617 796 921',
    '34617796921',
    'christianmartinsatencion@gmail.com',
    '@christianmartins.web',
    'https://instagram.com/christianmartins.web',
    'Olá Christian! Vi os modelos de sites e gostaria de solicitar um orçamento para o meu negócio.',
    'Espanha & Atendimento Internacional',
    2026
)
ON CONFLICT (key) DO UPDATE SET
    email = EXCLUDED.email,
    instagram = EXCLUDED.instagram,
    instagram_url = EXCLUDED.instagram_url,
    phone = EXCLUDED.phone;

INSERT INTO public.pricing_packages (id, name, price_eur, featured, featured_badge, pages_count, cta_text, sort_order, deliverables)
VALUES
(
    'start',
    'START',
    199.00,
    false,
    NULL,
    '1 página',
    'Quero o START',
    1,
    '["Site de 1 página (One Page de alta conversão)", "Design responsivo (mobile, tablet e desktop)", "Botão de WhatsApp flutuante integrado", "Localização com Google Maps interativo", "Formulário de contato direto", "Publicação e configuração no ar"]'::jsonb
),
(
    'pro',
    'PRO',
    299.00,
    true,
    'MAIS ESCOLHIDO',
    'Até 5 páginas',
    'Quero o PRO',
    2,
    '["Até 5 páginas completas (Início, Sobre, Serviços, Galeria, Contato)", "Design personalizado alinhado à sua marca", "Botão de WhatsApp integrado", "Localização com Google Maps", "Formulário de orçamento personalizado", "SEO básico para aparecer no Google", "Galeria de imagens interativa dos seus trabalhos", "Publicação profissional inclusa"]'::jsonb
),
(
    'premium',
    'PREMIUM',
    499.00,
    false,
    NULL,
    'Até 8 páginas',
    'Quero o PREMIUM',
    3,
    '["Site completo com arquitetura de alta escala", "Design 100% exclusivo e personalizado", "Até 8 páginas detalhadas", "SEO básico e otimização avançada de velocidade", "Formulários e captação de leads qualificados", "Integrações com redes sociais e ferramentas", "Galeria dinâmica e portfólio rico", "Publicação e indexação no Google", "Suporte inicial prioritário dedicado"]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
    price_eur = EXCLUDED.price_eur,
    deliverables = EXCLUDED.deliverables;

INSERT INTO public.portfolio_models (id, number, category, title, tagline, description, image_url, badge, sort_order, features)
VALUES
(
    'restaurante',
    '01',
    'Gastronomia',
    'Restaurante & Bistrô',
    'Cardápio digital visual, reservas diretas e fotos dos pratos de dar água na boca.',
    'Criado para atrair clientes locais, exibir pratos com fotografia impactante e permitir reservas rápidas via WhatsApp com 1 toque.',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    'Cardápio + Reservas',
    1,
    '["Cardápio Online", "Botão Reserva Mesa", "Integração Google Maps", "Avaliações em Destaque"]'::jsonb
),
(
    'barbearia',
    '02',
    'Beleza & Estilo',
    'Barbearia & Barber Club',
    'Agendamento de horários descomplicado, tabela de serviços e visual vintage/moderno.',
    'Perfeito para barbearias que desejam profissionalizar seu atendimento e lotar a agenda da equipe sem depender só do boca a boca.',
    'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1200&q=80',
    'Agendamentos Rápidos',
    2,
    '["Agendamento WhatsApp", "Lista de Preços", "Galeria de Cortes", "Horário de Funcionamento"]'::jsonb
),
(
    'imobiliaria',
    '03',
    'Imóveis & Corretores',
    'Imobiliária & Corretor',
    'Vitrine de imóveis de alto padrão com filtros, tour em fotos e formulário de visita.',
    'Transmita a solidez que uma transação imobiliária exige. Imóveis organizados por bairro, valor e tipologia prontos para gerar leads quentes.',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    'Catálogo de Imóveis',
    3,
    '["Filtro de Imóveis", "Formulário de Visita", "Destaque de Bairros", "Contato Direto com Corretor"]'::jsonb
),
(
    'servicos',
    '04',
    'Serviços Corporativos',
    'Empresa de Serviços & Consultoria',
    'Autoridade imediata para prestadores de serviços, clínicas, escritórios e consultorias.',
    'Estruturado para explicar soluções complexas com clareza, apresentar credenciais e transformar visitantes desconfiados em reuniões agendadas.',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    'Autoridade & Conversão',
    4,
    '["Apresentação de Serviços", "Diferenciais Competitivos", "Formulário de Diagnóstico", "CTA de Orçamento"]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
    image_url = EXCLUDED.image_url,
    tagline = EXCLUDED.tagline;
