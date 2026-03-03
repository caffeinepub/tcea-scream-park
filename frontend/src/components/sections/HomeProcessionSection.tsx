import { Section } from '../layout/Section';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users } from 'lucide-react';

export function HomeProcessionSection() {
  return (
    <Section
      id="procession"
      title="Main Street Plaza Procession"
      subtitle="A parade of nightmares"
      icon={<Users className="h-10 w-10 text-destructive" />}
    >
      <div className="max-w-5xl mx-auto">
        <Card className="bg-card/80 backdrop-blur-sm border-destructive/30 overflow-hidden">
          {/* Procession Image */}
          <div className="relative h-96 overflow-hidden">
            <img
              src="/assets/generated/procession-main-street-plaza.dim_1600x900.jpg"
              alt="Main Street Plaza Procession"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
          </div>

          <CardHeader>
            <CardTitle className="text-3xl text-destructive bloody-text">
              The Procession Begins
            </CardTitle>
            <CardDescription className="text-destructive/80 italic font-semibold text-lg">
              Only at 6pm
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground leading-relaxed">
              As darkness falls over Main Street Plaza, the gates creak open and the procession emerges. 
              Watch in terror as <span className="font-bold text-destructive">sliders</span> crawl from the shadows, 
              towering <span className="font-bold text-destructive">stilt walkers</span> loom overhead, and 
              hordes of <span className="font-bold text-destructive">zombies</span> shuffle through the streets. 
              But that's not all—<span className="font-bold text-destructive">many more</span> nightmarish creatures 
              join this unholy parade. The procession happens <span className="font-bold text-destructive">only at 6pm</span>, 
              marking the official beginning of your descent into madness. Don't miss this spectacular display of horror 
              as the park comes alive with screams.
            </p>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
