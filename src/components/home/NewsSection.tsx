import { Link } from 'react-router-dom';
import SectionHeader from '@/components/shared/SectionHeader';

const newsItems = [
  {
    id: 1,
    category: 'ADMISSIONS & REGISTRAR',
    title: 'Fall 2026/2027 Student Self-Registration Portal Officially Opened',
    date: 'SEPTEMBER 02, 2026',
    excerpt:
      'The Office of the Registrar announces the launch of the new self-registration system for undergraduate regular, weekend, evening, and summer Kiremt programs across all campuses.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
  {
    id: 2,
    category: 'ACADEMIC SENATE',
    title: 'Senate Approves New Curriculum Guidelines for Engineering & Health Sciences',
    date: 'AUGUST 28, 2026',
    excerpt: 'Comprehensive modular curriculum modernization approved for 2026/2027 academic session.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 3,
    category: 'CAMPUS DEVELOPMENT',
    title: 'Expansion of Digital Laboratories and High-Speed Fiber Completed at Shambu Campus',
    date: 'AUGUST 21, 2026',
    excerpt: 'Enhancing student internet access, computer labs, and e-learning facilities.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 4,
    category: 'ORIENTATION & FRESHMEN',
    title: 'Freshman Orientation Week and Student ID Card Pickup Schedule Announced',
    date: 'AUGUST 15, 2026',
    excerpt: 'All placed freshmen are invited to participate in campus tour sessions and collect verified cards.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=500&q=80',
  },
];

export default function NewsSection() {
  const featuredNews = newsItems.find((n) => n.featured) || newsItems[0];
  const sideNews = newsItems.filter((n) => !n.featured);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12">
        <SectionHeader
          category="NEWS & ANNOUNCEMENTS"
          title="What's New at Wollega University"
          action={
            <Link
              to="/faq"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0073AA] hover:text-[#005C8A] uppercase tracking-wider transition-colors"
            >
              <span>View All News & Circulars</span>
              <span>↗</span>
            </Link>
          }
        />

        {/* 2-Column AAU News Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Big Featured Card */}
          <div className="lg:col-span-6 flex flex-col group cursor-pointer border border-gray-200 hover:border-[#0073AA] rounded-sm overflow-hidden transition-all shadow-sm hover:shadow-md">
            <div className="relative h-64 sm:h-80 overflow-hidden bg-gray-100">
              <img
                src={featuredNews.image}
                alt={featuredNews.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 bg-[#D9251D] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded shadow">
                {featuredNews.category}
              </span>
            </div>
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between bg-white">
              <div>
                <div className="text-xs text-gray-400 font-mono mb-2">{featuredNews.date}</div>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#00486E] group-hover:text-[#0073AA] transition-colors leading-snug mb-3">
                  {featuredNews.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {featuredNews.excerpt}
                </p>
              </div>
              <div className="pt-6 mt-4 border-t border-gray-100">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0073AA] group-hover:text-[#005C8A] uppercase tracking-wider">
                  <span>Read Full Article</span>
                  <span>↗</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Horizontal Stacked Cards */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-4">
            {sideNews.map((news) => (
              <div
                key={news.id}
                className="flex flex-col sm:flex-row items-stretch gap-4 p-4 border border-gray-200 hover:border-[#0073AA] rounded-sm transition-all group cursor-pointer shadow-sm hover:shadow bg-white"
              >
                <div className="sm:w-44 h-36 shrink-0 overflow-hidden rounded bg-gray-100">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#D9251D]">
                        {news.category}
                      </span>
                      <span className="text-[10px] text-gray-400 font-mono">{news.date}</span>
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-[#00486E] group-hover:text-[#0073AA] transition-colors line-clamp-2 leading-snug mb-1">
                      {news.title}
                    </h4>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                      {news.excerpt}
                    </p>
                  </div>
                  <div className="pt-2">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0073AA] uppercase tracking-wide">
                      <span>Learn More</span>
                      <span>›</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
