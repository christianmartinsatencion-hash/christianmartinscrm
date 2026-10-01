import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, MoreVertical } from 'lucide-react';
import { useSiteLanguage } from '../../context/SiteLanguageContext';
import { SITE_BRAND } from '../../config/siteConfig';
import { FountainPenLogo } from '../common/FountainPenLogo';

interface NavbarProps {
  onOpenCRM?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCRM }) => {
  const { t } = useSiteLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuDropdownOpen, setMenuDropdownOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { href: '#modelos', label: t('navModels') },
    { href: '#como-funciona', label: t('navHowItWorks') },
    { href: '#precos', label: t('navPricing') },
    { href: '#faq', label: t('navFaq') },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuDropdownOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-100 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#top"
              onClick={(e) => handleScrollTo(e, '#top')}
              className="group flex items-center gap-2.5 text-neutral-900 transition-opacity hover:opacity-90"
            >
              <FountainPenLogo size="md" />
              <div className="flex flex-col">
                <span className="font-extrabold text-sm sm:text-base tracking-tight font-display text-neutral-950 flex items-center gap-1">
                  Christian Martins
                  <span className="h-1.5 w-1.5 rounded-full bg-neutral-900 inline-block"></span>
                </span>
                <span className="text-[10px] text-neutral-500 font-medium tracking-wide uppercase">
                  Web Studio
                </span>
              </div>
            </a>

            {/* Right actions: CTA + 3-dots Menu */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Primary CTA */}
              <a
                href="#precos"
                onClick={(e) => handleScrollTo(e, '#precos')}
                className="inline-flex items-center gap-1.5 rounded-full bg-neutral-950 px-3.5 sm:px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-neutral-800 transition-all hover:scale-102 active:scale-98"
              >
                <span>{t('ctaHeader')}</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>

              {/* 3-dots menu button */}
              <div className="relative" ref={menuRef}>
                <button
                  type="button"
                  onClick={() => setMenuDropdownOpen(!menuDropdownOpen)}
                  className={`flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border transition-all ${
                    menuDropdownOpen
                      ? 'border-neutral-900 bg-neutral-900 text-white'
                      : 'border-neutral-200 bg-white/90 text-neutral-700 shadow-2xs hover:bg-neutral-100'
                  }`}
                  aria-label="Mais opções de navegação"
                >
                  <MoreVertical className="h-4 w-4" />
                </button>

                {menuDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-neutral-200 bg-white p-2 shadow-xl ring-1 ring-black/5 z-50 animate-in fade-in-50 duration-100">
                    <div className="flex flex-col gap-1">
                      {navLinks.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          onClick={(e) => {
                            handleScrollTo(e, link.href);
                            setMenuDropdownOpen(false);
                          }}
                          className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950 transition-colors"
                        >
                          <span>{link.label}</span>
                          <span className="text-[10px] text-neutral-400">↗</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

    </>
  );
};
