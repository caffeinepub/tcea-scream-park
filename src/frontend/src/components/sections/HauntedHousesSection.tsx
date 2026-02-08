import { Section } from '../layout/Section';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { hauntedHouses } from '../../content/hauntedHouses';
import { generatedImages } from '../../content/generatedImages';
import { Home, Clock } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function HauntedHousesSection() {
  return (
    <Section
      id="haunted-houses"
      title="Haunted Houses"
      subtitle="Five terrifying attractions await you"
      icon={<Home className="h-10 w-10 text-destructive" />}
    >
      {/* Wait Times Info */}
      <div className="max-w-4xl mx-auto mb-8">
        <Alert className="bg-destructive/10 border-destructive/40">
          <Clock className="h-5 w-5 text-destructive" />
          <AlertDescription className="text-lg font-semibold">
            Wait Times: Expect 15-45 minute waits during peak hours. Lines move faster if you dare to run through faster.
          </AlertDescription>
        </Alert>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {hauntedHouses.houses.map((house, index) => (
          <Card
            key={index}
            className="bg-card/80 backdrop-blur-sm border-destructive/30 hover:border-destructive/60 transition-all hover:shadow-glow-green hover:scale-105 overflow-hidden"
          >
            {/* House Image with Blood Drip Overlay */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={generatedImages.hauntedHouses[house.name as keyof typeof generatedImages.hauntedHouses]}
                alt={house.name}
                className="w-full h-full object-cover transition-transform hover:scale-110"
              />
              {/* Blood drip overlay at top */}
              <div className="absolute top-0 left-0 right-0 h-24 pointer-events-none">
                <img
                  src="/assets/generated/card-top-blood-drip.dim_1600x240.png"
                  alt=""
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
            </div>
            
            <CardHeader>
              <CardTitle className="text-xl text-destructive bloody-text">
                {house.name}
              </CardTitle>
              <CardDescription className="text-destructive/80 italic font-semibold">
                {house.tagline}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {house.description}
              </p>

              {/* Sub-scenes for specific houses */}
              {house.scenes && house.scenes.length > 0 && (
                <div className="border-t border-destructive/20 pt-3 mt-3">
                  <p className="text-xs font-semibold text-destructive mb-2">Featured Scenes:</p>
                  <ul className="space-y-1">
                    {house.scenes.map((scene, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-destructive mt-0.5">•</span>
                        <span className="text-sm text-muted-foreground font-semibold">{scene}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="h-2 w-full bg-destructive/20 rounded-full overflow-hidden mt-4">
                <div className="h-full bg-destructive animate-pulse" style={{ width: '100%' }} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Location Info */}
      <Card className="max-w-3xl mx-auto bg-accent/50 border-destructive/30">
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            <span className="font-semibold text-foreground">Location:</span> {hauntedHouses.locationInfo}
          </p>
        </CardContent>
      </Card>
    </Section>
  );
}
