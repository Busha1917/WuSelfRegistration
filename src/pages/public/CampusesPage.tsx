import { useState } from 'react';
import { Link } from 'react-router-dom';

const campusDetails = [
  {
    id: 'nekemte',
    name: 'Nekemte Main Campus',
    amharic: 'ነቀምቴ ዋናው ግቢ',
    location: 'Nekemte City, East Wollega, Oromia (310 km west of Addis Ababa)',
    established: 'Established 2007',
    coverImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
    description:
      'The administrative headquarters and largest academic center of Wollega University. Housing major schools of Technology, Health Sciences, Business, Natural Sciences, and Law with extensive modern research laboratories.',
    stats: { programs: '80+ Programs', students: '18,500+ Students', faculty: '850+ Faculty', acres: '150 Hectares' },
    faculties: [
      'College of Engineering & Technology',
      'College of Health & Medical Sciences (Referral Hospital)',
      'College of Business & Economics',
      'College of Natural & Computational Sciences',
      'School of Law & Governance',
    ],
    facilities: [
      'Wollega University Comprehensive Referral Hospital',
      'Central Digital Library & Innovation Hub',
      'University Stadium & Olympic Swimming Complex',
      'High-Performance Data Center with Dedicated Fiber',
      'Postgraduate Research Institute',
    ],
    contact: { phone: '+251-571-11-04-00', email: 'main.campus@wu.edu.et', office: 'Administration Building A, Room 101' },
  },
  {
    id: 'shambu',
    name: 'Shambu Campus',
    amharic: 'ሻምቡ ግቢ',
    location: 'Shambu Town, Horro Guduru Wollega, Oromia (Near Finchaa)',
    established: 'Established 2011',
    coverImage: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
    description:
      'A specialized eco-campus dedicated to agricultural transformation, veterinary medicine, natural resource preservation, and applied computational sciences, situated in the fertile highlands of Horro Guduru.',
    stats: { programs: '25+ Programs', students: '6,000+ Students', faculty: '240+ Faculty', acres: '85 Hectares' },
    faculties: [
      'College of Agriculture & Natural Resource Management',
      'School of Veterinary Medicine',
      'Department of Forestry & Agro-Ecology',
      'Department of Computer Science & IT',
    ],
    facilities: [
      'Agricultural Research & Demonstration Farm (50 Hectares)',
      'Veterinary Teaching Clinic & Animal Hospital',
      'Soil Science & Plant Pathology Laboratories',
      'Student Dormitory Quad & Dining Halls',
      'Renewable Energy & Solar Testing Lab',
    ],
    contact: { phone: '+251-571-12-01-20', email: 'shambu.campus@wu.edu.et', office: 'Shambu Academic Dean Office' },
  },
  {
    id: 'gimbi',
    name: 'Gimbi Campus',
    amharic: 'ጊምቢ ግቢ',
    location: 'Gimbi Town, West Wollega, Oromia (Along Ethio-Sudan Highway)',
    established: 'Established 2014',
    coverImage: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1200&q=80',
    description:
      'A rapidly growing academic hub specializing in Teacher Education, Behavioral Studies, Mining & Mineral Exploration, and Continuing Education across Western Oromia.',
    stats: { programs: '20+ Programs', students: '4,500+ Students', faculty: '180+ Faculty', acres: '60 Hectares' },
    faculties: [
      'College of Education & Behavioral Sciences',
      'Department of Geology & Mineral Engineering',
      'Institute of Languages & Oromo Folklore',
      'Division of Continuing & Distance Education',
    ],
    facilities: [
      'Modern Science Demonstration Laboratories',
      'Mineralogical & Geological Specimen Repository',
      'Teacher Training & Microteaching Suites',
      'Community Legal Aid & Guidance Clinic',
      'High-Speed Digital Learning Center',
    ],
    contact: { phone: '+251-571-14-05-10', email: 'gimbi.campus@wu.edu.et', office: 'Gimbi Campus Registrar Wing' },
  },
];

