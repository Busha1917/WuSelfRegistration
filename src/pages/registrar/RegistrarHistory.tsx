import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { adminService } from '@/mocks/services';
import type { AuditLogEntry } from '@/types';
import DashboardHero from '@/components/shared/DashboardHero';

export default function RegistrarHistory() {
  const { t } = useTranslation();
  const [entries, setEntries] = useState<AuditLogEntry[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    adminService.getAuditLog({ search }).then((data) => {
      setEntries(data.filter((e) => ['approve_application', 'reject_application', 'verify_document'].includes(e.action)));
      setLoading(false);
    });
  }, [search]);

  const actionBadges: Record<string, { bg: string; label: string }> = {
    approve_application: { bg: 'bg-emerald-100 text-emerald-800 border-emerald-300', label: 'Approved' },
    reject_application: { bg: 'bg-red-100 text-red-800 border-red-300', label: 'Notice Issued' },
    verify_document: { bg: 'bg-blue-100 text-blue-800 border-blue-300', label: 'Verified Scan' },
  };

  return (
    <div className="space-y-6">
      {/* ─── Hero ─── */}
      <DashboardHero
        badge="REGISTRAR ADMISSION AUDIT LOG"
        title={t('registrar.history.title', 'Registrar Decision History & Audit Trail')}
        description="Chronological evidentiary record of all registrar approvals, document verifications, applicant query rejections, and timestamped enrollment endorsements."
        stats={[
          { label: 'Logged Actions', value: entries.length || '34' },
          { label: 'Integrity', value: 'Immutable', highlight: true },
          { label: 'Current Session', value: 'Active' },
        ]}
      />

      <div className="bg-white border border-gray-200 rounded-sm p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
          <div>
            <span className="text-xs font-bold text-[#0073AA] uppercase tracking-wider block">
              SEARCH AUDIT RECORDS
            </span>
            <h3 className="text-base font-bold font-heading text-[#00486E]">
              Filter Decisions by Officer or Student ID
            </h3>
          </div>

          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search candidate, action, or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#0073AA]"
            />
            <span className="absolute left-3 top-2.5 text-gray-400 text-xs">🔍</span>
          </div>
        </div>

        {/* Audit Log Table */}
        <div className="overflow-x-auto border border-gray-200 rounded-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#00486E] text-white uppercase text-[11px] tracking-wider">
              <tr>
                <th className="p-3.5">Review Officer</th>
                <th className="p-3.5">Action Executed</th>
                <th className="p-3.5">Target Student Dossier</th>
                <th className="p-3.5">Decision Details</th>
                <th className="p-3.5">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-[#FAFBFD]">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    Loading official audit records...
                  </td>
                </tr>
              ) : entries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    No registrar decision logs matched your filter.
                  </td>
                </tr>
              ) : (
                entries.map((e) => {
                  const badge = actionBadges[e.action] || { bg: 'bg-gray-100 text-gray-700', label: e.action };
                  return (
                    <tr key={e.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-3.5 font-bold text-[#00486E]">{e.userName}</td>
                      <td className="p-3.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${badge.bg}`}>
                          {badge.label}
                        </span>
                      </td>
                      <td className="p-3.5 font-mono text-[#0073AA] font-bold">{e.targetId}</td>
                      <td className="p-3.5 text-gray-600 max-w-xs truncate">{e.details}</td>
                      <td className="p-3.5 text-gray-500 font-mono text-[11px]">
                        {new Date(e.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
