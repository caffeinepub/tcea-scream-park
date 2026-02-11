import { Section } from '../layout/Section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users, Mic } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { AuditionPerksBlock } from './auditions/AuditionPerksBlock';
import { generatedImages } from '@/content/generatedImages';
import { useState } from 'react';

interface Role {
  name: string;
  description?: string;
}

export function AuditionsSection() {
  const roles: Role[] = [
    { name: 'Sliders' },
    { name: 'Stilts' },
    { name: 'Dancers' },
    { name: 'Chainsaws' },
    { name: 'Fire Dancers' },
  ];

  const auditionsImageUrl = generatedImages.auditions['The Scream Team Auditions'];
  const showHostImageUrl = generatedImages.auditions['Show Host Auditions'];

  return (
    <Section
      id="auditions"
      title="Join The Scream Team"
      subtitle="We're hiring fearless performers for the most terrifying show on earth"
      icon={<Users className="h-10 w-10 text-destructive" />}
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* The Scream Team Auditions */}
        <Card className="bg-card/80 backdrop-blur-sm border-destructive/20 shadow-xl overflow-hidden">
          {auditionsImageUrl && (
            <AuditionsHeroImage src={auditionsImageUrl} alt="The Scream Team Auditions" />
          )}
          <CardHeader>
            <CardTitle className="text-3xl text-center text-destructive">
              The Scream Team Auditions
            </CardTitle>
            <p className="text-center text-lg text-muted-foreground mt-2">
              Be part of the elite team that brings nightmares to life
            </p>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Date and Time Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-4 rounded-lg bg-accent/50">
                <Calendar className="h-6 w-6 text-destructive flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Audition Dates</h3>
                  <p className="text-muted-foreground">April 7th thru 17th</p>
                  <p className="text-sm text-muted-foreground mt-1">Every day</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-lg bg-accent/50">
                <Clock className="h-6 w-6 text-destructive flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Audition Hours</h3>
                  <p className="text-muted-foreground">4-9 pm</p>
                  <p className="text-sm text-muted-foreground mt-1">Daily schedule</p>
                </div>
              </div>
            </div>

            {/* Perks Block */}
            <Separator className="bg-destructive/20" />
            <AuditionPerksBlock />
            <Separator className="bg-destructive/20" />

            {/* Roles */}
            <div>
              <h3 className="font-semibold text-xl mb-4 text-center">Roles We're Hiring</h3>
              <div className="flex flex-wrap gap-3 justify-center">
                {roles.map((role) => (
                  <Badge
                    key={role.name}
                    variant="outline"
                    className="text-base px-4 py-2 border-destructive/30 hover:bg-destructive/10 transition-colors"
                  >
                    {role.name}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Show Host Auditions */}
        <Card className="bg-card/80 backdrop-blur-sm border-destructive/20 shadow-xl overflow-hidden">
          {showHostImageUrl && (
            <AuditionsHeroImage src={showHostImageUrl} alt="Show Host Auditions" />
          )}
          <CardHeader>
            <CardTitle className="text-3xl text-center text-destructive">
              Show Host Auditions
            </CardTitle>
            <p className="text-center text-lg text-muted-foreground mt-2">
              Coming 2029 - Be the voice of the shows
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start gap-4 p-6 rounded-lg bg-accent/50 border border-destructive/20">
              <Mic className="h-8 w-8 text-destructive flex-shrink-0 mt-1" />
              <div className="space-y-3">
                <h3 className="font-semibold text-xl text-destructive">Come Be the Voice of the Shows!</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We're looking for energetic and enthusiastic individuals to become the voice that brings our shows to life. 
                  No experience required—just bring your energy, happiness, and passion for entertainment!
                </p>
                <div className="pt-2">
                  <Badge variant="outline" className="text-base px-4 py-2 border-destructive/30 bg-destructive/5">
                    No Qualifications Needed
                  </Badge>
                  <Badge variant="outline" className="text-base px-4 py-2 border-destructive/30 bg-destructive/5 ml-2">
                    Just Be Happy & Energetic!
                  </Badge>
                </div>
              </div>
            </div>

            <div className="text-center p-4 bg-destructive/10 rounded-lg border border-destructive/20">
              <p className="text-lg font-semibold text-destructive">
                Auditions Opening in 2029
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Stay tuned for more details!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}

function AuditionsHeroImage({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return null;
  }

  return (
    <div className="relative w-full h-64 overflow-hidden">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        onError={() => setImageError(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-card" />
    </div>
  );
}
