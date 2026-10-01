import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  SiteLanguage, 
  SITE_LANGUAGES, 
  SiteLanguageOption, 
  siteTranslations, 
  SiteTranslationsStructure,
  SiteTranslationKey 
} from '../i18n/siteTranslations';

interface SiteLanguageContextType {
  language: SiteLanguage;
  setLanguage: (lang: SiteLanguage) => void;
  t: (key: SiteTranslationKey) => string;
  currentTranslations: SiteTranslationsStructure;
  currentOption: SiteLanguageOption;
  availableLanguages: SiteLanguageOption[];
}

const SiteLanguageContext = createContext<SiteLanguageContextType | undefined>(undefined);

/**
 * Detects browser language automatically:
 * - Portuguese (pt-BR, pt-PT, pt) -> 'pt'
 * - Spanish (es, es-ES, es-MX, etc.) -> 'es'
 * - English (en, en-US, en-GB, etc.) -> 'en'
 * Defaults according to browser language preferences, falling back to 'es' or 'pt' or 'en'.
 */
export const detectBrowserLanguage = (): SiteLanguage => {
  try {
    const browserLangs: string[] = [];
    if (typeof navigator !== 'undefined') {
      if (Array.isArray(navigator.languages) && navigator.languages.length > 0) {
        browserLangs.push(...navigator.languages);
      }
      if (navigator.language) {
        browserLangs.push(navigator.language);
      }
    }

    for (const rawLang of browserLangs) {
      if (!rawLang) continue;
      const lower = rawLang.toLowerCase().trim();
      if (lower.startsWith('pt')) return 'pt';
      if (lower.startsWith('es')) return 'es';
      if (lower.startsWith('en')) return 'en';
    }
  } catch {
    // ignore
  }

  return 'es'; // Default fallback
};

export const SiteLanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SiteLanguage>(detectBrowserLanguage);

  useEffect(() => {
    // Keep document lang in sync
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  // Listen to browser language change event (e.g. user toggles device or browser language)
  useEffect(() => {
    const handleLanguageChange = () => {
      const detected = detectBrowserLanguage();
      setLanguageState(detected);
    };

    window.addEventListener('languagechange', handleLanguageChange);
    return () => window.removeEventListener('languagechange', handleLanguageChange);
  }, []);

  const setLanguage = (lang: SiteLanguage) => {
    setLanguageState(lang);
  };

  const currentTranslations = siteTranslations[language] || siteTranslations.pt;

  const t = (key: SiteTranslationKey): string => {
    const val = currentTranslations[key];
    if (typeof val === 'string') return val;
    const fallback = siteTranslations.pt[key];
    return typeof fallback === 'string' ? fallback : String(key);
  };

  return (
    <SiteLanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        currentTranslations,
        currentOption: SITE_LANGUAGES[language],
        availableLanguages: Object.values(SITE_LANGUAGES),
      }}
    >
      {children}
    </SiteLanguageContext.Provider>
  );
};

export const useSiteLanguage = (): SiteLanguageContextType => {
  const context = useContext(SiteLanguageContext);
  if (!context) {
    throw new Error('useSiteLanguage must be used within a SiteLanguageProvider');
  }
  return context;
};
