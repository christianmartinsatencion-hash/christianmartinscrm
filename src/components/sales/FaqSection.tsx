import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useSiteLanguage } from '../../context/SiteLanguageContext';

export const FaqSection: React.FC = () => {
  const { t, currentTranslations } = useSiteLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-800 bg-neutral-100 border border-neutral-200 px-3 py-1 rounded-full">
            {t('faqEyebrow')}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-950 tracking-tight font-display">
            {t('faqTitle')}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600">
            {t('faqSubtitle')}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {currentTranslations.faqItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-neutral-200/90 bg-[#FAFAFA] transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  className="flex w-full items-center justify-between p-5 sm:p-6 text-left font-bold text-neutral-900 hover:text-neutral-600 transition-colors focus:outline-hidden cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-display pr-4">{item.q}</span>
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-200/70 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-neutral-900 text-white' : 'text-neutral-600'
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-200/60 animate-in fade-in-50 duration-150 text-left">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
