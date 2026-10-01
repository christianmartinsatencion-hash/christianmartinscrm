import React, { useState } from 'react';
import { Lock, Mail, KeyRound, Eye, EyeOff, ShieldCheck, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { useSupabaseAuth } from '../../context/SupabaseAuthContext';

interface AdminLoginScreenProps {
  onBackToPublicSite: () => void;
}

export const AdminLoginScreen: React.FC<AdminLoginScreenProps> = ({ onBackToPublicSite }) => {
  const { signIn } = useSupabaseAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Por favor, preencha o e-mail e a senha.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    setLoading(true);

    try {
      const { error } = await signIn(email.trim().toLowerCase(), password);
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          setErrorMessage('Credenciais inválidas. Verifique seu e-mail e senha.');
        } else if (error.message.includes('Email not confirmed')) {
          setErrorMessage('E-mail ainda não confirmado. Verifique sua caixa de entrada.');
        } else if (error.message.includes('rate limit')) {
          setErrorMessage('Muitas tentativas consecutivas. Por segurança, aguarde alguns minutos e tente novamente.');
        } else {
          setErrorMessage(error.message);
        }
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Ocorreu um erro ao processar a autenticação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 flex flex-col justify-center items-center px-4 py-12 sm:px-6 lg:px-8 text-white relative">
      {/* Botão de retorno ao site público */}
      <div className="absolute top-6 left-6">
        <button
          onClick={onBackToPublicSite}
          type="button"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors bg-slate-800/60 hover:bg-slate-800 px-3.5 py-2 rounded-lg border border-slate-700/60 backdrop-blur-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar ao Site Público
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Ícone de Escudo / Blindagem */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/10 mb-4">
          <ShieldCheck className="h-7 w-7" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl font-mono">
          Área Restrita do CRM
        </h2>
        <p className="mt-2 text-xs text-slate-400">
          Acesso exclusivo para gerenciamento comercial e administrativo
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-900/90 py-8 px-6 shadow-2xl rounded-2xl sm:px-10 border border-slate-800 backdrop-blur-md">
          {/* Header de Identificação */}
          <div className="mb-6 border-b border-slate-800 pb-3">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Acesso de Administrador</span>
          </div>

          {/* Feedback de Erro */}
          {errorMessage && (
            <div className="mb-4 flex items-start gap-2.5 rounded-lg bg-red-500/10 p-3 text-xs text-red-300 border border-red-500/30">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                E-mail
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-4 w-4 text-slate-500" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="seu-email@dominio.com"
                  className="block w-full rounded-lg border border-slate-700 bg-slate-800/80 pl-10 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Senha de Acesso
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <KeyRound className="h-4 w-4 text-slate-500" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="block w-full rounded-lg border border-slate-700 bg-slate-800/80 pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-500 px-4 py-2.5 text-xs font-bold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-blue-600/20 mt-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Autenticando...</span>
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4" />
                  <span>Entrar com Conta Supabase</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
