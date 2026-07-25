import React from 'react';
import { Settings, Save, Check } from 'lucide-react';
import { UserSettings, AccentColor } from '../types';
import { ACCENT_OPTIONS } from '../data/defaults';

interface HeaderProps {
  settings: UserSettings;
  hasUnsavedChanges: boolean;
  onSave: () => void;
  accentColor: AccentColor;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  hasUnsavedChanges,
  onSave,
  accentColor
}) => {
  const currentAccent = ACCENT_OPTIONS.find(a => a.id === accentColor) || ACCENT_OPTIONS[0];

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Title & App Branding */}
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-2xl ${currentAccent.bgLight} shadow-2xs`}>
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white tracking-tight">
              Account Settings
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 hidden sm:block">
              Manage your personal preferences, theme mode, and timezone.
            </p>
          </div>
        </div>

        {/* User Card & Header Save Button */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3 px-3 py-1.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800">
            <img
              src={settings.avatarUrl}
              alt={settings.name}
              className="w-7 h-7 rounded-lg object-cover"
            />
            <div className="text-left">
              <p className="text-xs font-semibold text-zinc-900 dark:text-white leading-tight">
                {settings.name || 'User'}
              </p>
              <p className="text-[10px] text-zinc-400 truncate max-w-[120px]">
                {settings.email || 'alex@example.com'}
              </p>
            </div>
          </div>

          <button
            type="button"
            id="btn-header-save"
            onClick={onSave}
            disabled={!hasUnsavedChanges}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 ${
              hasUnsavedChanges
                ? `${currentAccent.colorClass} shadow-sm hover:scale-[1.02]`
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 cursor-not-allowed'
            }`}
          >
            {hasUnsavedChanges ? <Save className="w-3.5 h-3.5" /> : <Check className="w-3.5 h-3.5" />}
            <span>{hasUnsavedChanges ? 'Save Changes' : 'Saved'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
