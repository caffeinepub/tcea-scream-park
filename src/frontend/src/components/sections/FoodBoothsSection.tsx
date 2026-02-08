import { Section } from '../layout/Section';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { foodBooths } from '../../content/foodBooths';
import { generatedImages } from '../../content/generatedImages';
import { UtensilsCrossed, Gift } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function FoodBoothsSection() {
  return (
    <Section
      id="food-booths"
      title="Food Booths"
      subtitle="Delicious food to fuel your fear"
      icon={<UtensilsCrossed className="h-10 w-10 text-destructive" />}
    >
      {/* Pricing and Free Samples Alert */}
      <div className="max-w-4xl mx-auto mb-8 space-y-4">
        <Alert className="bg-destructive/10 border-destructive/40">
          <Gift className="h-5 w-5 text-destructive" />
          <AlertDescription className="text-lg font-semibold">
            All food is $9
          </AlertDescription>
        </Alert>
        <Alert className="bg-accent/50 border-destructive/30">
          <Gift className="h-5 w-5 text-destructive" />
          <AlertDescription>
            Free samples after procession for honey boneless wings
          </AlertDescription>
        </Alert>
        <Alert className="bg-accent/50 border-destructive/30">
          <UtensilsCrossed className="h-5 w-5 text-destructive" />
          <AlertDescription className="text-lg font-semibold italic">
            Lucky we can't scare you all while you eat
          </AlertDescription>
        </Alert>
      </div>

      {/* Food Booths Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foodBooths.booths.map((booth, index) => (
          <Card
            key={index}
            className="bg-card/80 backdrop-blur-sm border-destructive/30 hover:border-destructive/60 transition-all hover:shadow-glow-green overflow-hidden"
          >
            {/* Booth Image */}
            <div className="relative h-40 overflow-hidden">
              <img
                src={generatedImages.foodBooths[booth.name as keyof typeof generatedImages.foodBooths]}
                alt={booth.name}
                className="w-full h-full object-cover transition-transform hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
            </div>

            <CardHeader>
              <CardTitle className="text-xl text-destructive">{booth.name}</CardTitle>
              {booth.label && (
                <CardDescription className="text-muted-foreground italic">
                  {booth.label}
                </CardDescription>
              )}
              <CardDescription className="text-destructive/80 italic font-semibold">
                {booth.tagline}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {booth.description}
              </p>
              <div className="border-t border-destructive/20 pt-3 mt-3">
                <p className="text-xs font-semibold text-foreground mb-2">Menu:</p>
                <ul className="space-y-2">
                  {booth.menu.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-destructive mt-1">•</span>
                      <div className="flex-1">
                        <span className="text-sm text-muted-foreground font-semibold block">
                          {typeof item === 'string' ? item : item.name}
                        </span>
                        {typeof item === 'object' && item.description && (
                          <span className="text-xs text-muted-foreground/70 italic block mt-0.5">
                            {item.description}
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
