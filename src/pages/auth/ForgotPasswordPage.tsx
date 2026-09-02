import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { authService } from '@/mocks/services';
import { useToast } from '@/components/ui/Toast';
import Input from '@/components/ui/Input';
import AuthBrandPanel from '@/components/auth/AuthBrandPanel';
import AuthHeader from '@/components/auth/AuthHeader';

export default function ForgotPasswordPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [step, setStep] = useState<'email' | 'reset'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      await authService.forgotPassword(email);
      setStep('reset');
      addToast('Reset verification code sent to your email', 'success');
    } catch {
      addToast('Failed to send reset code', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      addToast('Passwords do not match', 'error');
      return;
    }
    setLoading(true);
    try {
      await authService.resetPassword(code, newPassword);
      addToast(t('auth.forgotPassword.success'), 'success');
      navigate('/login');
    } catch {
      addToast('Reset failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col lg:flex-row font-sans">
      {/* Modular Left Brand Showcase with Security Stepper */}
      <AuthBrandPanel
        badgeText="Account Security & Verification"
        category="ACCOUNT RECOVERY"
        title="Secure Password Reset"
        description="Restore access to your student portal, lecture hall section, and academic records in three verified steps."
        metrics={[
          { value: '🔒', label: 'Encrypted' },
          { value: '⚡', label: 'Instant Code' },
          { value: '24/7', label: 'Self-Service', highlight: true },
        ]}
      >
        <div className="space-y-3.5 mb-8">
          {[
            { num: '01', title: 'Submit Registered Email', current: step === 'email' },
            { num: '02', title: 'Enter Verification Code', current: step === 'reset' },
            { num: '03', title: 'Create New Password', current: false },
          ].map((s) => (
            <div key={s.num} className="flex items-center gap-3.5 text-sm">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                  s.current ? 'bg-[#D9251D] text-white shadow' : 'bg-white/15 text-gray-300'
                }`}
              >
                {s.num}
              </div>
              <span className={`font-medium ${s.current ? 'text-white font-semibold' : 'text-gray-300'}`}>
                {s.title}
              </span>
            </div>
          ))}
        </div>
      </AuthBrandPanel>

      {/* Right Form Panel */}
      <div className="flex-1 flex flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-16 overflow-y-auto">
        <AuthHeader />

        <div className="w-full max-w-md mx-auto my-8">
          {/* Mobile Logo Header */}
          <div className="lg:hidden flex items-center gap-3 mb-6">
            <img src="/logo1.png" alt="Wollega University" className="w-10 h-10 rounded-full border border-gray-200" />
            <div>
              <div className="text-xs font-semibold text-[#00486E] font-heading">ወለጋ ዩኒቨርሲቲ</div>
              <div className="text-base font-extrabold text-[#D9251D] leading-none">WOLLEGA UNIVERSITY</div>
            </div>
          </div>

          <div className="mb-6">
            <span className="text-xs font-bold text-[#D9251D] uppercase tracking-wider block mb-1">
              ACCOUNT RECOVERY
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#00486E] font-heading">
              Reset Password
            </h1>
            <div className="flex items-center gap-1 mt-2 mb-2.5">
              <div className="h-1 w-10 bg-[#D9251D]" />
              <div className="h-1 w-16 bg-[#0073AA]" />
            </div>
            <p className="text-xs sm:text-sm text-[#555555]">
              {step === 'email'
                ? 'Enter your registered email address to receive a recovery verification code.'
                : 'Enter the 6-digit code sent to your email along with your new password.'}
            </p>
          </div>

          {step === 'email' ? (
            <form onSubmit={handleSendCode} className="space-y-4">
              <div>
                <Input
                  label="Registered Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="student@wu.edu.et"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0073AA] hover:bg-[#005C8A] text-white font-bold py-3 rounded-md shadow hover:shadow-md transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wider disabled:opacity-50 mt-2"
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span>Sending Code...</span>
                  </span>
                ) : (
                  <>
                    <span>Send Recovery Code</span>
                    <span className="text-xs">↗</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleReset} className="space-y-4">
              <div>
                <Input
                  label="6-Digit Verification Code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                  placeholder="e.g., 123456"
                />
              </div>

              <div className="relative">
                <Input
                  label="New Password"
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
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

              <div>
                <Input
                  label="Confirm New Password"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0073AA] hover:bg-[#005C8A] text-white font-bold py-3 rounded-md shadow hover:shadow-md transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wider disabled:opacity-50 mt-2"
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span>Resetting Password...</span>
                  </span>
                ) : (
                  <>
                    <span>Reset Password & Sign In</span>
                    <span className="text-xs">↗</span>
                  </>
                )}
              </button>
            </form>
          )}

          <div className="mt-6 text-center text-xs sm:text-sm text-[#666666] pt-4 border-t border-gray-200">
            <span>Remembered your password? </span>
            <Link to="/login" className="font-bold text-[#0073AA] hover:underline ml-1">
              Sign In to Portal ↗
            </Link>
          </div>
        </div>

        <div className="text-center text-xs text-gray-400 pt-4 border-t border-gray-200">
          <span>© {new Date().getFullYear()} Wollega University</span>
        </div>
      </div>
    </div>
  );
}
