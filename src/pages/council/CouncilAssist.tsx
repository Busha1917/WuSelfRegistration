import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { publicService } from '@/mocks/services';
import type { LookupResult } from '@/types';
import DashboardHero from '@/components/shared/DashboardHero';
import StatusBadge from '@/components/shared/StatusBadge';
import { useToast } from '@/components/ui/Toast';

export default function CouncilAssist() {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const [query, setQuery] = useState('Busha');
  const [result, setResult] = useState<LookupResult | null>(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e?: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const q = customQuery !== undefined ? customQuery : query;
    if (!q.trim()) {
      addToast('Please enter a student name, matriculation ID, or reference number.', 'warning');
      return;
    }
    setLoading(true);
    try {
      const r = await publicService.lookupStudent(q);
      setResult(r);
      setSearched(true);
      if (r.found) {
        addToast(`Found candidate record for ${r.student?.name}`, 'success');
      } else {
        addToast('No student record matched your query.', 'error');
      }
    } catch {
      addToast('Search error occurred. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handlePrintSlip = () => {
    addToast('Printing Student Campus Orientation & Placement Direction Slip...', 'info');
    setTimeout(() => {
      addToast('Direction Slip printed successfully.', 'success');
    }, 1000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* ─── Hero ─── */}
      <DashboardHero
        badge="Wallaga UNIVERSITY STUDENT UNION (WU-SU) • PEER ADVOCACY & HELP DESK"
        title={t('council.assist.title', 'Student Support & Placement Assistance Center')}
        description="Official peer-support portal operated by the Student Representative Council across Nekemte, Shambu, and Gimbi campuses. Assist freshmen and continuing candidates in locating their academic sections, dormitories, and orientation schedules."
        stats={[
          { label: 'Campus Help Desks', value: 'Nekemte • Shambu • Gimbi' },
          { label: 'Freshmen Assisted', value: '340+ Candidates', highlight: true },
          { label: 'Union Emergency Line', value: '+251-571-11-04-00' },
        ]}
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => addToast('Freshman Campus Navigation Guide (PDF) downloaded.', 'info')}
              className="bg-[#0073AA] hover:bg-[#005B88] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded shadow-sm transition-all flex items-center gap-1.5"
            >
              <span>Download Orientation Guide</span>
              <span>📘</span>
            </button>
            <button
              onClick={() => addToast('Council accommodation assistance form opened.', 'info')}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded transition-all flex items-center gap-1.5"
            >
              <span>Log Welfare Inquiry</span>
              <span>📝</span>
            </button>
          </div>
        }
      />

      {/* ─── Fast Search Console ─── */}
      <div className="bg-white rounded-sm border border-gray-200 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div>
            <h3 className="text-sm font-black text-[#00486E] uppercase tracking-wider">
              Student Registration Lookup
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Enter candidate full name, national entrance exam number, or institutional ID
            </p>
          </div>
          <span className="text-xs font-bold text-[#0073AA] bg-blue-50 px-2.5 py-1 rounded">
            Live Central Registrar Link
          </span>
        </div>

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder={t('council.assist.searchPlaceholder', 'e.g. Busha Tolessa, WU/10492/16, or 485901...')}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-4 py-3 text-sm rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00486E] focus:border-transparent font-medium"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm"
              >
                ✕
              </button>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-[#00486E] hover:bg-[#003652] text-white text-xs font-black uppercase tracking-wider px-8 py-3 rounded shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{loading ? 'Searching...' : t('council.assist.search', 'Find Student')}</span>
            <span>🔍</span>
          </button>
        </form>

        {/* Quick Suggestion Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">
            Quick Queries:
          </span>
          {['Busha Tolessa', 'Chaltu Dibaba', 'Tolera Bekele', 'WU/10492/16'].map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => {
                setQuery(name);
                handleSearch(undefined, name);
              }}
              className="bg-gray-100 hover:bg-blue-50 text-gray-700 hover:text-[#00486E] border border-gray-200 px-2.5 py-1 rounded text-xs transition-colors"
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Search Result Display ─── */}
      {searched && (
        <div>
          {result?.found && result.student ? (
            <div className="bg-white rounded-sm border border-green-300 shadow-sm overflow-hidden border-t-4 border-t-green-600">
              <div className="bg-green-50/80 px-6 py-4 border-b border-green-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-600"></span>
                  <h3 className="text-sm font-black text-green-900 uppercase tracking-wider">
                    {t('council.assist.found', 'Matriculated Candidate Record Found')}
                  </h3>
                </div>
                <StatusBadge status={result.student.status} />
              </div>

              <div className="p-6 space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-gray-100">
                  <div className="w-16 h-16 rounded bg-[#002B40] text-white flex items-center justify-center text-xl font-black shadow-xs">
                    {result.student.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xl font-black text-[#00486E]">{result.student.name}</h4>
                    <p className="text-xs text-gray-500 font-medium">
                      Student ID: <span className="font-mono font-bold text-[#0073AA]">{(result.student as any).id || 'WU/10492/16'}</span> •
                      Campus: <span className="font-bold text-gray-700 capitalize">{result.student.campus} Campus</span>
                    </p>
                  </div>
                </div>

                {/* Information Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-[#F8F9FA] p-4 rounded border border-gray-200">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                      Enrolled Academic Program
                    </span>
                    <p className="text-sm font-black text-[#00486E] mt-1">{result.student.program}</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">Faculty of Science & Tech</p>
                  </div>

                  <div className="bg-[#F8F9FA] p-4 rounded border border-gray-200">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                      Lecture Hall Section
                    </span>
                    <p className="text-sm font-black text-green-700 mt-1">
                      {result.student.section || 'Section CS-01'}
                    </p>
                    <p className="text-[11px] text-gray-500 mt-0.5">LH-204 (ICT Building)</p>
                  </div>

                  <div className="bg-[#F8F9FA] p-4 rounded border border-gray-200">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                      Residential Hall (Dorm)
                    </span>
                    <p className="text-sm font-black text-[#0073AA] mt-1">Block 14 • Room 208</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">Bed #02 (East Wing)</p>
                  </div>

                  <div className="bg-[#F8F9FA] p-4 rounded border border-gray-200">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                      Meal & Cafeteria Card
                    </span>
                    <p className="text-sm font-black text-[#D9251D] mt-1">Cafeteria Hall A</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">Biometric Meal Pass Active</p>
                  </div>
                </div>

                {/* Actions Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500">
                    Need directions or dorm assistance? Council volunteers are stationed at Block 14.
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrintSlip}
                      className="bg-[#00486E] hover:bg-[#003652] text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded shadow-xs transition-all flex items-center gap-1.5"
                    >
                      <span>Print Direction Slip</span>
                      <span>🖨️</span>
                    </button>
                    <button
                      onClick={() => addToast('SMS with lecture room and dorm directions dispatched.', 'success')}
                      className="bg-[#0073AA] hover:bg-[#005B88] text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded shadow-xs transition-all flex items-center gap-1.5"
                    >
                      <span>Send SMS Guide</span>
                      <span>📱</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-xl mx-auto mb-2">
                ⚠️
              </div>
              <h4 className="text-sm font-black text-red-900">
                {t('council.assist.notFound', 'Candidate Record Not Found')}
              </h4>
              <p className="text-xs text-red-700 mt-1 max-w-md mx-auto">
                No active registration was found for "{query}". Please verify that the name matches their Grade 12 national exam certificate or advise the student to consult the Registrar Helpdesk in the Main Administration Building.
              </p>
              <button
                onClick={() => addToast('Escalated to Registrar Desk supervisor.', 'info')}
                className="mt-4 bg-red-700 hover:bg-red-800 text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded transition-all"
              >
                Escalate to Registrar On-Duty Desk
              </button>
            </div>
          )}
        </div>
      )}

      {/* ─── Council Peer Support Quick Desk Services ─── */}
      <div className="bg-white rounded-sm border border-gray-200 shadow-xs p-6 space-y-4">
        <h3 className="text-sm font-black text-[#00486E] uppercase tracking-wider">
          Student Union Direct Assistance Services
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: 'Dormitory Check-In Support',
              desc: 'Stationed at Nekemte, Shambu, and Gimbi halls to assist with mattress issuance and keys.',
              badge: 'Campus Life',
              icon: '🏠',
            },
            {
              title: 'Cafeteria Biometric Card',
              desc: 'Troubleshoot finger-scan issues and cafeteria meal shifts at the central dining hall.',
              badge: 'Dining Services',
              icon: '🍽️',
            },
            {
              title: 'Lecture Hall Timetables',
              desc: 'Find your assigned classroom block, laboratory location, and professor schedules.',
              badge: 'Academic Help',
              icon: '📅',
            },
            {
              title: 'Special Needs & Advocacy',
              desc: 'Dedicated peer guidance for candidates requiring physical mobility or accessibility aid.',
              badge: 'Welfare & Equity',
              icon: '🤝',
            },
          ].map((srv, idx) => (
            <div
              key={idx}
              className="p-4 rounded border border-gray-200 bg-[#F8F9FA] hover:bg-white hover:border-[#00486E] transition-all space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{srv.icon}</span>
                <span className="text-[10px] font-bold bg-blue-50 text-[#0073AA] px-2 py-0.5 rounded uppercase">
                  {srv.badge}
                </span>
              </div>
              <h4 className="text-xs font-black text-[#00486E]">{srv.title}</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed">{srv.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
