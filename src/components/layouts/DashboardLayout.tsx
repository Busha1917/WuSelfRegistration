import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';

const roleMenus: Record<string, { labelKey: string; path: string; icon: string }[]> = {
  student: [
    { labelKey: 'nav.dashboard', path: '/student/dashboard', icon: '📊' },
    { labelKey: 'nav.applications', path: '/student/application', icon: '📝' },
    { labelKey: 'nav.documents', path: '/student/documents', icon: '📄' },
    { labelKey: 'nav.status', path: '/student/status', icon: '🔍' },
    { labelKey: 'nav.idCard', path: '/student/id-card', icon: '🪪' },
    { labelKey: 'nav.placement', path: '/student/placement', icon: '🏫' },
    { labelKey: 'nav.reRegistration', path: '/student/re-registration', icon: '🔄' },
    { labelKey: 'nav.history', path: '/student/history', icon: '📋' },
    { labelKey: 'nav.profile', path: '/student/profile', icon: '👤' },
  ],
  registrar: [
    { labelKey: 'nav.dashboard', path: '/registrar/dashboard', icon: '📊' },
    { labelKey: 'nav.queue', path: '/registrar/queue', icon: '📋' },
    { labelKey: 'nav.semesterQueue', path: '/registrar/semester-queue', icon: '🔄' },
    { labelKey: 'nav.placementMgmt', path: '/registrar/placement', icon: '🏫' },
    { labelKey: 'nav.history', path: '/registrar/history', icon: '📜' },
  ],
  admin: [
    { labelKey: 'nav.dashboard', path: '/admin/dashboard', icon: '📊' },
    { labelKey: 'nav.users', path: '/admin/users', icon: '👥' },
    { labelKey: 'nav.import', path: '/admin/import', icon: '📥' },
    { labelKey: 'nav.config', path: '/admin/config', icon: '⚙️' },
    { labelKey: 'nav.reports', path: '/admin/reports', icon: '📈' },
    { labelKey: 'nav.auditLog', path: '/admin/audit-log', icon: '📜' },
  ],
  management: [
    { labelKey: 'nav.dashboard', path: '/management/dashboard', icon: '📊' },
    { labelKey: 'nav.semesterStats', path: '/management/semester-stats', icon: '🔄' },
    { labelKey: 'nav.reports', path: '/management/reports', icon: '📈' },
  ],
  council: [
    { labelKey: 'nav.assist', path: '/council/assist', icon: '🤝' },
  ],
};

const roleInfo: Record<string, { badge: string; color: string; portalNameEn: string; portalNameAm: string; portalNameOm: string }> = {
  student: {
    badge: 'STUDENT PORTAL',
    color: 'bg-[#0073AA] text-white',
    portalNameEn: 'Student Academic Portal',
    portalNameAm: 'የተማሪዎች የትምህርት ፖርታል',
    portalNameOm: 'Poortaalii Barnoota Barattootaa',
  },
  registrar: {
    badge: 'OFFICE OF REGISTRAR',
    color: 'bg-[#D9251D] text-white',
    portalNameEn: 'Registrar Directorate Suite',
    portalNameAm: 'የሬጅስትራር ዳይሬክቶሬት ቢሮ',
    portalNameOm: 'Biiroo Daayirektoreetii Reejistiraaraa',
  },
  admin: {
    badge: 'SYSTEM ADMIN',
    color: 'bg-[#6D28D9] text-white',
    portalNameEn: 'Portal Administration Center',
    portalNameAm: 'የስርዓት አስተዳደር ማዕከል',
    portalNameOm: 'Wiirtuu Bulchiinsa Sirnaa',
  },
  management: {
    badge: 'UNIVERSITY SENATE',
    color: 'bg-[#059669] text-white',
    portalNameEn: 'Executive Management Analytics',
    portalNameAm: 'የከፍተኛ አመራር ትንተና ዳሽቦርድ',
    portalNameOm: 'Gabaasa Hoggansa Olaanaa',
  },
  council: {
    badge: 'STUDENT COUNCIL',
    color: 'bg-[#D97706] text-white',
    portalNameEn: 'Student Union Help Desk',
    portalNameAm: 'የተማሪዎች ህብረት ድጋፍ ማዕከል',
    portalNameOm: 'Giddugala Deeggarsa Tokkummaa Barattootaa',
  },
};

