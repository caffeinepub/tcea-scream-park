import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { LoginButton } from '@/components/auth/LoginButton';
import { SoundControls } from '@/components/audio/SoundControls';

interface SiteHeaderProps {
  autoplayBlocked?: boolean;
  onEnableSound?: () => void;
}

export function SiteHeader({ autoplayBlocked, onEnableSound }: SiteHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home', type: 'scroll' },
    { label: 'Auditions (Home)', href: '#auditions', type: 'scroll' },
    { label: 'Auditions Page', href: '#/auditions', type: 'route' },
    { label: 'Haunted Houses', href: '#haunted-houses', type: 'scroll' },
    { label: 'Sneak Peek', href: '#sneak-peek', type: 'scroll' },
    { label: 'Shows', href: '#shows', type: 'scroll' },
    { label: 'Upcoming Events', href: '#upcoming-events', type: 'scroll' },
    { label: 'Food Booths', href: '#food-booths', type: 'scroll' },
    { label: 'Merch Shops', href: '#merch-shops', type: 'scroll' },
    { label: 'Scare Zones', href: '#scare-zones', type: 'scroll' },
    { label: 'Info & Location', href: '#info-location', type: 'scroll' },
    { label: 'Coming 2027', href: '#coming-2027', type: 'scroll' },
    { label: 'Calendar', href: '#/calendar', type: 'route' },
    { label: 'CMS', href: '#/cms', type: 'route' },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.type === 'route') {
      window.location.hash = item.href;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      scrollToSection(item.href);
    }
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (href: string) => {
    if (window.location.hash.startsWith('#/')) {
      window.location.hash = '';
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const navigateToHome = () => {
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md border-b border-destructive/30 shadow-glow-green' : 'bg-transparent'
      }`}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src="/assets/generated/header-blood-overlay.dim_2400x400.png"
          alt=""
          className="w-full h-full object-cover opacity-60 mix-blend-multiply"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between h-20">
          <button
            onClick={navigateToHome}
            className="flex items-center gap-3 group"
          >
            <img
              src="/assets/generated/tcea-scream-park-logo.dim_512x512.png"
              alt="TCEA Scream Park Logo"
              className="h-12 w-12 transition-transform group-hover:scale-110 drop-shadow-[0_0_10px_rgba(255,100,0,0.5)]"
            />
            <span className="text-2xl font-bold tracking-tight text-destructive group-hover:text-destructive/80 transition-colors drop-shadow-[0_0_8px_rgba(255,100,0,0.3)]">
              TCEA SCREAM PARK
            </span>
          </button>

          <div className="hidden lg:flex items-center gap-4">
            <nav className="flex items-center gap-1">
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  onClick={() => handleNavClick(item)}
                  className="text-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                >
                  {item.label}
                </Button>
              ))}
            </nav>
            <SoundControls autoplayBlocked={autoplayBlocked} onEnableSound={onEnableSound} />
            <LoginButton />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-destructive"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {isMobileMenuOpen && (
          <nav className="lg:hidden pb-4 border-t border-destructive/30 mt-2">
            <div className="flex flex-col gap-2 pt-4">
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  onClick={() => handleNavClick(item)}
                  className="justify-start text-foreground hover:text-destructive hover:bg-destructive/10"
                >
                  {item.label}
                </Button>
              ))}
              <div className="pt-2 border-t border-destructive/30 space-y-2">
                <SoundControls autoplayBlocked={autoplayBlocked} onEnableSound={onEnableSound} />
                <LoginButton />
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
