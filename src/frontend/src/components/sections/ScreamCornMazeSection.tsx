import { Badge } from "@/components/ui/badge";
import { generatedImages } from "@/content/generatedImages";
import { AlertTriangle, Eye, MapPin } from "lucide-react";
import { Section } from "../layout/Section";

export function ScreamCornMazeSection() {
  return (
    <Section
      id="scream-corn-maze"
      title="Scream Corn Maze"
      subtitle="Ten acres. No map. No mercy."
      icon={<Eye className="h-10 w-10 text-destructive" />}
    >
      <div className="max-w-5xl mx-auto">
        <div className="relative rounded-2xl overflow-hidden border border-destructive/30 group hover:border-destructive/60 transition-all">
          {/* Hero Image */}
          <div className="relative h-80 md:h-[480px] overflow-hidden">
            <img
              src={generatedImages.attractions["Scream Corn Maze"]}
              alt="Scream Corn Maze"
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />

            {/* Floating badge */}
            <div className="absolute top-4 left-4 z-10 flex gap-2 flex-wrap">
              <Badge className="bg-destructive text-white font-bold text-sm px-3 py-1 shadow-glow-orange">
                🌽 NEW Attraction
              </Badge>
              <Badge className="bg-black/60 text-white font-bold text-sm px-3 py-1 border border-destructive/40 backdrop-blur-sm">
                10 Acres
              </Badge>
            </div>

            {/* Warning */}
            <div className="absolute top-4 right-4 z-10">
              <div className="flex items-center gap-1 bg-destructive/80 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm animate-pulse">
                <AlertTriangle className="h-3 w-3" />
                Extreme Fear Zone
              </div>
            </div>

            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <h3 className="text-4xl md:text-6xl font-bold text-white bloody-text drop-shadow-[0_2px_12px_rgba(220,50,50,0.7)] mb-2">
                Scream Corn Maze
              </h3>
              <p className="text-white text-lg md:text-xl italic font-semibold">
                No map. No guide. No mercy.
              </p>
            </div>
          </div>

          {/* Content below image */}
          <div className="bg-card/90 backdrop-blur-sm p-6 md:p-10 space-y-6">
            <p className="text-white text-lg leading-relaxed max-w-3xl">
              Dare to enter the Scream Corn Maze — 10 acres of towering dead
              corn stalks where the only way out is through. Hidden in the
              darkness are creatures that have made the maze their hunting
              ground. No map. No guide. No mercy. Find the exit before they find
              you.
            </p>

            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  icon: <MapPin className="h-5 w-5" />,
                  label: "10 Acres",
                  detail: "Of pure darkness",
                },
                {
                  icon: <Eye className="h-5 w-5" />,
                  label: "No Map",
                  detail: "You're on your own",
                },
                {
                  icon: <AlertTriangle className="h-5 w-5" />,
                  label: "Extreme",
                  detail: "Creatures lurk within",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-3 bg-destructive/10 border border-destructive/20 rounded-xl p-4"
                >
                  <div className="text-destructive">{stat.icon}</div>
                  <div>
                    <p className="text-white font-bold text-sm">{stat.label}</p>
                    <p className="text-white text-xs">{stat.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-destructive/20 pt-4">
              <p className="text-white text-sm italic">
                ⚠️ The Scream Corn Maze is recommended for guests 13 and older.
                Extreme fear zones are active after dark. Guests with heart
                conditions, claustrophobia, or anxiety should proceed with
                caution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
