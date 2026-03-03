import { Section } from '../layout/Section';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Mic, Music, Sparkles, UserCheck, ShieldCheck } from 'lucide-react';
import { generatedImages } from '@/content/generatedImages';
import { AuditionPerksBlock } from './auditions/AuditionPerksBlock';
import { useState } from 'react';
import { ScareActorAuditionSignupDialog } from './auditions/ScareActorAuditionSignupDialog';
import { DancerAuditionSignupDialog } from './auditions/DancerAuditionSignupDialog';
import { CostumeCharacterAuditionSignupDialog } from './auditions/CostumeCharacterAuditionSignupDialog';
import { UsherAuditionSignupDialog } from './auditions/UsherAuditionSignupDialog';
import { HauntedHouseSupervisorAuditionSignupDialog } from './auditions/HauntedHouseSupervisorAuditionSignupDialog';

export function AuditionsSection() {
  const [scareActorDialogOpen, setScareActorDialogOpen] = useState(false);
  const [dancerDialogOpen, setDancerDialogOpen] = useState(false);
  const [costumeCharacterDialogOpen, setCostumeCharacterDialogOpen] = useState(false);
  const [usherDialogOpen, setUsherDialogOpen] = useState(false);
  const [supervisorDialogOpen, setSupervisorDialogOpen] = useState(false);

  const handleNavigateToAuditions = () => {
    window.location.hash = '#auditions';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Section
        id="auditions"
        title="Join Our Team"
        subtitle="Become part of the terror. Auditions now open."
        icon={<Users className="h-10 w-10 text-destructive" />}
      >
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Row 1: Costume Character, Scream Team, Show Host */}
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-card/80 backdrop-blur-sm border-primary/30 overflow-hidden hover:border-primary/50 transition-all">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={generatedImages.auditions['Costume Character']}
                  alt="Costume Character Auditions"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl text-primary flex items-center gap-2">
                  <Sparkles className="h-6 w-6" />
                  Costume Character
                </CardTitle>
                <CardDescription>
                  Join our 2030 investment! New characters including Lola, Asher, Max, DD, and all new princesses
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground font-semibold">Requirements:</p>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Be vocal - some sing, some don't</li>
                    <li>Character performance skills</li>
                    <li>Comfortable in full-body costumes</li>
                    <li>Family-friendly demeanor</li>
                  </ul>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="shrink-0">Lola & Asher</Badge>
                  <Badge variant="secondary" className="shrink-0">Max & DD</Badge>
                  <Badge variant="secondary" className="shrink-0">Princesses</Badge>
                </div>
                <Button
                  onClick={() => setCostumeCharacterDialogOpen(true)}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Apply Now
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-destructive/30 overflow-hidden hover:border-destructive/50 transition-all">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={generatedImages.auditions['Scare Actor']}
                  alt="Scream Team Auditions"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl text-destructive flex items-center gap-2">
                  <Users className="h-6 w-6" />
                  Scream Team
                </CardTitle>
                <CardDescription>
                  Scare actors for haunted houses and scare zones
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground font-semibold">Requirements:</p>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>High energy and commitment</li>
                    <li>Ability to improvise</li>
                    <li>Physical stamina</li>
                    <li>Team player mentality</li>
                  </ul>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="shrink-0">Sliders</Badge>
                  <Badge variant="secondary" className="shrink-0">Chainsaws</Badge>
                  <Badge variant="secondary" className="shrink-0">In-house</Badge>
                  <Badge variant="secondary" className="shrink-0">Stilts</Badge>
                </div>
                <Button
                  onClick={() => setScareActorDialogOpen(true)}
                  className="w-full bg-destructive hover:bg-destructive/90"
                >
                  Apply Now
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-secondary/30 overflow-hidden hover:border-secondary/50 transition-all">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={generatedImages.auditions['Show Host']}
                  alt="Show Host Auditions"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl text-secondary flex items-center gap-2">
                  <Music className="h-6 w-6" />
                  Show Host
                </CardTitle>
                <CardDescription>
                  Dancers and performers for shows and processions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground font-semibold">Requirements:</p>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Dance experience preferred</li>
                    <li>Stage presence</li>
                    <li>Choreography skills</li>
                    <li>Performance background</li>
                  </ul>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="shrink-0">Outside Dancing</Badge>
                  <Badge variant="secondary" className="shrink-0">Inside Shows</Badge>
                </div>
                <Button
                  onClick={() => setDancerDialogOpen(true)}
                  className="w-full bg-secondary hover:bg-secondary/90"
                >
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Row 2: Usher Auditions + Haunted House Supervisors */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Usher Auditions */}
            <Card className="bg-card/80 backdrop-blur-sm border-primary/30 overflow-hidden hover:border-primary/50 transition-all">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={generatedImages.auditions['Usher']}
                  alt="Usher Auditions"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-primary text-primary-foreground font-bold">Ages 16+</Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl text-primary flex items-center gap-2">
                  <UserCheck className="h-6 w-6" />
                  Usher
                </CardTitle>
                <CardDescription>
                  Auditions: <strong className="text-foreground">March 2–3, 2027 | 2:00–7:00 PM</strong>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground font-semibold">Duties:</p>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Clean before and after the show</li>
                    <li>Monitor guests and performers</li>
                    <li>Report to Usher Supervisors</li>
                  </ul>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="shrink-0">Must be 16+</Badge>
                  <Badge variant="secondary" className="shrink-0">March 2027</Badge>
                </div>
                <Button
                  onClick={() => setUsherDialogOpen(true)}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Apply Now
                </Button>
              </CardContent>
            </Card>

            {/* Haunted House Supervisors */}
            <Card className="bg-card/80 backdrop-blur-sm border-destructive/30 overflow-hidden hover:border-destructive/50 transition-all relative">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={generatedImages.auditions['Haunted House Supervisors']}
                  alt="Haunted House Supervisor Auditions"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-destructive text-destructive-foreground font-bold animate-pulse">Coming 2026/27</Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl text-destructive flex items-center gap-2">
                  <ShieldCheck className="h-6 w-6" />
                  Haunted House Supervisors
                </CardTitle>
                <CardDescription>
                  Lead the terror — oversee actors, enforce safety, and keep the haunt running at full intensity
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground font-semibold">Responsibilities:</p>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Oversee haunted house actors and staff</li>
                    <li>Enforce safety protocols</li>
                    <li>Coordinate with park management</li>
                    <li>Maintain haunt atmosphere & guest experience</li>
                  </ul>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="shrink-0">Leadership</Badge>
                  <Badge variant="secondary" className="shrink-0">Safety</Badge>
                  <Badge variant="outline" className="shrink-0 border-destructive/40 text-destructive">2026/27 Season</Badge>
                </div>
                <Button
                  onClick={() => setSupervisorDialogOpen(true)}
                  className="w-full bg-destructive hover:bg-destructive/90"
                >
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          </div>

          <AuditionPerksBlock />

          <div className="text-center">
            <Button
              onClick={handleNavigateToAuditions}
              size="lg"
              variant="outline"
              className="border-destructive/40 text-destructive hover:bg-destructive/10"
            >
              <Mic className="mr-2 h-5 w-5" />
              View All Audition Opportunities
            </Button>
          </div>
        </div>
      </Section>

      <ScareActorAuditionSignupDialog
        open={scareActorDialogOpen}
        onOpenChange={setScareActorDialogOpen}
      />
      <DancerAuditionSignupDialog
        open={dancerDialogOpen}
        onOpenChange={setDancerDialogOpen}
      />
      <CostumeCharacterAuditionSignupDialog
        open={costumeCharacterDialogOpen}
        onOpenChange={setCostumeCharacterDialogOpen}
      />
      <UsherAuditionSignupDialog
        open={usherDialogOpen}
        onOpenChange={setUsherDialogOpen}
      />
      <HauntedHouseSupervisorAuditionSignupDialog
        open={supervisorDialogOpen}
        onOpenChange={setSupervisorDialogOpen}
      />
    </>
  );
}
