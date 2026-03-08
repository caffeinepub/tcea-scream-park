import { Button } from "@/components/ui/button";
import { foodBooths } from "@/content/foodBooths";
import { generatedImages } from "@/content/generatedImages";
import { ArrowLeft } from "lucide-react";

export function PaintDeathBoothPage() {
  const handleBack = () => {
    window.location.hash = "#/";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const booth = foodBooths.booths.find((b) => b.name === "Paint & Death");

  if (!booth) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-destructive mb-4">
            Booth Not Found
          </h1>
          <Button onClick={handleBack} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Food Booths
          </Button>
        </div>
      </div>
    );
  }

  const paintMenu = booth.menu.filter((item) =>
    item.description.includes("(Paint Side)"),
  );
  const deathMenu = booth.menu.filter((item) =>
    item.description.includes("(Death Side)"),
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Button
          onClick={handleBack}
          variant="outline"
          className="mb-8 border-destructive/40 text-destructive hover:bg-destructive/10"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Food Booths
        </Button>

        <div className="space-y-8">
          <div>
            <h1 className="text-5xl font-bold text-destructive bloody-text mb-4">
              {booth.name}
            </h1>
            <p className="text-2xl text-muted-foreground italic mb-6">
              {booth.tagline}
            </p>
          </div>

          <div className="relative w-full overflow-hidden rounded-lg border-2 border-destructive/30">
            <img
              src={generatedImages.foodBooths["Paint & Death"]}
              alt="Paint & Death Food Booth"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-lg leading-relaxed">{booth.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/30 rounded-lg p-6">
              <h2 className="text-3xl font-bold text-primary mb-6">
                Paint Side Menu
              </h2>
              <div className="space-y-4">
                {paintMenu.map((item) => (
                  <div
                    key={item.name}
                    className="border-b border-primary/20 pb-4 last:border-0"
                  >
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {item.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description.replace(" (Paint Side)", "")}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-destructive/10 to-destructive/5 border border-destructive/30 rounded-lg p-6">
              <h2 className="text-3xl font-bold text-destructive mb-6">
                Death Side Menu
              </h2>
              <div className="space-y-4">
                {deathMenu.map((item) => (
                  <div
                    key={item.name}
                    className="border-b border-destructive/20 pb-4 last:border-0"
                  >
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {item.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description.replace(" (Death Side)", "")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Button
            onClick={handleBack}
            variant="outline"
            className="w-full border-destructive/40 text-destructive hover:bg-destructive/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Food Booths
          </Button>
        </div>
      </div>
    </div>
  );
}
