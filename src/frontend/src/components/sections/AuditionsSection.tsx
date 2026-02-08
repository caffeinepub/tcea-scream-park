import { Section } from '../layout/Section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { AuditionPerksBlock } from './auditions/AuditionPerksBlock';

interface Role {
  name: string;
  description?: string;
}

export function AuditionsSection() {
  const roles: Role[] = [
    { name: 'Sliders' },
    { name: 'Stilt Walkers' },
    { name: 'Chainsaw Actors' },
    { name: 'Scare Actors' },
    { name: 'Makeup Artists' },
    { 
      name: 'Costume Manager',
      description: 'Oversee the wardrobe of nightmares—every torn fabric and bloodstained garment must terrify on sight.'
    },
    { 
      name: 'Masks Manager',
      description: 'Curate our collection of grotesque faces—each mask must hide humanity and reveal pure horror.'
    },
    { name: 'And Many More...' },
  ];

  return (
    <Section
      id="auditions"
      title="Auditions"
      subtitle="Join the most terrifying team in Virginia"
      icon={<Users className="h-10 w-10 text-destructive" />}
    >
      <div className="max-w-4xl mx-auto">
        <Card className="bg-card/80 backdrop-blur-sm border-destructive/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl text-center text-destructive">
              We're Looking For Fearless Performers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Date and Time Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-4 rounded-lg bg-accent/50">
                <Calendar className="h-6 w-6 text-destructive flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Audition Dates</h3>
                  <p className="text-muted-foreground">February 7th – March 2nd, 2026</p>
                  <p className="text-sm text-muted-foreground mt-1">Every day</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-lg bg-accent/50">
                <Clock className="h-6 w-6 text-destructive flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Audition Hours</h3>
                  <p className="text-muted-foreground">10:00 AM – 9:00 PM</p>
                  <p className="text-sm text-muted-foreground mt-1">Daily schedule</p>
                </div>
              </div>
            </div>

            {/* Perks Block */}
            <Separator className="bg-destructive/20" />
            <AuditionPerksBlock />
            <Separator className="bg-destructive/20" />

            {/* Roles */}
            <div>
              <h3 className="font-semibold text-xl mb-4 text-center">Roles We're Casting</h3>
              <div className="space-y-4">
                {/* Roles without descriptions */}
                <div className="flex flex-wrap gap-3 justify-center">
                  {roles.filter(role => !role.description).map((role) => (
                    <Badge
                      key={role.name}
                      variant="outline"
                      className="text-base px-4 py-2 border-destructive/30 hover:bg-destructive/10 transition-colors"
                    >
                      {role.name}
                    </Badge>
                  ))}
                </div>

                {/* Roles with descriptions */}
                <div className="space-y-3 mt-6">
                  {roles.filter(role => role.description).map((role) => (
                    <div 
                      key={role.name}
                      className="p-4 rounded-lg bg-accent/30 border border-destructive/20 hover:border-destructive/40 transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Badge
                          variant="outline"
                          className="text-base px-3 py-1 border-destructive/40 bg-destructive/10"
                        >
                          {role.name}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {role.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
