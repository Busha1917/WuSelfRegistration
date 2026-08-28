import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { adminService } from '@/mocks/services';
import type { AuditLogEntry } from '@/types';
import Card from '@/components/ui/Card';
import DataTable from '@/components/shared/DataTable';
import type { Column } from '@/components/shared/DataTable';
import Input from '@/components/ui/Input';

export default function RegistrarHistory() {
  const { t } = useTranslation();
  const [entries, setEntries] = useState<AuditLogEntry[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    adminService.getAuditLog({ search }).then((data) => {
      setEntries(data.filter((e) => ['approve_application', 'reject_application', 'verify_document'].includes(e.action)));
      setLoading(false);
    });
  }, [search]);

  const columns: Column<AuditLogEntry>[] = [
    { key: 'user', header: t('registrar.history.applicant'), render: (e) => e.userName },
    { key: 'action', header: t('registrar.history.action'), render: (e) => e.action.replace(/_/g, ' ') },
    { key: 'target', header: 'Target', render: (e) => e.targetId },
    { key: 'details', header: t('registrar.history.outcome'), render: (e) => e.details },
    { key: 'timestamp', header: t('registrar.history.timestamp'), render: (e) => new Date(e.timestamp).toLocaleString() },
  ];

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold text-wu-ink">{t('registrar.history.title')}</h1>
      <Card>
        <Input placeholder={t('admin.auditLog.filter')} value={search} onChange={(e) => setSearch(e.target.value)} className="mb-4" />
        <DataTable columns={columns} data={entries as any[]} loading={loading} getId={(e: any) => e.id} />
      </Card>
    </div>
  );
}
