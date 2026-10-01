import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { LeadInsert, PortfolioModelRow, PricingPackageRow, SiteSettingsRow } from '../types/supabase';
import { PORTFOLIO_MODELS, PRICING_PACKAGES, SITE_BRAND, PortfolioModel, PricingPackage } from '../config/siteConfig';
import { getOrCreateVisitorId, getOrCreateSessionId, getMarketingAttribution, extractUrlParameters, syncSessionToSupabase, generateSecureId, isValidUUID } from '../lib/analytics';
import { crmStorage } from './crmStorageService';

export interface SubmitLeadResponse {
  success: boolean;
  leadId?: string;
  isLocalFallback?: boolean;
  error?: string;
}

const LOCAL_LEADS_KEY = 'cm_studio_local_leads';

/**
 * Salva um novo Lead / Pedido de Orçamento no Supabase
 * Associa automaticamente visitor_id, session_id e parâmetros de atribuição de marketing
 * Aplica sanitização prévia contra payloads maliciosos ou excessivos
 */
export async function submitLead(rawLead: LeadInsert): Promise<SubmitLeadResponse> {
  const isConfigured = isSupabaseConfigured();

  const visitorId = rawLead.visitor_id || getOrCreateVisitorId();
  const sessionId = rawLead.session_id || getOrCreateSessionId();
  const attribution = getMarketingAttribution();
  const urlParams = extractUrlParameters();

  const cleanEmail = (rawLead.email && rawLead.email.trim())
    ? rawLead.email.trim().toLowerCase().slice(0, 150)
    : `lead_${Date.now()}@contato.lead`;

  // Validação e sanitização estrita de input (OWASP Data Integrity & Anti-DoS)
  const lead: LeadInsert = {
    full_name: (rawLead.full_name || '').trim().slice(0, 120),
    email: cleanEmail,
    phone: (rawLead.phone || '').trim().slice(0, 40),
    company_name: rawLead.company_name ? rawLead.company_name.trim().slice(0, 120) : null,
    business_type: (rawLead.business_type || 'outro').slice(0, 50),
    package_interest: (rawLead.package_interest || 'pro').slice(0, 50),
    estimated_budget_eur: rawLead.estimated_budget_eur ? Number(rawLead.estimated_budget_eur) : null,
    message: rawLead.message ? rawLead.message.trim().slice(0, 3000) : null,
    preferred_contact: (rawLead.preferred_contact || 'whatsapp').slice(0, 20),
    source: (rawLead.source || 'website').slice(0, 50),
    language: (rawLead.language || 'pt').slice(0, 10),
    visitor_id: visitorId ? visitorId.slice(0, 64) : null,
    session_id: sessionId && isValidUUID(sessionId) ? sessionId : null,
    utm_source: rawLead.utm_source || urlParams.utm_source || attribution.last_touch?.utm_source || attribution.first_touch?.utm_source || null,
    utm_medium: rawLead.utm_medium || urlParams.utm_medium || attribution.last_touch?.utm_medium || attribution.first_touch?.utm_medium || null,
    utm_campaign: rawLead.utm_campaign || urlParams.utm_campaign || attribution.last_touch?.utm_campaign || attribution.first_touch?.utm_campaign || null,
    utm_content: rawLead.utm_content || urlParams.utm_content || attribution.last_touch?.utm_content || attribution.first_touch?.utm_content || null,
    utm_term: rawLead.utm_term || urlParams.utm_term || attribution.last_touch?.utm_term || attribution.first_touch?.utm_term || null,
    gclid: rawLead.gclid || urlParams.gclid || attribution.last_touch?.gclid || attribution.first_touch?.gclid || null,
    fbclid: rawLead.fbclid || urlParams.fbclid || attribution.last_touch?.fbclid || attribution.first_touch?.fbclid || null,
    ttclid: rawLead.ttclid || urlParams.ttclid || attribution.last_touch?.ttclid || attribution.first_touch?.ttclid || null,
    first_touch: (attribution.first_touch as any) || null,
    last_touch: (attribution.last_touch as any) || null,
  };

  if (!lead.full_name || !lead.phone) {
    return {
      success: false,
      error: 'Por favor, preencha os campos obrigatórios (Nome e WhatsApp).',
    };
  }

  const assignedLeadId = generateSecureId();
  let insertSuccess = false;

  // 1. Envia obrigatoriamente para o endpoint Express no servidor (/api/leads)
  try {
    const serverRes = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: assignedLeadId, ...lead }),
    });
    if (serverRes.ok) {
      console.log('✅ [Server /api/leads Success]: Lead salvo no servidor Express.');
      insertSuccess = true;
    }
  } catch (err) {
    console.warn('⚠️ [Server /api/leads Warning]: Servidor offline, usando fallbacks.', err);
  }

  // 2. Tenta enviar para o Supabase
  if (isConfigured) {
    try {
      const { error } = await supabase
        .from('leads')
        .insert([{ id: assignedLeadId, ...lead }]);

      if (error) {
        console.error('❌ [Supabase submitLead Error]:', error.message, error.details || '', error.hint || '');
      } else {
        console.log('✅ [Supabase submitLead Success]: Lead registrado com ID:', assignedLeadId);
        insertSuccess = true;
      }
    } catch (err) {
      console.error('❌ [Supabase submitLead Exception]:', err);
    }
  }

  // 3. Registra instantaneamente no CRM local para que apareça de imediato no painel
  try {
    crmStorage.addCustomerFromLead(lead, assignedLeadId);
  } catch {
    // ignore
  }

  // Ao enviar o formulário, autoriza analytics para sincronizar a sessão de conversão
  try {
    localStorage.setItem('cm_cookie_consent_v1', 'all');
    if (sessionId) {
      syncSessionToSupabase(sessionId);
    }
  } catch {
    // ignore
  }

  // 4. Garante gravação no localStorage do navegador
  try {
    const existing = JSON.parse(localStorage.getItem(LOCAL_LEADS_KEY) || '[]');
    const localLead = {
      ...lead,
      id: assignedLeadId,
      created_at: new Date().toISOString(),
    };
    const limited = [localLead, ...existing.filter((item: any) => item.id !== assignedLeadId)].slice(0, 50);
    localStorage.setItem(LOCAL_LEADS_KEY, JSON.stringify(limited));
  } catch {
    // ignore
  }

  return {
    success: true,
    leadId: assignedLeadId,
    isLocalFallback: !insertSuccess,
  };
}

