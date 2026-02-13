import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SiteHeader } from './components/layout/SiteHeader';
import { SiteFooter } from './components/layout/SiteFooter';
import { HorrorBackground } from './components/theme/HorrorBackground';
import { HomeHeroSection } from './components/sections/HomeHeroSection';
import { AuditionsSection } from './components/sections/AuditionsSection';
import { HauntedHousesSection } from './components/sections/HauntedHousesSection';
import { FoodBoothsSection } from './components/sections/FoodBoothsSection';
import { MerchShopsSection } from './components/sections/MerchShopsSection';
import { ScareZonesSection } from './components/sections/ScareZonesSection';
import { InfoLocationSection } from './components/sections/InfoLocationSection';
import { TeaserSection } from './components/sections/TeaserSection';
import { Toaster } from '@/components/ui/sonner';
import { BackgroundAudioManager } from './components/audio/BackgroundAudioManager';
import { useSoundPreferences } from './hooks/useSoundPreferences';
import { useState, useEffect, useCallback } from 'react';
import { Teaser2027Section } from './components/sections/Teaser2027Section';
import { HomeProcessionSection } from './components/sections/HomeProcessionSection';
import { ClownTownInteriorElevationSection } from './components/sections/ClownTownInteriorElevationSection';
import { SchoolhouseSneakPeekSection } from './components/sections/SchoolhouseSneakPeekSection';
import { SchoolhouseSneakPeekPage } from './pages/SchoolhouseSneakPeekPage';
import { SliderDoomPage } from './pages/SliderDoomPage';
import { SharksHellPage } from './pages/SharksHellPage';
import { LaserHellPage } from './pages/LaserHellPage';
import { ClownTownSneakPeekPage } from './pages/ClownTownSneakPeekPage';
import { HellHoleSneakPeekPage } from './pages/HellHoleSneakPeekPage';
import { ToysComeToPlaySneakPeekPage } from './pages/ToysComeToPlaySneakPeekPage';
import { CmsPage } from './pages/CmsPage';
import { CalendarPage } from './pages/CalendarPage';
import { AuditionsPage } from './pages/AuditionsPage';
import { ShowsSection } from './components/sections/ShowsSection';
import { UpcomingEventsSection } from './components/sections/UpcomingEventsSection';
import { SlidersOfDecadeSection } from './components/sections/SlidersOfDecadeSection';
import { HomeIntroVideoSection } from './components/sections/HomeIntroVideoSection';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const { preferences } = useSoundPreferences();
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [requestStartCallback, setRequestStartCallback] = useState<(() => void) | null>(null);
  const [currentRoute, setCurrentRoute] = useState('home');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      // Normalize hash to handle both #/route and #route formats
      const normalizedHash = hash.startsWith('/') ? hash.slice(1) : hash;
      
      if (!normalizedHash) {
        setCurrentRoute('home');
      } else if (normalizedHash === 'cms') {
        setCurrentRoute('cms');
      } else if (normalizedHash === 'calendar') {
        setCurrentRoute('calendar');
      } else if (normalizedHash === 'auditions') {
        setCurrentRoute('auditions');
      } else if (normalizedHash === 'sneak-peek/schoolhouse') {
        setCurrentRoute('sneak-peek-schoolhouse');
      } else if (normalizedHash === 'food-booth/slider-doom') {
        setCurrentRoute('slider-doom');
      } else if (normalizedHash === 'food-booth/sharks-hell') {
        setCurrentRoute('sharks-hell');
      } else if (normalizedHash === 'scare-zone/laser-hell') {
        setCurrentRoute('laser-hell');
      } else if (normalizedHash === 'sneak-peek/clown-town') {
        setCurrentRoute('sneak-peek-clown-town');
      } else if (normalizedHash === 'sneak-peek/hell-hole') {
        setCurrentRoute('sneak-peek-hell-hole');
      } else if (normalizedHash === 'sneak-peek/toys-come-to-play') {
        setCurrentRoute('sneak-peek-toys-come-to-play');
      } else {
        setCurrentRoute('home');
      }
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

  const renderRoute = () => {
    switch (currentRoute) {
      case 'cms':
        return <CmsPage />;
      case 'calendar':
        return <CalendarPage />;
      case 'auditions':
        return <AuditionsPage />;
      case 'sneak-peek-schoolhouse':
        return <SchoolhouseSneakPeekPage />;
      case 'slider-doom':
        return <SliderDoomPage />;
      case 'sharks-hell':
        return <SharksHellPage />;
      case 'laser-hell':
        return <LaserHellPage />;
      case 'sneak-peek-clown-town':
        return <ClownTownSneakPeekPage />;
      case 'sneak-peek-hell-hole':
        return <HellHoleSneakPeekPage />;
      case 'sneak-peek-toys-come-to-play':
        return <ToysComeToPlaySneakPeekPage />;
      case 'home':
      default:
        return (
          <>
            <HomeHeroSection />
            <HomeIntroVideoSection />
            <AuditionsSection />
            <HauntedHousesSection />
            <FoodBoothsSection />
            <MerchShopsSection />
            <ScareZonesSection />
            <ShowsSection />
            <UpcomingEventsSection />
            <Teaser2027Section />
            <HomeProcessionSection />
            <ClownTownInteriorElevationSection />
            <SchoolhouseSneakPeekSection />
            <InfoLocationSection />
            <TeaserSection />
            <SlidersOfDecadeSection />
          </>
        );
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background text-foreground relative">
        <HorrorBackground />
        <SiteHeader autoplayBlocked={autoplayBlocked} onEnableSound={handleEnableSound} />
        <main className="relative z-10">
          {renderRoute()}
        </main>
        <SiteFooter />
        <Toaster />
        {preferences.enabled && (
          <BackgroundAudioManager 
            onAutoplayBlockedChange={handleAutoplayBlockedChange}
            onRequestStart={handleRequestStart}
          />
        )}
      </div>
    </QueryClientProvider>
  );
}

export default App;
