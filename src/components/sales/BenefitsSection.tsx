import React from 'react';
import { 
  Smartphone, 
  MessageCircle, 
  MapPin, 
  MailCheck, 
  Search, 
  Zap, 
  Sparkles,
  Palette
} from 'lucide-react';
import { useSiteLanguage } from '../../context/SiteLanguageContext';

export const BenefitsSection: React.FC = () => {
  const { t } = useSiteLanguage();

  return (
    <section id="beneficios" className="py-20 sm:py-28 bg-slate-950 text-white relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-20 text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-950/60 border border-blue-800/60 px-3 py-1 rounded-full">
            {t('benefitsEyebrow')}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-display leading-[1.1]">
            {t('benefitsTitle')}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl">
            {t('benefitsSubtitle')}
          </p>
        </div>

        {/* Dynamic Bento Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6">
          
          {/* Card 1: Mobile First */}
          <div className="lg:col-span-8 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-7 sm:p-9 relative overflow-hidden group text-left">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                <Smartphone className="h-6 w-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-3 py-1 rounded-full">
                {t('benefitTrafficPill')}
              </span>
            </div>

            <div className="max-w-lg z-10 relative">
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                {t('benefit2Title')}
              </h3>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                {t('benefit2Desc')}
              </p>
            </div>

            {/* Visual background simulation */}
            <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl bg-white/5 p-3 border border-white/5">
                <p className="text-xs font-bold text-slate-400">{t('benefitStatFluid')}</p>
                <p className="text-sm font-black text-white mt-1">{t('benefitStatFluidSub')}</p>
              </div>
              <div className="rounded-xl bg-white/5 p-3 border border-white/5">
                <p className="text-xs font-bold text-slate-400">{t('benefitStatTouch')}</p>
                <p className="text-sm font-black text-white mt-1">{t('benefitStatTouchSub')}</p>
              </div>
              <div className="rounded-xl bg-white/5 p-3 border border-white/5">
                <p className="text-xs font-bold text-slate-400">{t('benefitStatOverflow')}</p>
                <p className="text-sm font-black text-white mt-1">{t('benefitStatOverflowSub')}</p>
              </div>
            </div>
          </div>

          {/* Card 2: WhatsApp Integrado */}
          <div className="lg:col-span-4 rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 p-7 sm:p-9 relative overflow-hidden group text-left">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mb-6">
              <MessageCircle className="h-6 w-6" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
              {t('benefit3Title')}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t('benefit3Desc')}
            </p>
            <div className="mt-6 flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3 text-xs text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{t('benefitWhatsappPill')}</span>
            </div>
          </div>

          {/* Card 3: Google Maps */}
          <div className="lg:col-span-4 rounded-3xl border border-white/10 bg-slate-900/90 p-7 sm:p-8 text-left">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 mb-5">
              <MapPin className="h-5 w-5" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white font-display">
              {t('benefit4Title')}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
              {t('benefit4Desc')}
            </p>
          </div>

          {/* Card 4: Carregamento Rápido */}
          <div className="lg:col-span-4 rounded-3xl border border-white/10 bg-slate-900/90 p-7 sm:p-8 text-left">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 mb-5">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white font-display">
              {t('benefit7Title')}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
              {t('benefit7Desc')}
            </p>
          </div>

          {/* Card 5: SEO Básico */}
          <div className="lg:col-span-4 rounded-3xl border border-white/10 bg-slate-900/90 p-7 sm:p-8 text-left">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 mb-5">
              <Search className="h-5 w-5" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white font-display">
              {t('benefit6Title')}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
              {t('benefit6Desc')}
            </p>
          </div>

          {/* Card 6: Design Personalizado */}
          <div className="lg:col-span-6 rounded-3xl border border-white/10 bg-slate-900/90 p-7 sm:p-8 text-left">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 mb-5">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white font-display">
              {t('benefit8Title')}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
              {t('benefit8Desc')}
            </p>
          </div>

          {/* Card 7: Formulário de Contato Direto */}
          <div className="lg:col-span-6 rounded-3xl border border-white/10 bg-slate-900/90 p-7 sm:p-8 text-left">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30 mb-5">
              <MailCheck className="h-5 w-5" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white font-display">
              {t('benefit5Title')}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
              {t('benefit5Desc')}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
