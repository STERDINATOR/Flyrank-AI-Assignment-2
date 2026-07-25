import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { ToastState } from '../../hooks/useToast';

interface ToastNotificationProps {
  toast: ToastState | null;
  onClose: () => void;
  autoHideDuration?: number;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({
  toast,
  onClose,
  autoHideDuration = 4000,
}) => {
  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      onClose();
    }, autoHideDuration);

    return () => clearTimeout(timer);
  }, [toast, onClose, autoHideDuration]);

  if (!toast) return null;

  const isError = toast.type === 'error';
  const isSuccess = toast.type === 'success';

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-6 right-6 z-50 max-w-sm w-full px-4 animate-slideUp"
    >
      <div
        role={isError ? 'alert' : 'status'}
        className={`rounded-2xl p-4 shadow-xl border flex items-center justify-between gap-3 ${
          isSuccess
            ? 'bg-emerald-900/95 text-white border-emerald-700'
            : isError
            ? 'bg-rose-900/95 text-white border-rose-700'
            : 'bg-zinc-900/95 text-white border-zinc-700'
        }`}
      >
        <div className="flex items-center gap-3">
          {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" aria-hidden="true" />}
          {isError && <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" aria-hidden="true" />}
          {!isSuccess && !isError && <Info className="w-5 h-5 text-indigo-400 flex-shrink-0" aria-hidden="true" />}
          <p className="text-sm font-medium">{toast.message}</p>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss notification"
          className="text-zinc-400 hover:text-white p-1 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
