import { Section } from '../layout/Section';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { schoolhouseSneakPeek } from '../../content/schoolhouseSneakPeek';
import { Eye } from 'lucide-react';

export function SchoolhouseSneakPeekSection() {
  const handleViewSneakPeek = () => {
    window.location.hash = '#/schoolhouse';
  };

  return (
    <Section
      id="schoolhouse-sneak-peek"
      title="Sneak Peek"
      subtitle="A glimpse into the terror ahead"
      icon={<Eye className="h-10 w-10 text-destructive" />}
    >
      <div className="max-w-5xl mx-auto">
        <Card className="bg-card/80 backdrop-blur-sm border-destructive/30 hover:border-destructive/60 transition-all hover:shadow-glow-green overflow-hidden">
          {/* Sneak Peek Image */}
          <div className="relative h-96 overflow-hidden">
            <img
              src={schoolhouseSneakPeek.image}
              alt={schoolhouseSneakPeek.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
          </div>

          <CardHeader>
            <CardTitle className="text-3xl text-destructive bloody-text">
              {schoolhouseSneakPeek.title}
            </CardTitle>
            <CardDescription className="text-destructive/80 italic font-semibold text-lg">
              {schoolhouseSneakPeek.subtitle}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              {schoolhouseSneakPeek.description.substring(0, 300)}...
            </p>
            <Button
              onClick={handleViewSneakPeek}
              className="bg-destructive hover:bg-destructive/80 text-background font-bold shadow-glow-green"
            >
              <Eye className="mr-2 h-5 w-5" />
              View Full Sneak Peek
            </Button>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
