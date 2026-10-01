import React from 'react';
import { Users, Briefcase, TrendingUp, CheckCircle, ArrowUpRight, Plus, FolderKanban } from 'lucide-react';
import { Customer, Deal, Task } from '../types/crm';
import { useLanguage } from '../context/LanguageContext';

interface DashboardViewProps {
  customers: Customer[];
  deals: Deal[];
  tasks: Task[];
  onNavigateTo: (view: 'customers' | 'deals' | 'tasks') => void;
  onOpenNewCustomer: () => void;
  onOpenNewDeal: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  customers,
  deals,
  tasks,
  onNavigateTo,
  onOpenNewCustomer,
  onOpenNewDeal,
}) => {
  const { t, formatCurrency, formatDate } = useLanguage();

  const totalPipelineValue = deals.reduce((acc, deal) => acc + deal.value, 0);
  const wonDealsCount = deals.filter((d) => d.stage === 'won').length;
  const completedTasksCount = tasks.filter((t) => t.completed).length;

  const stats = [
    {
      title: t('statTotalCustomers'),
      value: customers.length.toString(),
      change: t('statActiveBase'),
      icon: Users,
      color: 'text-blue-600 bg-blue-50',
    },
    {
      title: t('statSalesPipeline'),
      value: formatCurrency(totalPipelineValue),
      change: `${deals.length} ${t('statDealsCount')}`,
      icon: Briefcase,
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      title: t('statWonDeals'),
      value: wonDealsCount.toString(),
      change: t('statConvertedDeals'),
      icon: TrendingUp,
      color: 'text-indigo-600 bg-indigo-50',
    },
    {
      title: t('statCompletedTasks'),
      value: `${completedTasksCount} / ${tasks.length}`,
      change: t('statFollowUp'),
      icon: CheckCircle,
      color: 'text-amber-600 bg-amber-50',
    },
  ];

  const getStageBadge = (stage: Deal['stage']) => {
    switch (stage) {
      case 'lead':
        return <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700">{t('stageLead')}</span>;
      case 'contact':
        return <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-medium text-indigo-700">{t('stageContact')}</span>;
      case 'proposal':
        return <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-700">{t('stageProposal')}</span>;
      case 'negotiation':
        return <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-700">{t('stageNegotiation')}</span>;
      case 'won':
        return <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">{t('stageWon')}</span>;
      case 'lost':
        return <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-medium text-rose-700">{t('stageLost')}</span>;
    }
  };

  const getStatusBadge = (status: Customer['status']) => {
    switch (status) {
      case 'active':
        return <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">{t('statusActive')}</span>;
      case 'lead':
        return <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-700">{t('statusLead')}</span>;
      case 'inactive':
        return <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">{t('statusInactive')}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 to-blue-900 p-6 sm:p-8 text-white shadow-sm">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/20 px-3 py-1 text-xs font-medium text-blue-200 backdrop-blur-xs">
            Christian Martins CRM • Core
          </span>
          <h2 className="mt-3 text-xl sm:text-2xl font-bold tracking-tight">
            {t('welcomeTitle')}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-300">
            {t('welcomeSubtitle')}
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <button
              onClick={onOpenNewDeal}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-blue-500 transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              {t('btnNewDeal')}
            </button>
            <button
              onClick={onOpenNewCustomer}
              className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-xs hover:bg-white/20 transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              {t('btnNewContact')}
            </button>
          </div>
        </div>
      </div>

      {/* Quick Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-slate-500">{stat.title}</p>
                <div className={`rounded-lg p-2 ${stat.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-3 text-2xl font-bold tracking-tight text-slate-900">{stat.value}</p>
              <p className="mt-1 text-[11px] font-medium text-slate-500">{stat.change}</p>
            </div>
          );
        })}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Deals */}
        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">{t('recentDealsTitle')}</h3>
              <p className="text-xs text-slate-500">{t('recentDealsSubtitle')}</p>
            </div>
            <button
              onClick={() => onNavigateTo('deals')}
              className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              {t('viewAllPipeline')}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {deals.length === 0 ? (
              <p className="py-6 text-center text-xs text-slate-400">{t('noDealsYet')}</p>
            ) : (
              deals.slice(0, 4).map((deal) => (
                <div key={deal.id} className="flex items-center justify-between py-3">
                  <div className="min-w-0 flex-1 pr-3">
                    <p className="truncate text-xs font-semibold text-slate-900">{deal.title}</p>
                    <p className="truncate text-[11px] text-slate-500">{deal.customerName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-900">{formatCurrency(deal.value)}</p>
                    <div className="mt-1">{getStageBadge(deal.stage)}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Contacts */}
        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">{t('recentContactsTitle')}</h3>
              <p className="text-xs text-slate-500">{t('recentContactsSubtitle')}</p>
            </div>
            <button
              onClick={() => onNavigateTo('customers')}
              className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              {t('viewAllContacts')}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {customers.length === 0 ? (
              <p className="py-6 text-center text-xs text-slate-400">{t('noContactsYet')}</p>
            ) : (
              customers.slice(0, 4).map((c) => (
                <div key={c.id} className="flex items-center justify-between py-3">
                  <div className="min-w-0 flex-1 pr-3">
                    <p className="truncate text-xs font-semibold text-slate-900">{c.name}</p>
                    <p className="truncate text-[11px] text-slate-500">{c.company} • {c.email}</p>
                  </div>
                  <div>
                    {getStatusBadge(c.status)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
