import { Link, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';
import PageLoader from '@/components/shared/PageLoader';

export default function PublicLayout() {
  const { t } = useTranslation();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const navLinks = [
    { to: '/', label: t('nav.home'), exact: true },
    { to: '/campuses', label: 'Campuses' },
    { to: '/lookup', label: 'Admission Lookup' },
    { to: '/calendar', label: 'Academic Calendar' },
    { to: '/faq', label: 'FAQ & Help' },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A] flex flex-col font-sans">
      <PageLoader show={loading} />

      {/* ─── Top Utility Strip (AAU Style) ─── */}
      <div className="bg-[#002B40] text-gray-300 text-xs py-1.5 px-4 sm:px-6 lg:px-12 border-b border-[#003B57]">
        <div className="max-w-[90rem] mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 text-white/90">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span>Fall 2026 / 2027 Registration Active</span>
            </span>
            <span className="hidden md:inline text-gray-500">|</span>
            <span className="hidden md:inline text-gray-300">Nekemte • Shambu • Gimbi Campuses</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <a href="mailto:registrar@wu.edu.et" className="hover:text-white transition-colors">
              📧 registrar@wu.edu.et
            </a>
            <span className="text-gray-500">|</span>
            <span className="text-[#00A3E0] font-medium">Hotline: +251-571-11-04-00</span>
          </div>
        </div>
      </div>

      {/* ─── Main Header (AAU White Navbar) ─── */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo Lockup (AAU Structure: Amharic in Navy + English in Red) */}
            <Link to="/" className="flex items-center gap-3.5 group shrink-0">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#00486E] shadow-sm bg-white flex items-center justify-center p-0.5">
                <img src="/logo1.png" alt="Wollega University" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-[#00486E] tracking-wider font-heading leading-tight">
                  ወለጋ ዩኒቨርሲቲ
                </span>
                <span className="text-base sm:text-lg font-extrabold text-[#D9251D] tracking-tight leading-none">
                  WOLLEGA UNIVERSITY
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-[#555555] mt-0.5">
                  Student Self-Registration Portal
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((item) => {
                const isActive = item.exact
                  ? location.pathname === item.to
                  : location.pathname.startsWith(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`px-3 py-2 text-sm font-medium transition-colors relative ${
                      isActive
                        ? 'text-[#0073AA] font-bold'
                        : 'text-[#333333] hover:text-[#0073AA]'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#0073AA]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Action Buttons & Language Switcher */}
            <div className="flex items-center gap-3">
              <LanguageSwitcher />

              <Link
                to="/login"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-[#00486E] hover:text-[#0073AA] px-3 py-2 rounded transition-colors"
              >
                <span>Portal Login</span>
              </Link>

              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-1.5 text-sm font-bold bg-[#0073AA] hover:bg-[#005C8A] text-white px-4 py-2.5 rounded shadow-sm hover:shadow transition-all"
              >
                <span>Apply Now</span>
                <span className="text-xs">↗</span>
              </Link>

              {/* Mobile hamburger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded text-gray-700 hover:text-[#0073AA] hover:bg-gray-100"
                aria-label="Toggle navigation menu"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-gray-200 px-4 pt-3 pb-5 space-y-1 shadow-lg">
            {navLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 text-base font-medium rounded text-gray-800 hover:bg-[#F4F6F8] hover:text-[#0073AA]"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 border border-gray-300 rounded font-semibold text-[#00486E]"
              >
                Portal Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 bg-[#0073AA] text-white rounded font-bold"
              >
                Apply Now ↗
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ─── Main Page Content ─── */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* ─── AAU Signature Midnight Navy Footer ─── */}
      <footer className="bg-[#002B40] text-gray-300 relative z-20">
        {/* Main Footer Links */}
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12 pt-14 pb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Brand column */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <img src="/logo1.png" alt="Wollega University" className="w-14 h-14 rounded-full object-cover border-2 border-white/20 shadow-md bg-white p-0.5" />
                <div>
                  <div className="text-xs font-semibold text-gray-300 font-heading">ወለጋ ዩኒቨርሲቲ</div>
                  <div className="font-heading font-extrabold text-white text-lg leading-tight">WOLLEGA UNIVERSITY</div>
                  <div className="text-[11px] text-[#00A3E0] font-medium">Student Self-Registration System (WU-SSRS)</div>
                </div>
              </div>
              <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
                Empowering students across Western Ethiopia with state-of-the-art digital self-registration, campus placement, credential verification, and academic self-service.
              </p>
              <div className="inline-flex items-center gap-3 bg-[#003752] px-3.5 py-2 rounded text-xs text-gray-300 border border-white/10">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
                <span>Portal Live 24/7 • Admissions & Re-Registration Active</span>
              </div>
            </div>

            {/* Essentials */}
            <div>
              <h3 className="text-white text-base font-bold mb-4 border-b border-white/10 pb-2">
                Essentials
              </h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/lookup" className="hover:text-white hover:underline transition-colors">Check Admission Status</Link></li>
                <li><Link to="/register" className="hover:text-white hover:underline transition-colors">Online Application</Link></li>
                <li><Link to="/calendar" className="hover:text-white hover:underline transition-colors">Academic Calendar</Link></li>
                <li><Link to="/faq" className="hover:text-white hover:underline transition-colors">Admission Requirements</Link></li>
                <li><a href="mailto:support@wu.edu.et" className="hover:text-white hover:underline transition-colors">Emergency & Helpdesk</a></li>
              </ul>
            </div>

            {/* About Us */}
            <div>
              <h3 className="text-white text-base font-bold mb-4 border-b border-white/10 pb-2">
                About Wollega
              </h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/campuses" className="hover:text-white hover:underline transition-colors">Main Campus — Nekemte</Link></li>
                <li><Link to="/campuses" className="hover:text-white hover:underline transition-colors">Shambu Campus</Link></li>
                <li><Link to="/campuses" className="hover:text-white hover:underline transition-colors">Gimbi Campus</Link></li>
                <li><span className="text-gray-400">Leadership & Senate</span></li>
                <li><span className="text-gray-400">Accreditation & Research</span></li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white text-base font-bold mb-4 border-b border-white/10 pb-2">
                Quick Links
              </h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/login" className="hover:text-white hover:underline transition-colors">Student Portal</Link></li>
                <li><Link to="/login" className="hover:text-white hover:underline transition-colors">Registrar Queue</Link></li>
                <li><Link to="/login" className="hover:text-white hover:underline transition-colors">Management Analytics</Link></li>
                <li><Link to="/login" className="hover:text-white hover:underline transition-colors">Student Council Assist</Link></li>
                <li><a href="https://wu.edu.et" target="_blank" rel="noreferrer" className="text-[#00A3E0] hover:underline">Official WU Website ↗</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Social Icons & Copyright */}
        <div className="border-t border-[#003B57] py-6 px-4 sm:px-6 lg:px-12 bg-[#001F2F]">
          <div className="max-w-[90rem] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-400 text-center md:text-left">
              © {new Date().getFullYear()} Wollega University (ወለጋ ዩኒቨርሲቲ). All rights reserved.
            </p>

            <div className="flex items-center space-x-4 text-gray-400">
              <span className="text-xs text-gray-400 mr-2">Connect:</span>
              <a href="#" className="hover:text-white transition-colors" title="Facebook">🌐</a>
              <a href="#" className="hover:text-white transition-colors" title="Telegram">✈️</a>
              <a href="#" className="hover:text-white transition-colors" title="Twitter / X">🐦</a>
              <a href="#" className="hover:text-white transition-colors" title="YouTube">📺</a>
              <a href="#" className="hover:text-white transition-colors" title="LinkedIn">💼</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
