import { Card, CardContent } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

export function TeaserSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto bg-gradient-to-br from-destructive/20 to-destructive/5 border-destructive/30 shadow-2xl">
          <CardContent className="pt-12 pb-12 text-center">
            <Sparkles className="h-12 w-12 text-destructive mx-auto mb-4 animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-bold text-destructive mb-4">
              Many Things to Come
            </h2>
            <p className="text-lg text-muted-foreground">
              Stay tuned for more terrifying announcements...
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
