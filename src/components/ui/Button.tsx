import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'destructive' | 'outline' | 'aauPrimary' | 'aauNavy' | 'aauRed' | 'white' | 'whiteOutline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const variants = {
  primary: 'bg-[#0073AA] text-white hover:bg-[#005C8A] shadow-sm',
  secondary: 'bg-[#00486E] text-white hover:bg-[#003855] shadow-sm',
  tertiary: 'bg-[#D9251D] text-white hover:bg-[#B71C1C] shadow-sm',
  ghost: 'bg-transparent text-gray-700 hover:bg-gray-100',
  destructive: 'bg-danger text-white hover:bg-red-700 shadow-sm',
  outline: 'border-2 border-[#0073AA] text-[#0073AA] hover:bg-[#0073AA]/10',
  aauPrimary: 'bg-[#0073AA] text-white hover:bg-[#005C8A] shadow-sm',
  aauNavy: 'bg-[#00486E] text-white hover:bg-[#003855] shadow-sm',
  aauRed: 'bg-[#D9251D] text-white hover:bg-[#B71C1C] shadow-sm',
  white: 'bg-white text-[#00486E] hover:bg-gray-100 shadow-sm font-semibold',
  whiteOutline: 'border-2 border-white text-white hover:bg-white/10 shadow-sm font-semibold',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  className = '',
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  );
}
