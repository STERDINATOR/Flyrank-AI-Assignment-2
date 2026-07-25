import React, { forwardRef } from 'react';
import { Sun, Moon, Monitor, AlertCircle, Check } from 'lucide-react';
import { ThemeType } from '../../lib/validations/settingsSchema';

interface ThemeRadioGroupProps {
  id: string;
  value: ThemeType;
  onChange: (value: ThemeType) => void;
  error?: string;
  name?: string;
}

export const ThemeRadioGroup = forwardRef<HTMLDivElement, ThemeRadioGroupProps>(
  ({ id, value, onChange, error, name = 'theme' }, ref) => {
    const errorId = `${id}-error`;

    const options: { id: ThemeType; label: string; icon: React.FC<{ className?: string }>; description: string }[] = [
      {
        id: 'light',
        label: 'Light',
        icon: Sun,
        description: 'Clean light background with high contrast',
      },
      {
        id: 'dark',
        label: 'Dark',
        icon: Moon,
        description: 'Dark canvas for low light environments',
      },
      {
        id: 'system',
        label: 'System',
        icon: Monitor,
        description: 'Syncs automatically with device settings',
      },
    ];

    return (
      <div ref={ref} className="space-y-2">
        <span id={`${id}-label`} className="block text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Theme Preference
          <span className="text-rose-500 ml-1" aria-hidden="true">*</span>
        </span>

        <div
          role="radiogroup"
          aria-labelledby={`${id}-label`}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3"
        >
          {options.map((option) => {
            const Icon = option.icon;
            const isChecked = value === option.id;
            const inputId = `${id}-${option.id}`;

            return (
              <label
                key={option.id}
                htmlFor={inputId}
                className={`relative flex flex-col justify-between p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${
                  isChecked
                    ? 'bg-indigo-50/60 dark:bg-indigo-950/40 border-indigo-600 dark:border-indigo-500 ring-2 ring-indigo-500/30'
                    : 'bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`p-2 rounded-xl ${
                      isChecked
                        ? 'bg-indigo-600 text-white'
                        : 'bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <input
                    type="radio"
                    id={inputId}
                    name={name}
                    value={option.id}
                    checked={isChecked}
                    onChange={() => onChange(option.id)}
                    className="sr-only"
                  />

                  {isChecked && (
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                </div>

                <div>
                  <span className="block text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {option.label}
                  </span>
                  <span className="block text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    {option.description}
                  </span>
                </div>
              </label>
            );
          })}
        </div>

        {error && (
          <p
            id={errorId}
            role="alert"
            className="text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1 font-medium animate-fadeIn mt-1"
          >
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
            <span>{error}</span>
          </p>
        )}
      </div>
    );
  }
);

ThemeRadioGroup.displayName = 'ThemeRadioGroup';
