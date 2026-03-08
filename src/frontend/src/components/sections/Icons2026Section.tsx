import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generatedImages } from "@/content/generatedImages";
import { Star } from "lucide-react";
import { Section } from "../layout/Section";

const icons = [
  {
    name: "Flora the Clown",
    tagline: "TCEA's Most Feared",
    description:
      "Flora is TCEA's most feared icon. With her wild black and red hair, cracked porcelain face, and a smile that never fades, she haunts the shadows of Clown Town. Her laughter is the last sound many guests hear before they run.",
    zone: "Clown Town",
  },
  {
    name: "Grimsby the Ghoul",
    tagline: "Ancient. Hollow. Patient.",
    description:
      "Grimsby drifts between the haunted houses like a cold wind. Ancient, hollow, and endlessly patient, he has waited centuries for fresh souls. You won't see him until it's already too late.",
    zone: "All Zones",
  },
  {
    name: "Vex the Demon",
    tagline: "Pure Chaos Given Form",
    description:
      "Summoned from the depths of Terror Hell Hole, Vex is pure chaos given form. He feeds on fear and thrives in the dark. His burning eyes are the last warning you'll get before the nightmare begins.",
    zone: "Terror Hell Hole",
  },
  {
    name: "Maggot the Zombie Clown",
    tagline: "Part Clown. Part Corpse. All Nightmare.",
    description:
      "Part clown, part corpse, all nightmare. Maggot staggers through the scare zones with a hunger that never quits. Don't laugh — and whatever you do, don't run. He likes it when they run.",
    zone: "Scare Zones",
  },
  {
    name: "Sable the Witch",
    tagline: "She Was Here Before TCEA",
    description:
      "Sable has been watching this land long before TCEA was built. A dark sorceress of unspeakable power, she moves through the fog with purpose. Cross her path and suffer a curse you'll carry long after you leave.",
    zone: "All Areas",
  },
];

export function Icons2026Section() {
  return (
    <Section
      id="icons-2026"
      title="2026 Icons"
      subtitle="The faces of fear. Meet the monsters that define this season."
      icon={<Star className="h-10 w-10 text-destructive" />}
    >
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Intro banner */}
        <div className="text-center space-y-2 mb-10">
          <p className="text-white text-lg max-w-2xl mx-auto">
            These are the icons of TCEA 2026 — five terrifying characters chosen
            to haunt your every step through the park. Learn their names. Fear
            their faces. Pray you never meet them in the dark.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {icons.map((icon, idx) => {
            const imagePath =
              generatedImages.icons2026[
                icon.name as keyof typeof generatedImages.icons2026
              ];
            return (
              <Card
                key={icon.name}
                data-ocid={`icons2026.item.${idx + 1}`}
                className="bg-card/80 backdrop-blur-sm border-destructive/20 overflow-hidden group hover:border-destructive/60 transition-all hover:shadow-glow-green relative"
              >
                {/* Image */}
                <div
                  className="relative overflow-hidden"
                  style={{ aspectRatio: "4/5" }}
                >
                  <img
                    src={imagePath}
                    alt={icon.name}
                    className="w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                  {/* Zone Badge */}
                  <div className="absolute top-2 left-2 z-10">
                    <Badge className="bg-destructive/80 text-white text-xs font-bold backdrop-blur-sm">
                      {icon.zone}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-destructive bloody-text leading-tight">
                    {icon.name}
                  </CardTitle>
                  <p className="text-xs text-white italic font-semibold">
                    {icon.tagline}
                  </p>
                </CardHeader>

                <CardContent>
                  <p className="text-xs text-white leading-relaxed">
                    {icon.description}
                  </p>
                </CardContent>

                {/* Glow corners */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-destructive/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-destructive/40 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Card>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
