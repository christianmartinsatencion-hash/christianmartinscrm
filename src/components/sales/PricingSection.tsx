import React, { useEffect } from 'react';
import { Check, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { useSiteLanguage } from '../../context/SiteLanguageContext';
import { PricingPackage, paymentLinks, getWhatsAppLink } from '../../config/siteConfig';
import { track } from '../../lib/analytics';

interface PricingSectionProps {
  onSelectPackage: (pkg: PricingPackage) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPackage }) => {
  const { t, currentTranslations } = useSiteLanguage();

  useEffect(() => {
    const el = document.getElementById('precos');
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            track('pricing_view', { section: 'pricing' });
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const getPackagePrice = (id: string): number => {
    switch (id) {
      case 'start': return 199;
      case 'pro': return 299;
      default: return 499;
    }
  };

  const handlePackageClick = (pkgTranslated: { id: 'start' | 'pro' | 'premium'; name: string; pagesCount: string; ctaText: string; deliverables: string[] }) => {
    const price = getPackagePrice(pkgTranslated.id);
    track('cta_click', { cta_id: `select_package_${pkgTranslated.id}`, package_id: pkgTranslated.id, price_eur: price });

    const rawLink = paymentLinks[pkgTranslated.id];
    if (rawLink && rawLink.startsWith('https://')) {
      window.open(rawLink, '_blank', 'noopener,noreferrer');
      return;
    }

    const fullPkg: PricingPackage = {
      id: pkgTranslated.id,
      name: pkgTranslated.name,
      priceEur: price,
      pagesCount: pkgTranslated.pagesCount,
      deliverables: pkgTranslated.deliverables,
      ctaKey: pkgTranslated.ctaText,
      featured: pkgTranslated.id === 'pro',
      featuredBadge: t('popularBadge'),
    };
    onSelectPackage(fullPkg);
  };

  return (
    <section id="precos" className="py-20 sm:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-800 bg-neutral-100 border border-neutral-200 px-3 py-1 rounded-full">
            {t('pricingEyebrow')}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-950 tracking-tight font-display">
            {t('pricingTitle')}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed">
            {t('pricingSubtitle')}
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 items-stretch">
          {currentTranslations.packagesList.map((pkg) => {
            const isPro = pkg.id === 'pro';
            const price = getPackagePrice(pkg.id);

            return (
              <div
                key={pkg.id}
                className={`relative flex flex-col justify-between rounded-3xl p-7 sm:p-9 transition-all duration-300 text-left ${
                  isPro
                    ? 'border-2 border-neutral-950 bg-neutral-950 text-white shadow-2xl lg:-translate-y-3 z-10'
                    : 'border border-neutral-200/90 bg-white text-neutral-900 shadow-sm hover:shadow-lg'
                }`}
              >
                {/* Popular Pill Badge */}
                {isPro && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-white px-4 py-1 text-[11px] font-black uppercase tracking-wider text-neutral-950 shadow-md border border-neutral-200 flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-neutral-950" />
                    <span>{t('popularBadge')}</span>
                  </div>
                )}

                {/* Top Info */}
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className={`text-2xl font-black tracking-tight font-display ${isPro ? 'text-white' : 'text-neutral-950'}`}>
                      {pkg.name}
                    </h3>
                    <span
                      className={`rounded-lg px-2.5 py-1 text-xs font-bold ${
                        isPro
                          ? 'bg-white/10 text-neutral-300'
                          : 'bg-neutral-100 text-neutral-700'
                      }`}
                    >
                      {pkg.pagesCount}
                    </span>
                  </div>

                  {/* Price Block */}
                  <div className="mt-5 pb-6 border-b border-neutral-200/20">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl sm:text-3xl font-bold">€</span>
                      <span className="text-5xl sm:text-6xl font-black tracking-tight font-display">
                        {price}
                      </span>
                    </div>
                    <p className={`text-xs mt-1 font-medium ${isPro ? 'text-neutral-400' : 'text-neutral-500'}`}>
                      {t('singlePayment')} • {t('noRecurringFees')}
                    </p>
                  </div>

                  {/* Deliverables List in Active Language */}
                  <div className="mt-6 space-y-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                      {t('includedItemsTitle')}
                    </p>
                    <ul className="space-y-2.5">
                      {pkg.deliverables.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm">
                          <Check
                            className={`h-4 w-4 shrink-0 mt-0.5 ${
                              isPro ? 'text-white' : 'text-neutral-900'
                            }`}
                          />
                          <span className={isPro ? 'text-neutral-200' : 'text-neutral-700'}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="mt-8 pt-6 border-t border-neutral-200/10">
                  <button
                    type="button"
                    onClick={() => handlePackageClick(pkg)}
                    className={`w-full flex items-center justify-center gap-2 rounded-xl py-3.5 px-4 text-sm font-bold transition-all transform active:scale-98 cursor-pointer ${
                      isPro
                        ? 'bg-white text-neutral-950 hover:bg-neutral-100 shadow-lg'
                        : 'bg-neutral-950 text-white hover:bg-neutral-800 shadow-xs'
                    }`}
                  >
                    <span>{pkg.ctaText}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <p className="text-[11px] text-center mt-2.5 text-neutral-400">
                    {t('deliveryTimeNotice')}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Transparency Notice */}
        <div className="mt-12 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-neutral-900 shrink-0" />
            <div>
              <p className="text-xs sm:text-sm font-bold text-neutral-900">
                {t('guaranteeTitle')}
              </p>
              <p className="text-xs text-neutral-500">
                {t('guaranteeDesc')}
              </p>
            </div>
          </div>
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-xs font-bold text-neutral-900 underline hover:text-neutral-600"
          >
            {t('pricingQuestionLink')}
          </a>
        </div>

      </div>
    </section>
  );
};
