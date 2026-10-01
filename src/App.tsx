import React, { useState, useEffect } from 'react';
import { SiteLanguageProvider } from './context/SiteLanguageContext';
import { SalesLandingPage } from './components/sales/SalesLandingPage';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { ContactsView } from './components/ContactsView';
import { DealsView } from './components/DealsView';
import { TasksView } from './components/TasksView';
import { SettingsView } from './components/SettingsView';
import { BaseDesignView } from './components/BaseDesignView';
import { Customer, Deal, Task, ViewType } from './types/crm';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { SupabaseAuthProvider, useSupabaseAuth } from './context/SupabaseAuthContext';
import { AdminLoginScreen } from './components/auth/AdminLoginScreen';
import { Loader2 } from 'lucide-react';
import { crmStorage, subscribeToRealtimeLeads, subscribeToRealtimeDeals } from './services/crmStorageService';

export type AppSection = 'public' | 'crm';

function InternalCRMApp({ onBackToPublicSite }: { onBackToPublicSite?: () => void }) {
  const { user } = useSupabaseAuth();
  const { t } = useLanguage();
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>(() => crmStorage.loadCustomers());
  const [deals, setDeals] = useState<Deal[]>(() => crmStorage.loadDeals());
  const [tasks, setTasks] = useState<Task[]>(() => crmStorage.loadTasks());

  // Salva automaticamente sempre que houver alterações no CRM
  useEffect(() => {
    crmStorage.saveCustomers(customers);
  }, [customers]);

  useEffect(() => {
    crmStorage.saveDeals(deals);
  }, [deals]);

  useEffect(() => {
    crmStorage.saveTasks(tasks);
  }, [tasks]);

  // Sincroniza Leads e Deals vindos do site / Supabase
  const refreshLeads = React.useCallback(() => {
    const local = crmStorage.loadCustomers();
    setCustomers(local);

    crmStorage.fetchSupabaseLeads().then((supabaseLeads) => {
      if (supabaseLeads.length > 0) {
        setCustomers((prev) => {
          const existingIds = new Set(prev.map((c) => c.id));
          const newLeads = supabaseLeads.filter((sl) => !existingIds.has(sl.id));
          if (newLeads.length > 0) {
            const merged = [...newLeads, ...prev];
            crmStorage.saveCustomers(merged);
            return merged;
          }
          return prev;
        });
      }
    });

    crmStorage.fetchSupabaseDeals().then((supabaseDeals) => {
      if (supabaseDeals.length > 0) {
        setDeals(supabaseDeals);
      }
    });
  }, []);

  useEffect(() => {
    // Executa a migração segura dos Deals do LocalStorage para o Supabase
    crmStorage.migrateLocalDealsToSupabase().then(() => {
      refreshLeads();
    });

    const unsubscribeRealtimeLeads = subscribeToRealtimeLeads((freshLeads) => {
      setCustomers(freshLeads);
    });

    const unsubscribeRealtimeDeals = subscribeToRealtimeDeals((freshDeals) => {
      setDeals(freshDeals);
    });

    const handleLeadSubmitted = () => {
      setCustomers(crmStorage.loadCustomers());
      crmStorage.fetchSupabaseDeals().then(setDeals);
      setTasks(crmStorage.loadTasks());
    };

    window.addEventListener('focus', refreshLeads);
    window.addEventListener('cm_lead_submitted', handleLeadSubmitted);
    return () => {
      unsubscribeRealtimeLeads();
      unsubscribeRealtimeDeals();
      window.removeEventListener('focus', refreshLeads);
      window.removeEventListener('cm_lead_submitted', handleLeadSubmitted);
    };
  }, [refreshLeads, user]);

  const handleAddCustomer = (newCustomer: Omit<Customer, 'id' | 'createdAt'>) => {
    const customer: Customer = {
      ...newCustomer,
      id: `c_${Date.now()}`,
      createdAt: new Date().toLocaleDateString('pt-BR'),
    };
    setCustomers((prev) => {
      const updated = [customer, ...prev];
      crmStorage.saveCustomers(updated);
      return updated;
    });
    // Opcional: tenta enviar para a nuvem se autenticado
    crmStorage.syncCustomerToSupabase(newCustomer);
  };

  const handleDeleteCustomer = (customerId: string) => {
    setCustomers((prev) => {
      const updated = prev.filter((c) => c.id !== customerId);
      crmStorage.saveCustomers(updated);
      return updated;
    });
  };

  const handleAddDeal = (newDeal: Omit<Deal, 'id'>) => {
    const deal: Deal = {
      ...newDeal,
      id: `d_${Date.now()}`,
    };
    setDeals((prev) => [deal, ...prev]);
    crmStorage.saveDealToSupabase(deal);
  };

  const handleUpdateDealStage = (dealId: string, stage: Deal['stage']) => {
    setDeals((prev) =>
      prev.map((d) => (d.id === dealId ? { ...d, stage, closedAt: (stage === 'won' || stage === 'lost') ? new Date().toISOString() : null } : d))
    );
    crmStorage.updateDealStageInSupabase(dealId, stage);
  };

  const handleDeleteDeal = (dealId: string) => {
    setDeals((prev) => prev.filter((d) => d.id !== dealId));
    crmStorage.deleteDealFromSupabase(dealId);
  };

  const handleAddTask = (newTask: Omit<Task, 'id'>) => {
    const task: Task = {
      ...newTask,
      id: `t_${Date.now()}`,
    };
    setTasks((prev) => {
      const updated = [task, ...prev];
      crmStorage.saveTasks(updated);
      return updated;
    });
  };

  const handleToggleTask = (taskId: string) => {
    setTasks((prev) => {
      const updated = prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t));
      crmStorage.saveTasks(updated);
      return updated;
    });
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => {
      const updated = prev.filter((t) => t.id !== taskId);
      crmStorage.saveTasks(updated);
      return updated;
    });
  };

  const viewTitles: Record<ViewType, string> = {
    dashboard: t('titleDashboard'),
    customers: t('titleCustomers'),
    deals: t('titleDeals'),
    tasks: t('titleTasks'),
    'base-design': t('titleBaseDesign'),
    settings: t('titleSettings'),
  };

  const getQuickActionLabel = () => {
    if (currentView === 'deals') return t('quickNewDeal');
    if (currentView === 'tasks') return t('quickNewTask');
    if (currentView === 'base-design') return undefined;
    return t('quickNewCustomer');
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900 antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* Sidebar */}
      <Sidebar
        currentView={currentView}
        onNavigate={setCurrentView}
        isOpen={sidebarOpen}
        onCloseMobile={() => setSidebarOpen(false)}
        onBackToPublicSite={onBackToPublicSite}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0">
        <Header
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          title={viewTitles[currentView]}
          onQuickAction={() => {
            if (currentView === 'deals') setCurrentView('deals');
            else if (currentView === 'tasks') setCurrentView('tasks');
            else setCurrentView('customers');
          }}
          quickActionLabel={getQuickActionLabel()}
          onExitToPublic={onBackToPublicSite}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {currentView === 'dashboard' && (
            <DashboardView
              customers={customers}
              deals={deals}
              tasks={tasks}
              onNavigateTo={(view) => setCurrentView(view)}
              onOpenNewCustomer={() => setCurrentView('customers')}
              onOpenNewDeal={() => setCurrentView('deals')}
            />
          )}

          {currentView === 'customers' && (
            <ContactsView
              customers={customers}
              onAddCustomer={handleAddCustomer}
              onDeleteCustomer={handleDeleteCustomer}
              onRefreshSupabase={refreshLeads}
            />
          )}

          {currentView === 'deals' && (
            <DealsView
              deals={deals}
              customers={customers}
              onAddDeal={handleAddDeal}
              onUpdateDealStage={handleUpdateDealStage}
              onDeleteDeal={handleDeleteDeal}
            />
          )}

          {currentView === 'tasks' && (
            <TasksView
              tasks={tasks}
              onAddTask={handleAddTask}
              onToggleTask={handleToggleTask}
              onDeleteTask={handleDeleteTask}
            />
          )}

          {/* Página Base Design: reservada em branco para edição do design do site público */}
          {currentView === 'base-design' && <BaseDesignView />}

          {currentView === 'settings' && <SettingsView />}
        </main>
      </div>
    </div>
  );
}

