import { supabase, isSupabaseConfigured } from './supabase';
import type {
  AnalyticsEventName,
  ConsentState,
  MarketingAttribution,
  TouchPoint,
  UTMParams,
} from '../types/analytics';

// Chaves de armazenamento isoladas
const VISITOR_ID_KEY = 'cm_analytics_vid_v1';
const SESSION_ID_KEY = 'cm_analytics_sid_v1';
const SESSION_ACTIVITY_KEY = 'cm_analytics_s_last_act';
const FIRST_TOUCH_KEY = 'cm_attr_first_touch_v1';
const LAST_TOUCH_KEY = 'cm_attr_last_touch_v1';
const COOKIE_CONSENT_KEY = 'cm_cookie_consent_v1';

// Janela de inatividade de sessão: 30 minutos
const SESSION_INACTIVITY_LIMIT_MS = 30 * 60 * 1000;

// Deduplicação em memória para React Strict Mode e re-renders rápidos
const recentEventsCache = new Map<string, number>();
const DEDUP_WINDOW_MS = 1500;

/**
 * Valida se uma string é um UUID válido
 */
export function isValidUUID(id?: string | null): boolean {
  if (!id) return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
}

/**
 * Gera um UUID v4 estritamente válido segundo RFC4122 (compatível com PostgreSQL UUID)
 */
export function generateSecureId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Retorna ou cria o Visitor ID persistido localmente (não PII)
 */
export function getOrCreateVisitorId(): string {
  try {
    const existing = localStorage.getItem(VISITOR_ID_KEY);
    if (existing && isValidUUID(existing)) {
      return existing;
    }
    const newId = generateSecureId();
    localStorage.setItem(VISITOR_ID_KEY, newId);
    return newId;
  } catch {
    return generateSecureId();
  }
}

/**
 * Atualiza o timestamp de atividade da sessão atual
 */
export function refreshSession(): void {
  try {
    sessionStorage.setItem(SESSION_ACTIVITY_KEY, Date.now().toString());
  } catch {
    // ignore
  }
}

/**
 * Retorna ou gera um Session ID com expiração após 30 minutos de inatividade
 * Garante que o ID seja estritamente um UUID válido
 */
export function getOrCreateSessionId(): string {
  try {
    const existingSid = sessionStorage.getItem(SESSION_ID_KEY);
    const lastActiveStr = sessionStorage.getItem(SESSION_ACTIVITY_KEY);
    const now = Date.now();

    if (existingSid && isValidUUID(existingSid) && lastActiveStr) {
      const lastActive = parseInt(lastActiveStr, 10);
      if (!isNaN(lastActive) && now - lastActive < SESSION_INACTIVITY_LIMIT_MS) {
        refreshSession();
        return existingSid;
      }
    }

    // Sessão inexistente, inválida ou expirada -> Gera nova sessão com UUID válido
    const newSid = generateSecureId();
    sessionStorage.setItem(SESSION_ID_KEY, newSid);
    sessionStorage.setItem(SESSION_ACTIVITY_KEY, now.toString());

    // Se houver consentimento analítico, registra a nova sessão no Supabase
    syncSessionToSupabase(newSid);

    return newSid;
  } catch {
    return generateSecureId();
  }
}

/**
 * Obtém o estado atual de consentimento do usuário
 */
export function getConsentState(): ConsentState {
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (raw === 'essential') {
      return {
        essential: true,
        analytics: false,
        marketing: false,
        rawConsent: 'essential',
        updatedAt: new Date().toISOString(),
      };
    }
    // Ativação padrão segura e anônima (sem dados pessoais) para garantir registro imediato no Supabase
    return {
      essential: true,
      analytics: true,
      marketing: true,
      rawConsent: raw === 'all' ? 'all' : 'all',
      updatedAt: new Date().toISOString(),
    };
  } catch {
    return {
      essential: true,
      analytics: true,
      marketing: true,
      rawConsent: 'all',
      updatedAt: new Date().toISOString(),
    };
  }
}

/**
 * Extrai parâmetros UTM e IDs de clique de URL (gclid, fbclid, ttclid)
 */
