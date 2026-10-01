-- ==============================================================================
-- CHRISTIAN MARTINS CRM - FASE 4: PERSISTÊNCIA DE TASKS E RLS RÍGIDO POR USUÁRIO
-- File: supabase/migrations/20261001_tasks_persistence.sql
-- ==============================================================================

-- 1. Criação da Tabela public.tasks
CREATE TABLE IF NOT EXISTS public.tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    due_date DATE,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
    lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
    deal_id UUID REFERENCES public.deals(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Índices de Alta Performance para Consultas e Filtros do CRM
CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON public.tasks (user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_lead_id ON public.tasks (lead_id);
CREATE INDEX IF NOT EXISTS idx_tasks_deal_id ON public.tasks (deal_id);
CREATE INDEX IF NOT EXISTS idx_tasks_completed ON public.tasks (completed);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON public.tasks (due_date);

-- 3. Trigger e Função para Atualização Automática da Coluna updated_at
CREATE OR REPLACE FUNCTION public.handle_tasks_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_tasks_updated_at ON public.tasks;
CREATE TRIGGER tr_tasks_updated_at
    BEFORE UPDATE ON public.tasks
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_tasks_updated_at();

-- 4. Habilitação de Row Level Security (RLS)
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- Limpeza preventiva de políticas prévias
DROP POLICY IF EXISTS "Permitir leitura de tarefas do proprio usuario" ON public.tasks;
DROP POLICY IF EXISTS "Permitir insercao de tarefas para o proprio usuario" ON public.tasks;
DROP POLICY IF EXISTS "Permitir atualizacao de tarefas do proprio usuario" ON public.tasks;
DROP POLICY IF EXISTS "Permitir exclusao de tarefas do proprio usuario" ON public.tasks;

-- 5. Políticas de Segurança (Estritamente Isoladas por user_id = auth.uid())

-- 5.1 LEITURA (SELECT)
CREATE POLICY "Permitir leitura de tarefas do proprio usuario"
    ON public.tasks
    FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());

-- 5.2 INSERÇÃO (INSERT)
CREATE POLICY "Permitir insercao de tarefas para o proprio usuario"
    ON public.tasks
    FOR INSERT
    TO authenticated
    WITH CHECK (user_id = auth.uid());

-- 5.3 ATUALIZAÇÃO (UPDATE)
CREATE POLICY "Permitir atualizacao de tarefas do proprio usuario"
    ON public.tasks
    FOR UPDATE
    TO authenticated
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- 5.4 EXCLUSÃO (DELETE)
CREATE POLICY "Permitir exclusao de tarefas do proprio usuario"
    ON public.tasks
    FOR DELETE
    TO authenticated
    USING (user_id = auth.uid());
