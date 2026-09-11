import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ label, className = '', ...props }: InputProps) {
  return (
    <label className="block text-sm font-semibold text-slate-700">
      <span className="block mb-1">{label}</span>
      <input
        className={`w-full p-2.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-900 ${className}`}
        {...props}
      />
    </label>
  );
}