import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import { useToast } from '@/components/ui/Toast';
import Input from '@/components/ui/Input';
import AuthBrandPanel from '@/components/auth/AuthBrandPanel';
import AuthHeader from '@/components/auth/AuthHeader';
import DemoAccountsBox from '@/components/auth/DemoAccountsBox';

export default function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();
  const { addToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const user = await login(email, password);
      addToast(t('auth.login.success'), 'success');
      navigate(`/${user.role === 'student' ? 'student' : user.role}/dashboard`);
    } catch {
      setError(t('auth.login.invalid'));
    }
  };

  const handleSelectDemo = (roleEmail: string, roleName: string) => {
    setEmail(roleEmail);
    setPassword('password');
    setSelectedRole(roleName);
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col lg:flex-row font-sans">
      {/* Reusable Left Brand Showcase */}
      <AuthBrandPanel
        badgeText="Official University Academic Portal"
        category="ACADEMIC SELF-SERVICE"
        title="Unified Access to Registration, Class Placement & Records"
        description="Sign in to manage your 5-step registration, inspect uploaded certificates, check your classroom section allocation, and download your digital student ID card."
        metrics={[
          { value: '3', label: 'Campuses' },
          { value: '120+', label: 'Programs' },
          { value: '24/7', label: 'Verified Online', highlight: true },
        ]}
      />

      {/* Right Form Panel */}
      <div className="flex-1 flex flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-16 overflow-y-auto">
        <AuthHeader />

        <div className="w-full max-w-md mx-auto my-8">
          {/* Mobile Logo Header */}
          <div className="lg:hidden flex items-center gap-3 mb-6">
            <img src="/logo1.png" alt="Wallaga University" className="w-10 h-10 rounded-full border border-gray-200" />
            <div>
              <div className="text-xs font-semibold text-[#00486E] font-heading">ወለጋ ዩኒቨርሲቲ</div>
              <div className="text-base font-extrabold text-[#D9251D] leading-none">Wallaga UNIVERSITY</div>
            </div>
          </div>

          <div className="mb-6">
            <span className="text-xs font-bold text-[#D9251D] uppercase tracking-wider block mb-1">
              SECURE PORTAL ACCESS
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#00486E] font-heading">
              Sign In to Portal
            </h1>
            <div className="flex items-center gap-1 mt-2.5 mb-3">
              <div className="h-1 w-10 bg-[#D9251D]" />
              <div className="h-1 w-16 bg-[#0073AA]" />
            </div>
            <p className="text-xs sm:text-sm text-[#555555]">
              Enter your student ID or university email credentials to continue.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-[#D9251D] text-[#D9251D] text-xs sm:text-sm p-3.5 rounded-sm mb-5 flex items-start gap-2">
              <span className="font-bold">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                label={t('auth.login.email')}
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setSelectedRole(null);
                }}
                required
                placeholder="student@wu.edu.et"
              />
            </div>

            <div className="relative">
              <Input
                label={t('auth.login.password')}
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-8 text-xs text-gray-500 hover:text-gray-800"
                tabIndex={-1}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            <div className="flex items-center justify-between text-xs sm:text-sm pt-1">
              <label className="flex items-center gap-2 text-[#555555] cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-[#0073AA] focus:ring-[#0073AA]" />
                <span>{t('auth.login.rememberMe')}</span>
              </label>

              <Link to="/forgot-password" className="text-[#0073AA] hover:text-[#005C8A] font-semibold">
                {t('auth.login.forgotPassword')}
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0073AA] hover:bg-[#005C8A] text-white font-bold py-3 rounded-md shadow hover:shadow-md transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wider disabled:opacity-50 mt-2"
            >
              {isLoading ? (
                <span className="inline-flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <span>Verifying Credentials...</span>
                </span>
              ) : (
                <>
                  <span>Sign In to Portal</span>
                  <span className="text-xs">↗</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-xs sm:text-sm text-[#666666] pt-4 border-t border-gray-200">
            <span>New student applying for admission? </span>
            <Link to="/register" className="font-bold text-[#0073AA] hover:underline ml-1">
              Create an Account & Apply ↗
            </Link>
          </div>

          <DemoAccountsBox
            currentEmail={email}
            selectedRole={selectedRole}
            onSelect={handleSelectDemo}
          />
        </div>

        <div className="text-center text-xs text-gray-400 pt-6 border-t border-gray-200">
          <span>© {new Date().getFullYear()} Wallaga University. Protected by WU Institutional Identity Services.</span>
        </div>
      </div>
    </div>
  );
}
