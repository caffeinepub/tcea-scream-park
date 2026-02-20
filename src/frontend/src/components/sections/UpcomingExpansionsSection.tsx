import { Section } from '../layout/Section';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Ruler } from 'lucide-react';
import { themedLands } from '@/content/themedLands';

export function UpcomingExpansionsSection() {
  const plannedLands = themedLands.filter(land => land.status === 'planned');

  if (plannedLands.length === 0) {
    return null;
  }

  return (
    <Section
      id="upcoming-expansions"
      title="Future Expansions"
      subtitle="New themed lands coming to the park"
      icon={<MapPin className="h-10 w-10 text-primary" />}
    >
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {plannedLands.map((land) => (
          <Card
            key={land.id}
            className="bg-card/80 backdrop-blur-sm border-primary/20 overflow-hidden hover:border-primary/50 transition-all hover:shadow-lg"
          >
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <CardTitle className="text-2xl text-primary">
                  {land.name}
                </CardTitle>
                <Badge variant="outline" className="border-primary text-primary shrink-0">
                  Opening {land.openingYear}
                </Badge>
              </div>
              <CardDescription className="text-base">
                {land.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Ruler className="h-4 w-4 text-primary" />
                <span>{land.sizeSqFt.toLocaleString()} square feet</span>
              </div>
              
              {land.futureShows.length > 0 && (
                <div className="pt-2 border-t border-border/50">
                  <p className="text-sm font-semibold text-foreground mb-2">Featured Shows:</p>
                  <div className="flex flex-wrap gap-2">
                    {land.futureShows.map((show) => (
                      <Badge key={show} variant="secondary">
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
