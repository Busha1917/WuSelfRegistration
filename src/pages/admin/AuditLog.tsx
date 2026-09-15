import { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { adminService } from '@/mocks/services';
import type { AuditLogEntry } from '@/types';
import DashboardHero from '@/components/shared/DashboardHero';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import DataTable from '@/components/shared/DataTable';
import type { Column } from '@/components/shared/DataTable';
import { useToast } from '@/components/ui/Toast';

export default function AuditLog() {
  const { t } = useTranslation();
  const { addToast } = useToast();
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

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getActionBadge = (action: string) => {
    if (action.includes('approve')) {
      return (
        <span className="text-[10px] font-black uppercase tracking-wider bg-green-100 text-green-800 px-2 py-0.5 rounded">
          Approved
        </span>
      );
    }
    if (action.includes('reject')) {
      return (
        <span className="text-[10px] font-black uppercase tracking-wider bg-red-100 text-red-800 px-2 py-0.5 rounded">
          Rejected
        </span>
      );
    }
    if (action.includes('import')) {
      return (
        <span className="text-[10px] font-black uppercase tracking-wider bg-purple-100 text-purple-800 px-2 py-0.5 rounded">
          Data Import
        </span>
      );
    }
    if (action.includes('verify')) {
      return (
        <span className="text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
          Verified
        </span>
      );
    }
    return (
      <span className="text-[10px] font-black uppercase tracking-wider bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
        {action.replace(/_/g, ' ')}
      </span>
    );
  };

  const columns: Column<AuditLogEntry>[] = [
    {
      key: 'user',
      header: t('admin.auditLog.user', 'Authorized Officer'),
      render: (e) => (
        <div>
          <span className="font-bold text-[#00486E] text-xs block">{e.userName}</span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-1.5 py-0.2 rounded inline-block mt-0.5">
            {e.userRole}
          </span>
        </div>
      ),
    },
    {
      key: 'action',
      header: t('admin.auditLog.action', 'Event Type'),
      render: (e) => getActionBadge(e.action),
    },
    {
      key: 'target',
      header: t('admin.auditLog.target', 'Target Entity'),
      render: (e) => (
        <div className="font-mono text-xs">
          <span className="text-gray-500">{e.targetType}: </span>
          <span className="font-bold text-[#0073AA]">{e.targetId}</span>
        </div>
      ),
    },
    {
      key: 'details',
      header: 'Audit Telemetry & Notes',
      render: (e) => <span className="text-xs text-gray-600 leading-tight block">{e.details}</span>,
    },
    {
      key: 'timestamp',
      header: t('admin.auditLog.timestamp', 'Recorded Timestamp'),
      render: (e) => (
        <div className="text-right">
          <span className="font-mono text-xs text-gray-700 block">
            {new Date(e.timestamp).toLocaleDateString()}
          </span>
          <span className="font-mono text-[10px] text-gray-400">
            {new Date(e.timestamp).toLocaleTimeString()}
          </span>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* ─── Hero ─── */}
      <DashboardHero
        badge="Wallaga UNIVERSITY • INFORMATION SECURITY & AUDIT TRAIL"
        title={t('admin.auditLog.title', 'Cryptographic Security & System Audit Trail')}
        description="Immutable system activity ledger recording registrar decisions, user access authentications, student status changes, and MOE data imports in accordance with Ethiopian Higher Education regulatory standards."
        stats={[
          { label: 'Audit Records', value: `${total} Events Logged` },
          { label: 'Tamper Protection', value: 'SHA-256 Verified', highlight: true },
          { label: 'Retention Policy', value: '7 Academic Years' },
        ]}
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => addToast('Official signed audit trail exported (CSV format).', 'success')}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded transition-all flex items-center gap-1.5"
            >
              <span>Export Audit Ledger</span>
              <span>📜</span>
            </button>
            <button
              onClick={() => addToast('System integrity check: All hash chains intact.', 'info')}
              className="bg-[#0073AA] hover:bg-[#005B88] text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded shadow-sm transition-all flex items-center gap-1.5"
            >
              <span>Verify Hashes</span>
              <span>🔒</span>
            </button>
          </div>
        }
      />

      {/* ─── Filter & Search Bar ─── */}
      <div className="bg-white rounded-sm border border-gray-200 shadow-xs p-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2">
            <Input
              placeholder={t('admin.auditLog.filter', 'Search by officer name, candidate ID, or detail...')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            options={[
              { value: '', label: 'All Event Classifications' },
              { value: 'approve_application', label: 'Admissions Approval' },
              { value: 'reject_application', label: 'Correction / Rejection' },
              { value: 'verify_document', label: 'Document Verification' },
              { value: 'login', label: 'User Authentication' },
              { value: 'import_data', label: 'MOE Batch Import' },
            ]}
          />
        </div>
      </div>

      {/* ─── Audit Log DataTable ─── */}
      <div className="bg-white rounded-sm border border-gray-200 shadow-xs overflow-hidden">
        <div className="bg-[#F8F9FA] px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00486E]"></span>
            <h3 className="text-sm font-black text-[#00486E] uppercase tracking-wider">
              System Audit Event Records ({total})
            </h3>
          </div>
          <span className="text-xs font-bold text-gray-500">Live Timestamp Sorting</span>
        </div>

        <DataTable
          columns={columns}
          data={entries as any[]}
          total={total}
          page={page}
          pageSize={12}
          onPageChange={setPage}
          loading={loading}
          getId={(e: any) => e.id}
        />
      </div>
    </div>
  );
}
