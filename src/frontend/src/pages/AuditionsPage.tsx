import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetAuditionLinks } from "@/hooks/useAuditionLinks";
import {
  AlertCircle,
  ArrowLeft,
  ExternalLink,
  Loader2,
  Megaphone,
  Mic2,
  Music,
  Paintbrush,
  ShieldCheck,
  Sparkles,
  Star,
  UserCheck,
  Users,
} from "lucide-react";

const ALL_AUDITIONS = [
  {
    icon: <Users className="h-6 w-6" />,
    title: "Scream Team (Scare Actors)",
    color: "destructive" as const,
    date: "April 7–17, 2026 | 4:00–9:00 PM",
    description:
      "Become a terrifying force on the front lines of TCEA. We need sliders, chainsaw actors, in-house haunt characters, and stilt walkers to bring the scream park to life. No experience necessary — just the will to scare and the energy to keep going all night.",
    roles: [
      "Sliders",
      "Chainsaw Actors",
      "In-House Characters",
      "Stilt Walkers",
      "Fire Dancers",
    ],
    applyHash: "#auditions/scare-actor",
  },
  {
    icon: <Music className="h-6 w-6" />,
    title: "Dancers & Performers",
    color: "secondary" as const,
    date: "April 7–17, 2026 | 4:00–9:00 PM",
    description:
      "Join our elite entertainment team of dancers who bring energy and spectacle to TCEA's outdoor zones and live shows. Whether you want to perform on the Main Street Plaza or inside one of our spectacular shows, we have a spot for you.",
    roles: ["Outside Dancers", "Inside Show Performers", "Procession Walkers"],
    applyHash: "#auditions/dancer",
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "Costume Characters",
    color: "primary" as const,
    date: "March 9, 2027 | 4:00–6:00 PM",
    description:
      "Bring beloved characters like Riley the Bear, Lola the Rabbit, Asher, Max, and DD to life. This role requires a minimum height/weight to fit character costumes and the ability to embody your character with energy and heart.",
    roles: [
      "Riley the Bear",
      "Lola the Rabbit",
      "Asher",
      "Max",
      "DD",
      "All New Princesses",
    ],
    note: "Min. height: 5'2\" | Min. weight: 100 lbs | Ages 16+",
    applyHash: "#auditions",
  },
  {
    icon: <Paintbrush className="h-6 w-6" />,
    title: "Makeup Artists",
    color: "primary" as const,
    date: "March 13, 2026 | 3:00–3:40 PM",
    description:
      "Hiring professional and aspiring makeup artists to transform our scare actors and performers into terrifying creatures of the night. Bring your portfolio and your brushes — and be ready to show us what terror looks like.",
    roles: [
      "Scare Makeup",
      "SFX Prosthetics",
      "Character Makeup",
      "Special Effects Makeup",
    ],
    applyHash: "#auditions",
  },
  {
    icon: <Star className="h-6 w-6" />,
    title: "SFX Artists",
    color: "secondary" as const,
    date: "TBA — Check Employee Portal",
    description:
      "Special effects artists create the visual horrors that make TCEA unforgettable. If you have experience with pyrotechnics, fog machines, lighting effects, or animatronic setup, we want you on our crew.",
    roles: [
      "Pyrotechnics Assist",
      "Fog & Atmosphere",
      "Lighting Effects",
      "Animatronics Setup",
    ],
    applyHash: "#employee/tcea-tunnels",
    isEmployee: true,
  },
  {
    icon: <UserCheck className="h-6 w-6" />,
    title: "Usher",
    color: "primary" as const,
    date: "March 2–3, 2027 | 2:00–7:00 PM",
    description:
      "Ushers are the backbone of our guest experience. You will keep the show running smoothly by cleaning before and after shows, monitoring guests and performers, and reporting to Usher Supervisors. Must be 16 or older.",
    roles: [
      "Pre-Show Setup",
      "Guest Monitoring",
      "Performer Support",
      "Post-Show Cleanup",
    ],
    note: "Must be 16 or older",
    applyHash: "#auditions",
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Haunted House Supervisors",
    color: "destructive" as const,
    date: "Coming 2026/27 Season",
    description:
      "Lead the terror. Haunted House Supervisors oversee the scare actors within each house, enforce safety protocols, coordinate with park management, and ensure every guest gets the most intense experience possible.",
    roles: [
      "Actor Oversight",
      "Safety Enforcement",
      "Guest Experience",
      "Park Coordination",
    ],
    applyHash: "#auditions",
  },
  {
    icon: <Mic2 className="h-6 w-6" />,
    title: "Show Host",
    color: "secondary" as const,
    date: "Coming 2029",
    description:
      "Be the voice of the shows! Show Hosts are the charismatic faces who introduce acts, engage the crowd, and keep the energy alive throughout every performance. No qualifications required — just bring your happiness and energy.",
    roles: ["Live Show Introductions", "Crowd Engagement", "Guest Interaction"],
    note: "No qualifications required — just be happy and energetic!",
    applyHash: "#auditions",
  },
];

