import { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { semesterService } from '@/mocks/services';
import type { SemesterRegistration, ApplicationFilters } from '@/types';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import DataTable from '@/components/shared/DataTable';
import type { Column } from '@/components/shared/DataTable';
import StatusBadge from '@/components/shared/StatusBadge';
import Dialog from '@/components/ui/Dialog';
import Textarea from '@/components/ui/Textarea';
import { useToast } from '@/components/ui/Toast';

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
    addToast('Approved', 'success');
    fetchData();
  };

  const handleReject = async () => {
    if (!rejectTarget || !rejectReason.trim()) return;
    await semesterService.rejectReRegistration(rejectTarget, rejectReason);
    addToast('Rejected', 'success');
    setRejectOpen(false);
    setRejectReason('');
    fetchData();
  };

  const columns: Column<SemesterRegistration>[] = [
    { key: 'studentId', header: 'Student ID', render: (r) => r.studentId },
    { key: 'semester', header: 'Semester', render: (r) => `${r.academicYear} Sem ${r.semester}` },
    { key: 'program', header: 'Program', render: (r) => r.programId },
    { key: 'campus', header: 'Campus', render: (r) => r.campusId },
    { key: 'fee', header: 'Fee Cleared', render: (r) => r.feeCleared ? <span className="text-success">Yes</span> : <span className="text-danger">No</span> },
    { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'date', header: 'Date', render: (r) => new Date(r.createdAt).toLocaleDateString() },
    {
      key: 'actions', header: 'Actions', render: (r) => (
        <div className="flex gap-1">
          {r.status === 'submitted' && (
            <>
              <Button size="sm" onClick={() => handleApprove(r.id)}>Approve</Button>
              <Button size="sm" variant="destructive" onClick={() => { setRejectTarget(r.id); setRejectOpen(true); }}>Reject</Button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold text-wu-ink">{t('registrar.queue.semesterTitle')}</h1>
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <Select label="Campus" value={filters.campusId || ''} onChange={(e) => { setFilters({ ...filters, campusId: e.target.value as any || undefined }); setPage(1); }}
            options={[{ value: '', label: 'All' }, { value: 'main', label: 'Main' }, { value: 'shambu', label: 'Shambu' }, { value: 'gimbi', label: 'Gimbi' }]} />
          <Select label="Status" value={filters.status || ''} onChange={(e) => { setFilters({ ...filters, status: e.target.value as any || undefined }); setPage(1); }}
            options={[{ value: '', label: 'All' }, { value: 'submitted', label: 'Submitted' }, { value: 'approved', label: 'Approved' }, { value: 'rejected', label: 'Rejected' }]} />
        </div>
        <DataTable columns={columns} data={data as any[]} total={total} page={page} pageSize={10} onPageChange={setPage} loading={loading} getId={(r: any) => r.id} />
      </Card>

      <Dialog open={rejectOpen} onClose={() => setRejectOpen(false)} title="Reject Re-registration">
        <Textarea label="Reason" value={rejectReason} onChange={(e) => setRejectReason(e.target.value)} required />
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="ghost" onClick={() => setRejectOpen(false)}>Cancel</Button>
          <Button variant="destructive" onClick={handleReject}>Reject</Button>
        </div>
      </Dialog>
    </div>
  );
}
