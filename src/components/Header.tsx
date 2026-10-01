import React from 'react';
import { Menu, Search, Plus, Bell } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  onToggleSidebar: () => void;
  title: string;
  onQuickAction?: () => void;
  quickActionLabel?: string;
  onExitToPublic?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  title,
  onQuickAction,
  quickActionLabel,
  onExitToPublic,
}) => {
  const { t } = useLanguage();
  const defaultActionLabel = quickActionLabel || t('quickNewDefault');

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur-xs sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 md:hidden"
          aria-label="Abrir menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h2 className="text-base sm:text-lg font-semibold text-slate-900 truncate">{title}</h2>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            className="h-9 w-40 rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs text-slate-900 placeholder-slate-400 transition-all focus:w-56 focus:border-blue-500 focus:bg-white focus:outline-hidden lg:w-52"
          />
        </div>

        {/* Language Selector with Flag */}
        <LanguageSelector />

        {/* Notifications */}
        <button
          className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
          aria-label={t('notifications')}
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white" />
        </button>

        {/* Quick action button */}
        {onQuickAction && (
          <button
            onClick={onQuickAction}
            className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 active:scale-98 transition-colors shrink-0"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">{defaultActionLabel}</span>
          </button>
        )}

        {/* Return to Public Site button */}
        {onExitToPublic && (
          <button
            onClick={onExitToPublic}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-800 transition-all shadow-xs cursor-pointer"
            title="Ir para o Site Público de Vendas"
          >
            <span>🌐 Ver Site</span>
            <span className="text-[10px] text-slate-400 font-mono">↗</span>
          </button>
        )}
      </div>
    </header>
  );
};
