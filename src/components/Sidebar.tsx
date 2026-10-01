import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  CheckSquare, 
  Settings, 
  ShieldCheck,
  Palette,
  LogOut
} from 'lucide-react';
import { ViewType } from '../types/crm';
import { useLanguage } from '../context/LanguageContext';
import { useSupabaseAuth } from '../context/SupabaseAuthContext';
import { FountainPenLogo } from './common/FountainPenLogo';
import { FlagIcon } from './FlagIcon';

interface SidebarProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  isOpen: boolean;
  onCloseMobile?: () => void;
  onBackToPublicSite?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  isOpen,
  onCloseMobile,
  onBackToPublicSite,
}) => {
  const { t, currentOption } = useLanguage();
  const { user, signOut } = useSupabaseAuth();

  const menuItems = [
    { id: 'dashboard' as ViewType, label: t('navDashboard'), icon: LayoutDashboard },
    { id: 'customers' as ViewType, label: t('navCustomers'), icon: Users },
    { id: 'deals' as ViewType, label: t('navDeals'), icon: Briefcase },
    { id: 'tasks' as ViewType, label: t('navTasks'), icon: CheckSquare },
    { id: 'base-design' as ViewType, label: t('navBaseDesign'), icon: Palette },
    { id: 'settings' as ViewType, label: t('navSettings'), icon: Settings },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs md:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-200 md:static md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand */}
        <div className="flex h-16 items-center gap-3 border-b border-slate-100 px-6">
          <FountainPenLogo size="sm" />
          <div>
            <h1 className="text-sm font-semibold text-slate-900 tracking-tight">Christian Martins</h1>
            <p className="text-xs text-slate-500">Web Studio & CRM</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-4">
          {onBackToPublicSite && (
            <div className="mb-3 px-1">
              <button
                type="button"
                onClick={onBackToPublicSite}
                className="flex w-full items-center justify-between gap-2 rounded-xl bg-neutral-900 text-white hover:bg-neutral-800 px-3 py-2.5 text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <span>🌐</span>
                  <span>Ver Site de Vendas</span>
                </span>
                <span className="text-[10px] text-neutral-400 font-mono">Público ↗</span>
              </button>
            </div>
          )}

          <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            {t('navMain')}
          </p>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    onCloseMobile?.();
                  }}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Language Badge & User Card */}
        <div className="border-t border-slate-100 p-4 space-y-3">
          <button
            onClick={() => {
              onNavigate('settings');
              onCloseMobile?.();
            }}
            className="flex w-full items-center justify-between rounded-lg bg-slate-50 hover:bg-slate-100 p-2 text-xs text-slate-600 transition-colors border border-slate-200/60"
            title={t('selectLanguage')}
          >
            <div className="flex items-center gap-2">
              <FlagIcon country={currentOption.code} size="sm" />
              <span className="font-medium text-slate-700">{currentOption.nativeLabel}</span>
            </div>
            <span className="text-[10px] font-semibold text-blue-600 uppercase bg-blue-50 px-1.5 py-0.5 rounded-sm">
              {currentOption.code}
            </span>
          </button>

          <div className="flex items-center justify-between rounded-lg bg-slate-50 p-2.5 border border-slate-200/60">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white shadow-xs">
                CM
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-slate-900">
                  {user?.email ? user.email.split('@')[0] : 'Christian Martins'}
                </p>
                <p className="truncate text-[10px] text-slate-500 font-mono">
                  {user?.email || t('userRole')}
                </p>
              </div>
            </div>
            <button
              onClick={() => signOut()}
              title="Encerrar Sessão Segura (Logout)"
              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
