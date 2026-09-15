import { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { adminService } from '@/mocks/services';
import type { User, UserRole } from '@/types';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import DataTable from '@/components/shared/DataTable';
import type { Column } from '@/components/shared/DataTable';
import Dialog from '@/components/ui/Dialog';
import StatusBadge from '@/components/shared/StatusBadge';
import { useToast } from '@/components/ui/Toast';
import DashboardHero from '@/components/shared/DashboardHero';

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
    const data = await adminService.getUsers({ search, role: (roleFilter as UserRole) || undefined });
    setUsers(data);
    setLoading(false);
  }, [search, roleFilter]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleCreate = async () => {
    if (!newUser.fullName.trim() || !newUser.email.trim()) return;
    await adminService.createUser(newUser);
    addToast(`Account for ${newUser.fullName} created successfully.`, 'success');
    setCreateOpen(false);
    setNewUser({ fullName: '', email: '', role: 'student' });
    fetchData();
  };

  const handleToggle = async (user: User) => {
    if (user.isActive) {
      await adminService.deactivateUser(user.id);
      addToast(`Account for ${user.fullName} deactivated.`, 'warning');
    } else {
      await adminService.updateUser(user.id, { isActive: true });
      addToast(`Account for ${user.fullName} activated.`, 'success');
    }
    fetchData();
  };

  const roleColors: Record<string, string> = {
    student: 'bg-[#0073AA] text-white',
    registrar: 'bg-[#D9251D] text-white',
    admin: 'bg-[#6D28D9] text-white',
    management: 'bg-[#059669] text-white',
    council: 'bg-[#D97706] text-white',
  };

  const columns: Column<User>[] = [
    {
      key: 'name',
      header: 'Full Legal Name',
      render: (u) => (
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#00486E] text-white text-xs font-bold flex items-center justify-center shrink-0">
            {u.fullName.charAt(0)}
          </div>
          <div>
            <span className="font-bold text-[#00486E] block">{u.fullName}</span>
            <span className="text-[10px] text-gray-400 font-mono">ID: {u.id}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'email',
      header: 'Institutional Email',
      render: (u) => <span className="font-mono text-xs text-gray-700">{u.email}</span>,
    },
    {
      key: 'role',
      header: 'Assigned Role',
      render: (u) => (
        <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded ${roleColors[u.role] || 'bg-gray-100 text-gray-800'}`}>
          {u.role}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Account Status',
      render: (u) => <StatusBadge status={u.isActive ? 'active' : 'inactive'} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (u) => (
        <button
          onClick={() => handleToggle(u)}
          className={`text-[11px] font-bold px-3 py-1 rounded transition-colors shadow-2xs ${u.isActive
              ? 'bg-red-50 hover:bg-red-100 text-[#D9251D] border border-red-200'
              : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
            }`}
        >
          {u.isActive ? 'Deactivate' : 'Activate'}
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* ─── Hero ─── */}
      <DashboardHero
        badge="SECURITY & AUTHENTICATION ACCESS CONTROL"
        title={t('admin.users.title', 'User Directory & Privileges Management')}
        description="Provision, modify, audit, and deactivate accounts across all 5 institutional access roles: Students, Registrars, System Administrators, University Senate, and Student Council."
        stats={[
          { label: 'Directory Total', value: users.length, highlight: true },
          { label: 'Filter Matches', value: users.length },
          { label: 'Role Types', value: '5 Roles' },
        ]}
        actions={
          <button
            onClick={() => setCreateOpen(true)}
            className="bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded shadow transition-all flex items-center gap-1.5"
          >
            <span>+ Provision New User</span>
          </button>
        }
      />

      <Card>
        <div className="p-4 bg-[#FAFBFD] rounded-sm border border-gray-200 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex-1">
            <span className="text-xs font-bold text-[#00486E] uppercase tracking-wider block mb-1">
              DIRECTORY SEARCH & FILTER
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
              <Input
                placeholder="Search by full name or email address..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                options={[
                  { value: '', label: 'All Roles (5)' },
                  { value: 'student', label: 'Student' },
                  { value: 'registrar', label: 'Registrar' },
                  { value: 'admin', label: 'Admin' },
                  { value: 'management', label: 'Management' },
                  { value: 'council', label: 'Council' },
                ]}
              />
            </div>
          </div>

          <span className="text-xs text-gray-500 font-medium shrink-0">
            Showing <span className="font-bold text-[#00486E]">{users.length}</span> verified accounts
          </span>
        </div>

        <DataTable
          columns={columns}
          data={users as any[]}
          getId={(u: any) => u.id}
          loading={loading}
        />
      </Card>

      {/* Provision User Modal */}
      <Dialog open={createOpen} onClose={() => setCreateOpen(false)} title="Provision New Institutional Account">
        <div className="space-y-4 pt-2">
          <p className="text-xs text-gray-500">
            Enter legal credentials to create an authenticated Wallaga University academic or administrative account.
          </p>
          <Input
            label="Full Legal Name"
            placeholder="e.g. Dr. Bekele Tsegaye"
            value={newUser.fullName}
            onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
            required
          />
          <Input
            label="Institutional Email"
            placeholder="e.g. b.tsegaye@wu.edu.et"
            type="email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            required
          />
          <Select
            label="Security Role & Privileges"
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value as UserRole })}
            options={[
              { value: 'student', label: 'Student (Self-Registration & ID)' },
              { value: 'registrar', label: 'Registrar (Application Review & Placement)' },
              { value: 'admin', label: 'System Admin (Full Configuration)' },
              { value: 'management', label: 'Management (Senate Analytics)' },
              { value: 'council', label: 'Student Council (Assistance Desk)' },
            ]}
          />
          <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
            <button
              onClick={() => setCreateOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              disabled={!newUser.fullName.trim() || !newUser.email.trim()}
              className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#6D28D9] hover:bg-[#5B21B6] rounded shadow disabled:opacity-50"
            >
              Create Account ↗
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
