import React, { useState } from 'react';
import { User, Shield, Database, Github, CheckCircle2, Globe2, Check, KeyRound, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSupabaseAuth } from '../context/SupabaseAuthContext';
import { supabase } from '../lib/supabase';
import { FlagIcon } from './FlagIcon';
import { Language } from '../i18n/translations';

export const SettingsView: React.FC = () => {
  const { language, setLanguage, t, availableLanguages } = useLanguage();
  const { user } = useSupabaseAuth();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUpdatingPwd, setIsUpdatingPwd] = useState(false);
  const [pwdFeedback, setPwdFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdFeedback(null);

    if (newPassword.length < 6) {
      setPwdFeedback({ type: 'error', message: 'A nova senha deve ter no mínimo 6 caracteres.' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPwdFeedback({ type: 'error', message: 'A confirmação de senha não confere.' });
      return;
    }

    setIsUpdatingPwd(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) {
        setPwdFeedback({ type: 'error', message: `Erro ao atualizar senha: ${error.message}` });
      } else {
        setPwdFeedback({ type: 'success', message: 'Senha atualizada com sucesso no Supabase com criptografia!' });
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (err: any) {
      setPwdFeedback({ type: 'error', message: err.message || 'Erro inesperado ao atualizar a senha.' });
    } finally {
      setIsUpdatingPwd(false);
    }
  };

  const languageDescriptions: Record<Language, string> = {
    pt: 'Português do Brasil como idioma padrão do sistema, formatos de moeda (R$) e datas brasileiras.',
    en: 'Standard international English with USD ($) currency formatting and international date conventions.',
    es: 'Español estándar para operaciones en América Latina y España, con formato en Euros (€) y fechas europeas.',
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h3 className="text-base font-semibold text-slate-900">{t('settingsTitle')}</h3>
        <p className="text-xs text-slate-500">{t('settingsSubtitle')}</p>
      </div>

      <div className="rounded-xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-6">
        {/* Language Selection Section */}
        <div className="pb-6 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Globe2 className="h-4 w-4 text-blue-600" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-600">
              {t('systemLanguage')}
            </h4>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            {t('systemLanguageDesc')}
          </p>

          {/* Language Cards with Flags */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {availableLanguages.map((item) => {
              const isSelected = language === item.code;
              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => setLanguage(item.code)}
                  className={`group relative flex flex-col items-start p-4 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/50 shadow-xs ring-1 ring-blue-600'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <FlagIcon country={item.code} size="lg" />
                      <div>
                        <p className="text-xs font-bold text-slate-900">{item.nativeLabel}</p>
                        <p className="text-[10px] text-slate-400 uppercase font-medium">{item.code} • {item.currency}</p>
                      </div>
                    </div>
                    {isSelected && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white">
                        <Check className="h-3 w-3 stroke-3" />
                      </span>
                    )}
                  </div>

                  <p className="mt-3 text-[11px] text-slate-500 leading-relaxed">
                    {languageDescriptions[item.code]}
                  </p>

                  <div className="mt-3 pt-2 w-full border-t border-slate-100 flex items-center justify-between text-[10px]">
                    <span className="text-slate-400">{item.label}</span>
                    {isSelected ? (
                      <span className="font-semibold text-blue-700">{t('activeLanguage')}</span>
                    ) : (
                      <span className="text-slate-500 group-hover:text-slate-800">Clique para ativar</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Profile Section */}
        <div className="flex items-start gap-4 pb-6 border-b border-slate-100">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 font-bold text-white text-base">
            CM
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900">Christian Martins</h4>
            <p className="text-xs text-slate-500 font-mono">{user?.email || 'christianmartinsatencion@gmail.com'}</p>
            <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700">
              <Shield className="h-3 w-3" /> {t('adminMaster')}
            </span>
          </div>
        </div>

        {/* Security & Access Password */}
        <div className="pb-6 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <KeyRound className="h-4 w-4 text-blue-600" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-600">
              Segurança & Senha de Acesso (Supabase Auth)
            </h4>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Altere a senha da sua conta de administrador. A nova senha será atualizada e criptografada no Supabase.
          </p>

          <form onSubmit={handlePasswordChange} className="mt-4 max-w-md space-y-3">
            {pwdFeedback && (
              <div
                className={`rounded-lg p-2.5 text-xs font-medium ${
                  pwdFeedback.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}
              >
                {pwdFeedback.message}
              </div>
            )}

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Nova Senha
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={6}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-hidden font-mono"
                placeholder="Digite a nova senha (mínimo 6 caracteres)"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Confirmar Nova Senha
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-hidden font-mono"
                placeholder="Confirme a nova senha"
              />
            </div>

            <button
              type="submit"
              disabled={isUpdatingPwd}
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition-colors disabled:opacity-50"
            >
              {isUpdatingPwd ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Atualizando no Supabase...</span>
                </>
              ) : (
                <span>Atualizar Senha Segura</span>
              )}
            </button>
          </form>
        </div>

        {/* Integration Status */}
        <div className="pb-6 border-b border-slate-100">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {t('repoSection')}
          </h4>
          <div className="mt-3 flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-3">
              <Github className="h-5 w-5 text-slate-800" />
              <div>
                <p className="text-xs font-semibold text-slate-900">christianmartinsatencion-hash/christianmartinscrm</p>
                <p className="text-[11px] text-slate-500">{t('repoSynced')}</p>
              </div>
            </div>
            <span className="flex items-center gap-1 text-xs font-medium text-emerald-600">
              <CheckCircle2 className="h-4 w-4" /> {t('statusConnected')}
            </span>
          </div>
        </div>

        {/* System info */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {t('envSection')}
          </h4>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="rounded-lg border border-slate-200 p-3 bg-white">
              <p className="text-slate-500 text-[11px]">{t('envTechs')}</p>
              <p className="font-semibold text-slate-900 mt-0.5">{t('envTechsDesc')}</p>
            </div>
            <div className="rounded-lg border border-slate-200 p-3 bg-white">
              <p className="text-slate-500 text-[11px]">{t('envStructure')}</p>
              <p className="font-semibold text-slate-900 mt-0.5">{t('envStructureDesc')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
