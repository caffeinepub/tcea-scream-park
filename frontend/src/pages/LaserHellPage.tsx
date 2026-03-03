import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { scareZones } from '../content/scareZones';
import { generatedImages } from '../content/generatedImages';
import { ArrowLeft, MapPin } from 'lucide-react';

export function LaserHellPage() {
  const zone = scareZones.find(z => z.name === 'Laser Hell');

  const handleBackToHome = () => {
    window.location.hash = '';
    setTimeout(() => {
      const element = document.querySelector('#scare-zones');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  if (!zone) {
    return (
      <div className="container mx-auto px-4 py-32">
        <Button
          onClick={handleBackToHome}
          variant="ghost"
          className="mb-8 text-destructive hover:text-destructive/80 hover:bg-destructive/10"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Scare Zones
        </Button>
        <Card className="bg-card/80 backdrop-blur-sm border-destructive/30 max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl text-destructive">Zone Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">This scare zone is no longer available. Please check out our other terrifying zones!</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-32">
      <Button
        onClick={handleBackToHome}
        variant="ghost"
        className="mb-8 text-destructive hover:text-destructive/80 hover:bg-destructive/10"
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        Back to Scare Zones
      </Button>

      <div className="max-w-4xl mx-auto">
        <Card className="bg-card/80 backdrop-blur-sm border-destructive/30 overflow-hidden">
          <div className="relative h-[500px] overflow-hidden">
            <img
              src={generatedImages.scareZones['Laser Hell']}
              alt={zone.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
          </div>

          <CardHeader>
            <CardTitle className="text-4xl md:text-5xl text-destructive bloody-text">
              {zone.name}
            </CardTitle>
            {zone.location && (
              <CardDescription className="text-muted-foreground flex items-center gap-2 text-lg">
                <MapPin className="h-5 w-5" />
                {zone.location}
              </CardDescription>
            )}
            <CardDescription className="text-destructive/80 italic font-semibold text-xl">
              {zone.tagline}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {zone.description}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