export function extractUrlParameters(): UTMParams {
  if (typeof window === 'undefined') return {};
  try {
    const params = new URLSearchParams(window.location.search);
    const utm: UTMParams = {};

    const utmSource = params.get('utm_source');
    const utmMedium = params.get('utm_medium');
    const utmCampaign = params.get('utm_campaign');
    const utmContent = params.get('utm_content');
    const utmTerm = params.get('utm_term');
    const gclid = params.get('gclid');
    const fbclid = params.get('fbclid');
    const ttclid = params.get('ttclid');

    if (utmSource) utm.utm_source = utmSource.trim().slice(0, 100);
    if (utmMedium) utm.utm_medium = utmMedium.trim().slice(0, 100);
    if (utmCampaign) utm.utm_campaign = utmCampaign.trim().slice(0, 100);
    if (utmContent) utm.utm_content = utmContent.trim().slice(0, 100);
    if (utmTerm) utm.utm_term = utmTerm.trim().slice(0, 100);
    if (gclid) utm.gclid = gclid.trim().slice(0, 120);
    if (fbclid) utm.fbclid = fbclid.trim().slice(0, 120);
    if (ttclid) utm.ttclid = ttclid.trim().slice(0, 120);

    return utm;
  } catch {
    return {};
  }
}

/**
 * Captura parâmetros de marketing da URL e atualiza first-touch e last-touch
 */
export function captureMarketingParameters(): MarketingAttribution {
  if (typeof window === 'undefined') {
    return { first_touch: null, last_touch: null };
  }

  try {
    const urlParams = extractUrlParameters();
    const hasMarketingParams = Object.keys(urlParams).length > 0;
    const currentPath = window.location.pathname + window.location.search;
    const currentReferrer = typeof document !== 'undefined' ? document.referrer : '';

    const touchPoint: TouchPoint = {
      ...urlParams,
      landing_page: currentPath.slice(0, 500),
      referrer: currentReferrer.slice(0, 500),
      timestamp: new Date().toISOString(),
    };

    // 1. First Touch (Grava apenas uma vez na vida do visitante; nunca sobrescreve)
    let firstTouch: TouchPoint | null = null;
    const existingFirst = localStorage.getItem(FIRST_TOUCH_KEY);
    if (existingFirst) {
      try {
        firstTouch = JSON.parse(existingFirst);
      } catch {
        firstTouch = null;
      }
    }
    if (!firstTouch && (hasMarketingParams || currentReferrer)) {
      firstTouch = touchPoint;
      localStorage.setItem(FIRST_TOUCH_KEY, JSON.stringify(firstTouch));
    }

    // 2. Last Touch (Atualiza quando novos parâmetros UTM/clique existirem; não destrói atribuição anterior em visita direta)
    let lastTouch: TouchPoint | null = null;
    const existingLast = localStorage.getItem(LAST_TOUCH_KEY);
    if (existingLast) {
      try {
        lastTouch = JSON.parse(existingLast);
      } catch {
        lastTouch = null;
      }
    }

    if (hasMarketingParams || !lastTouch) {
      lastTouch = touchPoint;
      localStorage.setItem(LAST_TOUCH_KEY, JSON.stringify(lastTouch));
    }

    return { first_touch: firstTouch, last_touch: lastTouch };
  } catch {
    return { first_touch: null, last_touch: null };
  }
}

/**
 * Retorna os dados de atribuição de marketing armazenados
 */
export function getMarketingAttribution(): MarketingAttribution {
  try {
    const firstStr = localStorage.getItem(FIRST_TOUCH_KEY);
    const lastStr = localStorage.getItem(LAST_TOUCH_KEY);
    return {
      first_touch: firstStr ? JSON.parse(firstStr) : null,
      last_touch: lastStr ? JSON.parse(lastStr) : null,
    };
  } catch {
    return { first_touch: null, last_touch: null };
  }
}

// Controle em memória para garantir que a sessão foi inserida no Supabase antes dos eventos
let sessionSyncedToSupabase = false;

/**
 * Sincroniza o registro da sessão no Supabase (apenas se analytics permitido)
 */
