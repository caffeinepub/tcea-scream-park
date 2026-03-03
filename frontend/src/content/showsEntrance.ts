export interface ShowsEntranceContent {
  unlockYear: number;
  lockedDescription: string;
  unlockedDescription: string;
  locationDetails: string;
  accessInstructions: string;
}

export const showsEntranceInfo: ShowsEntranceContent = {
  unlockYear: 2040,
  lockedDescription: 'A highly classified entrance currently under construction. This secret passage will provide direct backstage access for all shows and processions, allowing performers and crew to move seamlessly between staging areas without being seen by guests. Full details will be revealed as we approach the 2040 opening date.',
  unlockedDescription: 'Welcome to the Shows & Processions Secret Entrance - your direct backstage access point. This state-of-the-art facility features dedicated staging areas, costume quick-change rooms, prop storage, and direct tunnels to all major performance venues. The entrance includes a green room, makeup stations, and real-time show coordination displays.',
  locationDetails: 'Located on the east side of the main performance plaza, completely separate from the TCEA Tunnels entrance. This entrance serves performers, dancers, stilt walkers, and procession participants exclusively.',
  accessInstructions: 'Performers must check in at the entrance 30 minutes before show time. Use your performer ID badge for access. Follow the color-coded tunnel system: Blue for Main Stage, Red for Plaza Processions, Green for Roaming Performances. Emergency exits are clearly marked throughout.',
};
