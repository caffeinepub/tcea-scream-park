import { Section } from '../layout/Section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, AlertTriangle, Clock, Ticket, Shield, Skull } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { PassSelector } from './passes/PassSelector';
import { passOptions } from './passes/passOptions';

export function InfoLocationSection() {
  return (
    <Section
      id="info-location"
      title="Info & Location"
      subtitle="Find us if you dare"
      icon={<MapPin className="h-10 w-10 text-destructive" />}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Operating Hours */}
        <Card className="bg-card/80 backdrop-blur-sm border-destructive/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-destructive flex items-center gap-2">
              <Clock className="h-6 w-6" />
              Operating Hours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">
              <span className="font-bold text-destructive">Open Fridays through Sunday</span>
            </p>
            <p className="text-lg mt-2">
              <span className="font-semibold text-foreground">Hours:</span> 5:00 PM until whenever the last person is
            </p>
          </CardContent>
        </Card>

        {/* Tickets & Passes */}
        <Card className="bg-card/80 backdrop-blur-sm border-destructive/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-destructive flex items-center gap-2">
              <Ticket className="h-6 w-6" />
              Tickets & Passes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-xl font-bold text-destructive">
              Tickets are $30
            </p>
            <Separator className="bg-destructive/20" />
            
            {/* Pass Selector Component */}
            <PassSelector passes={passOptions} />
          </CardContent>
        </Card>

        {/* Rules & Warnings */}
        <Card className="bg-card/80 backdrop-blur-sm border-destructive/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-destructive flex items-center gap-2">
              <Shield className="h-6 w-6" />
              Rules & Warnings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 11pm Warning */}
            <Alert className="bg-destructive/20 border-destructive">
              <Skull className="h-5 w-5 text-destructive" />
              <AlertTitle className="text-lg font-bold text-destructive">
                11PM NIGHTLY RELEASE WARNING
              </AlertTitle>
              <AlertDescription className="text-foreground">
                Only at 11pm, once we close for the night, every night, every house and zone will release. 
                If you are in the way, you WILL get chased. They will NOT stop to scare you out. 
                This is your final warning.
              </AlertDescription>
            </Alert>

            <Separator className="bg-destructive/20" />

            {/* Scare Actors Rules */}
            <div>
              <h4 className="font-bold text-lg text-destructive mb-2 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Scare Actor Rules
              </h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-1">•</span>
                  <span>Do not touch the scare actors. They are here to terrify, not to be harassed.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-1">•</span>
                  <span>Scare actors may touch you depending on your pass type.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-1">•</span>
                  <span>Follow all instructions given by scare actors and staff immediately.</span>
                </li>
              </ul>
            </div>

            <Separator className="bg-destructive/20" />

            {/* Procession Rules */}
            <div>
              <h4 className="font-bold text-lg text-destructive mb-2 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Procession Rules
              </h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-1">•</span>
                  <span>Stay clear of the procession path. Creatures have the right of way.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-1">•</span>
                  <span>Do not interfere with performers during the procession.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-1">•</span>
                  <span>Keep children close and supervised at all times.</span>
                </li>
              </ul>
            </div>

            <Separator className="bg-destructive/20" />

            {/* Food Rules */}
            <div>
              <h4 className="font-bold text-lg text-destructive mb-2 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Food Rules
              </h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-1">•</span>
                  <span>Food and drinks must be consumed in designated areas only.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-1">•</span>
                  <span>No outside food or beverages allowed on the property.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-1">•</span>
                  <span>Dispose of trash properly in marked containers.</span>
                </li>
              </ul>
            </div>

            <Separator className="bg-destructive/20" />

            {/* Before Entering Property */}
            <div>
              <h4 className="font-bold text-lg text-destructive mb-2 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Before Entering the Property
              </h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-1">•</span>
                  <span>All guests must sign a waiver before entry. No exceptions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-1">•</span>
                  <span>This is an extreme haunt. Not recommended for those with heart conditions, pregnant women, or young children.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-1">•</span>
                  <span>No weapons, drugs, or alcohol permitted on the premises.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-1">•</span>
                  <span>Management reserves the right to refuse entry or remove guests at any time.</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Location */}
        <Card className="bg-card/80 backdrop-blur-sm border-destructive/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-destructive flex items-center gap-2">
              <AlertTriangle className="h-6 w-6" />
              Extreme Haunted Attraction
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg">
              TCEA Scream Park is the <span className="font-bold text-destructive">only extreme haunted attraction</span> in the region, delivering heart-pounding terror and unforgettable scares.
            </p>
            <div className="pt-4 border-t border-destructive/20">
              <h3 className="font-semibold text-xl mb-2 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-destructive" />
                Location
              </h3>
              <p className="text-lg text-muted-foreground">
                Waterford, VA
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Waterford, Virginia
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
