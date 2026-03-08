import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Flame, Sparkles } from "lucide-react";
import { useState } from "react";
import { Section } from "../layout/Section";

interface Attraction {
  name: string;
  type: string;
  description: string;
  imagePath: string;
  year: number;
  subAttractions?: SubAttraction[];
}

interface SubAttraction {
  name: string;
  type: string;
  description: string;
  imagePath: string;
}

const upcomingAttractions: Attraction[] = [
  {
    name: "Starr Eyes",
    type: "Restaurant",
    description:
      "An upscale horror-themed dining experience where neon stars illuminate eerie ambiance. Indulge in gourmet cuisine while surrounded by unsettling décor and mysterious shadows. Every meal comes with a side of spine-tingling atmosphere.",
    imagePath: "/assets/generated/starr-eyes-restaurant.dim_800x600.png",
    year: 2027,
  },
  {
    name: "Lone Starr",
    type: "Stunt Show",
    description:
      "Action-packed live stunt performances set in a western horror landscape. Watch as daredevils perform dangerous tricks, death-defying stunts, and explosive sequences that will leave you breathless. This is not for the faint of heart.",
    imagePath: "/assets/generated/lone-starr-stunt-show.dim_800x600.png",
    year: 2028,
  },
  {
    name: "Under the Sea",
    type: "Live Show",
    description:
      "Dive into an underwater nightmare with this spectacular live show featuring pyrotechnic effects bursting from the water. Sea creatures come alive in terrifying ways, and hidden within the performance lies a subtle tribute to Six Flags America's aquatic legacy. Prepare for a splash of horror.",
    imagePath: "/assets/generated/under-the-sea-show.dim_800x600.png",
    year: 2028,
  },
  {
    name: "Chaos Breaths",
    type: "Themed Land",
    description:
      "Our biggest expansion yet—a massive new themed land where chaos reigns supreme. Experience chaotic breath effects, dark atmospheric environments, multiple live shows, and meet-and-greets with all your favorite costume characters. This land will redefine terror.",
    imagePath: "/assets/generated/chaos-breaths-land.dim_1000x600.png",
    year: 2029,
    subAttractions: [
      {
        name: "Fire over Water",
        type: "Live Show",
        description:
          "A dramatic spectacle combining water and fire special effects in an unforgettable performance. Watch as flames dance over cascading water in a mesmerizing display of elemental chaos.",
        imagePath: "/assets/generated/fire-over-water-show.dim_800x600.png",
      },
      {
        name: "Dragon Lair",
        type: "Live Show",
        description:
          "Enter the lair of a menacing dragon in this immersive show experience. Witness the dragon's fury through stunning effects, theatrical performances, and heart-pounding encounters.",
        imagePath: "/assets/generated/dragon-lair-show.dim_800x600.png",
      },
    ],
  },
];

export function UpcomingAttractionsSection() {
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const handleImageError = (imagePath: string) => {
    setImageErrors((prev) => new Set(prev).add(imagePath));
  };

  const attractionsByYear = upcomingAttractions.reduce(
    (acc, attraction) => {
      if (!acc[attraction.year]) {
        acc[attraction.year] = [];
      }
      acc[attraction.year].push(attraction);
      return acc;
    },
    {} as Record<number, Attraction[]>,
  );

  const years = Object.keys(attractionsByYear).map(Number).sort();

  return (
    <Section
      id="upcoming-attractions"
      title="Coming Soon: Future Attractions"
      subtitle="Exciting new experiences opening 2027-2029"
      icon={<Sparkles className="h-10 w-10 text-primary" />}
    >
      <div className="space-y-16 max-w-6xl mx-auto">
        {years.map((year) => (
          <div key={year} className="space-y-8">
            <div className="flex items-center justify-center gap-3">
              <Calendar className="h-8 w-8 text-destructive" />
              <h3 className="text-3xl md:text-4xl font-bold text-destructive">
                {year}
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {attractionsByYear[year].map((attraction) => (
                <Card
                  key={attraction.name}
                  className={`bg-card/80 backdrop-blur-sm border-primary/20 overflow-hidden hover:border-primary/50 transition-all hover:shadow-lg ${
                    attraction.type === "Themed Land" ? "md:col-span-2" : ""
                  }`}
                >
                  <div className="relative h-64 overflow-hidden">
                    {!imageErrors.has(attraction.imagePath) ? (
                      <img
                        src={attraction.imagePath}
                        alt={attraction.name}
                        className="w-full h-full object-cover"
                        onError={() => handleImageError(attraction.imagePath)}
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <Flame className="h-16 w-16 text-destructive/50" />
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <Badge variant="destructive" className="text-sm">
                        {attraction.type}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-2xl text-primary">
                      {attraction.name}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {attraction.description}
                    </CardDescription>
                  </CardHeader>

                  {attraction.subAttractions &&
                    attraction.subAttractions.length > 0 && (
                      <CardContent className="space-y-6">
                        <div className="border-t border-border/50 pt-4">
                          <p className="text-sm font-semibold text-foreground mb-4">
                            Featured Attractions:
                          </p>
                          <div className="grid gap-4">
                            {attraction.subAttractions.map((subAttraction) => (
                              <div
                                key={subAttraction.name}
                                className="flex gap-4 p-3 rounded-lg bg-muted/50 border border-border/30"
                              >
                                <div className="relative w-24 h-24 shrink-0 rounded overflow-hidden">
                                  {!imageErrors.has(subAttraction.imagePath) ? (
                                    <img
                                      src={subAttraction.imagePath}
                                      alt={subAttraction.name}
                                      className="w-full h-full object-cover"
                                      onError={() =>
                                        handleImageError(
                                          subAttraction.imagePath,
                                        )
                                      }
                                    />
                                  ) : (
                                    <div className="w-full h-full bg-muted flex items-center justify-center">
                                      <Flame className="h-8 w-8 text-destructive/50" />
                                    </div>
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-2 mb-1">
                                    <h4 className="font-semibold text-foreground">
                                      {subAttraction.name}
                                    </h4>
                                    <Badge
                                      variant="outline"
                                      className="shrink-0 text-xs"
                                    >
                                      {subAttraction.type}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-white">
                                    {subAttraction.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="border-t border-border/50 pt-4">
                          <p className="text-sm text-white flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-primary" />
                            All costume characters available for meet-and-greets
                            throughout the land
                          </p>
                        </div>
                      </CardContent>
                    )}
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
