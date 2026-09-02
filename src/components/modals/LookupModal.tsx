import { useState } from 'react';
import { publicService } from '@/mocks/services';
import type { LookupResult } from '@/types';
import Dialog from '@/components/ui/Dialog';
import StatusBadge from '@/components/shared/StatusBadge';

interface LookupModalProps {
  open: boolean;
  onClose: () => void;
}

export default function LookupModal({ open, onClose }: LookupModalProps) {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<LookupResult | null>(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    try {
      const r = await publicService.lookupStudent(query);
      setResult(r);
      setSearched(true);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setQuery('');
    setResult(null);
    setSearched(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} title="Instant Admission Verification" maxWidth="md">
      <div className="space-y-4">
        <p className="text-xs sm:text-sm text-gray-600">
          Enter your full student name, entrance exam reference, or application ID to check your current registration & campus placement status.
        </p>

        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. Alemayehu Bezabeh or stu-001"
            className="flex-1 px-3.5 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0073AA] focus:border-[#0073AA]"
            autoFocus
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-[#0073AA] hover:bg-[#005C8A] text-white font-bold px-4 py-2.5 rounded-md text-sm transition-colors shrink-0 disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Verify ↗'}
          </button>
        </form>

        {searched && (
          <div className="pt-2">
            {result?.found && result.student ? (
              <div className="bg-[#EBF3F8] border border-[#A9CBEF] rounded-md p-4 text-sm space-y-3">
                <div className="flex items-center justify-between border-b border-[#A9CBEF]/60 pb-2">
                  <span className="font-bold text-[#00486E] text-base">{result.student.name}</span>
                  <StatusBadge status={result.student.status} />
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-500 block">Assigned Campus</span>
                    <span className="font-bold text-gray-800 capitalize">{result.student.campus} Campus</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Degree Program</span>
                    <span className="font-bold text-gray-800">{result.student.program}</span>
                  </div>
                  {result.student.section && (
                    <div className="col-span-2 pt-1 border-t border-[#A9CBEF]/40">
                      <span className="text-gray-500 block">Class Section / Cohort</span>
                      <span className="font-bold text-[#0073AA]">{result.student.section}</span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-red-50 border border-red-200 text-[#D9251D] text-xs sm:text-sm p-3.5 rounded-md">
                No matching student application found for "{query}". Please verify your name or contact the registrar's office.
              </div>
            )}
          </div>
        )}

        <div className="pt-2 flex items-center justify-between text-xs text-gray-400 border-t border-gray-100">
          <span>Official Wollega University Verification Records</span>
          <button type="button" onClick={handleClose} className="hover:text-gray-600 font-medium">
            Close
          </button>
        </div>
      </div>
    </Dialog>
  );
}
