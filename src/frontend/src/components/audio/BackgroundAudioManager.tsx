import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function BackgroundAudioManager() {
  const ambientRef = useRef<HTMLAudioElement | null>(null);
  const chainsawRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [showUnmutePrompt, setShowUnmutePrompt] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Create audio elements
    const ambient = new Audio('/assets/audio/ambient-eerie-loop.mp3');
    const chainsaw = new Audio('/assets/audio/chainsaw-loop.mp3');

    ambient.loop = true;
    chainsaw.loop = true;
    ambient.volume = 0.4;
    chainsaw.volume = 0.5; // Increased from 0.2 to 0.5 for audibility

    ambientRef.current = ambient;
    chainsawRef.current = chainsaw;

    // Attempt autoplay
    const playAudio = async () => {
      try {
        await ambient.play();
        await chainsaw.play();
        setIsPlaying(true);
        setIsMuted(false);
      } catch (error) {
        // Autoplay blocked - show unmute prompt
        setShowUnmutePrompt(true);
        setIsPlaying(false);
      }
    };

    playAudio();

    // Cleanup
    return () => {
      ambient.pause();
      chainsaw.pause();
      ambient.src = '';
      chainsaw.src = '';
    };
  }, []);

  const toggleMute = async () => {
    if (ambientRef.current && chainsawRef.current) {
      if (isMuted || !isPlaying) {
        // Unmute or start playing
        try {
          await ambientRef.current.play();
          await chainsawRef.current.play();
          setIsMuted(false);
          setIsPlaying(true);
          setShowUnmutePrompt(false);
        } catch (error) {
          // If play fails, show prompt
          setShowUnmutePrompt(true);
          setIsPlaying(false);
        }
      } else {
        // Mute
        ambientRef.current.pause();
        chainsawRef.current.pause();
        setIsMuted(true);
        setIsPlaying(false);
      }
    }
  };

  const handleEnableSound = async () => {
    if (ambientRef.current && chainsawRef.current) {
      try {
        await ambientRef.current.play();
        await chainsawRef.current.play();
        setShowUnmutePrompt(false);
        setIsMuted(false);
        setIsPlaying(true);
      } catch (error) {
        // Keep showing prompt if it still fails
        setShowUnmutePrompt(true);
        setIsPlaying(false);
      }
    }
  };

  return (
    <>
      {/* Enable Sound Prompt */}
      {showUnmutePrompt && (
        <div className="fixed top-24 right-4 z-50 bg-card/95 backdrop-blur-sm border border-destructive/50 rounded-lg p-4 shadow-glow-green max-w-xs">
          <p className="text-sm text-muted-foreground mb-3">
            Enable sound effects for the full horror experience
          </p>
          <Button
            onClick={handleEnableSound}
            size="sm"
            className="w-full bg-destructive hover:bg-destructive/90"
          >
            <Volume2 className="h-4 w-4 mr-2" />
            Enable Sound
          </Button>
        </div>
      )}

      {/* Mute/Unmute Control */}
      <Button
        onClick={toggleMute}
        size="icon"
        variant="outline"
        className="fixed bottom-4 right-4 z-50 bg-card/80 backdrop-blur-sm border-destructive/50 hover:bg-card hover:border-destructive shadow-glow-green"
        aria-label={isMuted || !isPlaying ? 'Unmute audio' : 'Mute audio'}
      >
        {isMuted || !isPlaying ? (
          <VolumeX className="h-5 w-5 text-destructive" />
        ) : (
          <Volume2 className="h-5 w-5 text-destructive" />
        )}
      </Button>
    </>
  );
}
