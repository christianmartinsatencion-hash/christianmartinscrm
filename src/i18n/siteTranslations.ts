export type SiteLanguage = 'pt' | 'en' | 'es';

export interface SiteLanguageOption {
  code: SiteLanguage;
  name: string;
  nativeName: string;
  flag: string;
  countryCode: 'pt' | 'en' | 'es';
}

export const SITE_LANGUAGES: Record<SiteLanguage, SiteLanguageOption> = {
  pt: {
    code: 'pt',
    name: 'Português',
    nativeName: 'Português (BR)',
    flag: '🇧🇷',
    countryCode: 'pt',
  },
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English (US)',
    flag: '🇺🇸',
    countryCode: 'en',
  },
  es: {
    code: 'es',
    name: 'Español',
    nativeName: 'Español (ES)',
    flag: '🇪🇸',
    countryCode: 'es',
  },
};

export interface PortfolioModelTranslation {
  id: string;
  number: string;
  category: string;
  title: string;
  tagline: string;
  description: string;
  badge: string;
  features: string[];
}

export interface NicheTranslation {
  id: string;
  name: string;
  highlight: string;
  badge: string;
}

export interface PackageTranslation {
  id: 'start' | 'pro' | 'premium';
  name: string;
  pagesCount: string;
  ctaText: string;
  deliverables: string[];
}

export interface SiteTranslationsStructure {
  // Navigation
  navHome: string;
  navModels: string;
  navNiches: string;
  navBenefits: string;
  navHowItWorks: string;
  navOtherServices: string;
  navPricing: string;
  navFaq: string;
  ctaHeader: string;

  // Other Services (WhatsApp Automation & 24/7 AI)
  otherServicesBadge: string;
  otherServicesTitle: string;
  otherServicesSubtitle: string;
  otherServicesWaTitle: string;
  otherServicesWaDesc: string;
  otherServicesAiTitle: string;
  otherServicesAiDesc: string;
  otherServicesQualifyTitle: string;
  otherServicesQualifyDesc: string;
  otherServicesHowTitle: string;
  otherServicesHowSubtitle: string;
  otherServicesStep1Title: string;
  otherServicesStep1Desc: string;
  otherServicesStep2Title: string;
  otherServicesStep2Desc: string;
  otherServicesStep3Title: string;
  otherServicesStep3Desc: string;
  otherServicesStep4Title: string;
  otherServicesStep4Desc: string;
  otherServicesLiveBadge: string;
  otherServicesCta: string;
  otherServicesNote: string;
  otherServicesCard2Tag: string;
  otherServicesCard3Tag: string;
  otherServicesFlowBadge: string;
  otherServicesWaAssistantName: string;
  otherServicesWaStatus: string;
  otherServicesWaPlaceholder: string;
  otherServicesWaUser1: string;
  otherServicesWaAi1: string;
  otherServicesWaUser2: string;
  otherServicesWaAi2: string;

  // Hero
  heroBadge: string;
  heroStartingPrice: string;
  heroTitleLine1: string;
  heroTitleHighlight: string;
  heroSubtitle: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  heroMotto: string;
  heroPillSpeed: string;
  heroPillSpeedSub: string;
  heroPillDelivery: string;
  heroChip1: string;
  heroChip2: string;
  heroChip3: string;
  heroRealModelLabel: string;
  heroRealModelTitle: string;

  // Niches section
  nichesEyebrow: string;
  nichesTitle: string;
  nichesSubtitle: string;
  nichesDedicatedLabel: string;
  nichesList: NicheTranslation[];

  // Portfolio Models section
  portfolioEyebrow: string;
  portfolioTitle: string;
  portfolioSubtitle: string;
  portfolioHeaderNoticeTitle: string;
  portfolioHeaderNoticeDesc: string;
  btnViewModel: string;
  btnChooseThis: string;
  modelsList: PortfolioModelTranslation[];

  // Benefits section
  benefitsEyebrow: string;
  benefitsTitle: string;
  benefitsSubtitle: string;
  benefitTrafficPill: string;
  benefitStatFluid: string;
  benefitStatFluidSub: string;
  benefitStatTouch: string;
  benefitStatTouchSub: string;
  benefitStatOverflow: string;
  benefitStatOverflowSub: string;
  benefitWhatsappPill: string;
  benefit1Title: string;
  benefit1Desc: string;
  benefit2Title: string;
  benefit2Desc: string;
  benefit3Title: string;
  benefit3Desc: string;
  benefit4Title: string;
  benefit4Desc: string;
  benefit5Title: string;
  benefit5Desc: string;
  benefit6Title: string;
  benefit6Desc: string;
  benefit7Title: string;
  benefit7Desc: string;
  benefit8Title: string;
  benefit8Desc: string;

  // Process section
  processEyebrow: string;
  processTitle: string;
  processSubtitle: string;
  processStepWord: string;
  processFooterNotice: string;
  processFooterLink: string;
  stepsList: Array<{ num: string; title: string; desc: string; tag: string }>;

  // Pricing section
  pricingEyebrow: string;
  pricingTitle: string;
  pricingSubtitle: string;
  popularBadge: string;
  singlePayment: string;
  noRecurringFees: string;
  includedItemsTitle: string;
  deliveryTimeNotice: string;
  guaranteeTitle: string;
  guaranteeDesc: string;
  pricingQuestionLink: string;
  packagesList: PackageTranslation[];

  // Trust section
  trustEyebrow: string;
  trustTitle: string;
  trust1Title: string;
  trust1Desc: string;
  trust2Title: string;
  trust2Desc: string;
  trust3Title: string;
  trust3Desc: string;
  trust4Title: string;
  trust4Desc: string;

  // FAQ section
  faqEyebrow: string;
  faqTitle: string;
  faqSubtitle: string;
  faqItems: Array<{ q: string; a: string }>;

  // Final CTA
  finalCtaEyebrow: string;
  finalCtaTitle: string;
  finalCtaText: string;
  finalCtaBtn: string;
  finalWhatsappBtn: string;
  finalCtaBadge: string;

  // Modals & Floating WhatsApp
  whatsappFloatingTooltip: string;
  checkoutModalTitle: string;
  checkoutModalNoHiddenFees: string;
  checkoutStripeReadyTitle: string;
  checkoutStripeReadyDesc: string;
  checkoutProceedWhatsapp: string;
  checkoutClose: string;
  previewModalTitle: string;
  previewDeviceDesktop: string;
  previewDeviceMobile: string;
  previewFeaturesTitle: string;
  previewCustomizedNotice: string;
  previewChooseBtn: string;
  previewMenuServices: string;
  previewContact: string;

  // Footer
  footerDesc: string;
  footerQuickLinks: string;
  footerContact: string;
  footerLegal: string;
  footerTerms: string;
  footerPrivacy: string;
  footerCookies: string;
  footerGuarantee: string;
  footerCopyright: string;
  footerNotice: string;

  // Cookie Consent Banner
  cookieBannerTitle: string;
  cookieBannerText: string;
  cookieBannerAcceptAll: string;
  cookieBannerOnlyEssential: string;
  cookieBannerPreferences: string;
}

