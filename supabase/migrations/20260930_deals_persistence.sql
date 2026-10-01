-- Migration: 20260930_deals_persistence.sql
-- Descrição: Tabela public.deals para persistência de Oportunidades do CRM com Vínculo ao Lead, Atribuição de Marketing e RLS Simplificada para Usuários Autenticados (Fase 3)

CREATE TABLE IF NOT EXISTS public.deals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  customer_id TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  value NUMERIC(12,2) NOT NULL DEFAULT 0.00,
  stage TEXT NOT NULL DEFAULT 'lead' CHECK (stage IN ('lead', 'contact', 'proposal', 'negotiation', 'won', 'lost')),
  expected_close_date DATE,
  currency TEXT NOT NULL DEFAULT 'EUR',
  is_auto_generated BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  closed_at TIMESTAMPTZ,

  -- Campos de Atribuição de Marketing (Fase 1 -> Fase 3)
  visitor_id TEXT,
  session_id UUID,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  gclid TEXT,
  fbclid TEXT,
  ttclid TEXT,
  first_touch JSONB,
  last_touch JSONB,
  landing_page TEXT,
  referrer TEXT
);

-- Índices de Performance para Consultas e Atribuição de Receita
CREATE INDEX IF NOT EXISTS idx_deals_lead_id ON public.deals(lead_id);
CREATE INDEX IF NOT EXISTS idx_deals_customer_id ON public.deals(customer_id);
CREATE INDEX IF NOT EXISTS idx_deals_stage ON public.deals(stage);
CREATE INDEX IF NOT EXISTS idx_deals_utm_campaign ON public.deals(utm_campaign);
CREATE INDEX IF NOT EXISTS idx_deals_created_at ON public.deals(created_at);
CREATE INDEX IF NOT EXISTS idx_deals_closed_at ON public.deals(closed_at);

-- Garantia de Deduplicação de Deals Automáticos (1 Lead -> Max 1 Deal Automático Inicial)
-- Não impede a criação de múltiplos Deals MANUAIS (is_auto_generated = false) para o mesmo Lead
CREATE UNIQUE INDEX IF NOT EXISTS idx_deals_unique_auto_lead 
  ON public.deals (lead_id) 
  WHERE (is_auto_generated IS TRUE AND lead_id IS NOT NULL);

-- Trigger de Atualização Automática de updated_at
CREATE OR REPLACE FUNCTION public.handle_deals_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_deals_updated_at ON public.deals;
CREATE TRIGGER tr_deals_updated_at
  BEFORE UPDATE ON public.deals
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_deals_updated_at();

-- Políticas de Segurança (Row Level Security - RLS)
ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;

-- Limpeza preventiva de políticas prévias
DROP POLICY IF EXISTS "Permitir leitura de deals para usuarios autenticados" ON public.deals;
DROP POLICY IF EXISTS "Permitir insercao de deals para usuarios do CRM" ON public.deals;
DROP POLICY IF EXISTS "Permitir atualizacao de deals para usuarios do CRM" ON public.deals;
DROP POLICY IF EXISTS "Permitir exclusao de deals para usuarios do CRM" ON public.deals;
DROP POLICY IF EXISTS "Apenas admin autenticado pode ler deals" ON public.deals;
DROP POLICY IF EXISTS "Apenas admin autenticado pode inserir deals" ON public.deals;
DROP POLICY IF EXISTS "Apenas admin autenticado pode atualizar deals" ON public.deals;
DROP POLICY IF EXISTS "Apenas admin autenticado pode deletar deals" ON public.deals;
DROP POLICY IF EXISTS "Apenas usuarios autenticados do CRM podem ler deals" ON public.deals;
DROP POLICY IF EXISTS "Apenas usuarios autenticados do CRM podem inserir deals" ON public.deals;
DROP POLICY IF EXISTS "Apenas usuarios autenticados do CRM podem atualizar deals" ON public.deals;
DROP POLICY IF EXISTS "Apenas usuarios autenticados do CRM podem deletar deals" ON public.deals;

-- 1. Leitura: EXCLUSIVAMENTE para usuários autenticados (anônimos/público são BLOQUEADOS)
CREATE POLICY "Permitir leitura para usuarios autenticados"
  ON public.deals
  FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL);

-- 2. Inserção: EXCLUSIVAMENTE para usuários autenticados
CREATE POLICY "Permitir insercao para usuarios autenticados"
  ON public.deals
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

-- 3. Atualização: EXCLUSIVAMENTE para usuários autenticados
CREATE POLICY "Permitir atualizacao para usuarios autenticados"
  ON public.deals
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- 4. Exclusão: EXCLUSIVAMENTE para usuários autenticados
CREATE POLICY "Permitir exclusao para usuarios autenticados"
  ON public.deals
  FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);
