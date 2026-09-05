import { useState } from 'react';
import { Link } from 'react-router-dom';

const calendarEvents = [
  {
    id: 1,
    semester: 'sem1',
    category: 'UNDERGRADUATE REGULAR',
    title: 'Freshman Student Arrival, Dormitory Allocation & Online Registration',
    dateBadge: { month: 'OCT', day: '05 - 08', year: '2026' },
    dates: 'October 05 – October 08, 2026',
    status: 'Open',
    statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    description:
      'All newly placed regular freshmen report to designated campuses (Nekemte, Shambu, Gimbi). Verification of Grade 12 certificates and digital student ID card issuance.',
    location: 'All Campuses (Main, Shambu, Gimbi)',
  },
  {
    id: 2,
    semester: 'sem1',
    category: 'SENIOR STUDENTS',
    title: 'Senior Undergraduate Students Re-registration & Class Enrollment',
    dateBadge: { month: 'OCT', day: '12 - 14', year: '2026' },
    dates: 'October 12 – October 14, 2026',
    status: 'Upcoming',
    statusColor: 'bg-blue-100 text-blue-800 border-blue-300',
    description:
      'Year II through Year V students register online for Semester I modules. Department advisors approve course selections via the portal.',
    location: 'Online Self-Service Portal',
  },
  {
    id: 3,
    semester: 'sem1',
    category: 'ALL STUDENTS',
    title: 'Official Commencement of Semester I Lectures & Laboratory Sessions',
    dateBadge: { month: 'OCT', day: '19', year: '2026' },
    dates: 'Monday, October 19, 2026',
    status: 'Upcoming',
    statusColor: 'bg-blue-100 text-blue-800 border-blue-300',
    description:
      'Lectures begin across all colleges. Course outline distribution and attendance registration.',
    location: 'University-wide',
  },
  {
    id: 4,
    semester: 'sem1',
    category: 'CONTINUING EDUCATION',
    title: 'Weekend & Evening Program Registration and Class Kickoff',
    dateBadge: { month: 'NOV', day: '02 - 06', year: '2026' },
    dates: 'November 02 – November 06, 2026',
    status: 'Upcoming',
    statusColor: 'bg-amber-100 text-amber-800 border-amber-300',
    description:
      'Admissions for continuing education programs at Nekemte and Gimbi branch campuses.',
    location: 'Nekemte & Gimbi Campuses',
  },
  {
    id: 5,
    semester: 'sem1',
    category: 'EXAMINATIONS',
    title: 'Mid-Semester Examinations & Continuous Assessment Submission',
    dateBadge: { month: 'DEC', day: '14 - 19', year: '2026' },
    dates: 'December 14 – December 19, 2026',
    status: 'Scheduled',
    statusColor: 'bg-purple-100 text-purple-800 border-purple-300',
    description:
      'Mid-term evaluations for undergraduate and postgraduate modules across all departments.',
    location: 'Examination Halls',
  },
  {
    id: 6,
    semester: 'sem2',
    category: 'SEMESTER II',
    title: 'Semester II Registration & Course Add/Drop Period',
    dateBadge: { month: 'FEB', day: '22 - 26', year: '2027' },
    dates: 'February 22 – February 26, 2027',
    status: 'Scheduled',
    statusColor: 'bg-purple-100 text-purple-800 border-purple-300',
    description:
      'Commencement of second semester registration, clearance of first semester grades, and module adjustments.',
    location: 'Online Portal',
  },
  {
    id: 7,
    semester: 'summer',
    category: 'KIREMT & DISTANCE',
    title: 'Summer Kiremt Teacher Training & Distance Admissions',
    dateBadge: { month: 'JUL', day: '01 - 10', year: '2027' },
    dates: 'July 01 – July 10, 2027',
    status: 'Scheduled',
    statusColor: 'bg-purple-100 text-purple-800 border-purple-300',
    description:
      'Summer session enrollment for educational leadership, diploma upgrading, and distance programs.',
    location: 'All Campuses',
  },
];

