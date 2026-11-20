import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Award, Menu, X } from 'lucide-react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useProgress } from '../../store/progressStore';
import { launchImmersiveReader } from '../../utils/readerLaunch';
import { BrandWordmark } from '../ui/BrandWordmark';
import { Button } from '../ui/Button';

const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'The Comic', to: '/comic' },
  { label: 'Explore', to: '/explore' },
  { label: 'Our Mission', to: '/mission' },
  { label: 'About Us', to: '/about' },
];

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { state, setMissionLogOpen } = useProgress();
  const location = useLocation();
  const navigate = useNavigate();
  const mobileOverlayRef = useRef<HTMLDivElement | null>(null);

  const unlockedCount = Object.keys(state.unlockedBadges).length;
  const readComicTarget = state.lastRead
    ? `/comic/${state.lastRead.chapterSlug}/${state.lastRead.pageNumber}`
    : '/comic/chapter-01/1';

  const handleOpenReader = (e?: React.MouseEvent) => {
    e?.preventDefault();
    setMobileOpen(false);
    launchImmersiveReader(navigate, readComicTarget, location.pathname);
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 18);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const timer = window.setTimeout(() => {
      const firstFocusable = mobileOverlayRef.current?.querySelector<HTMLElement>('button, a');
      firstFocusable?.focus();
    }, 30);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setMobileOpen(false);
        return;
      }
      if (e.key === 'Tab' && mobileOverlayRef.current) {
        const focusables = Array.from(
          mobileOverlayRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), a[href]'
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

    document.addEventListener('keydown', onKeyDown);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [mobileOpen]);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[#1677FF] focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-[#EAF4FF] focus:shadow-lg"
      >
        Skip to main content
      </a>

      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? 'border-b border-[#EAF4FF]/10 bg-[#05080D]/88 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.65)]'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 sm:h-[72px] max-w-[1280px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            aria-label="BEYOND RELICS Home"
            className="rounded-full px-1 py-1 focus-visible:outline-2 focus-visible:outline-[#35D5F2] shrink-0"
          >
            <BrandWordmark />
          </Link>

          {/* Slim dark glass navigation cluster */}
          <nav
            aria-label="Primary navigation"
            className="hidden lg:flex items-center gap-1.5 rounded-full border border-[#EAF4FF]/14 bg-[#05080D]/75 px-2.5 py-1 backdrop-blur-md"
          >
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `relative rounded-full px-3.5 py-1.5 text-xs xl:text-sm font-medium whitespace-nowrap shrink-0 transition-all duration-200 ${
                    isActive
                      ? 'bg-[#0A1626] text-[#35D5F2] shadow-[inset_0_0_0_1px_rgba(53,213,242,0.32)]'
                      : 'text-[#EAF4FF]/76 hover:text-[#EAF4FF] hover:bg-[#0A1626]/60'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{item.label}</span>
                    {isActive && (
                      <span
                        className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-[#35D5F2] shadow-[0_0_8px_rgba(53,213,242,0.7)]"
                        aria-hidden="true"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setMissionLogOpen(true)}
              aria-label={`Open Mission Log (${unlockedCount} badges unlocked)`}
              className="relative inline-flex h-10 min-w-[42px] items-center justify-center gap-2 rounded-full border border-[#EAF4FF]/15 bg-[#05080D]/80 px-3.5 text-xs sm:text-sm font-medium text-[#EAF4FF] backdrop-blur-md hover:border-[#35D5F2]/50 hover:bg-[#0A1626] transition-all cursor-pointer"
            >
              <Award className="h-4 w-4 text-[#35D5F2]" aria-hidden="true" />
              <span className="hidden sm:inline whitespace-nowrap">Mission Log</span>
              {unlockedCount > 0 && (
                <span className="font-mono text-xs tabular-nums text-[#35D5F2]">
                  {unlockedCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={handleOpenReader}
              className="hidden sm:inline-flex h-10 items-center gap-2 rounded-full border border-[#1677FF]/70 bg-[#1677FF] px-4 text-xs sm:text-sm font-medium text-[#EAF4FF] whitespace-nowrap shrink-0 transition-all duration-200 hover:bg-[#2383FF] hover:shadow-[0_0_20px_rgba(22,119,255,0.45)] cursor-pointer"
            >
              <span>Read the Comic</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#EAF4FF]/16 bg-[#05080D]/80 text-[#EAF4FF] hover:bg-[#0A1626] lg:hidden cursor-pointer"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen navigation overlay */}
      {mobileOpen && (
        <div
          ref={mobileOverlayRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="fixed inset-0 z-[75] flex flex-col bg-[#000000]/98 backdrop-blur-lg p-6 lg:hidden"
        >
          <div className="flex items-center justify-between border-b border-[#EAF4FF]/12 pb-4">
            <BrandWordmark />
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation menu"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#EAF4FF]/20 text-[#EAF4FF] hover:bg-[#0A1626] cursor-pointer"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Mobile links" className="mt-6 flex flex-1 flex-col gap-2.5">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `flex min-h-[52px] items-center justify-between rounded-full border px-5 text-lg font-display font-medium transition-colors ${
                    isActive
                      ? 'border-[#35D5F2]/50 bg-[#0A1626] text-[#35D5F2]'
                      : 'border-transparent text-[#EAF4FF] hover:bg-[#05080D]'
                  }`
                }
              >
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-3 border-t border-[#EAF4FF]/12 pt-5">
            <Button
              size="lg"
              className="w-full rounded-full"
              onClick={handleOpenReader}
            >
              Read the Comic
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="w-full rounded-full"
              onClick={() => {
                setMobileOpen(false);
                setMissionLogOpen(true);
              }}
            >
              <Award className="h-4 w-4 text-[#35D5F2]" aria-hidden="true" />
              <span>Open Mission Log</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
