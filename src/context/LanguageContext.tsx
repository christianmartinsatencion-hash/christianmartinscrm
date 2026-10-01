import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Language, 
  LANGUAGES, 
  LanguageOption, 
  translations, 
  TranslationKey 
} from '../i18n/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  formatCurrency: (value: number) => string;
  formatDate: (dateStr: string) => string;
  currentOption: LanguageOption;
  availableLanguages: LanguageOption[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('cm_crm_lang') as Language;
      if (saved && (saved === 'pt' || saved === 'en' || saved === 'es')) {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'pt'; // default to Portuguese
  });

  useEffect(() => {
    try {
      localStorage.setItem('cm_crm_lang', language);
      document.documentElement.lang = language;
    } catch {
      // ignore
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: TranslationKey): string => {
    const langDict = translations[language] || translations.pt;
    return langDict[key] || translations.pt[key] || key;
  };

  const formatCurrency = (value: number): string => {
    const config = LANGUAGES[language] || LANGUAGES.pt;
    try {
      return new Intl.NumberFormat(config.locale, {
        style: 'currency',
        currency: config.currency,
        maximumFractionDigits: 0,
      }).format(value);
    } catch {
      return `${config.currency} ${value.toLocaleString()}`;
    }
  };

  const formatDate = (dateStr: string): string => {
    if (!dateStr) return '';
    try {
      // If it's YYYY-MM-DD
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
        const [year, month, day] = dateStr.split('-');
        const date = new Date(Number(year), Number(month) - 1, Number(day));
        const config = LANGUAGES[language] || LANGUAGES.pt;
        return date.toLocaleDateString(config.locale);
      }
      return dateStr;
    } catch {
      return dateStr;
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        formatCurrency,
        formatDate,
        currentOption: LANGUAGES[language],
        availableLanguages: Object.values(LANGUAGES),
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
