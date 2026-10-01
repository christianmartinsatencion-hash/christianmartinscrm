import React from 'react';
import { ArrowRight, Eye, CheckCircle2, ShieldCheck, MessageCircle } from 'lucide-react';
import { useSiteLanguage } from '../../context/SiteLanguageContext';
import { SITE_IMAGES } from '../../config/siteConfig';
import { HeroParticles } from './HeroParticles';
import { track } from '../../lib/analytics';

interface HeroSectionProps {
  onOpenModelPreview: (modelId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenModelPreview }) => {
  const { t } = useSiteLanguage();

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string, ctaId: string) => {
    e.preventDefault();
    track('cta_click', { cta_id: ctaId, target: targetId });
    const el = document.querySelector(targetId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-32 bg-[#FBFBFC]">
      {/* Editorial ambient gradients & geometric grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#E2E8F0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-neutral-300/30 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-40 w-96 h-96 rounded-full bg-neutral-200/40 blur-3xl pointer-events-none" />

      {/* Lightweight scroll-responsive ambient particles */}
      <HeroParticles />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Asymmetrical Editorial Typography (col-span-7) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 z-10 text-left">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200/90 bg-white/90 px-3.5 py-1.5 shadow-2xs backdrop-blur-xs">
              <span className="flex h-2 w-2 rounded-full bg-neutral-900" />
              <span className="text-xs font-bold text-neutral-800 tracking-wide uppercase">
                {t('heroBadge')}
              </span>
              <span className="text-neutral-300 font-light">•</span>
              <span className="text-xs font-extrabold text-neutral-900 bg-neutral-100 border border-neutral-200 px-2 py-0.5 rounded-full">
                {t('heroStartingPrice')}
              </span>
            </div>

            {/* Giant Asymmetric Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-black tracking-tight text-neutral-950 leading-[1.05] font-display">
              {t('heroTitleLine1')}{' '}
              <span className="relative inline-block text-neutral-950 underline decoration-neutral-300 decoration-wavy decoration-from-font underline-offset-8">
                {t('heroTitleHighlight')}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-neutral-600 max-w-2xl font-normal leading-relaxed">
              {t('heroSubtitle')}
            </p>

            {/* Core Mantra tag */}
            <div className="inline-block rounded-xl border border-neutral-200/80 bg-neutral-100/70 px-3.5 py-2 text-xs font-semibold text-neutral-700 italic tracking-wide">
              {t('heroMotto')}
            </div>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <a
                href="#precos"
                onClick={(e) => handleScrollTo(e, '#precos', 'hero_primary')}
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-950 px-7 py-4 text-sm font-bold text-white shadow-md shadow-neutral-950/20 hover:bg-neutral-800 transition-all hover:scale-102 active:scale-98"
              >
                <span>{t('heroCtaPrimary')}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#modelos"
                onClick={(e) => handleScrollTo(e, '#modelos', 'hero_secondary')}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white px-6 py-4 text-sm font-bold text-neutral-800 shadow-2xs hover:bg-neutral-50 hover:border-neutral-400 transition-colors"
              >
                <Eye className="h-4 w-4 text-neutral-500" />
                <span>{t('heroCtaSecondary')}</span>
              </a>
            </div>

            {/* Quick Micro-benefits row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-neutral-200/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-neutral-900 shrink-0" />
                <span className="text-xs font-medium text-neutral-700">{t('heroChip1')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-neutral-900 shrink-0" />
                <span className="text-xs font-medium text-neutral-700">{t('heroChip2')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-neutral-900 shrink-0" />
                <span className="text-xs font-medium text-neutral-700">{t('heroChip3')}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Overlapping Device Collage (col-span-5) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Main Laptop / Desktop Mockup Frame */}
              <div className="relative z-10 rounded-2xl border border-slate-800/10 bg-white p-2 shadow-2xl shadow-slate-900/15 transition-transform duration-500 hover:scale-[1.01]">
                {/* Browser bar top */}
                <div className="flex items-center justify-between border-b border-neutral-100 bg-neutral-50/90 px-3 py-2 rounded-t-xl">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-neutral-400" />
                  </div>
                  <div className="rounded-md bg-white border border-neutral-200/80 px-2.5 py-0.5 text-[10px] font-mono text-neutral-400">
                    seunegocio.com
                  </div>
                  <div className="h-2 w-2 rounded-full bg-neutral-400" />
                </div>

                {/* Screenshot inside mockup */}
                <div className="relative overflow-hidden rounded-b-xl aspect-[16/10] bg-neutral-900 group">
                  <img
                    src={SITE_IMAGES.models.restaurante}
                    alt={t('heroRealModelTitle')}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent flex items-end p-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-300">
                        {t('heroRealModelLabel')}
                      </span>
                      <p className="text-xs sm:text-sm font-bold text-white">
                        {t('heroRealModelTitle')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Overlapping Mobile Smartphone Mockup */}
              <div className="absolute -bottom-8 -left-4 sm:-bottom-10 sm:-left-8 z-20 w-44 sm:w-52 rounded-3xl border-4 border-neutral-950 bg-neutral-950 p-1 shadow-2xl shadow-neutral-950/40 rotate-[-4deg] transition-transform duration-300 hover:rotate-0">
                {/* Phone screen */}
                <div className="relative overflow-hidden rounded-[20px] aspect-[9/16] bg-neutral-900">
                  <img
                    src={SITE_IMAGES.models.barbearia}
                    alt={t('heroRealModelLabel')}
                    className="h-full w-full object-cover"
                    loading="eager"
                  />
                  {/* Floating Action Button simulation */}
                  <div className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-950 text-white shadow-lg border border-neutral-700">
                    <MessageCircle className="h-4 w-4" />
                  </div>
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 h-3.5 w-16 bg-neutral-950 rounded-full" />
                </div>
              </div>

              {/* Floating Chip 2: Verified Delivery */}
              <div className="hidden sm:flex absolute bottom-4 -right-6 z-20 items-center gap-2 rounded-xl border border-neutral-200 bg-white/95 px-3 py-2 text-xs font-semibold text-neutral-900 shadow-md backdrop-blur-md">
                <ShieldCheck className="h-4 w-4 text-neutral-900" />
                <span>{t('heroPillDelivery')}</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
