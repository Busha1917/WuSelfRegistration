import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import { authService } from '@/mocks/services';
import { useToast } from '@/components/ui/Toast';
import Card, { CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function ProfilePage() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { addToast } = useToast();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });

  const handleSaveProfile = async () => {
    addToast('Profile updated', 'success');
    setEditing(false);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      addToast('Passwords do not match', 'error');
      return;
    }
    await authService.changePassword(passwords.current, passwords.new);
    addToast('Password changed successfully', 'success');
    setPasswords({ current: '', new: '', confirm: '' });
  };

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold text-wu-ink">{t('student.profile.title')}</h1>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <CardTitle>{t('student.profile.edit')}</CardTitle>
          {!editing && <Button variant="ghost" size="sm" onClick={() => setEditing(true)}>{t('common.edit')}</Button>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Full Name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} disabled={!editing} />
          <Input label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} disabled={!editing} />
          <Input label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} disabled={!editing} />
          <div>
            <label className="block text-sm font-medium text-wu-ink mb-1">Role</label>
            <p className="px-3 py-2 bg-gray-50 rounded-lg text-sm text-neutral capitalize">{user?.role}</p>
          </div>
        </div>
        {editing && (
          <div className="flex gap-2 mt-4">
            <Button onClick={handleSaveProfile}>{t('student.profile.saveChanges')}</Button>
            <Button variant="ghost" onClick={() => setEditing(false)}>{t('common.cancel')}</Button>
          </div>
        )}
      </Card>

      <Card>
        <CardTitle>{t('student.profile.changePassword')}</CardTitle>
        <form onSubmit={handleChangePassword} className="space-y-4 mt-4 max-w-md">
          <Input label={t('student.profile.currentPassword')} type="password" value={passwords.current} onChange={(e) => setPasswords({ ...passwords, current: e.target.value })} required />
          <Input label={t('student.profile.newPassword')} type="password" value={passwords.new} onChange={(e) => setPasswords({ ...passwords, new: e.target.value })} required />
          <Input label="Confirm New Password" type="password" value={passwords.confirm} onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })} required />
          <Button type="submit">{t('student.profile.changePassword')}</Button>
        </form>
      </Card>
    </div>
  );
}
