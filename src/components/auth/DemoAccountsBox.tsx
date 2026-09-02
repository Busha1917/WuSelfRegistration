export interface DemoAccount {
  role: string;
  email: string;
  desc: string;
  icon: string;
}

const defaultDemoAccounts: DemoAccount[] = [
  { role: 'Student', email: 'student@wu.edu.et', desc: 'Application, ID Card, Section', icon: '🎓' },
  { role: 'Registrar', email: 'registrar@wu.edu.et', desc: 'Queue review & placement', icon: '📋' },
  { role: 'Admin', email: 'admin@wu.edu.et', desc: 'Users, imports & configs', icon: '⚙️' },
  { role: 'Management', email: 'management@wu.edu.et', desc: 'Analytics & university reports', icon: '📊' },
  { role: 'Council', email: 'council@wu.edu.et', desc: 'Freshman assist desk', icon: '🤝' },
];

interface DemoAccountsBoxProps {
  currentEmail: string;
  selectedRole: string | null;
  onSelect: (email: string, role: string) => void;
  accounts?: DemoAccount[];
}

export default function DemoAccountsBox({
  currentEmail,
  selectedRole,
  onSelect,
  accounts = defaultDemoAccounts,
}: DemoAccountsBoxProps) {
  return (
    <div className="mt-8 bg-[#F4F6F8] border border-gray-200 rounded-md p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-[#00486E] uppercase tracking-wider flex items-center gap-1.5">
          <span>⚡</span>
          <span>Quick Demo Access (1-Click Fill)</span>
        </span>
        <span className="text-[11px] text-gray-500 font-mono">password: password</span>
      </div>

      <div className="space-y-1.5">
        {accounts.map((acc) => {
          const isSelected = selectedRole === acc.role || currentEmail === acc.email;
          return (
            <button
              key={acc.email}
              type="button"
              onClick={() => onSelect(acc.email, acc.role)}
              className={`w-full text-left px-3 py-2 rounded text-xs transition-all flex items-center justify-between border ${
                isSelected
                  ? 'bg-white border-[#0073AA] text-[#00486E] shadow-sm font-semibold'
                  : 'bg-white/60 border-transparent hover:bg-white text-[#444444]'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm">{acc.icon}</span>
                <span className="font-bold text-[#00486E]">{acc.role}:</span>
                <span className="text-gray-500 hidden sm:inline">{acc.email}</span>
              </div>
              <span className="text-[10px] text-[#0073AA] font-medium">Click to fill</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