export const siteTranslations: Record<SiteLanguage, SiteTranslationsStructure> = {
  pt: {
    // Nav
    navHome: 'Início',
    navModels: 'Modelos',
    navNiches: 'Segmentos',
    navBenefits: 'Benefícios',
    navHowItWorks: 'Como Funciona',
    navOtherServices: 'Outros Serviços',
    navPricing: 'Preços',
    navFaq: 'FAQ',
    ctaHeader: 'Quero meu site',

    // Outros Serviços (Automação WhatsApp & IA 24/7)
    otherServicesBadge: 'Automação Inteligente de Vendas & Atendimento',
    otherServicesTitle: 'IA no WhatsApp que atende seus clientes',
    otherServicesSubtitle: 'Esqueça os robôs travados e lentos de antigamente. Implementamos Inteligência Artificial humanizada que entende o contexto do seu negócio, tira dúvidas e fecha vendas no WhatsApp 24 horas por dia, 7 dias por semana.',
    otherServicesWaTitle: 'Automação de WhatsApp Sob Medida',
    otherServicesWaDesc: 'Respostas em segundos sem filas. Dispare avisos, confirmações de pedidos e lembretes automáticos sem risco de bloqueio.',
    otherServicesAiTitle: 'IA com Linguagem 100% Humanizada',
    otherServicesAiDesc: 'Treinada especificamente com a tabela de preços, serviços, tom de voz e regras do seu negócio. Soe acolhedor e natural a cada conversa.',
    otherServicesQualifyTitle: 'Qualificação & Agendamento Automático',
    otherServicesQualifyDesc: 'A IA filtra os curiosos, identifica clientes prontos para comprar, agenda horários na sua agenda e avisa sua equipe com o resumo pronto.',
    otherServicesHowTitle: 'Como funciona a automação na prática?',
    otherServicesHowSubtitle: 'Veja o passo a passo de como seu WhatsApp se transforma em um canal de vendas incansável:',
    otherServicesStep1Title: 'Cliente envia mensagem no WhatsApp',
    otherServicesStep1Desc: 'A qualquer horário do dia, noite ou fim de semana, seu cliente inicia a conversa buscando informações ou querendo contratar.',
    otherServicesStep2Title: 'IA analisa o contexto e responde em segundos',
    otherServicesStep2Desc: 'Em vez de respostas mecânicas ou menus chatos ("digite 1"), a IA conversa naturalmente, entendendo áudios ou textos com clareza.',
    otherServicesStep3Title: 'Tira dúvidas, orienta e qualifica o interesse',
    otherServicesStep3Desc: 'Apresenta detalhes dos serviços, envia fotos/tabelas se necessário, verifica disponibilidade e conduz o cliente para a decisão.',
    otherServicesStep4Title: 'Agendamento direto ou repasse para sua equipe',
    otherServicesStep4Desc: 'Se o cliente deseja fechar ou falar com você, a IA confirma os dados e encaminha o atendimento já qualificado e mastigado.',
    otherServicesLiveBadge: 'Online 24/7 • Respostas em menos de 5 segundos',
    otherServicesCta: 'Quero automação no meu WhatsApp',
    otherServicesNote: 'Integração oficial, segura e compatível com seu número atual de WhatsApp.',
    otherServicesCard2Tag: 'Sem menus frios do tipo "digite 1"',
    otherServicesCard3Tag: 'Integração com Google Calendar e CRM',
    otherServicesFlowBadge: 'Fluxo Inteligente',
    otherServicesWaAssistantName: 'Assistente Virtual IA',
    otherServicesWaStatus: 'Online agora • Atendimento 24/7',
    otherServicesWaPlaceholder: 'Mensagem respondida automaticamente pela IA...',
    otherServicesWaUser1: 'Olá! Vocês criam sites profissionais? Quanto tempo demora pra ficar pronto?',
    otherServicesWaAi1: 'Olá! Seja muito bem-vindo! Sim, entregamos seu site 100% pronto, rápido e adaptado para celular em apenas 5 a 7 dias úteis.',
    otherServicesWaUser2: 'Que maravilha! Tenho uma clínica e preciso receber mais contatos. Qual plano me recomendam?',
    otherServicesWaAi2: 'Para clínicas, o plano PRO (€299) é o campeão: tem botão direto pro WhatsApp, seção de especialidades e depoimentos. Quer dar uma olhada no modelo ao vivo agora?',

    // Hero
    heroBadge: 'Presença Digital de Alto Nível',
    heroStartingPrice: 'Sites a partir de €199',
    heroTitleLine1: 'Seu negócio merece um site',
    heroTitleHighlight: 'que pareça grande.',
    heroSubtitle: 'Sites profissionais, rápidos e personalizados para empresas que querem ser encontradas, gerar confiança e receber mais clientes.',
    heroCtaPrimary: 'Quero meu site',
    heroCtaSecondary: 'Ver modelos',
    heroMotto: '“Um site barato não precisa parecer barato.”',
    heroPillSpeed: 'Google PageSpeed',
    heroPillSpeedSub: '98/100 Mobile',
    heroPillDelivery: 'Pronto em até 7 dias',
    heroChip1: '100% Responsivo',
    heroChip2: 'WhatsApp Integrado',
    heroChip3: 'Google Maps Local',
    heroRealModelLabel: 'Modelo Real',
    heroRealModelTitle: 'Restaurante & Alta Gastronomia',

    // Niches
    nichesEyebrow: 'Adaptado à sua realidade',
    nichesTitle: 'Feito para o seu negócio.',
    nichesSubtitle: 'Desenvolvemos a estrutura visual ideal para valorizar a proposta única da sua empresa, seja qual for seu setor.',
    nichesDedicatedLabel: 'Solução Dedicada',
    nichesList: [
      { id: 'barbearia', name: 'Barbearias', highlight: 'Agendamentos descomplicados e estilo moderno', badge: 'Barbearias' },
      { id: 'restaurante', name: 'Restaurantes & Bares', highlight: 'Cardápio digital visual e reservas diretas', badge: 'Gastronomia' },
      { id: 'salao', name: 'Salões & Estética', highlight: 'Visual elegante, catálogo e agendamentos', badge: 'Beleza & Estilo' },
      { id: 'imobiliaria', name: 'Imobiliárias & Corretores', highlight: 'Vitrine de imóveis com filtros e formulários', badge: 'Imóveis' },
      { id: 'oficina', name: 'Oficinas & Auto Centers', highlight: 'Orçamentos rápidos e confiança imediata', badge: 'Automotivo' },
      { id: 'consultoria', name: 'Consultorias & Escritórios', highlight: 'Autoridade corporativa e captação de clientes', badge: 'Corporativo' },
    ],

    // Portfolio Models
    portfolioEyebrow: 'Design sob medida',
    portfolioTitle: 'Escolha um ponto de partida.',
    portfolioSubtitle: 'Conheça modelos reais criados com foco em autoridade e geração de contatos. Cada projeto é adaptado com a identidade e conteúdo da sua marca.',
    portfolioHeaderNoticeTitle: 'Todos os modelos incluem',
    portfolioHeaderNoticeDesc: 'WhatsApp + Google Maps + Mobile First',
    btnViewModel: 'Ver modelo',
    btnChooseThis: 'Quero este modelo',
    modelsList: [
      {
        id: 'restaurante',
        number: '01',
        category: 'Gastronomia & Lazer',
        title: 'Restaurante & Bistrô',
        tagline: 'Cardápio digital visual, reservas diretas e fotos de alta gastronomia.',
        description: 'Criado para atrair clientes locais, exibir pratos com fotografia impactante e permitir reservas rápidas via WhatsApp com 1 toque.',
        badge: 'Cardápio + Reservas',
        features: ['Cardápio Online', 'Botão Reserva Mesa', 'Integração Google Maps', 'Avaliações em Destaque'],
      },
      {
        id: 'barbearia',
        number: '02',
        category: 'Beleza & Estilo',
        title: 'Barbearia & Barber Club',
        tagline: 'Agendamento de horários descomplicado, tabela de serviços e visual vintage/moderno.',
        description: 'Perfeito para barbearias que desejam profissionalizar seu atendimento e lotar a agenda da equipe sem depender só do boca a boca.',
        badge: 'Agendamentos Rápidos',
        features: ['Agendamento WhatsApp', 'Lista de Preços', 'Galeria de Cortes', 'Horário de Funcionamento'],
      },
      {
        id: 'imobiliaria',
        number: '03',
        category: 'Imóveis & Corretores',
        title: 'Imobiliária & Corretor',
        tagline: 'Vitrine de imóveis de alto padrão com filtros, tour em fotos e formulário de visita.',
        description: 'Transmita a solidez que uma transação imobiliária exige. Imóveis organizados por bairro, valor e tipologia prontos para gerar leads quentes.',
        badge: 'Catálogo de Imóveis',
        features: ['Filtro de Imóveis', 'Formulário de Visita', 'Destaque de Bairros', 'Contato Direto com Corretor'],
      },
      {
        id: 'servicos',
        number: '04',
        category: 'Serviços Corporativos',
        title: 'Empresa de Serviços & Consultoria',
        tagline: 'Autoridade imediata para prestadores de serviços, clínicas, escritórios e consultorias.',
        description: 'Estruturado para explicar soluções complexas com clareza, apresentar credenciais e transformar visitantes em reuniões agendadas.',
        badge: 'Autoridade & Conversão',
        features: ['Apresentação de Serviços', 'Diferenciais Competitivos', 'Formulário de Diagnóstico', 'CTA de Orçamento'],
      },
    ],

    // Benefits
    benefitsEyebrow: 'Tranquilidade total',
    benefitsTitle: 'Você cuida do negócio. A gente cuida da sua presença online.',
    benefitsSubtitle: 'Sem jargões técnicos ou complicações. Entregamos uma ferramenta de vendas pronta para gerar clientes todos os dias.',
    benefitTrafficPill: '80%+ do seu tráfego',
    benefitStatFluid: 'Design Fluido',
    benefitStatFluidSub: '320px a 4K',
    benefitStatTouch: 'Botões Touch',
    benefitStatTouchSub: '48px+ Fácil',
    benefitStatOverflow: 'Sem Quebras',
    benefitStatOverflowSub: '0% Overflow',
    benefitWhatsappPill: 'Mensagem personalizada pronta para enviar',
    benefit1Title: 'Design profissional',
    benefit1Desc: 'Visual moderno, tipografia marcante e acabamento de alto padrão que transmite credibilidade instantânea.',
    benefit2Title: 'Mobile first',
    benefit2Desc: 'Mais de 80% dos seus clientes virão pelo celular. Seu site será impecável em qualquer tela de smartphone.',
    benefit3Title: 'WhatsApp integrado',
    benefit3Desc: 'Botão flutuante estratégico e links que direcionam o visitante para o seu chat em apenas um clique.',
    benefit4Title: 'Google Maps',
    benefit4Desc: 'Mapa interativo no ponto exato do seu estabelecimento para clientes encontrarem seu endereço sem esforço.',
    benefit5Title: 'Formulário de contato',
    benefit5Desc: 'Captação direta de pedidos e orçamentos enviados direto para o seu e-mail ou WhatsApp corporativo.',
    benefit6Title: 'SEO básico',
    benefit6Desc: 'Configurações semânticas e meta tags preparadas para o seu negócio ser indexado e encontrado no Google.',
    benefit7Title: 'Carregamento rápido',
    benefit7Desc: 'Código limpo e imagens otimizadas para carregar em frações de segundo, sem perder vendas por lentidão.',
    benefit8Title: 'Design personalizado',
    benefit8Desc: 'Cores, logo, fotos e textos alinhados à essência do seu negócio. Nada de aparência genérica de template.',

    // Process
    processEyebrow: 'Metodologia & Alinhamento',
    processTitle: 'Um percurso de escuta, clareza e precisão.',
    processSubtitle: 'Como uma consulta com propósito: cada etapa foi desenhada para transformar sua essência em autoridade digital com serenidade e elegância.',
    processStepWord: 'Etapa',
    processFooterNotice: 'Você não precisa dominar programação nem hospedagem. Conduzimos cada etapa com total transparência.',
    processFooterLink: 'Conheça nossos planos',
    stepsList: [
      { num: '01', title: 'Diagnóstico & Alinhamento', desc: 'Compreendemos o propósito, o público e o posicionamento autêntico do seu negócio.', tag: 'Alinhamento' },
      { num: '02', title: 'Briefing Consciente', desc: 'Um roteiro breve de 5 minutos, sem jargões técnicos ou formulários exaustivos.', tag: '5 minutos' },
      { num: '03', title: 'Lapidação & Código', desc: 'Design intencional, tipografia precisa e arquitetura de alto desempenho desenhados sob medida.', tag: 'Artesania' },
      { num: '04', title: 'Sessão de Ajustes', desc: 'Apresentação em link de prévia para escutar suas percepções e refinar cada elemento até a harmonia plena.', tag: 'Harmonização' },
      { num: '05', title: 'Presença no Ar', desc: 'Domínio conectado, presença consolidada e pronto para acolher novos clientes todos os dias.', tag: 'Consolidação' },
    ],

    // Pricing
    pricingEyebrow: 'Investimento transparente',
    pricingTitle: 'Escolha o plano certo para crescer.',
    pricingSubtitle: 'Valores transparentes, sem cobranças ocultas ou pegadinhas contratuais.',
    popularBadge: 'MAIS ESCOLHIDO',
    singlePayment: 'Pagamento único',
    noRecurringFees: 'Sem mensalidades obrigatórias',
    includedItemsTitle: 'O que está incluso:',
    deliveryTimeNotice: 'Entrega em até 7-10 dias úteis',
    guaranteeTitle: 'Garantia de Revisão e Ajustes Finos',
    guaranteeDesc: 'Seu site só vai para o ar após você testar a versão de demonstração e aprovar cada detalhe.',
    pricingQuestionLink: 'Ficou com dúvida sobre qual pacote escolher? Fale no WhatsApp',
    packagesList: [
      {
        id: 'start',
        name: 'START',
        pagesCount: '1 página',
        ctaText: 'Quero o START',
        deliverables: [
          'Site de 1 página (One Page de alta conversão)',
          'Design responsivo (mobile, tablet e desktop)',
          'Botão de WhatsApp flutuante integrado',
          'Localização com Google Maps interativo',
          'Formulário de contato direto',
          'Publicação e configuração no ar',
        ],
      },
      {
        id: 'pro',
        name: 'PRO',
        pagesCount: 'Até 5 páginas',
        ctaText: 'Quero o PRO',
        deliverables: [
          'Até 5 páginas completas (Início, Sobre, Serviços, Galeria, Contato)',
          'Design personalizado alinhado à sua marca',
          'Botão de WhatsApp integrado',
          'Localização com Google Maps',
          'Formulário de orçamento personalizado',
          'SEO básico para aparecer no Google',
          'Galeria de imagens interativa dos seus trabalhos',
          'Publicação profissional inclusa',
        ],
      },
      {
        id: 'premium',
        name: 'PREMIUM',
        pagesCount: 'Até 8 páginas',
        ctaText: 'Quero o PREMIUM',
        deliverables: [
          'Site completo com arquitetura de alta escala',
          'Design 100% exclusivo e personalizado',
          'Até 8 páginas detalhadas',
          'SEO básico e otimização avançada de velocidade',
          'Formulários e captação de leads qualificados',
          'Integrações com redes sociais e ferramentas',
          'Galeria dinâmica e portfólio rico',
          'Publicação e indexação no Google',
          'Suporte inicial prioritário dedicado',
        ],
      },
    ],

    // Trust
    trustEyebrow: 'Por que escolher a gente',
    trustTitle: 'Criar seu site não precisa ser uma dor de cabeça.',
    trust1Title: 'Preço transparente',
    trust1Desc: 'Você sabe exatamente quanto vai pagar desde o início. Sem surpresas ou mensalidades obrigatórias desnecessárias.',
    trust2Title: 'Sem complicação',
    trust2Desc: 'Falamos a sua língua. Nós cuidamos de toda a parte técnica, hospedagem e configurações para você focar nas suas vendas.',
    trust3Title: 'Design personalizado',
    trust3Desc: 'Cada detalhe visual é criado para valorizar seu negócio e deixá-lo com aparência de líder do seu setor local.',
    trust4Title: 'Pensado para celular',
    trust4Desc: 'Arquitetura testada em dezenas de aparelhos reais para garantir que todo visitante tenha uma experiência fluida.',

    // FAQ
    faqEyebrow: 'Tire suas dúvidas',
    faqTitle: 'Perguntas Frequentes',
    faqSubtitle: 'Respostas rápidas e diretas sobre prazos, funcionamento e suporte.',
    faqItems: [
      { q: 'Quanto tempo demora para criar meu site?', a: 'Em média de 5 a 10 dias úteis após o envio das informações e fotos do seu negócio.' },
      { q: 'O domínio está incluído?', a: 'Nós auxiliamos você a registrar o domínio no seu nome (custa cerca de €10/ano) para que a titularidade seja 100% sua. Nós cuidamos de toda a configuração técnica de DNS sem custo adicional.' },
      { q: 'Eu preciso fornecer as imagens?', a: 'Se você tiver fotos do seu espaço, equipe ou produtos, ótimo! Caso não tenha, utilizamos um banco de imagens de altíssima qualidade adequado ao seu nicho sem custo extra.' },
      { q: 'Posso pedir alterações?', a: 'Sim! Durante a etapa de revisão, você pode apontar mudanças de textos, cores ou ajustes de layout antes do lançamento final.' },
      { q: 'O site funciona no celular?', a: 'Com certeza. Desenvolvemos com foco prioritário em mobile first para que a experiência em smartphones seja impecável e rápida.' },
      { q: 'Posso contratar manutenção?', a: 'Sim. Oferecemos planos opcionais de manutenção e atualização para quem deseja suporte contínuo, sem qualquer fidelidade ou obrigatoriedade.' },
      { q: 'O pagamento é seguro?', a: 'Totalmente seguro. Utilizamos gateways confiáveis e certificados (como Stripe ou PayPal) com criptografia bancária.' },
    ],

    // Final CTA
    finalCtaEyebrow: 'Próximo passo',
    finalCtaTitle: 'Pronto para colocar seu negócio na internet?',
    finalCtaText: 'Escolha seu pacote e dê o primeiro passo para ter uma presença online profissional que vende por você 24 horas por dia.',
    finalCtaBtn: 'Quero meu site',
    finalWhatsappBtn: 'Falar no WhatsApp',
    finalCtaBadge: 'Sites a partir de €199 • Pagamento seguro • Sem complicações técnicas',

    // Modals
    whatsappFloatingTooltip: 'Fale com um especialista',
    checkoutModalTitle: 'Finalizar Escolha do Pacote',
    checkoutModalNoHiddenFees: 'Sem taxas ocultas',
    checkoutStripeReadyTitle: 'Ambiente pronto para Stripe / PayPal',
    checkoutStripeReadyDesc: 'Para sua comodidade, você pode confirmar o pedido e tirar qualquer dúvida diretamente no WhatsApp agora mesmo.',
    checkoutProceedWhatsapp: 'Continuar no WhatsApp',
    checkoutClose: 'Fechar',
    previewModalTitle: 'Demonstração Interativa do Modelo',
    previewDeviceDesktop: 'Desktop',
    previewDeviceMobile: 'Mobile',
    previewFeaturesTitle: 'Diferenciais Inclusos neste Modelo:',
    previewCustomizedNotice: 'Totalmente adaptado com as fotos e dados da sua empresa.',
    previewChooseBtn: 'Quero este modelo',
    previewMenuServices: 'Cardápio / Serviços',
    previewContact: 'Contato',

    // Footer
    footerDesc: 'Criamos sites profissionais, rápidos e personalizados para pequenas e médias empresas que querem ser encontradas e gerar autoridade.',
    footerQuickLinks: 'Navegação Rápida',
    footerContact: 'Contato & Atendimento',
    footerLegal: 'Informações Legais',
    footerTerms: 'Termos de Serviço',
    footerPrivacy: 'Política de Privacidade',
    footerCookies: 'Política de Cookies',
    footerGuarantee: 'Garantia de Entrega',
    footerCopyright: 'Todos os direitos reservados.',
    footerNotice: 'Exemplos de sites e imagens com finalidade demonstrativa.',

    // Cookie Banner
    cookieBannerTitle: 'Privacidade & Cookies',
    cookieBannerText: 'Utilizamos cookies essenciais para o funcionamento seguro do site e cookies analíticos para melhorar a sua experiência.',
    cookieBannerAcceptAll: 'Aceitar todos',
    cookieBannerOnlyEssential: 'Apenas essenciais',
    cookieBannerPreferences: 'Preferências & Política',
  },

  en: {
    // Nav
    navHome: 'Home',
    navModels: 'Templates',
    navNiches: 'Industries',
    navBenefits: 'Benefits',
    navHowItWorks: 'How It Works',
    navOtherServices: 'Other Services',
    navPricing: 'Pricing',
    navFaq: 'FAQ',
    ctaHeader: 'Get My Website',

    // Other Services (WhatsApp Automation & 24/7 AI)
    otherServicesBadge: 'Smart Sales & Customer Care Automation',
    otherServicesTitle: 'AI on WhatsApp that serves your clients',
    otherServicesSubtitle: 'Forget robotic, rigid bots with boring menus. We implement humanized AI that understands your business context, answers questions, and converts leads on WhatsApp 24 hours a day, 7 days a week.',
    otherServicesWaTitle: 'Tailored WhatsApp Automation',
    otherServicesWaDesc: 'Sub-second response times without queues. Send automated alerts, order updates, and reminders safely and reliably.',
    otherServicesAiTitle: '100% Humanized Conversational AI',
    otherServicesAiDesc: 'Trained specifically on your pricing, services, tone of voice, and business guidelines. Warm, natural, and helpful on every message.',
    otherServicesQualifyTitle: 'Lead Qualification & Auto-Booking',
    otherServicesQualifyDesc: 'The AI filters casual lookers, qualifies ready-to-buy customers, books calendar slots, and delivers ready summaries to your team.',
    otherServicesHowTitle: 'How does the automation work?',
    otherServicesHowSubtitle: 'Here is the step-by-step breakdown of how your WhatsApp becomes a non-stop sales channel:',
    otherServicesStep1Title: 'Customer sends a WhatsApp message',
    otherServicesStep1Desc: 'At any time of day, night, or weekend, your prospective client reaches out inquiring about services or wanting to buy.',
    otherServicesStep2Title: 'AI grasps context and replies in seconds',
    otherServicesStep2Desc: 'Instead of cold robotic menus ("press 1"), the AI answers naturally, understanding complex voice notes or text seamlessly.',
    otherServicesStep3Title: 'Answers FAQs, guides, and qualifies leads',
    otherServicesStep3Desc: 'Explains service packages, sends pricing or catalogs, checks schedule openings, and steers the client toward booking.',
    otherServicesStep4Title: 'Instant booking or seamless handoff',
    otherServicesStep4Desc: 'When the customer is ready, the AI confirms appointments or routes the hot lead straight to you with all details prepared.',
    otherServicesLiveBadge: 'Live 24/7 • Instant responses in under 5 seconds',
    otherServicesCta: 'Automate My WhatsApp',
    otherServicesNote: 'Official, secure integration compatible with your existing WhatsApp business number.',
    otherServicesCard2Tag: 'No cold "press 1" robotic menus',
    otherServicesCard3Tag: 'Google Calendar & CRM Integration',
    otherServicesFlowBadge: 'Smart Workflow',
    otherServicesWaAssistantName: 'AI Virtual Assistant',
    otherServicesWaStatus: 'Online now • 24/7 Support',
    otherServicesWaPlaceholder: 'Message automatically answered by AI...',
    otherServicesWaUser1: 'Hello! Do you build professional websites? How long does delivery take?',
    otherServicesWaAi1: 'Hello! Warm welcome! Yes, we deliver your 100% ready, blazing-fast, mobile-friendly website in just 5 to 7 business days.',
    otherServicesWaUser2: 'Great! I run a clinic and need more direct bookings. Which plan do you recommend?',
    otherServicesWaAi2: 'For clinics, the PRO plan (€299) is our best-seller: direct WhatsApp button, treatments showcase, and patient trust proof. Would you like to view the live preview now?',

    // Hero
    heroBadge: 'Premium Digital Presence',
    heroStartingPrice: 'Websites starting at €199',
    heroTitleLine1: 'Your business deserves a website',
    heroTitleHighlight: 'that looks big.',
    heroSubtitle: 'Professional, lightning-fast, custom websites for businesses that want to be found, build trust, and win more customers.',
    heroCtaPrimary: 'Get My Website',
    heroCtaSecondary: 'Explore Templates',
    heroMotto: '“An affordable website doesn’t have to look cheap.”',
    heroPillSpeed: 'Google PageSpeed',
    heroPillSpeedSub: '98/100 Mobile',
    heroPillDelivery: 'Ready in up to 7 days',
    heroChip1: '100% Responsive',
    heroChip2: 'WhatsApp Integrated',
    heroChip3: 'Google Maps Local',
    heroRealModelLabel: 'Live Showcase',
    heroRealModelTitle: 'Restaurant & Fine Dining',

    // Niches
    nichesEyebrow: 'Tailored to your sector',
    nichesTitle: 'Built for your specific business.',
    nichesSubtitle: 'We craft customized visual layouts designed to elevate your company’s unique value, whatever your field.',
    nichesDedicatedLabel: 'Dedicated Solution',
    nichesList: [
      { id: 'barbearia', name: 'Barbershops', highlight: 'Frictionless appointment booking and modern aesthetics', badge: 'Barbershops' },
      { id: 'restaurante', name: 'Restaurants & Bars', highlight: 'Visual online menu and direct table reservations', badge: 'Gastronomy' },
      { id: 'salao', name: 'Salons & Esthetics', highlight: 'Chic design, service showcase, and easy booking', badge: 'Beauty & Style' },
      { id: 'imobiliaria', name: 'Real Estate & Realtors', highlight: 'Property catalog with location filters and inquiry forms', badge: 'Real Estate' },
      { id: 'oficina', name: 'Auto Repair & Workshops', highlight: 'Fast quote requests and instant customer trust', badge: 'Automotive' },
      { id: 'consultoria', name: 'Consulting & Legal Offices', highlight: 'High corporate credibility and lead generation', badge: 'Corporate' },
    ],

    // Portfolio Models
    portfolioEyebrow: 'Bespoke design',
    portfolioTitle: 'Choose a starting point.',
    portfolioSubtitle: 'Explore live showcase templates focused on credibility and lead generation. Each project is customized with your brand identity and content.',
    portfolioHeaderNoticeTitle: 'Every template includes',
    portfolioHeaderNoticeDesc: 'WhatsApp + Google Maps + Mobile First',
    btnViewModel: 'View template',
    btnChooseThis: 'I want this template',
    modelsList: [
      {
        id: 'restaurante',
        number: '01',
        category: 'Food & Hospitality',
        title: 'Restaurant & Bistro',
        tagline: 'Visual digital menu, direct reservations, and mouthwatering food photography.',
        description: 'Engineered to attract local diners, present dishes with striking visuals, and allow instant WhatsApp reservations in one tap.',
        badge: 'Menu + Reservations',
        features: ['Digital Menu', 'Table Booking CTA', 'Google Maps Sync', 'Featured Reviews'],
      },
      {
        id: 'barbearia',
        number: '02',
        category: 'Grooming & Style',
        title: 'Barbershop & Grooming Club',
        tagline: 'Effortless schedule booking, full service menu, and vintage/contemporary flair.',
        description: 'Perfect for barbershops looking to streamline appointments and keep chairs full without relying purely on word of mouth.',
        badge: 'Fast Booking',
        features: ['WhatsApp Booking', 'Service Price List', 'Haircut Portfolio', 'Business Hours'],
      },
      {
        id: 'imobiliaria',
        number: '03',
        category: 'Property & Brokers',
        title: 'Real Estate & Brokerage',
        tagline: 'Premium property showcase with neighborhood filters, photo galleries, and visit booking.',
        description: 'Deliver the high trust property transactions demand. Listings organized by location, price, and specs ready to generate hot buyer leads.',
        badge: 'Property Catalog',
        features: ['Property Filter', 'Schedule Tour Form', 'Neighborhood Highlights', 'Direct Broker Chat'],
      },
      {
        id: 'servicos',
        number: '04',
        category: 'Corporate Services',
        title: 'Business Services & Consulting',
        tagline: 'Instant credibility for service providers, clinics, law offices, and agencies.',
        description: 'Structured to explain complex offerings with absolute clarity, build authority, and turn skeptical visitors into scheduled consultations.',
        badge: 'Authority & Leads',
        features: ['Service Breakdown', 'Competitive Edges', 'Diagnostic Form', 'Quote Request CTA'],
      },
    ],

    // Benefits
    benefitsEyebrow: 'Total peace of mind',
    benefitsTitle: 'You run your business. We take care of your online presence.',
    benefitsSubtitle: 'No confusing tech jargon. We deliver a polished sales engine ready to turn casual visitors into paying customers every single day.',
    benefitTrafficPill: '80%+ of your traffic',
    benefitStatFluid: 'Fluid Layout',
    benefitStatFluidSub: '320px to 4K',
    benefitStatTouch: 'Touch Targets',
    benefitStatTouchSub: '48px+ Easy Tap',
    benefitStatOverflow: 'No Broken Text',
    benefitStatOverflowSub: '0% Overflow',
    benefitWhatsappPill: 'Pre-filled message ready to send in 1 click',
    benefit1Title: 'Professional design',
    benefit1Desc: 'Modern aesthetics, striking typography, and high-end finish that establish instant credibility.',
    benefit2Title: 'Mobile first',
    benefit2Desc: 'Over 80% of your prospects visit from a smartphone. Your site will look flawless on every mobile screen.',
    benefit3Title: 'Integrated WhatsApp',
    benefit3Desc: 'Strategic floating button and direct links that connect visitors to your chat with a single tap.',
    benefit4Title: 'Google Maps',
    benefit4Desc: 'Interactive map pinpointing your exact address so clients can find your storefront effortlessly.',
    benefit5Title: 'Contact form',
    benefit5Desc: 'Direct capture of quote inquiries routed instantly to your inbox or business WhatsApp.',
    benefit6Title: 'Basic SEO',
    benefit6Desc: 'Semantic structure and optimized meta tags so your business gets properly indexed and discovered on Google.',
    benefit7Title: 'Blazing fast speed',
    benefit7Desc: 'Clean lightweight code and compressed imagery that load in milliseconds, preventing drop-offs.',
    benefit8Title: 'Tailored branding',
    benefit8Desc: 'Colors, logo, imagery, and text crafted to reflect your genuine brand essence. No generic cookie-cutter templates.',

    // Process
    processEyebrow: 'Methodology & Alignment',
    processTitle: 'A journey of listening, clarity, and precision.',
    processSubtitle: 'Like a structured consultation: each phase is crafted to transform your core identity into calm digital authority.',
    processStepWord: 'Phase',
    processFooterNotice: 'You do not need coding or hosting knowledge. We guide each step with clarity and quiet confidence.',
    processFooterLink: 'Explore available plans',
    stepsList: [
      { num: '01', title: 'Diagnostic & Alignment', desc: 'We clarify your true positioning, audience expectations, and unique brand voice.', tag: 'Alignment' },
      { num: '02', title: 'Conscious Intake', desc: 'A focused 5-minute briefing without technical friction or cognitive overload.', tag: '5 minutes' },
      { num: '03', title: 'Craft & Engineering', desc: 'Intentional design, timeless typography, and high-performance code built from scratch.', tag: 'Craftsmanship' },
      { num: '04', title: 'Refinement Session', desc: 'A private staging preview to listen to your impressions and harmonize every detail.', tag: 'Harmonization' },
      { num: '05', title: 'Established Presence', desc: 'Your domain connected, live, and prepared to welcome prospective clients with confidence.', tag: 'Consolidation' },
    ],

    // Pricing
    pricingEyebrow: 'Clear investment',
    pricingTitle: 'Choose the right package to scale.',
    pricingSubtitle: 'Transparent pricing with zero hidden fees or surprise subscriptions.',
    popularBadge: 'MOST POPULAR',
    singlePayment: 'One-time payment',
    noRecurringFees: 'No mandatory monthly retainers',
    includedItemsTitle: 'What is included:',
    deliveryTimeNotice: 'Delivered in 7-10 business days',
    guaranteeTitle: 'Review & Polishing Guarantee',
    guaranteeDesc: 'Your website only goes live once you have tested the staging version and approved every detail.',
    pricingQuestionLink: 'Unsure which package is best for your business? Chat on WhatsApp',
    packagesList: [
      {
        id: 'start',
        name: 'START',
        pagesCount: '1 page',
        ctaText: 'Choose START',
        deliverables: [
          'High-converting 1-page website (One Page)',
          'Fully responsive design (mobile, tablet, desktop)',
          'Integrated floating WhatsApp button',
          'Interactive Google Maps location pin',
          'Direct customer inquiry form',
          'Official deployment & live setup',
        ],
      },
      {
        id: 'pro',
        name: 'PRO',
        pagesCount: 'Up to 5 pages',
        ctaText: 'Choose PRO',
        deliverables: [
          'Up to 5 complete pages (Home, About, Services, Gallery, Contact)',
          'Custom design aligned with your brand identity',
          'Integrated WhatsApp action buttons',
          'Google Maps location integration',
          'Custom quote request forms',
          'Essential Google search SEO configuration',
          'Interactive visual portfolio / image gallery',
          'Full professional deployment included',
        ],
      },
      {
        id: 'premium',
        name: 'PREMIUM',
        pagesCount: 'Up to 8 pages',
        ctaText: 'Choose PREMIUM',
        deliverables: [
          'Enterprise-grade complete web architecture',
          '100% bespoke exclusive visual design',
          'Up to 8 in-depth custom pages',
          'Advanced speed optimization & core SEO setup',
          'Lead capture funnels & custom forms',
          'Social media & marketing integrations',
          'Dynamic photo gallery & rich portfolio',
          'Official launch & Google search indexing',
          'Priority dedicated onboarding support',
        ],
      },
    ],

    // Trust
    trustEyebrow: 'Why partner with us',
    trustTitle: 'Getting your website shouldn’t be complicated.',
    trust1Title: 'Transparent pricing',
    trust1Desc: 'You know exactly what you will pay upfront. No surprises or forced recurring fees.',
    trust2Title: 'Hassle-free experience',
    trust2Desc: 'We speak plain English. We handle hosting, DNS, and technical details so you can focus on running your business.',
    trust3Title: 'Bespoke design',
    trust3Desc: 'Every element is shaped to spotlight your business and make you look like the undeniable leader in your market.',
    trust4Title: 'Built for mobile',
    trust4Desc: 'Tested across dozens of actual devices to guarantee a smooth and delightful smartphone experience.',

    // FAQ
    faqEyebrow: 'Got questions?',
    faqTitle: 'Frequently Asked Questions',
    faqSubtitle: 'Clear answers on timelines, domain ownership, and ongoing support.',
    faqItems: [
      { q: 'How long does it take to build my website?', a: 'Typically 5 to 10 business days after receiving your information and materials.' },
      { q: 'Is the custom domain included?', a: 'We guide you to register your domain under your own name (approx. €10/year) ensuring you maintain 100% legal ownership. We handle the entire DNS configuration at no extra charge.' },
      { q: 'Do I need to provide all pictures?', a: 'If you have authentic photos of your storefront, team, or products, that’s great! If not, we curate professional high-resolution stock photography tailored to your industry at no additional cost.' },
      { q: 'Can I request adjustments?', a: 'Absolutely! During the review phase you can request tweaks to text, color accents, or layout details before the final deployment.' },
      { q: 'Does it work smoothly on smartphones?', a: '100% yes. We adopt a strict mobile-first architecture to make sure your site loads instantly and operates cleanly on any smartphone.' },
      { q: 'Is maintenance available?', a: 'Yes. We offer optional support and maintenance plans for those wanting ongoing peace of mind, with no contracts or lock-in.' },
      { q: 'Is the payment secure?', a: 'Completely secure. We process payments via globally trusted providers like Stripe or PayPal with bank-level encryption.' },
    ],

    // Final CTA
    finalCtaEyebrow: 'Your next move',
    finalCtaTitle: 'Ready to bring your business online?',
    finalCtaText: 'Select your package and take the first step towards a professional web presence that generates inquiries for you 24/7.',
    finalCtaBtn: 'Get My Website',
    finalWhatsappBtn: 'Chat on WhatsApp',
    finalCtaBadge: 'Websites starting at €199 • Secure checkout • Zero tech headaches',

    // Modals
    whatsappFloatingTooltip: 'Talk to a specialist',
    checkoutModalTitle: 'Complete Your Package Selection',
    checkoutModalNoHiddenFees: 'No hidden fees',
    checkoutStripeReadyTitle: 'Ready for Stripe / PayPal checkout',
    checkoutStripeReadyDesc: 'For your convenience, you can confirm your reservation and discuss any project details directly on WhatsApp right now.',
    checkoutProceedWhatsapp: 'Continue on WhatsApp',
    checkoutClose: 'Close',
    previewModalTitle: 'Interactive Showcase Preview',
    previewDeviceDesktop: 'Desktop',
    previewDeviceMobile: 'Mobile',
    previewFeaturesTitle: 'Key Features in this Template:',
    previewCustomizedNotice: 'Fully customized with your business photography, colors, and content.',
    previewChooseBtn: 'I want this template',
    previewMenuServices: 'Menu / Services',
    previewContact: 'Contact',

    // Footer
    footerDesc: 'We build professional, fast, and custom websites for small and medium businesses ready to win trust and expand their reach.',
    footerQuickLinks: 'Quick Links',
    footerContact: 'Contact & Support',
    footerLegal: 'Legal',
    footerTerms: 'Terms of Service',
    footerPrivacy: 'Privacy Policy',
    footerCookies: 'Cookie Policy',
    footerGuarantee: 'Delivery Guarantee',
    footerCopyright: 'All rights reserved.',
    footerNotice: 'Showcase projects and photography are for demonstration purposes.',

    // Cookie Banner
    cookieBannerTitle: 'Privacy & Cookies',
    cookieBannerText: 'We use essential cookies for secure site functionality and analytics to optimize your experience.',
    cookieBannerAcceptAll: 'Accept all',
    cookieBannerOnlyEssential: 'Only essential',
    cookieBannerPreferences: 'Preferences & Policy',
  },

  es: {
    // Nav
    navHome: 'Inicio',
    navModels: 'Modelos',
    navNiches: 'Sectores',
    navBenefits: 'Beneficios',
    navHowItWorks: 'Cómo Funciona',
    navOtherServices: 'Otros Servicios',
    navPricing: 'Precios',
    navFaq: 'Preguntas',
    ctaHeader: 'Quiero mi web',

    // Otros Servicios (Automatización WhatsApp e IA 24/7)
    otherServicesBadge: 'Automatización Inteligente de Ventas y Atención',
    otherServicesTitle: 'IA en WhatsApp que atiende a tus clientes',
    otherServicesSubtitle: 'Olvídate de los bots rígidos y anticuados. Implementamos Inteligencia Artificial humanizada que entiende el contexto de tu negocio, responde dudas y cierra ventas en WhatsApp 24 horas al día, 7 días a la semana.',
    otherServicesWaTitle: 'Automatización de WhatsApp a Medida',
    otherServicesWaDesc: 'Respuestas al instante sin colas de espera. Envía avisos, confirmaciones de pedidos y recordatorios sin riesgo de bloqueo.',
    otherServicesAiTitle: 'IA con Lenguaje 100% Humanizado',
    otherServicesAiDesc: 'Entrenada específicamente con tus tarifas, servicios, tono de marca y reglas comerciales. Suena cercana, natural y profesional.',
    otherServicesQualifyTitle: 'Calificación y Agendamiento Automático',
    otherServicesQualifyDesc: 'La IA filtra curiosos, detecta clientes listos para comprar, reserva citas en tu calendario y notifica a tu equipo con el resumen preparado.',
    otherServicesHowTitle: '¿Cómo funciona la automatización paso a paso?',
    otherServicesHowSubtitle: 'Descubre cómo tu WhatsApp se transforma en un canal activo de ventas continuo:',
    otherServicesStep1Title: 'El cliente escribe un WhatsApp',
    otherServicesStep1Desc: 'A cualquier hora del día, noche o fin de semana, el usuario inicia la conversación consultando por tus servicios o productos.',
    otherServicesStep2Title: 'La IA analiza el contexto y responde en segundos',
    otherServicesStep2Desc: 'En lugar de menús robóticos ("marca 1"), la IA conversa de forma natural, comprendiendo audios o mensajes de texto sin dificultad.',
    otherServicesStep3Title: 'Resuelve dudas, orienta y califica el interés',
    otherServicesStep3Desc: 'Presenta opciones, facilita presupuestos o catálogos, revisa disponibilidad y guía al cliente hacia la contratación.',
    otherServicesStep4Title: 'Cierre directo o derivación a tu equipo',
    otherServicesStep4Desc: 'Cuando el cliente desea confirmar o hablar directamente contigo, la IA recopila los datos y te entrega el contacto listo para facturar.',
    otherServicesLiveBadge: 'Activo 24/7 • Respuestas en menos de 5 segundos',
    otherServicesCta: 'Quiero automatizar mi WhatsApp',
    otherServicesNote: 'Integración oficial, segura y compatible con tu número actual de WhatsApp.',
    otherServicesCard2Tag: 'Sin menús fríos del tipo "marca 1"',
    otherServicesCard3Tag: 'Integración con Google Calendar y CRM',
    otherServicesFlowBadge: 'Flujo Inteligente',
    otherServicesWaAssistantName: 'Asistente Virtual IA',
    otherServicesWaStatus: 'En línea • Atención 24/7',
    otherServicesWaPlaceholder: 'Mensaje respondido automáticamente por la IA...',
    otherServicesWaUser1: '¡Hola! ¿Creáis páginas web profesionales? ¿Cuánto tarda en estar lista?',
    otherServicesWaAi1: '¡Hola! ¡Te damos una cálida bienvenida! Sí, entregamos tu web 100% lista, rápida y adaptada a móvil en solo 5 a 7 días hábiles.',
    otherServicesWaUser2: '¡Excelente! Tengo una clínica y necesito recibir más solicitudes. ¿Qué plan me recomendáis?',
    otherServicesWaAi2: 'Para clínicas, el plan PRO (€299) es el más elegido: incluye enlace directo a WhatsApp, sección de tratamientos y reseñas. ¿Quieres ver la demo en vivo ahora?',

    // Hero
    heroBadge: 'Presencia Digital de Alto Nivel',
    heroStartingPrice: 'Webs a partir de €199',
    heroTitleLine1: 'Tu negocio merece una web',
    heroTitleHighlight: 'que parezca grande.',
    heroSubtitle: 'Páginas web profesionales, rápidas y personalizadas para empresas que quieren ser encontradas, generar confianza y recibir más clientes.',
    heroCtaPrimary: 'Quiero mi web',
    heroCtaSecondary: 'Ver modelos',
    heroMotto: '“Una web accesible no tiene por qué parecer barata.”',
    heroPillSpeed: 'Google PageSpeed',
    heroPillSpeedSub: '98/100 Móvil',
    heroPillDelivery: 'Lista en hasta 7 días',
    heroChip1: '100% Responsive',
    heroChip2: 'WhatsApp Integrado',
    heroChip3: 'Google Maps Local',
    heroRealModelLabel: 'Modelo Real',
    heroRealModelTitle: 'Restaurante & Alta Gastronomía',

    // Niches
    nichesEyebrow: 'Adaptado a tu sector',
    nichesTitle: 'Hecho para tu tipo de negocio.',
    nichesSubtitle: 'Diseñamos la estructura visual ideal para destacar la propuesta única de tu empresa, sea cual sea tu actividad.',
    nichesDedicatedLabel: 'Solución Dedicada',
    nichesList: [
      { id: 'barbearia', name: 'Barberías', highlight: 'Reservas ágiles y estética moderna', badge: 'Barberías' },
      { id: 'restaurante', name: 'Restaurantes & Bares', highlight: 'Carta digital visual y reservas directas', badge: 'Gastronomía' },
      { id: 'salao', name: 'Salones & Estética', highlight: 'Diseño elegante, catálogo y cita previa', badge: 'Belleza & Estilo' },
      { id: 'imobiliaria', name: 'Inmobiliarias & Agentes', highlight: 'Catálogo de propiedades con filtros y contacto', badge: 'Inmobiliaria' },
      { id: 'oficina', name: 'Talleres & Mecánica', highlight: 'Presupuestos rápidos y confianza inmediata', badge: 'Automoción' },
      { id: 'consultoria', name: 'Consultorías & Despachos', highlight: 'Autoridad corporativa y captación de clientes', badge: 'Corporativo' },
    ],

    // Portfolio Models
    portfolioEyebrow: 'Diseño a medida',
    portfolioTitle: 'Elige un punto de partida.',
    portfolioSubtitle: 'Descubre ejemplos reales enfocados en autoridad y captación de contactos. Cada proyecto se personaliza con la identidad y contenidos de tu marca.',
    portfolioHeaderNoticeTitle: 'Todos los modelos incluyen',
    portfolioHeaderNoticeDesc: 'WhatsApp + Google Maps + Mobile First',
    btnViewModel: 'Ver modelo',
    btnChooseThis: 'Quiero este modelo',
    modelsList: [
      {
        id: 'restaurante',
        number: '01',
        category: 'Gastronomía & Hostelería',
        title: 'Restaurante & Bistró',
        tagline: 'Carta digital interactiva, reservas directas y fotografía gastronómica apetecible.',
        description: 'Creado para atraer clientes locales, mostrar tus mejores platos con fotografía impactante y facilitar reservas directas vía WhatsApp en un solo toque.',
        badge: 'Carta + Reservas',
        features: ['Carta Online', 'Botón Reservar Mesa', 'Integración Google Maps', 'Opiniones Destacadas'],
      },
      {
        id: 'barbearia',
        number: '02',
        category: 'Belleza & Imagen',
        title: 'Barbería & Club de Afeitado',
        tagline: 'Citas sin complicaciones, lista de servicios y estilo contemporáneo.',
        description: 'Perfecto para barberías que quieren profesionalizar la atención al cliente y llenar la agenda sin depender exclusivamente del boca a boca.',
        badge: 'Citas Rápidas',
        features: ['Cita por WhatsApp', 'Tarifa de Precios', 'Galería de Cortes', 'Horario de Apertura'],
      },
      {
        id: 'imobiliaria',
        number: '03',
        category: 'Inmuebles & Agencias',
        title: 'Inmobiliaria & Agente',
        tagline: 'Escaparate de propiedades destacadas con filtros, galería fotográfica y solicitud de visita.',
        description: 'Transmite la solidez que requiere una operación inmobiliaria. Inmuebles organizados por zona y precio listos para generar contactos cualificados.',
        badge: 'Catálogo de Inmuebles',
        features: ['Filtro de Inmuebles', 'Solicitud de Visita', 'Zonas Destacadas', 'Contacto con Agente'],
      },
      {
        id: 'servicos',
        number: '04',
        category: 'Servicios Profesionales',
        title: 'Empresa de Servicios & Consultoría',
        tagline: 'Autoridad instantánea para clínicas, despachos jurídicos, asesorías y consultorías.',
        description: 'Estructurado para explicar servicios profesionales con absoluta claridad, consolidar confianza y convertir visitantes en reuniones agendadas.',
        badge: 'Autoridad & Contactos',
        features: ['Catálogo de Servicios', 'Ventajas Competitivas', 'Formulario de Consulta', 'Solicitud de Presupuesto'],
      },
    ],

    // Benefits
    benefitsEyebrow: 'Tranquilidad total',
    benefitsTitle: 'Tú te ocupas de tu negocio. Nosotros de tu presencia online.',
    benefitsSubtitle: 'Sin tecnicismos complicados. Te entregamos un canal de ventas listo para generar clientes todos los días.',
    benefitTrafficPill: '80%+ de tu tráfico',
    benefitStatFluid: 'Diseño Fluido',
    benefitStatFluidSub: '320px a 4K',
    benefitStatTouch: 'Botones Táctiles',
    benefitStatTouchSub: '48px+ Fácil Toque',
    benefitStatOverflow: 'Sin Desbordes',
    benefitStatOverflowSub: '0% Overflow',
    benefitWhatsappPill: 'Mensaje personalizado listo para enviar',
    benefit1Title: 'Diseño profesional',
    benefit1Desc: 'Estética moderna, tipografía cuidada y acabados de alta gama que transmiten credibilidad desde el primer segundo.',
    benefit2Title: 'Mobile first',
    benefit2Desc: 'Más del 80% de tus clientes llegarán desde el móvil. Tu página lucirá impecable en cualquier pantalla.',
    benefit3Title: 'WhatsApp integrado',
    benefit3Desc: 'Botón flotante estratégico y enlaces que dirigen al visitante a tu conversación con un solo toque.',
    benefit4Title: 'Google Maps',
    benefit4Desc: 'Mapa interactivo en la ubicación exacta de tu negocio para que tus clientes te encuentren sin dificultad.',
    benefit5Title: 'Formulario de contacto',
    benefit5Desc: 'Captación directa de consultas y presupuestos enviados directamente a tu email o WhatsApp.',
    benefit6Title: 'SEO básico',
    benefit6Desc: 'Configuración semántica y etiquetas meta preparadas para que tu negocio sea indexado y visible en Google.',
    benefit7Title: 'Carga rápida',
    benefit7Desc: 'Código ligero e imágenes optimizadas para abrir en fracciones de segundo y no perder clientes por lentitud.',
    benefit8Title: 'Diseño personalizado',
    benefit8Desc: 'Colores, logotipo, fotografías y textos adaptados a la esencia de tu empresa. Cero plantillas genéricas.',

    // Process
    processEyebrow: 'Metodología & Alineación',
    processTitle: 'Un camino de escucha, claridad y precisión.',
    processSubtitle: 'Como una consulta estructurada: cada etapa está diseñada para transformar su esencia en autoridad digital con serenidad y clase.',
    processStepWord: 'Fase',
    processFooterNotice: 'No necesita conocimientos de programación ni servidores. Guiamos cada paso con claridad y solvencia.',
    processFooterLink: 'Explorar planes disponibles',
    stepsList: [
      { num: '01', title: 'Diagnóstico & Alineación', desc: 'Comprendemos su posicionamiento, la audiencia y la voz esencial de su negocio.', tag: 'Alineación' },
      { num: '02', title: 'Briefing Consciente', desc: 'Un cuestionario ágil de 5 minutos, sin tecnicismos ni fricción cognitiva.', tag: '5 minutos' },
      { num: '03', title: 'Artesanía & Código', desc: 'Diseño intencional, tipografía atemporal y arquitectura de alto rendimiento a medida.', tag: 'Artesanía' },
      { num: '04', title: 'Sesión de Ajustes', desc: 'Presentación privada de demostración para escuchar sus impresiones y armonizar cada detalle.', tag: 'Armonización' },
      { num: '05', title: 'Presencia Consolidada', desc: 'Dominio conectado, presencia activa y listo para recibir clientes con distinción.', tag: 'Consolidación' },
    ],

    // Pricing
    pricingEyebrow: 'Inversión transparente',
    pricingTitle: 'Elige el plan ideal para crecer.',
    pricingSubtitle: 'Precios claros sin letra pequeña ni mensualidades ocultas.',
    popularBadge: 'MÁS ELEGIDO',
    singlePayment: 'Pago único',
    noRecurringFees: 'Sin cuotas mensuales obligatorias',
    includedItemsTitle: 'Qué incluye:',
    deliveryTimeNotice: 'Entrega en 7-10 días laborables',
    guaranteeTitle: 'Garantía de Revisión y Ajustes Finos',
    guaranteeDesc: 'Tu web solo se publica cuando hayas probado la versión de demostración y aprobado cada detalle.',
    pricingQuestionLink: '¿Tienes dudas sobre qué paquete elegir? Habla con nosotros por WhatsApp',
    packagesList: [
      {
        id: 'start',
        name: 'START',
        pagesCount: '1 página',
        ctaText: 'Quero el START',
        deliverables: [
          'Página web de 1 página de alta conversión (One Page)',
          'Diseño 100% responsive (móvil, tablet y ordenador)',
          'Botón flotante de WhatsApp integrado',
          'Localización con Google Maps interactivo',
          'Formulario de contacto y consultas directas',
          'Publicación oficial y configuración online',
        ],
      },
      {
        id: 'pro',
        name: 'PRO',
        pagesCount: 'Hasta 5 páginas',
        ctaText: 'Quiero el PRO',
        deliverables: [
          'Hasta 5 páginas completas (Inicio, Quiénes Somos, Servicios, Galería, Contacto)',
          'Diseño personalizado adaptado a tu marca',
          'Botón de WhatsApp integrado',
          'Ubicación en Google Maps',
          'Formulario de presupuesto personalizado',
          'SEO básico para posicionar en Google',
          'Galería interactiva de imágenes y trabajos',
          'Publicación profesional incluida',
        ],
      },
      {
        id: 'premium',
        name: 'PREMIUM',
        pagesCount: 'Hasta 8 páginas',
        ctaText: 'Quero el PREMIUM',
        deliverables: [
          'Web completa con arquitectura de alto rendimiento',
          'Diseño 100% exclusivo y a medida',
          'Hasta 8 páginas detalladas',
          'Optimización avanzada de velocidad y SEO esencial',
          'Formularios avanzados de captación de leads',
          'Integraciones con redes sociales y herramientas',
          'Galería dinámica y catálogo amplio',
          'Publicación oficial e indexación en Google',
          'Soporte prioritario inicial dedicado',
        ],
      },
    ],

    // Trust
    trustEyebrow: 'Por qué confiar en nosotros',
    trustTitle: 'Tener tu web no tiene por qué ser un dolor de cabeza.',
    trust1Title: 'Precio transparente',
    trust1Desc: 'Sabes exactamente lo que vas a pagar desde el principio. Sin sorpresas ni costes de suscripción obligatorios.',
    trust2Title: 'Sin complicaciones',
    trust2Desc: 'Hablamos claro. Nos encargamos de todo el soporte técnico, alojamiento y configuración para que tú vendas.',
    trust3Title: 'Diseño personalizado',
    trust3Desc: 'Cada detalle está pensado para posicionar tu empresa como referente de confianza en tu localidad.',
    trust4Title: 'Pensado para móvil',
    trust4Desc: 'Comprobado en múltiples dispositivos reales para asegurar una navegación rápida y agradable.',

    // FAQ
    faqEyebrow: 'Resolvemos tus dudas',
    faqTitle: 'Preguntas Frecuentes',
    faqSubtitle: 'Respuestas directas sobre tiempos de entrega, dominios y soporte.',
    faqItems: [
      { q: '¿Cuánto tiempo tarda en estar lista mi web?', a: 'Normalmente entre 5 y 10 días laborables tras recibir el material y fotos de tu empresa.' },
      { q: '¿El dominio está incluido?', a: 'Te ayudamos a registrar tu dominio a tu nombre (cuesta unos €10/año) para que seas el único propietario legal. Nosotros realizamos la configuración técnica de DNS sin coste añadido.' },
      { q: '¿Tengo que aportar yo todas las fotos?', a: 'Si tienes fotos de tu local, equipo o trabajos, perfecto. Si no dispones de ellas, utilizamos fotografías de stock en alta resolución acordes a tu sector sin coste adicional.' },
      { q: '¿Puedo solicitar cambios?', a: '¡Por supuesto! Durante la fase de revisión puedes solicitar ajustes de textos, colores o detalles de estructura antes del lanzamiento definitivo.' },
      { q: '¿Funciona bien en el teléfono móvil?', a: 'Totalmente. Diseñamos con filosofía mobile-first para que la experiencia en cualquier smartphone sea perfecta y veloz.' },
      { q: '¿Puedo contratar mantenimiento posterior?', a: 'Sí. Disponemos de planes opcionales de soporte y actualizaciones para quienes buscan tranquilidad continuada, sin permanencias obligatorias.' },
      { q: '¿El pago es seguro?', a: 'Completamente seguro. Tramitamos los pagos mediante plataformas oficiales como Stripe o PayPal con cifrado bancario seguro.' },
    ],

    // Final CTA
    finalCtaEyebrow: 'El siguiente paso',
    finalCtaTitle: '¿Listo para llevar tu negocio a internet?',
    finalCtaText: 'Elige tu paquete y da el primer paso hacia una presencia digital profesional que atraiga clientes las 24 horas.',
    finalCtaBtn: 'Quiero mi web',
    finalWhatsappBtn: 'Hablar por WhatsApp',
    finalCtaBadge: 'Webs a partir de €199 • Pago seguro • Cero dolores de cabeza técnicos',

    // Modals
    whatsappFloatingTooltip: 'Habla con nosotros',
    checkoutModalTitle: 'Finalizar Elección del Paquete',
    checkoutModalNoHiddenFees: 'Sin costes ocultos',
    checkoutStripeReadyTitle: 'Listo para pago con tarjeta (Stripe / PayPal)',
    checkoutStripeReadyDesc: 'Para tu mayor comodidad, puedes confirmar tu reserva y consultar cualquier duda directamente por WhatsApp ahora mismo.',
    checkoutProceedWhatsapp: 'Continuar por WhatsApp',
    checkoutClose: 'Cerrar',
    previewModalTitle: 'Demostración Interactiva del Modelo',
    previewDeviceDesktop: 'Ordenador',
    previewDeviceMobile: 'Móvil',
    previewFeaturesTitle: 'Prestaciones Incluidas en este Modelo:',
    previewCustomizedNotice: 'Totalmente personalizado con las fotografías, colores y datos de tu negocio.',
    previewChooseBtn: 'Quiero este modelo',
    previewMenuServices: 'Carta / Servicios',
    previewContact: 'Contacto',

    // Footer
    footerDesc: 'Diseñamos páginas web profesionales, rápidas y personalizadas para pequeñas y medianas empresas que buscan ganar clientes y transmitir solidez.',
    footerQuickLinks: 'Navegación Rápida',
    footerContact: 'Contacto y Atención',
    footerLegal: 'Aviso Legal',
    footerTerms: 'Términos de Servicio',
    footerPrivacy: 'Política de Privacidad',
    footerCookies: 'Política de Cookies',
    footerGuarantee: 'Garantía de Entrega',
    footerCopyright: 'Todos los derechos reservados.',
    footerNotice: 'Las marcas y fotos mostradas tienen carácter ilustrativo para demostración.',

    // Cookie Banner
    cookieBannerTitle: 'Privacidad y Cookies',
    cookieBannerText: 'Utilizamos cookies esenciales para el correcto funcionamiento del sitio web y analíticas anónimas para optimizar tu navegación.',
    cookieBannerAcceptAll: 'Aceptar todas',
    cookieBannerOnlyEssential: 'Solo esenciales',
    cookieBannerPreferences: 'Preferencias y Política',
  },
};

export type SiteTranslationKey = keyof SiteTranslationsStructure;