export default function DashboardLayout() {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentRole = user?.role || 'student';
  const menuItems = roleMenus[currentRole] || roleMenus.student;
  const currentRoleInfo = roleInfo[currentRole] || roleInfo.student;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getPortalTitle = () => {
    if (i18n.language === 'am') return currentRoleInfo.portalNameAm;
    if (i18n.language === 'om') return currentRoleInfo.portalNameOm;
    return currentRoleInfo.portalNameEn;
  };

  const getWelcomeGreeting = () => {
    if (i18n.language === 'am') return 'እንኳን ደህና መጡ';
    if (i18n.language === 'om') return 'Baga nagaan dhuftan';
    return 'Welcome';
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A] flex font-sans">
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ─── AAU Dark Navy Sidebar ─── */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-[#002B40] text-white z-40 flex flex-col justify-between transition-transform duration-300 shadow-2xl lg:shadow-none lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        {/* Top University Branding Lockup */}
        <div>
          <div className="p-5 border-b border-white/10 bg-[#002436]">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white/40 shadow bg-white p-0.5 shrink-0 group-hover:scale-105 transition-transform">
                <img src="/logo1.png" alt="Wallaga University" className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-semibold text-[#66C2FF] font-heading leading-tight">ወለጋ ዩኒቨርሲቲ</div>
                <div className="text-sm font-extrabold text-[#D9251D] tracking-tight font-heading leading-tight bg-white px-1.5 py-0.5 rounded-xs inline-block mt-0.5">
                  Wallaga UNIVERSITY
                </div>
                <div className="text-[10px] text-gray-300 font-mono tracking-wider mt-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                  <span>Nekemte • Shambu • Gimbi</span>
                </div>
              </div>
            </Link>

            {/* Current Active Role Badge */}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
              <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded uppercase tracking-wider ${currentRoleInfo.color}`}>
                {currentRoleInfo.badge}
              </span>
              <span className="text-[11px] text-gray-400 font-mono">
                AY 2026/27
              </span>
            </div>
          </div>

          {/* Nav List */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-210px)]">
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400">
              {getPortalTitle()}
            </div>
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== `/${currentRole}/dashboard` && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-sm text-xs sm:text-sm font-medium transition-all ${isActive
                      ? 'bg-[#0073AA] text-white font-bold shadow-sm'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <span className="text-base shrink-0">{item.icon}</span>
                    <span className="truncate">{t(item.labelKey, item.labelKey.split('.').pop() || '')}</span>
                  </div>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Profile & Sign Out Footer */}
        <div className="p-4 border-t border-white/10 bg-[#002436]">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-full bg-[#0073AA] border border-white/30 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-sm">
                {user?.fullName?.charAt(0) || 'U'}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate">{user?.fullName}</div>
                <div className="text-[10px] text-gray-400 truncate">{user?.email}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
            <Link
              to="/"
              className="px-2 py-1.5 bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white rounded text-[11px] font-semibold text-center transition-colors flex items-center justify-center gap-1"
            >
              <span>🏠</span>
              <span>{t('nav.home', 'Home')}</span>
            </Link>
            <button
              onClick={handleLogout}
              className="px-2 py-1.5 bg-[#D9251D]/80 hover:bg-[#D9251D] text-white rounded text-[11px] font-bold text-center transition-colors flex items-center justify-center gap-1"
            >
              <span>🚪</span>
              <span>{t('nav.logout', 'Sign Out')}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ─── Main Content Canvas ─── */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-xs">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <div>
                <span className="text-[11px] font-bold text-[#D9251D] uppercase tracking-wider block">
                  {currentRoleInfo.badge}
                </span>
                <h2 className="text-base sm:text-lg font-bold font-heading text-[#00486E] leading-tight truncate">
                  {getPortalTitle()}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <div className="hidden md:flex items-center gap-2 text-xs text-gray-500 bg-[#F4F6F8] px-3 py-1.5 rounded-full border border-gray-200">
                <span className="text-gray-400">{getWelcomeGreeting()},</span>
                <span className="font-bold text-[#00486E]">{user?.fullName?.split(' ')[0]}</span>
              </div>

              {/* Language Switcher */}
              <LanguageSwitcher />

              {/* Home link */}
              <Link
                to="/"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-[#0073AA] hover:text-[#00486E] hover:underline"
              >
                <span>Portal Landing</span>
                <span>↗</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Dynamic Page Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[90rem] w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
