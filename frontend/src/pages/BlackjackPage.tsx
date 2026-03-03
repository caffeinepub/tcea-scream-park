import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, AlertTriangle, Shield } from 'lucide-react';
import { generatedImages } from '@/content/generatedImages';
import { hauntedHouses } from '@/content/hauntedHouses';

export function BlackjackPage() {
  const house = hauntedHouses.houses.find(h => h.name === 'Blackjack');

  const handleBack = () => {
    window.location.hash = '#/';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewRules = () => {
    window.location.hash = '#/rules/haunted-house/blackjack';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Button
          onClick={handleBack}
          variant="outline"
          className="mb-8 border-destructive/40 text-destructive hover:bg-destructive/10"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Haunted Houses
        </Button>

        <Alert variant="destructive" className="mb-8 border-destructive bg-destructive/10">
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle className="text-lg font-bold">EXTREME HORROR WARNING</AlertTitle>
          <AlertDescription className="text-sm">
            Blackjack contains intense carnie and clown-themed horror, strobe lights, loud noises, confined spaces,
            and extreme jump scares. Not recommended for guests with heart conditions, anxiety disorders, or
            coulrophobia (fear of clowns). Pregnant guests should not enter. You must be 18+ or accompanied by an adult.
          </AlertDescription>
        </Alert>

        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-5xl font-bold text-destructive bloody-text">
                Blackjack
              </h1>
              <Badge className="bg-destructive text-destructive-foreground text-sm">HIGH INTENSITY</Badge>
            </div>
            <p className="text-2xl text-muted-foreground italic mb-6">
              {house?.tagline ?? 'The house always wins. Your soul is the ante.'}
            </p>
          </div>

          {/* Hero Image */}
          <div className="relative w-full overflow-hidden rounded-lg border-2 border-destructive/30">
            <img
              src={generatedImages.blackjack.hero}
              alt="Blackjack Haunted House"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>

          {/* Description */}
          <div className="prose prose-invert max-w-none">
            <h2 className="text-3xl font-bold text-destructive mb-4">Step Into the Big Top of Terror</h2>
            <p className="text-lg leading-relaxed mb-6">
              Step right up to the most twisted carnival on earth — if you dare. Blackjack is a deranged carnie and
              clown-themed haunted house where the big top has gone completely mad. Demented carnies deal cards soaked
              in blood, manic clowns lurk behind every rigged game booth, and the funhouse mirrors show you things
              that can't be unseen.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              The ringmaster has lost his mind, the performers have lost their humanity, and the only way out is
              through. Navigate through the twisted midway, the hall of broken mirrors, the rigged game gallery,
              and the big top finale where the real show begins. Every corner hides a new nightmare, every shadow
              conceals a grinning face.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              Place your bets, spin the wheel of terror, and pray the house doesn't collect what it's owed.
              In Blackjack, everyone loses — but some lose more than others.
            </p>
          </div>

          {/* What to Expect */}
          <div className="bg-card/50 border border-destructive/20 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-destructive mb-4">What to Expect</h3>
            <ul className="space-y-2 text-base leading-relaxed text-foreground/90">
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-1">🃏</span>
                <span>Deranged carnies and manic clowns at every turn</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-1">🎪</span>
                <span>Twisted funhouse mirrors and disorienting carnival environments</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-1">🎠</span>
                <span>Rigged game booths with horrifying prizes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-1">🤡</span>
                <span>Extreme jump scares and psychological horror</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-1">🎡</span>
                <span>A grand finale in the big top that you won't forget</span>
              </li>
            </ul>
          </div>

          {/* Gallery */}
          <div>
            <h3 className="text-2xl font-bold text-destructive mb-4">Gallery — What Awaits You</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="relative overflow-hidden rounded-lg border border-destructive/20 group">
                <img
                  src={generatedImages.blackjack.gallery1}
                  alt="Blackjack - The Twisted Midway"
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <p className="absolute bottom-2 left-2 text-xs text-muted-foreground font-semibold">The Twisted Midway</p>
              </div>
              <div className="relative overflow-hidden rounded-lg border border-destructive/20 group">
                <img
                  src={generatedImages.blackjack.gallery2}
                  alt="Blackjack - Hall of Broken Mirrors"
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <p className="absolute bottom-2 left-2 text-xs text-muted-foreground font-semibold">Hall of Broken Mirrors</p>
              </div>
              <div className="relative overflow-hidden rounded-lg border border-destructive/20 group">
                <img
                  src={generatedImages.blackjack.gallery3}
                  alt="Blackjack - The Big Top Finale"
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <p className="absolute bottom-2 left-2 text-xs text-muted-foreground font-semibold">The Big Top Finale</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={handleViewRules}
              className="flex-1 bg-destructive hover:bg-destructive/90"
            >
              <Shield className="mr-2 h-4 w-4" />
              View Guest Rules & Safety
            </Button>
            <Button
              onClick={handleBack}
              variant="outline"
              className="flex-1 border-destructive/40 text-destructive hover:bg-destructive/10"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Houses
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
