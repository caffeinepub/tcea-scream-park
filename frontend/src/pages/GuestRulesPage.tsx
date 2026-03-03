import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, AlertTriangle, Shield } from 'lucide-react';
import { guestRules } from '@/content/guestRules';
import { slugify } from '@/utils/slug';

export function GuestRulesPage() {
  const hash = window.location.hash.slice(1);
  const normalizedHash = hash.startsWith('/') ? hash.slice(1) : hash;

  let itemType: 'haunted-house' | 'scare-zone' | null = null;
  let itemSlug: string | null = null;

  if (normalizedHash.startsWith('rules/haunted-house/')) {
    itemType = 'haunted-house';
    itemSlug = normalizedHash.replace('rules/haunted-house/', '');
  } else if (normalizedHash.startsWith('rules/scare-zone/')) {
    itemType = 'scare-zone';
    itemSlug = normalizedHash.replace('rules/scare-zone/', '');
  }

  const handleBack = () => {
    if (itemType === 'haunted-house') {
      window.location.hash = '#haunted-houses';
    } else if (itemType === 'scare-zone') {
      window.location.hash = '#scare-zones';
    } else {
      window.location.hash = '';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!itemType || !itemSlug) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <Card className="bg-card/90 backdrop-blur-sm border-destructive/20">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground text-lg">Invalid rules page</p>
              <Button onClick={handleBack} className="mt-4">
                Go Back
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const rules = guestRules[itemType][itemSlug];

  if (!rules) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="mb-6 text-destructive hover:text-destructive/80"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Card className="bg-card/90 backdrop-blur-sm border-destructive/20">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground text-lg">Rules not found for this attraction</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <Button
          variant="ghost"
          onClick={handleBack}
          className="mb-6 text-destructive hover:text-destructive/80"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to {itemType === 'haunted-house' ? 'Haunted Houses' : 'Scare Zones'}
        </Button>

        <Card className="bg-card/90 backdrop-blur-sm border-destructive/20">
          <CardHeader>
            <CardTitle className="text-4xl text-destructive bloody-text flex items-center gap-3">
              <Shield className="h-10 w-10" />
              Guest Rules: {rules.name}
            </CardTitle>
            <p className="text-muted-foreground text-lg">
              Read these rules carefully before entering
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <Alert variant="destructive" className="border-2 border-destructive bg-destructive/10">
              <AlertTriangle className="h-5 w-5" />
              <AlertTitle className="text-xl font-bold">MANDATORY RULES</AlertTitle>
              <AlertDescription>
                Failure to follow these rules may result in immediate removal from the attraction without refund. 
                Your safety and the safety of our actors depends on your compliance.
              </AlertDescription>
            </Alert>

            <div className="space-y-6">
              {rules.sections.map((section, index) => (
                <div key={index} className="space-y-3">
                  <h3 className="text-2xl font-bold text-destructive flex items-center gap-2">
                    <AlertTriangle className="h-6 w-6" />
                    {section.title}
                  </h3>
                  <ul className="space-y-2 pl-6">
                    {section.rules.map((rule, ruleIndex) => (
                      <li key={ruleIndex} className="text-foreground/90 leading-relaxed list-disc">
                        {rule}
                      </li>
                    ))}
                  </ul>
                  {index < rules.sections.length - 1 && <Separator className="bg-destructive/20 mt-4" />}
                </div>
              ))}
            </div>

            <Alert className="border-destructive/40 bg-destructive/5">
              <Shield className="h-5 w-5 text-destructive" />
              <AlertTitle className="text-lg font-bold text-destructive">Remember</AlertTitle>
              <AlertDescription className="text-foreground/90">
                By entering this attraction, you acknowledge that you have read and agree to follow all rules. 
                Have fun, stay safe, and enjoy the scares!
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
