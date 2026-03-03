import { useEffect, useRef, useState, useCallback } from 'react';
import { useSoundPreferences } from '@/hooks/useSoundPreferences';

interface BackgroundAudioManagerProps {
  onAutoplayBlockedChange?: (blocked: boolean) => void;
  onRequestStart?: (callback: () => void) => void;
}

export function BackgroundAudioManager({ onAutoplayBlockedChange, onRequestStart }: BackgroundAudioManagerProps) {
  const { preferences } = useSoundPreferences();
  const chainsawRef = useRef<HTMLAudioElement | null>(null);
  const clownLaughRef = useRef<HTMLAudioElement | null>(null);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<'chainsaw' | 'clown' | null>(null);
  const playAttemptedRef = useRef(false);
  const initialLoadRef = useRef(true);

  // Notify parent of autoplay blocked state
  useEffect(() => {
    onAutoplayBlockedChange?.(autoplayBlocked);
  }, [autoplayBlocked, onAutoplayBlockedChange]);

  // Initialize audio elements
  useEffect(() => {
    const chainsaw = new Audio('/assets/audio/chainsaw-loop.mp3');
    chainsaw.loop = true;

    const clownLaugh = new Audio('/assets/audio/ambient-eerie-loop.mp3');
    clownLaugh.loop = true;

    chainsawRef.current = chainsaw;
    clownLaughRef.current = clownLaugh;

    return () => {
      chainsaw.pause();
      chainsaw.src = '';
      clownLaugh.pause();
      clownLaugh.src = '';
    };
  }, []);

  // Update volume when preferences change
  useEffect(() => {
    if (chainsawRef.current) {
      chainsawRef.current.volume = preferences.volume;
    }
    if (clownLaughRef.current) {
      clownLaughRef.current.volume = preferences.volume;
    }
  }, [preferences.volume]);

  // Attempt to start playback
  const attemptPlayback = useCallback(async () => {
    if (!chainsawRef.current || !clownLaughRef.current) return;

    // Stop any currently playing audio
    chainsawRef.current.pause();
    clownLaughRef.current.pause();
    setCurrentAudio(null);

    // Try chainsaw first
    try {
      chainsawRef.current.currentTime = 0;
      await chainsawRef.current.play();
      setCurrentAudio('chainsaw');
      setAutoplayBlocked(false);
      playAttemptedRef.current = true;
      return;
    } catch (error) {
      // Chainsaw failed, try clown laugh fallback
      try {
        clownLaughRef.current.currentTime = 0;
        await clownLaughRef.current.play();
        setCurrentAudio('clown');
        setAutoplayBlocked(false);
        playAttemptedRef.current = true;
        return;
      } catch (fallbackError) {
        // Both failed - autoplay is blocked
        setAutoplayBlocked(true);
        playAttemptedRef.current = true;
      }
    }
  }, []);

  // Handle enabled/disabled state
  useEffect(() => {
    if (preferences.enabled) {
      // Attempt playback on initial load or when re-enabling
      if (!playAttemptedRef.current || initialLoadRef.current) {
        initialLoadRef.current = false;
        attemptPlayback();
      } else if (currentAudio === null) {
        // Was disabled, now re-enabling - always attempt playback
        attemptPlayback();
      }
    } else {
      // Pause all audio when disabled
      if (chainsawRef.current) {
        chainsawRef.current.pause();
      }
      if (clownLaughRef.current) {
        clownLaughRef.current.pause();
      }
      setCurrentAudio(null);
    }
  }, [preferences.enabled, attemptPlayback, currentAudio]);

  // Expose requestStart callback to parent
  useEffect(() => {
    if (onRequestStart) {
      onRequestStart(attemptPlayback);
    }
  }, [onRequestStart, attemptPlayback]);

  return null;
}
