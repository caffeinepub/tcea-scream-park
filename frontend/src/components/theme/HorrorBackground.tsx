export function HorrorBackground() {
  return (
    <>
      {/* Chainsaw-themed background image with orange tint */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <img
          src="/assets/generated/chainsaw-home-bg.dim_2400x1350.jpg"
          alt=""
          className="w-full h-full object-cover opacity-[0.18]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80" />
        {/* Enhanced orange tint overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 100, 0, 0.18) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 100, 0, 0.12) 100%)',
          }}
        />
      </div>

      {/* Animated horror layers - fire, smoke, chainsaws, blood with enhanced intensity */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Fire layer with orange emphasis - increased opacity */}
        <div className="absolute inset-0 animate-horror-drift-1 opacity-35">
          <img
            src="/assets/generated/bg-fire-loop.dim_2400x1350.png"
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: 'hue-rotate(-10deg) saturate(1.4) brightness(1.1)' }}
          />
        </div>
        
        {/* Smoke layer - increased opacity */}
        <div className="absolute inset-0 animate-horror-drift-2 opacity-30">
          <img
            src="/assets/generated/bg-smoke-loop.dim_2400x1350.png"
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(1.2)' }}
          />
        </div>
        
        {/* Chainsaws layer - increased opacity */}
        <div className="absolute inset-0 animate-horror-drift-3 opacity-20">
          <img
            src="/assets/generated/bg-chainsaws-loop.dim_2400x1350.png"
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: 'contrast(1.2)' }}
          />
        </div>
        
        {/* Blood layer - increased opacity */}
        <div className="absolute inset-0 animate-horror-drift-4 opacity-35">
          <img
            src="/assets/generated/bg-blood-loop.dim_2400x1350.png"
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: 'saturate(1.3)' }}
          />
        </div>

        {/* Additional debris layer for chaos */}
        <div className="absolute inset-0 animate-float-debris opacity-15">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-destructive/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-accent/20 rounded-full blur-2xl animate-pulse-slower" />
          <div className="absolute bottom-1/3 left-1/2 w-40 h-40 bg-destructive/15 rounded-full blur-3xl animate-pulse" />
        </div>
      </div>

      {/* Deep black base with enhanced orange and green glow vignette */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-black">
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, transparent 0%, rgba(20, 10, 0, 0.75) 35%, rgba(0, 0, 0, 0.95) 100%)'
          }}
        />
      </div>
      
      {/* Enhanced orange and green glow overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.15]"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(255, 100, 0, 0.35) 0%, rgba(0, 255, 100, 0.25) 40%, transparent 70%)',
        }}
      />
      
      {/* Enhanced noise texture for gritty feel */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.08]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.4' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
        }}
      />

      {/* Enhanced scanline effect */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.04]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 100, 0, 0.04) 2px, rgba(255, 100, 0, 0.04) 4px)',
        }}
      />

      {/* Flickering shadow overlay for intensity */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-black/10 animate-flicker-subtle" />
    </>
  );
}
