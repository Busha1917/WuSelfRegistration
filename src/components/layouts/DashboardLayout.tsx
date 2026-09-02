import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';
import { useState, useEffect } from 'react';
import PageLoader from '@/components/shared/PageLoader';

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

const roleBadgeColors: Record<string, string> = {
  student: 'bg-wu-blue text-white',
  registrar: 'bg-wu-maroon text-white',
  admin: 'bg-wu-maroon-900 text-white',
  management: 'bg-wu-gold text-wu-ink',
  council: 'bg-success text-white',
};

export default function DashboardLayout() {
  const { t } = useTranslation();
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const menuItems = roleMenus[user?.role || 'student'];

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-wu-cream flex">
      <PageLoader show={loading} />
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-wu-maroon text-white z-40 flex flex-col transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img src="/logo1.png" alt="WU Logo" className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
            <div className="min-w-0">
              <div className="font-heading font-bold text-sm leading-tight truncate">{t('app.name')}</div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${roleBadgeColors[user?.role || 'student']}`}>
                {user?.role?.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {menuItems.map(item => {
            const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-white/20 text-white font-medium'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span className="truncate">{t(item.labelKey)}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-white/10">
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white w-full transition-colors">
            <span>🚪</span>
            <span>{t('nav.logout')}</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-20">
          <div className="flex items-center justify-between h-14 px-4 sm:px-6">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-1" aria-label="Toggle sidebar">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              </button>
              <div className="text-sm text-neutral hidden sm:block">
                Welcome, <span className="font-medium text-wu-ink">{user?.fullName}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <div className="relative group">
                <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100">
                  <div className="w-8 h-8 bg-wu-maroon rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {user?.fullName?.charAt(0) || 'U'}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </header>
        <main className="p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