export default function CalendarPage() {
  const [filter, setFilter] = useState('all');

  const filteredEvents =
    filter === 'all'
      ? calendarEvents
      : calendarEvents.filter((e) => e.semester === filter);

  return (
    <div className="bg-[#F8F9FA] text-[#1A1A1A] font-sans pb-24">
      {/* ─── AAU Navy Hero Banner ─── */}
      <section className="relative bg-[#00486E] text-white py-16 px-4 sm:px-6 lg:px-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1600&q=80"
            alt="Academic Calendar"
            className="w-full h-full object-cover object-center opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#002B40] via-[#00486E]/95 to-[#00486E]/90" />
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, #FFFFFF 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-gray-300 mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#66C2FF]">Academic Calendar</span>
          </div>

          <div className="inline-flex items-center gap-2 bg-[#002B40] text-gray-200 border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span>Academic Year 2026/2027 Approved by University Senate</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight">
            Official Academic Calendar & Key Dates
          </h1>
          <p className="text-sm sm:text-base text-gray-200 mt-3 max-w-3xl mx-auto leading-relaxed">
            Important dates for student arrival, online self-registration, lecture schedules, exam periods, and graduation ceremonies across all study modalities.
          </p>
        </div>
      </section>

      {/* ─── Filter Tabs ─── */}
      <section className="bg-white border-b border-gray-200 sticky top-20 z-30 shadow-xs">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-center gap-2 overflow-x-auto py-3">
            {[
              { id: 'all', label: 'All Dates (7)' },
              { id: 'sem1', label: 'Semester I (Fall 2026)' },
              { id: 'sem2', label: 'Semester II (Spring 2027)' },
              { id: 'summer', label: 'Summer Kiremt 2027' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  filter === tab.id
                    ? 'bg-[#0073AA] text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Calendar Timeline ─── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 space-y-4">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="bg-white border border-gray-200 hover:border-[#0073AA] rounded-sm p-6 shadow-sm transition-all flex flex-col md:flex-row items-start md:items-center gap-6 group"
          >
            {/* Date Badge */}
            <div className="w-24 h-24 rounded bg-[#EBF3F8] border border-[#B8D7EB] text-center flex flex-col justify-center items-center shrink-0 group-hover:bg-[#00486E] transition-colors">
              <span className="text-xs font-black uppercase text-[#0073AA] group-hover:text-[#66C2FF]">
                {event.dateBadge.month}
              </span>
              <span className="text-xl font-extrabold text-[#00486E] group-hover:text-white leading-tight">
                {event.dateBadge.day}
              </span>
              <span className="text-[10px] font-mono text-gray-500 group-hover:text-gray-300">
                {event.dateBadge.year}
              </span>
            </div>

            {/* Event Details */}
            <div className="flex-1 space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#D9251D]">
                  {event.category}
                </span>
                <span className="text-gray-300">•</span>
                <span className="text-xs text-gray-500 font-semibold">{event.dates}</span>
              </div>

              <h3 className="text-lg font-bold text-[#00486E] group-hover:text-[#0073AA] transition-colors">
                {event.title}
              </h3>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {event.description}
              </p>

              <div className="text-xs text-gray-500 flex items-center gap-1.5 pt-1">
                <span>📍</span>
                <span>{event.location}</span>
              </div>
            </div>

            {/* Status Pill */}
            <div className="shrink-0 pt-2 md:pt-0">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${event.statusColor}`}>
                {event.status}
              </span>
            </div>
          </div>
        ))}

        {/* Bottom Senate Circular Download Card */}
        <div className="bg-[#002B40] text-white p-8 rounded-sm shadow-md mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 border-l-4 border-[#D9251D]">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#00A3E0] block mb-1">
              OFFICIAL SENATE DOCUMENT
            </span>
            <h4 className="text-xl font-bold font-heading">
              Download Full Academic Calendar Circular (PDF)
            </h4>
            <p className="text-xs text-gray-300 mt-1">
              Includes full semester schedules, national holidays, drop/add deadlines, and Senate graduation sessions.
            </p>
          </div>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert('Wollega University Academic Calendar 2026/2027 PDF downloaded.');
            }}
            className="bg-[#0073AA] hover:bg-[#005C8A] text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded shadow transition-all shrink-0 flex items-center gap-2"
          >
            <span>Download Calendar PDF</span>
            <span>⬇</span>
          </a>
        </div>
      </div>
    </div>
  );
}
