import { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { adminService } from '@/mocks/services';
import type { User, UserRole } from '@/types';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import DataTable from '@/components/shared/DataTable';
import type { Column } from '@/components/shared/DataTable';
import Dialog from '@/components/ui/Dialog';
import StatusBadge from '@/components/shared/StatusBadge';
import { useToast } from '@/components/ui/Toast';

export default function UserManagement() {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [newUser, setNewUser] = useState({ fullName: '', email: '', role: 'student' as UserRole });

  const fetchData = useCallback(async () => {
    setLoading(true);
    const data = await adminService.getUsers({ search, role: roleFilter as UserRole || undefined });
    setUsers(data);
    setLoading(false);
  }, [search, roleFilter]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleCreate = async () => {
    await adminService.createUser(newUser);
    addToast('User created', 'success');
    setCreateOpen(false);
    setNewUser({ fullName: '', email: '', role: 'student' });
    fetchData();
  };

  const handleToggle = async (user: User) => {
    if (user.isActive) {
      await adminService.deactivateUser(user.id);
      addToast('User deactivated', 'success');
    } else {
      await adminService.updateUser(user.id, { isActive: true });
      addToast('User activated', 'success');
    }
    fetchData();
  };

  const columns: Column<User>[] = [
    { key: 'name', header: t('common.name'), render: (u) => u.fullName },
    { key: 'email', header: t('common.email'), render: (u) => u.email },
    { key: 'role', header: t('admin.users.role'), render: (u) => <span className="capitalize">{u.role}</span> },
    { key: 'status', header: t('admin.users.status'), render: (u) => <StatusBadge status={u.isActive ? 'active' : 'inactive'} /> },
    { key: 'actions', header: t('common.actions'), render: (u) => (
      <Button size="sm" variant={u.isActive ? 'destructive' : 'ghost'} onClick={() => handleToggle(u)}>
        {u.isActive ? t('admin.users.deactivate') : t('admin.users.activate')}
      </Button>
    )},
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-wu-ink">{t('admin.users.title')}</h1>
        <Button onClick={() => setCreateOpen(true)}>{t('admin.users.createUser')}</Button>
      </div>
      <Card>
        <div className="flex gap-3 mb-4">
          <div className="flex-1"><Input placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} /></div>
          <Select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}
            options={[{ value: '', label: 'All Roles' }, { value: 'student', label: 'Student' }, { value: 'registrar', label: 'Registrar' }, { value: 'admin', label: 'Admin' }, { value: 'management', label: 'Management' }, { value: 'council', label: 'Council' }]} />
        </div>
        <DataTable columns={columns} data={users as any[]} loading={loading} getId={(u: any) => u.id} />
      </Card>

      <Dialog open={createOpen} onClose={() => setCreateOpen(false)} title={t('admin.users.createUser')}>
        <div className="space-y-4">
          <Input label="Full Name" value={newUser.fullName} onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })} required />
          <Input label="Email" type="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} required />
          <Select label="Role" value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value as UserRole })}
            options={[{ value: 'student', label: 'Student' }, { value: 'registrar', label: 'Registrar' }, { value: 'admin', label: 'Admin' }, { value: 'management', label: 'Management' }, { value: 'council', label: 'Council' }]} />
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setCreateOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate}>{t('common.create')}</Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
