import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Check, ArrowRight, Sparkles } from 'lucide-react';
import { useSiteLanguage } from '../../context/SiteLanguageContext';

export const ProcessSection: React.FC = () => {
  const { language } = useSiteLanguage();

  // Content localized for PT, EN, and ES
  const content = {
    pt: {
      eyebrow: 'METODOLOGIA & ALINHAMENTO',
      titleLine1: 'Um caminho de escuta,',
      titleLine2: 'clareza e precisão.',
      subtitle:
        'Como uma consulta estruturada: cada etapa foi desenhada para transformar sua essência em autoridade digital com serenidade e classe.',
      phasePrefix: 'FASE',
      phaseFinal: 'FASE FINAL',
      dragHint: 'Deslize ou clique nos cards para navegar',
      bottomTaglineLeft: 'ESTRATÉGIA + DESIGN + TECNOLOGIA = RESULTADOS',
      bottomTaglineRight1: 'Não é apenas um site.',
      bottomTaglineRight2: 'É sua próxima oportunidade.',
      steps: [
        {
          num: '01',
          phase: 'FASE 01',
          title: 'Diagnóstico & Alinhamento',
          desc: 'Compreendemos seu posicionamento, a audiência e a voz essencial do seu negócio.',
          actionText: 'PRIMEIRO CONTATO',
          image: '/images/process/step1.jpg',
          tag: 'Alinhamento',
        },
        {
          num: '02',
          phase: 'FASE 02',
          title: 'Briefing Consciente',
          desc: 'Um questionário ágil de 5 minutos, sem tecnicismos nem fricção cognitiva.',
          actionText: 'CLAREZA DE ESCOPO',
          image: '/images/process/step2.jpg',
          tag: 'Imersão',
        },
        {
          num: '03',
          phase: 'FASE 03',
          title: 'Artesania & Código',
          desc: 'Design intencional, tipografia atemporal e arquitetura de alto rendimento.',
          actionText: 'ARTESANIA VISUAL',
          image: '/images/process/step3.jpg',
          tag: 'Desenvolvimento',
        },
        {
          num: '04',
          phase: 'FASE 04',
          title: 'Sessão de Ajustes',
          desc: 'Apresentação privada para acolher suas percepções e harmonizar cada detalhe.',
          actionText: 'AJUSTES FINOS',
          image: '/images/process/step4.jpg',
          tag: 'Refinamento',
        },
        {
          num: '05',
          phase: 'FASE FINAL',
          title: 'Seu Site no Ar & Pronto',
          desc: 'Domínio conectado, velocidade ultra-rápida, SEO indexado e pronto para atrair clientes.',
          actionText: 'SITE PUBLICADO',
          image: '/images/process/step5.jpg',
          tag: '🟢 NO AR',
          isFinal: true,
        },
      ],
    },
    en: {
      eyebrow: 'METHODOLOGY & ALIGNMENT',
      titleLine1: 'A journey of listening,',
      titleLine2: 'clarity, and precision.',
      subtitle:
        'Like a structured consultation: each phase is crafted to transform your core identity into calm digital authority with effortless prestige.',
      phasePrefix: 'PHASE',
      phaseFinal: 'FINAL PHASE',
      dragHint: 'Swipe or click cards to navigate',
      bottomTaglineLeft: 'STRATEGY + DESIGN + TECHNOLOGY = RESULTS',
      bottomTaglineRight1: 'It is not just a website.',
      bottomTaglineRight2: 'It is your next opportunity.',
      steps: [
        {
          num: '01',
          phase: 'PHASE 01',
          title: 'Diagnostic & Alignment',
          desc: 'We clarify your true positioning, audience expectations, and unique brand voice.',
          actionText: 'INITIAL CONTACT',
          image: '/images/process/step1.jpg',
          tag: 'Alignment',
        },
        {
          num: '02',
          phase: 'PHASE 02',
          title: 'Conscious Intake',
          desc: 'A focused 5-minute briefing without technical friction or cognitive overload.',
          actionText: 'SCOPE CLARITY',
          image: '/images/process/step2.jpg',
          tag: 'Immersion',
        },
        {
          num: '03',
          phase: 'PHASE 03',
          title: 'Craft & Engineering',
          desc: 'Intentional aesthetics, timeless typography, and bespoke high-performance code.',
          actionText: 'VISUAL CRAFT',
          image: '/images/process/step3.jpg',
          tag: 'Craft',
        },
        {
          num: '04',
          phase: 'PHASE 04',
          title: 'Refinement Session',
          desc: 'Private preview walkthrough to welcome your feedback and harmonize every detail.',
          actionText: 'FINE TUNING',
          image: '/images/process/step4.jpg',
          tag: 'Polish',
        },
        {
          num: '05',
          phase: 'FINAL PHASE',
          title: 'Live & Ready to Convert',
          desc: 'Domain linked, blazingly fast, SEO indexed, and ready to welcome high-value clients.',
          actionText: 'SITE LAUNCHED',
          image: '/images/process/step5.jpg',
          tag: '🟢 LIVE',
          isFinal: true,
        },
      ],
    },
    es: {
      eyebrow: 'METODOLOGÍA & ALINEACIÓN',
      titleLine1: 'Un camino de escucha,',
      titleLine2: 'claridad y precisión.',
      subtitle:
        'Como una consulta estructurada: cada etapa está diseñada para transformar su esencia en autoridad digital con serenidad y clase.',
      phasePrefix: 'FASE',
      phaseFinal: 'FASE FINAL',
      dragHint: 'Deslice o haga clic en las tarjetas para navegar',
      bottomTaglineLeft: 'ESTRATEGIA + DISEÑO + TECNOLOGÍA = RESULTADOS',
      bottomTaglineRight1: 'No es solo un sitio web.',
      bottomTaglineRight2: 'Es su próxima oportunidad.',
      steps: [
        {
          num: '01',
          phase: 'FASE 01',
          title: 'Diagnóstico & Alineación',
          desc: 'Comprendemos su posicionamiento, la audiencia y la voz esencial de su negocio.',
          actionText: 'PRIMER CONTACTO',
          image: '/images/process/step1.jpg',
          tag: 'Alineación',
        },
        {
          num: '02',
          phase: 'FASE 02',
          title: 'Briefing Consciente',
          desc: 'Un cuestionario ágil de 5 minutos, sin tecnicismos ni fricción cognitiva.',
          actionText: 'CLARIDAD DE ALCANCE',
          image: '/images/process/step2.jpg',
          tag: 'Inmersión',
        },
        {
          num: '03',
          phase: 'FASE 03',
          title: 'Artesanía & Código',
          desc: 'Diseño intencional, tipografía atemporal y arquitectura de alto rendimiento a medida.',
          actionText: 'ARTESANÍA VISUAL',
          image: '/images/process/step3.jpg',
          tag: 'Desarrollo',
        },
        {
          num: '04',
          phase: 'FASE 04',
          title: 'Sesión de Ajustes',
          desc: 'Presentación privada de demostración para armonizar cada detalle a su gusto.',
          actionText: 'AJUSTES FINOS',
          image: '/images/process/step4.jpg',
          tag: 'Pulido',
        },
        {
          num: '05',
          phase: 'FASE FINAL',
          title: 'Su presencia digital, lista.',
          desc: 'Dominio conectado, ultra-rápido, SEO indexado en Google y listo para atraer clientes.',
          actionText: 'SITIO PUBLICADO',
          image: '/images/process/step5.jpg',
          tag: '🟢 EN VIVO',
          isFinal: true,
        },
      ],
    },
  };

  const t = content[language] || content.pt;
  const totalSteps = t.steps.length;

  // Active step index (0 to 4)
  const [activeIndex, setActiveIndex] = useState(0);
  const [stepSpacing, setStepSpacing] = useState(250);

  // Drag interaction tracking
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const dragStartX = useRef<number>(0);
  const hasMoved = useRef<boolean>(false);

  // Responsive card spacing calculation
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setStepSpacing(160);
      } else if (w < 1024) {
        setStepSpacing(210);
      } else {
        setStepSpacing(260);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? totalSteps - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === totalSteps - 1 ? 0 : prev + 1));
  };

  // Pointer drag/swipe gestures for ultra-fluid response
  const handlePointerDown = (clientX: number) => {
    setIsDragging(true);
    dragStartX.current = clientX;
    hasMoved.current = false;
    setDragOffset(0);
  };

  const handlePointerMove = (clientX: number) => {
    if (!isDragging) return;
    const delta = clientX - dragStartX.current;
    if (Math.abs(delta) > 5) {
      hasMoved.current = true;
    }
    // Limit drag resistance
    const maxDrag = stepSpacing * 0.8;
    const clamped = Math.max(-maxDrag, Math.min(maxDrag, delta));
    setDragOffset(clamped);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (Math.abs(dragOffset) > 45) {
      if (dragOffset > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
    setDragOffset(0);
  };

  return (
    <section
      id="metodologia"
      className="relative w-full bg-white text-slate-900 py-16 sm:py-24 overflow-hidden select-none"
    >
      {/* Parent Section Background Image Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-0">
        <img
          src="/images/process/bg_face.jpg"
          alt="Backdrop"
          className="w-full h-full object-cover object-center md:object-right-top opacity-20 md:opacity-25 mix-blend-multiply filter contrast-125 grayscale"
          loading="eager"
        />
        {/* Seamless edge fade overlays ensuring zero hard lines with adjacent sections */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-white/40" />
      </div>

      {/* Subtle architectural background ambiance */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-slate-100/50 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-slate-900" />
              <div className="w-7 h-px bg-slate-300" />
              <span className="text-[11px] font-semibold tracking-[0.25em] text-slate-500 uppercase">
                {t.eyebrow}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
              {t.titleLine1}{' '}
              <span className="font-extrabold text-slate-900">
                {t.titleLine2}
              </span>
            </h2>

            {/* Subtitle */}
            <p className="mt-3 text-sm sm:text-base text-slate-600 font-light leading-relaxed max-w-lg">
              {t.subtitle}
            </p>
          </div>

          {/* Drag Hint */}
          <div className="hidden md:flex items-center gap-2 text-[11px] tracking-wider uppercase text-slate-400 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-slate-400" />
            <span>{t.dragHint}</span>
          </div>
        </div>

        {/* ULTRA-SMOOTH 3D COVERFLOW STAGE */}
        <div
          className="relative w-full h-[320px] sm:h-[360px] md:h-[390px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
          style={{ perspective: '1100px' }}
          onMouseDown={(e) => handlePointerDown(e.clientX)}
          onMouseMove={(e) => handlePointerMove(e.clientX)}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onTouchStart={(e) => handlePointerDown(e.touches[0].clientX)}
          onTouchMove={(e) => handlePointerMove(e.touches[0].clientX)}
          onTouchEnd={handlePointerUp}
        >
          {/* Ground reflection glow */}
          <div className="absolute bottom-2 w-[70%] max-w-[480px] h-[25px] bg-slate-300/35 rounded-[100%] blur-md pointer-events-none -z-0" />

          {/* Cards container */}
          <div className="relative w-[190px] sm:w-[220px] md:w-[245px] h-[260px] sm:h-[300px] md:h-[335px] flex items-center justify-center">
            {t.steps.map((step, idx) => {
              // Calculate shortest cyclical distance from activeIndex
              let diff = idx - activeIndex;
              if (diff > totalSteps / 2) diff -= totalSteps;
              if (diff < -totalSteps / 2) diff += totalSteps;

              const isCurrent = diff === 0;

              // Smooth positioning calculations
              const translateX = diff * stepSpacing + dragOffset;
              const rotateY = diff * -14;
              const scale = isCurrent ? 1 : Math.max(0.76, 1 - Math.abs(diff) * 0.12);
              const opacity = isCurrent ? 1 : Math.max(0.35, 1 - Math.abs(diff) * 0.32);
              const zIndex = isCurrent ? 40 : 30 - Math.abs(diff) * 5;

              return (
                <div
                  key={step.num}
                  onClick={() => {
                    if (!hasMoved.current) {
                      setActiveIndex(idx);
                    }
                  }}
                  className={`absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer ${
                    isDragging
                      ? 'transition-none'
                      : 'transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]'
                  }`}
                  style={{
                    transform: `translate3d(${translateX}px, 0px, ${isCurrent ? 0 : -50}px) rotateY(${rotateY}deg) scale(${scale})`,
                    transformStyle: 'preserve-3d',
                    zIndex,
                    opacity,
                    willChange: 'transform, opacity',
                    boxShadow: isCurrent
                      ? '0 22px 50px -12px rgba(15, 23, 42, 0.35), 0 0 0 1px rgba(15, 23, 42, 0.12)'
                      : '0 12px 28px -10px rgba(15, 23, 42, 0.22)',
                  }}
                >
                  {/* Card Background image with chiaroscuro overlay */}
                  <div className="absolute inset-0 bg-slate-950">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover opacity-85 mix-blend-luminosity brightness-90 contrast-125"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/30" />

                    {/* Non-active dimming overlay */}
                    {!isCurrent && (
                      <div className="absolute inset-0 bg-slate-950/40 pointer-events-none transition-opacity duration-300" />
                    )}
                  </div>

                  {/* Card content */}
                  <div className="relative h-full flex flex-col justify-between p-4 sm:p-5 text-white">
                    {/* Top row: Stage / Number badge */}
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-2xl sm:text-3xl font-extrabold tracking-tighter text-white font-mono">
                          {step.num}
                        </span>
                        <div className="text-[9px] sm:text-[10px] font-semibold tracking-[0.18em] text-slate-300 uppercase mt-0.5">
                          {step.phase}
                        </div>
                      </div>

                      {step.isFinal ? (
                        <div className="w-7 h-7 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white">
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                      ) : (
                        <span className="text-[9px] font-mono font-medium px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-slate-200">
                          {step.tag}
                        </span>
                      )}
                    </div>

                    {/* Bottom area: Title & description */}
                    <div>
                      <h3 className="text-sm sm:text-base font-bold tracking-tight text-white mb-1 leading-snug">
                        {step.title}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-slate-300 line-clamp-2 leading-relaxed font-light mb-2.5">
                        {step.desc}
                      </p>

                      <div className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-wider text-white uppercase group-hover:text-neutral-300 transition-colors">
                        <span>{step.actionText}</span>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>

                  {/* Active Card Highlight Border */}
                  {isCurrent && (
                    <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-white/60 pointer-events-none" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CONTROLS UNDER THE CARD (Identical to user's uploaded reference image) */}
        <div className="flex items-center justify-center gap-6 mt-6 sm:mt-8">
          {/* Step number: 03 / 05 */}
          <div className="flex items-baseline gap-1 font-mono select-none">
            <span className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              {t.steps[activeIndex].num}
            </span>
            <span className="text-slate-400 font-semibold text-lg sm:text-xl">
              / 0{totalSteps}
            </span>
          </div>

          {/* White circular navigation buttons (< and >) */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              aria-label="Etapa anterior"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border border-slate-100 shadow-md shadow-slate-200/70 hover:shadow-lg hover:border-slate-200 text-slate-800 flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Próxima etapa"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border border-slate-100 shadow-md shadow-slate-200/70 hover:shadow-lg hover:border-slate-200 text-slate-800 flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.2]" />
            </button>
          </div>
        </div>



        {/* Bottom Tagline / Summary Footer */}
        <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-3 text-xs font-medium text-slate-500">
          <div className="tracking-[0.18em] font-mono text-slate-600 uppercase text-center md:text-left text-[11px]">
            {t.bottomTaglineLeft}
          </div>
          <div className="text-slate-800 font-medium text-center md:text-right">
            <span>{t.bottomTaglineRight1}</span>{' '}
            <strong className="text-slate-950 font-bold">
              {t.bottomTaglineRight2}
            </strong>
          </div>
        </div>
      </div>
    </section>
  );
};
