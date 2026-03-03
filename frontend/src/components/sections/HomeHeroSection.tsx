import { Button } from '@/components/ui/button';
import { Skull, Ghost } from 'lucide-react';

export function HomeHeroSection() {
  const scrollToAuditions = () => {
    const element = document.querySelector('#auditions');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navigateToScareActorAudition = () => {
    window.location.hash = '#/auditions/scare-actor';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToDancerAudition = () => {
    window.location.hash = '#/auditions/dancer';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="/assets/generated/tcea-scream-park-hero-bg.dim_1920x1080.jpg"
      >
        <source src="/assets/video/tcea-scream-intro-placeholder.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />

      {/* Animated particle overlays for chaos */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-destructive/10 rounded-full blur-3xl animate-float-particle-1" />
        <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-float-particle-2" />
        <div className="absolute bottom-1/4 left-1/2 w-56 h-56 bg-destructive/10 rounded-full blur-3xl animate-float-particle-3" />
      </div>

      {/* Flickering light effect */}
      <div className="absolute inset-0 bg-destructive/5 animate-flicker-slow pointer-events-none" />

      <div className="relative z-10 text-center px-4 space-y-8 max-w-4xl mx-auto">
        <div className="animate-pulse-glow relative">
          {/* Glow effect behind logo */}
          <div className="absolute inset-0 bg-destructive/30 blur-3xl animate-pulse" />
          <img
            src="/assets/generated/tcea-scream-park-logo.dim_512x512.png"
            alt="TCEA Scream Park Logo"
            className="relative w-48 h-48 mx-auto drop-shadow-[0_0_40px_rgba(255,100,0,0.9)] animate-float-subtle"
          />
        </div>

        <h1 className="text-6xl md:text-8xl font-bold text-destructive drop-shadow-[0_0_25px_rgba(255,100,0,0.6)] bloody-text animate-glitch-subtle">
          TCEA SCREAM PARK
        </h1>

        <p className="text-xl md:text-2xl text-foreground/90 max-w-3xl mx-auto leading-relaxed font-medium drop-shadow-lg">
          Welcome to the 2028 Fire Remix show—an explosive spectacle of dancers, lasers, and pure adrenaline! 
          Catch the electrifying performances at the Remix Arena with showtimes at 7 PM, 9 PM, and 11 PM. 
          This is not just a show—it's a sensory overload of rhythm, fire, and fearless energy that will leave you breathless!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Button
            size="lg"
            onClick={scrollToAuditions}
            className="bg-destructive hover:bg-destructive/90 text-white text-lg px-8 py-6 shadow-glow-green animate-pulse-glow-button relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <Skull className="mr-2 h-6 w-6 relative z-10" />
            <span className="relative z-10">Join The Scream Team</span>
          </Button>
          <Button
            size="lg"
            onClick={navigateToScareActorAudition}
            variant="outline"
            className="border-destructive/40 text-destructive hover:bg-destructive/10 text-lg px-8 py-6 hover:shadow-glow-orange transition-all"
          >
            <Ghost className="mr-2 h-6 w-6" />
            Scare Actor Audition
          </Button>
          <Button
            size="lg"
            onClick={navigateToDancerAudition}
            variant="outline"
            className="border-destructive/40 text-destructive hover:bg-destructive/10 text-lg px-8 py-6 hover:shadow-glow-orange transition-all"
          >
            <Ghost className="mr-2 h-6 w-6" />
            Dancer Audition
          </Button>
        </div>
      </div>
    </section>
  );
}
