import { Heart, Skull } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-destructive/20 bg-background/80 backdrop-blur-sm mt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Scary Warning */}
        <Alert className="mb-6 bg-destructive/10 border-destructive/50 max-w-4xl mx-auto">
          <Skull className="h-5 w-5 text-destructive" />
          <AlertDescription className="text-sm leading-relaxed">
            <span className="font-bold text-destructive block mb-2">⚠️ EXTREME HAUNT WARNING ⚠️</span>
            TCEA Scream Park is an EXTREME haunted attraction featuring intense audio, strobe lights, fog effects, 
            complete darkness, physical contact, and disturbing content. NOT RECOMMENDED for those with heart conditions, 
            respiratory issues, epilepsy, or pregnant individuals. Participants may experience genuine fear, panic, and 
            psychological distress. By entering, you acknowledge the risks and waive all liability. You may encounter 
            chainsaw-wielding actors, confined spaces, and scenarios designed to terrify. <span className="text-destructive font-bold">
            NO REFUNDS. Enter at your own risk. Your screams fuel our existence.</span>
          </AlertDescription>
        </Alert>

        {/* Attribution */}
        <div className="text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-2 flex-wrap">
            © 2026. Built with{' '}
            <Heart className="h-4 w-4 text-destructive fill-destructive inline" /> using{' '}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-destructive hover:text-destructive/80 transition-colors underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
