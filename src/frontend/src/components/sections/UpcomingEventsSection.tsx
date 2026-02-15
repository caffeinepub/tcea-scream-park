import { Section } from '../layout/Section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { upcomingEvents } from '@/content/upcomingEvents';
import { generatedImages } from '@/content/generatedImages';
import { useState } from 'react';

export function UpcomingEventsSection() {
  const handleViewEvent = (eventName: string) => {
    if (eventName === 'Frosted Haunt') {
      window.location.hash = '#/event/frosted-haunt';
    }
  };

  return (
    <Section
      id="upcoming-events"
      title="Upcoming Events"
      subtitle="Mark your calendars for these special terror experiences"
      icon={<Calendar className="h-10 w-10 text-destructive" />}
    >
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {upcomingEvents.map((event) => {
          const imageData = generatedImages.upcomingEvents[event.name as keyof typeof generatedImages.upcomingEvents];
          const images = Array.isArray(imageData) ? imageData : imageData ? [imageData] : [];
          
          return (
            <Card
              key={event.name}
              className="bg-card/80 backdrop-blur-sm border-destructive/20 overflow-hidden hover:border-destructive/50 transition-all hover:shadow-glow-green"
            >
              {images.length > 0 && (
                <EventImageGallery images={images} alt={event.name} />
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
              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed text-foreground/90">
                  {event.description}
                </p>
                {event.name === 'Frosted Haunt' && (
                  <Button
                    onClick={() => handleViewEvent(event.name)}
                    variant="outline"
                    className="w-full border-destructive/40 text-destructive hover:bg-destructive/10"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View Event Details
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

function EventImageGallery({ images, alt }: { images: string[]; alt: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleImageError = (index: number) => {
    setImageErrors((prev) => new Set(prev).add(index));
  };

  // Filter out images that failed to load
  const validImages = images.filter((_, index) => !imageErrors.has(index));

  if (validImages.length === 0) {
    return null;
  }

  // Adjust current index if it's out of bounds after filtering
  const safeIndex = currentIndex >= validImages.length ? 0 : currentIndex;
  const showControls = validImages.length > 1;

  return (
    <div className="relative w-full h-48 overflow-hidden group">
      <img
        src={validImages[safeIndex]}
        alt={`${alt} - Image ${safeIndex + 1}`}
        className="w-full h-full object-cover transition-opacity duration-300"
        onError={() => handleImageError(images.indexOf(validImages[safeIndex]))}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/80" />
      
      {showControls && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handlePrevious}
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleNext}
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {validImages.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === safeIndex
                    ? 'bg-destructive w-4'
                    : 'bg-white/50 hover:bg-white/70'
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
