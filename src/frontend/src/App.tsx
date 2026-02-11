import { useState, useEffect, useCallback } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HomeHeroSection } from './components/sections/HomeHeroSection';
import { HomeProcessionSection } from './components/sections/HomeProcessionSection';
import { AuditionsSection } from './components/sections/AuditionsSection';
import { HauntedHousesSection } from './components/sections/HauntedHousesSection';
import { ClownTownInteriorElevationSection } from './components/sections/ClownTownInteriorElevationSection';
import { SchoolhouseSneakPeekSection } from './components/sections/SchoolhouseSneakPeekSection';
import { ShowsSection } from './components/sections/ShowsSection';
import { UpcomingEventsSection } from './components/sections/UpcomingEventsSection';
import { FoodBoothsSection } from './components/sections/FoodBoothsSection';
import { MerchShopsSection } from './components/sections/MerchShopsSection';
import { ScareZonesSection } from './components/sections/ScareZonesSection';
import { InfoLocationSection } from './components/sections/InfoLocationSection';
import { TeaserSection } from './components/sections/TeaserSection';
import { Teaser2027Section } from './components/sections/Teaser2027Section';
import { SiteHeader } from './components/layout/SiteHeader';
import { SiteFooter } from './components/layout/SiteFooter';
import { HorrorBackground } from './components/theme/HorrorBackground';
import { BackgroundAudioManager } from './components/audio/BackgroundAudioManager';
import { SchoolhouseSneakPeekPage } from './pages/SchoolhouseSneakPeekPage';
import { ClownTownSneakPeekPage } from './pages/ClownTownSneakPeekPage';
import { HellHoleSneakPeekPage } from './pages/HellHoleSneakPeekPage';
import { SliderDoomPage } from './pages/SliderDoomPage';
import { SharksHellPage } from './pages/SharksHellPage';
import { LaserHellPage } from './pages/LaserHellPage';
import { CmsPage } from './pages/CmsPage';
import { CalendarPage } from './pages/CalendarPage';
import { ProfileSetupModal } from './components/auth/ProfileSetupModal';
import { Toaster } from '@/components/ui/sonner';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

function AppContent() {
  const [currentRoute, setCurrentRoute] = useState('');
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [requestStartCallback, setRequestStartCallback] = useState<(() => void) | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      setCurrentRoute(hash);
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleAutoplayBlockedChange = useCallback((blocked: boolean) => {
    setAutoplayBlocked(blocked);
  }, []);

  const handleRequestStart = useCallback((callback: () => void) => {
    setRequestStartCallback(() => callback);
  }, []);

  const handleEnableSound = useCallback(() => {
    if (requestStartCallback) {
      requestStartCallback();
    }
  }, [requestStartCallback]);

  const renderPage = () => {
    if (currentRoute === '#/schoolhouse') {
      return <SchoolhouseSneakPeekPage />;
    }
    if (currentRoute === '#/clown-town') {
      return <ClownTownSneakPeekPage />;
    }
    if (currentRoute === '#/hell-hole') {
      return <HellHoleSneakPeekPage />;
    }
    if (currentRoute === '#/food-booths/slider-doom') {
      return <SliderDoomPage />;
    }
    if (currentRoute === '#/food-booths/sharks-hell') {
      return <SharksHellPage />;
    }
    if (currentRoute === '#/scare-zones/laser-hell') {
      return <LaserHellPage />;
    }
    if (currentRoute === '#/cms') {
      return <CmsPage />;
    }
    if (currentRoute === '#/calendar') {
      return <CalendarPage />;
    }

    return (
      <>
        <HomeHeroSection />
        <HomeProcessionSection />
        <AuditionsSection />
        <HauntedHousesSection />
        <ClownTownInteriorElevationSection />
        <SchoolhouseSneakPeekSection />
        <ShowsSection />
        <UpcomingEventsSection />
        <FoodBoothsSection />
        <MerchShopsSection />
        <ScareZonesSection />
        <InfoLocationSection />
        <TeaserSection />
        <Teaser2027Section />
      </>
    );
  };

  return (
    <div className="relative min-h-screen dark">
      <HorrorBackground />
      <BackgroundAudioManager 
        onAutoplayBlockedChange={handleAutoplayBlockedChange}
        onRequestStart={handleRequestStart}
      />
      <SiteHeader 
        autoplayBlocked={autoplayBlocked}
        onEnableSound={handleEnableSound}
      />
      <main className="relative z-10">
        {renderPage()}
      </main>
      <SiteFooter />
      <ProfileSetupModal />
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;
