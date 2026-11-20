import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Library,
  Maximize2,
  Menu,
  Minimize2,
  RotateCcw,
  X,
} from 'lucide-react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { getChapterBySlug, getPublishedChapters } from '../data/comic';
import { useProgress } from '../store/progressStore';
import { exitBrowserFullscreen } from '../utils/readerLaunch';
import { usePageMeta } from '../utils/seo';

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;

export const ComicReaderPage: React.FC = () => {
  const { chapterSlug = 'chapter-01', pageNumber: pageParam = '1' } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { recordPageRead, markChapterCompleted } = useProgress();

  const originPath =
    (location.state as { from?: string } | null)?.from &&
    !(location.state as { from?: string }).from?.startsWith('/comic/')
      ? (location.state as { from: string }).from
      : '/comic';

  const chapters = useMemo(() => getPublishedChapters(), []);
  const chapter = getChapterBySlug(chapterSlug) ?? chapters[0];
  const totalPages = chapter.pages.length;

  const parsedPage = Number.parseInt(pageParam, 10);
  const currentPageNum =
    Number.isFinite(parsedPage) && parsedPage >= 1 && parsedPage <= totalPages
      ? parsedPage
      : 1;
  const currentPage = chapter.pages[currentPageNum - 1];

  usePageMeta({
    title: `Chapter ${chapter.number} · ${currentPageNum} / ${totalPages} — BEYOND RELICS`,
    description: `Read BEYOND RELICS Chapter ${chapter.number}, Page ${currentPageNum} of ${totalPages}.`,
    path: `/comic/${chapter.slug}/${currentPageNum}`,
  });

  const stageRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const [controlsActive, setControlsActive] = useState(true);
  const [imageReady, setImageReady] = useState(false);
  const [turnDirection, setTurnDirection] = useState<'next' | 'prev' | 'none'>('none');
  const [page1Nudge, setPage1Nudge] = useState(false);

  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDraggingPan, setIsDraggingPan] = useState(false);
  const [isNativeFullscreen, setIsNativeFullscreen] = useState(() =>
    Boolean(typeof document !== 'undefined' && document.fullscreenElement)
  );

  const [menuOpen, setMenuOpen] = useState(false);
  const [jumpInput, setJumpInput] = useState(String(currentPageNum));
  const [closingCardOpen, setClosingCardOpen] = useState(false);

  // Refs for gesture math & clean non-passive listeners
  const zoomRef = useRef(zoom);
  const panRef = useRef(pan);
  zoomRef.current = zoom;
  panRef.current = pan;

  const panStartRef = useRef<{
    x: number;
    y: number;
    origX: number;
    origY: number;
    moved: boolean;
  } | null>(null);
  const swipeStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const pinchRef = useRef<{
    startDist: number;
    startZoom: number;
    startPanX: number;
    startPanY: number;
    startMidX: number;
    startMidY: number;
  } | null>(null);
  const lastTapTimeRef = useRef(0);
  const hideTimerRef = useRef<number | null>(null);

  const nextChapter = useMemo(() => {
    const idx = chapters.findIndex((c) => c.slug === chapter.slug);
    return idx >= 0 && idx + 1 < chapters.length ? chapters[idx + 1] : null;
  }, [chapters, chapter.slug]);

  const prevChapter = useMemo(() => {
    const idx = chapters.findIndex((c) => c.slug === chapter.slug);
    return idx > 0 ? chapters[idx - 1] : null;
  }, [chapters, chapter.slug]);

  // Clamp pan so image remains well within the stage viewport
  const clampPan = useCallback((targetPan: { x: number; y: number }, targetZoom: number) => {
    if (targetZoom <= 1.01) return { x: 0, y: 0 };
    const stage = stageRef.current;
    const img = imgRef.current;
    if (!stage || !img) return targetPan;

    const stageRect = stage.getBoundingClientRect();
    const baseW = img.offsetWidth || stageRect.width;
    const baseH = img.offsetHeight || stageRect.height;
    const scaledW = baseW * targetZoom;
    const scaledH = baseH * targetZoom;

    const maxOffsetX = Math.max(0, (scaledW - stageRect.width) / 2);
    const maxOffsetY = Math.max(0, (scaledH - stageRect.height) / 2);

    return {
      x: Math.min(maxOffsetX, Math.max(-maxOffsetX, targetPan.x)),
      y: Math.min(maxOffsetY, Math.max(-maxOffsetY, targetPan.y)),
    };
  }, []);

  const resetZoom = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const zoomAroundPoint = useCallback(
    (nextZoomRaw: number, clientX: number, clientY: number) => {
      const stage = stageRef.current;
      const clampedZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, nextZoomRaw));
      if (clampedZoom <= 1.01) {
        setZoom(1);
        setPan({ x: 0, y: 0 });
        return;
      }
      if (!stage) {
        setZoom(clampedZoom);
        return;
      }
      const rect = stage.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const offsetX = clientX - cx;
      const offsetY = clientY - cy;

      const curZoom = zoomRef.current;
      const curPan = panRef.current;
      const ratio = clampedZoom / curZoom;

      const nextPan = clampPan(
        {
          x: offsetX - (offsetX - curPan.x) * ratio,
          y: offsetY - (offsetY - curPan.y) * ratio,
        },
        clampedZoom
      );

      setZoom(clampedZoom);
      setPan(nextPan);
    },
    [clampPan]
  );

  // Sync canonical URL if invalid page param was given
  useEffect(() => {
    if (String(currentPageNum) !== pageParam || chapter.slug !== chapterSlug) {
      navigate(`/comic/${chapter.slug}/${currentPageNum}`, {
        replace: true,
        state: location.state,
      });
    }
  }, [chapter.slug, chapterSlug, currentPageNum, location.state, navigate, pageParam]);

  // Decode current image cleanly before revealing to prevent mid-render flash
  useEffect(() => {
    let cancelled = false;
    setImageReady(false);
    setJumpInput(String(currentPageNum));
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setClosingCardOpen(false);
    recordPageRead(chapter.slug, currentPageNum);

    const img = new Image();
    img.src = currentPage.imagePath;

    const reveal = () => {
      if (!cancelled) setImageReady(true);
    };

    if (typeof img.decode === 'function') {
      img
        .decode()
        .then(reveal)
        .catch(() => {
          if (img.complete) reveal();
        });
    }
    img.onload = reveal;

    return () => {
      cancelled = true;
    };
  }, [chapter.slug, currentPage.imagePath, currentPageNum, recordPageRead]);

  // Preload 2 pages ahead (+1, +2, crossing chapter boundary) and 1 page behind (-1)
  useEffect(() => {
    const orderedPages: string[] = [];
    chapters.forEach((ch) => {
      ch.pages.forEach((p) => orderedPages.push(p.imagePath));
    });

    const currentIdx = orderedPages.findIndex((p) => p === currentPage.imagePath);
    if (currentIdx === -1) return;

    const candidateIndices = [currentIdx - 1, currentIdx + 1, currentIdx + 2];
    const seen = new Set<string>();

    candidateIndices.forEach((idx) => {
      if (idx >= 0 && idx < orderedPages.length) {
        const src = orderedPages[idx];
        if (!seen.has(src)) {
          seen.add(src);
          const preloadImg = new Image();
          preloadImg.src = src;
          if (typeof preloadImg.decode === 'function') {
            preloadImg.decode().catch(() => {});
          }
        }
      }
    });
  }, [chapters, currentPage.imagePath]);

  // Auto-fade controls after ~3s inactivity (Exit stays >= 50% opacity via CSS)
  const wakeControls = useCallback(() => {
    if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    setControlsActive(true);
    if (menuOpen || closingCardOpen) return;
    hideTimerRef.current = window.setTimeout(() => {
      setControlsActive(false);
    }, 3000);
  }, [closingCardOpen, menuOpen]);

  useEffect(() => {
    wakeControls();
    return () => {
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    };
  }, [wakeControls, currentPageNum]);

  // Re-clamp pan on window resize / orientation change
  useEffect(() => {
    const onResize = () => {
      if (zoomRef.current > 1.01) {
        setPan((prev) => clampPan(prev, zoomRef.current));
      }
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
    };
  }, [clampPan]);

  // Sync native fullscreen indicator (leaving fullscreen via Esc keeps immersive reader open)
  useEffect(() => {
    const onFsChange = () => {
      setIsNativeFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  const toggleNativeFullscreen = useCallback(() => {
    const docEl = document.documentElement as HTMLElement & {
      webkitRequestFullscreen?: () => Promise<void>;
    };
    if (!document.fullscreenElement) {
      if (typeof docEl.requestFullscreen === 'function') {
        docEl.requestFullscreen().catch(() => {});
      } else if (typeof docEl.webkitRequestFullscreen === 'function') {
        docEl.webkitRequestFullscreen().catch(() => {});
      }
    } else {
      exitBrowserFullscreen();
    }
  }, []);

  const handleExitReader = useCallback(() => {
    exitBrowserFullscreen();
    navigate(originPath);
  }, [navigate, originPath]);

  const goToPage = useCallback(
    (targetChapterSlug: string, page: number, dir: 'next' | 'prev' | 'none' = 'none') => {
      setTurnDirection(dir);
      setClosingCardOpen(false);
      setMenuOpen(false);
      navigate(`/comic/${targetChapterSlug}/${page}`, { state: location.state });
    },
    [location.state, navigate]
  );

  const handlePrev = useCallback(() => {
    if (closingCardOpen) {
      setClosingCardOpen(false);
      return;
    }
    if (currentPageNum > 1) {
      goToPage(chapter.slug, currentPageNum - 1, 'prev');
    } else if (prevChapter) {
      goToPage(prevChapter.slug, prevChapter.pages.length, 'prev');
    } else {
      setPage1Nudge(true);
      window.setTimeout(() => setPage1Nudge(false), 220);
    }
  }, [chapter.slug, closingCardOpen, currentPageNum, goToPage, prevChapter]);

  const handleNext = useCallback(() => {
    if (currentPageNum < totalPages) {
      goToPage(chapter.slug, currentPageNum + 1, 'next');
    } else {
      markChapterCompleted(chapter.slug);
      if (nextChapter) {
        goToPage(nextChapter.slug, 1, 'next');
      } else {
        setClosingCardOpen(true);
        setControlsActive(true);
      }
    }
  }, [
    chapter.slug,
    currentPageNum,
    goToPage,
    markChapterCompleted,
    nextChapter,
    totalPages,
  ]);

  // Non-passive wheel zoom + trackpad ctrlKey pinch zoom toward cursor
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      wakeControls();
      const intensity = e.ctrlKey ? 0.012 : 0.0022;
      const factor = Math.exp(-e.deltaY * intensity);
      zoomAroundPoint(zoomRef.current * factor, e.clientX, e.clientY);
    };

    stage.addEventListener('wheel', onWheel, { passive: false });
    return () => stage.removeEventListener('wheel', onWheel);
  }, [wakeControls, zoomAroundPoint]);

  // Keyboard navigation & shortcuts
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        if (e.key === 'Escape') {
          setMenuOpen(false);
        }
        return;
      }

      wakeControls();

      switch (e.key) {
        case 'Escape':
          if (menuOpen) {
            e.preventDefault();
            setMenuOpen(false);
          } else if (closingCardOpen) {
            e.preventDefault();
            setClosingCardOpen(false);
          } else if (zoomRef.current > 1.01) {
            e.preventDefault();
            resetZoom();
          }
          break;
        case 'ArrowRight':
        case 'PageDown':
        case ' ':
          if (menuOpen) return;
          e.preventDefault();
          handleNext();
          break;
        case 'ArrowLeft':
        case 'PageUp':
          if (menuOpen) return;
          e.preventDefault();
          handlePrev();
          break;
        case 'Home':
          if (menuOpen) return;
          e.preventDefault();
          goToPage(chapter.slug, 1, 'prev');
          break;
        case 'End':
          if (menuOpen) return;
          e.preventDefault();
          goToPage(chapter.slug, totalPages, 'next');
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          toggleNativeFullscreen();
          break;
        case '+':
        case '=':
          e.preventDefault();
          setZoom((z) => {
            const next = Math.min(MAX_ZOOM, +(z + 0.5).toFixed(2));
            return next;
          });
          break;
        case '-':
        case '_':
          e.preventDefault();
          setZoom((z) => {
            const next = Math.max(MIN_ZOOM, +(z - 0.5).toFixed(2));
            if (next <= 1.01) {
              setPan({ x: 0, y: 0 });
              return 1;
            }
            setPan((prev) => clampPan(prev, next));
            return next;
          });
          break;
        case '0':
          e.preventDefault();
          resetZoom();
          break;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [
    chapter.slug,
    clampPan,
    closingCardOpen,
    goToPage,
    handleNext,
    handlePrev,
    menuOpen,
    resetZoom,
    toggleNativeFullscreen,
    totalPages,
    wakeControls,
  ]);

  // Pointer drag pan while zoomed
  const handleStagePointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return;
    wakeControls();
    if (zoom <= 1.01) return;
    setIsDraggingPan(true);
    panStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      origX: pan.x,
      origY: pan.y,
      moved: false,
    };
  };

  const handleStagePointerMove = (e: React.PointerEvent) => {
    wakeControls();
    if (e.pointerType === 'touch' || !isDraggingPan || !panStartRef.current) return;
    const dx = e.clientX - panStartRef.current.x;
    const dy = e.clientY - panStartRef.current.y;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
      panStartRef.current.moved = true;
    }
    setPan(
      clampPan(
        {
          x: panStartRef.current.origX + dx,
          y: panStartRef.current.origY + dy,
        },
        zoom
      )
    );
  };

  const handleStagePointerUp = () => {
    setIsDraggingPan(false);
    panStartRef.current = null;
  };

  // Touch pinch-zoom, zoomed pan, and swipe-to-turn
  const handleTouchStart = (e: React.TouchEvent) => {
    wakeControls();
    if (e.touches.length === 2) {
      const t0 = e.touches[0];
      const t1 = e.touches[1];
      const dist = Math.hypot(t0.clientX - t1.clientX, t0.clientY - t1.clientY);
      pinchRef.current = {
        startDist: Math.max(1, dist),
        startZoom: zoomRef.current,
        startPanX: panRef.current.x,
        startPanY: panRef.current.y,
        startMidX: (t0.clientX + t1.clientX) / 2,
        startMidY: (t0.clientY + t1.clientY) / 2,
      };
      swipeStartRef.current = null;
      panStartRef.current = null;
      return;
    }

    if (e.touches.length === 1) {
      const now = Date.now();
      if (now - lastTapTimeRef.current < 280 && zoomRef.current > 1.01) {
        // Double-tap ONLY resets zoom when already zoomed in (never zooms in at 100%)
        resetZoom();
        lastTapTimeRef.current = 0;
        swipeStartRef.current = null;
        return;
      }
      lastTapTimeRef.current = now;

      if (zoomRef.current > 1.01) {
        panStartRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
          origX: panRef.current.x,
          origY: panRef.current.y,
          moved: false,
        };
        swipeStartRef.current = null;
      } else {
        swipeStartRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
          time: now,
        };
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && pinchRef.current && stageRef.current) {
      const t0 = e.touches[0];
      const t1 = e.touches[1];
      const dist = Math.hypot(t0.clientX - t1.clientX, t0.clientY - t1.clientY);
      const midX = (t0.clientX + t1.clientX) / 2;
      const midY = (t0.clientY + t1.clientY) / 2;

      const scaleFactor = dist / pinchRef.current.startDist;
      const nextZoom = Math.min(
        MAX_ZOOM,
        Math.max(MIN_ZOOM, pinchRef.current.startZoom * scaleFactor)
      );

      if (nextZoom <= 1.01) {
        setZoom(1);
        setPan({ x: 0, y: 0 });
        return;
      }

      const rect = stageRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const startOffX = pinchRef.current.startMidX - cx;
      const startOffY = pinchRef.current.startMidY - cy;
      const zoomRatio = nextZoom / pinchRef.current.startZoom;

      const nextPan = clampPan(
        {
          x:
            midX -
            pinchRef.current.startMidX +
            startOffX -
            (startOffX - pinchRef.current.startPanX) * zoomRatio,
          y:
            midY -
            pinchRef.current.startMidY +
            startOffY -
            (startOffY - pinchRef.current.startPanY) * zoomRatio,
        },
        nextZoom
      );

      setZoom(nextZoom);
      setPan(nextPan);
      return;
    }

    if (e.touches.length === 1 && zoomRef.current > 1.01 && panStartRef.current) {
      const dx = e.touches[0].clientX - panStartRef.current.x;
      const dy = e.touches[0].clientY - panStartRef.current.y;
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
        panStartRef.current.moved = true;
      }
      setPan(
        clampPan(
          {
            x: panStartRef.current.origX + dx,
            y: panStartRef.current.origY + dy,
          },
          zoomRef.current
        )
      );
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (pinchRef.current && e.touches.length < 2) {
      pinchRef.current = null;
    }
    panStartRef.current = null;

    if (swipeStartRef.current && e.changedTouches.length === 1 && zoomRef.current <= 1.01) {
      const dx = e.changedTouches[0].clientX - swipeStartRef.current.x;
      const dy = e.changedTouches[0].clientY - swipeStartRef.current.y;
      const dt = Date.now() - swipeStartRef.current.time;
      if (dt < 500 && Math.abs(dx) >= 50 && Math.abs(dx) > Math.abs(dy) * 1.25) {
        if (dx < 0) handleNext();
        else handlePrev();
      }
      swipeStartRef.current = null;
    }
  };

  const handleJumpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = Number.parseInt(jumpInput, 10);
    if (Number.isFinite(num) && num >= 1 && num <= totalPages) {
      goToPage(chapter.slug, num);
    } else {
      setJumpInput(String(currentPageNum));
    }
  };

  const isZoomed = zoom > 1.01;
  const chapterProgressPercent =
    totalPages > 1 ? ((currentPageNum - 1) / (totalPages - 1)) * 100 : 100;

  return (
    <div
      onMouseMove={wakeControls}
      className="fixed inset-0 z-[70] flex h-[100dvh] w-full flex-col overflow-hidden bg-[#000000] text-[#EAF4FF] select-none"
    >
      {/* Screen-reader live region */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Chapter {chapter.number}: {chapter.title}, Page {currentPageNum} of {totalPages}.{' '}
        {currentPage?.alt}
      </div>

      {/* Reserved Minimal Top Band — NEVER overlaps comic artwork */}
      <header
        className="relative z-30 shrink-0 bg-[#000000] pt-[env(safe-area-inset-top)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]"
      >
        <div className="flex h-10 sm:h-11 landscape:h-8 sm:landscape:h-10 items-center justify-between px-3 sm:px-5">
          {/* Left: Menu */}
          <div
            className={`flex items-center gap-2 transition-opacity duration-300 ${
              controlsActive || menuOpen ? 'opacity-100' : 'opacity-25 hover:opacity-100'
            }`}
          >
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-label="Open chapter and page menu"
              className="inline-flex h-8 sm:h-9 landscape:h-7 sm:landscape:h-8 items-center gap-1.5 rounded-[8px] px-2.5 text-xs font-medium text-[#EAF4FF]/90 hover:bg-[#0A1626] hover:text-[#35D5F2] transition-colors cursor-pointer"
            >
              <Menu className="h-4 w-4" aria-hidden="true" />
              <span>Menu</span>
            </button>
          </div>

          {/* Center: Quiet mono counter + conditional 100% reset button when zoomed */}
          <div
            className={`flex items-center gap-2.5 transition-opacity duration-300 ${
              controlsActive || isZoomed || menuOpen
                ? 'opacity-100'
                : 'opacity-25 hover:opacity-100'
            }`}
          >
            <span className="font-mono text-xs sm:text-[13px] text-[#EAF4FF]/80 tabular-nums tracking-wide">
              {currentPageNum} / {totalPages}
            </span>

            {isZoomed && (
              <button
                type="button"
                onClick={resetZoom}
                aria-label="Reset zoom to 100%"
                className="inline-flex h-7 items-center gap-1 rounded-[6px] border border-[#35D5F2]/35 bg-[#0A1626] px-2 font-mono text-[11px] text-[#35D5F2] hover:bg-[#102A43] cursor-pointer"
              >
                <RotateCcw className="h-3 w-3" aria-hidden="true" />
                <span>100%</span>
              </button>
            )}
          </div>

          {/* Right: Fullscreen toggle (subtle) + Exit (always >= 50% opacity) */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={toggleNativeFullscreen}
              aria-label={isNativeFullscreen ? 'Leave browser fullscreen' : 'Enter browser fullscreen'}
              className={`hidden sm:inline-flex h-8 w-8 items-center justify-center rounded-[8px] text-[#EAF4FF]/70 hover:bg-[#0A1626] hover:text-[#35D5F2] transition-all duration-300 cursor-pointer ${
                controlsActive || menuOpen ? 'opacity-100' : 'opacity-25 hover:opacity-100'
              }`}
            >
              {isNativeFullscreen ? (
                <Minimize2 className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
              )}
            </button>

            <button
              type="button"
              onClick={handleExitReader}
              aria-label="Exit comic reader"
              className={`inline-flex h-8 sm:h-9 landscape:h-7 sm:landscape:h-8 items-center gap-1.5 rounded-[8px] px-2.5 text-xs font-medium text-[#EAF4FF] hover:bg-[#0A1626] hover:text-[#35D5F2] transition-opacity duration-300 cursor-pointer ${
                controlsActive || menuOpen ? 'opacity-100' : 'opacity-55 hover:opacity-100'
              }`}
            >
              <span>Exit</span>
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* 2px Hairline Progress Line */}
        <div className="h-[2px] w-full bg-[#102A43]/80" aria-hidden="true">
          <div
            className="h-full bg-gradient-to-r from-[#1677FF] to-[#35D5F2] transition-all duration-200"
            style={{ width: `${chapterProgressPercent}%` }}
          />
        </div>
      </header>

      {/* Main Immersive Stage */}
      <main
        ref={stageRef}
        onPointerDown={handleStagePointerDown}
        onPointerMove={handleStagePointerMove}
        onPointerUp={handleStagePointerUp}
        onPointerLeave={handleStagePointerUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onDoubleClick={() => {
          // Double-click resets zoom ONLY while zoomed in (never zooms in at 100%)
          if (isZoomed) resetZoom();
        }}
        style={{ touchAction: 'none', overscrollBehavior: 'none' }}
        className={`relative flex-1 flex items-center justify-center overflow-hidden bg-[#000000] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] ${
          isZoomed ? (isDraggingPan ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'
        }`}
      >
        {/* Left/Right Tap Zones (disabled when zoomed or closing card active) */}
        {!isZoomed && !closingCardOpen && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label={
                currentPageNum > 1
                  ? 'Previous comic page'
                  : prevChapter
                    ? `Previous chapter (${prevChapter.title})`
                    : 'First page of comic'
              }
              className="group absolute inset-y-0 left-0 z-10 w-1/2 flex items-center justify-start pl-3 sm:pl-6 bg-transparent focus-visible:outline-none cursor-pointer"
            >
              <span
                className={`hidden md:flex h-10 w-10 items-center justify-center rounded-full border border-[#35D5F2]/25 bg-[#05080D]/80 text-[#EAF4FF] transition-opacity duration-200 ${
                  currentPageNum > 1 || prevChapter ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'
                }`}
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label={
                currentPageNum < totalPages
                  ? 'Next comic page'
                  : nextChapter
                    ? `Continue to Chapter ${nextChapter.number}`
                    : 'Finish comic'
              }
              className="group absolute inset-y-0 right-0 z-10 w-1/2 flex items-center justify-end pr-3 sm:pr-6 bg-transparent focus-visible:outline-none cursor-pointer"
            >
              <span className="hidden md:flex h-10 w-10 items-center justify-center rounded-full border border-[#35D5F2]/25 bg-[#05080D]/80 text-[#EAF4FF] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </span>
            </button>
          </>
        )}

        {/* Quiet dark shimmer only while image decodes */}
        {!imageReady && (
          <div
            className="skeleton-navy absolute h-[68vh] w-[min(86vw,520px)] rounded-[4px]"
            aria-hidden="true"
          />
        )}

        {/* Artwork Stage — zero border, zero shadow, zero frame, pure natural aspect ratio */}
        <div
          className={`flex h-full w-full items-center justify-center ${
            isDraggingPan ? '' : 'transition-transform duration-150 ease-out'
          } ${page1Nudge ? '-translate-x-1.5' : ''}`}
          style={{
            transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
          }}
        >
          <img
            ref={imgRef}
            key={currentPage.imagePath}
            src={currentPage.imagePath}
            alt={currentPage.alt}
            draggable={false}
            className={`max-h-full max-w-full w-auto h-auto object-contain transition-all duration-200 ease-out ${
              imageReady
                ? 'opacity-100 translate-x-0'
                : turnDirection === 'next'
                  ? 'opacity-0 translate-x-2'
                  : turnDirection === 'prev'
                    ? 'opacity-0 -translate-x-2'
                    : 'opacity-0'
            }`}
          />
        </div>

        {/* End of Last Published Chapter Closing Card (ONLY Back to library & Back to Home) */}
        {closingCardOpen && (
          <div
            className="absolute inset-0 z-30 flex items-center justify-center bg-[#000000]/88 backdrop-blur-md p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="reader-end-heading"
          >
            <Card className="w-full max-w-md p-6 sm:p-8 border-[#35D5F2]/30 text-center">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#35D5F2]">
                End of Chapter {chapter.number}
              </p>
              <h2
                id="reader-end-heading"
                className="mt-2 font-display text-2xl sm:text-3xl font-semibold text-[#EAF4FF]"
              >
                {chapter.title}
              </h2>
              <p className="mt-3 text-sm text-[#EAF4FF]/72 leading-relaxed">
                You have reached the latest published page of BEYOND RELICS. More chapters are in production.
              </p>

              <div className="mt-6 flex flex-col gap-3">
                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => {
                    exitBrowserFullscreen();
                    navigate('/comic');
                  }}
                >
                  <Library className="h-4 w-4" aria-hidden="true" />
                  <span>Back to library</span>
                </Button>

                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full"
                  onClick={() => {
                    exitBrowserFullscreen();
                    navigate('/');
                  }}
                >
                  <Home className="h-4 w-4 text-[#35D5F2]" aria-hidden="true" />
                  <span>Back to Home</span>
                </Button>

                <button
                  type="button"
                  onClick={() => setClosingCardOpen(false)}
                  className="mt-1 py-1.5 text-xs text-[#EAF4FF]/55 hover:text-[#35D5F2] cursor-pointer"
                >
                  Return to Page {currentPageNum}
                </button>
              </div>
            </Card>
          </div>
        )}
      </main>

      {/* Compact Overlay Menu Panel (Chapters, Jump-to-Page, Thumbnail Grid) */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 flex items-start justify-start bg-[#000000]/75 backdrop-blur-sm pt-[calc(env(safe-area-inset-top)+44px)] p-3 sm:p-5"
          onClick={() => setMenuOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Reader menu"
        >
          <div
            className="w-full max-w-xl max-h-[calc(100dvh-72px)] overflow-y-auto rounded-[16px] border border-[#35D5F2]/25 bg-[#05080D] p-4 sm:p-5 shadow-[0_20px_60px_rgba(0,0,0,0.9)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-[#35D5F2]/12 pb-3">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#35D5F2]">
                  Chapter {chapter.number} · {chapter.title}
                </p>
                <h2 className="font-display text-lg font-semibold text-[#EAF4FF]">
                  Chapters &amp; Pages
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="inline-flex h-9 w-9 items-center justify-center rounded-[8px] border border-[#35D5F2]/20 text-[#EAF4FF]/80 hover:bg-[#102A43] hover:text-[#35D5F2] cursor-pointer"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {/* Chapter Switcher + Jump-to-page */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                {chapters.map((ch) => {
                  const active = ch.slug === chapter.slug;
                  return (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => goToPage(ch.slug, 1)}
                      className={`h-9 rounded-[9px] border px-3 text-xs font-medium transition-colors cursor-pointer ${
                        active
                          ? 'border-[#35D5F2] bg-[#102A43] text-[#35D5F2]'
                          : 'border-[#35D5F2]/20 bg-[#0A1626]/60 text-[#EAF4FF]/80 hover:border-[#35D5F2]/45'
                      }`}
                    >
                      Ch. {ch.number}: {ch.title}
                    </button>
                  );
                })}
              </div>

              <form onSubmit={handleJumpSubmit} className="flex items-center gap-1.5">
                <label
                  htmlFor="reader-jump-input"
                  className="font-mono text-[11px] text-[#EAF4FF]/65"
                >
                  Page
                </label>
                <input
                  id="reader-jump-input"
                  type="number"
                  min={1}
                  max={totalPages}
                  value={jumpInput}
                  onChange={(e) => setJumpInput(e.target.value)}
                  className="h-9 w-14 rounded-[8px] border border-[#35D5F2]/25 bg-[#000000] px-2 text-center font-mono text-xs text-[#EAF4FF] tabular-nums focus:border-[#35D5F2]"
                />
                <button
                  type="submit"
                  className="h-9 rounded-[8px] bg-[#1677FF] px-3 text-xs font-medium text-[#EAF4FF] hover:bg-[#2383FF] cursor-pointer"
                >
                  Go
                </button>
              </form>
            </div>

            {/* Thumbnails per chapter */}
            <div className="mt-5 space-y-5">
              {chapters.map((ch) => (
                <div key={ch.id}>
                  <div className="mb-2.5 flex items-center justify-between">
                    <h3 className="font-display text-sm font-semibold text-[#EAF4FF]">
                      Chapter {ch.number}: {ch.title}
                    </h3>
                    <span className="font-mono text-[11px] text-[#EAF4FF]/55 tabular-nums">
                      {ch.pages.length} pages
                    </span>
                  </div>

                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5">
                    {ch.pages.map((p) => {
                      const isCurrent =
                        ch.slug === chapter.slug && p.pageNumber === currentPageNum;
                      return (
                        <button
                          key={`${ch.slug}-${p.pageNumber}`}
                          type="button"
                          onClick={() => goToPage(ch.slug, p.pageNumber)}
                          className={`group flex flex-col overflow-hidden rounded-[8px] border text-left transition-all cursor-pointer ${
                            isCurrent
                              ? 'border-[#35D5F2] bg-[#102A43]'
                              : 'border-[#35D5F2]/15 bg-[#000000] hover:border-[#35D5F2]/45'
                          }`}
                        >
                          <div className="aspect-[3/4] w-full overflow-hidden bg-[#000000] p-0.5">
                            <img
                              src={p.imagePath}
                              alt={p.alt}
                              loading="lazy"
                              className="h-full w-full object-contain"
                            />
                          </div>
                          <span
                            className={`px-1.5 py-1 font-mono text-[10px] tabular-nums ${
                              isCurrent ? 'text-[#35D5F2] font-medium' : 'text-[#EAF4FF]/70'
                            }`}
                          >
                            P.{p.pageNumber}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
