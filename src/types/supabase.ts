export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          full_name: string;
          email: string;
          phone: string;
          company_name: string | null;
          business_type: string;
          package_interest: string;
          estimated_budget_eur: number | null;
          message: string | null;
          preferred_contact: string;
          source: string;
          language: string;
          user_agent: string | null;
          status: 'novo' | 'em_contato' | 'proposta_enviada' | 'fechado_ganho' | 'perdido';
          notes: string | null;
          visitor_id?: string | null;
          session_id?: string | null;
          utm_source?: string | null;
          utm_medium?: string | null;
          utm_campaign?: string | null;
          utm_content?: string | null;
          utm_term?: string | null;
          gclid?: string | null;
          fbclid?: string | null;
          ttclid?: string | null;
          first_touch?: Json | null;
          last_touch?: Json | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
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
          user_agent?: string | null;
          status?: 'novo' | 'em_contato' | 'proposta_enviada' | 'fechado_ganho' | 'perdido';
          notes?: string | null;
          visitor_id?: string | null;
          session_id?: string | null;
          utm_source?: string | null;
          utm_medium?: string | null;
          utm_campaign?: string | null;
          utm_content?: string | null;
          utm_term?: string | null;
          gclid?: string | null;
          fbclid?: string | null;
          ttclid?: string | null;
          first_touch?: Json | null;
          last_touch?: Json | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          full_name?: string;
          email?: string;
          phone?: string;
          company_name?: string | null;
          business_type?: string;
          package_interest?: string;
          estimated_budget_eur?: number | null;
          message?: string | null;
          preferred_contact?: string;
          source?: string;
          language?: string;
          user_agent?: string | null;
          status?: 'novo' | 'em_contato' | 'proposta_enviada' | 'fechado_ganho' | 'perdido';
          notes?: string | null;
          visitor_id?: string | null;
          session_id?: string | null;
          utm_source?: string | null;
          utm_medium?: string | null;
          utm_campaign?: string | null;
          utm_content?: string | null;
          utm_term?: string | null;
          gclid?: string | null;
          fbclid?: string | null;
          ttclid?: string | null;
          first_touch?: Json | null;
          last_touch?: Json | null;
        };
        Relationships: [];
      };
      portfolio_models: {
        Row: {
          id: string;
          number: string;
          category: string;
          title: string;
          tagline: string;
          description: string;
          image_url: string;
          badge: string;
          features: Json;
          demo_url: string | null;
          active: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          number: string;
          category: string;
          title: string;
          tagline: string;
          description: string;
          image_url: string;
          badge: string;
          features?: Json;
          demo_url?: string | null;
          active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          number?: string;
          category?: string;
          title?: string;
          tagline?: string;
          description?: string;
          image_url?: string;
          badge?: string;
          features?: Json;
          demo_url?: string | null;
          active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      pricing_packages: {
        Row: {
          id: string;
          name: string;
          price_eur: number;
          featured: boolean;
          featured_badge: string | null;
          pages_count: string;
          deliverables: Json;
          cta_text: string;
          payment_url: string | null;
          active: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          price_eur: number;
          featured?: boolean;
          featured_badge?: string | null;
          pages_count: string;
          deliverables?: Json;
          cta_text: string;
          payment_url?: string | null;
          active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          price_eur?: number;
          featured?: boolean;
          featured_badge?: string | null;
          pages_count?: string;
          deliverables?: Json;
          cta_text?: string;
          payment_url?: string | null;
          active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      site_settings: {
        Row: {
          key: string;
          brand_name: string;
          tagline: string;
          phone: string;
          phone_raw: string;
          email: string;
          instagram: string;
          instagram_url: string;
          whatsapp_initial_message: string;
          location: string;
          copyright_year: number;
          updated_at: string;
        };
        Insert: {
          key: string;
          brand_name?: string;
          tagline?: string;
          phone?: string;
          phone_raw?: string;
          email?: string;
          instagram?: string;
          instagram_url?: string;
          whatsapp_initial_message?: string;
          location?: string;
          copyright_year?: number;
          updated_at?: string;
        };
        Update: {
          key?: string;
          brand_name?: string;
          tagline?: string;
          phone?: string;
          phone_raw?: string;
          email?: string;
          instagram?: string;
          instagram_url?: string;
          whatsapp_initial_message?: string;
          location?: string;
          copyright_year?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
      analytics_sessions: {
        Row: {
          id: string;
          visitor_id: string;
          session_start: string;
          session_last_seen: string;
          landing_page: string;
          referrer: string | null;
          utm_source: string | null;
          utm_medium: string | null;
          utm_campaign: string | null;
          utm_content: string | null;
          utm_term: string | null;
          gclid: string | null;
          fbclid: string | null;
          ttclid: string | null;
          language: string | null;
          screen_resolution: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          visitor_id: string;
          session_start?: string;
          session_last_seen?: string;
          landing_page: string;
          referrer?: string | null;
          utm_source?: string | null;
          utm_medium?: string | null;
          utm_campaign?: string | null;
          utm_content?: string | null;
          utm_term?: string | null;
          gclid?: string | null;
          fbclid?: string | null;
          ttclid?: string | null;
          language?: string | null;
          screen_resolution?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          visitor_id?: string;
          session_start?: string;
          session_last_seen?: string;
          landing_page?: string;
          referrer?: string | null;
          utm_source?: string | null;
          utm_medium?: string | null;
          utm_campaign?: string | null;
          utm_content?: string | null;
          utm_term?: string | null;
          gclid?: string | null;
          fbclid?: string | null;
          ttclid?: string | null;
          language?: string | null;
          screen_resolution?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      analytics_events: {
        Row: {
          id: string;
          session_id: string | null;
          visitor_id: string;
          event_name: string;
          page_path: string;
          event_properties: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          session_id?: string | null;
          visitor_id: string;
          event_name: string;
          page_path: string;
          event_properties?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          session_id?: string | null;
          visitor_id?: string;
          event_name?: string;
          page_path?: string;
          event_properties?: Json;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "analytics_events_session_id_fkey";
            columns: ["session_id"];
            isOneToOne: false;
            referencedRelation: "analytics_sessions";
            referencedColumns: ["id"];
          }
        ];
      };
      deals: {
        Row: {
          id: string;
          lead_id: string | null;
          title: string;
          customer_id: string;
          customer_name: string;
          value: number;
          stage: 'lead' | 'contact' | 'proposal' | 'negotiation' | 'won' | 'lost';
          expected_close_date: string | null;
          currency: string;
          is_auto_generated: boolean;
          created_at: string;
          updated_at: string;
          closed_at: string | null;
          visitor_id: string | null;
          session_id: string | null;
          utm_source: string | null;
          utm_medium: string | null;
          utm_campaign: string | null;
          utm_term: string | null;
          utm_content: string | null;
          gclid: string | null;
          fbclid: string | null;
          ttclid: string | null;
          first_touch: Json | null;
          last_touch: Json | null;
          landing_page: string | null;
          referrer: string | null;
        };
        Insert: {
          id?: string;
          lead_id?: string | null;
          title: string;
          customer_id: string;
          customer_name: string;
          value?: number;
          stage?: 'lead' | 'contact' | 'proposal' | 'negotiation' | 'won' | 'lost';
          expected_close_date?: string | null;
          currency?: string;
          is_auto_generated?: boolean;
          created_at?: string;
          updated_at?: string;
          closed_at?: string | null;
          visitor_id?: string | null;
          session_id?: string | null;
          utm_source?: string | null;
          utm_medium?: string | null;
          utm_campaign?: string | null;
          utm_term?: string | null;
          utm_content?: string | null;
          gclid?: string | null;
          fbclid?: string | null;
          ttclid?: string | null;
          first_touch?: Json | null;
          last_touch?: Json | null;
          landing_page?: string | null;
          referrer?: string | null;
        };
        Update: {
          id?: string;
          lead_id?: string | null;
          title?: string;
          customer_id?: string;
          customer_name?: string;
          value?: number;
          stage?: 'lead' | 'contact' | 'proposal' | 'negotiation' | 'won' | 'lost';
          expected_close_date?: string | null;
          currency?: string;
          is_auto_generated?: boolean;
          created_at?: string;
          updated_at?: string;
          closed_at?: string | null;
          visitor_id?: string | null;
          session_id?: string | null;
          utm_source?: string | null;
          utm_medium?: string | null;
          utm_campaign?: string | null;
          utm_term?: string | null;
          utm_content?: string | null;
          gclid?: string | null;
          fbclid?: string | null;
          ttclid?: string | null;
          first_touch?: Json | null;
          last_touch?: Json | null;
          landing_page?: string | null;
          referrer?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "deals_lead_id_fkey";
            columns: ["lead_id"];
            isOneToOne: false;
            referencedRelation: "leads";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type LeadRow = Database['public']['Tables']['leads']['Row'];
export type LeadInsert = Database['public']['Tables']['leads']['Insert'];
export type DealRow = Database['public']['Tables']['deals']['Row'];
export type DealInsert = Database['public']['Tables']['deals']['Insert'];
export type DealUpdate = Database['public']['Tables']['deals']['Update'];
export type PortfolioModelRow = Database['public']['Tables']['portfolio_models']['Row'];
export type PricingPackageRow = Database['public']['Tables']['pricing_packages']['Row'];
export type SiteSettingsRow = Database['public']['Tables']['site_settings']['Row'];
export type AnalyticsSessionRow = Database['public']['Tables']['analytics_sessions']['Row'];
export type AnalyticsEventRow = Database['public']['Tables']['analytics_events']['Row'];

