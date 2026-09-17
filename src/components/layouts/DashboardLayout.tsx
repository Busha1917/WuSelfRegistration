import { useState, useRef, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';
import ConfirmDialog from '@/components/shared/ConfirmDialog';
import { useToast } from '@/components/ui/Toast';
import DashboardFooter from '@/components/layouts/DashboardFooter';

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
  const { addToast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setProfileMenuOpen(false);
      }
    };
    if (profileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [profileMenuOpen]);

  const currentRole = user?.role || 'student';
  const menuItems = roleMenus[currentRole] || roleMenus.student;
  const currentRoleInfo = roleInfo[currentRole] || roleInfo.student;

  const getProfilePath = () => {
    if (currentRole === 'student') return '/student/profile';
    if (currentRole === 'admin') return '/admin/users';
    if (currentRole === 'registrar') return '/registrar/dashboard';
    if (currentRole === 'management') return '/management/dashboard';
    if (currentRole === 'council') return '/council/assist';
    return '/student/dashboard';
  };

  const getSettingsPath = () => {
    if (currentRole === 'student') return '/student/profile';
    if (currentRole === 'admin') return '/admin/config';
    return getProfilePath();
  };

  const handleLogout = () => {
    logout();
    addToast(t('auth.signedOut', 'You have been signed out successfully.'), 'info');
    navigate('/login');
  };

  const getPortalTitle = () => {
    if (i18n.language === 'am') return currentRoleInfo.portalNameAm;
    if (i18n.language === 'om') return currentRoleInfo.portalNameOm;
    return currentRoleInfo.portalNameEn;
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
              onClick={() => setShowLogoutConfirm(true)}
              className="px-2 py-1.5 bg-[#D9251D]/80 hover:bg-[#D9251D] text-white rounded text-[11px] font-bold text-center transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>🚪</span>
              <span>{t('auth.signOut', 'Sign Out')}</span>
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
              {/* Language Switcher */}
              <LanguageSwitcher />

              {/* Profile Icon Dropdown Menu */}
              <div className="relative" ref={profileMenuRef}>
                <button
                  type="button"
                  onClick={() => setProfileMenuOpen((prev) => !prev)}
                  className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1 rounded-full hover:bg-gray-100 border border-gray-200 hover:border-gray-300 transition-all cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#0073AA]/20 bg-white shadow-2xs"
                  aria-expanded={profileMenuOpen}
                  aria-haspopup="true"
                  aria-label="User Profile & Settings Menu"
                >
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-[#00486E] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                      {user?.fullName?.charAt(0)?.toUpperCase() || '👤'}
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#10B981] border-2 border-white rounded-full" title="Active" />
                  </div>

                  <span className="hidden sm:inline-block text-xs font-bold text-[#00486E] max-w-[110px] truncate">
                    {user?.fullName?.split(' ')[0] || 'User'}
                  </span>

                  <svg
                    className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-200 ${profileMenuOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {profileMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    role="menu"
                    aria-orientation="vertical"
                  >
                    {/* User Identity Header */}
                    <div className="px-4 py-2.5 border-b border-gray-100 bg-[#F8F9FA] rounded-t-xl">
                      <p className="text-[11px] text-gray-500 font-medium">
                        {t('auth.signedInAs', 'Signed in as')}
                      </p>
                      <p className="text-xs font-bold text-[#002B40] truncate mt-0.5">
                        {user?.fullName || 'User'}
                      </p>
                      <div className="flex items-center justify-between gap-2 mt-1">
                        <span className="text-[10px] text-gray-500 truncate font-mono">
                          {user?.email}
                        </span>
                        <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-[#0073AA]/10 text-[#0073AA] shrink-0">
                          {currentRoleInfo.badge}
                        </span>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                      {/* Profile */}
                      <Link
                        to={getProfilePath()}
                        onClick={() => setProfileMenuOpen(false)}
                        className="w-full flex items-center gap-3 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-[#F4F6F8] hover:text-[#00486E] transition-colors"
                        role="menuitem"
                      >
                        <span className="text-base shrink-0">👤</span>
                        <div className="flex-1 min-w-0">
                          <span className="font-bold block">{t('nav.profile', 'Profile')}</span>
                          <span className="block text-[10px] text-gray-400">View personal details & record</span>
                        </div>
                      </Link>

                      {/* Setting */}
                      <Link
                        to={getSettingsPath()}
                        onClick={() => setProfileMenuOpen(false)}
                        className="w-full flex items-center gap-3 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-[#F4F6F8] hover:text-[#00486E] transition-colors"
                        role="menuitem"
                      >
                        <span className="text-base shrink-0">⚙️</span>
                        <div className="flex-1 min-w-0">
                          <span className="font-bold block">{t('nav.settings', 'Setting')}</span>
                          <span className="block text-[10px] text-gray-400">Security & credentials</span>
                        </div>
                      </Link>
                    </div>

                    <div className="border-t border-gray-100 my-1" />

                    {/* Logout */}
                    <div className="py-0.5">
                      <button
                        type="button"
                        onClick={() => {
                          setProfileMenuOpen(false);
                          setShowLogoutConfirm(true);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-xs font-bold text-[#D9251D] hover:bg-red-50 transition-colors text-left cursor-pointer"
                        role="menuitem"
                      >
                        <span className="text-base shrink-0">🚪</span>
                        <div className="flex-1 min-w-0">
                          <span className="font-bold block">{t('nav.logout', 'Logout')}</span>
                          <span className="block text-[10px] text-red-400 font-normal">Sign out of your session</span>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[90rem] w-full mx-auto">
          <Outlet />
        </main>

        {/* Wollega University Patent Footer */}
        <DashboardFooter />
      </div>

      {/* Sign Out Confirmation Modal */}
      <ConfirmDialog
        open={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={() => {
          setShowLogoutConfirm(false);
          handleLogout();
        }}
        title={t('auth.signOutConfirmTitle', 'Sign Out Confirmation')}
        message={t('auth.signOutConfirmMessage', 'Are you sure you want to sign out of your account?')}
        confirmLabel={t('auth.signOut', 'Sign Out')}
        variant="destructive"
      />
    </div>
  );
}
