import { Section } from '../layout/Section';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Calendar } from 'lucide-react';
import { themedLands } from '@/content/themedLands';

export function UpcomingExpansionsSection() {
  return (
    <Section
      id="upcoming-expansions"
      title="Future Themed Lands"
      subtitle="Massive new worlds coming to TCEA Scream Park"
      icon={<Sparkles className="h-10 w-10 text-primary" />}
    >
      <div className="grid md:grid-cols-1 gap-8 max-w-4xl mx-auto">
        {themedLands.map((land) => (
          <Card
            key={land.id}
            className="bg-card/80 backdrop-blur-sm border-primary/20 overflow-hidden hover:border-primary/50 transition-all hover:shadow-lg"
          >
            <CardHeader>
              <div className="flex items-start justify-between gap-4 mb-2">
                <CardTitle className="text-3xl text-primary">
                  {land.name}
                </CardTitle>
                <div className="flex flex-col gap-2 shrink-0">
                  <Badge variant="outline" className="border-primary text-primary">
                    {land.status === 'planned' ? 'Planned' : land.status === 'underConstruction' ? 'Under Construction' : 'Open'}
                  </Badge>
                  <Badge variant="outline" className="border-accent text-accent flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Opening {land.openingYear}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription className="text-base leading-relaxed">
                {land.description}
              </CardDescription>
              
              <div className="border-t border-border/50 pt-4">
                <p className="text-sm font-semibold text-foreground mb-2">
                  Size: {land.sizeSqFt.toLocaleString()} sq ft
                </p>
              </div>

              {land.futureShows.length > 0 && (
                <div className="border-t border-border/50 pt-4">
                  <p className="text-sm font-semibold text-foreground mb-3">
                    Featured Shows:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {land.futureShows.map((show) => (
                      <Badge key={show} variant="secondary" className="text-sm">
                        {show}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
