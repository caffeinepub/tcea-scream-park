import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import { generatedImages } from "../content/generatedImages";
import { hauntedHouses } from "../content/hauntedHouses";

export function HellHoleSneakPeekPage() {
  const handleBackToHome = () => {
    window.location.hash = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const hellHole = hauntedHouses.houses.find(
    (h) => h.name === "Terror Hell hole",
  );
  const image = generatedImages.hauntedHouses["Terror Hell hole"];

  if (!hellHole) return null;

  return (
    <div className="container mx-auto px-4 py-32">
      <Button
        onClick={handleBackToHome}
        variant="ghost"
        className="mb-8 text-destructive hover:text-destructive/80 hover:bg-destructive/10"
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        Back to Home
      </Button>

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Main Hell Hole Card */}
        <Card className="bg-card/80 backdrop-blur-sm border-destructive/30 overflow-hidden">
          <div className="relative h-[600px] overflow-hidden">
            <img
              src={image}
              alt={hellHole.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
          </div>

          <CardHeader>
            <CardTitle className="text-4xl md:text-5xl text-destructive bloody-text">
              {hellHole.name}
            </CardTitle>
            <CardDescription className="text-destructive/80 italic font-semibold text-xl">
              {hellHole.tagline}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {hellHole.description}
            </p>
          </CardContent>
        </Card>

        <Separator className="bg-destructive/20" />

        {/* Vicky's Saw Scenic Elevation */}
        <Card className="bg-card/80 backdrop-blur-sm border-destructive/30 overflow-hidden">
          <div className="relative h-[500px] overflow-hidden">
            <img
              src="/assets/generated/vickys-saw-scenic-elevation.dim_1600x900.jpg"
              alt="Vicky's Saw Scenic Elevation"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
          </div>

          <CardHeader>
            <CardTitle className="text-3xl md:text-4xl text-destructive bloody-text">
              Vicky's Saw
            </CardTitle>
            <CardDescription className="text-destructive/80 italic font-semibold text-lg">
              Where screams are carved into eternity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Deep within the Terror Hell Hole lies Vicky's workshop—a chamber
              of unspeakable horrors where rusted blades and grinding gears
              create a symphony of terror. The air is thick with the metallic
              scent of fear as massive saw blades spin endlessly, their teeth
              stained with the memories of those who dared enter. Vicky, the
              twisted architect of this nightmare, has perfected the art of
              psychological torment, using her mechanical monstrosities to push
              victims to the edge of sanity. The walls echo with the screams of
              the damned, and the machinery never stops—always hungry, always
              waiting. In Vicky's domain, escape is an illusion, and survival is
              merely a temporary reprieve from the inevitable.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
