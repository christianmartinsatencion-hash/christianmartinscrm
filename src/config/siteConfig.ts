/**
 * ==============================================================================
 * CONFIGURAÇÃO CENTRALIZADA DO SITE DE VENDAS
 * ==============================================================================
 * Todas as informações comerciais, contatos, links de pagamento, imagens e
 * dados dos pacotes estão centralizados aqui para facilitar alterações futuras.
 */

// 1. DADOS DE CONTATO E REDES SOCIAIS
// Número oficial de atendimento (Espanha +34 617 796 921)
export const WHATSAPP_NUMBER = "34617796921";
export const PHONE_DISPLAY = "+34 617 796 921";

// Mensagem inicial padrão que será pré-preenchida no WhatsApp ao clicar no botão
export const WHATSAPP_INITIAL_MESSAGE = "Olá Christian! Vi os modelos de sites e gostaria de solicitar um orçamento para o meu negócio.";

export const SITE_BRAND = {
  name: "Christian Martins",
  tagline: "Web Studio",
  shortName: "CM Studio",
  phone: "+34 617 796 921",
  phoneRaw: "34617796921",
  email: "christianmartinsatencion@gmail.com",
  instagram: "@christianmartins.web",
  instagramUrl: "https://instagram.com/christianmartins.web",
  location: "Espanha & Atendimento Internacional",
  copyrightYear: 2026,
};

// 2. LINKS DE PAGAMENTO (STRIPE, PAYPAL, SUMUP, ETC.)
// Substitua os placeholders abaixo pelas URLs de checkout fornecidas pelo seu gateway
export const paymentLinks = {
  start: "COLOCAR_LINK_STRIPE_AQUI",
  pro: "COLOCAR_LINK_STRIPE_AQUI",
  premium: "COLOCAR_LINK_STRIPE_AQUI",
};

// 3. REPOSITÓRIO CENTRALIZADO DE IMAGENS
// Todas as imagens do site vêm daqui. Para trocar uma imagem, basta atualizar o link correspondente.
export const SITE_IMAGES = {
  // Hero / Mockup assets
  heroLaptopMockup: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1200&q=80",
  heroMobileMockup: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=800&q=80",
  heroDesignerWorking: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  
  // Feito para o seu negócio (Nichos)
  niches: {
    barbearia: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
    restaurante: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    salao: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
    imobiliaria: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    oficina: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80",
    consultoria: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
  },

  // Modelos de Portfólio (Screenshots e Amostras)
  models: {
    restaurante: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
    barbearia: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1200&q=80",
    imobiliaria: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    servicos: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
  },

  // Benefícios / Confiança
  benefitsDeviceMobile: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
  trustSupport: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
};

// 4. ESTRUTURA DOS PACOTES DE PREÇO
export interface PricingPackage {
  id: 'start' | 'pro' | 'premium';
  name: string;
  priceEur: number;
  featured?: boolean;
  featuredBadge?: string;
  pagesCount: string;
  deliverables: string[];
  ctaKey: string;
}

export const PRICING_PACKAGES: PricingPackage[] = [
  {
    id: 'start',
    name: 'START',
    priceEur: 199,
    pagesCount: '1 página',
    deliverables: [
      'Site de 1 página (One Page de alta conversão)',
      'Design responsivo (mobile, tablet e desktop)',
      'Botão de WhatsApp flutuante integrado',
      'Localização com Google Maps interativo',
      'Formulário de contato direto',
      'Publicação e configuração no ar',
    ],
    ctaKey: 'Quero o START',
  },
  {
    id: 'pro',
    name: 'PRO',
    priceEur: 299,
    featured: true,
    featuredBadge: 'MAIS ESCOLHIDO',
    pagesCount: 'Até 5 páginas',
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
    ctaKey: 'Quero o PRO',
  },
  {
    id: 'premium',
    name: 'PREMIUM',
    priceEur: 499,
    pagesCount: 'Até 8 páginas',
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
    ctaKey: 'Quero o PREMIUM',
  },
];

// 5. MODELOS DE PORTFÓLIO
export interface PortfolioModel {
  id: string;
  number: string;
  category: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  badge: string;
  features: string[];
  demoUrl?: string; // Opcional para futura URL de demonstração externa
}

export const PORTFOLIO_MODELS: PortfolioModel[] = [
  {
    id: 'restaurante',
    number: '01',
    category: 'Gastronomia',
    title: 'Restaurante & Bistrô',
    tagline: 'Cardápio digital visual, reservas diretas e fotos dos pratos de dar água na boca.',
    description: 'Criado para atrair clientes locais, exibir pratos com fotografia impactante e permitir reservas rápidas via WhatsApp com 1 toque.',
    image: SITE_IMAGES.models.restaurante,
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
    image: SITE_IMAGES.models.barbearia,
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
    image: SITE_IMAGES.models.imobiliaria,
    badge: 'Catálogo de Imóveis',
    features: ['Filtro de Imóveis', 'Formulário de Visita', 'Destaque de Bairros', 'Contato Direto com Corretor'],
  },
  {
    id: 'servicos',
    number: '04',
    category: 'Serviços Corporativos',
    title: 'Empresa de Serviços & Consultoria',
    tagline: 'Autoridade imediata para prestadores de serviços, clínicas, escritórios e consultorias.',
    description: 'Estruturado para explicar soluções complexas com clareza, apresentar credenciais e transformar visitantes desconfiados em reuniões agendadas.',
    image: SITE_IMAGES.models.servicos,
    badge: 'Autoridade & Conversão',
    features: ['Apresentação de Serviços', 'Diferenciais Competitivos', 'Formulário de Diagnóstico', 'CTA de Orçamento'],
  },
];

// 6. NICHOS DE ATENDIMENTO
export const NICHES = [
  { id: 'barbearia', name: 'Barbearias', iconName: 'Scissors', image: SITE_IMAGES.niches.barbearia, highlight: 'Agendamentos e estilo' },
  { id: 'restaurante', name: 'Restaurantes & Bares', iconName: 'Utensils', image: SITE_IMAGES.niches.restaurante, highlight: 'Cardápio e reservas' },
  { id: 'salao', name: 'Salões & Estética', iconName: 'Sparkles', image: SITE_IMAGES.niches.salao, highlight: 'Visual elegante e agenda' },
  { id: 'imobiliaria', name: 'Imobiliárias & Corretores', iconName: 'Building', image: SITE_IMAGES.niches.imobiliaria, highlight: 'Vitrine de imóveis' },
  { id: 'oficina', name: 'Oficinas & Auto Centers', iconName: 'Wrench', image: SITE_IMAGES.niches.oficina, highlight: 'Orçamentos rápidos' },
  { id: 'consultoria', name: 'Consultorias & Escritórios', iconName: 'Briefcase', image: SITE_IMAGES.niches.consultoria, highlight: 'Autoridade e novos contratos' },
];

// Helper para abrir WhatsApp com mensagem personalizada
export const getWhatsAppLink = (customMessage?: string): string => {
  const cleanNumber = WHATSAPP_NUMBER.replace(/\D/g, '');
  const message = encodeURIComponent(customMessage || WHATSAPP_INITIAL_MESSAGE);
  return `https://wa.me/${cleanNumber}?text=${message}`;
};
