import React, { useState } from 'react';
import { Search, Plus, Mail, Phone, Building2, Trash2, UserCheck } from 'lucide-react';
import { Customer } from '../types/crm';
import { useLanguage } from '../context/LanguageContext';

interface ContactsViewProps {
  customers: Customer[];
  onAddCustomer: (customer: Omit<Customer, 'id' | 'createdAt'>) => void;
  onDeleteCustomer?: (customerId: string) => void;
  onRefreshSupabase?: () => void;
}

export const ContactsView: React.FC<ContactsViewProps> = ({ customers, onAddCustomer, onDeleteCustomer, onRefreshSupabase }) => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    status: 'lead' as Customer['status'],
  });

  const handleSyncClick = async () => {
    if (onRefreshSupabase) {
      setIsSyncing(true);
      try {
        await onRefreshSupabase();
      } finally {
        setTimeout(() => setIsSyncing(false), 600);
      }
    }
  };

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    onAddCustomer(formData);
    setFormData({ name: '', email: '', phone: '', company: '', status: 'lead' });
    setIsModalOpen(false);
  };

  const getStatusBadge = (status: Customer['status']) => {
    switch (status) {
      case 'active':
        return <span className="inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">{t('statusActive')}</span>;
      case 'lead':
        return <span className="inline-flex rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-700">{t('statusLead')}</span>;
      case 'inactive':
        return <span className="inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">{t('statusInactive')}</span>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Action Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('searchContactPlaceholder')}
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2">
          {onRefreshSupabase && (
            <button
              type="button"
              onClick={handleSyncClick}
              disabled={isSyncing}
              className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-50"
              title="Sincronizar leads gravados no Supabase"
            >
              <span className={`inline-block h-2 w-2 rounded-full ${isSyncing ? 'bg-amber-400 animate-ping' : 'bg-emerald-500'}`} />
              <span>{isSyncing ? 'Sincronizando...' : 'Sincronizar Supabase'}</span>
            </button>
          )}

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 transition-colors cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            {t('btnCreateContact')}
          </button>
        </div>
      </div>

      {/* Customer Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/75 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4">{t('colNameContact')}</th>
                <th className="py-3 px-4">{t('colCompany')}</th>
                <th className="py-3 px-4">{t('colStatus')}</th>
                <th className="py-3 px-4">{t('colRegisteredAt')}</th>
                <th className="py-3 px-4 text-right">{t('colActions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    <UserCheck className="mx-auto h-8 w-8 text-slate-300" />
                    <p className="mt-2 font-medium text-slate-600">{t('emptyContactsTitle')}</p>
                    <p className="text-[11px] text-slate-400">{t('emptyContactsDesc')}</p>
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900">{c.name}</span>
                        {c.utm_source && (
                          <span className="inline-flex rounded-md bg-purple-50 px-1.5 py-0.5 text-[9px] font-semibold text-purple-700 border border-purple-200">
                            {c.utm_source}
                          </span>
                        )}
                      </div>
                      <div className="mt-0.5 flex items-center gap-3 text-[11px] text-slate-500">
                        <span className="flex items-center gap-1">
                          <Mail className="h-3 w-3 text-slate-400" /> {c.email}
                        </span>
                        {c.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3 text-slate-400" /> {c.phone}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5 text-slate-700">
                        <Building2 className="h-3.5 w-3.5 text-slate-400" />
                        {c.company}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {getStatusBadge(c.status)}
                    </td>
                    <td className="py-3 px-4 text-slate-500 text-[11px]">
                      {c.createdAt}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {onDeleteCustomer && (
                        <button
                          onClick={() => onDeleteCustomer(c.id)}
                          title="Excluir Contato"
                          className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Customer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-2xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl animate-in fade-in-50 zoom-in-95 duration-150">
            <h3 className="text-base font-semibold text-slate-900">{t('modalNewContact')}</h3>
            <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-700">{t('labelFullName')} *</label>
                <input
                  type="text"
                  required
                  placeholder={t('placeholderFullName')}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700">{t('labelEmail')} *</label>
                <input
                  type="email"
                  required
                  placeholder={t('placeholderEmail')}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700">{t('labelPhone')}</label>
                <input
                  type="text"
                  placeholder={t('placeholderPhone')}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700">{t('labelCompanyField')}</label>
                <input
                  type="text"
                  placeholder={t('placeholderCompany')}
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700">{t('labelStatusField')}</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as Customer['status'] })}
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-blue-500 focus:outline-hidden"
                >
                  <option value="lead">{t('statusLead')}</option>
                  <option value="active">{t('statusActive')}</option>
                  <option value="inactive">{t('statusInactive')}</option>
                </select>
              </div>

              <div className="mt-5 flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  {t('btnCancel')}
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition-colors"
                >
                  {t('btnSaveContact')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
