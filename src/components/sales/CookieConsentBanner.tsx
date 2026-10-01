import React, { useState, useEffect } from 'react';
import { Cookie, ShieldCheck, X } from 'lucide-react';
import { useSiteLanguage } from '../../context/SiteLanguageContext';
import { LegalTab } from './LegalModal';
import { track, refreshSession } from '../../lib/analytics';

interface CookieConsentBannerProps {
  onOpenLegal: (tab: LegalTab) => void;
}

const STORAGE_KEY = 'cm_cookie_consent_v1';

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({ onOpenLegal }) => {
  const { t } = useSiteLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem(STORAGE_KEY);
      if (!consent) {
        // Short delay to avoid layout shift on initial load
        const timer = setTimeout(() => setIsVisible(true), 800);
        return () => clearTimeout(timer);
      }
    } catch {
      // In case localStorage is blocked by user privacy settings
      setIsVisible(false);
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'all');
      refreshSession();
      track('page_view', { page: 'landing_page', consent_status: 'all_granted' });
    } catch {
      // ignore
    }
    setIsVisible(false);
  };

  const handleOnlyEssential = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'essential');
    } catch {
      // ignore
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Aviso de Cookies e Privacidade"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 animate-in slide-in-from-bottom-5 duration-300"
    >
      <div className="rounded-2xl border border-neutral-200/90 bg-white/95 backdrop-blur-md p-4 sm:p-5 shadow-2xl ring-1 ring-black/5 text-neutral-900">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-neutral-900 text-white shadow-xs">
            <Cookie className="h-4 w-4" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-xs sm:text-sm tracking-tight text-neutral-950 font-display flex items-center gap-1.5">
                <span>{t('cookieBannerTitle')}</span>
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              </h4>

              <button
                type="button"
                onClick={handleOnlyEssential}
                className="text-neutral-400 hover:text-neutral-700 transition-colors p-1"
                aria-label="Dispensar aviso"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <p className="mt-1.5 text-xs text-neutral-600 leading-relaxed">
              {t('cookieBannerText')}
            </p>

            {/* Actions */}
            <div className="mt-3.5 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleAcceptAll}
                className="rounded-lg bg-neutral-950 px-3.5 py-1.5 text-xs font-bold text-white shadow-2xs hover:bg-neutral-800 transition-all active:scale-98"
              >
                {t('cookieBannerAcceptAll')}
              </button>

              <button
                type="button"
                onClick={handleOnlyEssential}
                className="rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors"
              >
                {t('cookieBannerOnlyEssential')}
              </button>

              <button
                type="button"
                onClick={() => onOpenLegal('cookies')}
                className="text-xs font-medium text-neutral-500 underline underline-offset-2 hover:text-neutral-950 transition-colors ml-auto"
              >
                {t('cookieBannerPreferences')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
