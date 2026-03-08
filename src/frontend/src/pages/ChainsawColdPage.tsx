import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generatedImages } from "@/content/generatedImages";
import { scareZones } from "@/content/scareZones";
import { slugify } from "@/utils/slug";
import { AlertTriangle, ArrowLeft, Shield } from "lucide-react";

export function ChainsawColdPage() {
  const zone = scareZones.find((z) => z.name === "Chainsaw Cold");

  const handleBack = () => {
    window.location.hash = "#scare-zones";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleViewRules = () => {
    const slug = slugify("Chainsaw Cold");
    window.location.hash = `#/rules/scare-zone/${slug}`;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!zone) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <p className="text-center text-muted-foreground">Zone not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <Button
          variant="ghost"
          onClick={handleBack}
          className="mb-6 text-destructive hover:text-destructive/80"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Scare Zones
        </Button>

        <Card className="bg-card/90 backdrop-blur-sm border-destructive/20 overflow-hidden">
          <div className="relative h-96 overflow-hidden">
            <img
              src={generatedImages.scareZones["Chainsaw Cold"]}
              alt="Chainsaw Cold"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
          </div>

          <CardHeader>
            <CardTitle className="text-4xl text-destructive bloody-text">
              {zone.name}
            </CardTitle>
            <p className="text-xl text-muted-foreground italic font-semibold">
              {zone.tagline}
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <Alert
              variant="destructive"
              className="border-2 border-destructive bg-destructive/10"
            >
              <AlertTriangle className="h-5 w-5" />
              <AlertTitle className="text-xl font-bold">
                EXTREME HORROR WARNING
              </AlertTitle>
              <AlertDescription className="text-base">
                This Christmas-horror scare zone features loud chainsaws,
                aggressive pursuit scares, and chainsaw-wielding maniacs in
                winter gear. Not recommended for guests with heart conditions or
                sound sensitivity. Actors will pursue you relentlessly.
                Participation is at your own risk.
              </AlertDescription>
            </Alert>

            <div className="prose prose-invert max-w-none">
              <p className="text-foreground/90 leading-relaxed text-lg">
                {zone.description}
              </p>
            </div>

            <Button
              onClick={handleViewRules}
              size="lg"
              className="w-full bg-destructive hover:bg-destructive/90"
            >
              <Shield className="mr-2 h-5 w-5" />
              View Guest Rules Before Entering
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
