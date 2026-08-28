import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import { useToast } from '@/components/ui/Toast';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';

export default function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();
  const { addToast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const user = await login(email, password);
      addToast(t('auth.login.success'), 'success');
      navigate(`/${user.role === 'student' ? 'student' : user.role}/dashboard`);
    } catch {
      setError(t('auth.login.invalid'));
    }
  };

  return (
    <div className="min-h-screen bg-wu-cream flex">
      {/* Left panel - branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-wu-maroon items-center justify-center p-12">
        <div className="text-center text-white max-w-md">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="font-bold text-2xl">WU</span>
          </div>
          <h1 className="font-heading text-3xl font-bold mb-3">Wollega University</h1>
          <p className="text-white/70 text-lg">Student Self-Registration System</p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-2xl font-bold">3</div>
              <div className="text-xs text-white/60">Campuses</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-2xl font-bold">8+</div>
              <div className="text-xs text-white/60">Programs</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-xs text-white/60">Online</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center justify-between mb-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-wu-maroon rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">WU</span>
              </div>
              <span className="font-heading font-bold text-sm">WU-SSRS</span>
            </Link>
            <LanguageSwitcher />
          </div>

          <h2 className="text-2xl font-bold font-heading text-wu-ink mb-1">{t('auth.login.title')}</h2>
          <p className="text-sm text-neutral mb-6">Sign in to access your account</p>

          {error && (
            <div className="bg-danger-light text-danger text-sm px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label={t('auth.login.email')}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="student@wu.edu.et"
            />
            <Input
              label={t('auth.login.password')}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-neutral">
                <input type="checkbox" className="rounded" />
                {t('auth.login.rememberMe')}
              </label>
              <Link to="/forgot-password" className="text-wu-maroon hover:text-wu-maroon-900">
                {t('auth.login.forgotPassword')}
              </Link>
            </div>

            <Button type="submit" className="w-full" loading={isLoading}>
              {t('auth.login.submit')}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-sm text-neutral">{t('auth.login.noAccount')} </span>
            <Link to="/register" className="text-sm font-medium text-wu-maroon hover:text-wu-maroon-900">
              {t('nav.register')}
            </Link>
          </div>

          {/* Demo accounts */}
          <div className="mt-8 p-4 bg-wu-gold-50 rounded-lg border border-wu-gold-300/30">
            <p className="text-xs font-medium text-wu-ink mb-2">Demo Accounts (password: password)</p>
            <div className="space-y-1 text-xs text-neutral">
              {[
                { email: 'student@wu.edu.et', role: 'Student' },
                { email: 'registrar@wu.edu.et', role: 'Registrar' },
                { email: 'admin@wu.edu.et', role: 'Admin' },
                { email: 'management@wu.edu.et', role: 'Management' },
                { email: 'council@wu.edu.et', role: 'Council' },
              ].map((acc) => (
                <button
                  key={acc.email}
                  type="button"
                  onClick={() => { setEmail(acc.email); setPassword('password'); }}
                  className="block w-full text-left px-2 py-1 rounded hover:bg-white/60 transition-colors"
                >
                  <span className="font-medium text-wu-ink">{acc.role}:</span> {acc.email}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
