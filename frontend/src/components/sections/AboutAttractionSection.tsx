import { Section } from '../layout/Section';
import { Card, CardContent } from '@/components/ui/card';
import { Building2 } from 'lucide-react';
import { generatedImages } from '@/content/generatedImages';

export function AboutAttractionSection() {
  return (
    <Section
      id="about-attraction"
      title="About the Attraction"
      subtitle="Discover the dark history of TCEA Scream Park"
      icon={<Building2 className="h-10 w-10 text-destructive" />}
    >
      <div className="max-w-5xl mx-auto">
        <Card className="bg-card/80 backdrop-blur-sm border-destructive/20 overflow-hidden">
          <div className="relative h-96 overflow-hidden">
            <img
              src="/assets/generated/attraction-exterior.dim_1600x900.jpg"
              alt="TCEA Scream Park Exterior"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
          </div>
          <CardContent className="space-y-6 pt-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-destructive bloody-text">
                The Building
              </h3>
              <p className="text-foreground/90 leading-relaxed">
                TCEA Scream Park is a massive indoor-outdoor hybrid scream park featuring multiple haunted houses contained within a sprawling industrial complex, surrounded by outdoor scare zones that transform the grounds into a nightmare landscape. The facility combines the claustrophobic terror of indoor attractions with the unpredictable chaos of outdoor zones, creating an immersive horror experience unlike any other. The haunted houses are meticulously designed within the building's dark corridors, while the outdoor zones feature the infamous Farewell Hayride and roaming scare actors who hunt through fog-filled pathways.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-destructive bloody-text">
                The Dark History
              </h3>
              <p className="text-foreground/90 leading-relaxed">
                TCEA Scream Park was originally planned to open in 2022, with construction completed and actors hired. But on the eve of opening night, something went terribly wrong. An evil spirit—awakened by the dark themes and horror imagery—took possession of the facility, forcing an immediate shutdown. For four years, the building sat abandoned, its halls echoing with unexplained sounds and its grounds shrouded in an unnatural fog. Paranormal investigators documented disturbing phenomena, and locals whispered of cursed ground. Finally, in 2026, after extensive spiritual cleansing and protective rituals, TCEA Scream Park opened its doors. But some say the evil spirit never truly left—it simply waits in the shadows, feeding on the fear of every guest who dares to enter.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
