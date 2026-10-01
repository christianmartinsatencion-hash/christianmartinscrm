import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Cookie, FileText, CheckCircle2, Lock, Mail, ExternalLink } from 'lucide-react';
import { useSiteLanguage } from '../../context/SiteLanguageContext';
import { SITE_BRAND } from '../../config/siteConfig';

export type LegalTab = 'privacy' | 'cookies' | 'terms';

interface LegalModalProps {
  initialTab?: LegalTab;
  isOpen: boolean;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  initialTab = 'privacy',
  isOpen,
  onClose,
}) => {
  const { language } = useSiteLanguage();
  const [activeTab, setActiveTab] = useState<LegalTab>(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 sm:p-6 overflow-y-auto bg-neutral-950/70 backdrop-blur-sm animate-in fade-in-50 duration-200">
      <div
        className="relative w-full max-w-3xl rounded-2xl bg-white border border-neutral-200 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 px-5 sm:px-6 py-4 bg-neutral-50/70">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-900 text-white shadow-xs">
              {activeTab === 'privacy' && <ShieldCheck className="h-4 w-4" />}
              {activeTab === 'cookies' && <Cookie className="h-4 w-4" />}
              {activeTab === 'terms' && <FileText className="h-4 w-4" />}
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-neutral-950 tracking-tight font-display">
                {language === 'pt' && (activeTab === 'privacy' ? 'Política de Privacidade' : activeTab === 'cookies' ? 'Política de Cookies' : 'Termos de Serviço')}
                {language === 'es' && (activeTab === 'privacy' ? 'Política de Privacidad' : activeTab === 'cookies' ? 'Política de Cookies' : 'Términos de Servicio')}
                {language === 'en' && (activeTab === 'privacy' ? 'Privacy Policy' : activeTab === 'cookies' ? 'Cookie Policy' : 'Terms of Service')}
              </h3>
              <p className="text-[11px] text-neutral-500 font-medium">
                {SITE_BRAND.name} • {language === 'en' ? 'Updated September 2026' : 'Atualizado em Setembro de 2026'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 hover:text-neutral-950 hover:bg-neutral-200/60 transition-colors"
            aria-label="Fechar modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-2 border-b border-neutral-100 px-5 sm:px-6 py-2.5 bg-white text-xs font-semibold overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('privacy')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all whitespace-nowrap ${
              activeTab === 'privacy'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>{language === 'en' ? 'Privacy' : language === 'es' ? 'Privacidad' : 'Privacidade'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('cookies')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all whitespace-nowrap ${
              activeTab === 'cookies'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
            }`}
          >
            <Cookie className="h-3.5 w-3.5" />
            <span>Cookies</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('terms')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all whitespace-nowrap ${
              activeTab === 'terms'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
            }`}
          >
            <FileText className="h-3.5 w-3.5" />
            <span>{language === 'en' ? 'Terms of Service' : language === 'es' ? 'Términos' : 'Termos de Serviço'}</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-6 text-neutral-700 text-xs sm:text-sm leading-relaxed space-y-6">
          {activeTab === 'privacy' && (
            <div className="space-y-5">
              <section className="rounded-xl bg-neutral-50 p-4 border border-neutral-100 flex items-start gap-3">
                <Lock className="h-5 w-5 text-neutral-800 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <p className="font-bold text-neutral-950">
                    {language === 'en'
                      ? 'Commitment to Transparency & GDPR/LGPD Compliance'
                      : language === 'es'
                      ? 'Compromiso de Transparencia y Cumplimiento RGPD'
                      : 'Compromisso com a Transparência e Conformidade RGPD / LGPD'}
                  </p>
                  <p className="text-neutral-600">
                    {language === 'en'
                      ? 'We value your privacy. We never sell, rent, or trade your personal information with unauthorized third parties.'
                      : language === 'es'
                      ? 'Valoramos tu privacidad. Nunca vendemos ni compartimos tus datos con terceros sin tu consentimiento.'
                      : 'Respeitamos a sua privacidade. Os seus dados são tratados com o máximo rigor, sigilo e nunca são vendidos a terceiros.'}
                  </p>
                </div>
              </section>

              <div>
                <h4 className="font-bold text-neutral-950 text-sm mb-1.5">
                  {language === 'en' ? '1. Responsible Entity' : language === 'es' ? '1. Responsable del Tratamiento' : '1. Responsável pelo Tratamento'}
                </h4>
                <p>
                  {language === 'en'
                    ? `The data controller is ${SITE_BRAND.name} (located in Spain / European Union). For any privacy inquiries, reach us at ${SITE_BRAND.email}.`
                    : language === 'es'
                    ? `El responsable del tratamiento de los datos es ${SITE_BRAND.name} (España, Unión Europea). Para consultas de privacidad, contáctanos en ${SITE_BRAND.email}.`
                    : `O responsável pelo tratamento dos seus dados é ${SITE_BRAND.name} (Espanha / União Europeia). Para qualquer questão sobre privacidade, contacte-nos através do e-mail ${SITE_BRAND.email}.`}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-neutral-950 text-sm mb-1.5">
                  {language === 'en' ? '2. Collected Information' : language === 'es' ? '2. Información que Recopilamos' : '2. Dados que Recolhemos'}
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-neutral-600">
                  <li>
                    <strong>{language === 'en' ? 'Direct contact data:' : language === 'es' ? 'Datos de contacto:' : 'Dados de contacto direto:'}</strong>{' '}
                    {language === 'en'
                      ? 'Name, email, phone / WhatsApp number, and business details provided when requesting website creation.'
                      : language === 'es'
                      ? 'Nombre, correo electrónico, número de teléfono/WhatsApp y datos del negocio facilitados al solicitar un presupuesto.'
                      : 'Nome, e-mail, número de WhatsApp e informações da sua empresa fornecidas para criação do website.'}
                  </li>
                  <li>
                    <strong>{language === 'en' ? 'Browsing information:' : language === 'es' ? 'Datos de navegación:' : 'Dados de navegação:'}</strong>{' '}
                    {language === 'en'
                      ? 'Anonymous technical data such as language preferences and connection logs to guarantee site speed and safety.'
                      : language === 'es'
                      ? 'Datos técnicos anónimos como preferencia de idioma e IP para garantizar la seguridad y rapidez del sitio.'
                      : 'Dados técnicos anônimos (idioma selecionado, métricas básicas de desempenho e logs de segurança).'}
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-neutral-950 text-sm mb-1.5">
                  {language === 'en' ? '3. Purpose of Processing' : language === 'es' ? '3. Finalidad del Tratamiento' : '3. Finalidade do Tratamento'}
                </h4>
                <p>
                  {language === 'en'
                    ? 'Your data is solely used to prepare quotes, execute website development contracts, issue formal invoices, and provide continuous technical support.'
                    : language === 'es'
                    ? 'Tus datos se utilizan únicamente para presupuestar, diseñar y publicar tu sitio web, emitir facturación y brindar soporte técnico.'
                    : 'Os dados recolhidos destinam-se exclusivamente à orçamentação, desenvolvimento, publicação e suporte do seu website, bem como à faturação dos serviços contratados.'}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-neutral-950 text-sm mb-1.5">
                  {language === 'en' ? '4. Your Rights' : language === 'es' ? '4. Tus Derechos' : '4. Os Seus Direitos'}
                </h4>
                <p>
                  {language === 'en'
                    ? 'Under the GDPR and global data privacy standards, you have the right to access, rectify, request the deletion of your personal data, or revoke consent at any time by messaging us directly.'
                    : language === 'es'
                    ? 'De acuerdo con el RGPD, tienes derecho de acceso, rectificación, supresión y limitación del tratamiento de tus datos en cualquier momento escribiendo a nuestro correo.'
                    : 'De acordo com o RGPD e a legislação de proteção de dados, tem o direito de aceder, retificar, solicitar a eliminação dos seus dados ou revogar o consentimento a qualquer momento.'}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'cookies' && (
            <div className="space-y-5">
              <section className="rounded-xl bg-neutral-50 p-4 border border-neutral-100 flex items-start gap-3">
                <Cookie className="h-5 w-5 text-neutral-800 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <p className="font-bold text-neutral-950">
                    {language === 'en'
                      ? 'What are Cookies & Why do we use them?'
                      : language === 'es'
                      ? '¿Qué son las Cookies y cómo las utilizamos?'
                      : 'O que são Cookies e como os utilizamos?'}
                  </p>
                  <p className="text-neutral-600">
                    {language === 'en'
                      ? 'Cookies are small text files placed on your device to ensure smooth site navigation, preserve your selected language, and ensure high security.'
                      : language === 'es'
                      ? 'Las cookies son pequeños archivos almacenados en tu navegador para asegurar el funcionamiento ágil, recordar tu idioma y garantizar la seguridad.'
                      : 'Cookies são pequenos ficheiros armazenados no seu navegador que garantem o funcionamento correto do site, guardam as suas preferências de idioma e asseguram a estabilidade.'}
                  </p>
                </div>
              </section>

              <div>
                <h4 className="font-bold text-neutral-950 text-sm mb-2">
                  {language === 'en' ? 'Categories of Cookies Used:' : language === 'es' ? 'Tipos de Cookies Utilizadas:' : 'Categorias de Cookies Utilizados:'}
                </h4>
                <div className="space-y-3">
                  <div className="p-3 rounded-xl border border-neutral-200/80 bg-white">
                    <div className="flex items-center gap-2 font-bold text-xs text-neutral-950">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>{language === 'en' ? 'Essential & Technical Cookies (Strictly Necessary)' : language === 'es' ? 'Cookies Técnicas y Esenciales (Obligatorias)' : 'Cookies Técnicos e Essenciais (Obrigatórios)'}</span>
                    </div>
                    <p className="text-xs text-neutral-600 mt-1 pl-6">
                      {language === 'en'
                        ? 'Required for basic site operation, HTTPS encryption, security headers, and caching. Cannot be disabled.'
                        : language === 'es'
                        ? 'Necesarias para la navegación básica, cifrado HTTPS, certificados de seguridad y caché. No se pueden desactivar.'
                        : 'Necessários para o funcionamento básico do site, criptografia HTTPS, segurança e carregamento ultrarrápido.'}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl border border-neutral-200/80 bg-white">
                    <div className="flex items-center gap-2 font-bold text-xs text-neutral-950">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      <span>{language === 'en' ? 'Preference Cookies' : language === 'es' ? 'Cookies de Preferencias' : 'Cookies de Preferências'}</span>
                    </div>
                    <p className="text-xs text-neutral-600 mt-1 pl-6">
                      {language === 'en'
                        ? 'Remembers your preferred language (PT, ES, EN) and cookie consent state so you do not see repetitive banners.'
                        : language === 'es'
                        ? 'Recuerdan tu idioma seleccionado (PT, ES, EN) y la aceptación de cookies para no mostrar avisos repetitivos.'
                        : 'Guardam a sua escolha de idioma (PT, ES, EN) e o estado do seu consentimento para não repetir avisos.'}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl border border-neutral-200/80 bg-white">
                    <div className="flex items-center gap-2 font-bold text-xs text-neutral-950">
                      <CheckCircle2 className="h-4 w-4 text-neutral-500" />
                      <span>{language === 'en' ? 'Anonymous Performance & Analytics' : language === 'es' ? 'Analíticas de Rendimiento Anónimas' : 'Desempenho e Métricas Anônimas'}</span>
                    </div>
                    <p className="text-xs text-neutral-600 mt-1 pl-6">
                      {language === 'en'
                        ? 'Helps measure server speed, page load response times, and broken link detection without tracking your individual identity.'
                        : language === 'es'
                        ? 'Permiten medir la velocidad del servidor y detectar errores de carga sin almacenar datos personales identificables.'
                        : 'Auxiliam na medição de velocidade e detecção de instabilidades do servidor sem recolher identificadores pessoais.'}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-neutral-950 text-sm mb-1.5">
                  {language === 'en' ? 'Managing & Disabling Cookies' : language === 'es' ? 'Cómo Configurar o Desactivar Cookies' : 'Como Gerir ou Desativar Cookies'}
                </h4>
                <p>
                  {language === 'en'
                    ? 'You can block or delete cookies anytime in your browser settings (Chrome, Safari, Firefox, Edge). Note that essential functionality may be impacted if all cookies are blocked.'
                    : language === 'es'
                    ? 'Puedes configurar o eliminar las cookies en cualquier momento en las preferencias de tu navegador (Chrome, Safari, Firefox o Edge).'
                    : 'Pode gerir, bloquear ou eliminar cookies a qualquer momento nas definições do seu navegador (Google Chrome, Safari, Mozilla Firefox ou Microsoft Edge).'}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-5">
              <div>
                <h4 className="font-bold text-neutral-950 text-sm mb-1.5">
                  {language === 'en' ? '1. Scope of Service' : language === 'es' ? '1. Alcance del Servicio' : '1. Âmbito dos Serviços'}
                </h4>
                <p>
                  {language === 'en'
                    ? `${SITE_BRAND.name} provides high-performance custom web design, domain configuration, and turnkey website delivery tailored for businesses.`
                    : language === 'es'
                    ? `${SITE_BRAND.name} presta servicios de diseño, desarrollo y entrega llave en mano de páginas web modernas para negocios.`
                    : `${SITE_BRAND.name} fornece serviços de web design de alta performance, configuração de domínios e entrega de websites completos para empresas.`}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-neutral-950 text-sm mb-1.5">
                  {language === 'en' ? '2. Delivery & Revisions' : language === 'es' ? '2. Plazos y Revisiones' : '2. Prazos e Revisões'}
                </h4>
                <p>
                  {language === 'en'
                    ? 'Deliveries are made within the agreed timeline (typically 3 to 7 business days depending on the selected package). Unlimited adjustments are provided until full sign-off.'
                    : language === 'es'
                    ? 'La entrega se realiza en el plazo acordado (habitualmente entre 3 y 7 días hábiles según el plan elegido), con revisiones incluidas hasta la plena satisfacción.'
                    : 'A entrega é realizada dentro do prazo acordado (habitualmente de 3 a 7 dias úteis conforme o pacote), com revisões e ajustes até à total aprovação.'}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-neutral-950 text-sm mb-1.5">
                  {language === 'en' ? '3. Client Ownership' : language === 'es' ? '3. Propiedad y Derechos' : '3. Propriedade do Cliente'}
                </h4>
                <p>
                  {language === 'en'
                    ? 'Upon delivery and final settlement, 100% of website content, design files, and domain rights belong entirely to the client.'
                    : language === 'es'
                    ? 'Una vez abonado el servicio, el cliente es el propietario total de los contenidos, código y derechos de su sitio web.'
                    : 'Após a entrega e quitação do serviço, 100% dos direitos sobre o website, textos, imagens e domínio pertencem exclusivamente ao cliente.'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-neutral-100 px-5 sm:px-6 py-4 bg-neutral-50/70 text-xs">
          <div className="flex items-center gap-2 text-neutral-500">
            <Mail className="h-3.5 w-3.5 text-neutral-400" />
            <span>{SITE_BRAND.email}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto rounded-xl bg-neutral-950 px-6 py-2.5 font-bold text-white shadow-xs hover:bg-neutral-800 transition-colors"
          >
            {language === 'en' ? 'Close' : language === 'es' ? 'Cerrar' : 'Entendido'}
          </button>
        </div>
      </div>
    </div>
  );
};
