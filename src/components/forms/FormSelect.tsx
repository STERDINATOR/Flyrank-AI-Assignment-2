import React, { forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  options: Option[];
  error?: string;
  helperText?: string;
  required?: boolean;
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ id, label, options, error, helperText, required, className = '', ...props }, ref) => {
    const errorId = `${id}-error`;
    const helperId = `${id}-helper`;

    const describedBy = [
      error ? errorId : null,
      helperText ? helperId : null,
    ]
      .filter(Boolean)
      .join(' ') || undefined;

    return (
      <div className="space-y-1.5">
        <label
          htmlFor={id}
          className="block text-sm font-semibold text-zinc-900 dark:text-zinc-100"
        >
          {label}
          {required && <span className="text-rose-500 ml-1" aria-hidden="true">*</span>}
        </label>

        <select
          ref={ref}
          id={id}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          required={required}
          className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 dark:focus:ring-offset-zinc-900 ${
            error
              ? 'border-rose-500 focus:ring-rose-500/80 focus:border-rose-500'
              : 'border-zinc-300 dark:border-zinc-700 focus:ring-indigo-500/80 focus:border-indigo-500'
          } ${className}`}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {helperText && !error && (
          <p id={helperId} className="text-xs text-zinc-500 dark:text-zinc-400">
            {helperText}
          </p>
        )}

        {error && (
          <p
            id={errorId}
            role="alert"
            className="text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1 font-medium animate-fadeIn"
          >
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
            <span>{error}</span>
          </p>
        )}
      </div>
    );
  }
);

FormSelect.displayName = 'FormSelect';
