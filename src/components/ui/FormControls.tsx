import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  containerClassName?: string;
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, id, containerClassName = "flex items-center gap-2", className, ...props }, ref) => {
    return (
      <div className={containerClassName}>
        {label && <label htmlFor={id} className="text-sm font-medium text-slate-700">{label}</label>}
        <input
          ref={ref}
          id={id}
          className={`border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all ${className}`}
          {...props}
        />
      </div>
    );
  }
);

InputField.displayName = 'InputField';

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
  containerClassName?: string;
}

export const SelectField = React.forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, id, options, containerClassName = "flex items-center gap-2", className, ...props }, ref) => {
    return (
      <div className={containerClassName}>
        {label && <label htmlFor={id} className="text-sm font-medium text-slate-700">{label}</label>}
        <select
          ref={ref}
          id={id}
          className={`appearance-none border border-slate-300 rounded-md px-4 py-2 text-center bg-white hover:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-200 transition-all cursor-pointer font-medium text-slate-700 shadow-sm ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="py-2">
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

SelectField.displayName = 'SelectField';
