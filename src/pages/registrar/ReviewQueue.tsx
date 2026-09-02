import { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { applicationService, programs } from '@/mocks/services';
import type { Application, ApplicationFilters } from '@/types';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import DataTable from '@/components/shared/DataTable';
import type { Column } from '@/components/shared/DataTable';
import StatusBadge from '@/components/shared/StatusBadge';
import ConfirmDialog from '@/components/shared/ConfirmDialog';
import RejectReasonModal from '@/components/modals/RejectReasonModal';
import { useToast } from '@/components/ui/Toast';

export default function ReviewQueue() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [applications, setApplications] = useState<Application[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [filters, setFilters] = useState<Partial<ApplicationFilters>>({});
  const [rejectOpen, setRejectOpen] = useState(false);
  const [rejectTarget, setRejectTarget] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [bulkConfirmOpen, setBulkConfirmOpen] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await applicationService.getApplications({ page, pageSize: 10, ...filters } as ApplicationFilters);
    setApplications(res.data);
    setTotal(res.total);
    setLoading(false);
  }, [page, filters]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleApprove = async (id: string) => {
    await applicationService.approveApplication(id);
    addToast(t('registrar.review.approved'), 'success');
    fetchData();
  };

  const handleReject = async () => {
    if (!rejectTarget || !rejectReason.trim()) return;
    await applicationService.rejectApplication(rejectTarget, { reason: rejectReason });
    addToast(t('registrar.review.rejected'), 'success');
    setRejectOpen(false);
    setRejectReason('');
    fetchData();
  };

  const handleBulkApprove = async () => {
    await applicationService.bulkApprove(selectedIds);
    addToast(`${selectedIds.length} applications approved`, 'success');
    setSelectedIds([]);
    setBulkConfirmOpen(false);
    fetchData();
  };

  const columns: Column<Application>[] = [
    { key: 'name', header: 'Name', render: (a) => `${a.personalInfo.firstName} ${a.personalInfo.lastName}` },
    { key: 'campus', header: 'Campus', render: (a) => a.programInfo.campusId },
    { key: 'program', header: 'Program', render: (a) => programs.find((p: { id: string }) => p.id === a.programInfo.programId)?.name || a.programInfo.programId },
    { key: 'type', header: 'Type', render: (a) => a.programInfo.admissionType },
    { key: 'status', header: 'Status', render: (a) => <StatusBadge status={a.status} /> },
    { key: 'date', header: 'Date', render: (a) => new Date(a.createdAt).toLocaleDateString(), sortable: true },
    {
      key: 'actions', header: 'Actions', render: (a) => (
        <div className="flex gap-1">
          {a.status === 'submitted' && (
            <>
              <Button size="sm" onClick={() => handleApprove(a.id)}>Approve</Button>
              <Button size="sm" variant="destructive" onClick={() => { setRejectTarget(a.id); setRejectOpen(true); }}>Reject</Button>
            </>
          )}
          <Button size="sm" variant="ghost" onClick={() => navigate(`/registrar/queue/${a.id}`)}>View</Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-wu-ink">{t('registrar.queue.title')}</h1>
        {selectedIds.length > 0 && (
          <Button variant="secondary" onClick={() => setBulkConfirmOpen(true)}>
            {t('registrar.queue.bulkApprove')} ({selectedIds.length})
          </Button>
        )}
      </div>

      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-4">
          <Select label="Campus" value={filters.campusId || ''} onChange={(e) => { setFilters({ ...filters, campusId: e.target.value as any || undefined }); setPage(1); }}
            options={[{ value: '', label: 'All' }, { value: 'main', label: 'Main' }, { value: 'shambu', label: 'Shambu' }, { value: 'gimbi', label: 'Gimbi' }]} />
          <Select label="Status" value={filters.status || ''} onChange={(e) => { setFilters({ ...filters, status: e.target.value as any || undefined }); setPage(1); }}
            options={[{ value: '', label: 'All' }, { value: 'submitted', label: 'Submitted' }, { value: 'under_review', label: 'Under Review' }, { value: 'approved', label: 'Approved' }, { value: 'rejected', label: 'Rejected' }]} />
          <Select label="Admission" value={filters.admissionType || ''} onChange={(e) => { setFilters({ ...filters, admissionType: e.target.value as any || undefined }); setPage(1); }}
            options={[{ value: '', label: 'All' }, { value: 'regular', label: 'Regular' }, { value: 'weekend', label: 'Weekend' }, { value: 'night', label: 'Night' }]} />
          <Input label="Search" placeholder="Search by name or ID..." value={filters.search || ''} onChange={(e) => { setFilters({ ...filters, search: e.target.value }); setPage(1); }} />
        </div>
        <DataTable
          columns={columns}
          data={applications as any[]}
          total={total}
          page={page}
          pageSize={10}
          onPageChange={setPage}
          bulkSelect
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
          getId={(a: any) => a.id}
          loading={loading}
        />
      </Card>

      {/* Reject Reason Modal */}
      <RejectReasonModal
        open={rejectOpen}
        onClose={() => setRejectOpen(false)}
        reason={rejectReason}
        onReasonChange={setRejectReason}
        onConfirm={handleReject}
        title={t('registrar.review.reject')}
      />

      {/* Bulk Approve Confirm */}
      <ConfirmDialog
        open={bulkConfirmOpen}
        onClose={() => setBulkConfirmOpen(false)}
        onConfirm={handleBulkApprove}
        title={t('registrar.queue.bulkApprove')}
        message={t('registrar.queue.bulkApproveConfirm', { count: selectedIds.length })}
        confirmLabel="Approve All"
        variant="primary"
      />
    </div>
  );
}
