import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { authService } from '@/mocks/services';
import { useToast } from '@/components/ui/Toast';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';

const admissionOptions = [
  { value: 'regular', label: 'Regular' },
  { value: 'weekend', label: 'Weekend' },
  { value: 'night', label: 'Night' },
  { value: 'distance_summer', label: 'Distance & Summer' },
  { value: 'masters', label: 'Masters' },
  { value: 'phd', label: 'PhD' },
];

export default function RegisterPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', nationalId: '',
    admissionType: 'regular', password: '', confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Required';
    if (!form.email.trim()) newErrors.email = 'Required';
    if (!form.phone.trim()) newErrors.phone = 'Required';
    if (form.password.length < 6) newErrors.password = 'Must be at least 6 characters';
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = t('auth.register.passwordMismatch');

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      await authService.register({
        email: form.email,
        password: form.password,
        fullName: form.fullName,
        phone: form.phone,
        admissionType: form.admissionType as any,
        nationalId: form.nationalId || undefined,
      });
      addToast(t('auth.register.success'), 'success');
      navigate('/login');
    } catch {
      setErrors({ email: 'Registration failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-wu-cream flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-wu-maroon rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">WU</span>
            </div>
            <span className="font-heading font-bold text-sm">WU-SSRS</span>
          </Link>
          <LanguageSwitcher />
        </div>

        <h2 className="text-2xl font-bold font-heading text-wu-ink mb-1">{t('auth.register.title')}</h2>
        <p className="text-sm text-neutral mb-6">Create your account to start the registration process</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label={t('auth.register.fullName')} name="fullName" value={form.fullName} onChange={handleChange} error={errors.fullName} required />
          <Input label={t('auth.register.email')} name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} required />
          <Input label={t('auth.register.phone')} name="phone" type="tel" value={form.phone} onChange={handleChange} error={errors.phone} required placeholder="+2519..." />
          <Input label={t('auth.register.nationalId')} name="nationalId" value={form.nationalId} onChange={handleChange} />
          <Select label={t('auth.register.admissionType')} name="admissionType" value={form.admissionType} onChange={handleChange} options={admissionOptions} />
          <Input label={t('auth.register.password')} name="password" type="password" value={form.password} onChange={handleChange} error={errors.password} required />
          <Input label={t('auth.register.confirmPassword')} name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} error={errors.confirmPassword} required />

          <Button type="submit" className="w-full" loading={loading}>
            {t('auth.register.submit')}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-sm text-neutral">{t('auth.register.hasAccount')} </span>
          <Link to="/login" className="text-sm font-medium text-wu-maroon hover:text-wu-maroon-900">
            {t('nav.login')}
          </Link>
        </div>
      </div>
    </div>
  );
}
