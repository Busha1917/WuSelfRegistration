import { useState } from 'react';
import { Link } from 'react-router-dom';

const campusDetails = [
  {
    id: 'nekemte',
    name: 'Nekemte Main Campus',
    amharic: 'ነቀምቴ ዋናው ግቢ',
    location: 'Nekemte City, East Wollega, Oromia (310 km west of Addis Ababa)',
    established: 'Established 2007',
    coverImage: '/image1.jpg',
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
    coverImage: '/image5.jpg',
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
    coverImage: '/image4.jpg',
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
            src="/image1.jpg"
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

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-gray-300 mb-4">
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
          <p className="text-sm sm:text-base text-gray-200 mt-3 max-w-3xl mx-auto leading-relaxed">
            Wollega University operates three integrated campuses in Nekemte, Shambu, and Gimbi, each tailored to distinct regional development, agricultural research, and technological advancement needs.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/15 max-w-3xl mx-auto text-center">
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
          <div className="flex items-center justify-center gap-2 overflow-x-auto py-3">
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

      {/* ─── Campus Details Grid ─── */}
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12 pt-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8 pb-4 border-b border-gray-200">
          <div>
            <span className="text-xs font-bold text-[#D9251D] uppercase tracking-wider block">CAMPUS NETWORK</span>
            <h2 className="text-2xl font-extrabold text-[#00486E] font-heading">
              {activeTab === 'all' ? 'All Three University Campuses' : filteredCampuses[0]?.name}
            </h2>
          </div>
          <div className="text-xs text-gray-500 font-medium">
            Showing <span className="font-bold text-[#00486E]">{filteredCampuses.length}</span> of 3 Campuses
          </div>
        </div>

        {activeTab === 'all' ? (
          /* 3-Column Grid Fitting Horizontally Across the Page */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {filteredCampuses.map((campus) => (
              <div
                key={campus.id}
                className="bg-white border border-gray-200 hover:border-[#0073AA] rounded-sm shadow-sm hover:shadow-lg transition-all flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Top Campus Cover Image */}
                  <div className="relative h-52 overflow-hidden bg-gray-100">
                    <img
                      src={campus.coverImage}
                      alt={campus.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-[#002B40]/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow">
                      {campus.established}
                    </span>
                    <span className="absolute top-3 right-3 bg-white/95 text-[#00486E] text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                      {campus.stats.acres}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-semibold text-[#0073AA] font-heading">{campus.amharic}</span>
                      <span className="text-[11px] text-[#D9251D] font-semibold flex items-center gap-1">
                        <span>📍</span>
                        <span className="truncate max-w-[160px]">{campus.location.split(',')[0]}</span>
                      </span>
                    </div>

                    <h3 className="text-xl font-extrabold text-[#00486E] group-hover:text-[#0073AA] font-heading transition-colors mb-2">
                      {campus.name}
                    </h3>

                    <p className="text-xs text-gray-600 leading-relaxed mb-4 line-clamp-2">
                      {campus.description}
                    </p>

                    {/* 4 Stat Badges in a Horizontal Strip */}
                    <div className="grid grid-cols-4 gap-1.5 p-2.5 bg-[#F4F6F8] rounded border border-gray-200 text-center mb-4">
                      <div>
                        <div className="text-[9px] text-gray-500 uppercase font-semibold">Programs</div>
                        <div className="text-xs font-bold text-[#00486E] truncate">{campus.stats.programs}</div>
                      </div>
                      <div>
                        <div className="text-[9px] text-gray-500 uppercase font-semibold">Students</div>
                        <div className="text-xs font-bold text-[#00486E] truncate">{campus.stats.students}</div>
                      </div>
                      <div>
                        <div className="text-[9px] text-gray-500 uppercase font-semibold">Faculty</div>
                        <div className="text-xs font-bold text-[#00486E] truncate">{campus.stats.faculty}</div>
                      </div>
                      <div>
                        <div className="text-[9px] text-gray-500 uppercase font-semibold">Area</div>
                        <div className="text-xs font-bold text-[#00486E] truncate">{campus.stats.acres}</div>
                      </div>
                    </div>

                    {/* Horizontal 2-Column Split: Colleges (Left) & Facilities (Right) */}
                    <div className="grid grid-cols-2 gap-3 mb-4 text-[11px]">
                      <div>
                        <h4 className="font-bold uppercase tracking-wider text-[#00486E] mb-1.5 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0073AA]" />
                          <span className="truncate">Colleges</span>
                        </h4>
                        <ul className="space-y-1 text-gray-700">
                          {campus.faculties.slice(0, 3).map((f) => (
                            <li key={f} className="flex items-start gap-1">
                              <span className="text-[#0073AA] font-bold">›</span>
                              <span className="line-clamp-1">{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-bold uppercase tracking-wider text-[#00486E] mb-1.5 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D9251D]" />
                          <span className="truncate">Facilities</span>
                        </h4>
                        <ul className="space-y-1 text-gray-700">
                          {campus.facilities.slice(0, 3).map((fac) => (
                            <li key={fac} className="flex items-start gap-1">
                              <span className="text-[#D9251D] font-bold">✓</span>
                              <span className="line-clamp-1">{fac}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Contact Info in a Single Horizontal Row */}
                    <div className="pt-2.5 border-t border-gray-100 text-[11px] text-gray-500 flex items-center justify-between gap-2">
                      <span className="truncate">📞 {campus.contact.phone}</span>
                      <span className="truncate text-[#0073AA]">✉️ {campus.contact.email.split('@')[0]}</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="p-5 sm:p-6 pt-0">
                  <button
                    onClick={() => setActiveTab(campus.id)}
                    className="w-full bg-[#0073AA] hover:bg-[#005C8A] text-white text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded transition-all shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <span>View Campus Details</span>
                    <span>↗</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Detailed Single Campus View */
          filteredCampuses.map((campus) => (
            <div
              key={campus.id}
              className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-full">
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
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-[#0073AA] font-heading">{campus.amharic}</span>
                      <button
                        onClick={() => setActiveTab('all')}
                        className="text-xs font-bold text-[#0073AA] hover:text-[#005C8A] hover:underline"
                      >
                        ← Back to All Campuses
                      </button>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00486E] font-heading mb-2">
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
                      to="/lookup"
                      className="bg-[#0073AA] hover:bg-[#005C8A] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded shadow-sm transition-all"
                    >
                      Check Placement Status ↗
                    </Link>
                    <button
                      onClick={() => setActiveTab('all')}
                      className="border border-gray-300 hover:border-[#00486E] text-gray-700 text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded transition-all"
                    >
                      ← Back to All Campuses
                    </button>
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
          ))
        )}
      </div>
    </div>
  );
}
