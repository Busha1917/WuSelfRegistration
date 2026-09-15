import { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { semesterService } from '@/mocks/services';
import type { SemesterRegistration, ApplicationFilters } from '@/types';
import Card from '@/components/ui/Card';
import Select from '@/components/ui/Select';
import DataTable from '@/components/shared/DataTable';
import type { Column } from '@/components/shared/DataTable';
import StatusBadge from '@/components/shared/StatusBadge';
import Dialog from '@/components/ui/Dialog';
import Textarea from '@/components/ui/Textarea';
import { useToast } from '@/components/ui/Toast';
import DashboardHero from '@/components/shared/DashboardHero';

export default function SemesterQueue() {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const [data, setData] = useState<SemesterRegistration[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Partial<ApplicationFilters>>({});
  const [rejectOpen, setRejectOpen] = useState(false);
  const [rejectTarget, setRejectTarget] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await semesterService.getRegistrations({ page, pageSize: 10, ...filters } as ApplicationFilters);
    setData(res.data);
    setTotal(res.total);
    setLoading(false);
  }, [page, filters]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleApprove = async (id: string) => {
    await semesterService.approveReRegistration(id);
    addToast('Semester re-registration package endorsed and approved.', 'success');
    fetchData();
  };

  const handleReject = async () => {
    if (!rejectTarget || !rejectReason.trim()) return;
    await semesterService.rejectReRegistration(rejectTarget, rejectReason);
    addToast('Re-registration returned with remarks to academic advisor.', 'success');
    setRejectOpen(false);
    setRejectReason('');
    fetchData();
  };

  const columns: Column<SemesterRegistration>[] = [
    {
      key: 'studentId',
      header: 'Student Identification',
      render: (r) => (
        <div>
          <span className="font-bold text-[#00486E] font-mono block">{r.studentId}</span>
          <span className="text-[10px] text-gray-500 capitalize">{r.campusId === 'main' ? 'Nekemte Main' : r.campusId}</span>
        </div>
      ),
    },
    {
      key: 'semester',
      header: 'Academic Term',
      render: (r) => (
        <span className="text-xs font-bold text-gray-800">
          {r.academicYear} • Sem {r.semester}
        </span>
      ),
    },
    {
      key: 'program',
      header: 'Program Curriculum',
      render: (r) => <span className="text-xs text-[#0073AA] font-medium">{r.programId}</span>,
    },
    {
      key: 'fee',
      header: 'Cost Sharing / Clearance',
      render: (r) => (
        <span className={`inline-flex items-center gap-1 text-[11px] font-bold ${r.feeCleared ? 'text-emerald-700' : 'text-amber-700'}`}>
          <span>{r.feeCleared ? '✓' : '⚠️'}</span>
          <span>{r.feeCleared ? 'Cleared' : 'Pending Finance'}</span>
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Approval Status',
      render: (r) => <StatusBadge status={r.status} />,
    },
    {
      key: 'date',
      header: 'Submission Date',
      render: (r) => (
        <span className="text-xs font-mono text-gray-500">
          {new Date(r.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (r) => (
        <div className="flex items-center gap-1.5">
          {(r.status === 'submitted' || (r.status as string) === 'pending') && (
            <>
              <button
                onClick={() => handleApprove(r.id)}
                className="bg-[#0073AA] hover:bg-[#005C8A] text-white text-[11px] font-bold px-2.5 py-1 rounded transition-colors shadow-2xs"
              >
                Approve
              </button>
              <button
                onClick={() => { setRejectTarget(r.id); setRejectOpen(true); }}
                className="bg-[#D9251D] hover:bg-[#B71C1C] text-white text-[11px] font-bold px-2.5 py-1 rounded transition-colors shadow-2xs"
              >
                Return
              </button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* ─── Hero ─── */}
      <DashboardHero
        badge="SEMESTER RE-REGISTRATION DESK"
        title={t('registrar.semesterQueue.title', 'Continuing Student Enrollment Queue')}
        description="Verify departmental advisor course endorsements, inspect cost-sharing tuition clearances, and finalize semester registration records."
        stats={[
          { label: 'Re-Reg Pending', value: total, highlight: true },
          { label: 'Academic Term', value: 'Fall 2026' },
          { label: 'Clearing Window', value: 'Open' },
        ]}
      />

      <Card>
        <div className="p-4 bg-[#FAFBFD] rounded-sm border border-gray-200 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Select
              label="Campus Filter"
              value={filters.campusId || ''}
              onChange={(e) => { setFilters({ ...filters, campusId: (e.target.value as any) || undefined }); setPage(1); }}
              options={[{ value: '', label: 'All Campuses (3)' }, { value: 'main', label: 'Nekemte Main' }, { value: 'shambu', label: 'Shambu' }, { value: 'gimbi', label: 'Gimbi' }]}
            />
            <Select
              label="Status Filter"
              value={filters.status || ''}
              onChange={(e) => { setFilters({ ...filters, status: (e.target.value as any) || undefined }); setPage(1); }}
              options={[{ value: '', label: 'All Statuses' }, { value: 'pending', label: 'Pending Review' }, { value: 'approved', label: 'Approved' }, { value: 'rejected', label: 'Returned' }]}
            />
          </div>
        </div>

        <DataTable
          columns={columns}
          data={data as any[]}
          total={total}
          page={page}
          pageSize={10}
          onPageChange={setPage}
          getId={(r: any) => r.id}
          loading={loading}
        />
      </Card>

      {/* Return / Reject Dialog */}
      <Dialog open={rejectOpen} onClose={() => setRejectOpen(false)} title="Return Re-Registration Package">
        <div className="space-y-4 pt-2">
          <p className="text-xs text-gray-500">
            Provide specific remarks explaining why this semester registration is being returned (e.g. prerequisite course missing, credit overload, or unpaid cost-sharing fee).
          </p>
          <Textarea
            label="Registrar Directive / Reason"
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            placeholder="Enter reason for returning application..."
            rows={3}
          />
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setRejectOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleReject}
              disabled={!rejectReason.trim()}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#D9251D] hover:bg-[#B71C1C] rounded disabled:opacity-50"
            >
              Return Package
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
