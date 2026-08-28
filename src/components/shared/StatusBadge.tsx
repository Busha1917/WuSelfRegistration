
type Status = 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected' | 'pending' | 'active' | 'inactive' | 'unplaced' | 'placed' | 'published';

const statusConfig: Record<Status, { bg: string; text: string; dot: string; labelKey: string }> = {
  draft: { bg: 'bg-neutral-light', text: 'text-neutral', dot: 'bg-neutral', labelKey: 'Draft' },
  submitted: { bg: 'bg-wu-blue-50', text: 'text-wu-blue-700', dot: 'bg-wu-blue', labelKey: 'Submitted' },
  under_review: { bg: 'bg-wu-gold-50', text: 'text-wu-gold-700', dot: 'bg-wu-gold', labelKey: 'Under Review' },
  approved: { bg: 'bg-success-light', text: 'text-success', dot: 'bg-success', labelKey: 'Approved' },
  rejected: { bg: 'bg-danger-light', text: 'text-danger', dot: 'bg-danger', labelKey: 'Rejected' },
  pending: { bg: 'bg-warning-light', text: 'text-warning', dot: 'bg-warning', labelKey: 'Pending' },
  active: { bg: 'bg-success-light', text: 'text-success', dot: 'bg-success', labelKey: 'Active' },
  inactive: { bg: 'bg-danger-light', text: 'text-danger', dot: 'bg-danger', labelKey: 'Inactive' },
  unplaced: { bg: 'bg-neutral-light', text: 'text-neutral', dot: 'bg-neutral', labelKey: 'Unplaced' },
  placed: { bg: 'bg-success-light', text: 'text-success', dot: 'bg-success', labelKey: 'Placed' },
  published: { bg: 'bg-wu-blue-50', text: 'text-wu-blue-700', dot: 'bg-wu-blue', labelKey: 'Published' },
};

interface StatusBadgeProps {
  status: Status;
  label?: string;
}

export default function StatusBadge({ status, label }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.draft;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {label || config.labelKey}
    </span>
  );
}