function ProtectedCRM({ onBackToPublicSite }: { onBackToPublicSite: () => void }) {
  const { user, loading } = useSupabaseAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-3" />
        <p className="text-xs text-slate-400 font-mono tracking-wider">Verificando autenticação segura...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <AdminLoginScreen
        onBackToPublicSite={onBackToPublicSite}
      />
    );
  }

  return (
    <LanguageProvider>
      <InternalCRMApp onBackToPublicSite={onBackToPublicSite} />
    </LanguageProvider>
  );
}

function AppContent() {
  // Section: 'public' or 'crm'
  const [activeSection, setActiveSection] = useState<AppSection>(() => {
    try {
      const saved = localStorage.getItem('cm_active_section');
      if (saved === 'public' || saved === 'crm') return saved;
    } catch {
      // ignore
    }
    return 'public'; // Padrão no site de vendas
  });

  useEffect(() => {
    try {
      localStorage.setItem('cm_active_section', activeSection);
    } catch {
      // ignore
    }
  }, [activeSection]);

  return (
    <div className="relative min-h-screen">
      {/* PARTE 1: SITE PÚBLICO (Com gatilho invisível no logo do rodapé para entrar no CRM) */}
      {activeSection === 'public' && (
        <SiteLanguageProvider>
          <SalesLandingPage onOpenCRM={() => setActiveSection('crm')} />
        </SiteLanguageProvider>
      )}

      {/* PARTE 2: SISTEMA INTERNO (CRM blindado com Login e Senha via Supabase Auth) */}
      {activeSection === 'crm' && (
        <ProtectedCRM onBackToPublicSite={() => setActiveSection('public')} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <SupabaseAuthProvider>
      <AppContent />
    </SupabaseAuthProvider>
  );
}
