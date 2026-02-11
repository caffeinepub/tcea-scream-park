import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

export function HomeHeroSection() {
  const scrollToAuditions = () => {
    const element = document.querySelector('#auditions');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Hero Background Video with Fallback Image */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="/assets/generated/tcea-scream-park-hero-bg.dim_1920x1080.jpg"
        >
          <source src="/assets/video/chainsaw-loop.mp4" type="video/mp4" />
        </video>
        <img
          src="/assets/generated/tcea-scream-park-hero-bg.dim_1920x1080.jpg"
          alt="TCEA Scream Park"
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-background" />
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255, 100, 0, 0.15) 0%, rgba(0, 255, 100, 0.1) 50%, transparent 100%)',
          }}
        />
      </div>

      {/* Intense Strobe/Flash Effect Layer */}
      <div 
        className="absolute inset-0 z-[1] pointer-events-none motion-reduce:hidden animate-strobe-flash"
        aria-hidden="true"
      />

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 py-20">
        <img
          src="/assets/generated/tcea-scream-park-logo.dim_512x512.png"
          alt="TCEA Scream Park Logo"
          className="w-32 h-32 md:w-48 md:h-48 mx-auto mb-8 animate-pulse-glow"
          style={{
            filter: 'drop-shadow(0 0 30px rgba(255, 100, 0, 0.6)) drop-shadow(0 0 20px rgba(0, 255, 100, 0.4))',
          }}
        />
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider mb-6 text-destructive"
          style={{
            textShadow: '0 0 20px rgba(255, 100, 0, 0.5), 0 0 40px rgba(0, 255, 100, 0.3)',
          }}
        >
          TCEA SCREAM PARK
        </h1>
        <p className="text-2xl md:text-4xl text-destructive mb-4 font-bold tracking-wide bloody-text">
          Where Your Nightmares Come Alive
        </p>
        <p className="text-xl md:text-3xl text-foreground/90 mb-4 font-semibold tracking-wide">
          The Only Extreme Haunted Attraction
        </p>
        
        {/* Fire Remix Energetic Description */}
        <div className="max-w-3xl mx-auto mb-6 px-4">
          <p className="text-lg md:text-xl text-destructive/90 font-semibold mb-2">
            🔥 NEW FOR 2028: FIRE REMIX 🔥
          </p>
          <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
            Experience the most electrifying show of the year! High-energy dancers, mind-blowing lasers, and explosive performances that will leave you breathless. Showtimes at 1, 4, 7, and 9—exclusively at Remix Arena!
          </p>
        </div>

        <p className="text-lg md:text-2xl text-muted-foreground mb-12">
          Waterford, Virginia
        </p>
        <Button
          size="lg"
          onClick={scrollToAuditions}
          className="bg-destructive hover:bg-destructive/90 text-destructive-foreground text-lg px-8 py-6 shadow-glow-green hover:shadow-glow-green-lg transition-all"
        >
          Join Our Team - Auditions Open
        </Button>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToAuditions}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown className="h-8 w-8 text-destructive drop-shadow-[0_0_10px_rgba(255,100,0,0.5)]" />
      </button>
    </section>
  );
}
