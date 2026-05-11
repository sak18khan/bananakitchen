export interface Country {
  id: string;
  name: string;
  status: "available" | "locked" | "coming-soon";
  coordinates: [number, number]; // [lat, lng]
  previewVisuals: string;
}

export const COUNTRIES: Country[] = [
  {
    id: "india",
    name: "India",
    status: "available",
    coordinates: [20.5937, 78.9629],
    previewVisuals: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=2000"
  },
  {
    id: "italy",
    name: "Italy",
    status: "locked",
    coordinates: [41.8719, 12.5674],
    previewVisuals: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&q=80&w=2000"
  },
  {
    id: "egypt",
    name: "Egypt",
    status: "coming-soon",
    coordinates: [26.8206, 30.8025],
    previewVisuals: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&q=80&w=2000"
  },
  {
    id: "japan",
    name: "Japan",
    status: "locked",
    coordinates: [36.2048, 138.2529],
    previewVisuals: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=2000"
  },
  {
    id: "mexico",
    name: "Mexico",
    status: "locked",
    coordinates: [23.6345, -102.5528],
    previewVisuals: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?auto=format&fit=crop&q=80&w=2000"
  }
];

export interface CenturyData {
  year: string;
  title: string;
  description: string;
  tech: string;
  influence: string;
  atmosphere: string;
  visuals: string;
  ingredients: string[];
  evolution: {
    architecture: string;
    clothing: string;
    cooking: string;
  }
}

export const INDIA_CENTURIES: CenturyData[] = [
  {
    year: "0 AD",
    title: "The Vedic Grains",
    description: "Early agrarian society centered on sacred riverbanks and ritualistic food preparation.",
    tech: "Clay Pots & Open Fire",
    influence: "Vedic Rituals",
    atmosphere: "misty-river-morning",
    visuals: "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&q=80&w=2000",
    ingredients: ["Barley", "Ghee", "Milk", "Local Lentils"],
    evolution: {
      architecture: "Thatched mud huts and sacred fire altars.",
      clothing: "Simple cotton drapes (Dhoti/Veshti) and natural dyes.",
      cooking: "Direct fire roasting and clay vessel steaming."
    }
  },
  {
    year: "400 AD",
    title: "Gupta Golden Age",
    description: "Refined vegetarianism and the flowering of temple food culture.",
    tech: "Advanced Fermentation",
    influence: "Buddhism & Jainism",
    atmosphere: "temple-incense-gold",
    visuals: "https://images.unsplash.com/photo-1514222139-179664228414?auto=format&fit=crop&q=80&w=2000",
    ingredients: ["Mangoes", "Coconuts", "Jackfruit", "Pepper"],
    evolution: {
      architecture: "Ornate stone temples and university complexes (Nalanda).",
      clothing: "Silks and intricate jewelry for the elite.",
      cooking: "Development of complex 'Ayurvedic' spice balancing."
    }
  },
  {
    year: "1500 AD",
    title: "Mughal Synthesis",
    description: "The introduction of Persian aesthetics, nuts, and slow-cooked rich gravies.",
    tech: "Tandoors & Dam-Pukht",
    influence: "Persian & Central Asian",
    atmosphere: "palace-rich-spice",
    visuals: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=2000",
    ingredients: ["Saffron", "Dry Fruits", "Meats", "Paneer"],
    evolution: {
      architecture: "Indo-Islamic domes, gardens, and marble palaces.",
      clothing: "Angarkhas, turbans, and heavily embroidered fabrics.",
      cooking: "Royal kitchens perfecting Biryani and Kebabs."
    }
  },
  {
    year: "1800 AD",
    title: "Colonial Fusion",
    description: "The arrival of the 'New World' crops (Chillies, Potatoes) and Tea plantations.",
    tech: "Large Scale Shipping & Railways",
    influence: "Portuguese & British",
    atmosphere: "tea-plantation-industrial",
    visuals: "https://images.unsplash.com/photo-1501413861213-333068e14713?auto=format&fit=crop&q=80&w=2000",
    ingredients: ["Potatoes", "Tomatoes", "Chillies", "Tea"],
    evolution: {
      architecture: "Victorian-Gothic railway stations and plantation bungalows.",
      clothing: "Introduction of waistcoats and refined saris.",
      cooking: "Anglo-Indian fusion dishes like Mulligatawny soup."
    }
  },
  {
    year: "2000 AD",
    title: "Modern Globalization",
    description: "The explosion of street food culture and global fusion in urban hubs.",
    tech: "Modern Refrigeration & Logistics",
    influence: "Global Markets",
    atmosphere: "urban-neon-street",
    visuals: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2000",
    ingredients: ["Processed Wheat", "White Sugar", "Imported Olives"],
    evolution: {
      architecture: "Concrete skyscrapers and glass-fronted malls.",
      clothing: "Jeans, T-shirts, and modern synthetic blends.",
      cooking: "Quick-fire street snacks and international chains."
    }
  },
  {
    year: "2100 AD",
    title: "Sustainable Future",
    description: "Return to traditional grains powered by high-tech vertical farming.",
    tech: "AI-Controlled Hydroponics",
    influence: "Planetary Survival",
    atmosphere: "clean-tech-green",
    visuals: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&q=80&w=2000",
    ingredients: ["Algae Flours", "Lab-Grown Protein", "Millets"],
    evolution: {
      architecture: "Bio-integrated green towers and underground living.",
      clothing: "Smart, climate-reactive recycled textiles.",
      cooking: "Precise 3D nutrition printing with traditional spice DNA."
    }
  }
];
