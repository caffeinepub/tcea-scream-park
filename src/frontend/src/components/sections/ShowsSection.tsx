import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generatedImages } from "@/content/generatedImages";
import { shows } from "@/content/shows";
import { Calendar as CalendarIcon, Clock, Theater, Waves } from "lucide-react";
import { useState } from "react";
import { Section } from "../layout/Section";

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
          const imageUrl =
            generatedImages.shows[
              show.name as keyof typeof generatedImages.shows
            ];

          return (
            <Card
              key={show.name}
              className="bg-card/80 backdrop-blur-sm border-destructive/20 overflow-hidden hover:border-destructive/50 transition-all hover:shadow-glow-green relative group"
            >
              {/* Stage lighting effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-destructive/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10 animate-spotlight" />

              {/* Distressed texture overlay */}
              <div className="absolute inset-0 opacity-5 mix-blend-overlay pointer-events-none bg-noise" />

              {imageUrl && <ShowImage src={imageUrl} alt={show.name} />}
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <CardTitle className="text-2xl text-destructive bloody-text relative">
                    {show.name}
                    {/* Animated underline */}
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-destructive to-accent group-hover:w-full transition-all duration-500 shadow-glow-orange" />
                  </CardTitle>
                  <div className="flex flex-col gap-2 shrink-0">
                    {show.hauntSeasonOnly && (
                      <Badge
                        variant="destructive"
                        className="animate-pulse-slow"
                      >
                        Haunt Season Only
                      </Badge>
                    )}
                    {show.year && (
                      <Badge
                        variant="outline"
                        className="border-primary text-primary animate-pulse-slow"
                      >
                        Coming {show.year}
                      </Badge>
                    )}
                    {(show as any).specialTiming && (
                      <Badge
                        variant="outline"
                        className="border-accent text-accent flex items-center gap-1 animate-pulse-slow"
                      >
                        <Clock className="h-3 w-3" />
                        {(show as any).specialTiming}
                      </Badge>
                    )}
                    {(show as any).selectNights && (
                      <Badge
                        variant="outline"
                        className="border-muted-foreground text-muted-foreground flex items-center gap-1 animate-pulse-slow"
                      >
                        <CalendarIcon className="h-3 w-3" />
                        Select Nights
                      </Badge>
                    )}
                    {(show as any).annualMay && (
                      <Badge
                        variant="outline"
                        className="border-accent text-accent flex items-center gap-1 animate-pulse-slow"
                      >
                        <CalendarIcon className="h-3 w-3" />
                        Annual — May
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-white">
                  {show.description}
                </p>
              </CardContent>

              {/* Corner accent animations */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-destructive/40 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-destructive/40 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
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
        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
        onError={() => setImageError(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/80" />
      {/* Spotlight effect */}
      <div className="absolute inset-0 bg-gradient-radial from-destructive/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}
