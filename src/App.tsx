import React, { Suspense, lazy, useEffect } from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  matchPath,
  useLocation,
} from 'react-router-dom';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { MissionLogDrawer } from './components/layout/MissionLogDrawer';
import { StarfieldBackground } from './components/ui/StarfieldBackground';
import { ToastContainer } from './components/ui/ToastContainer';
import { ProgressProvider } from './store/progressStore';

const HomePage = lazy(() =>
  import('./pages/HomePage').then((m) => ({ default: m.HomePage }))
);
const ComicLibraryPage = lazy(() =>
  import('./pages/ComicLibraryPage').then((m) => ({ default: m.ComicLibraryPage }))
);
const ComicReaderPage = lazy(() =>
  import('./pages/ComicReaderPage').then((m) => ({ default: m.ComicReaderPage }))
);
const ExploreIndexPage = lazy(() =>
  import('./pages/ExploreIndexPage').then((m) => ({ default: m.ExploreIndexPage }))
);
const ExploreDetailPage = lazy(() =>
  import('./pages/ExploreDetailPage').then((m) => ({ default: m.ExploreDetailPage }))
);
const MissionPage = lazy(() =>
  import('./pages/MissionPage').then((m) => ({ default: m.MissionPage }))
);
const AboutPage = lazy(() =>
  import('./pages/AboutPage').then((m) => ({ default: m.AboutPage }))
);
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage }))
);

const RouteFallback: React.FC = () => (
  <div className="relative z-10 mx-auto max-w-[1280px] min-h-[60vh] px-4 py-16 sm:px-6 lg:px-8">
    <div className="skeleton-navy h-10 w-64 rounded-[10px] mb-6" />
    <div className="skeleton-navy h-64 w-full rounded-[16px]" />
  </div>
);

const ScrollManager: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return null;
};

const AppShell: React.FC = () => {
  const location = useLocation();
  const isReaderRoute = Boolean(
    matchPath('/comic/:chapterSlug/:pageNumber', location.pathname)
  );

  return (
    <div className="relative min-h-screen flex flex-col bg-[#000000] text-[#EAF4FF]">
      <ScrollManager />

      {!isReaderRoute && <StarfieldBackground />}
      {!isReaderRoute && <Header />}

      {isReaderRoute ? (
        <div className="flex-1">
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/comic/:chapterSlug/:pageNumber" element={<ComicReaderPage />} />
            </Routes>
          </Suspense>
        </div>
      ) : (
        <main id="main-content" className="flex-1">
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/comic" element={<ComicLibraryPage />} />
              <Route path="/comic/:chapterSlug/quiz" element={<Navigate to="/comic" replace />} />
              <Route path="/science" element={<Navigate to="/" replace />} />
              <Route path="/science/*" element={<Navigate to="/" replace />} />
              <Route path="/explore" element={<ExploreIndexPage />} />
              <Route path="/explore/:slug" element={<ExploreDetailPage />} />
              <Route path="/mission" element={<MissionPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
      )}

      {!isReaderRoute && <Footer />}
      <MissionLogDrawer />
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <ProgressProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </ProgressProvider>
  );
}

export default App;
