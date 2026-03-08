import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generatedImages } from "@/content/generatedImages";
import { Baby, Leaf, Music2, Palette, Tractor } from "lucide-react";
import { Section } from "../layout/Section";

const kidsActivities = [
  {
    name: "Haunted Hayride",
    icon: <Tractor className="h-5 w-5" />,
    tagline: "Hold on tight — it's going to get dark.",
    description:
      "Climb aboard our spooky Haunted Hayride and journey through the dark woods surrounding TCEA. With jack-o-lanterns lighting the path and monsters lurking between the trees, this fan-favorite ride is perfect for the whole family. Hold on tight — you never know what's waiting around the next bend.",
    badge: "All Ages",
  },
  {
    name: "Kids Show",
    icon: <Music2 className="h-5 w-5" />,
    tagline: "Laughs, screams, and pure Halloween magic.",
    description:
      "Our live Kids Show brings the magic of Halloween to the little ones. Featuring costumed characters, colorful lights, and interactive fun, this high-energy performance will have the whole family laughing and screaming with delight.",
    badge: "Live Performance",
  },
  {
    name: "Pumpkin Patch",
    icon: <Leaf className="h-5 w-5" />,
    tagline: "Pick your pumpkin. Own your Halloween.",
    description:
      "Wander through our enchanting Pumpkin Patch and pick the perfect pumpkin to take home. Surrounded by hay bales, scarecrows, and the warm glow of autumn, this classic fall experience is a must for every family visiting TCEA.",
    badge: "Take One Home",
  },
  {
    name: "Face Painting",
    icon: <Palette className="h-5 w-5" />,
    tagline: "Become the monster you were born to be.",
    description:
      "Transform into your favorite monster or Halloween character at our Face Painting booth. Our skilled artists will bring your imagination to life with vibrant colors and frightening designs — the perfect way to get into the Halloween spirit.",
    badge: "Family Fun",
  },
];

export function KidsZoneSection() {
  return (
    <Section
      id="kids-zone"
      title="Kids Zone"
      subtitle="Spooky fun for the whole family — all the thrills, none of the nightmares"
      icon={<Baby className="h-10 w-10 text-primary" />}
    >
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Intro banner */}
        <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/10 via-card/80 to-primary/10 px-6 py-5 text-center">
          <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none" />
          <p className="text-white text-lg font-semibold max-w-2xl mx-auto">
            🎃 TCEA isn't just for the brave — our Kids Zone is packed with
            spooky-but-safe activities that the whole family can enjoy together.
            Great memories start here!
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-8">
          {kidsActivities.map((activity, idx) => {
            const imagePath =
              generatedImages.kidsZone[
                activity.name as keyof typeof generatedImages.kidsZone
              ];
            return (
              <Card
                key={activity.name}
                data-ocid={`kids-zone.item.${idx + 1}`}
                className="bg-card/80 backdrop-blur-sm border-primary/20 overflow-hidden group hover:border-primary/50 transition-all hover:shadow-glow-orange relative"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={imagePath}
                    alt={activity.name}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                  <div className="absolute top-3 right-3 z-10">
                    <Badge className="bg-primary text-white font-bold text-xs">
                      {activity.badge}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-primary flex items-center gap-2">
                    {activity.icon}
                    {activity.name}
                  </CardTitle>
                  <p className="text-sm text-white italic font-semibold">
                    {activity.tagline}
                  </p>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-white leading-relaxed">
                    {activity.description}
                  </p>
                </CardContent>

                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Card>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
