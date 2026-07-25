import React, { useState } from 'react';
import { Sliders, Bell, Shield, Save, RotateCcw, AlertTriangle } from 'lucide-react';
import { UserSettings, AccentColor } from '../types';
import { ACCENT_OPTIONS } from '../data/defaults';

interface PreferencesSectionProps {
  settings: UserSettings;
  onChange: (field: keyof UserSettings, value: any) => void;
  onResetToDefaults: () => void;
  accentColor: AccentColor;
}

export const PreferencesSection: React.FC<PreferencesSectionProps> = ({
  settings,
  onChange,
  onResetToDefaults,
  accentColor
}) => {
  const [showResetModal, setShowResetModal] = useState(false);
  const currentAccent = ACCENT_OPTIONS.find(a => a.id === accentColor) || ACCENT_OPTIONS[0];

  const toggles = [
    {
      id: 'emailNotifications' as keyof UserSettings,
      title: 'Email Notifications',
      description: 'Receive weekly summaries and important activity digests.',
      icon: Bell,
      value: settings.emailNotifications
    },
    {
      id: 'securityAlerts' as keyof UserSettings,
      title: 'Security & Sign-in Alerts',
      description: 'Instant email alert when a new device logs into your account.',
      icon: Shield,
      value: settings.securityAlerts
    },
    {
      id: 'autoSave' as keyof UserSettings,
      title: 'Instant Auto-Save',
      description: 'Automatically sync unsaved settings as you type or change controls.',
      icon: Save,
      value: settings.autoSave
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
          <Sliders className="w-5 h-5 text-zinc-500" />
          Preferences & Controls
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Configure notification preferences and global application behaviors.
        </p>
      </div>

      {/* Preferences List */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-6">
        {toggles.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="flex items-center justify-between gap-4 pb-6 border-b border-zinc-100 dark:border-zinc-800/80 last:pb-0 last:border-none"
            >
              <div className="flex items-start gap-3.5">
                <div className={`p-2.5 rounded-xl ${currentAccent.bgLight} mt-0.5`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Toggle Switch */}
              <button
                type="button"
                id={`toggle-${item.id}`}
                onClick={() => onChange(item.id, !item.value)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                  item.value ? 'bg-indigo-600' : 'bg-zinc-200 dark:bg-zinc-700'
                }`}
              >
                <span className="sr-only">Toggle {item.title}</span>
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    item.value ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>

      {/* Danger Zone / Reset */}
      <div className="bg-rose-50/50 dark:bg-rose-950/20 rounded-2xl p-6 border border-rose-200/60 dark:border-rose-900/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-rose-900 dark:text-rose-200 flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-rose-500" />
              Reset Settings
            </h3>
            <p className="text-xs text-rose-700 dark:text-rose-400 mt-1">
              Restore all profile, theme, and timezone options back to factory defaults.
            </p>
          </div>

          <button
            type="button"
            id="btn-trigger-reset-modal"
            onClick={() => setShowResetModal(true)}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-rose-600 hover:bg-rose-700 text-white transition-colors flex-shrink-0"
          >
            Reset All
          </button>
        </div>
      </div>

      {/* Reset Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 max-w-md w-full border border-zinc-200 dark:border-zinc-800 shadow-xl space-y-4">
            <div className="flex items-center gap-3 text-rose-600 dark:text-rose-400">
              <div className="p-3 rounded-full bg-rose-100 dark:bg-rose-950/80">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                Reset all settings?
              </h3>
            </div>

            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              Are you sure you want to reset your profile name, email, theme mode, accent color, and timezone back to defaults?
            </p>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                id="btn-cancel-reset"
                onClick={() => setShowResetModal(false)}
                className="px-4 py-2 text-xs font-medium rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                Cancel
              </button>
              <button
                type="button"
                id="btn-confirm-reset"
                onClick={() => {
                  onResetToDefaults();
                  setShowResetModal(false);
                }}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-rose-600 hover:bg-rose-700 text-white"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
