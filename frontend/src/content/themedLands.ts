export interface ThemedLand {
  id: number;
  name: string;
  description: string;
  openingYear: number;
  sizeSqFt: number;
  status: 'planned' | 'underConstruction' | 'open';
  futureShows: string[];
}

export const themedLands: ThemedLand[] = [
  {
    id: 1,
    name: 'Kid Grove',
    description: 'A magical 500,000 square foot wonderland designed for families and young adventurers. Kid Grove will feature colorful attractions, interactive shows, and kid-friendly entertainment in a vibrant, safe environment. Home to the Color Paint show, Bee\'s Dance Show, and many more family experiences.',
    openingYear: 2050,
    sizeSqFt: 500000,
    status: 'planned',
    futureShows: ['Color Paint', 'Bee\'s Dance Show'],
  },
];
