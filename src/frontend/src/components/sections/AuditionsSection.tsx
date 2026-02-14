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

        {/* View All Auditions Button */}
        <div className="flex justify-center">
          <Button
            onClick={handleViewAllAuditions}
            size="lg"
            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground font-bold text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
          >
            <ExternalLink className="mr-2 h-5 w-5" />
            View All Auditions & Apply
          </Button>
        </div>

        <Separator className="bg-destructive/20" />

        {/* Costume Character Auditions - NEW */}
        <Card className="bg-card/80 backdrop-blur-sm border-primary/30 shadow-xl overflow-hidden poster-spotlight">
          {costumeCharacterImageUrl && (
            <AuditionsHeroImage 
              src={costumeCharacterImageUrl} 
              alt="Costume Character Auditions - Riley the bear, Ace, Kevin, and Rocky" 
            />
          )}
          <CardHeader>
            <CardTitle className="text-3xl text-center text-primary">
              Costume Character Auditions
            </CardTitle>
            <p className="text-center text-lg text-muted-foreground mt-2 font-semibold">
              Bring joy and wonder as one of our beloved costume characters!
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Promotional Description */}
            <div className="prose prose-invert max-w-none text-center">
              <p className="text-base leading-relaxed text-foreground">
                We're searching for energetic, expressive performers to bring our beloved costume characters to life! 
                Join our talented cast and become part of the magic as one of our 7 amazing characters. 
                These roles require physical stamina, enthusiasm, and a passion for entertaining guests of all ages. 
                Whether you're hugging fans, posing for photos, or dancing through the park, you'll create unforgettable 
                memories every single day. No prior costume character experience required—just bring your energy and love for performance!
              </p>
            </div>

            <Separator className="bg-primary/20" />

            {/* Date and Time Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-4 rounded-lg bg-primary/10 border border-primary/30 poster-spotlight">
                <Calendar className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-1 text-primary">Audition Date</h3>
                  <p className="text-foreground font-medium">March 9th</p>
                  <p className="text-sm text-muted-foreground mt-1">Mark your calendar!</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-lg bg-primary/10 border border-primary/30 poster-spotlight">
                <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-1 text-primary">Audition Time</h3>
                  <p className="text-foreground font-medium">4-6 pm</p>
                  <p className="text-sm text-muted-foreground mt-1">Two hours of fun auditions!</p>
                </div>
              </div>
            </div>

            {/* Character Roster - 7 Characters */}
            <div>
              <h3 className="font-semibold text-xl mb-4 text-center text-primary">Meet Our Characters</h3>
              <div className="flex flex-wrap gap-3 justify-center">
                <Badge
                  variant="outline"
                  className="text-base px-4 py-2 border-amber-500/50 bg-amber-500/10 hover:bg-amber-500/20 transition-colors font-semibold"
                >
                  Riley the Bear
                </Badge>
                <Badge
                  variant="outline"
                  className="text-base px-4 py-2 border-blue-500/50 bg-blue-500/10 hover:bg-blue-500/20 transition-colors font-semibold"
                >
                  Ace
                </Badge>
                <Badge
                  variant="outline"
                  className="text-base px-4 py-2 border-green-500/50 bg-green-500/10 hover:bg-green-500/20 transition-colors font-semibold"
                >
                  Kevin
                </Badge>
                <Badge
                  variant="outline"
                  className="text-base px-4 py-2 border-red-500/50 bg-red-500/10 hover:bg-red-500/20 transition-colors font-semibold"
                >
                  Rocky
                </Badge>
                <Badge
                  variant="outline"
                  className="text-base px-4 py-2 border-purple-500/50 bg-purple-500/10 hover:bg-purple-500/20 transition-colors font-semibold"
                >
                  Character 5
                </Badge>
                <Badge
                  variant="outline"
                  className="text-base px-4 py-2 border-pink-500/50 bg-pink-500/10 hover:bg-pink-500/20 transition-colors font-semibold"
                >
                  Character 6
                </Badge>
                <Badge
                  variant="outline"
                  className="text-base px-4 py-2 border-orange-500/50 bg-orange-500/10 hover:bg-orange-500/20 transition-colors font-semibold"
                >
                  Character 7
                </Badge>
              </div>
            </div>

            <Separator className="bg-primary/20" />

            {/* Minimum Qualifications */}
            <div className="bg-primary/10 border border-primary/30 rounded-lg p-6 poster-spotlight">
              <h3 className="font-semibold text-xl mb-4 text-center text-primary">Minimum Qualifications</h3>
              <p className="text-center text-muted-foreground mb-4">
                All applicants must meet the following minimum requirements:
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex flex-col items-center gap-2 p-4 bg-primary/5 rounded-lg">
                  <Ruler className="h-8 w-8 text-primary" />
                  <span className="font-semibold text-primary">Height</span>
                  <span className="text-sm text-muted-foreground">Required</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 bg-primary/5 rounded-lg">
                  <Weight className="h-8 w-8 text-primary" />
                  <span className="font-semibold text-primary">Weight</span>
                  <span className="text-sm text-muted-foreground">Required</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 bg-primary/5 rounded-lg">
                  <User className="h-8 w-8 text-primary" />
                  <span className="font-semibold text-primary">Age</span>
                  <span className="text-sm text-muted-foreground">Required</span>
                </div>
              </div>
            </div>

            {/* Apply Now Button */}
            {costumeCharacterLink && (
              <div className="flex justify-center pt-4">
                <a
                  href={costumeCharacterLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-bold text-lg hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
                >
                  Apply Now
                  <ExternalLink className="h-5 w-5" />
                </a>
              </div>
            )}
          </CardContent>
        </Card>

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
                    Just Bring Your Voice
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dialogs */}
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
