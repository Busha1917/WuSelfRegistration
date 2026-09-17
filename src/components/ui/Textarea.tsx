import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export default function Textarea({ label, error, className = '', id, ...props }: TextareaProps) {
  const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={textareaId} className="block text-xs sm:text-sm font-extrabold text-[#002B40] mb-1.5">
          <span>{label}</span>
          {props.required && <span className="text-[#D9251D] ml-1 font-bold">*</span>}
        </label>
      )}
      <textarea
        id={textareaId}
        className={`w-full px-3 py-2 border rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-wu-gold focus:border-wu-gold ${
          error ? 'border-danger' : 'border-gray-300'
        } bg-white min-h-[80px] resize-y ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-danger">{error}</p>}
    </div>
  );
}
