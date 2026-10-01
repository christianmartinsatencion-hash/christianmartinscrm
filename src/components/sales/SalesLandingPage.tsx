import React, { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { HeroSection } from './HeroSection';
import { PortfolioSection } from './PortfolioSection';
import { ProcessSection } from './ProcessSection';
import { PricingSection } from './PricingSection';
import { TrustSection } from './TrustSection';
import { FaqSection } from './FaqSection';
import { FinalCtaSection } from './FinalCtaSection';
import { Footer } from './Footer';
import { FloatingWhatsapp } from './FloatingWhatsapp';
import { CheckoutNoticeModal } from './CheckoutNoticeModal';
import { ModelPreviewModal } from './ModelPreviewModal';
import { LegalModal, LegalTab } from './LegalModal';
import { CookieConsentBanner } from './CookieConsentBanner';
import { PricingPackage, PRICING_PACKAGES } from '../../config/siteConfig';
import { initAnalytics, track } from '../../lib/analytics';

interface SalesLandingPageProps {
  onOpenCRM?: () => void;
}

export const SalesLandingPage: React.FC<SalesLandingPageProps> = ({ onOpenCRM }) => {
  const [selectedPackage, setSelectedPackage] = useState<PricingPackage | null>(null);
  const [previewModelId, setPreviewModelId] = useState<string | null>(null);
  const [legalTab, setLegalTab] = useState<LegalTab | null>(null);

  useEffect(() => {
    initAnalytics();
    track('page_view', { page: 'landing_page' });
  }, []);

  const handleOpenModelPreview = (modelId: string) => {
    track('service_view', { model_id: modelId, type: 'portfolio_preview' });
    setPreviewModelId(modelId);
  };

  const handleScrollToPricing = () => {
    track('pricing_view', { trigger: 'scroll_from_modal' });
    const el = document.querySelector('#precos');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FBFBFC] text-neutral-900 font-sans antialiased selection:bg-neutral-900 selection:text-white">
      {/* Sticky Header */}
      <Navbar onOpenCRM={onOpenCRM} />

      <main>
        {/* 1. Hero with Asymmetric Typography & Device Mockup Collage */}
        <HeroSection onOpenModelPreview={handleOpenModelPreview} />

        {/* 2. Portfólio / Modelos (Escolha um ponto de partida) */}
        <PortfolioSection
          onOpenModelPreview={handleOpenModelPreview}
          onSelectPackage={(id) => {
            const pkg = PRICING_PACKAGES.find((p) => p.id === id) || PRICING_PACKAGES[1];
            setSelectedPackage(pkg);
          }}
        />

        {/* 3. Como Funciona (Horizontal Animated Interactive Timeline) */}
        <ProcessSection />

        {/* 4. Preços (START €199, PRO €299 - Mais Escolhido, PREMIUM €499) */}
        <PricingSection onSelectPackage={setSelectedPackage} />

        {/* 5. Confiança (Sem complicações, preço transparente, sem falsas avaliações) */}
        <TrustSection />

        {/* 6. Perguntas Frequentes (FAQ) */}
        <FaqSection />

        {/* 7. CTA Final */}
        <FinalCtaSection />
      </main>

      {/* Footer com gatilho discreto no logo para abrir o CRM */}
      <Footer
        onOpenLegal={(tab) => setLegalTab(tab)}
        onOpenCRM={onOpenCRM}
      />

      {/* Cookie Consent Banner */}
      <CookieConsentBanner onOpenLegal={(tab) => setLegalTab(tab)} />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsapp />

      {/* Interactive Model Preview Modal */}
      {previewModelId && (
        <ModelPreviewModal
          modelId={previewModelId}
          onClose={() => setPreviewModelId(null)}
          onSelectPlan={handleScrollToPricing}
        />
      )}

      {/* Checkout / Payment Modal with WhatsApp Fallback */}
      {selectedPackage && (
        <CheckoutNoticeModal
          pkg={selectedPackage}
          onClose={() => setSelectedPackage(null)}
        />
      )}

      {/* Privacy Policy, Cookie Policy & Terms Modal */}
      <LegalModal
        isOpen={!!legalTab}
        initialTab={legalTab || 'privacy'}
        onClose={() => setLegalTab(null)}
      />
    </div>
  );
};
