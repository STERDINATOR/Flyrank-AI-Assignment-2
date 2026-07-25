import React from 'react';
import { Palette, Sun, Moon, Monitor, Check, Sparkles, Layers } from 'lucide-react';
import { UserSettings, ThemeMode, AccentColor } from '../types';
import { ACCENT_OPTIONS } from '../data/defaults';

interface AppearanceSectionProps {
  settings: UserSettings;
  onChange: (field: keyof UserSettings, value: any) => void;
}

export const AppearanceSection: React.FC<AppearanceSectionProps> = ({
  settings,
  onChange
}) => {
  const currentAccent = ACCENT_OPTIONS.find(a => a.id === settings.accentColor) || ACCENT_OPTIONS[0];

  const themeModes: { id: ThemeMode; label: string; icon: any; description: string }[] = [
    {
      id: 'light',
      label: 'Light',
      icon: Sun,
      description: 'Clean, crisp light theme with high contrast.'
    },
    {
      id: 'dark',
      label: 'Dark',
      icon: Moon,
      description: 'Dark canvas that reduces eye strain in low light.'
    },
    {
      id: 'system',
      label: 'System',
      icon: Monitor,
      description: 'Sync automatically with your device settings.'
    }
  ];

  const densityOptions: { id: 'compact' | 'comfortable' | 'spacious'; label: string; desc: string }[] = [
    { id: 'compact', label: 'Compact', desc: 'Dense data display for power users' },
    { id: 'comfortable', label: 'Comfortable', desc: 'Standard balanced spacing' },
    { id: 'spacious', label: 'Spacious', desc: 'Generous padding and relaxed layout' }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
          <Palette className="w-5 h-5 text-zinc-500" />
          Appearance & Theme
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Customize the visual theme, accent highlight colors, and layout density.
        </p>
      </div>

      {/* Theme Mode Selector */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-4">
        <label className="block text-sm font-semibold text-zinc-900 dark:text-white">
          Theme Mode
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {themeModes.map((mode) => {
            const Icon = mode.icon;
            const isSelected = settings.themeMode === mode.id;

            return (
              <button
                key={mode.id}
                type="button"
                id={`theme-mode-${mode.id}`}
                onClick={() => onChange('themeMode', mode.id)}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 relative flex flex-col justify-between ${
                  isSelected
                    ? `bg-zinc-50 dark:bg-zinc-800/80 ${currentAccent.borderClass} ring-2 ring-indigo-500/20`
                    : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-xl ${isSelected ? currentAccent.bgLight : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    {isSelected && (
                      <span className={`w-5 h-5 rounded-full ${currentAccent.colorClass} flex items-center justify-center`}>
                        <Check className="w-3 h-3 text-white" />
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
                    {mode.label}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    {mode.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Accent Color Selection */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-4">
        <div>
          <label className="block text-sm font-semibold text-zinc-900 dark:text-white">
            Accent Highlight Color
          </label>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Applies to active buttons, focused inputs, active tabs, and indicators.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {ACCENT_OPTIONS.map((accent) => {
            const isSelected = settings.accentColor === accent.id;

            return (
              <button
                key={accent.id}
                type="button"
                id={`accent-color-${accent.id}`}
                onClick={() => onChange('accentColor', accent.id)}
                className={`p-3 rounded-2xl border text-center transition-all duration-200 flex flex-col items-center gap-2 ${
                  isSelected
                    ? `bg-zinc-50 dark:bg-zinc-800 ${accent.borderClass} ring-2 ring-indigo-500/20 shadow-xs`
                    : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                }`}
              >
                <div
                  className="w-8 h-8 rounded-full shadow-sm flex items-center justify-center transition-transform hover:scale-110"
                  style={{ backgroundColor: accent.hex }}
                >
                  {isSelected && <Check className="w-4 h-4 text-white" />}
                </div>
                <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
                  {accent.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Density Selection */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-4">
        <label className="block text-sm font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
          <Layers className="w-4 h-4 text-zinc-500" />
          Interface Density
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {densityOptions.map((opt) => {
            const isSelected = settings.uiDensity === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                id={`density-${opt.id}`}
                onClick={() => onChange('uiDensity', opt.id)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? `bg-zinc-50 dark:bg-zinc-800/80 ${currentAccent.borderClass}`
                    : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                    {opt.label}
                  </span>
                  {isSelected && <Check className={`w-4 h-4 ${currentAccent.bgLight}`} />}
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {opt.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Preview Card */}
      <div className="bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800/60 rounded-2xl p-6 border border-zinc-200/80 dark:border-zinc-800">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
            Live Accent & Component Preview
          </h3>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-zinc-200 dark:border-zinc-800 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-zinc-400">Sample Card Header</span>
            <span className={`px-2 py-0.5 text-xs font-medium rounded-md ${currentAccent.bgLight}`}>
              Active Badge
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className={`px-3.5 py-1.5 text-xs font-medium rounded-xl ${currentAccent.colorClass}`}
            >
              Primary Button
            </button>
            <button
              type="button"
              className="px-3.5 py-1.5 text-xs font-medium rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              Secondary Button
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
