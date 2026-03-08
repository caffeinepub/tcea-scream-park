import { useEffect, useRef, useState } from "react";

export interface AutoplayVideoState {
  isPlaying: boolean;
  isAutoplayBlocked: boolean;
  error: string | null;
}

export function useAutoplayVideo(
  videoRef: React.RefObject<HTMLVideoElement | null>,
) {
  const [state, setState] = useState<AutoplayVideoState>({
    isPlaying: false,
    isAutoplayBlocked: false,
    error: null,
  });
  const attemptedAutoplay = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || attemptedAutoplay.current) return;

    attemptedAutoplay.current = true;

    const attemptAutoplay = async () => {
      try {
        // Ensure video is muted for autoplay compatibility
        video.muted = true;
        await video.play();
        setState({
          isPlaying: true,
          isAutoplayBlocked: false,
          error: null,
        });
      } catch (error: any) {
        // Autoplay was blocked by browser
        if (
          error.name === "NotAllowedError" ||
          error.name === "NotSupportedError"
        ) {
          setState({
            isPlaying: false,
            isAutoplayBlocked: true,
            error: null,
          });
        } else {
          setState({
            isPlaying: false,
            isAutoplayBlocked: false,
            error: error.message || "Video playback failed",
          });
        }
      }
    };

    // Small delay to ensure video is ready
    const timer = setTimeout(attemptAutoplay, 100);

    return () => clearTimeout(timer);
  }, [videoRef]);

  const play = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      await video.play();
      setState((prev) => ({
        ...prev,
        isPlaying: true,
        isAutoplayBlocked: false,
      }));
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        error: error.message || "Playback failed",
      }));
    }
  };

  const pause = () => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    setState((prev) => ({ ...prev, isPlaying: false }));
  };

  return {
    ...state,
    play,
    pause,
  };
}
