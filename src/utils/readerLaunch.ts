import { NavigateFunction } from 'react-router-dom';

/**
 * Triggers native browser Fullscreen API inside the user's click gesture
 * (falling back gracefully to the 100dvh immersive stage when unsupported)
 * and navigates directly to the target comic reader route.
 */
export function launchImmersiveReader(
  navigate: NavigateFunction,
  targetPath: string,
  fromPath?: string
): void {
  try {
    const docEl = document.documentElement as HTMLElement & {
      webkitRequestFullscreen?: () => Promise<void>;
    };
    if (!document.fullscreenElement) {
      if (typeof docEl.requestFullscreen === 'function') {
        docEl.requestFullscreen().catch(() => {
          // Graceful fallback to 100dvh immersive overlay when blocked/unsupported
        });
      } else if (typeof docEl.webkitRequestFullscreen === 'function') {
        docEl.webkitRequestFullscreen().catch(() => {
          // Graceful fallback
        });
      }
    }
  } catch {
    // Graceful fallback
  }

  navigate(targetPath, {
    state: fromPath ? { from: fromPath } : undefined,
  });
}

export function exitBrowserFullscreen(): void {
  try {
    const doc = document as Document & {
      webkitExitFullscreen?: () => Promise<void>;
      webkitFullscreenElement?: Element | null;
    };
    if (document.fullscreenElement && typeof document.exitFullscreen === 'function') {
      document.exitFullscreen().catch(() => {});
    } else if (doc.webkitFullscreenElement && typeof doc.webkitExitFullscreen === 'function') {
      doc.webkitExitFullscreen().catch(() => {});
    }
  } catch {
    // ignore
  }
}
