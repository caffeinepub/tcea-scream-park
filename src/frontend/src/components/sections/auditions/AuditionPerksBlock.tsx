import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Skull, Utensils } from "lucide-react";

interface Perk {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function AuditionPerksBlock() {
  const perks: Perk[] = [
    {
      icon: <Utensils className="h-8 w-8 text-destructive" />,
      title: "Food",
      description: "Fuel your fear with complimentary meals during auditions",
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-destructive" />,
      title: "Training",
      description: "Learn professional scare techniques from horror veterans",
    },
    {
      icon: <Skull className="h-8 w-8 text-destructive" />,
      title: "Scary Vibes",
      description: "Immerse yourself in our terrifying atmosphere from day one",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="text-center">
        <Badge variant="destructive" className="text-base px-4 py-2 mb-2">
          What You'll Get
        </Badge>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {perks.map((perk) => (
          <Card
            key={perk.title}
            className="bg-accent/30 border-destructive/20 hover:border-destructive/40 hover:bg-accent/40 transition-all"
          >
            <CardContent className="p-6 text-center space-y-3">
              <div className="flex justify-center">{perk.icon}</div>
              <h4 className="font-semibold text-lg">{perk.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {perk.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
