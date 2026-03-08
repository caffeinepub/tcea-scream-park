import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generatedImages } from "@/content/generatedImages";
import { hauntedHouses } from "@/content/hauntedHouses";
import { AlertTriangle, ArrowLeft, Users } from "lucide-react";

export function ToysComeToPlayPage() {
  const house = hauntedHouses.houses.find(
    (h) => h.name === "Toys Come to Play",
  );

  if (!house) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p>Haunted house not found</p>
      </div>
    );
  }

  const heroImage =
    "/assets/generated/toys-come-to-play-exterior.dim_1200x600.png";
  const blippyImage = "/assets/generated/blippy-scene.dim_800x600.png";
  const jiffyImage = "/assets/generated/jiffy-scene.dim_800x600.png";

  const handleBack = () => {
    window.location.hash = "#/";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleViewRules = () => {
    window.location.hash = "#/rules/haunted-house/toys-come-to-play";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src={heroImage}
          alt={house.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-destructive bloody-text mb-4">
              {house.name}
            </h1>
            <p className="text-2xl md:text-3xl text-destructive/80 italic font-semibold">
              {house.tagline}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        <Alert className="border-destructive/50 bg-destructive/10">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <AlertDescription className="text-foreground">
            <strong className="text-destructive">
              EXTREME HORROR WARNING:
            </strong>{" "}
            This attraction contains intense scares, disturbing toy imagery, and
            psychological horror. Not recommended for young children or those
            with pediophobia (fear of dolls). Never talk back—we just want to
            rip your head off.
          </AlertDescription>
        </Alert>

        <Card className="bg-card/80 backdrop-blur-sm border-destructive/20">
          <CardHeader>
            <CardTitle className="text-3xl text-destructive">
              About the Attraction
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg leading-relaxed text-foreground/90">
              {house.description}
            </p>

            <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-6">
              <h3 className="text-xl font-bold text-destructive mb-3 flex items-center gap-2">
                <Users className="h-5 w-5" />
                22 Different Scenes
              </h3>
              <p className="text-foreground/90 leading-relaxed">
                Navigate through 22 uniquely terrifying scenes, each designed to
                push your fears to the limit. Out of breath and almost headless,
                you'll encounter twisted toys at every turn. Each scene is
                meticulously crafted to leave a lasting impression—from the
                abandoned nursery to the toy factory floor, from the broken
                playroom to the collector's nightmare vault. The toys are
                waiting, and they have 22 different ways to make you scream.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm border-destructive/20">
          <CardHeader>
            <CardTitle className="text-3xl text-destructive">
              Featured Characters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="relative h-64 overflow-hidden rounded-lg border border-destructive/30">
                  <img
                    src={blippyImage}
                    alt="Blippy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-destructive mb-2">
                    Blippy
                  </h3>
                  <p className="text-foreground/90 leading-relaxed">
                    A twisted toy clown with a mischievous grin and a penchant
                    for chaos. Blippy was once the star of the toy factory's
                    promotional line, but something went terribly wrong during
                    production. Now he stalks the halls, leaving visitors out of
                    breath and almost headless as they try to escape his playful
                    yet deadly games.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="relative h-64 overflow-hidden rounded-lg border border-destructive/30">
                  <img
                    src={jiffyImage}
                    alt="Jiffy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-destructive mb-2">
                    Jiffy
                  </h3>
                  <p className="text-foreground/90 leading-relaxed">
                    A demented jack-in-the-box character that pops up when you
                    least expect it. Jiffy's spring-loaded terror has been
                    refined through countless scenes, each appearance more
                    shocking than the last. His creepy voice echoes through the
                    toy factory as he hunts for new playmates, leaving them out
                    of breath and almost headless in his wake.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button
            onClick={handleBack}
            variant="outline"
            className="flex-1 border-destructive/40 text-destructive hover:bg-destructive/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Haunted Houses
          </Button>
          <Button
            onClick={handleViewRules}
            variant="default"
            className="flex-1 bg-destructive hover:bg-destructive/90"
          >
            View Guest Rules
          </Button>
        </div>
      </div>
    </div>
  );
}
