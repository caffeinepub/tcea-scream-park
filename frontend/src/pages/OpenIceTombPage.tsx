import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ArrowLeft, AlertTriangle, Shield } from 'lucide-react';
import { generatedImages } from '@/content/generatedImages';
import { hauntedHouses } from '@/content/hauntedHouses';
import { slugify } from '@/utils/slug';

export function OpenIceTombPage() {
  const house = hauntedHouses.houses.find(h => h.name === 'Open Ice Tomb');

  const handleBack = () => {
    window.location.hash = '#haunted-houses';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewRules = () => {
    const slug = slugify('Open Ice Tomb');
    window.location.hash = `#/rules/haunted-house/${slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!house) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <p className="text-center text-muted-foreground">House not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <Button
          variant="ghost"
          onClick={handleBack}
          className="mb-6 text-destructive hover:text-destructive/80"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Haunted Houses
        </Button>

        <Card className="bg-card/90 backdrop-blur-sm border-destructive/20 overflow-hidden">
          <div className="relative h-96 overflow-hidden">
            <img
              src={generatedImages.hauntedHouses['Open Ice Tomb']}
              alt="Open Ice Tomb"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
          </div>

          <CardHeader>
            <CardTitle className="text-4xl text-destructive bloody-text">
              {house.name}
            </CardTitle>
            <p className="text-xl text-muted-foreground italic font-semibold">
              {house.tagline}
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <Alert variant="destructive" className="border-2 border-destructive bg-destructive/10">
              <AlertTriangle className="h-5 w-5" />
              <AlertTitle className="text-xl font-bold">EXTREME HORROR WARNING</AlertTitle>
              <AlertDescription className="text-base">
                This Christmas-horror haunted house features extreme cold temperatures, intense scares, frozen corpses, 
                and frostbitten ghouls. Not recommended for guests with heart conditions, cold sensitivity, or claustrophobia. 
                Participation is at your own risk. You must be 18+ or accompanied by an adult.
              </AlertDescription>
            </Alert>

            <div className="prose prose-invert max-w-none">
              <p className="text-foreground/90 leading-relaxed text-lg">
                {house.description}
              </p>
            </div>

            <Button
              onClick={handleViewRules}
              size="lg"
              className="w-full bg-destructive hover:bg-destructive/90"
            >
              <Shield className="mr-2 h-5 w-5" />
              View Guest Rules Before Entering
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
