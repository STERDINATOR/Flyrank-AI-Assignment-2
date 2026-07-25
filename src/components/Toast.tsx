import React, { useEffect } from 'react';
import { CheckCircle2, X, AlertCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'success',
  onClose,
  duration = 3000
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="fixed top-6 right-6 z-50 animate-slideDown max-w-sm w-full">
      <div
        className={`rounded-2xl p-4 shadow-xl border flex items-center justify-between gap-3 ${
          type === 'success'
            ? 'bg-emerald-900 text-white border-emerald-700'
            : type === 'error'
            ? 'bg-rose-900 text-white border-rose-700'
            : 'bg-zinc-900 text-white border-zinc-700'
        }`}
      >
        <div className="flex items-center gap-3">
          {type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
          )}
          <p className="text-xs sm:text-sm font-medium">{message}</p>
        </div>

        <button
          type="button"
          id="btn-close-toast"
          onClick={onClose}
          className="text-zinc-400 hover:text-white p-1 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
