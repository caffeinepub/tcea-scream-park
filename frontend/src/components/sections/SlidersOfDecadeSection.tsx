import { useState, useRef, useEffect } from 'react';
import { Section } from '../layout/Section';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Film, Play, Maximize } from 'lucide-react';
import { slidersOfDecadeItems, slidersOfDecadeTitle, slidersOfDecadeSubtitle } from '@/content/slidersOfDecade';
import { useAutoplayVideo } from '@/hooks/useAutoplayVideo';
import { useFullscreen } from '@/hooks/useFullscreen';
import { FullscreenVideoOverlay } from '../media/FullscreenVideoOverlay';

export function SlidersOfDecadeSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageError, setImageError] = useState<Record<number, boolean>>({});
  const [videoError, setVideoError] = useState<Record<number, boolean>>({});
  const [showFullscreenOverlay, setShowFullscreenOverlay] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentItem = slidersOfDecadeItems[currentIndex];
  const isCurrentVideo = currentItem.type === 'video';

  const { isPlaying, isAutoplayBlocked, play } = useAutoplayVideo(
    isCurrentVideo ? videoRef : { current: null }
  );
  const { isFullscreen, toggleFullscreen } = useFullscreen(containerRef);

  // Reset video ref when switching slides
  useEffect(() => {
    if (isCurrentVideo && videoRef.current) {
      // Video will autoplay via useAutoplayVideo hook
    }
  }, [currentIndex, isCurrentVideo]);

  const handlePrevious = () => {
    // Exit fullscreen when changing slides
    if (isFullscreen) {
      document.exitFullscreen?.();
    }
    setCurrentIndex((prev) => (prev === 0 ? slidersOfDecadeItems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    // Exit fullscreen when changing slides
    if (isFullscreen) {
      document.exitFullscreen?.();
    }
    setCurrentIndex((prev) => (prev === slidersOfDecadeItems.length - 1 ? 0 : prev + 1));
  };

  const handleImageError = (id: number) => {
    setImageError((prev) => ({ ...prev, [id]: true }));
  };

  const handleVideoError = (id: number) => {
    setVideoError((prev) => ({ ...prev, [id]: true }));
  };

  const handleFullscreenClick = () => {
    if (!isCurrentVideo) return;

    // Try native fullscreen first
    if (document.fullscreenEnabled) {
      toggleFullscreen();
    } else {
      // Fallback to overlay modal
      setShowFullscreenOverlay(true);
    }
  };

  const handleThumbnailClick = (index: number) => {
    // Exit fullscreen when changing slides via thumbnail
    if (isFullscreen) {
      document.exitFullscreen?.();
    }
    setCurrentIndex(index);
  };

  return (
    <>
      <Section
        id="sliders-of-decade"
        title={slidersOfDecadeTitle}
        subtitle={slidersOfDecadeSubtitle}
        icon={<Film className="w-10 h-10 text-destructive" />}
      >
        <div className="max-w-5xl mx-auto">
          <div className="mb-6 flex justify-center">
            <Badge variant="destructive" className="text-lg px-4 py-2">
              Haunt Season Show
            </Badge>
          </div>

          <Card className="bg-card/80 backdrop-blur border-destructive/30 overflow-hidden">
            <CardContent className="p-0">
              <div ref={containerRef} className="relative aspect-video bg-black">
                {currentItem.type === 'image' ? (
                  imageError[currentItem.id] ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-muted">
                      <div className="text-center p-8">
                        <Film className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-muted-foreground">Image unavailable</p>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={currentItem.src}
                      alt={currentItem.title}
                      className="w-full h-full object-cover"
                      onError={() => handleImageError(currentItem.id)}
                    />
                  )
                ) : videoError[currentItem.id] ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-muted">
                    <div className="text-center p-8">
                      <Film className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">Video unavailable</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <video
                      ref={videoRef}
                      src={currentItem.src}
                      poster={currentItem.poster}
                      className="w-full h-full object-cover"
                      playsInline
                      muted
                      onError={() => handleVideoError(currentItem.id)}
                    >
                      Your browser does not support the video tag.
                    </video>

                    {/* Autoplay Blocked Overlay for Video */}
                    {isAutoplayBlocked && !isPlaying && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <Button
                          variant="destructive"
                          size="lg"
                          onClick={play}
                          className="text-xl px-8 py-6"
                        >
                          <Play className="w-6 h-6 mr-2" />
                          Click to Play
                        </Button>
                      </div>
                    )}
                  </>
                )}

                {/* Navigation Buttons - Disabled in fullscreen */}
                {!isFullscreen && (
                  <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={handlePrevious}
                      className="pointer-events-auto bg-black/60 hover:bg-black/80 text-white border-destructive/50"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={handleNext}
                      className="pointer-events-auto bg-black/60 hover:bg-black/80 text-white border-destructive/50"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </Button>
                  </div>
                )}

                {/* Fullscreen Button - Only for videos */}
                {isCurrentVideo && !videoError[currentItem.id] && (
                  <div className="absolute bottom-4 right-4">
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={handleFullscreenClick}
                      className="bg-black/60 hover:bg-black/80 text-white border-destructive/50"
                    >
                      <Maximize className="w-5 h-5" />
                    </Button>
                  </div>
                )}

                {/* Slide Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 px-4 py-2 rounded-full">
                  <p className="text-white text-sm font-medium">
                    {currentIndex + 1} / {slidersOfDecadeItems.length}
                  </p>
                </div>
              </div>

              {/* Slide Info */}
              <div className="p-6 bg-card/90">
                <h3 className="text-2xl font-bold text-destructive mb-2">{currentItem.title}</h3>
                <p className="text-muted-foreground">{currentItem.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* Thumbnail Navigation - Hidden in fullscreen */}
          {!isFullscreen && (
            <div className="mt-6 flex gap-3 justify-center flex-wrap">
              {slidersOfDecadeItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => handleThumbnailClick(index)}
                  className={`relative w-20 h-14 rounded-md overflow-hidden border-2 transition-all ${
                    index === currentIndex
                      ? 'border-destructive scale-110'
                      : 'border-muted-foreground/30 hover:border-destructive/50'
                  }`}
                >
                  {item.type === 'image' ? (
                    <img
                      src={item.src}
                      alt={`Slide ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={() => handleImageError(item.id)}
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <Film className="w-6 h-6 text-muted-foreground" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </Section>

      {/* Fullscreen Overlay Modal */}
      {isCurrentVideo && (
        <FullscreenVideoOverlay
          isOpen={showFullscreenOverlay}
          onClose={() => setShowFullscreenOverlay(false)}
          videoSrc={currentItem.src}
          posterSrc={currentItem.poster}
          title={currentItem.title}
        />
      )}
    </>
  );
}
