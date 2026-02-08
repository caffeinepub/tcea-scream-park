import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { schoolhouseSneakPeek } from '../content/schoolhouseSneakPeek';
import { ArrowLeft } from 'lucide-react';

export function SchoolhouseSneakPeekPage() {
  const handleBackToHome = () => {
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto px-4 py-32">
      <Button
        onClick={handleBackToHome}
        variant="ghost"
        className="mb-8 text-destructive hover:text-destructive/80 hover:bg-destructive/10"
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        Back to Home
      </Button>

      <div className="max-w-6xl mx-auto">
        <Card className="bg-card/80 backdrop-blur-sm border-destructive/30 overflow-hidden">
          <div className="relative h-[600px] overflow-hidden">
            <img
              src={schoolhouseSneakPeek.image}
              alt={schoolhouseSneakPeek.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
          </div>

          <CardHeader>
            <CardTitle className="text-4xl md:text-5xl text-destructive bloody-text">
              {schoolhouseSneakPeek.title}
            </CardTitle>
            <CardDescription className="text-destructive/80 italic font-semibold text-xl">
              {schoolhouseSneakPeek.subtitle}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {schoolhouseSneakPeek.description}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
