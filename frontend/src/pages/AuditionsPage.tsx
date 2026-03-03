import { ArrowLeft, ExternalLink, Megaphone, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { useGetAuditionLinks } from '@/hooks/useAuditionLinks';

export function AuditionsPage() {
  const { data: auditionLinks, isLoading, isError } = useGetAuditionLinks();

  const handleBackClick = () => {
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter out entries with placeholder URLs
  const validAuditionLinks = auditionLinks?.filter(
    link => link.url && !link.url.includes('example.com')
  ) || [];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={handleBackClick}
            className="text-white hover:text-white/80 hover:bg-white/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>

          {/* Page Title */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              All Auditions
            </h1>
            <p className="text-xl text-white/90">
              Join our team and become part of the terror
            </p>
          </div>

          <Separator className="bg-white/20" />

          {/* Hiring Banner */}
          <Alert className="border-2 border-amber-500 bg-amber-500/20 backdrop-blur-sm">
            <Megaphone className="h-5 w-5 text-white" />
            <AlertTitle className="text-2xl font-bold text-white">Now Hiring!</AlertTitle>
            <AlertDescription className="text-lg text-white">
              Now hiring for makeup artists starting March 13th 3:00–3:40 pm
            </AlertDescription>
          </Alert>

          {/* Loading State */}
          {isLoading && (
            <Card className="bg-card/80 backdrop-blur-sm border-white/30">
              <CardContent className="flex items-center justify-center py-12">
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="h-8 w-8 animate-spin text-white" />
                  <p className="text-white">Loading audition links...</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Error State */}
          {isError && (
            <Alert variant="destructive" className="border-2 border-destructive bg-destructive/20">
              <AlertCircle className="h-5 w-5" />
              <AlertTitle className="text-xl font-bold text-white">Error Loading Auditions</AlertTitle>
              <AlertDescription className="text-white">
                We couldn't load the audition links at this time. Please try again later.
              </AlertDescription>
            </Alert>
          )}

          {/* Audition Links */}
          {!isLoading && !isError && validAuditionLinks.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white text-center">
                Available Auditions
              </h2>
              <div className="grid gap-6">
                {validAuditionLinks.map((link, index) => (
                  <Card
                    key={index}
                    className="bg-card/80 backdrop-blur-sm border-white/30 hover:border-white/50 transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  >
                    <CardHeader>
                      <CardTitle className="text-2xl text-white flex items-center gap-2">
                        <ExternalLink className="h-6 w-6" />
                        {link.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-white/90 text-lg leading-relaxed">
                        {link.description}
                      </p>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-destructive text-destructive-foreground rounded-lg font-semibold text-lg hover:bg-destructive/90 transition-colors shadow-lg hover:shadow-xl"
                      >
                        Apply Now
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !isError && validAuditionLinks.length === 0 && (
            <Card className="bg-card/80 backdrop-blur-sm border-white/30">
              <CardContent className="py-12 text-center">
                <p className="text-xl text-white">
                  No audition links available at this time. Check back soon!
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
