import { Section } from '../layout/Section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Users, Mic, ExternalLink, Skull, Ruler, Weight, User } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { AuditionPerksBlock } from './auditions/AuditionPerksBlock';
import { AuditionSignupEntryPoints } from './auditions/AuditionSignupEntryPoints';
import { ScareActorAuditionSignupDialog } from './auditions/ScareActorAuditionSignupDialog';
import { DancerAuditionSignupDialog } from './auditions/DancerAuditionSignupDialog';
import { generatedImages } from '@/content/generatedImages';
import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useGetAuditionLinks } from '@/hooks/useAuditionLinks';

interface Role {
  name: string;
  description?: string;
}

function AuditionsHeroImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-full h-64 overflow-hidden">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-card" />
    </div>
  );
}

export function AuditionsSection() {
  const [scareActorDialogOpen, setScareActorDialogOpen] = useState(false);
  const [dancerDialogOpen, setDancerDialogOpen] = useState(false);
  const { data: auditionLinks } = useGetAuditionLinks();

  const roles: Role[] = [
    { name: 'Sliders' },
    { name: 'Stilts' },
    { name: 'Dancers' },
    { name: 'Chainsaws' },
    { name: 'Fire Dancers' },
  ];

  const auditionsImageUrl = generatedImages.auditions['The Scream Team Auditions'];
  const showHostImageUrl = generatedImages.auditions['Show Host Auditions'];
  const costumeCharacterImageUrl = generatedImages.auditions['Costume Character Auditions'];

  // Helper to find costume character audition URL
  const costumeCharacterLink = auditionLinks?.find(
    link => link.auditionType === 'scareActor' && link.title.toLowerCase().includes('costume')
  );

  const handleViewAllAuditions = () => {
    window.location.hash = '#/auditions';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToScareActorAudition = () => {
    window.location.hash = '#/auditions/scare-actor';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToDancerAudition = () => {
    window.location.hash = '#/auditions/dancer';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
            These positions require physical stamina, mental fortitude, and the ability to terrify. 
            You will work in intense conditions, wear heavy costumes, and perform extreme scares. 
            Only apply if you are prepared for the most demanding haunt experience of your life.
          </AlertDescription>
        </Alert>

        {/* PERKS BLOCK */}
        <AuditionPerksBlock />

        {/* COSTUME CHARACTER AUDITIONS */}
        <Card className="bg-card/80 backdrop-blur-sm border-destructive/20 overflow-hidden">
          <AuditionsHeroImage src={costumeCharacterImageUrl} alt="Costume Character Auditions" />
          <CardHeader>
            <CardTitle className="text-3xl text-destructive bloody-text flex items-center gap-2">
              <Users className="h-8 w-8" />
              Costume Character Auditions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-destructive mt-1 shrink-0" />
                <div>
                  <h4 className="font-bold text-lg text-destructive">Character Roster (7 Total)</h4>
                  <p className="text-sm text-muted-foreground">Riley, Ace, Kevin, Rocky, Felix, Vicky, Emily</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Ruler className="h-5 w-5 text-destructive mt-1 shrink-0" />
                <div>
                  <h4 className="font-bold text-lg text-destructive">Height Requirements</h4>
                  <p className="text-sm text-muted-foreground">Minimum 5'6" (varies by character)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Weight className="h-5 w-5 text-destructive mt-1 shrink-0" />
                <div>
                  <h4 className="font-bold text-lg text-destructive">Physical Requirements</h4>
                  <p className="text-sm text-muted-foreground">Must meet character-specific weight ranges and be able to perform in full costume for extended periods</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-destructive mt-1 shrink-0" />
                <div>
                  <h4 className="font-bold text-lg text-destructive">Age Minimum</h4>
                  <p className="text-sm text-muted-foreground">18+ years old</p>
                </div>
              </div>
            </div>

            <Separator className="bg-destructive/20" />

            <p className="text-sm text-muted-foreground leading-relaxed">
              Costume characters are the face of TCEA Scream Park. You will interact with guests, pose for photos, 
              and bring beloved (and terrifying) characters to life. This role requires exceptional physical stamina, 
              the ability to perform in heavy costumes in all weather conditions, and strong improvisational skills.
            </p>

            {costumeCharacterLink && (
              <Button
                onClick={() => window.open(costumeCharacterLink.url, '_blank')}
                className="w-full bg-destructive hover:bg-destructive/90"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Apply for Costume Character
              </Button>
            )}
          </CardContent>
        </Card>

        {/* SCREAM TEAM AUDITIONS */}
        <Card className="bg-card/80 backdrop-blur-sm border-destructive/20 overflow-hidden">
          <AuditionsHeroImage src={auditionsImageUrl} alt="Scream Team Auditions" />
          <CardHeader>
            <CardTitle className="text-3xl text-destructive bloody-text flex items-center gap-2">
              <Skull className="h-8 w-8" />
              Scream Team Auditions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {roles.map((role) => (
                <Badge key={role.name} variant="destructive" className="text-sm px-3 py-1">
                  {role.name}
                </Badge>
              ))}
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              The Scream Team is the elite force of terror at TCEA Scream Park. As a scare actor, you will embody 
              nightmares, master the art of psychological horror, and deliver unforgettable scares. This role demands 
              creativity, physical endurance, and the ability to improvise in high-pressure situations.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={navigateToScareActorAudition}
                className="flex-1 bg-destructive hover:bg-destructive/90"
              >
                Apply for Scream Team
              </Button>
              <Button
                onClick={() => setScareActorDialogOpen(true)}
                variant="outline"
                className="flex-1 border-destructive/40 text-destructive hover:bg-destructive/10"
              >
                Quick Apply (Dialog)
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* SHOW HOST AUDITIONS */}
        <Card className="bg-card/80 backdrop-blur-sm border-destructive/20 overflow-hidden">
          <AuditionsHeroImage src={showHostImageUrl} alt="Show Host Auditions" />
          <CardHeader>
            <CardTitle className="text-3xl text-destructive bloody-text flex items-center gap-2">
              <Mic className="h-8 w-8" />
              Show Host Auditions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Show hosts are the charismatic masters of ceremonies who guide guests through the terror. You will 
              perform scripted segments, improvise crowd interactions, and maintain high energy throughout the night. 
              This role requires stage presence, vocal projection, and the ability to command an audience.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={navigateToDancerAudition}
                className="flex-1 bg-destructive hover:bg-destructive/90"
              >
                Apply for Show Host
              </Button>
              <Button
                onClick={() => setDancerDialogOpen(true)}
                variant="outline"
                className="flex-1 border-destructive/40 text-destructive hover:bg-destructive/10"
              >
                Quick Apply (Dialog)
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* SIGNUP ENTRY POINTS */}
        <AuditionSignupEntryPoints
          onScareActorClick={() => setScareActorDialogOpen(true)}
          onDancerClick={() => setDancerDialogOpen(true)}
        />

        {/* VIEW ALL AUDITIONS BUTTON */}
        <div className="text-center pt-4">
          <Button
            size="lg"
            onClick={handleViewAllAuditions}
            className="bg-destructive hover:bg-destructive/90 text-white text-lg px-12 py-6 shadow-glow-green"
          >
            <ExternalLink className="mr-2 h-5 w-5" />
            View All Auditions & Apply
          </Button>
        </div>
      </div>

      {/* DIALOGS */}
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
