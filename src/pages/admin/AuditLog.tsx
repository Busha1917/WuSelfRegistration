import { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { adminService } from '@/mocks/services';
import type { AuditLogEntry } from '@/types';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import DataTable from '@/components/shared/DataTable';
import type { Column } from '@/components/shared/DataTable';

export default function AuditLog() {
  const { t } = useTranslation();
  const [entries, setEntries] = useState<AuditLogEntry[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const data = await adminService.getAuditLog({ search, action: actionFilter || undefined });
    setEntries(data);
    setTotal(data.length);
    setLoading(false);
  }, [search, actionFilter]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const columns: Column<AuditLogEntry>[] = [
    { key: 'user', header: t('admin.auditLog.user'), render: (e) => <div><span className="font-medium">{e.userName}</span><span className="text-xs text-neutral ml-1">({e.userRole})</span></div> },
    { key: 'action', header: t('admin.auditLog.action'), render: (e) => <span className="text-sm">{e.action.replace(/_/g, ' ')}</span> },
    { key: 'target', header: t('admin.auditLog.target'), render: (e) => <span className="text-xs font-mono">{e.targetType}: {e.targetId}</span> },
    { key: 'details', header: 'Details', render: (e) => <span className="text-sm text-neutral">{e.details}</span> },
    { key: 'timestamp', header: t('admin.auditLog.timestamp'), render: (e) => <span className="text-xs">{new Date(e.timestamp).toLocaleString()}</span> },
  ];

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold text-wu-ink">{t('admin.auditLog.title')}</h1>
      <Card>
        <div className="flex gap-3 mb-4">
          <div className="flex-1">
            <Input placeholder={t('admin.auditLog.filter')} value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Select value={actionFilter} onChange={(e) => setActionFilter(e.target.value)}
            options={[{ value: '', label: 'All Actions' }, { value: 'approve_application', label: 'Approve' }, { value: 'reject_application', label: 'Reject' }, { value: 'verify_document', label: 'Verify Doc' }, { value: 'login', label: 'Login' }, { value: 'import_data', label: 'Import' }]} />
        </div>
        <DataTable columns={columns} data={entries as any[]} total={total} page={page} pageSize={15} onPageChange={setPage} loading={loading} getId={(e: any) => e.id} />
      </Card>
    </div>
  );
}
