import { Section } from '../layout/Section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Home, Clock, Eye, Shield } from 'lucide-react';
import { hauntedHouses } from '@/content/hauntedHouses';
import { generatedImages } from '@/content/generatedImages';
import { slugify } from '@/utils/slug';

const DETAIL_PAGE_HOUSES = ['Open Ice Tomb', 'Wax Works', 'Toys Come to Play', 'Obsession Scream', 'Blackjack'];

export function HauntedHousesSection() {
  const handleViewHouse = (houseName: string) => {
    if (houseName === 'Open Ice Tomb') {
      window.location.hash = '#/haunted-house/open-ice-tomb';
    } else if (houseName === 'Wax Works') {
      window.location.hash = '#/haunted-house/wax-works';
    } else if (houseName === 'Toys Come to Play') {
      window.location.hash = '#/toys-come-to-play';
    } else if (houseName === 'Obsession Scream') {
      window.location.hash = '#/haunted-house/obsession-scream';
    } else if (houseName === 'Blackjack') {
      window.location.hash = '#/haunted-house/blackjack';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewRules = (houseName: string) => {
    const slug = slugify(houseName);
    window.location.hash = `#/rules/haunted-house/${slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Section
      id="haunted-houses"
      title="Haunted Houses"
      subtitle="Terrifying attractions that will haunt your dreams"
      icon={<Home className="h-10 w-10 text-destructive" />}
    >
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {hauntedHouses.houses.map((house) => {
          const imagePath = generatedImages.hauntedHouses[house.name as keyof typeof generatedImages.hauntedHouses];
          const hasDetailPage = DETAIL_PAGE_HOUSES.includes(house.name);

          return (
            <Card
              key={house.name}
              className="bg-card/80 backdrop-blur-sm border-destructive/20 overflow-hidden group hover:border-destructive/50 transition-all hover:shadow-glow-green relative"
            >
              {/* Blood drip overlay at top */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-destructive/20 to-transparent pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Distressed texture overlay */}
              <div className="absolute inset-0 opacity-5 mix-blend-overlay pointer-events-none bg-noise" />

              <div className="relative h-64 overflow-hidden">
                <img
                  src={imagePath}
                  alt={house.name}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(0, 255, 100, 0.25) 0%, transparent 70%)',
                  }}
                />
                {/* Flickering shadow overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 animate-flicker-fast" />

                {/* Blackjack badge */}
                {house.name === 'Blackjack' && (
                  <div className="absolute top-3 left-3 z-20">
                    <Badge className="bg-destructive text-destructive-foreground font-bold text-xs">🃏 NEW</Badge>
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle className="text-2xl text-destructive bloody-text relative">
                  {house.name}
                  {/* Animated underline */}
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-destructive group-hover:w-full transition-all duration-500" />
                </CardTitle>
                <p className="text-lg font-semibold text-muted-foreground italic">
                  {house.tagline}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed text-foreground/90">
                  {house.description}
                </p>

                <div className="flex items-center gap-2 pt-2">
                  <Clock className="h-4 w-4 text-destructive animate-pulse" />
                  <span className="text-sm text-muted-foreground">
                    Average wait: 15-30 minutes
                  </span>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleViewRules(house.name)}
                    variant="outline"
                    className="flex-1 border-destructive/40 text-destructive hover:bg-destructive/10 hover:shadow-glow-orange transition-all"
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Guest Rules
                  </Button>
                  {hasDetailPage && (
                    <Button
                      onClick={() => handleViewHouse(house.name)}
                      variant="outline"
                      className="flex-1 border-destructive/40 text-destructive hover:bg-destructive/10 hover:shadow-glow-orange transition-all"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  )}
                </div>
              </CardContent>

              {/* Corner accent animations */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-destructive/40 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-destructive/40 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
