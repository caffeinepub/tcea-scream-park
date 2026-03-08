import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { BackgroundAudioManager } from "./components/audio/BackgroundAudioManager";
import { SiteFooter } from "./components/layout/SiteFooter";
import { SiteHeader } from "./components/layout/SiteHeader";
import { AboutAttractionSection } from "./components/sections/AboutAttractionSection";
import { AuditionsSection } from "./components/sections/AuditionsSection";
import { ClownTownInteriorElevationSection } from "./components/sections/ClownTownInteriorElevationSection";
import { CostumeCharacters2030Section } from "./components/sections/CostumeCharacters2030Section";
import { EmployeePortalLink } from "./components/sections/EmployeePortalLink";
import { FoodBoothsSection } from "./components/sections/FoodBoothsSection";
import { HauntedHousesSection } from "./components/sections/HauntedHousesSection";
import { HomeHeroSection } from "./components/sections/HomeHeroSection";
import { HomeIntroVideoSection } from "./components/sections/HomeIntroVideoSection";
import { HomeProcessionSection } from "./components/sections/HomeProcessionSection";
import { Icons2026Section } from "./components/sections/Icons2026Section";
import { InfoLocationSection } from "./components/sections/InfoLocationSection";
import { KidsZoneSection } from "./components/sections/KidsZoneSection";
import { MerchShopsSection } from "./components/sections/MerchShopsSection";
import { ScareZonesSection } from "./components/sections/ScareZonesSection";
import { SchoolhouseSneakPeekSection } from "./components/sections/SchoolhouseSneakPeekSection";
import { ScreamCornMazeSection } from "./components/sections/ScreamCornMazeSection";
import { ShowsSection } from "./components/sections/ShowsSection";
import { SlidersOfDecadeSection } from "./components/sections/SlidersOfDecadeSection";
import { SponsorConventionSection } from "./components/sections/SponsorConventionSection";
import { Teaser2027Section } from "./components/sections/Teaser2027Section";
import { TeaserSection } from "./components/sections/TeaserSection";
import { UpcomingAttractionsSection } from "./components/sections/UpcomingAttractionsSection";
import { UpcomingEventsSection } from "./components/sections/UpcomingEventsSection";
import { UpcomingExpansionsSection } from "./components/sections/UpcomingExpansionsSection";
import { HorrorBackground } from "./components/theme/HorrorBackground";
import { ActorsPage } from "./pages/ActorsPage";
import { AuditionsPage } from "./pages/AuditionsPage";
import { BlackjackPage } from "./pages/BlackjackPage";
import { CalendarPage } from "./pages/CalendarPage";
import { CandyCaneCarnagePage } from "./pages/CandyCaneCarnagePage";
import { ChainsawColdPage } from "./pages/ChainsawColdPage";
import { ClownTownSneakPeekPage } from "./pages/ClownTownSneakPeekPage";
import { CmsPage } from "./pages/CmsPage";
import { DancerAuditionPage } from "./pages/DancerAuditionPage";
import { EggnogExorcismPage } from "./pages/EggnogExorcismPage";
import { EmployeeUpcomingEventsPage } from "./pages/EmployeeUpcomingEventsPage";
import { FlynCharacterPage } from "./pages/FlynCharacterPage";
import { FrostedHauntPage } from "./pages/FrostedHauntPage";
import { GingerdeadBakesPage } from "./pages/GingerdeadBakesPage";
import { GuestRulesPage } from "./pages/GuestRulesPage";
import { HappilyScaryAfterPage } from "./pages/HappilyScaryAfterPage";
import { HellHoleSneakPeekPage } from "./pages/HellHoleSneakPeekPage";
import { HellfireHotCocoaPage } from "./pages/HellfireHotCocoaPage";
import { LaserHellPage } from "./pages/LaserHellPage";
import { ObsessionScreamPage } from "./pages/ObsessionScreamPage";
import { OpenIceTombPage } from "./pages/OpenIceTombPage";
import { OrnamentOssuaryPage } from "./pages/OrnamentOssuaryPage";
import { PaintDeathBoothPage } from "./pages/PaintDeathBoothPage";
import { SantasHellPage } from "./pages/SantasHellPage";
import { ScareActorAuditionPage } from "./pages/ScareActorAuditionPage";
import { SchoolhouseSneakPeekPage } from "./pages/SchoolhouseSneakPeekPage";
import { SecretTunnelsPage } from "./pages/SecretTunnelsPage";
import { SharksHellPage } from "./pages/SharksHellPage";
import { ShowsEntrancePage } from "./pages/ShowsEntrancePage";
import { SliderDoomPage } from "./pages/SliderDoomPage";
import { TCEATunnelsPage } from "./pages/TCEATunnelsPage";
import { ToysComeToPlayPage } from "./pages/ToysComeToPlayPage";
import { ToysComeToPlaySneakPeekPage } from "./pages/ToysComeToPlaySneakPeekPage";
import { WaxWorksPage } from "./pages/WaxWorksPage";
import { WrathOfWrappingPage } from "./pages/WrathOfWrappingPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [enableSoundCallback, setEnableSoundCallback] = useState<
    (() => void) | undefined
  >(undefined);
  const [currentRoute, setCurrentRoute] = useState("home");

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      const normalizedHash = hash.startsWith("/") ? hash.slice(1) : hash;

      if (!normalizedHash) {
        setCurrentRoute("home");
      } else if (normalizedHash === "cms") {
        setCurrentRoute("cms");
      } else if (normalizedHash === "calendar") {
        setCurrentRoute("calendar");
      } else if (normalizedHash === "auditions") {
        setCurrentRoute("auditions");
      } else if (normalizedHash === "auditions/scare-actor") {
        setCurrentRoute("auditions-scare-actor");
      } else if (normalizedHash === "auditions/dancer") {
        setCurrentRoute("auditions-dancer");
      } else if (normalizedHash === "actors") {
        setCurrentRoute("actors");
      } else if (normalizedHash.startsWith("rules/haunted-house/")) {
        setCurrentRoute("guest-rules");
      } else if (normalizedHash.startsWith("rules/scare-zone/")) {
        setCurrentRoute("guest-rules");
      } else if (normalizedHash === "sneak-peek/schoolhouse") {
        setCurrentRoute("sneak-peek-schoolhouse");
      } else if (normalizedHash === "food-booth/slider-doom") {
        setCurrentRoute("slider-doom");
      } else if (normalizedHash === "food-booth/sharks-hell") {
        setCurrentRoute("sharks-hell");
      } else if (normalizedHash === "food-booth/paint-death") {
        setCurrentRoute("paint-death");
      } else if (normalizedHash === "scare-zone/laser-hell") {
        setCurrentRoute("laser-hell");
      } else if (normalizedHash === "sneak-peek/clown-town") {
        setCurrentRoute("sneak-peek-clown-town");
      } else if (normalizedHash === "sneak-peek/hell-hole") {
        setCurrentRoute("sneak-peek-hell-hole");
      } else if (normalizedHash === "sneak-peek/toys-come-to-play") {
        setCurrentRoute("sneak-peek-toys-come-to-play");
      } else if (normalizedHash === "upcoming-event/frosted-haunt") {
        setCurrentRoute("frosted-haunt");
      } else if (normalizedHash === "haunted-house/open-ice-tomb") {
        setCurrentRoute("open-ice-tomb");
      } else if (normalizedHash === "haunted-house/wax-works") {
        setCurrentRoute("wax-works");
      } else if (normalizedHash === "haunted-house/obsession-scream") {
        setCurrentRoute("obsession-scream");
      } else if (normalizedHash === "haunted-house/blackjack") {
        setCurrentRoute("blackjack");
      } else if (normalizedHash === "toys-come-to-play") {
        setCurrentRoute("toys-come-to-play");
      } else if (normalizedHash === "scare-zone/santas-hell") {
        setCurrentRoute("santas-hell");
      } else if (normalizedHash === "scare-zone/chainsaw-cold") {
        setCurrentRoute("chainsaw-cold");
      } else if (normalizedHash === "food-booth/gingerdead-bakes") {
        setCurrentRoute("gingerdead-bakes");
      } else if (normalizedHash === "food-booth/hellfire-hot-cocoa") {
        setCurrentRoute("hellfire-hot-cocoa");
      } else if (normalizedHash === "food-booth/wrath-of-wrapping") {
        setCurrentRoute("wrath-of-wrapping");
      } else if (normalizedHash === "food-booth/eggnog-exorcism") {
        setCurrentRoute("eggnog-exorcism");
      } else if (normalizedHash === "food-booth/candy-cane-carnage") {
        setCurrentRoute("candy-cane-carnage");
      } else if (normalizedHash === "food-booth/ornament-ossuary") {
        setCurrentRoute("ornament-ossuary");
      } else if (normalizedHash === "employee/tcea-tunnels") {
        setCurrentRoute("employee-tcea-tunnels");
      } else if (normalizedHash === "employee/upcoming-events") {
        setCurrentRoute("employee-upcoming-events");
      } else if (normalizedHash === "employee/shows-entrance") {
        setCurrentRoute("employee-shows-entrance");
      } else if (normalizedHash === "employee/happily-scary-after") {
        setCurrentRoute("employee-happily-scary-after");
      } else if (normalizedHash === "employee/flyn-character") {
        setCurrentRoute("employee-flyn-character");
      } else if (normalizedHash === "employee/secret-tunnels") {
        setCurrentRoute("employee-secret-tunnels");
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleAutoplayBlockedChange = useCallback((blocked: boolean) => {
    setAutoplayBlocked(blocked);
  }, []);

  const handleRequestStart = useCallback((callback: () => void) => {
    setEnableSoundCallback(() => callback);
  }, []);

  const renderRoute = () => {
    switch (currentRoute) {
      case "cms":
        return <CmsPage />;
      case "calendar":
        return <CalendarPage />;
      case "auditions":
        return <AuditionsPage />;
      case "auditions-scare-actor":
        return <ScareActorAuditionPage />;
      case "auditions-dancer":
        return <DancerAuditionPage />;
      case "actors":
        return <ActorsPage />;
      case "guest-rules":
        return <GuestRulesPage />;
      case "sneak-peek-schoolhouse":
        return <SchoolhouseSneakPeekPage />;
      case "slider-doom":
        return <SliderDoomPage />;
      case "sharks-hell":
        return <SharksHellPage />;
      case "paint-death":
        return <PaintDeathBoothPage />;
      case "laser-hell":
        return <LaserHellPage />;
      case "sneak-peek-clown-town":
        return <ClownTownSneakPeekPage />;
      case "sneak-peek-hell-hole":
        return <HellHoleSneakPeekPage />;
      case "sneak-peek-toys-come-to-play":
        return <ToysComeToPlaySneakPeekPage />;
      case "frosted-haunt":
        return <FrostedHauntPage />;
      case "open-ice-tomb":
        return <OpenIceTombPage />;
      case "wax-works":
        return <WaxWorksPage />;
      case "obsession-scream":
        return <ObsessionScreamPage />;
      case "blackjack":
        return <BlackjackPage />;
      case "toys-come-to-play":
        return <ToysComeToPlayPage />;
      case "santas-hell":
        return <SantasHellPage />;
      case "chainsaw-cold":
        return <ChainsawColdPage />;
      case "gingerdead-bakes":
        return <GingerdeadBakesPage />;
      case "hellfire-hot-cocoa":
        return <HellfireHotCocoaPage />;
      case "wrath-of-wrapping":
        return <WrathOfWrappingPage />;
      case "eggnog-exorcism":
        return <EggnogExorcismPage />;
      case "candy-cane-carnage":
        return <CandyCaneCarnagePage />;
      case "ornament-ossuary":
        return <OrnamentOssuaryPage />;
      case "employee-tcea-tunnels":
        return <TCEATunnelsPage />;
      case "employee-upcoming-events":
        return <EmployeeUpcomingEventsPage />;
      case "employee-shows-entrance":
        return <ShowsEntrancePage />;
      case "employee-happily-scary-after":
        return <HappilyScaryAfterPage />;
      case "employee-flyn-character":
        return <FlynCharacterPage />;
      case "employee-secret-tunnels":
        return <SecretTunnelsPage />;
      default:
        return (
          <>
            <HomeIntroVideoSection />
            <HomeHeroSection />
            <AboutAttractionSection />
            <HomeProcessionSection />
            <SlidersOfDecadeSection />
            <AuditionsSection />
            <CostumeCharacters2030Section />
            <UpcomingEventsSection />
            <UpcomingExpansionsSection />
            <UpcomingAttractionsSection />
            <ShowsSection />
            <Icons2026Section />
            <HauntedHousesSection />
            <ScareZonesSection />
            <ScreamCornMazeSection />
            <KidsZoneSection />
            <FoodBoothsSection />
            <MerchShopsSection />
            <SponsorConventionSection />
            <SchoolhouseSneakPeekSection />
            <ClownTownInteriorElevationSection />
            <Teaser2027Section />
            <InfoLocationSection />
            <TeaserSection />
            <EmployeePortalLink />
          </>
        );
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative min-h-screen">
        <HorrorBackground />
        <div className="relative z-10">
          <SiteHeader
            autoplayBlocked={autoplayBlocked}
            onEnableSound={enableSoundCallback}
          />
          <main>{renderRoute()}</main>
          <SiteFooter />
        </div>
        <BackgroundAudioManager
          onAutoplayBlockedChange={handleAutoplayBlockedChange}
          onRequestStart={handleRequestStart}
        />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;
