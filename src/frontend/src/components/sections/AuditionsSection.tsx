import { Section } from '../layout/Section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users, Mic, ExternalLink, Skull } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { AuditionPerksBlock } from './auditions/AuditionPerksBlock';
import { AuditionSignupEntryPoints } from './auditions/AuditionSignupEntryPoints';
import { ScareActorAuditionSignupDialog } from './auditions/ScareActorAuditionSignupDialog';
import { DancerAuditionSignupDialog } from './auditions/DancerAuditionSignupDialog';
import { generatedImages } from '@/content/generatedImages';
import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface Role {
  name: string;
  description?: string;
}

// Placeholder URL for Scream Team Auditions external link
const SCREAM_TEAM_AUDITIONS_URL = 'https://example.com/scream-team-auditions';

export function AuditionsSection() {
  const [scareActorDialogOpen, setScareActorDialogOpen] = useState(false);
  const [dancerDialogOpen, setDancerDialogOpen] = useState(false);

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
      subtitle="Only the fearless survive. Do you have what it takes to become a nightmare?"
      icon={<Skull className="h-10 w-10 text-destructive" />}
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* WARNING ALERT */}
        <Alert variant="destructive" className="border-2 border-destructive bg-destructive/10">
          <Skull className="h-5 w-5" />
          <AlertTitle className="text-xl font-bold">WARNING: EXTREME AUDITIONS</AlertTitle>
          <AlertDescription className="text-base">
            These auditions are not for the faint of heart. You will be pushed to your limits, tested beyond your comfort zone, and expected to embrace the darkness. Only those who can truly embody terror should apply.
          </AlertDescription>
        </Alert>

        {/* The Scream Team Auditions */}
        <Card className="bg-card/80 backdrop-blur-sm border-destructive/20 shadow-xl overflow-hidden">
          {auditionsImageUrl && (
            <AuditionsHeroImage src={auditionsImageUrl} alt="The Scream Team Auditions" />
          )}
          <CardHeader>
            <CardTitle className="text-3xl text-center text-destructive bloody-text">
              The Scream Team Auditions
            </CardTitle>
            <p className="text-center text-lg text-muted-foreground mt-2 font-semibold">
              Become the embodiment of fear. Join the elite who haunt the night.
            </p>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* External Auditions Link */}
            <div className="flex justify-center">
              <a
                href={SCREAM_TEAM_AUDITIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-destructive text-destructive-foreground rounded-lg font-semibold text-lg hover:bg-destructive/90 transition-colors shadow-lg hover:shadow-xl"
              >
                <Skull className="h-5 w-5" />
                Official Scream Team Auditions Portal
                <ExternalLink className="h-5 w-5" />
              </a>
            </div>

            <Separator className="bg-destructive/20" />

            {/* Date and Time Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-4 rounded-lg bg-destructive/10 border border-destructive/30">
                <Calendar className="h-6 w-6 text-destructive flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-1 text-destructive">Audition Dates</h3>
                  <p className="text-foreground font-medium">April 7th thru 17th</p>
                  <p className="text-sm text-muted-foreground mt-1">Every single day. No excuses.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-lg bg-destructive/10 border border-destructive/30">
                <Clock className="h-6 w-6 text-destructive flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-1 text-destructive">Audition Hours</h3>
                  <p className="text-foreground font-medium">4-9 pm</p>
                  <p className="text-sm text-muted-foreground mt-1">When darkness falls, we rise.</p>
                </div>
              </div>
            </div>

            {/* Perks Block */}
            <Separator className="bg-destructive/20" />
            <AuditionPerksBlock />
            <Separator className="bg-destructive/20" />

            {/* Roles */}
            <div>
              <h3 className="font-semibold text-xl mb-4 text-center text-destructive">Roles We're Hunting For</h3>
              <div className="flex flex-wrap gap-3 justify-center">
                {roles.map((role) => (
                  <Badge
                    key={role.name}
                    variant="outline"
                    className="text-base px-4 py-2 border-destructive/50 hover:bg-destructive/20 transition-colors font-semibold"
                  >
                    {role.name}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Signup Entry Points */}
            <Separator className="bg-destructive/20" />
            <AuditionSignupEntryPoints
              onScareActorClick={() => setScareActorDialogOpen(true)}
              onDancerClick={() => setDancerDialogOpen(true)}
            />
          </CardContent>
        </Card>

        {/* Show Host Auditions */}
        <Card className="bg-card/80 backdrop-blur-sm border-destructive/20 shadow-xl overflow-hidden">
          {showHostImageUrl && (
            <AuditionsHeroImage src={showHostImageUrl} alt="Show Host Auditions" />
          )}
          <CardHeader>
            <CardTitle className="text-3xl text-center text-destructive bloody-text">
              Show Host Auditions
            </CardTitle>
            <p className="text-center text-lg text-muted-foreground mt-2 font-semibold">
              Coming 2029 - Command the stage. Control the chaos. Become the voice of terror.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start gap-4 p-6 rounded-lg bg-destructive/10 border-2 border-destructive/30">
              <Mic className="h-8 w-8 text-destructive flex-shrink-0 mt-1" />
              <div className="space-y-3">
                <h3 className="font-semibold text-xl text-destructive">Be the Voice That Haunts Their Dreams</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We're seeking charismatic individuals with commanding presence to become the voice that brings our darkest shows to life. 
                  No experience required—just raw energy, unshakeable confidence, and the ability to captivate an audience while chaos unfolds around you. 
                  If you can hold a crowd's attention while nightmares come alive, this is your calling.
                </p>
                <div className="pt-2">
                  <Badge variant="outline" className="text-base px-4 py-2 border-destructive/40 bg-destructive/10 font-semibold">
                    No Qualifications Needed
                  </Badge>
                  <Badge variant="outline" className="text-base px-4 py-2 border-destructive/40 bg-destructive/10 ml-2 font-semibold">
                    Just Fearless Energy!
                  </Badge>
                </div>
              </div>
            </div>

            <div className="text-center p-4 bg-destructive/10 rounded-lg border border-destructive/20">
              <p className="text-lg font-semibold text-destructive">
                Auditions Opening in 2029
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                The wait will be worth it. Prepare yourself.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Audition Dialogs */}
      <ScareActorAuditionSignupDialog
        open={scareActorDialogOpen}
        onOpenChange={setScareActorDialogOpen}
      />
      <DancerAuditionSignupDialog
        open={dancerDialogOpen}
        onOpenChange={setDancerDialogOpen}
      />
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