/**
 * Carrega os modelos do portfólio diretamente do Supabase
 * Se a tabela estiver vazia ou indisponível, utiliza o siteConfig como fonte
 */
export async function getPortfolioModels(): Promise<PortfolioModel[]> {
  if (!isSupabaseConfigured()) {
    return PORTFOLIO_MODELS;
  }

  try {
    const { data, error } = await supabase
      .from('portfolio_models')
      .select('*')
      .eq('active', true)
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return PORTFOLIO_MODELS;
    }

    return data.map((item: PortfolioModelRow) => ({
      id: item.id,
      number: item.number,
      category: item.category,
      title: item.title,
      tagline: item.tagline,
      description: item.description,
      image: item.image_url,
      badge: item.badge,
      features: Array.isArray(item.features) ? (item.features as string[]) : [],
      demoUrl: item.demo_url || undefined,
    }));
  } catch {
    return PORTFOLIO_MODELS;
  }
}

/**
 * Carrega os pacotes de preço do Supabase com fallback seguro
 */
export async function getPricingPackages(): Promise<PricingPackage[]> {
  if (!isSupabaseConfigured()) {
    return PRICING_PACKAGES;
  }

  try {
    const { data, error } = await supabase
      .from('pricing_packages')
      .select('*')
      .eq('active', true)
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return PRICING_PACKAGES;
    }

    return data.map((pkg: PricingPackageRow) => ({
      id: pkg.id as 'start' | 'pro' | 'premium',
      name: pkg.name,
      priceEur: Number(pkg.price_eur),
      featured: pkg.featured,
      featuredBadge: pkg.featured_badge || undefined,
      pagesCount: pkg.pages_count,
      deliverables: Array.isArray(pkg.deliverables) ? (pkg.deliverables as string[]) : [],
      ctaKey: pkg.cta_text,
    }));
  } catch {
    return PRICING_PACKAGES;
  }
}

/**
 * Carrega as configurações do estúdio do Supabase com fallback seguro
 */
export async function getSiteSettings() {
  if (!isSupabaseConfigured()) {
    return SITE_BRAND;
  }

  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('key', 'general')
      .maybeSingle();

    if (error || !data) {
      return SITE_BRAND;
    }

    const row = data as SiteSettingsRow;
    return {
      name: row.brand_name || SITE_BRAND.name,
      tagline: row.tagline || SITE_BRAND.tagline,
      shortName: SITE_BRAND.shortName,
      phone: row.phone || SITE_BRAND.phone,
      phoneRaw: row.phone_raw || SITE_BRAND.phoneRaw,
      email: row.email || SITE_BRAND.email,
      instagram: row.instagram || SITE_BRAND.instagram,
      instagramUrl: row.instagram_url || SITE_BRAND.instagramUrl,
      location: row.location || SITE_BRAND.location,
      copyrightYear: row.copyright_year || SITE_BRAND.copyrightYear,
    };
  } catch {
    return SITE_BRAND;
  }
}
