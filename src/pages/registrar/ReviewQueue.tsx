import { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { applicationService, programs } from '@/mocks/services';
import type { Application, ApplicationFilters } from '@/types';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import DataTable from '@/components/shared/DataTable';
import type { Column } from '@/components/shared/DataTable';
import StatusBadge from '@/components/shared/StatusBadge';
import ConfirmDialog from '@/components/shared/ConfirmDialog';
import RejectReasonModal from '@/components/modals/RejectReasonModal';
import { useToast } from '@/components/ui/Toast';
import DashboardHero from '@/components/shared/DashboardHero';

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
    addToast(t('registrar.review.approved', 'Application approved and candidate matriculated.'), 'success');
    fetchData();
  };

  const handleReject = async () => {
    if (!rejectTarget || !rejectReason.trim()) return;
    await applicationService.rejectApplication(rejectTarget, { reason: rejectReason });
    addToast(t('registrar.review.rejected', 'Correction notice sent to applicant.'), 'success');
    setRejectOpen(false);
    setRejectReason('');
    fetchData();
  };

  const handleBulkApprove = async () => {
    await applicationService.bulkApprove(selectedIds);
    addToast(`${selectedIds.length} applications approved in batch.`, 'success');
    setSelectedIds([]);
    setBulkConfirmOpen(false);
    fetchData();
  };

  const columns: Column<Application>[] = [
    {
      key: 'name',
      header: 'Applicant Legal Name',
      render: (a) => (
        <div>
          <span className="font-bold text-[#00486E] block">{a.personalInfo.firstName} {a.personalInfo.lastName}</span>
          <span className="text-[10px] text-gray-400 font-mono">ID: {a.id}</span>
        </div>
      ),
    },
    {
      key: 'campus',
      header: 'Campus Choice',
      render: (a) => (
        <span className="capitalize font-semibold text-gray-700">
          {a.programInfo.campusId === 'main' ? 'Nekemte Main' : a.programInfo.campusId}
        </span>
      ),
    },
    {
      key: 'program',
      header: 'Degree Program',
      render: (a) => (
        <span className="text-xs font-medium text-[#0073AA]">
          {programs.find((p: { id: string }) => p.id === a.programInfo.programId)?.name || a.programInfo.programId}
        </span>
      ),
    },
    {
      key: 'type',
      header: 'Study Modality',
      render: (a) => (
        <span className="capitalize text-xs font-bold text-gray-600">
          {a.programInfo.admissionType}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (a) => <StatusBadge status={a.status} />,
    },
    {
      key: 'date',
      header: 'Submitted Date',
      render: (a) => (
        <span className="text-xs font-mono text-gray-500">
          {new Date(a.createdAt).toLocaleDateString()}
        </span>
      ),
      sortable: true,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (a) => (
        <div className="flex items-center gap-1.5">
          {a.status === 'submitted' && (
            <>
              <button
                onClick={() => handleApprove(a.id)}
                className="bg-[#0073AA] hover:bg-[#005C8A] text-white text-[11px] font-bold px-2.5 py-1 rounded transition-colors shadow-2xs"
              >
                Approve
              </button>
              <button
                onClick={() => { setRejectTarget(a.id); setRejectOpen(true); }}
                className="bg-[#D9251D] hover:bg-[#B71C1C] text-white text-[11px] font-bold px-2.5 py-1 rounded transition-colors shadow-2xs"
              >
                Notice
              </button>
            </>
          )}
          <button
            onClick={() => navigate(`/registrar/queue/${a.id}`)}
            className="border border-gray-300 hover:border-gray-400 text-gray-700 text-[11px] font-semibold px-2 py-1 rounded transition-colors"
          >
            Inspect
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* ─── Hero ─── */}
      <DashboardHero
        badge="FRESHMEN CREDENTIALS AUDIT"
        title={t('registrar.queue.title', 'Freshmen Application Verification Queue')}
        description="Review Grade 12 educational assessment records, verify passport photographs, issue formal approvals, or send correction notices to candidates."
        stats={[
          { label: 'Total in Queue', value: total, highlight: true },
          { label: 'Batch Selected', value: selectedIds.length },
          { label: 'Page', value: page },
        ]}
        actions={
          selectedIds.length > 0 ? (
            <button
              onClick={() => setBulkConfirmOpen(true)}
              className="bg-[#10B981] hover:bg-[#059669] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded shadow transition-all flex items-center gap-1.5"
            >
              <span>Batch Approve Selected ({selectedIds.length})</span>
              <span>✓</span>
            </button>
          ) : undefined
        }
      />

      <Card>
        <div className="p-4 bg-[#FAFBFD] rounded-sm border border-gray-200 mb-6">
          <span className="text-xs font-bold text-[#00486E] uppercase tracking-wider block mb-3">
            QUEUE SEARCH & MULTI-CAMPUS FILTERS
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <Select
              label="Filter Campus"
              value={filters.campusId || ''}
              onChange={(e) => { setFilters({ ...filters, campusId: (e.target.value as any) || undefined }); setPage(1); }}
              options={[{ value: '', label: 'All Campuses (3)' }, { value: 'main', label: 'Nekemte Main' }, { value: 'shambu', label: 'Shambu' }, { value: 'gimbi', label: 'Gimbi' }]}
            />
            <Select
              label="Review Status"
              value={filters.status || ''}
              onChange={(e) => { setFilters({ ...filters, status: (e.target.value as any) || undefined }); setPage(1); }}
              options={[{ value: '', label: 'All Statuses' }, { value: 'submitted', label: 'Submitted' }, { value: 'under_review', label: 'Under Review' }, { value: 'approved', label: 'Approved' }, { value: 'rejected', label: 'Notice Issued' }]}
            />
            <Select
              label="Study Modality"
              value={filters.admissionType || ''}
              onChange={(e) => { setFilters({ ...filters, admissionType: (e.target.value as any) || undefined }); setPage(1); }}
              options={[{ value: '', label: 'All Streams' }, { value: 'regular', label: 'Regular Undergrad' }, { value: 'weekend', label: 'Weekend' }, { value: 'night', label: 'Night' }]}
            />
            <Input
              label="Search Candidate"
              placeholder="Name or ID reference..."
              value={filters.search || ''}
              onChange={(e) => { setFilters({ ...filters, search: e.target.value }); setPage(1); }}
            />
          </div>
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
        title={t('registrar.review.reject', 'Issue Application Correction Notice')}
      />

      {/* Bulk Approve Confirm */}
      <ConfirmDialog
        open={bulkConfirmOpen}
        onClose={() => setBulkConfirmOpen(false)}
        onConfirm={handleBulkApprove}
        title={t('registrar.queue.bulkApprove', 'Bulk Matriculation Endorsement')}
        message={t('registrar.queue.bulkApproveConfirm', { count: selectedIds.length })}
        confirmLabel="Approve All Selected"
        variant="primary"
      />
    </div>
  );
}
