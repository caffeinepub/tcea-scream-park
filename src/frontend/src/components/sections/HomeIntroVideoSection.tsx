import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAutoplayVideo } from "@/hooks/useAutoplayVideo";
import { useFullscreen } from "@/hooks/useFullscreen";
import { Maximize, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Section } from "../layout/Section";
import { FullscreenVideoOverlay } from "../media/FullscreenVideoOverlay";

export function HomeIntroVideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [showFullscreenOverlay, setShowFullscreenOverlay] = useState(false);

  const { isPlaying, isAutoplayBlocked, play, pause } =
    useAutoplayVideo(videoRef);
  const { toggleFullscreen } = useFullscreen(containerRef);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVideoEnd = () => {
      setHasEnded(true);
      // Play clown laugh audio
      if (audioRef.current) {
        audioRef.current.play().catch((err) => {
          console.log("Audio playback failed:", err);
        });
      }
    };

    video.addEventListener("ended", handleVideoEnd);

    return () => {
      video.removeEventListener("ended", handleVideoEnd);
    };
  }, []);

  const handlePlayClick = async () => {
    if (isPlaying) {
      pause();
    } else {
      await play();
      setHasEnded(false);
    }
  };

  const handleMuteToggle = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleVideoError = () => {
    setVideoError(true);
  };

  const handleFullscreenClick = () => {
    // Try native fullscreen first
    if (document.fullscreenEnabled) {
      toggleFullscreen();
    } else {
      // Fallback to overlay modal
      setShowFullscreenOverlay(true);
    }
  };

  return (
    <>
      <Section
        id="intro-video"
        title="TCEA Scream Opens 2026"
        subtitle="You ready to brave the fire?"
        className="bg-gradient-to-b from-transparent to-black/30"
      >
        <div className="max-w-6xl mx-auto">
          <Card className="bg-card/80 backdrop-blur border-destructive/30 overflow-hidden">
            <CardContent className="p-0">
              <div
                ref={containerRef}
                className="relative aspect-video bg-black"
              >
                {videoError ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-8">
                      <Play className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">Video unavailable</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      poster="/assets/generated/intro-video-poster.dim_1920x1080.jpg"
                      playsInline
                      muted={isMuted}
                      onError={handleVideoError}
                    >
                      <source
                        src="/assets/video/tcea-scream-intro-placeholder.mp4"
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>

                    {/* Text Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="text-center px-4">
                        <h3 className="text-4xl md:text-6xl font-bold text-white drop-shadow-[0_0_20px_rgba(255,0,0,0.8)] mb-4">
                          TCEA Scream Opens 2026 in August
                        </h3>
                        <p className="text-2xl md:text-4xl font-bold text-destructive drop-shadow-[0_0_15px_rgba(0,0,0,0.9)]">
                          You ready to brave the fire?
                        </p>
                      </div>
                    </div>

                    {/* Autoplay Blocked Overlay */}
                    {isAutoplayBlocked && !isPlaying && !hasEnded && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <Button
                          variant="destructive"
                          size="lg"
                          onClick={handlePlayClick}
                          className="text-xl px-8 py-6"
                        >
                          <Play className="w-6 h-6 mr-2" />
                          Click to Play
                        </Button>
                      </div>
                    )}

                    {/* Controls */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <div className="flex gap-2">
                        <Button
                          variant="secondary"
                          size="icon"
                          onClick={handlePlayClick}
                          className="bg-black/60 hover:bg-black/80 text-white border-destructive/50"
                        >
                          {isPlaying ? (
                            <span className="text-xl">⏸</span>
                          ) : (
                            <Play className="w-5 h-5" />
                          )}
                        </Button>

                        <Button
                          variant="secondary"
                          size="icon"
                          onClick={handleMuteToggle}
                          className="bg-black/60 hover:bg-black/80 text-white border-destructive/50"
                        >
                          {isMuted ? (
                            <VolumeX className="w-5 h-5" />
                          ) : (
                            <Volume2 className="w-5 h-5" />
                          )}
                        </Button>
                      </div>

                      <Button
                        variant="secondary"
                        size="icon"
                        onClick={handleFullscreenClick}
                        className="bg-black/60 hover:bg-black/80 text-white border-destructive/50"
                      >
                        <Maximize className="w-5 h-5" />
                      </Button>
                    </div>

                    {hasEnded && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <Button
                          variant="destructive"
                          size="lg"
                          onClick={handlePlayClick}
                          className="text-xl px-8 py-6"
                        >
                          <Play className="w-6 h-6 mr-2" />
                          Watch Again
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Hidden audio element for clown laugh */}
          {/* biome-ignore lint/a11y/useMediaCaption: decorative sound effect, no caption needed */}
          <audio ref={audioRef} src="/assets/audio/clown-laugh-end.mp3" />
        </div>
      </Section>

      {/* Fullscreen Overlay Modal */}
      <FullscreenVideoOverlay
        isOpen={showFullscreenOverlay}
        onClose={() => setShowFullscreenOverlay(false)}
        videoSrc="/assets/video/tcea-scream-intro-placeholder.mp4"
        posterSrc="/assets/generated/intro-video-poster.dim_1920x1080.jpg"
        title="TCEA Scream Opens 2026"
      />
    </>
  );
}
