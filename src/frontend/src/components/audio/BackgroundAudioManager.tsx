import { useEffect, useRef } from 'react';

export function BackgroundAudioManager() {
  const chainsawRef = useRef<HTMLAudioElement | null>(null);
  const clownLaughRef = useRef<HTMLAudioElement | null>(null);
  const hasStartedRef = useRef(false);
  const gestureListenersAttachedRef = useRef(false);

  useEffect(() => {
    // Create chainsaw audio element
    const chainsaw = new Audio('/assets/audio/chainsaw-loop.mp3');
    chainsaw.loop = true;
    chainsaw.volume = 0.6; // 60% volume

    // Create clown laugh fallback audio element
    const clownLaugh = new Audio('/assets/audio/clown-laugh.mp3');
    clownLaugh.loop = true;
    clownLaugh.volume = 0.6; // 60% volume

    chainsawRef.current = chainsaw;
    clownLaughRef.current = clownLaugh;

    // Attempt to play chainsaw audio on mount
    const attemptChainsawPlay = async () => {
      try {
        await chainsaw.play();
        hasStartedRef.current = true;
        // Success - chainsaw is playing
      } catch (error) {
        // Chainsaw autoplay failed, try clown laugh fallback
        attemptClownLaughPlay();
      }
    };

    // Attempt to play clown laugh fallback
    const attemptClownLaughPlay = async () => {
      try {
        await clownLaugh.play();
        hasStartedRef.current = true;
        // Success - clown laugh is playing
      } catch (error) {
        // Both failed, attach gesture listeners for retry
        attachGestureListeners();
      }
    };

    // Attach user gesture listeners to retry playback
    const attachGestureListeners = () => {
      if (gestureListenersAttachedRef.current) return;
      gestureListenersAttachedRef.current = true;

      const retryPlayback = async () => {
        if (hasStartedRef.current) return;

        // Try chainsaw first
        try {
          await chainsaw.play();
          hasStartedRef.current = true;
          removeGestureListeners();
          return;
        } catch (error) {
          // Chainsaw failed, try clown laugh
          try {
            await clownLaugh.play();
            hasStartedRef.current = true;
            removeGestureListeners();
          } catch (fallbackError) {
            // Both still failing, listeners will remain for next gesture
          }
        }
      };

      const events = ['pointerdown', 'click', 'touchstart', 'keydown'];
      events.forEach(event => {
        window.addEventListener(event, retryPlayback, { once: false });
      });

      // Store cleanup function
      window.__audioGestureCleanup = () => {
        events.forEach(event => {
          window.removeEventListener(event, retryPlayback);
        });
      };
    };

    const removeGestureListeners = () => {
      if (window.__audioGestureCleanup) {
        window.__audioGestureCleanup();
        delete window.__audioGestureCleanup;
      }
      gestureListenersAttachedRef.current = false;
    };

    // Start initial playback attempt
    attemptChainsawPlay();

    // Cleanup
    return () => {
      chainsaw.pause();
      chainsaw.src = '';
      clownLaugh.pause();
      clownLaugh.src = '';
      removeGestureListeners();
    };
  }, []);

  // No UI rendered - audio plays automatically in background
  return null;
}

// Extend Window interface for cleanup function
declare global {
  interface Window {
    __audioGestureCleanup?: () => void;
  }
}
