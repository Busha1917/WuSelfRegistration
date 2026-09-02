import Dialog from '@/components/ui/Dialog';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';

interface RejectReasonModalProps {
  open: boolean;
  onClose: () => void;
  reason: string;
  onReasonChange: (reason: string) => void;
  onConfirm: () => void;
  title?: string;
}

export default function RejectReasonModal({
  open,
  onClose,
  reason,
  onReasonChange,
  onConfirm,
  title = 'Reject Application',
}: RejectReasonModalProps) {
  return (
    <Dialog open={open} onClose={onClose} title={title}>
      <Textarea
        label="Reason for Rejection"
        placeholder="Specify the reason (e.g. missing official Grade 12 transcript or unclear photo)..."
        value={reason}
        onChange={(e) => onReasonChange(e.target.value)}
        required
      />
      <div className="flex justify-end gap-2 mt-4">
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="destructive"
          onClick={onConfirm}
          disabled={!reason.trim()}
        >
          Confirm Rejection
        </Button>
      </div>
    </Dialog>
  );
}
