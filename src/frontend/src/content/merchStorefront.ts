// Merch storefront catalog for browsing (no checkout/payments)
export interface MerchProduct {
  id: string;
  name: string;
  description: string;
  category: "hoodies" | "hats" | "shirts" | "posters" | "plushies";
  character?: "Riley" | "Ace" | "Kevin" | "Rocky";
  imageUrl?: string;
}

export const merchCategories = [
  { id: "hoodies", label: "Hoodies", icon: "🧥" },
  { id: "hats", label: "Hats", icon: "🧢" },
  { id: "shirts", label: "Shirts", icon: "👕" },
  { id: "posters", label: "Posters", icon: "🖼️" },
  { id: "plushies", label: "Plushies", icon: "🧸" },
] as const;

export const merchProducts: MerchProduct[] = [
  // Hoodies
  {
    id: "hoodie-riley",
    name: "Riley the Bear Hoodie",
    description:
      "Cozy hoodie featuring Riley the bear in all his fuzzy glory. Perfect for chilly haunt nights.",
    category: "hoodies",
    character: "Riley",
  },
  {
    id: "hoodie-ace",
    name: "Ace Minion Hoodie",
    description:
      "Show your love for Ace with this playful minion-style character hoodie.",
    category: "hoodies",
    character: "Ace",
  },
  {
    id: "hoodie-kevin",
    name: "Kevin Minion Hoodie",
    description: "Kevin's mischievous grin on a comfortable pullover hoodie.",
    category: "hoodies",
    character: "Kevin",
  },
  {
    id: "hoodie-rocky",
    name: "Rocky Minion Hoodie",
    description: "Rocky's bold personality captured on premium fabric.",
    category: "hoodies",
    character: "Rocky",
  },
  // Hats
  {
    id: "hat-riley",
    name: "Riley the Bear Cap",
    description: "Adjustable cap with embroidered Riley the bear logo.",
    category: "hats",
    character: "Riley",
  },
  {
    id: "hat-ace",
    name: "Ace Snapback",
    description: "Snapback hat featuring Ace's signature look.",
    category: "hats",
    character: "Ace",
  },
  {
    id: "hat-kevin",
    name: "Kevin Beanie",
    description: "Warm beanie with Kevin's face embroidered on the front.",
    category: "hats",
    character: "Kevin",
  },
  {
    id: "hat-rocky",
    name: "Rocky Trucker Hat",
    description: "Classic trucker hat with Rocky's bold character design.",
    category: "hats",
    character: "Rocky",
  },
  // Shirts
  {
    id: "shirt-riley",
    name: "Riley the Bear Tee",
    description: "Soft cotton tee with Riley the bear graphic print.",
    category: "shirts",
    character: "Riley",
  },
  {
    id: "shirt-ace",
    name: "Ace Character Shirt",
    description: "Comfortable shirt featuring Ace in action.",
    category: "shirts",
    character: "Ace",
  },
  {
    id: "shirt-kevin",
    name: "Kevin Graphic Tee",
    description: "Eye-catching graphic tee with Kevin's playful design.",
    category: "shirts",
    character: "Kevin",
  },
  {
    id: "shirt-rocky",
    name: "Rocky Performance Shirt",
    description: "Athletic-fit shirt with Rocky's dynamic character art.",
    category: "shirts",
    character: "Rocky",
  },
  // Posters
  {
    id: "poster-riley",
    name: "Riley the Bear Poster",
    description:
      "High-quality 18x24 poster featuring Riley the bear in stunning detail.",
    category: "posters",
    character: "Riley",
  },
  {
    id: "poster-ace",
    name: "Ace Character Poster",
    description: "Vibrant poster showcasing Ace's minion-style charm.",
    category: "posters",
    character: "Ace",
  },
  {
    id: "poster-kevin",
    name: "Kevin Wall Art",
    description: "Premium poster print of Kevin perfect for any fan's wall.",
    category: "posters",
    character: "Kevin",
  },
  {
    id: "poster-rocky",
    name: "Rocky Action Poster",
    description: "Dynamic poster capturing Rocky's energetic personality.",
    category: "posters",
    character: "Rocky",
  },
  {
    id: "poster-cast",
    name: "Full Cast Poster",
    description:
      "Collectible poster featuring Riley, Ace, Kevin, and Rocky together.",
    category: "posters",
  },
  // Plushies
  {
    id: "plush-riley",
    name: "Riley the Bear Plush",
    description:
      "Adorable 12-inch plush of Riley the bear. Soft, cuddly, and perfect for hugs.",
    category: "plushies",
    character: "Riley",
  },
  {
    id: "plush-ace",
    name: "Ace Plush Toy",
    description: "Collectible Ace plush in minion-style design.",
    category: "plushies",
    character: "Ace",
  },
  {
    id: "plush-kevin",
    name: "Kevin Plush Buddy",
    description: "Soft and huggable Kevin plush toy.",
    category: "plushies",
    character: "Kevin",
  },
  {
    id: "plush-rocky",
    name: "Rocky Plush Character",
    description: "Premium plush of Rocky with detailed stitching.",
    category: "plushies",
    character: "Rocky",
  },
];
