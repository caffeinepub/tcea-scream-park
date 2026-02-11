import { Section } from '../layout/Section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skull } from 'lucide-react';
import { scareZones } from '@/content/scareZones';
import { generatedImages } from '@/content/generatedImages';

export function ScareZonesSection() {
  return (
    <Section
      id="scare-zones"
      title="Scare Zones"
      subtitle="Open-air terror zones throughout the park"
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
              <CardContent>
                <p className="text-sm leading-relaxed text-foreground/90">
                  {zone.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
