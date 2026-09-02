import { useState } from 'react';
import LookupModal from '@/components/modals/LookupModal';

interface FloatingActionsProps {
  onOpenLookup?: () => void;
}

export default function FloatingActions({ onOpenLookup }: FloatingActionsProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => {
    if (onOpenLookup) {
      onOpenLookup();
    } else {
      setModalOpen(true);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <button
          type="button"
          onClick={handleOpen}
          className="w-12 h-12 bg-[#D9251D] hover:bg-[#B71C1C] text-white rounded-full shadow-lg flex items-center justify-center text-xl transition-transform hover:scale-110 relative"
          title="Instant Admission Status Lookup"
          aria-label="Verify Admission Status"
        >
          🔍
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-ping" />
        </button>

        <a
          href="mailto:support@wu.edu.et"
          className="w-12 h-12 bg-[#0073AA] hover:bg-[#005C8A] text-white rounded-full shadow-lg flex items-center justify-center text-xl transition-transform hover:scale-110"
          title="Student Helpdesk & Support"
          aria-label="Contact Support"
        >
          💬
        </a>
      </div>

      <LookupModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
