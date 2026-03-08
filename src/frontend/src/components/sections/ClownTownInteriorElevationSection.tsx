import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tent } from "lucide-react";
import { Section } from "../layout/Section";

export function ClownTownInteriorElevationSection() {
  return (
    <Section
      id="clown-town-interior"
      title="Inside Clown Town"
      subtitle="A scenic elevation of the twisted circus within"
      icon={<Tent className="h-10 w-10 text-destructive" />}
    >
      <div className="max-w-6xl mx-auto">
        <Card className="bg-card/80 backdrop-blur-sm border-destructive/30 overflow-hidden">
          <div className="relative h-[500px] overflow-hidden">
            <img
              src="/assets/generated/clown-town-interior-elevation-v2.dim_1600x900.jpg"
              alt="Clown Town Interior Elevation"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
          </div>

          <CardHeader>
            <CardTitle className="text-3xl text-destructive bloody-text">
              The Big Top of Nightmares
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-white leading-relaxed">
              Step inside the twisted carnival where demented clowns perform
              their macabre acts under blood-stained canvas. The funhouse
              mirrors distort reality itself, reflecting your deepest fears back
              at you. Rusted carnival games line the walls, their prizes long
              forgotten, replaced by instruments of terror. The calliope music
              echoes endlessly through the corridors, a haunting melody that
              follows you deeper into the madness. In Clown Town, the show never
              ends, and you're always part of the performance.
            </p>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
