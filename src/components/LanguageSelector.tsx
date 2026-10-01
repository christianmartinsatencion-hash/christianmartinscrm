import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { FlagIcon } from './FlagIcon';
import { Language } from '../i18n/translations';

interface LanguageSelectorProps {
  compact?: boolean;
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  compact = false,
  className = '' 
}) => {
  const { language, setLanguage, availableLanguages, currentOption } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 shadow-2xs hover:bg-slate-50 focus:border-blue-500 focus:outline-hidden transition-colors"
        aria-label="Alterar idioma / Change language"
        aria-expanded={isOpen}
      >
        <FlagIcon country={currentOption.code} size="md" />
        <span className="font-semibold text-slate-800 uppercase tracking-wide">
          {currentOption.code}
        </span>
        {!compact && (
          <span className="hidden lg:inline text-slate-600 font-normal">
            {currentOption.label}
          </span>
        )}
        <ChevronDown className={`h-3.5 w-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-52 origin-top-right rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg ring-1 ring-black/5 z-50 animate-in fade-in-50 zoom-in-95 duration-100">
          <div className="px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Idioma / Language / Idioma
          </div>
          <div className="space-y-0.5">
            {availableLanguages.map((item) => {
              const isSelected = language === item.code;
              return (
                <button
                  key={item.code}
                  onClick={() => handleSelect(item.code)}
                  className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-xs transition-colors ${
                    isSelected
                      ? 'bg-blue-50 text-blue-800 font-medium'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <FlagIcon country={item.code} size="md" />
                    <div className="text-left">
                      <p className="font-medium text-slate-900 leading-none">{item.nativeLabel}</p>
                      <p className="text-[10px] text-slate-400 leading-tight mt-0.5">{item.label}</p>
                    </div>
                  </div>
                  {isSelected && <Check className="h-4 w-4 text-blue-600 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
