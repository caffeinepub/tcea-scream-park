import { Calendar, Hammer, PartyPopper } from 'lucide-react';

export function ConstructionTimeline() {
  const milestones = [
    {
      icon: <Hammer className="h-6 w-6" />,
      label: 'Construction Starts',
      date: 'March 3rd',
      description: 'Breaking ground',
    },
    {
      icon: <Hammer className="h-6 w-6" />,
      label: 'Construction Complete',
      date: 'June 19th',
      description: 'Final touches',
    },
    {
      icon: <PartyPopper className="h-6 w-6" />,
      label: 'Grand Opening',
      date: 'August 22nd',
      description: 'Welcome to terror',
    },
  ];

  return (
    <div className="relative py-12 px-4 bg-gradient-to-b from-background via-destructive/5 to-background border-y border-destructive/30 overflow-hidden">
      {/* Animated blood drip overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-destructive/50 to-transparent animate-blood-drip" />
      </div>

      {/* Flickering background effect */}
      <div className="absolute inset-0 bg-destructive/5 animate-flicker-slow pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-destructive bloody-text mb-2 animate-pulse-glow">
            TCEA Construction Timeline
          </h2>
          <p className="text-lg text-muted-foreground glow-orange">
            Watch the nightmare come to life
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-1/4 left-0 right-0 h-1 bg-gradient-to-r from-destructive/20 via-destructive to-destructive/20 animate-pulse-glow" />

          {milestones.map((milestone, index) => (
            <div
              key={index}
              className="relative group"
            >
              {/* Card with chaotic styling */}
              <div className="relative bg-card/90 backdrop-blur-sm border-2 border-destructive/40 rounded-lg p-6 transition-all duration-300 hover:border-destructive hover:shadow-glow-orange hover:scale-105 animate-float-subtle overflow-hidden">
                {/* Blood splatter overlay */}
                <div className="absolute top-0 right-0 w-24 h-24 opacity-20 pointer-events-none">
                  <div className="w-full h-full bg-destructive rounded-full blur-xl animate-pulse" />
                </div>

                {/* Distressed texture */}
                <div className="absolute inset-0 opacity-5 mix-blend-overlay pointer-events-none bg-noise" />

                {/* Icon with glow */}
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-destructive/30 blur-xl animate-pulse-glow" />
                    <div className="relative bg-destructive/20 p-4 rounded-full border-2 border-destructive text-destructive group-hover:animate-spin-slow">
                      {milestone.icon}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="text-center space-y-2 relative z-10">
                  <h3 className="text-xl font-bold text-destructive glow-orange">
                    {milestone.label}
                  </h3>
                  <p className="text-3xl font-bold text-foreground bloody-text animate-pulse">
                    {milestone.date}
                  </p>
                  <p className="text-sm text-muted-foreground italic">
                    {milestone.description}
                  </p>
                </div>

                {/* Animated corner accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-destructive/60 animate-pulse" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-destructive/60 animate-pulse" />
              </div>

              {/* Dripping effect */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1 h-8 bg-gradient-to-b from-destructive to-transparent opacity-60 animate-drip" />
            </div>
          ))}
        </div>

        {/* Additional chaotic elements */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground italic animate-flicker">
            The countdown to terror has begun...
          </p>
        </div>
      </div>

      {/* Particle effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-destructive rounded-full animate-float-particle-1 opacity-40" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-accent rounded-full animate-float-particle-2 opacity-30" />
        <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-destructive rounded-full animate-float-particle-3 opacity-50" />
      </div>
    </div>
  );
}
