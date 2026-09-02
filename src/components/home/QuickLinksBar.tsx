import { Link } from 'react-router-dom';

const quickLinks = [
  { label: 'Freshmen Registration', to: '/register' },
  { label: 'Check Admission Status', to: '/lookup' },
  { label: 'Academic Calendar', to: '/calendar' },
  { label: 'Campus Section Placement', to: '/lookup' },
  { label: 'Registrar Helpdesk', to: '/faq' },
];

export default function QuickLinksBar() {
  return (
    <section className="bg-white py-6 border-b border-gray-200">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm font-bold text-[#00486E] uppercase tracking-wider shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#D9251D]" />
          <span>Quick Links :</span>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 justify-center md:justify-end">
          {quickLinks.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="bg-[#0073AA] hover:bg-[#005C8A] text-white text-xs font-semibold px-4 py-2 rounded-full transition-all shadow-sm hover:shadow flex items-center gap-1.5"
            >
              <span>{item.label}</span>
              <span className="text-[10px]">↗</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
