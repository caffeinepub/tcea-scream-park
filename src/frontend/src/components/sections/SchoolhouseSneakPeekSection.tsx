import { Section } from '../layout/Section';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { schoolhouseSneakPeek } from '../../content/schoolhouseSneakPeek';
import { hauntedHouses } from '../../content/hauntedHouses';
import { generatedImages } from '../../content/generatedImages';
import { Eye } from 'lucide-react';

export function SchoolhouseSneakPeekSection() {
  const handleViewSneakPeek = (route: string) => {
    window.location.hash = route;
  };

  const clownTown = hauntedHouses.houses.find(h => h.name === 'clown town haunted house');
  const hellHole = hauntedHouses.houses.find(h => h.name === 'Terror Hell hole');

  const sneakPeeks = [
    {
      title: schoolhouseSneakPeek.title,
      subtitle: schoolhouseSneakPeek.subtitle,
      description: schoolhouseSneakPeek.description,
      image: schoolhouseSneakPeek.image,
      route: '#/schoolhouse',
    },
    {
      title: clownTown?.name || 'Clown Town',
      subtitle: clownTown?.tagline || '',
      description: clownTown?.description || '',
      image: generatedImages.hauntedHouses['clown town haunted house'],
      route: '#/clown-town',
    },
    {
      title: hellHole?.name || 'Terror Hell Hole',
      subtitle: hellHole?.tagline || '',
      description: hellHole?.description || '',
      image: generatedImages.hauntedHouses['Terror Hell hole'],
      route: '#/hell-hole',
    },
  ];

  return (
    <Section
      id="sneak-peek"
      title="Sneak Peek"
      subtitle="A glimpse into the terror ahead"
      icon={<Eye className="h-10 w-10 text-destructive" />}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sneakPeeks.map((peek) => (
          <Card
            key={peek.route}
            className="bg-card/80 backdrop-blur-sm border-destructive/30 hover:border-destructive/60 transition-all hover:shadow-glow-green overflow-hidden"
          >
            {/* Sneak Peek Image */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={peek.image}
                alt={peek.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
            </div>

            <CardHeader>
              <CardTitle className="text-2xl text-destructive bloody-text">
                {peek.title}
              </CardTitle>
              <CardDescription className="text-destructive/80 italic font-semibold">
                {peek.subtitle}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-base text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                {peek.description}
              </p>
              <Button
                onClick={() => handleViewSneakPeek(peek.route)}
                className="w-full bg-destructive hover:bg-destructive/80 text-background font-bold shadow-glow-green"
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
