import { Section } from '../layout/Section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skull, Eye, Shield } from 'lucide-react';
import { scareZones } from '@/content/scareZones';
import { generatedImages } from '@/content/generatedImages';
import { slugify } from '@/utils/slug';

export function ScareZonesSection() {
  const handleViewZone = (zoneName: string) => {
    if (zoneName === "Santa's Hell") {
      window.location.hash = '#/scare-zone/santas-hell';
    } else if (zoneName === 'Chainsaw Cold') {
      window.location.hash = '#/scare-zone/chainsaw-cold';
    }
  };

  const handleViewRules = (zoneName: string) => {
    const slug = slugify(zoneName);
    window.location.hash = `#/rules/scare-zone/${slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Section
      id="scare-zones"
      title="Scare Zones"
      subtitle="Outdoor nightmares where terror roams free"
      icon={<Skull className="h-10 w-10 text-destructive" />}
    >
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {scareZones.map((zone) => {
          const imagePath = generatedImages.scareZones[zone.name as keyof typeof generatedImages.scareZones];
          
          return (
            <Card
              key={zone.name}
              className="bg-card/80 backdrop-blur-sm border-destructive/20 overflow-hidden group hover:border-destructive/50 transition-all hover:shadow-glow-green"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={imagePath}
                  alt={zone.name}
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
                  {zone.name}
                </CardTitle>
                <p className="text-lg font-semibold text-muted-foreground italic">
                  {zone.tagline}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed text-foreground/90">
                  {zone.description}
                </p>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleViewRules(zone.name)}
                    variant="outline"
                    className="flex-1 border-destructive/40 text-destructive hover:bg-destructive/10"
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Guest Rules
                  </Button>
                  {(zone.name === "Santa's Hell" || zone.name === 'Chainsaw Cold') && (
                    <Button
                      onClick={() => handleViewZone(zone.name)}
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
