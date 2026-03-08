import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { generatedImages } from "../content/generatedImages";

export function FrostedHauntPage() {
  const handleBackToHome = () => {
    window.location.hash = "";
    setTimeout(() => {
      const element = document.querySelector("#upcoming-events");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <div className="container mx-auto px-4 py-32">
      <Button
        onClick={handleBackToHome}
        variant="ghost"
        className="mb-8 text-destructive hover:text-destructive/80 hover:bg-destructive/10"
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        Back to Upcoming Events
      </Button>

      <div className="max-w-4xl mx-auto space-y-8">
        <Card className="bg-card/80 backdrop-blur-sm border-destructive/30 overflow-hidden">
          <div className="relative h-[500px] overflow-hidden">
            <img
              src={generatedImages.upcomingEvents["Frosted Haunt"]}
              alt="Frosted Haunt"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
          </div>

          <CardHeader>
            <CardTitle className="text-4xl md:text-5xl text-destructive bloody-text">
              Frosted Haunt
            </CardTitle>
            <p className="text-xl text-muted-foreground italic">
              November 29–December 26, 2026
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Experience the chilling terror of winter's darkest nightmare. The
              Frosted Haunt transforms our park into a frozen hellscape where
              Christmas cheer meets pure horror. Navigate through two haunted
              houses—Open Ice Tomb and Wax Works—where the cold will freeze your
              blood and the scares will stop your heart. Brave two scare
              zones—Santa's Hell and Chainsaw Cold—where twisted holiday horrors
              roam freely. All food booths feature Christmas-themed nightmares
              to fuel your fear.
            </p>

            <Alert className="bg-destructive/10 border-destructive/40">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <AlertTitle className="text-destructive font-bold text-lg">
                WARNING
              </AlertTitle>
              <AlertDescription className="text-foreground/90 mt-2">
                This event contains intense scares, strobe lights, loud noises,
                fog effects, and extreme horror themes. Not recommended for
                children under 13 or those with heart conditions. Participation
                is at your own risk.
              </AlertDescription>
            </Alert>

            <div className="border-t border-destructive/20 pt-6">
              <h3 className="text-2xl font-bold text-destructive mb-4">
                Event Highlights
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-destructive text-xl mt-1">•</span>
                  <div>
                    <span className="text-lg font-semibold text-foreground block">
                      Two Haunted Houses
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Open Ice Tomb and Wax Works
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-destructive text-xl mt-1">•</span>
                  <div>
                    <span className="text-lg font-semibold text-foreground block">
                      Two Scare Zones
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Santa's Hell and Chainsaw Cold
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-destructive text-xl mt-1">•</span>
                  <div>
                    <span className="text-lg font-semibold text-foreground block">
                      Christmas-Themed Food Booths
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Six new holiday horror food experiences
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
