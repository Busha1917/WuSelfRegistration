import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { authService } from '@/mocks/services';
import { useToast } from '@/components/ui/Toast';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function ForgotPasswordPage() {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const [step, setStep] = useState<'email' | 'reset'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.forgotPassword(email);
      setStep('reset');
    } catch {
      addToast('Failed to send code', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      addToast('Passwords do not match', 'error');
      return;
    }
    setLoading(true);
    try {
      await authService.resetPassword(code, newPassword);
      addToast(t('auth.forgotPassword.success'), 'success');
    } catch {
      addToast('Reset failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-wu-cream flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <Link to="/login" className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-wu-maroon rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xs">WU</span>
          </div>
          <span className="font-heading font-bold text-sm">WU-SSRS</span>
        </Link>

        <h2 className="text-2xl font-bold font-heading text-wu-ink mb-1">{t('auth.forgotPassword.title')}</h2>
        <p className="text-sm text-neutral mb-6">{t('auth.forgotPassword.description')}</p>

        {step === 'email' ? (
          <form onSubmit={handleSendCode} className="space-y-4">
            <Input label={t('auth.forgotPassword.email')} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Button type="submit" className="w-full" loading={loading}>{t('auth.forgotPassword.submit')}</Button>
          </form>
        ) : (
          <form onSubmit={handleReset} className="space-y-4">
            <Input label={t('auth.forgotPassword.codeLabel')} value={code} onChange={(e) => setCode(e.target.value)} required />
            <Input label={t('auth.forgotPassword.newPassword')} type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
            <Input label={t('auth.forgotPassword.confirmPassword')} type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            <Button type="submit" className="w-full" loading={loading}>{t('auth.forgotPassword.verify')}</Button>
          </form>
        )}

        <div className="mt-6 text-center">
          <Link to="/login" className="text-sm font-medium text-wu-maroon hover:text-wu-maroon-900">
            {t('auth.forgotPassword.backToLogin')}
          </Link>
        </div>
      </div>
    </div>
  );
}
