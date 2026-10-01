import React from 'react';
import { useSiteLanguage } from '../../context/SiteLanguageContext';
import { SITE_BRAND, getWhatsAppLink } from '../../config/siteConfig';
import { MessageCircle, Instagram, Mail, MapPin } from 'lucide-react';
import { FountainPenLogo } from '../common/FountainPenLogo';
import { LegalTab } from './LegalModal';

import { track } from '../../lib/analytics';

interface FooterProps {
  onOpenLegal?: (tab: LegalTab) => void;
  onOpenCRM?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal, onOpenCRM }) => {
  const { t } = useSiteLanguage();

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsappClick = () => {
    track('whatsapp_click', { location: 'footer' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-white/10 text-xs py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10 text-left">
          
          {/* Brand Info (col-span-5) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Logo com gatilho discreto para entrar no CRM */}
            <button
              type="button"
              onClick={onOpenCRM}
              className="flex items-center gap-2.5 text-white text-left group cursor-pointer focus:outline-none transition-transform active:scale-98 select-none"
              title="Acesso Privado"
              aria-label={SITE_BRAND.name}
            >
              <FountainPenLogo size="sm" />
              <span className="font-extrabold text-base tracking-tight font-display text-white">
                {SITE_BRAND.name} <span className="text-neutral-400 font-normal">{SITE_BRAND.tagline}</span>
              </span>
            </button>
            
            <p className="text-neutral-400 leading-relaxed max-w-sm">
              {t('footerDesc')}
            </p>

            <div className="flex items-center gap-2 text-neutral-500 text-[11px]">
              <MapPin className="h-3.5 w-3.5 text-neutral-400" />
              <span>{SITE_BRAND.location}</span>
            </div>
          </div>

          {/* Quick Links (col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <p className="font-bold uppercase tracking-wider text-white text-[11px]">
              {t('footerQuickLinks')}
            </p>
            <ul className="space-y-2">
              <li>
                <a href="#top" onClick={(e) => handleScrollTo(e, '#top')} className="hover:text-white transition-colors">
                  {t('navHome')}
                </a>
              </li>
              <li>
                <a href="#modelos" onClick={(e) => handleScrollTo(e, '#modelos')} className="hover:text-white transition-colors">
                  {t('navModels')}
                </a>
              </li>
              <li>
                <a href="#como-funciona" onClick={(e) => handleScrollTo(e, '#como-funciona')} className="hover:text-white transition-colors">
                  {t('navHowItWorks')}
                </a>
              </li>
              <li>
                <a href="#precos" onClick={(e) => handleScrollTo(e, '#precos')} className="hover:text-white transition-colors">
                  {t('navPricing')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact (col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <p className="font-bold uppercase tracking-wider text-white text-[11px]">
              {t('footerContact')}
            </p>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleWhatsappClick}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <MessageCircle className="h-4 w-4 text-white shrink-0" />
                  <span>WhatsApp: <strong className="text-white font-mono">{SITE_BRAND.phone}</strong></span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_BRAND.email}`}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Mail className="h-4 w-4 text-neutral-400" />
                  <span>{SITE_BRAND.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={SITE_BRAND.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-pink-400 transition-colors"
                >
                  <Instagram className="h-4 w-4 text-pink-400" />
                  <span>{SITE_BRAND.instagram}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Legal (col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <p className="font-bold uppercase tracking-wider text-white text-[11px]">
              {t('footerLegal')}
            </p>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal ? onOpenLegal('terms') : undefined}
                  className="hover:text-white transition-colors text-left"
                >
                  {t('footerTerms')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal ? onOpenLegal('privacy') : undefined}
                  className="hover:text-white transition-colors text-left"
                >
                  {t('footerPrivacy')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal ? onOpenLegal('cookies') : undefined}
                  className="hover:text-white transition-colors text-left"
                >
                  {t('footerCookies')}
                </button>
              </li>
              <li>
                <a href="#precos" onClick={(e) => handleScrollTo(e, '#precos')} className="hover:text-white transition-colors">
                  {t('footerGuarantee')}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {SITE_BRAND.copyrightYear} {SITE_BRAND.name}. {t('footerCopyright')}</p>
          <p>{t('footerNotice')}</p>
        </div>

      </div>
    </footer>
  );
};
