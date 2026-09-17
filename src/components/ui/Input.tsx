import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export default function Input({ label, error, helperText, className = '', id, ...props }: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-xs sm:text-sm font-extrabold text-[#002B40] mb-1.5">
          <span>{label}</span>
          {props.required && <span className="text-[#D9251D] ml-1 font-bold">*</span>}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full px-3.5 py-2.5 border rounded-md text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#0073AA] focus:border-[#0073AA] ${
          error ? 'border-danger' : 'border-gray-300'
        } bg-white ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-danger">{error}</p>}
      {helperText && !error && <p className="mt-1 text-sm text-neutral">{helperText}</p>}
    </div>
  );
}
