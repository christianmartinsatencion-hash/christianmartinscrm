import React from 'react';
import { Scissors, Utensils, Sparkles, Building, Wrench, Briefcase, ArrowUpRight } from 'lucide-react';
import { useSiteLanguage } from '../../context/SiteLanguageContext';
import { SITE_IMAGES } from '../../config/siteConfig';

export const NichesSection: React.FC = () => {
  const { t, currentTranslations } = useSiteLanguage();

  const getIcon = (id: string) => {
    switch (id) {
      case 'barbearia': return <Scissors className="h-4 w-4" />;
      case 'restaurante': return <Utensils className="h-4 w-4" />;
      case 'salao': return <Sparkles className="h-4 w-4" />;
      case 'imobiliaria': return <Building className="h-4 w-4" />;
      case 'oficina': return <Wrench className="h-4 w-4" />;
      default: return <Briefcase className="h-4 w-4" />;
    }
  };

  const getImage = (id: string) => {
    switch (id) {
      case 'barbearia': return SITE_IMAGES.niches.barbearia;
      case 'restaurante': return SITE_IMAGES.niches.restaurante;
      case 'salao': return SITE_IMAGES.niches.salao;
      case 'imobiliaria': return SITE_IMAGES.niches.imobiliaria;
      case 'oficina': return SITE_IMAGES.niches.oficina;
      default: return SITE_IMAGES.niches.consultoria;
    }
  };

  return (
    <section id="segmentos" className="py-20 sm:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            {t('nichesEyebrow')}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight font-display">
            {t('nichesTitle')}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            {t('nichesSubtitle')}
          </p>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6">
          {currentTranslations.nichesList.map((niche, index) => {
            const colSpans = [
              'lg:col-span-5',
              'lg:col-span-7',
              'lg:col-span-7',
              'lg:col-span-5',
              'lg:col-span-6',
              'lg:col-span-6',
            ];
            const spanClass = colSpans[index % colSpans.length];

            return (
              <div
                key={niche.id}
                className={`group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-900 ${spanClass} min-h-[260px] sm:min-h-[290px] shadow-2xs hover:shadow-xl transition-all duration-500`}
              >
                {/* Background Image with dark overlay */}
                <img
                  src={getImage(niche.id)}
                  alt={niche.name}
                  className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

                {/* Content Overlay */}
                <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-7 text-white text-left">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-1.5 backdrop-blur-md border border-white/10">
                      {getIcon(niche.id)}
                      <span className="text-xs font-bold tracking-wide uppercase">
                        {niche.badge}
                      </span>
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md">
                      <ArrowUpRight className="h-4 w-4 text-white" />
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400">
                      {t('nichesDedicatedLabel')}
                    </span>
                    <h3 className="mt-1 text-xl sm:text-2xl font-black text-white font-display">
                      {niche.name}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-slate-300">
                      {niche.highlight}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
