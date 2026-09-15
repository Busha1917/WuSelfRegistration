import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import { authService } from '@/mocks/services';
import { useToast } from '@/components/ui/Toast';
import DashboardHero from '@/components/shared/DashboardHero';

export default function ProfilePage() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { addToast } = useToast();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    fullName: user?.fullName || 'Alemayehu Bezabeh',
    fullNameAm: 'አለማየሁ በዛብህ',
    email: user?.email || 'student@wu.edu.et',
    phone: user?.phone || '+251-911-234-567',
    campus: 'Nekemte Main Campus',
    program: 'B.Sc. Software Engineering',
    emergencyContact: 'Tadesse Bezabeh (Father) • +251-922-345-678',
    nationalId: 'ET-ID-8891240',
  });
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });

  const handleSaveProfile = async () => {
    addToast('Student profile details updated successfully.', 'success');
    setEditing(false);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      addToast('Passwords do not match.', 'error');
      return;
    }
    await authService.changePassword(passwords.current, passwords.new);
    addToast('Security password changed successfully.', 'success');
    setPasswords({ current: '', new: '', confirm: '' });
  };

  return (
    <div className="space-y-6">
      {/* ─── Hero ─── */}
      <DashboardHero
        badge="USER CREDENTIALS & SECURITY"
        title={t('student.profile.title', 'Student Profile & Security Settings')}
        description="Review personal demographic records, update emergency contacts, manage portal security credentials, and view verified institutional information."
        stats={[
          { label: 'Role', value: 'Student' },
          { label: 'Account', value: 'Active', highlight: true },
          { label: 'Campus', value: 'Nekemte' },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Profile Info Form */}
        <div className="lg:col-span-8 bg-white border border-gray-200 rounded-sm p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <span className="text-xs font-bold text-[#0073AA] uppercase tracking-wider block">
                PRIMARY BIODATA
              </span>
              <h3 className="text-lg font-bold font-heading text-[#00486E]">
                Personal & Institutional Information
              </h3>
            </div>
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="bg-[#0073AA] hover:bg-[#005C8A] text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded transition-colors shadow-2xs"
              >
                Edit Profile
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSaveProfile}
                  className="bg-[#10B981] hover:bg-[#059669] text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded transition-colors"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold px-4 py-2 rounded transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-gray-700 uppercase tracking-wider text-[10px] block mb-1">
                Full English Legal Name
              </label>
              <input
                type="text"
                disabled={!editing}
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                className="w-full p-2.5 border border-gray-300 rounded bg-[#FAFBFD] disabled:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#0073AA]"
              />
            </div>

            <div>
              <label className="font-bold text-gray-700 uppercase tracking-wider text-[10px] block mb-1">
                Amharic Name / ሙሉ ስም በአማርኛ
              </label>
              <input
                type="text"
                disabled={!editing}
                value={form.fullNameAm}
                onChange={(e) => setForm({ ...form, fullNameAm: e.target.value })}
                className="w-full p-2.5 border border-gray-300 rounded bg-[#FAFBFD] disabled:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#0073AA]"
              />
            </div>

            <div>
              <label className="font-bold text-gray-700 uppercase tracking-wider text-[10px] block mb-1">
                University Institutional Email
              </label>
              <input
                type="email"
                disabled
                value={form.email}
                className="w-full p-2.5 border border-gray-300 rounded bg-gray-50 text-gray-600 font-mono"
              />
            </div>

            <div>
              <label className="font-bold text-gray-700 uppercase tracking-wider text-[10px] block mb-1">
                Active Contact Phone
              </label>
              <input
                type="tel"
                disabled={!editing}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full p-2.5 border border-gray-300 rounded bg-[#FAFBFD] disabled:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#0073AA]"
              />
            </div>

            <div>
              <label className="font-bold text-gray-700 uppercase tracking-wider text-[10px] block mb-1">
                Assigned University Campus
              </label>
              <input
                type="text"
                disabled
                value={form.campus}
                className="w-full p-2.5 border border-gray-300 rounded bg-gray-50 text-gray-600 font-semibold"
              />
            </div>

            <div>
              <label className="font-bold text-gray-700 uppercase tracking-wider text-[10px] block mb-1">
                Degree Program
              </label>
              <input
                type="text"
                disabled
                value={form.program}
                className="w-full p-2.5 border border-gray-300 rounded bg-gray-50 text-gray-600 font-semibold"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-bold text-gray-700 uppercase tracking-wider text-[10px] block mb-1">
                Emergency Guardian Contact
              </label>
              <input
                type="text"
                disabled={!editing}
                value={form.emergencyContact}
                onChange={(e) => setForm({ ...form, emergencyContact: e.target.value })}
                className="w-full p-2.5 border border-gray-300 rounded bg-[#FAFBFD] disabled:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#0073AA]"
              />
            </div>
          </div>
        </div>

        {/* Right: Security Settings */}
        <div className="lg:col-span-4 bg-white border border-gray-200 rounded-sm p-6 sm:p-8 shadow-xs space-y-4">
          <div className="pb-4 border-b border-gray-100">
            <span className="text-xs font-bold text-[#D9251D] uppercase tracking-wider block">
              PORTAL SECURITY
            </span>
            <h3 className="text-lg font-bold font-heading text-[#00486E]">
              Change Password
            </h3>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-gray-700 block mb-1">Current Password</label>
              <input
                type="password"
                required
                value={passwords.current}
                onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                className="w-full p-2.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0073AA]"
              />
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">New Secure Password</label>
              <input
                type="password"
                required
                value={passwords.new}
                onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                className="w-full p-2.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0073AA]"
              />
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">Confirm New Password</label>
              <input
                type="password"
                required
                value={passwords.confirm}
                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                className="w-full p-2.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0073AA]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#00486E] hover:bg-[#002B40] text-white font-bold py-2.5 px-4 rounded transition-colors text-xs uppercase tracking-wider shadow-xs mt-2"
            >
              Update Security Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
