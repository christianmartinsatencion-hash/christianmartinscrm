import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { getWhatsAppLink } from '../../config/siteConfig';
import { useSiteLanguage } from '../../context/SiteLanguageContext';
import { track } from '../../lib/analytics';

export const FloatingWhatsapp: React.FC = () => {
  const { t } = useSiteLanguage();
  const [showTooltip, setShowTooltip] = useState(true);

  const handleClick = () => {
    track('whatsapp_click', { location: 'floating' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 shadow-xl border border-neutral-200 text-xs font-semibold text-neutral-800 animate-in fade-in-50 slide-in-from-right-2 duration-300">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neutral-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neutral-900"></span>
          </span>
          <span>{t('whatsappFloatingTooltip')}</span>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setShowTooltip(false);
            }}
            className="text-neutral-400 hover:text-neutral-600 ml-1 p-0.5"
            aria-label="Fechar dica"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-neutral-950 text-white shadow-xl shadow-neutral-950/40 hover:bg-neutral-800 hover:scale-110 active:scale-95 transition-all duration-200 border border-neutral-800"
        aria-label="Abrir conversa no WhatsApp"
      >
        <span className="absolute -inset-1 rounded-full bg-white/10 opacity-30 animate-pulse pointer-events-none" />
        <MessageCircle className="h-7 w-7 transition-transform group-hover:rotate-6 text-white" />
      </a>
    </div>
  );
};
