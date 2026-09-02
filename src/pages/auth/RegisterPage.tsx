import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '@/mocks/services';
import { useToast } from '@/components/ui/Toast';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import AuthBrandPanel from '@/components/auth/AuthBrandPanel';
import AuthHeader from '@/components/auth/AuthHeader';

const admissionOptions = [
  { value: 'regular', label: 'Regular (Day)' },
  { value: 'weekend', label: 'Weekend' },
  { value: 'night', label: 'Evening / Night' },
  { value: 'distance_summer', label: 'Distance / Summer' },
  { value: 'masters', label: 'Masters' },
  { value: 'phd', label: 'PhD' },
];

export default function RegisterPage() {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    nationalId: '',
    admissionType: 'regular',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!form.email.trim()) newErrors.email = 'Email address is required';
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
    if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!termsAccepted) {
      newErrors.terms = 'Please accept the university registration guidelines';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      await authService.register({
        email: form.email,
        password: form.password,
        fullName: form.fullName,
        phone: form.phone,
        admissionType: form.admissionType as any,
        nationalId: form.nationalId || undefined,
      });
      addToast('Registration successful! Please sign in.', 'success');
      navigate('/login');
    } catch {
      setErrors({ email: 'Registration failed. Email may already be in use.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col lg:flex-row font-sans">
      {/* Modular Left Brand Showcase with Admissions Stepper */}
      <AuthBrandPanel
        badgeText="2026/2027 Admissions Open"
        category="ONLINE ADMISSIONS 2026/27"
        title="Start Your Academic Journey at Wollega"
        description="Complete your self-registration online in four simple steps without waiting in campus lines."
        metrics={[
          { value: '3', label: 'Campuses' },
          { value: '120+', label: 'Programs' },
          { value: '100%', label: 'Paperless', highlight: true },
        ]}
      >
        <div className="space-y-3 mb-8">
          {[
            { num: '01', title: 'Create Account', current: true },
            { num: '02', title: 'Choose Program & Campus', current: false },
            { num: '03', title: 'Upload Digital Documents', current: false },
            { num: '04', title: 'Get Placement & Digital ID', current: false },
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

        <div className="w-full max-w-xl mx-auto my-8">
          {/* Mobile Logo Header */}
          <div className="lg:hidden flex items-center gap-3 mb-6">
            <img src="/logo1.png" alt="Wollega University" className="w-10 h-10 rounded-full border border-gray-200" />
            <div>
              <div className="text-xs font-semibold text-[#00486E] font-heading">ወለጋ ዩኒቨርሲቲ</div>
              <div className="text-base font-extrabold text-[#D9251D] leading-none">WOLLEGA UNIVERSITY</div>
            </div>
          </div>

          <div className="mb-5">
            <span className="text-xs font-bold text-[#D9251D] uppercase tracking-wider block mb-1">
              NEW APPLICANT
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#00486E] font-heading">
              Create Account
            </h1>
            <div className="flex items-center gap-1 mt-2 mb-2.5">
              <div className="h-1 w-10 bg-[#D9251D]" />
              <div className="h-1 w-16 bg-[#0073AA]" />
            </div>
            <p className="text-xs sm:text-sm text-[#555555]">
              Enter your details to begin your application.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="sm:col-span-2">
                <Input
                  label="Full Name"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  error={errors.fullName}
                  required
                  placeholder="e.g., Abebe Bikila"
                />
              </div>

              <div>
                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  error={errors.email}
                  required
                  placeholder="applicant@email.com"
                />
              </div>

              <div>
                <Input
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  required
                  placeholder="+251 9..."
                />
              </div>

              <div>
                <Input
                  label="National ID / Exam Ref"
                  name="nationalId"
                  value={form.nationalId}
                  onChange={handleChange}
                  placeholder="Optional reference"
                />
              </div>

              <div>
                <Select
                  label="Admission Type"
                  name="admissionType"
                  value={form.admissionType}
                  onChange={handleChange}
                  options={admissionOptions}
                />
              </div>

              <div>
                <div className="relative">
                  <Input
                    label="Password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={handleChange}
                    error={errors.password}
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
              </div>

              <div>
                <Input
                  label="Confirm Password"
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={form.confirmPassword}
                  onChange={handleChange}
                  error={errors.confirmPassword}
                  required
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="pt-1">
              <label className="flex items-center gap-2 text-xs text-[#555555] cursor-pointer">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="rounded border-gray-300 text-[#0073AA] focus:ring-[#0073AA]"
                />
                <span>I agree to the University Admissions Regulations.</span>
              </label>
              {errors.terms && <p className="text-xs text-danger mt-1">{errors.terms}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0073AA] hover:bg-[#005C8A] text-white font-bold py-3 rounded-md shadow hover:shadow-md transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wider disabled:opacity-50 mt-3"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <span>Creating Account...</span>
                </span>
              ) : (
                <>
                  <span>Create Account</span>
                  <span className="text-xs">↗</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-xs sm:text-sm text-[#666666] pt-4 border-t border-gray-200">
            <span>Already registered? </span>
            <Link to="/login" className="font-bold text-[#0073AA] hover:underline ml-1">
              Sign In ↗
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
