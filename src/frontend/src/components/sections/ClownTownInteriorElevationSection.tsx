import { Section } from '../layout/Section';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Eye } from 'lucide-react';

export function ClownTownInteriorElevationSection() {
  return (
    <Section
      id="clown-town-interior"
      title="Inside Clown Town"
      subtitle="A sneak peek into madness"
      icon={<Eye className="h-10 w-10 text-destructive" />}
    >
      <div className="max-w-5xl mx-auto">
        <Card className="bg-card/80 backdrop-blur-sm border-destructive/30 overflow-hidden">
          {/* Interior Elevation Image */}
          <div className="relative h-96 overflow-hidden">
            <img
              src="/assets/generated/clown-town-interior-elevation.dim_1600x900.jpg"
              alt="Clown Town Interior Elevation"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
          </div>

          <CardHeader>
            <CardTitle className="text-3xl text-destructive bloody-text">
              Step Inside the Big Top
            </CardTitle>
            <CardDescription className="text-destructive/80 italic font-semibold text-lg">
              Where laughter turns to screams
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Peer into the twisted corridors of Clown Town, where the funhouse mirrors distort reality and 
              every corner hides a new terror. The deranged jesters have transformed this once-joyful circus 
              into a labyrinth of nightmares, complete with blood-stained carnival games and props that seem 
              to move on their own. This scenic elevation reveals just a glimpse of the horrors that await 
              inside—the full experience is far more terrifying than any preview can capture.
            </p>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
