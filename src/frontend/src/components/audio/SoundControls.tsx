import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useSoundPreferences } from '@/hooks/useSoundPreferences';

interface SoundControlsProps {
  autoplayBlocked?: boolean;
  onEnableSound?: () => void;
}

export function SoundControls({ autoplayBlocked, onEnableSound }: SoundControlsProps) {
  const { preferences, setEnabled, setVolume } = useSoundPreferences();

  const handleToggle = () => {
    const newState = !preferences.enabled;
    setEnabled(newState);
    
    // If enabling sound and autoplay was blocked, trigger gesture-based start
    if (newState && autoplayBlocked && onEnableSound) {
      // Small delay to ensure state is updated
      setTimeout(() => {
        onEnableSound();
      }, 50);
    }
  };

  const handleVolumeChange = (values: number[]) => {
    setVolume(values[0]);
  };

  const handleEnableClick = () => {
    if (onEnableSound) {
      onEnableSound();
    }
  };

  return (
    <div className="flex items-center gap-3">
      {autoplayBlocked && preferences.enabled && (
        <Button
          onClick={handleEnableClick}
          size="sm"
          variant="outline"
          className="text-xs border-destructive/50 text-destructive hover:bg-destructive/10"
        >
          Enable sound
        </Button>
      )}
      
      <div className="flex items-center gap-2 min-w-[140px]">
        <Button
          onClick={handleToggle}
          size="icon"
          variant="ghost"
          className="h-8 w-8 text-foreground hover:text-destructive"
          title={preferences.enabled ? 'Sound: On' : 'Sound: Off'}
        >
          {preferences.enabled ? (
            <Volume2 className="h-4 w-4" />
          ) : (
            <VolumeX className="h-4 w-4" />
          )}
        </Button>
        
        {preferences.enabled && (
          <Slider
            value={[preferences.volume]}
            onValueChange={handleVolumeChange}
            max={1}
            step={0.1}
            className="w-20"
          />
        )}
      </div>
    </div>
  );
}
