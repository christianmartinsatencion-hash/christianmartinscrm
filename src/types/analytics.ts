export type AnalyticsEventName =
  | 'page_view'
  | 'service_view'
  | 'pricing_view'
  | 'cta_click'
  | 'form_start'
  | 'form_submit'
  | 'whatsapp_click';

export type ConsentCategory = 'essential' | 'analytics' | 'marketing';

export interface ConsentState {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  rawConsent: 'all' | 'essential' | null;
  updatedAt: string;
}

export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string;
  fbclid?: string;
  ttclid?: string;
}

export interface TouchPoint extends UTMParams {
  landing_page: string;
  referrer: string;
  timestamp: string;
}

export interface MarketingAttribution {
  first_touch: TouchPoint | null;
  last_touch: TouchPoint | null;
}

export interface AnalyticsSessionData extends UTMParams {
  id: string;
  visitor_id: string;
  session_start: string;
  session_last_seen: string;
  landing_page: string;
  referrer: string;
  language?: string;
  screen_resolution?: string;
}

export interface AnalyticsEventData {
  id?: string;
  session_id?: string;
  visitor_id: string;
  event_name: AnalyticsEventName;
  page_path: string;
  event_properties?: Record<string, any>;
  created_at?: string;
}
