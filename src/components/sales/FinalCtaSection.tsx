import React, { useState } from 'react';
import { ArrowRight, MessageCircle, Send, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';
import { useSiteLanguage } from '../../context/SiteLanguageContext';
import { getWhatsAppLink } from '../../config/siteConfig';
import { submitLead } from '../../services/supabaseService';
import { track } from '../../lib/analytics';

export const FinalCtaSection: React.FC = () => {
  const { t, language } = useSiteLanguage();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const handleScrollToPricing = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.querySelector('#precos');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInlineSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setLoading(true);
    try {
      const res = await submitLead({
        full_name: name.trim(),
        phone: phone.trim(),
        source: 'final_cta_inline',
        package_interest: 'pro',
        estimated_budget_eur: 299,
        language,
        status: 'novo',
      });

      track('form_submit', {
        location: 'final_cta_inline',
        has_phone: true,
      });

      setSubmittedId(res.leadId || 'gravado');

      const waMsg = `Olá Christian! Meu nome é ${name.trim()} (${phone.trim()}). Acabei de solicitar um orçamento via site e gostaria de confirmar meu projeto.`;
      const waUrl = getWhatsAppLink(waMsg);

      try {
        if (typeof window !== 'undefined') {
          window.location.href = waUrl;
        }
      } catch {
        // ignore
      }

      setName('');
      setPhone('');
    } catch (err) {
      console.error('Erro ao registrar:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-neutral-950 text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-neutral-800/30 via-neutral-700/20 to-neutral-800/30 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight font-display leading-[1.08] max-w-3xl mx-auto">
          {t('finalCtaTitle')}
        </h2>

        <p className="mt-5 text-sm sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed">
          {t('finalCtaText')}
        </p>

        {/* Formulário Rápido Direto na Seção Final */}
        <div className="mt-10 max-w-xl mx-auto rounded-3xl border border-neutral-800 bg-neutral-900/90 p-6 sm:p-8 backdrop-blur-md shadow-2xl text-left">
          {submittedId ? (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-center space-y-3">
              <CheckCircle2 className="h-10 w-10 mx-auto text-emerald-400" />
              <h4 className="font-extrabold text-base text-white">Solicitação enviada e registrada com sucesso!</h4>
              <p className="text-xs text-emerald-300/90 leading-relaxed max-w-md mx-auto">
                Seus dados já estão salvos no CRM de Christian Martins. Clique no botão abaixo para conversar diretamente no WhatsApp:
              </p>
              <div className="pt-2">
                <a
                  href={getWhatsAppLink('Olá Christian! Preenchi o formulário no site e gostaria de confirmar meu orçamento.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-neutral-950 font-black text-xs shadow-lg transition-all"
                >
                  <MessageCircle className="h-4 w-4 fill-current" />
                  <span>📲 Falar com Christian no WhatsApp</span>
                </a>
              </div>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setSubmittedId(null)}
                  className="text-[11px] underline text-emerald-400 hover:text-white"
                >
                  Enviar outra solicitação
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleInlineSubmit} className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-white" />
                  Receba uma proposta sem compromisso
                </span>
                <span className="text-[10px] text-neutral-500">100% Grátis</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Seu Nome *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs rounded-xl border border-neutral-700 bg-neutral-800/90 px-3.5 py-3 text-white placeholder-neutral-500 focus:border-white focus:outline-none transition-all"
                />
                <input
                  type="tel"
                  required
                  placeholder="Seu WhatsApp (com DDD) *"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs rounded-xl border border-neutral-700 bg-neutral-800/90 px-3.5 py-3 text-white placeholder-neutral-500 focus:border-white focus:outline-none transition-all font-mono"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-white py-3.5 px-4 text-xs sm:text-sm font-bold text-neutral-950 shadow-lg hover:bg-neutral-100 transition-all cursor-pointer disabled:opacity-50 mt-1"
              >
                <Send className="h-4 w-4" />
                <span>{loading ? 'Gravando no Supabase...' : 'Enviar Solicitação Imediata'}</span>
              </button>
            </form>
          )}

          <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-neutral-400" /> Atendimento direto por Christian Martins
            </span>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline font-semibold"
            >
              WhatsApp Direto →
            </a>
          </div>
        </div>

        <p className="mt-8 text-xs text-neutral-400 font-medium">
          Sites a partir de €199 • Pagamento seguro • Sem complicações técnicas
        </p>
      </div>
    </section>
  );
};
