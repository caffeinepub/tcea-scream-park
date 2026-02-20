import { Section } from '../layout/Section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UtensilsCrossed, Eye, AlertCircle } from 'lucide-react';
import { foodBooths } from '@/content/foodBooths';
import { generatedImages } from '@/content/generatedImages';
import { useState } from 'react';

export function FoodBoothsSection() {
  const handleViewBooth = (boothName: string) => {
    const slug = boothName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    window.location.hash = `#/food-booth/${slug}`;
  };

  return (
    <Section
      id="food-booths"
      title="Food Booths"
      subtitle="Terrifyingly delicious cuisine from the depths of hell"
      icon={<UtensilsCrossed className="h-10 w-10 text-destructive" />}
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {foodBooths.booths.map((booth) => {
          const imageKey = booth.name as keyof typeof generatedImages.foodBooths;
          let imagePath = generatedImages.foodBooths[imageKey];
          
          if (!imagePath) {
            const fallbackKeys = Object.keys(generatedImages.foodBooths);
            const matchingKey = fallbackKeys.find(key => 
              key.toLowerCase().includes(booth.name.toLowerCase().split(' ')[0])
            );
            if (matchingKey) {
              imagePath = generatedImages.foodBooths[matchingKey as keyof typeof generatedImages.foodBooths];
            }
          }

          const hasDetailPage = [
            'Slider Doom',
            'Sharks Hell',
            'Gingerdead Bakes',
            'Hellfire Hot Cocoa',
            'Wrath of Wrapping',
            'Eggnog Exorcism',
            'Candy Cane Carnage',
            'Ornament Ossuary',
            'Paint & Death',
          ].includes(booth.name);

          return (
            <Card
              key={booth.name}
              className="bg-card/80 backdrop-blur-sm border-destructive/20 overflow-hidden group hover:border-destructive/50 transition-all hover:shadow-glow-green"
            >
              {imagePath && (
                <BoothImage src={imagePath} alt={booth.name} />
              )}
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-xl text-destructive bloody-text">
                    {booth.name}
                  </CardTitle>
                  {booth.label && (
                    <Badge variant="outline" className="shrink-0 text-xs">
                      {booth.label}
                    </Badge>
                  )}
                </div>
                <p className="text-sm font-semibold text-muted-foreground italic">
                  {booth.tagline}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed text-foreground/90 line-clamp-3">
                  {booth.description}
                </p>
                
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Menu Highlights:
                  </p>
                  <ul className="text-xs space-y-1 text-foreground/80">
                    {booth.menu.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-destructive mt-0.5">•</span>
                        <span>{item.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {booth.menu.length > 0 && booth.menu[0].name !== 'Coming soon...' && (
                  <div className="flex items-center gap-2 pt-2 border-t border-border/50">
                    <AlertCircle className="h-4 w-4 text-destructive" />
                    <span className="text-xs text-muted-foreground">
                      Prices vary by item
                    </span>
                  </div>
                )}

                {hasDetailPage && (
                  <Button
                    onClick={() => handleViewBooth(booth.name)}
                    variant="outline"
                    className="w-full border-destructive/40 text-destructive hover:bg-destructive/10"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View Full Menu
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}

function BoothImage({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return null;
  }

  return (
    <div className="relative h-48 overflow-hidden">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        onError={() => setImageError(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle at center, rgba(0, 255, 100, 0.2) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}
