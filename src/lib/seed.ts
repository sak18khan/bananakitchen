export interface SeedCombo {
  text: string;
  category: 'Sweet Chaos' | 'Savoury Crimes' | 'Fusion Experiments' | 'Absolute Chaos';
  bananaVotes: number;
  notVotes: number;
}

export const SEED_COMBOS: SeedCombo[] = [
  // Sweet chaos
  {
    text: "Banana + Maggi + Chilli Flakes",
    category: "Sweet Chaos",
    bananaVotes: 32,
    notVotes: 68,
  },
  {
    text: "Mango + Cheese Slice + Bread",
    category: "Sweet Chaos",
    bananaVotes: 45,
    notVotes: 55,
  },
  {
    text: "Watermelon + Salt + Chaat Masala",
    category: "Sweet Chaos",
    bananaVotes: 78,
    notVotes: 22,
  },
  {
    text: "Banana + Curd + Sugar + Roti",
    category: "Sweet Chaos",
    bananaVotes: 52,
    notVotes: 48,
  },
  {
    text: "Guava + Black Salt + Lemon",
    category: "Sweet Chaos",
    bananaVotes: 89,
    notVotes: 11,
  },
  {
    text: "Papaya + Milk + Honey",
    category: "Sweet Chaos",
    bananaVotes: 64,
    notVotes: 36,
  },

  // Savoury crimes
  {
    text: "Parle-G biscuit + Chai dipped for 10 seconds",
    category: "Savoury Crimes",
    bananaVotes: 15,
    notVotes: 85,
  },
  {
    text: "Rice + Ketchup + Butter",
    category: "Savoury Crimes",
    bananaVotes: 21,
    notVotes: 79,
  },
  {
    text: "Maggi + Egg + Everything in the fridge",
    category: "Savoury Crimes",
    bananaVotes: 72,
    notVotes: 28,
  },
  {
    text: "Bread + Raw Onion + Green Chutney",
    category: "Savoury Crimes",
    bananaVotes: 83,
    notVotes: 17,
  },
  {
    text: "Curd Rice + Pickle + Papad",
    category: "Savoury Crimes",
    bananaVotes: 95,
    notVotes: 5,
  },
  {
    text: "Poha + Sev + Lemon + Pomegranate",
    category: "Savoury Crimes",
    bananaVotes: 88,
    notVotes: 12,
  },

  // Fusion experiments
  {
    text: "Dosa + Nutella",
    category: "Fusion Experiments",
    bananaVotes: 38,
    notVotes: 62,
  },
  {
    text: "Idli + Peanut Butter",
    category: "Fusion Experiments",
    bananaVotes: 27,
    notVotes: 73,
  },
  {
    text: "Samosa + Ketchup + Mayonnaise",
    category: "Fusion Experiments",
    bananaVotes: 44,
    notVotes: 56,
  },
  {
    text: "Pav Bhaji + Cheese + Extra Butter (double crime?)",
    category: "Fusion Experiments",
    bananaVotes: 81,
    notVotes: 19,
  },
  {
    text: "Biryani + Raita + Fanta",
    category: "Fusion Experiments",
    bananaVotes: 9,
    notVotes: 91,
  },
  {
    text: "Upma + Ketchup",
    category: "Fusion Experiments",
    bananaVotes: 33,
    notVotes: 67,
  },

  // Absolute chaos
  {
    text: "Banana + Dal + Rice (the holy trinity?)",
    category: "Absolute Chaos",
    bananaVotes: 49,
    notVotes: 51,
  },
  {
    text: "Cold Chai + Parle-G + Midnight Sadness",
    category: "Absolute Chaos",
    bananaVotes: 18,
    notVotes: 82,
  },
  {
    text: "Maggi at 2am + Regret",
    category: "Absolute Chaos",
    bananaVotes: 75,
    notVotes: 25,
  },
  {
    text: "Leftover Sabzi + Bread + Desperation",
    category: "Absolute Chaos",
    bananaVotes: 68,
    notVotes: 32,
  },
  {
    text: "Birthday Cake + Hot Sauce",
    category: "Absolute Chaos",
    bananaVotes: 12,
    notVotes: 88,
  },
  {
    text: "Chocolate + Pickle",
    category: "Absolute Chaos",
    bananaVotes: 14,
    notVotes: 86,
  }
];
