import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Music, UserPlus } from "lucide-react";

interface AuditionSignupEntryPointsProps {
  onScareActorClick: () => void;
  onDancerClick: () => void;
}

export function AuditionSignupEntryPoints({
  onScareActorClick,
  onDancerClick,
}: AuditionSignupEntryPointsProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-xl text-center text-destructive mb-6">
        Ready to Join? Sign Up Now!
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="bg-accent/30 border-destructive/30 hover:border-destructive/50 transition-all hover:shadow-lg hover:shadow-destructive/20">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <UserPlus className="h-6 w-6 text-destructive" />
              <h4 className="font-semibold text-lg">Scare Actor Audition</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Apply to become a scare actor and bring nightmares to life
            </p>
            <Badge variant="outline" className="border-destructive/30">
              Sliders • Chainsaws • In-house • Stilts
            </Badge>
            <Button
              onClick={onScareActorClick}
              className="w-full bg-destructive hover:bg-destructive/90"
            >
              Apply as Scare Actor
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-accent/30 border-destructive/30 hover:border-destructive/50 transition-all hover:shadow-lg hover:shadow-destructive/20">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <Music className="h-6 w-6 text-destructive" />
              <h4 className="font-semibold text-lg">Dancer Audition</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Apply to join our dance team and perform in our shows
            </p>
            <Badge variant="outline" className="border-destructive/30">
              Outside dancing • Inside
            </Badge>
            <Button
              onClick={onDancerClick}
              className="w-full bg-destructive hover:bg-destructive/90"
            >
              Apply as Dancer
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
