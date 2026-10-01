import express from 'express';
import { createServer as createViteServer } from 'vite';

interface StoredLead {
  id: string;
  created_at: string;
  full_name: string;
  email?: string;
  phone: string;
  company_name?: string | null;
  business_type?: string;
  package_interest?: string;
  estimated_budget_eur?: number | null;
  message?: string | null;
  preferred_contact?: string;
  source?: string;
  language?: string;
  status?: string;
  [key: string]: any;
}

// In-memory lead store on the server to guarantee leads cross device boundaries
const globalLeadsStore: StoredLead[] = [];

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '1mb' }));

  // API Route: Receber novos leads do formulário público
  app.post('/api/leads', (req, res) => {
    try {
      const body = req.body;
      if (!body.full_name || !body.phone) {
        return res.status(400).json({ success: false, error: 'Nome e Telefone são obrigatórios.' });
      }

      const newLead: StoredLead = {
        ...body,
        id: body.id || `lead_srv_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
        created_at: body.created_at || new Date().toISOString(),
        status: body.status || 'novo',
      };

      // Evita duplicatas por ID
      const existingIdx = globalLeadsStore.findIndex((l) => l.id === newLead.id);
      if (existingIdx >= 0) {
        globalLeadsStore[existingIdx] = newLead;
      } else {
        globalLeadsStore.unshift(newLead);
      }

      console.log('📩 [Server /api/leads] Novo Lead Registrado:', newLead.full_name, newLead.phone, newLead.package_interest);

      return res.json({
        success: true,
        leadId: newLead.id,
        message: 'Lead recebido com sucesso no servidor.',
      });
    } catch (err: any) {
      console.error('❌ [Server /api/leads Error]:', err);
      return res.status(500).json({ success: false, error: err.message || 'Erro interno no servidor.' });
    }
  });

  // API Route: Buscar todos os leads salvos no servidor (para o CRM carregar)
  app.get('/api/leads', (_req, res) => {
    return res.json({
      success: true,
      count: globalLeadsStore.length,
      leads: globalLeadsStore,
    });
  });

  // Vite Integration (Dev vs Prod)
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('dist'));
    app.get('*', (_req, res) => {
      res.sendFile('dist/index.html', { root: '.' });
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 [Christian Martins Web Studio Server] Rodando na porta ${PORT}`);
  });
}

startServer();
