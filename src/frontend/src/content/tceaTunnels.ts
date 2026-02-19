export interface TCEATunnelsContent {
  secretEntrance: {
    title: string;
    location: string;
    accessInstructions: string;
    securityNotes: string;
  };
  dorms: {
    title: string;
    description: string;
  };
  food: {
    title: string;
    description: string;
  };
  tvRoom: {
    title: string;
    description: string;
  };
  lounge: {
    title: string;
    description: string;
  };
}

export const tceaTunnelsContent: TCEATunnelsContent = {
  secretEntrance: {
    title: 'Secret Entrance to TCEA Tunnels',
    location: 'Located behind the main maintenance building, accessible via the service corridor near the north parking lot.',
    accessInstructions: 'Use your employee keycard at the unmarked steel door. The entrance is monitored 24/7. Always sign in at the security checkpoint inside.',
    securityNotes: 'This entrance is separate from the Shows & Processions entrance. Do not share access codes or prop doors open. Report any security concerns immediately to your supervisor.',
  },
  dorms: {
    title: 'Employee Dormitories',
    description: 'Our underground dormitories provide comfortable sleeping quarters for employees working late shifts or multi-day events. Each dorm features individual sleeping pods with privacy curtains, personal lockers with combination locks, charging stations, and climate control. Bedding and towels are provided and laundered daily. Quiet hours are enforced from 11 PM to 7 AM. The dorm area includes shared bathroom facilities with showers, a small kitchenette, and a common area for relaxation.',
  },
  food: {
    title: 'Employee Cafeteria',
    description: 'The TCEA Tunnels cafeteria operates 24/7 during haunt season, offering hot meals, snacks, and beverages for all staff. Menu includes breakfast items (6-10 AM), lunch specials (11 AM-2 PM), and dinner options (5-9 PM). Late-night snacks and coffee are always available. We accommodate dietary restrictions including vegetarian, vegan, and gluten-free options. Meals are subsidized for employees - just scan your ID badge. Vending machines accept cash and cards. Seating area accommodates 50+ people with booth and table options.',
  },
  tvRoom: {
    title: 'Recreation & TV Lounge',
    description: 'Unwind in our entertainment lounge featuring a 75-inch 4K TV with streaming services (Netflix, Hulu, Disney+), gaming consoles (PlayStation 5, Xbox Series X, Nintendo Switch), and a collection of board games and puzzles. Comfortable sectional seating and recliners provide the perfect spot to relax between shifts. The room includes a sound system for movie nights and a small library of horror classics and industry magazines. Schedule is posted for group viewing events and gaming tournaments.',
  },
  lounge: {
    title: 'Staff Lounge & Break Areas',
    description: 'Multiple lounge areas throughout the tunnels offer comfortable spaces to decompress. Main lounge features modular seating, massage chairs, ambient lighting, and a meditation corner. Smaller break rooms are equipped with couches, tables, and quiet zones for reading or napping. All lounges have WiFi access, phone charging stations, and water coolers. The wellness area includes a first-aid station and a private room for costume changes or makeup touch-ups. Lockers available for personal belongings.',
  },
};