export default function CampusesPage() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredCampuses =
    activeTab === 'all'
      ? campusDetails
      : campusDetails.filter((c) => c.id === activeTab);

  return (
    <div className="bg-[#F8F9FA] text-[#1A1A1A] font-sans pb-20">
      {/* ─── AAU Navy Hero Banner ─── */}
      <section className="relative bg-[#00486E] text-white py-16 px-4 sm:px-6 lg:px-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80"
            alt="Wollega Campuses"
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

        <div className="max-w-[90rem] mx-auto relative z-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-300 mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#66C2FF]">Campuses & Facilities</span>
          </div>

          <div className="inline-flex items-center gap-2 bg-[#002B40] text-gray-200 border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span>Western Oromia Academic Infrastructure</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight">
            Our Campuses & Learning Environments
          </h1>
          <p className="text-sm sm:text-base text-gray-200 mt-3 max-w-3xl leading-relaxed">
            Wollega University operates three integrated campuses in Nekemte, Shambu, and Gimbi, each tailored to distinct regional development, agricultural research, and technological advancement needs.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/15 max-w-3xl">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white">3</div>
              <div className="text-xs text-gray-300">Campuses</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white">120+</div>
              <div className="text-xs text-gray-300">Degree Programs</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white">28,500+</div>
              <div className="text-xs text-gray-300">Active Students</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-[#10B981]">295 Ha</div>
              <div className="text-xs text-gray-300">Total Land Area</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Campus Filter Tabs ─── */}
      <section className="bg-white border-b border-gray-200 sticky top-20 z-30 shadow-xs">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center gap-2 overflow-x-auto py-3">
            {[
              { id: 'all', label: 'All Campuses (3)' },
              { id: 'nekemte', label: 'Nekemte Main Campus' },
              { id: 'shambu', label: 'Shambu Campus' },
              { id: 'gimbi', label: 'Gimbi Campus' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab.id
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

      {/* ─── Campus Details List ─── */}
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12 pt-12 space-y-16">
        {filteredCampuses.map((campus) => (
          <div
            key={campus.id}
            className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden hover:border-[#0073AA] transition-all"
          >
            {/* Split Top: Image & Header Info */}
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-full">
                <img
                  src={campus.coverImage}
                  alt={campus.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 bg-[#D9251D] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded shadow">
                  {campus.established}
                </span>
              </div>

              <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-semibold text-[#0073AA] font-heading">{campus.amharic}</div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00486E] font-heading mt-0.5 mb-2">
                    {campus.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#D9251D] font-semibold flex items-center gap-1.5 mb-4">
                    <span>📍</span>
                    <span>{campus.location}</span>
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                    {campus.description}
                  </p>

                  {/* 4 Stat Badges */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-[#F4F6F8] rounded border border-gray-200 text-center">
                    <div>
                      <div className="text-[10px] text-gray-500 uppercase font-semibold">Programs</div>
                      <div className="text-base font-bold text-[#00486E]">{campus.stats.programs}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-500 uppercase font-semibold">Students</div>
                      <div className="text-base font-bold text-[#00486E]">{campus.stats.students}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-500 uppercase font-semibold">Faculty</div>
                      <div className="text-base font-bold text-[#00486E]">{campus.stats.faculty}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-500 uppercase font-semibold">Campus Area</div>
                      <div className="text-base font-bold text-[#00486E]">{campus.stats.acres}</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-6 mt-6 border-t border-gray-100">
                  <Link
                    to="/register"
                    className="bg-[#0073AA] hover:bg-[#005C8A] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded shadow-sm transition-all"
                  >
                    Apply to this Campus ↗
                  </Link>
                  <Link
                    to="/lookup"
                    className="border border-gray-300 hover:border-[#00486E] text-gray-700 text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded transition-all"
                  >
                    Check Placement Status
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom 2 Columns: Colleges & Facilities */}
            <div className="grid grid-cols-1 md:grid-cols-2 border-t border-gray-200 bg-[#FAFBFD] p-6 sm:p-10 gap-8">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#00486E] mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#0073AA]" />
                  <span>Academic Colleges & Schools</span>
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                  {campus.faculties.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="text-[#0073AA] font-bold">›</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#00486E] mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D9251D]" />
                  <span>Key Infrastructure & Facilities</span>
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                  {campus.facilities.map((fac) => (
                    <li key={fac} className="flex items-start gap-2">
                      <span className="text-[#D9251D] font-bold">✓</span>
                      <span>{fac}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
