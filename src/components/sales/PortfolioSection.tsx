import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { useSiteLanguage } from '../../context/SiteLanguageContext';
import { SITE_IMAGES } from '../../config/siteConfig';

interface PortfolioSectionProps {
  onOpenModelPreview: (modelId: string) => void;
  onSelectPackage: (packageId: 'start' | 'pro' | 'premium') => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ 
  onOpenModelPreview,
  onSelectPackage,
}) => {
  const { t, currentTranslations } = useSiteLanguage();

  const getModelImage = (id: string) => {
    switch (id) {
      case 'restaurante': return SITE_IMAGES.models.restaurante;
      case 'barbearia': return SITE_IMAGES.models.barbearia;
      case 'imobiliaria': return SITE_IMAGES.models.imobiliaria;
      default: return SITE_IMAGES.models.servicos;
    }
  };

  return (
    <section id="modelos" className="py-20 sm:py-28 bg-[#FAFAFA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div className="max-w-2xl text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-800 bg-neutral-100 border border-neutral-200 px-3 py-1 rounded-full">
              {t('portfolioEyebrow')}
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-950 tracking-tight font-display">
              {t('portfolioTitle')}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed">
              {t('portfolioSubtitle')}
            </p>
          </div>

          <div className="shrink-0 text-left md:text-right">
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
              {t('portfolioHeaderNoticeTitle')}
            </p>
            <p className="text-xs sm:text-sm font-semibold text-neutral-700">
              {t('portfolioHeaderNoticeDesc')}
            </p>
          </div>
        </div>

        {/* Asymmetrical Portfolio Layout */}
        <div className="space-y-10 sm:space-y-16">
          {currentTranslations.modelsList.map((model, idx) => {
            const isEven = idx % 2 === 0;
            const modelImg = getModelImage(model.id);

            return (
              <div
                key={model.id}
                className="group relative rounded-3xl border border-neutral-200/90 bg-white p-6 sm:p-8 lg:p-10 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${isEven ? '' : 'lg:grid-flow-dense'}`}>
                  
                  {/* Visual Screenshot Frame (lg:col-span-7) */}
                  <div className={`lg:col-span-7 ${isEven ? '' : 'lg:col-start-6'}`}>
                    <div className="relative overflow-hidden rounded-2xl border border-neutral-200/80 bg-neutral-950 shadow-lg">
                      {/* Browser top pill bar */}
                      <div className="flex items-center justify-between border-b border-white/10 bg-neutral-900/90 px-4 py-2.5 backdrop-blur-md">
                        <div className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-neutral-500" />
                          <span className="h-2 w-2 rounded-full bg-neutral-400" />
                          <span className="h-2 w-2 rounded-full bg-neutral-300" />
                        </div>
                        <span className="text-[11px] font-mono text-neutral-400">
                          preview.{model.id}.webstudio.com
                        </span>
                        <span className="rounded-full bg-white/15 px-2 py-0.5 text-[9px] font-bold text-neutral-200 uppercase">
                          {model.badge}
                        </span>
                      </div>

                      {/* Main Screenshot preview - Static Image */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                        <img
                          src={modelImg}
                          alt={model.title}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Editorial Details Column (lg:col-span-5) */}
                  <div className={`lg:col-span-5 space-y-4 sm:space-y-5 text-left ${isEven ? '' : 'lg:col-start-1 lg:row-start-1'}`}>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-3xl sm:text-4xl font-black text-neutral-300">
                        {model.number}
                      </span>
                      <div className="h-px flex-1 bg-neutral-200" />
                      <span className="text-xs font-bold uppercase tracking-wider text-neutral-800 bg-neutral-100 border border-neutral-200 px-2.5 py-1 rounded-md">
                        {model.category}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight font-display">
                      {model.title}
                    </h3>

                    <p className="text-sm font-semibold text-neutral-700 leading-snug">
                      {model.tagline}
                    </p>

                    <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                      {model.description}
                    </p>

                    {/* Feature tags in selected language */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {model.features.map((feat, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-xs font-medium text-neutral-700"
                        >
                          <Check className="h-3.5 w-3.5 text-neutral-900" />
                          {feat}
                        </span>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-3">
                      <a
                        href="#precos"
                        className="inline-flex items-center gap-2 rounded-xl bg-neutral-950 px-5 py-2.5 text-xs font-bold text-white hover:bg-neutral-800 transition-colors shadow-sm"
                      >
                        <span>{t('btnChooseThis')}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
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
