import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { BADGE_DEFINITIONS } from '../data/badges';
import { getPublishedChapters } from '../data/comic';
import { NASA_TECHNOLOGY_ITEMS } from '../data/nasaTechnology';

const LEGACY_STORAGE_KEY = 'beyond_relics_progress_v1';
const STORAGE_KEY = 'beyond_relics_progress_v2';

export interface ProgressState {
  version: 2;
  lastRead: {
    chapterSlug: string;
    pageNumber: number;
  } | null;
  pagesReadByChapter: Record<string, number[]>;
  completedChapters: string[];
  discoveredNasaTechSlugs: string[];
  unlockedBadges: Record<string, string>;
}

export interface ToastItem {
  id: string;
  title: string;
  description: string;
}

const DEFAULT_STATE: ProgressState = {
  version: 2,
  lastRead: null,
  pagesReadByChapter: {},
  completedChapters: [],
  discoveredNasaTechSlugs: [],
  unlockedBadges: {},
};

const VALID_NASA_SLUGS = new Set(NASA_TECHNOLOGY_ITEMS.map((item) => item.slug));

function safeReadStorage(): ProgressState {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return DEFAULT_STATE;
    }

    // Remove legacy storage key that held quiz scores & science entries, preserving reading progress
    const legacyRaw = window.localStorage.getItem(LEGACY_STORAGE_KEY);
    if (legacyRaw) {
      try {
        const legacy = JSON.parse(legacyRaw) as {
          lastRead?: { chapterSlug: string; pageNumber: number } | null;
          pagesReadByChapter?: Record<string, number[]>;
          completedChapters?: string[];
        };
        const migrated: ProgressState = {
          version: 2,
          lastRead: legacy?.lastRead ?? null,
          pagesReadByChapter: legacy?.pagesReadByChapter ?? {},
          completedChapters: Array.isArray(legacy?.completedChapters) ? legacy.completedChapters : [],
          discoveredNasaTechSlugs: [],
          unlockedBadges: {},
        };
        const { updated } = evaluateBadges(migrated);
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Ignore malformed legacy payload
      }
      window.localStorage.removeItem(LEGACY_STORAGE_KEY);
    }

    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    if (!parsed || parsed.version !== 2) return DEFAULT_STATE;

    const filteredBadges: Record<string, string> = {};
    if (parsed.unlockedBadges) {
      const validIds = new Set(BADGE_DEFINITIONS.map((b) => b.id));
      for (const [id, date] of Object.entries(parsed.unlockedBadges)) {
        if (validIds.has(id) && typeof date === 'string') {
          filteredBadges[id] = date;
        }
      }
    }

    const filteredDiscovered = Array.isArray(parsed.discoveredNasaTechSlugs)
      ? parsed.discoveredNasaTechSlugs.filter((s) => VALID_NASA_SLUGS.has(s))
      : [];

    return {
      version: 2,
      lastRead: parsed.lastRead ?? null,
      pagesReadByChapter: parsed.pagesReadByChapter ?? {},
      completedChapters: Array.isArray(parsed.completedChapters) ? parsed.completedChapters : [],
      discoveredNasaTechSlugs: filteredDiscovered,
      unlockedBadges: filteredBadges,
    };
  } catch {
    return DEFAULT_STATE;
  }
}

function safeWriteStorage(state: ProgressState): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  } catch {
    // Storage unavailable or quota exceeded; continue gracefully in-memory
  }
}

function evaluateBadges(next: ProgressState): { updated: ProgressState; newlyUnlocked: string[] } {
  const now = new Date().toISOString();
  const unlocked = { ...next.unlockedBadges };
  const newlyUnlocked: string[] = [];

  const grant = (badgeId: string, condition: boolean) => {
    if (condition && !unlocked[badgeId]) {
      unlocked[badgeId] = now;
      newlyUnlocked.push(badgeId);
    }
  };

  const totalPagesRead = Object.values(next.pagesReadByChapter).reduce(
    (sum, pages) => sum + pages.length,
    0
  );

  grant('launch-ready', totalPagesRead >= 1 || next.lastRead !== null);
  grant('chapter-1-complete', next.completedChapters.includes('chapter-01'));
  grant('chapter-2-complete', next.completedChapters.includes('chapter-02'));
  grant('chapter-3-complete', next.completedChapters.includes('chapter-03'));
  grant(
    'cosmic-explorer',
    next.discoveredNasaTechSlugs.length >= NASA_TECHNOLOGY_ITEMS.length
  );

  return {
    updated: { ...next, unlockedBadges: unlocked },
    newlyUnlocked,
  };
}

interface ProgressContextValue {
  state: ProgressState;
  toasts: ToastItem[];
  dismissToast: (id: string) => void;
  isMissionLogOpen: boolean;
  setMissionLogOpen: (open: boolean) => void;
  recordPageRead: (chapterSlug: string, pageNumber: number) => void;
  markChapterCompleted: (chapterSlug: string) => void;
  recordNasaTechDiscovered: (slug: string) => void;
  resetProgress: () => void;
  getChapterProgress: (chapterSlug: string) => {
    pagesReadCount: number;
    totalPages: number;
    percent: number;
    isCompleted: boolean;
    lastPageInChapter: number;
  };
}

