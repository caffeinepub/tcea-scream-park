import { Section } from '../layout/Section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Theater } from 'lucide-react';
import { shows } from '@/content/shows';
import { generatedImages } from '@/content/generatedImages';
import { useState } from 'react';

export function ShowsSection() {
  return (
    <Section
      id="shows"
      title="Live Shows"
      subtitle="Terrifying performances that will haunt you forever"
      icon={<Theater className="h-10 w-10 text-destructive" />}
    >
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {shows.map((show) => {
          const imageUrl = generatedImages.shows[show.name as keyof typeof generatedImages.shows];
          
          return (
            <Card
              key={show.name}
              className="bg-card/80 backdrop-blur-sm border-destructive/20 overflow-hidden hover:border-destructive/50 transition-all hover:shadow-glow-green"
            >
              {imageUrl && (
                <ShowImage src={imageUrl} alt={show.name} />
              )}
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <CardTitle className="text-2xl text-destructive bloody-text">
                    {show.name}
                  </CardTitle>
                  {show.hauntSeasonOnly && (
                    <Badge variant="destructive" className="shrink-0">
                      Haunt Season Only
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-foreground/90">
                  {show.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}

function ShowImage({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return null;
  }

  return (
    <div className="relative w-full h-48 overflow-hidden">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        onError={() => setImageError(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/80" />
    </div>
  );
}
