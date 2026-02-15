// Centralized pass options data
export interface PassOption {
  id: string;
  name: string;
  price: string;
  description: string;
}

export const passOptions: PassOption[] = [
  {
    id: 'bloody',
    name: 'Bloody Pass',
    price: 'Included with ticket',
    description: 'For those who want to get covered in blood. Embrace the gore and wear your terror.',
  },
  {
    id: 'u-think-u-brave',
    name: 'U Think U Brave Pass',
    price: 'Included with ticket',
    description: 'You will have bugs on you and experience no mercy—but no physical contact. Test your limits.',
  },
  {
    id: 'regular',
    name: 'Regular Pass',
    price: 'Included with ticket',
    description: 'Standard admission for a terrifying experience without the extreme elements.',
  },
  {
    id: 'horn',
    name: 'Horn Pass',
    price: 'Included with ticket',
    description: 'Special access pass with unique privileges throughout the park.',
  },
  {
    id: 'content-creator',
    name: 'Content Creator Pass',
    price: '$4',
    description: 'Perfect for influencers and creators, this pass lets you capture content freely throughout the attraction and share your experience.',
  },
  {
    id: 'touch',
    name: 'Touch Pass',
    price: 'Included with Regular Pass; ask to upgrade',
    description: 'Unlocks special areas where touching props and interactive elements is allowed for a more immersive experience.',
  },
  {
    id: 'skip-the-line',
    name: 'Skip the Line Pass',
    price: '$34',
    description: 'Jump ahead of the crowd with priority entry so you can enjoy the attraction faster without waiting.',
  },
  {
    id: 'blackout',
    name: 'Blackout Pass',
    price: 'Included with ticket',
    description: 'Enter sections that go completely dark for an intense, suspense-filled experience. Not recommended if you are afraid of the dark.',
  },
  {
    id: 'kid',
    name: 'Kid Pass',
    price: '$8',
    description: 'A discounted pass tailored for younger guests, giving kids full access while keeping the experience family-friendly.',
  },
];