const ProgressContext = createContext<ProgressContextValue | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ProgressState>(() => safeReadStorage());
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [isMissionLogOpen, setMissionLogOpen] = useState(false);

  const pushBadgeToasts = useCallback((badgeIds: string[]) => {
    if (badgeIds.length === 0) return;
    const newToasts: ToastItem[] = badgeIds
      .map((id) => {
        const def = BADGE_DEFINITIONS.find((b) => b.id === id);
        if (!def) return null;
        return {
          id: `${id}-${Date.now()}`,
          title: `Badge Unlocked: ${def.title}`,
          description: def.description,
        };
      })
      .filter((t): t is ToastItem => t !== null);

    if (newToasts.length > 0) {
      setToasts((prev) => [...prev, ...newToasts]);
    }
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    if (toasts.length === 0) return;
    const timer = window.setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, 4500);
    return () => window.clearTimeout(timer);
  }, [toasts]);

  const applyUpdate = useCallback(
    (updater: (prev: ProgressState) => ProgressState) => {
      setState((prev) => {
        const candidate = updater(prev);
        const { updated, newlyUnlocked } = evaluateBadges(candidate);
        safeWriteStorage(updated);
        if (newlyUnlocked.length > 0) {
          queueMicrotask(() => pushBadgeToasts(newlyUnlocked));
        }
        return updated;
      });
    },
    [pushBadgeToasts]
  );

  const recordPageRead = useCallback(
    (chapterSlug: string, pageNumber: number) => {
      const chapter = getPublishedChapters().find((c) => c.slug === chapterSlug);
      if (!chapter) return;
      applyUpdate((prev) => {
        const existingPages = prev.pagesReadByChapter[chapterSlug] ?? [];
        const nextPages = existingPages.includes(pageNumber)
          ? existingPages
          : [...existingPages, pageNumber].sort((a, b) => a - b);

        const reachedLastPage = pageNumber >= chapter.pages.length;
        const completedAll =
          (nextPages.length >= chapter.pages.length || reachedLastPage) &&
          !prev.completedChapters.includes(chapterSlug);

        return {
          ...prev,
          lastRead: { chapterSlug, pageNumber },
          pagesReadByChapter: {
            ...prev.pagesReadByChapter,
            [chapterSlug]: nextPages,
          },
          completedChapters: completedAll
            ? [...prev.completedChapters, chapterSlug]
            : prev.completedChapters,
        };
      });
    },
    [applyUpdate]
  );

  const markChapterCompleted = useCallback(
    (chapterSlug: string) => {
      applyUpdate((prev) => {
        if (prev.completedChapters.includes(chapterSlug)) return prev;
        return {
          ...prev,
          completedChapters: [...prev.completedChapters, chapterSlug],
        };
      });
    },
    [applyUpdate]
  );

  const recordNasaTechDiscovered = useCallback(
    (slug: string) => {
      if (!VALID_NASA_SLUGS.has(slug)) return;
      applyUpdate((prev) => {
        if (prev.discoveredNasaTechSlugs.includes(slug)) return prev;
        return {
          ...prev,
          discoveredNasaTechSlugs: [...prev.discoveredNasaTechSlugs, slug],
        };
      });
    },
    [applyUpdate]
  );

  const resetProgress = useCallback(() => {
    setState(DEFAULT_STATE);
    safeWriteStorage(DEFAULT_STATE);
    try {
      window.localStorage.removeItem(LEGACY_STORAGE_KEY);
    } catch {
      // ignore
    }
    setToasts([
      {
        id: `reset-${Date.now()}`,
        title: 'Mission Log Cleared',
        description: 'Local reading progress, discovered items, and badges have been reset.',
      },
    ]);
  }, []);

  const getChapterProgress = useCallback(
    (chapterSlug: string) => {
      const chapter = getPublishedChapters().find((c) => c.slug === chapterSlug);
      const totalPages = chapter?.pages.length ?? 0;
      const rawPagesRead = state.pagesReadByChapter[chapterSlug] ?? [];
      const pagesRead = rawPagesRead.filter((p) => p >= 1 && p <= totalPages);
      const pagesReadCount = pagesRead.length;
      const percent = totalPages > 0 ? Math.min(100, Math.round((pagesReadCount / totalPages) * 100)) : 0;
      const isCompleted = state.completedChapters.includes(chapterSlug);
      const rawLastPage =
        state.lastRead?.chapterSlug === chapterSlug
          ? state.lastRead.pageNumber
          : pagesRead.length > 0
            ? pagesRead[pagesRead.length - 1]
            : 1;
      const lastPageInChapter =
        totalPages > 0 ? Math.min(totalPages, Math.max(1, rawLastPage)) : 1;
      return {
        pagesReadCount,
        totalPages,
        percent,
        isCompleted,
        lastPageInChapter,
      };
    },
    [state]
  );

  return (
    <ProgressContext.Provider
      value={{
        state,
        toasts,
        dismissToast,
        isMissionLogOpen,
        setMissionLogOpen,
        recordPageRead,
        markChapterCompleted,
        recordNasaTechDiscovered,
        resetProgress,
        getChapterProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return ctx;
}
