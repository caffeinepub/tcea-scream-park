import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { foodBooths } from "../content/foodBooths";
import { generatedImages } from "../content/generatedImages";

export function CandyCaneCarnagePage() {
  const booth = foodBooths.booths.find((b) => b.name === "Candy Cane Carnage");

  const handleBackToHome = () => {
    window.location.hash = "";
    setTimeout(() => {
      const element = document.querySelector("#food-booths");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  if (!booth) return null;

  return (
    <div className="container mx-auto px-4 py-32">
      <Button
        onClick={handleBackToHome}
        variant="ghost"
        className="mb-8 text-destructive hover:text-destructive/80 hover:bg-destructive/10"
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        Back to Food Booths
      </Button>

      <div className="max-w-4xl mx-auto">
        <Card className="bg-card/80 backdrop-blur-sm border-destructive/30 overflow-hidden">
          <div className="relative h-[500px] overflow-hidden">
            <img
              src={generatedImages.foodBooths["Candy Cane Carnage"]}
              alt={booth.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
          </div>

          <CardHeader>
            <CardTitle className="text-4xl md:text-5xl text-destructive bloody-text">
              {booth.name}
            </CardTitle>
            <CardDescription className="text-destructive/80 italic font-semibold text-xl">
              {booth.tagline}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              {booth.description}
            </p>
            <div className="border-t border-destructive/20 pt-6 mt-6">
              <h3 className="text-2xl font-bold text-foreground mb-4">Menu</h3>
              <ul className="space-y-3">
                {booth.menu.map((item) => (
                  <li
                    key={typeof item === "string" ? item : item.name}
                    className="flex items-start gap-3"
                  >
                    <span className="text-destructive text-xl mt-1">•</span>
                    <div className="flex-1">
                      <span className="text-lg text-muted-foreground font-semibold block">
                        {typeof item === "string" ? item : item.name}
                      </span>
                      {typeof item === "object" && item.description && (
                        <span className="text-sm text-muted-foreground/70 italic block mt-1">
                          {item.description}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
