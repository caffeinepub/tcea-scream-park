import { Section } from '../layout/Section';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { hauntedHouses } from '@/content/hauntedHouses';
import { generatedImages } from '@/content/generatedImages';

export function SchoolhouseSneakPeekSection() {
  const schoolhouse = hauntedHouses.houses.find(h => h.name === 'Schoolhouse break and blackout');
  const clownTown = hauntedHouses.houses.find(h => h.name === 'Clown town');
  const hellHole = hauntedHouses.houses.find(h => h.name === 'Terror Hell hole');
  const toysComeToPlay = hauntedHouses.houses.find(h => h.name === 'Toys Come to Play');

  const schoolhouseImage = generatedImages.hauntedHouses['Schoolhouse break and blackout'];
  const clownTownImage = generatedImages.hauntedHouses['Clown town'];
  const hellHoleImage = generatedImages.hauntedHouses['Terror Hell hole'];
  const toysImage = generatedImages.hauntedHouses['Toys Come to Play'];

  const sneakPeeks = [
    {
      title: schoolhouse?.name || 'Schoolhouse',
      tagline: schoolhouse?.tagline || '',
      description: schoolhouse?.description || '',
      image: schoolhouseImage,
      route: '#sneak-peek/schoolhouse',
    },
    {
      title: clownTown?.name || 'Clown Town',
      tagline: clownTown?.tagline || '',
      description: clownTown?.description || '',
      image: clownTownImage,
      route: '#sneak-peek/clown-town',
    },
    {
      title: hellHole?.name || 'Hell Hole',
      tagline: hellHole?.tagline || '',
      description: hellHole?.description || '',
      image: hellHoleImage,
      route: '#sneak-peek/hell-hole',
    },
    {
      title: toysComeToPlay?.name || 'Toys Come to Play',
      tagline: toysComeToPlay?.tagline || '',
      description: toysComeToPlay?.description || '',
      image: toysImage,
      route: '#sneak-peek/toys-come-to-play',
    },
  ];

  const handleNavigate = (route: string) => {
    window.location.hash = route;
  };

  return (
    <Section
      id="sneak-peeks"
      title="Sneak Peeks"
      subtitle="Get an exclusive look inside our most terrifying attractions"
      icon={<Eye className="h-10 w-10 text-destructive" />}
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {sneakPeeks.map((peek) => (
          <Card
            key={peek.title}
            className="bg-card/80 backdrop-blur-sm border-destructive/30 overflow-hidden hover:border-destructive/50 transition-all hover:shadow-glow-green group"
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={peek.image}
                alt={peek.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
            </div>

            <CardHeader>
              <CardTitle className="text-2xl text-destructive bloody-text">
                {peek.title}
              </CardTitle>
              <CardDescription className="text-destructive/80 italic font-semibold">
                {peek.tagline}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground line-clamp-3">
                {peek.description}
              </p>
              <Button
                onClick={() => handleNavigate(peek.route)}
                variant="outline"
                className="w-full border-destructive/30 hover:bg-destructive/10 hover:border-destructive/50"
              >
                <Eye className="mr-2 h-4 w-4" />
                View Full Sneak Peek
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
