import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { generatedImages } from "@/content/generatedImages";
import { AlertTriangle, ArrowLeft, Shield } from "lucide-react";

export function ObsessionScreamPage() {
  const handleBack = () => {
    window.location.hash = "#/";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleViewRules = () => {
    window.location.hash = "#/rules/haunted-house/obsession-scream";
    window.scrollTo({ top: 0, behavior: "smooth" });
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

        <Alert
          variant="destructive"
          className="mb-8 border-destructive bg-destructive/10"
        >
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle className="text-lg font-bold">
            EXTREME HORROR WARNING
          </AlertTitle>
          <AlertDescription className="text-sm">
            This haunted house contains intense psychological horror, strobe
            lights, confined spaces, and themes of obsession. Not recommended
            for guests with heart conditions, anxiety disorders, or
            claustrophobia. Pregnant guests should not enter. You must be 18+ or
            accompanied by an adult.
          </AlertDescription>
        </Alert>

        <div className="space-y-8">
          <div>
            <h1 className="text-5xl font-bold text-destructive bloody-text mb-4">
              Obsession Scream
            </h1>
            <p className="text-2xl text-muted-foreground italic mb-6">
              When Obsession Turns Deadly
            </p>
          </div>

          <div className="relative w-full overflow-hidden rounded-lg border-2 border-destructive/30">
            <img
              src={generatedImages.hauntedHouses["Obsession Scream"]}
              alt="Leslie from Obsession Scream"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>

          <div className="prose prose-invert max-w-none">
            <h2 className="text-3xl font-bold text-destructive mb-4">
              The Experience
            </h2>
            <p className="text-lg leading-relaxed mb-6">
              Step into the twisted mind of Leslie, a terrifying teen with long
              purple hair who has turned her obsession into your nightmare. This
              psychological horror experience features intense scenes of
              obsession, scream-inducing jump scares, and a relentless pursuit
              through twisted corridors.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              Leslie has created a shrine to her darkest desires, and you're
              about to become part of it. Navigate through Leslie's Lair, the
              Hall of Obsession, and the Shrine Room as you try to escape her
              clutches. Every corner holds a new terror, every shadow could be
              Leslie waiting to strike.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              Are you brave enough to face what happens when teenage obsession
              spirals into pure terror? Leslie is waiting for you, and she
              doesn't like to be kept waiting.
            </p>
          </div>

          <div className="bg-card/50 border border-destructive/20 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-destructive mb-4">
              Meet Leslie
            </h3>
            <p className="text-base leading-relaxed">
              Leslie is a terrifying teen with long purple hair, known for her
              sudden mood swings and unpredictable behavior. Her obsession knows
              no bounds, and she has transformed her world into a nightmare
              realm where she reigns supreme. With her creepy voice and
              psychological scare tactics, Leslie will haunt your every step
              through this house of horrors.
            </p>
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
