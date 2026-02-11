import { Section } from '../layout/Section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import { upcomingEvents } from '@/content/upcomingEvents';
import { generatedImages } from '@/content/generatedImages';
import { useState } from 'react';

export function UpcomingEventsSection() {
  return (
    <Section
      id="upcoming-events"
      title="Upcoming Events"
      subtitle="Mark your calendars for these special terror experiences"
      icon={<Calendar className="h-10 w-10 text-destructive" />}
    >
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {upcomingEvents.map((event) => {
          const imageUrl = generatedImages.upcomingEvents[event.name as keyof typeof generatedImages.upcomingEvents];
          
          return (
            <Card
              key={event.name}
              className="bg-card/80 backdrop-blur-sm border-destructive/20 overflow-hidden hover:border-destructive/50 transition-all hover:shadow-glow-green"
            >
              {imageUrl && (
                <EventImage src={imageUrl} alt={event.name} />
              )}
              <CardHeader>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <CardTitle className="text-2xl text-destructive bloody-text">
                    {event.name}
                  </CardTitle>
                </div>
                <Badge variant="outline" className="w-fit border-destructive/40">
                  {event.dateLabel}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-foreground/90">
                  {event.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}

function EventImage({ src, alt }: { src: string; alt: string }) {
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
