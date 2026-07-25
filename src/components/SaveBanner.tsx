import React from 'react';
import { AlertCircle, Check, Undo2 } from 'lucide-react';
import { AccentColor } from '../types';
import { ACCENT_OPTIONS } from '../data/defaults';

interface SaveBannerProps {
  hasUnsavedChanges: boolean;
  onSave: () => void;
  onDiscard: () => void;
  accentColor: AccentColor;
}

export const SaveBanner: React.FC<SaveBannerProps> = ({
  hasUnsavedChanges,
  onSave,
  onDiscard,
  accentColor
}) => {
  if (!hasUnsavedChanges) return null;

  const currentAccent = ACCENT_OPTIONS.find(a => a.id === accentColor) || ACCENT_OPTIONS[0];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-xl px-4 animate-slideUp">
      <div className="bg-zinc-900 text-white dark:bg-zinc-800 rounded-2xl p-4 border border-zinc-700/80 shadow-2xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400" />
            <span className="text-xs sm:text-sm font-semibold text-zinc-100">
              Careful — you have unsaved changes!
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            id="btn-discard-changes"
            onClick={onDiscard}
            className="px-3 py-1.5 rounded-xl text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 dark:hover:bg-zinc-700 transition-colors flex items-center gap-1"
          >
            <Undo2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Discard</span>
          </button>

          <button
            type="button"
            id="btn-save-changes-banner"
            onClick={onSave}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold ${currentAccent.colorClass} shadow-sm flex items-center gap-1.5`}
          >
            <Check className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
};
