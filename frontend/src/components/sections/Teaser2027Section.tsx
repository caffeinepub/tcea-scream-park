import { Section } from '../layout/Section';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calendar, Skull } from 'lucide-react';

export function Teaser2027Section() {
  const newHouses = [
    {
      name: "Hogs Pen",
      tagline: "Where the slaughter never ends",
      teaser: "Deep in the forgotten farmlands, the Hogs Pen awaits. What was once a simple livestock operation has become a feeding ground for unspeakable horrors. The squeals you hear aren't from pigs anymore. They're from those who wandered too close and discovered what really feeds in the darkness. The butcher's blade is sharp, and the hogs are always hungry.",
    },
    {
      name: "Shattered Minds",
      tagline: "Sanity is just a memory here",
      teaser: "Step inside the abandoned psychiatric facility where experimental treatments went horrifically wrong. The patients never left—they evolved into something far worse. Reality fractures with every step through twisted corridors where the walls whisper your deepest fears. Your mind will betray you. Your screams will echo forever. Some doors should never be opened.",
    },
  ];

  return (
    <Section
      id="coming-2027"
      title="Coming 2027"
      subtitle="The nightmare expands..."
      icon={<Calendar className="h-10 w-10 text-destructive" />}
    >
      <div className="max-w-4xl mx-auto mb-8">
        <Card className="bg-gradient-to-br from-destructive/20 to-destructive/5 border-destructive/40 shadow-glow-green">
          <CardContent className="pt-6 text-center">
            <Skull className="h-12 w-12 text-destructive mx-auto mb-3 animate-pulse" />
            <p className="text-xl md:text-2xl text-destructive font-bold tracking-wide bloody-text">
              Two New Houses of Horror Await
            </p>
            <p className="text-muted-foreground mt-2">
              Prepare yourself for terrors beyond imagination
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {newHouses.map((house, index) => (
          <Card
            key={index}
            className="bg-card/80 backdrop-blur-sm border-destructive/40 hover:border-destructive/70 transition-all hover:shadow-glow-green-lg overflow-hidden"
          >
            <CardHeader className="border-b border-destructive/20 bg-destructive/5">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-5 w-5 text-destructive" />
                <span className="text-sm font-semibold text-destructive">2027</span>
              </div>
              <CardTitle className="text-2xl md:text-3xl text-destructive bloody-text">
                {house.name}
              </CardTitle>
              <CardDescription className="text-destructive/80 italic font-semibold text-base">
                {house.tagline}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-muted-foreground leading-relaxed">
                {house.teaser}
              </p>
              <div className="mt-6 pt-4 border-t border-destructive/20">
                <p className="text-sm text-center text-destructive/70 italic">
                  More details coming soon...
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
