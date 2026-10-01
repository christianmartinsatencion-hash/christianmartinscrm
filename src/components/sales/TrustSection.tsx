import React from 'react';
import { DollarSign, CheckCircle2, Palette, Smartphone } from 'lucide-react';
import { useSiteLanguage } from '../../context/SiteLanguageContext';

export const TrustSection: React.FC = () => {
  const { t } = useSiteLanguage();

  const trustPillars = [
    {
      title: t('trust1Title'),
      desc: t('trust1Desc'),
      icon: DollarSign,
      color: 'bg-neutral-100 text-neutral-900 border border-neutral-200',
    },
    {
      title: t('trust2Title'),
      desc: t('trust2Desc'),
      icon: CheckCircle2,
      color: 'bg-neutral-100 text-neutral-900 border border-neutral-200',
    },
    {
      title: t('trust3Title'),
      desc: t('trust3Desc'),
      icon: Palette,
      color: 'bg-neutral-100 text-neutral-900 border border-neutral-200',
    },
    {
      title: t('trust4Title'),
      desc: t('trust4Desc'),
      icon: Smartphone,
      color: 'bg-neutral-100 text-neutral-900 border border-neutral-200',
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-[#FAFAFA] border-t border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-14 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-800 bg-neutral-100 border border-neutral-200 px-3 py-1 rounded-full">
            {t('trustEyebrow')}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-black text-neutral-950 tracking-tight font-display">
            {t('trustTitle')}
          </h2>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {trustPillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-2xs hover:shadow-md transition-shadow"
              >
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.color} mb-4`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-950 font-display">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
