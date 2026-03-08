import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, Mic, Sparkles, Star } from "lucide-react";
import { Section } from "../layout/Section";

export function CostumeCharacters2030Section() {
  const handleAuditionClick = () => {
    window.location.hash = "#auditions";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Section
      id="2030-investment"
      title="2030 Investment Announcement"
      subtitle="Our biggest investment for the kids is coming"
      icon={<Sparkles className="h-10 w-10 text-primary" />}
    >
      <div className="max-w-6xl mx-auto space-y-12">
        <Card className="bg-gradient-to-br from-primary/10 via-card/80 to-secondary/10 backdrop-blur-sm border-primary/30 overflow-hidden">
          <CardHeader className="text-center">
            <Badge className="mx-auto mb-4 bg-primary/20 text-primary border-primary/40 text-lg px-6 py-2">
              Coming 2030
            </Badge>
            <CardTitle className="text-4xl md:text-5xl text-primary">
              In 2030 we are getting our biggest investment for the kids
            </CardTitle>
            <CardDescription className="text-xl text-white mt-4">
              New costume characters, all new princesses, and exciting
              opportunities for performers
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20 overflow-hidden hover:border-primary/40 transition-all">
            <div className="relative h-64 overflow-hidden">
              <img
                src="/assets/generated/lola-asher-rabbits.dim_1000x600.png"
                alt="Lola and Asher the Rabbits"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
            </div>
            <CardHeader>
              <CardTitle className="text-2xl text-primary flex items-center gap-2">
                <Heart className="h-6 w-6" />
                Lola & Asher the Rabbits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/90 leading-relaxed mb-4">
                Meet our adorable new rabbit duo! Lola the Rabbit and her
                boyfriend Asher the Rabbit will bring joy, laughter, and
                heartwarming moments to kids of all ages. These lovable
                characters will be featured in meet-and-greets, photo
                opportunities, and special performances throughout the park.
              </p>
              <Badge variant="secondary" className="mr-2">
                Meet & Greet
              </Badge>
              <Badge variant="secondary">Photo Ops</Badge>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border-primary/20 overflow-hidden hover:border-primary/40 transition-all">
            <div className="relative h-64 overflow-hidden">
              <img
                src="/assets/generated/max-character.dim_600x800.png"
                alt="Max Character"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
            </div>
            <CardHeader>
              <CardTitle className="text-2xl text-primary flex items-center gap-2">
                <Star className="h-6 w-6" />
                Max
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/90 leading-relaxed mb-4">
                Max is our energetic new character who loves adventure and
                making friends! With a vibrant personality and interactive
                performances, Max will engage with kids through games,
                storytelling, and exciting activities. Get ready for high-energy
                fun with this dynamic new addition to our character roster.
              </p>
              <Badge variant="secondary" className="mr-2">
                Interactive
              </Badge>
              <Badge variant="secondary">High Energy</Badge>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border-primary/20 overflow-hidden hover:border-primary/40 transition-all">
            <div className="relative h-64 overflow-hidden">
              <img
                src="/assets/generated/dd-character.dim_600x800.png"
                alt="DD Character"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
            </div>
            <CardHeader>
              <CardTitle className="text-2xl text-primary flex items-center gap-2">
                <Sparkles className="h-6 w-6" />
                DD
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/90 leading-relaxed mb-4">
                DD brings magic and wonder to every interaction! This charming
                character specializes in creating memorable moments through
                gentle performances and heartwarming connections. DD will be a
                favorite among younger guests and families looking for wholesome
                entertainment.
              </p>
              <Badge variant="secondary" className="mr-2">
                Family Friendly
              </Badge>
              <Badge variant="secondary">Magical</Badge>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border-primary/20 overflow-hidden hover:border-primary/40 transition-all">
            <CardHeader>
              <CardTitle className="text-2xl text-primary flex items-center gap-2">
                <Sparkles className="h-6 w-6" />
                All New Princesses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/90 leading-relaxed mb-6">
                We're expanding our princess lineup with all new characters!
                These elegant performers will bring grace, beauty, and
                enchantment to our park. From royal meet-and-greets to special
                princess performances, our new princess cast will create magical
                memories for guests of all ages.
              </p>
              <div className="space-y-2">
                <Badge variant="secondary" className="mr-2">
                  Royal Performances
                </Badge>
                <Badge variant="secondary" className="mr-2">
                  Character Dining
                </Badge>
                <Badge variant="secondary">Special Events</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/30">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-primary flex items-center justify-center gap-3">
              <Mic className="h-8 w-8" />
              Audition for 2030 Characters
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <p className="text-lg text-foreground/90 leading-relaxed max-w-3xl mx-auto">
              If u want to audition just be vocal and some sing some don't.
              We're looking for talented performers who can bring these
              characters to life! Whether you're a singer, dancer, or character
              performer, we want to hear from you. Vocal skills are important,
              but remember—some of our characters sing and some don't, so
              there's a role for everyone.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <Badge variant="outline" className="text-base px-4 py-2">
                Vocal Skills Required
              </Badge>
              <Badge variant="outline" className="text-base px-4 py-2">
                Some Sing, Some Don't
              </Badge>
              <Badge variant="outline" className="text-base px-4 py-2">
                Character Performance
              </Badge>
              <Badge variant="outline" className="text-base px-4 py-2">
                All Skill Levels Welcome
              </Badge>
            </div>
            <Button
              onClick={handleAuditionClick}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6"
            >
              <Mic className="mr-2 h-5 w-5" />
              Apply for Costume Character Auditions
            </Button>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
