import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface ModalSheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  variant?: 'drawer-right' | 'bottom-sheet' | 'modal';
  children: React.ReactNode;
}

export const ModalSheet: React.FC<ModalSheetProps> = ({
  open,
  onClose,
  title,
  subtitle,
  variant = 'drawer-right',
  children,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    previousFocusRef.current = document.activeElement as HTMLElement | null;

    const timer = window.setTimeout(() => {
      const container = containerRef.current;
      if (!container) return;
      const focusable = container.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      focusable?.focus();
    }, 30);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'Tab' && containerRef.current) {
        const focusables = Array.from(
          containerRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
      previousFocusRef.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  const panelClasses =
    variant === 'drawer-right'
      ? 'fixed inset-y-0 right-0 w-full max-w-md border-l border-[#35D5F2]/20'
      : variant === 'bottom-sheet'
        ? 'fixed inset-x-0 bottom-0 max-h-[85vh] rounded-t-[20px] border-t border-[#35D5F2]/25'
        : 'relative mx-auto my-auto w-full max-w-lg rounded-[18px] border border-[#35D5F2]/25';

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-[#000000]/82 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-sheet-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={containerRef}
        className={`flex flex-col bg-[#05080D] text-[#EAF4FF] shadow-[0_24px_64px_rgba(0,0,0,0.95)] overflow-hidden ${panelClasses}`}
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#102A43]/80 bg-[#0A1626]/35 px-6 py-4">
          <div>
            {subtitle && (
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#35D5F2] mb-1">
                {subtitle}
              </p>
            )}
            <h2 id="modal-sheet-title" className="font-display text-lg sm:text-xl font-semibold text-[#EAF4FF]">
              {title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close panel"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border border-[#35D5F2]/20 text-[#EAF4FF]/75 hover:bg-[#102A43] hover:text-[#EAF4FF] cursor-pointer"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
      </div>
    </div>
  );
};
