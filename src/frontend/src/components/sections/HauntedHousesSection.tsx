import { Section } from '../layout/Section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Home, Clock } from 'lucide-react';
import { hauntedHouses } from '@/content/hauntedHouses';
import { generatedImages } from '@/content/generatedImages';

export function HauntedHousesSection() {
  return (
    <Section
      id="haunted-houses"
      title="Haunted Houses"
      subtitle="Four terrifying attractions that will haunt your dreams"
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
              </CardContent>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