export function AuditionsPage() {
  const { data: auditionLinks, isLoading, isError } = useGetAuditionLinks();

  const handleBackClick = () => {
    window.location.hash = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleApply = (hash: string) => {
    window.location.hash = hash;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const validAuditionLinks =
    auditionLinks?.filter(
      (link) => link.url && !link.url.includes("example.com"),
    ) || [];

  const colorMap = {
    destructive: {
      title: "text-destructive",
      badge: "bg-destructive/20 text-destructive border-destructive/40",
      button: "bg-destructive hover:bg-destructive/90 text-white",
      border: "border-destructive/30 hover:border-destructive/60",
      glow: "hover:shadow-glow-orange",
    },
    primary: {
      title: "text-primary",
      badge: "bg-primary/20 text-primary border-primary/40",
      button: "bg-primary hover:bg-primary/90 text-white",
      border: "border-primary/30 hover:border-primary/60",
      glow: "hover:shadow-glow-orange",
    },
    secondary: {
      title: "text-accent",
      badge: "bg-accent/20 text-accent border-accent/40",
      button: "bg-accent hover:bg-accent/90 text-white",
      border: "border-accent/30 hover:border-accent/60",
      glow: "hover:shadow-glow-green",
    },
  };

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto space-y-10">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={handleBackClick}
            data-ocid="auditions.back.button"
            className="text-white hover:text-white/80 hover:bg-white/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>

          {/* Page Title */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              All Auditions
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Join our team and become part of the terror. TCEA is always
              looking for talented, passionate performers and staff to make
              every season more terrifying than the last.
            </p>
          </div>

          <Separator className="bg-white/20" />

          {/* Hiring Banner */}
          <Alert
            data-ocid="auditions.hiring-banner.section"
            className="border-2 border-amber-500 bg-amber-500/20 backdrop-blur-sm"
          >
            <Megaphone className="h-5 w-5 text-white" />
            <AlertTitle className="text-2xl font-bold text-white">
              🔥 Now Hiring!
            </AlertTitle>
            <AlertDescription className="text-lg text-white">
              Now hiring for makeup artists starting{" "}
              <strong>March 13, 2026 | 3:00–3:40 PM</strong>. Scream Team
              auditions: <strong>April 7–17, 2026 | 4–9 PM</strong>.
            </AlertDescription>
          </Alert>

          {/* All Audition Roles */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white text-center">
              Open Audition Positions
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {ALL_AUDITIONS.map((audition, idx) => {
                const colors = colorMap[audition.color];
                return (
                  <Card
                    key={audition.title}
                    data-ocid={`auditions.item.${idx + 1}`}
                    className={`bg-card/80 backdrop-blur-sm ${colors.border} overflow-hidden transition-all ${colors.glow} relative`}
                  >
                    {audition.isEmployee && (
                      <div className="absolute top-3 right-3 z-10">
                        <Badge className="bg-black/60 text-white border border-white/30 text-xs backdrop-blur-sm">
                          Employee Portal
                        </Badge>
                      </div>
                    )}
                    <CardHeader className="pb-3">
                      <CardTitle
                        className={`text-xl ${colors.title} flex items-center gap-2`}
                      >
                        {audition.icon}
                        {audition.title}
                      </CardTitle>
                      <p className="text-white/70 text-sm font-semibold">
                        📅 {audition.date}
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-white text-sm leading-relaxed">
                        {audition.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {audition.roles.map((role) => (
                          <Badge
                            key={role}
                            variant="outline"
                            className={`text-xs ${colors.badge}`}
                          >
                            {role}
                          </Badge>
                        ))}
                      </div>
                      {audition.note && (
                        <p className="text-white/60 text-xs italic border-l-2 border-white/20 pl-3">
                          ℹ️ {audition.note}
                        </p>
                      )}
                      <Button
                        onClick={() => handleApply(audition.applyHash)}
                        data-ocid={`auditions.apply.button.${idx + 1}`}
                        className={`w-full font-bold ${colors.button}`}
                      >
                        Apply Now
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <Separator className="bg-white/20" />

          {/* External Audition Links */}
          {isLoading && (
            <Card
              data-ocid="auditions.loading_state"
              className="bg-card/80 backdrop-blur-sm border-white/30"
            >
              <CardContent className="flex items-center justify-center py-12">
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="h-8 w-8 animate-spin text-white" />
                  <p className="text-white">
                    Loading external audition links...
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {isError && (
            <Alert
              data-ocid="auditions.error_state"
              variant="destructive"
              className="border-2 border-destructive bg-destructive/20"
            >
              <AlertCircle className="h-5 w-5" />
              <AlertTitle className="text-xl font-bold text-white">
                Error Loading Auditions
              </AlertTitle>
              <AlertDescription className="text-white">
                We couldn't load the external audition links. Please try again
                later.
              </AlertDescription>
            </Alert>
          )}

          {!isLoading && !isError && validAuditionLinks.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white text-center">
                Online Applications
              </h2>
              <div className="grid gap-6">
                {validAuditionLinks.map((link, index) => (
                  <Card
                    key={link.title ?? index}
                    data-ocid={`auditions.external-link.item.${index + 1}`}
                    className="bg-card/80 backdrop-blur-sm border-white/30 hover:border-white/50 transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  >
                    <CardHeader>
                      <CardTitle className="text-2xl text-white flex items-center gap-2">
                        <ExternalLink className="h-6 w-6" />
                        {link.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-white/90 text-lg leading-relaxed">
                        {link.description}
                      </p>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-ocid={`auditions.external-apply.button.${index + 1}`}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-destructive text-white rounded-lg font-semibold text-lg hover:bg-destructive/90 transition-colors shadow-lg hover:shadow-xl"
                      >
                        Apply Now
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {!isLoading && !isError && validAuditionLinks.length === 0 && (
            <Card
              data-ocid="auditions.empty_state"
              className="bg-card/80 backdrop-blur-sm border-white/30"
            >
              <CardContent className="py-12 text-center">
                <p className="text-xl text-white">
                  External application links coming soon! Use the Apply Now
                  buttons above to get started.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
