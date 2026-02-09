import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { hauntedHouses } from '../content/hauntedHouses';
import { generatedImages } from '../content/generatedImages';

export function ClownTownSneakPeekPage() {
  const handleBackToHome = () => {
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clownTown = hauntedHouses.houses.find(h => h.name === 'clown town haunted house');
  const image = generatedImages.hauntedHouses['clown town haunted house'];

  if (!clownTown) return null;

  return (
    <div className="container mx-auto px-4 py-32">
      <Button
        onClick={handleBackToHome}
        variant="ghost"
        className="mb-8 text-destructive hover:text-destructive/80 hover:bg-destructive/10"
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        Back to Home
      </Button>

      <div className="max-w-6xl mx-auto">
        <Card className="bg-card/80 backdrop-blur-sm border-destructive/30 overflow-hidden">
          <div className="relative h-[600px] overflow-hidden">
            <img
              src={image}
              alt={clownTown.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
          </div>

          <CardHeader>
            <CardTitle className="text-4xl md:text-5xl text-destructive bloody-text">
              {clownTown.name}
            </CardTitle>
            <CardDescription className="text-destructive/80 italic font-semibold text-xl">
              {clownTown.tagline}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {clownTown.description}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
