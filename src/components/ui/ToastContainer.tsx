import React from 'react';
import { Award, X } from 'lucide-react';
import { useProgress } from '../../store/progressStore';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useProgress();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-label="Notifications"
      className="pointer-events-none fixed bottom-5 right-5 z-[90] flex flex-col gap-3 max-w-sm w-[calc(100vw-2.5rem)]"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="status"
          className="pointer-events-auto flex items-start gap-3 rounded-[14px] border border-[#35D5F2]/35 bg-[#0A1626]/95 p-4 shadow-[0_12px_36px_rgba(5,8,13,0.75),0_0_24px_rgba(53,213,242,0.16)] backdrop-blur-md transition-all duration-300"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#35D5F2]/30 bg-[#102A43] text-[#35D5F2]">
            <Award className="h-4 w-4" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-display text-sm font-semibold text-[#EAF4FF]">{toast.title}</p>
            <p className="mt-0.5 text-xs text-[#EAF4FF]/72 leading-relaxed">{toast.description}</p>
          </div>
          <button
            type="button"
            onClick={() => dismissToast(toast.id)}
            aria-label="Dismiss notification"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[#EAF4FF]/60 hover:bg-[#102A43] hover:text-[#EAF4FF] cursor-pointer"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      ))}
    </div>
  );
};
