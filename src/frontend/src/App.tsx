import { HomeHeroSection } from './components/sections/HomeHeroSection';
import { HomeProcessionSection } from './components/sections/HomeProcessionSection';
import { AuditionsSection } from './components/sections/AuditionsSection';
import { HauntedHousesSection } from './components/sections/HauntedHousesSection';
import { ClownTownInteriorElevationSection } from './components/sections/ClownTownInteriorElevationSection';
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

function App() {
  return (
    <div className="relative min-h-screen dark">
      <HorrorBackground />
      <BackgroundAudioManager />
      <SiteHeader />
      <main className="relative z-10">
        <HomeHeroSection />
        <HomeProcessionSection />
        <AuditionsSection />
        <HauntedHousesSection />
        <ClownTownInteriorElevationSection />
        <FoodBoothsSection />
        <MerchShopsSection />
        <ScareZonesSection />
        <InfoLocationSection />
        <TeaserSection />
        <Teaser2027Section />
      </main>
      <SiteFooter />
    </div>
  );
}

export default App;
