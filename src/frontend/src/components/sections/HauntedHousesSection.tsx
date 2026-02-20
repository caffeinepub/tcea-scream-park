import { Section } from '../layout/Section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Home, Clock, Eye, Shield } from 'lucide-react';
import { hauntedHouses } from '@/content/hauntedHouses';
import { generatedImages } from '@/content/generatedImages';
import { slugify } from '@/utils/slug';

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
    }
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
          
          return (
            <Card
              key={house.name}
              className="bg-card/80 backdrop-blur-sm border-destructive/20 overflow-hidden group hover:border-destructive/50 transition-all hover:shadow-glow-green"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={imagePath}
                  alt={house.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(0, 255, 100, 0.2) 0%, transparent 70%)',
                  }}
                />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl text-destructive bloody-text">
                  {house.name}
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
                  <Clock className="h-4 w-4 text-destructive" />
                  <span className="text-sm text-muted-foreground">
                    Average wait: 15-30 minutes
                  </span>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleViewRules(house.name)}
                    variant="outline"
                    className="flex-1 border-destructive/40 text-destructive hover:bg-destructive/10"
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Guest Rules
                  </Button>
                  {(house.name === 'Open Ice Tomb' || house.name === 'Wax Works' || house.name === 'Toys Come to Play' || house.name === 'Obsession Scream') && (
                    <Button
                      onClick={() => handleViewHouse(house.name)}
                      variant="outline"
                      className="flex-1 border-destructive/40 text-destructive hover:bg-destructive/10"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
