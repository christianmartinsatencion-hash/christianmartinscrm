import React, { useState } from 'react';
import { X, Smartphone, Monitor, Check, ArrowRight } from 'lucide-react';
import { SITE_IMAGES } from '../../config/siteConfig';
import { useSiteLanguage } from '../../context/SiteLanguageContext';

interface ModelPreviewModalProps {
  modelId: string | null;
  onClose: () => void;
  onSelectPlan: () => void;
}

export const ModelPreviewModal: React.FC<ModelPreviewModalProps> = ({
  modelId,
  onClose,
  onSelectPlan,
}) => {
  const { t, currentTranslations } = useSiteLanguage();
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');

  if (!modelId) return null;

  const model = currentTranslations.modelsList.find((m) => m.id === modelId) || currentTranslations.modelsList[0];

  const getModelImage = (id: string) => {
    switch (id) {
      case 'restaurante': return SITE_IMAGES.models.restaurante;
      case 'barbearia': return SITE_IMAGES.models.barbearia;
      case 'imobiliaria': return SITE_IMAGES.models.imobiliaria;
      default: return SITE_IMAGES.models.servicos;
    }
  };

  const handleChooseThisModel = () => {
    onClose();
    onSelectPlan();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-3 sm:p-6 backdrop-blur-sm animate-in fade-in-50 duration-200">
      <div className="relative flex flex-col w-full max-w-5xl h-[92vh] max-h-[850px] rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl text-white overflow-hidden">
        
        {/* Top Control Bar */}
        <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-950 px-4 sm:px-6 py-3.5">
          <div className="flex items-center gap-3 text-left">
            <span className="font-mono text-xs font-black text-white bg-neutral-800 border border-neutral-700 px-2 py-0.5 rounded-md">
              {model.number}
            </span>
            <div>
              <h4 className="text-sm font-bold text-white font-display leading-tight">{model.title}</h4>
              <p className="text-[11px] text-neutral-400">{model.category}</p>
            </div>
          </div>

          {/* Device Switcher */}
          <div className="flex items-center gap-1 rounded-xl bg-neutral-800/90 p-1 border border-neutral-700/80">
            <button
              type="button"
              onClick={() => setDeviceMode('desktop')}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors cursor-pointer ${
                deviceMode === 'desktop'
                  ? 'bg-white text-neutral-950 shadow-xs'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Monitor className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{t('previewDeviceDesktop')}</span>
            </button>
            <button
              type="button"
              onClick={() => setDeviceMode('mobile')}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors cursor-pointer ${
                deviceMode === 'mobile'
                  ? 'bg-white text-neutral-950 shadow-xs'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Smartphone className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{t('previewDeviceMobile')}</span>
            </button>
          </div>

          {/* Close & Action */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleChooseThisModel}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-1.5 text-xs font-bold text-neutral-950 hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              <span>{t('previewChooseBtn')}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Viewport Simulation Area */}
        <div className="flex-1 overflow-y-auto bg-slate-950 p-4 sm:p-6 flex items-center justify-center">
          <div
            className={`transition-all duration-300 overflow-hidden shadow-2xl ${
              deviceMode === 'desktop'
                ? 'w-full max-w-4xl rounded-2xl border border-slate-700/80 bg-white text-slate-900'
                : 'w-[320px] sm:w-[360px] rounded-[36px] border-8 border-slate-800 bg-white text-slate-900 aspect-[9/18] overflow-y-auto'
            }`}
          >
            {/* Simulated Website Content */}
            <div className="relative">
              {/* Fake Nav */}
              <div className="flex items-center justify-between border-b border-slate-100 bg-white px-5 py-3 text-xs">
                <span className="font-extrabold tracking-tight text-slate-900 font-display">
                  {model.title}
                </span>
                <div className="flex items-center gap-3 text-[11px] text-slate-500">
                  <span>{t('previewMenuServices')}</span>
                  <span>{t('previewContact')}</span>
                  <span className="rounded-full bg-slate-950 px-2.5 py-1 text-[10px] font-bold text-white">
                    WhatsApp
                  </span>
                </div>
              </div>

              {/* Hero Image in simulation */}
              <div className="relative h-64 sm:h-80 overflow-hidden bg-slate-900">
                <img
                  src={getModelImage(model.id)}
                  alt={model.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-6 text-white text-left">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-300">
                    {model.badge}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black font-display mt-1">{model.title}</h2>
                  <p className="text-xs text-neutral-300 mt-1 max-w-md">{model.tagline}</p>
                </div>
              </div>

              {/* Simulated Features / Services grid */}
              <div className="p-6 text-left space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  {t('previewFeaturesTitle')}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {model.features.map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 p-2.5 text-xs font-medium text-neutral-700"
                    >
                      <Check className="h-4 w-4 text-neutral-900 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <p className="text-[11px] text-neutral-500">
                    {t('previewCustomizedNotice')}
                  </p>
                  <button
                    type="button"
                    onClick={handleChooseThisModel}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-950 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-neutral-800 cursor-pointer"
                  >
                    <span>{t('previewChooseBtn')}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
