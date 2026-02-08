import { Section } from '../layout/Section';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { scareZones } from '../../content/scareZones';
import { generatedImages } from '../../content/generatedImages';
import { Skull, Eye, MapPin } from 'lucide-react';

export function ScareZonesSection() {
  const handleViewZone = (zoneName: string) => {
    if (zoneName === 'Laser Hell') {
      window.location.hash = '#/scare-zones/laser-hell';
    }
  };

  return (
    <Section
      id="scare-zones"
      title="Scare Zones"
      subtitle="Roaming terror throughout the park"
      icon={<Skull className="h-10 w-10 text-destructive" />}
    >
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {scareZones.zones.map((zone, index) => (
          <Card
            key={index}
            className="bg-card/80 backdrop-blur-sm border-destructive/30 hover:border-destructive/60 transition-all hover:shadow-glow-green hover:scale-105 overflow-hidden"
          >
            {/* Zone Image */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={generatedImages.scareZones[zone.name as keyof typeof generatedImages.scareZones]}
                alt={zone.name}
                className="w-full h-full object-cover transition-transform hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
            </div>

            <CardHeader>
              <CardTitle className="text-2xl text-destructive">{zone.name}</CardTitle>
              {zone.location && (
                <CardDescription className="text-muted-foreground flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {zone.location}
                </CardDescription>
              )}
              <CardDescription className="text-destructive/80 italic font-semibold">
                {zone.tagline}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {zone.description}
              </p>
              {zone.name === 'Laser Hell' && (
                <Button
                  onClick={() => handleViewZone(zone.name)}
                  variant="outline"
                  className="w-full mt-4 border-destructive/40 text-destructive hover:bg-destructive/10"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
