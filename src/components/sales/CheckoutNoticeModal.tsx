import React, { useState, useEffect } from 'react';
import { X, Check, MessageCircle, ShieldCheck, CreditCard, Send, Sparkles, Database } from 'lucide-react';
import { PricingPackage, getWhatsAppLink } from '../../config/siteConfig';
import { useSiteLanguage } from '../../context/SiteLanguageContext';
import { submitLead } from '../../services/supabaseService';
import { track } from '../../lib/analytics';

interface CheckoutNoticeModalProps {
  pkg: PricingPackage | null;
  onClose: () => void;
}

export const CheckoutNoticeModal: React.FC<CheckoutNoticeModalProps> = ({ pkg, onClose }) => {
  const { t, language } = useSiteLanguage();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (pkg) {
      track('form_start', {
        package_id: pkg.id,
        price_eur: pkg.priceEur,
      });
    }
  }, [pkg]);

  if (!pkg) return null;

  const getWhatsappMsg = () => {
    const intro = fullName ? `Olá Christian, meu nome é ${fullName}${companyName ? ` (${companyName})` : ''}. ` : 'Olá Christian! ';
    if (language === 'en') {
      return `${intro}I would like to start with the ${pkg.name} package (€${pkg.priceEur}). ${message ? `Note: ${message}` : ''}`;
    }
    if (language === 'es') {
      return `${intro}Me gustaría contratar el paquete ${pkg.name} (€${pkg.priceEur}). ${message ? `Detalle: ${message}` : ''}`;
    }
    return `${intro}Gostaria de contratar o pacote ${pkg.name} (€${pkg.priceEur}) e dar início ao meu projeto. ${message ? `Observação: ${message}` : ''}`;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    setIsSubmitting(true);

    try {
      const result = await submitLead({
        full_name: fullName,
        email: email || undefined,
        phone,
        company_name: companyName || null,
        business_type: 'outro',
        package_interest: pkg.id,
        estimated_budget_eur: pkg.priceEur,
        message: message || null,
        language,
        source: 'checkout_modal',
        preferred_contact: 'whatsapp',
        status: 'novo',
      });

      if (!result.success) {
        console.warn('⚠️ Fallback lead result:', result.error);
      }

      // Dispara form_submit sem dados pessoais (PII)
      track('form_submit', {
        package_id: pkg.id,
        price_eur: pkg.priceEur,
        has_company: Boolean(companyName.trim()),
      });

      setSubmitted(true);

      // Tenta redirecionar para o WhatsApp imediatamente
      const targetUrl = getWhatsAppLink(getWhatsappMsg());
      try {
        if (typeof window !== 'undefined') {
          window.location.href = targetUrl;
        }
      } catch {
        // Fallback para o botão visível na tela
      }
    } catch (err) {
      console.error('Erro ao salvar lead:', err);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const directWhatsappUrl = getWhatsAppLink(getWhatsappMsg());

  const handleDirectWhatsappClick = () => {
    track('whatsapp_click', {
      location: 'checkout_modal',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in-50 duration-200 overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl ring-1 ring-black/10 text-left my-8">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
          aria-label="Fechar"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-900 border border-neutral-200">
            <CreditCard className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
              {t('checkoutModalTitle')}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-neutral-950 font-display">
              {pkg.name} • €{pkg.priceEur}
            </h3>
          </div>
        </div>

        {/* Package summary card */}
        <div className="mt-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-3.5 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-neutral-800">
            <span>{pkg.pagesCount}</span>
            <span className="text-neutral-900 font-extrabold">{t('checkoutModalNoHiddenFees')}</span>
          </div>
          <ul className="space-y-1 pt-1.5 border-t border-neutral-200/80">
            {pkg.deliverables.slice(0, 3).map((d, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-neutral-600">
                <Check className="h-3.5 w-3.5 text-neutral-900 shrink-0" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>

        {submitted ? (
          <div className="mt-6 p-6 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-center space-y-4 shadow-sm">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md mb-1 animate-bounce">
              <Check className="h-7 w-7" />
            </div>
            <h4 className="font-black text-lg text-emerald-950">
              {language === 'en' ? 'Request Registered Successfully!' : language === 'es' ? '¡Solicitud Registrada con Éxito!' : 'Solicitação Registrada com Sucesso!'}
            </h4>
            <p className="text-xs text-emerald-800 leading-relaxed max-w-sm mx-auto">
              {language === 'en'
                ? 'Your request was saved into Christian Martins CRM. Click below to confirm directly on WhatsApp:'
                : language === 'es'
                ? 'Su solicitud fue guardada en el CRM de Christian Martins. Haga clic abajo para confirmar por WhatsApp:'
                : 'Seus dados foram salvos no CRM de Christian Martins. Clique no botão verde abaixo para iniciar a conversa no WhatsApp:'}
            </p>
            <div className="pt-2">
              <a
                href={directWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  track('whatsapp_click', { location: 'checkout_modal_success' });
                }}
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-lg shadow-emerald-600/30 transition-all cursor-pointer transform hover:scale-[1.02] active:scale-98"
              >
                <MessageCircle className="h-5 w-5 fill-current" />
                <span>
                  {language === 'en'
                    ? '📲 Open WhatsApp with Christian Martins'
                    : language === 'es'
                    ? '📲 Abrir WhatsApp con Christian Martins'
                    : '📲 Abrir WhatsApp de Christian Martins'}
                </span>
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="mt-5 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-neutral-900" />
                {language === 'en' ? 'Start your project' : language === 'es' ? 'Comienza tu proyecto' : 'Iniciar seu projeto'}
              </label>
              <span className="text-[10px] text-neutral-500 flex items-center gap-1">
                <Database className="h-3 w-3 text-neutral-500" /> Supabase
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <input
                  type="text"
                  required
                  placeholder={language === 'en' ? 'Your Name *' : language === 'es' ? 'Tu Nombre *' : 'Seu Nome *'}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full text-xs rounded-xl border border-neutral-200 px-3 py-2.5 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 transition-all bg-white"
                />
              </div>
              <div>
                <input
                  type="tel"
                  required
                  placeholder={language === 'en' ? 'WhatsApp (with code) *' : language === 'es' ? 'WhatsApp (con código) *' : 'WhatsApp com DDD *'}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs rounded-xl border border-neutral-200 px-3 py-2.5 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 transition-all bg-white font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <input
                  type="email"
                  placeholder={language === 'en' ? 'Your Email' : language === 'es' ? 'Tu Correo' : 'Seu E-mail'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs rounded-xl border border-neutral-200 px-3 py-2.5 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 transition-all bg-white"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder={language === 'en' ? 'Business / Company' : language === 'es' ? 'Negocio / Empresa' : 'Nome do seu negócio'}
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full text-xs rounded-xl border border-neutral-200 px-3 py-2.5 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 transition-all bg-white"
                />
              </div>
            </div>

            <div>
              <input
                type="text"
                placeholder={language === 'en' ? 'Tell us a bit about your idea (optional)' : language === 'es' ? 'Cuéntanos de tu idea (opcional)' : 'Fale um pouco sobre a sua ideia (opcional)'}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full text-xs rounded-xl border border-neutral-200 px-3 py-2.5 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 transition-all bg-white"
              />
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-neutral-950 py-3 px-4 text-xs sm:text-sm font-bold text-white shadow-lg shadow-neutral-950/20 hover:bg-neutral-800 transition-all cursor-pointer disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
                <span>
                  {isSubmitting
                    ? (language === 'en' ? 'Saving...' : language === 'es' ? 'Guardando...' : 'Salvando...')
                    : (language === 'en' ? 'Confirm & Open WhatsApp' : language === 'es' ? 'Confirmar y Abrir WhatsApp' : 'Confirmar e Abrir WhatsApp')}
                </span>
              </button>

              <a
                href={directWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleDirectWhatsappClick}
                className="w-full sm:w-auto flex items-center justify-center gap-1.5 rounded-xl border border-neutral-200 py-3 px-3 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors whitespace-nowrap"
                title="Abrir WhatsApp direto sem preencher formulário"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span>{language === 'en' ? 'Direct WhatsApp' : language === 'es' ? 'WhatsApp directo' : 'Direto no WhatsApp'}</span>
              </a>
            </div>
          </form>
        )}

        {/* Integration notice */}
        <div className="mt-4 rounded-xl border border-neutral-200 bg-neutral-50 p-2.5 text-[11px] text-neutral-600 leading-relaxed flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-neutral-900 shrink-0" />
          <span>{t('checkoutStripeReadyTitle')}: {t('checkoutStripeReadyDesc')}</span>
        </div>
      </div>
    </div>
  );
};
