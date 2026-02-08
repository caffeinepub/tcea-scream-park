import { useState, useEffect } from 'react';
import { HomeHeroSection } from './components/sections/HomeHeroSection';
import { HomeProcessionSection } from './components/sections/HomeProcessionSection';
import { AuditionsSection } from './components/sections/AuditionsSection';
import { HauntedHousesSection } from './components/sections/HauntedHousesSection';
import { ClownTownInteriorElevationSection } from './components/sections/ClownTownInteriorElevationSection';
import { SchoolhouseSneakPeekSection } from './components/sections/SchoolhouseSneakPeekSection';
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
import { SliderDoomPage } from './pages/SliderDoomPage';
import { SharksHellPage } from './pages/SharksHellPage';
import { LaserHellPage } from './pages/LaserHellPage';

function App() {
  const [currentRoute, setCurrentRoute] = useState('');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      setCurrentRoute(hash);
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    if (currentRoute === '#/schoolhouse') {
      return <SchoolhouseSneakPeekPage />;
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

    return (
      <>
        <HomeHeroSection />
        <HomeProcessionSection />
        <AuditionsSection />
        <HauntedHousesSection />
        <ClownTownInteriorElevationSection />
        <SchoolhouseSneakPeekSection />
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
      <BackgroundAudioManager />
      <SiteHeader />
      <main className="relative z-10">
        {renderPage()}
      </main>
      <SiteFooter />
    </div>
  );
}

export default App;