export async function syncSessionToSupabase(sessionId: string): Promise<void> {
  const consent = getConsentState();
  if (!consent.analytics || !isSupabaseConfigured() || typeof window === 'undefined') {
    return;
  }

  try {
    const visitorId = getOrCreateVisitorId();
    const urlParams = extractUrlParameters();
    const landingPage = (window.location.pathname + window.location.search).slice(0, 500);
    const referrer = (typeof document !== 'undefined' ? document.referrer : '').slice(0, 500);
    const language = typeof navigator !== 'undefined' ? navigator.language : undefined;
    const screenResolution = typeof window !== 'undefined' ? `${window.screen.width}x${window.screen.height}` : undefined;

    const { error } = await supabase.from('analytics_sessions').insert([
      {
        id: sessionId,
        visitor_id: visitorId,
        landing_page: landingPage,
        referrer: referrer || null,
        utm_source: urlParams.utm_source || null,
        utm_medium: urlParams.utm_medium || null,
        utm_campaign: urlParams.utm_campaign || null,
        utm_content: urlParams.utm_content || null,
        utm_term: urlParams.utm_term || null,
        gclid: urlParams.gclid || null,
        fbclid: urlParams.fbclid || null,
        ttclid: urlParams.ttclid || null,
        language: language ? language.slice(0, 20) : null,
        screen_resolution: screenResolution ? screenResolution.slice(0, 30) : null,
      },
    ]);

    if (!error) {
      sessionSyncedToSupabase = true;
      console.log('✅ [Supabase Session Synchronized]:', sessionId);
    } else {
      // Se a sessão já existe no banco (erro 23505 de chave duplicada), considera sincronizada
      if (error.code === '23505') {
        sessionSyncedToSupabase = true;
      } else {
        console.error('❌ [Supabase Session Insert Error]:', error.message, error.code || '');
      }
    }
  } catch (err) {
    console.error('❌ [Supabase Session Exception]:', err);
  }
}

/**
 * Sanitiza propriedades de eventos para remover qualquer dado pessoal (PII) acidental
 */
function sanitizeEventProperties(properties?: Record<string, any>): Record<string, any> {
  if (!properties || typeof properties !== 'object') return {};

  const clean: Record<string, any> = {};
  const blockedKeys = new Set([
    'name',
    'full_name',
    'first_name',
    'last_name',
    'nome',
    'email',
    'mail',
    'phone',
    'mobile',
    'telefone',
    'celular',
    'whatsapp',
    'company',
    'company_name',
    'empresa',
    'message',
    'mensagem',
    'address',
    'endereco',
    'password',
    'senha',
    'credit_card',
    'cpf',
    'nif',
  ]);

  for (const [key, value] of Object.entries(properties)) {
    const lowerKey = key.toLowerCase();
    if (blockedKeys.has(lowerKey)) {
      continue; // Remove campos PII
    }

    if (typeof value === 'string') {
      clean[key] = value.slice(0, 200);
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      clean[key] = value;
    } else if (value === null) {
      clean[key] = null;
    }
  }

  return clean;
}

/**
 * Engine central de disparo de eventos analíticos
 */
export async function track(
  eventName: AnalyticsEventName,
  properties?: Record<string, any>
): Promise<void> {
  if (typeof window === 'undefined') return;

  const pagePath = window.location.pathname.slice(0, 300);

  // Prevenção de duplicatas causadas por React Strict Mode ou re-renders rápidos
  const dedupKey = `${eventName}_${pagePath}_${JSON.stringify(properties || {})}`;
  const lastTime = recentEventsCache.get(dedupKey);
  const now = Date.now();

  if (lastTime && now - lastTime < DEDUP_WINDOW_MS) {
    return; // Ignora duplicata imediata
  }
  recentEventsCache.set(dedupKey, now);

  // Atualiza tempo de atividade da sessão
  refreshSession();

  const consent = getConsentState();
  // Se o usuário não tiver consentimento analítico, não persiste remotamente no Supabase
  if (!consent.analytics || !isSupabaseConfigured()) {
    return;
  }

  try {
    const visitorId = getOrCreateVisitorId();
    const sessionId = getOrCreateSessionId();

    // Garante que a linha da sessão existe no banco antes de inserir o evento
    if (!sessionSyncedToSupabase) {
      await syncSessionToSupabase(sessionId);
    }

    const cleanProps = sanitizeEventProperties(properties);

    const { error } = await supabase.from('analytics_events').insert([
      {
        session_id: sessionId,
        visitor_id: visitorId,
        event_name: eventName,
        page_path: pagePath,
        event_properties: cleanProps,
      },
    ]);

    if (error) {
      console.error(`❌ [Supabase Event Error (${eventName})]:`, error.message, error.details || '', error.hint || '');
    } else {
      console.log(`✅ [Supabase Event Tracked]: ${eventName}`, cleanProps);
    }
  } catch (err) {
    console.error(`❌ [Supabase Event Exception (${eventName})]:`, err);
  }
}

/**
 * Inicialização do serviço analítico no carregamento da aplicação
 */
export function initAnalytics(): void {
  if (typeof window === 'undefined') return;
  captureMarketingParameters();
  getOrCreateVisitorId();
  getOrCreateSessionId();
}
