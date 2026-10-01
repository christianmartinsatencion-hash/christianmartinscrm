// Vercel Serverless Function /api/leads

const vercelLeadsStore: any[] = [];

export default async function handler(req: any, res: any) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const body = req.body || {};
      if (!body.full_name || !body.phone) {
        return res.status(400).json({ success: false, error: 'Nome e Telefone são obrigatórios.' });
      }

      const newLead = {
        ...body,
        id: body.id || `lead_vcl_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
        created_at: body.created_at || new Date().toISOString(),
        status: body.status || 'novo',
      };

      vercelLeadsStore.unshift(newLead);

      return res.status(200).json({
        success: true,
        leadId: newLead.id,
        message: 'Lead recebido com sucesso via Vercel Serverless API.',
      });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message || 'Erro interno no servidor Vercel.' });
    }
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      count: vercelLeadsStore.length,
      leads: vercelLeadsStore,
    });
  }

  return res.status(405).json({ error: 'Método não permitido.' });
}
