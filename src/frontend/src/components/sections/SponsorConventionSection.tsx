import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Globe, Zap } from "lucide-react";
import { Section } from "../layout/Section";

export function SponsorConventionSection() {
  return (
    <Section
      id="sponsors"
      title="Sponsors & Conventions"
      subtitle="The industry partners and events that power TCEA's terror"
      icon={<Award className="h-10 w-10 text-primary" />}
    >
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Sinister Slide Gear Sponsor */}
        <Card
          data-ocid="sponsors.sinister-slide-gear.card"
          className="bg-card/80 backdrop-blur-sm border-primary/30 overflow-hidden group hover:border-primary/60 transition-all hover:shadow-glow-orange relative"
        >
          <div className="h-2 bg-gradient-to-r from-primary via-destructive to-primary" />
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <CardTitle className="text-2xl text-primary flex items-center gap-2">
                <Zap className="h-6 w-6" />
                Sinister Slide Gear
              </CardTitle>
              <Badge className="bg-primary/20 text-primary border border-primary/40 font-bold text-xs">
                Official Sponsor
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-white leading-relaxed">
              Sinister Slide Gear is the official sponsor of TCEA Scream Park —
              providing the most terrifying, high-performance slide and stunt
              equipment trusted by the best in the haunt industry. When sliders
              need gear that can handle the chaos, Sinister Slide Gear delivers.
            </p>
            <div className="flex items-center gap-2 text-primary text-sm font-semibold">
              <Award className="h-4 w-4" />
              Proud supporter of the Scream Team
            </div>
          </CardContent>
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Card>

        {/* Transworld & East Coast Conventions */}
        <Card
          data-ocid="sponsors.conventions.card"
          className="bg-card/80 backdrop-blur-sm border-destructive/30 overflow-hidden group hover:border-destructive/60 transition-all hover:shadow-glow-green relative"
        >
          <div className="h-2 bg-gradient-to-r from-destructive via-accent to-destructive" />
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <CardTitle className="text-2xl text-destructive flex items-center gap-2">
                <Globe className="h-6 w-6" />
                Convention Tour 2027
              </CardTitle>
              <Badge className="bg-destructive/20 text-destructive border border-destructive/40 font-bold text-xs animate-pulse">
                Coming 2027
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-white leading-relaxed">
              In 2027, TCEA will take the stage at both the{" "}
              <strong className="text-white">
                Transworld Halloween &amp; Attractions Show
              </strong>{" "}
              and the{" "}
              <strong className="text-white">
                East Coast Haunt Convention
              </strong>{" "}
              — two of the biggest gatherings in the haunt industry. Come see us
              live as we showcase our latest attractions, meet our team, and
              reveal what's next for TCEA Scream Park.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className="border-destructive/40 text-white text-xs"
              >
                🎪 Transworld Halloween Show
              </Badge>
              <Badge
                variant="outline"
                className="border-destructive/40 text-white text-xs"
              >
                🌊 East Coast Haunt Convention
              </Badge>
            </div>
          </CardContent>
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-destructive/40 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-destructive/40 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Card>
      </div>
    </Section>
  );
}
