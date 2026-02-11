export function HorrorBackground() {
  return (
    <>
      {/* Chainsaw-themed background image with orange tint */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <img
          src="/assets/generated/chainsaw-home-bg.dim_2400x1350.jpg"
          alt=""
          className="w-full h-full object-cover opacity-[0.15]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80" />
        {/* Orange tint overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 100, 0, 0.15) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 100, 0, 0.1) 100%)',
          }}
        />
      </div>

      {/* Animated horror layers - fire, smoke, chainsaws, blood */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Fire layer with orange emphasis */}
        <div className="absolute inset-0 animate-horror-drift-slow opacity-30">
          <img
            src="/assets/generated/bg-fire-loop.dim_2400x1350.png"
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: 'hue-rotate(-10deg) saturate(1.3)' }}
          />
        </div>
        
        {/* Smoke layer */}
        <div className="absolute inset-0 animate-horror-drift-medium opacity-25">
          <img
            src="/assets/generated/bg-smoke-loop.dim_2400x1350.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Chainsaws layer */}
        <div className="absolute inset-0 animate-horror-drift-fast opacity-15">
          <img
            src="/assets/generated/bg-chainsaws-loop.dim_2400x1350.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Blood layer */}
        <div className="absolute inset-0 animate-horror-drift-reverse opacity-30">
          <img
            src="/assets/generated/bg-blood-loop.dim_2400x1350.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Deep black base with orange and green glow vignette */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-black">
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, transparent 0%, rgba(20, 10, 0, 0.7) 40%, rgba(0, 0, 0, 0.95) 100%)'
          }}
        />
      </div>
      
      {/* Orange and green glow overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.12]"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(255, 100, 0, 0.3) 0%, rgba(0, 255, 100, 0.2) 40%, transparent 70%)',
        }}
      />
      
      {/* Enhanced noise texture for gritty feel */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
        }}
      />

      {/* Subtle scanline effect */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 100, 0, 0.03) 2px, rgba(255, 100, 0, 0.03) 4px)',
        }}
      />
    </>
  );
}
