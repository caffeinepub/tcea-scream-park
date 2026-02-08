export function HorrorBackground() {
  return (
    <>
      {/* Deep black base with green glow vignette */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-black">
        <div 
          className="absolute inset-0 bg-gradient-radial from-transparent via-background/70 to-background"
          style={{
            background: 'radial-gradient(circle at center, transparent 0%, rgba(0, 20, 10, 0.7) 50%, rgba(0, 0, 0, 0.95) 100%)'
          }}
        />
      </div>
      
      {/* Toxic green glow overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.08]"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(0, 255, 100, 0.3) 0%, transparent 50%)',
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
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 100, 0.03) 2px, rgba(0, 255, 100, 0.03) 4px)',
        }}
      />
    </>
  );
}
