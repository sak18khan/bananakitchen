export interface EraData {
  id: string;
  title: string;
  year: string;
  color: string;
  glow: string;
  status: "active" | "locked";
  teaserText?: string;
}

export const ERAS: EraData[] = [
  { id: "rome", title: "Ancient Rome", year: "120 AD", color: "from-soft-gold/20 to-transparent", glow: "shadow-soft-gold", status: "active" },
  { id: "viking", title: "Viking Age", year: "900 AD", color: "from-neon-blue/20 to-transparent", glow: "shadow-neon-blue", status: "active" },
  { id: "mughal", title: "Mughal Empire", year: "1600 AD", color: "from-emerald-500/20 to-transparent", glow: "shadow-emerald-500", status: "active" },
  { id: "edo", title: "Edo Japan", year: "1750 AD", color: "from-red-500/20 to-transparent", glow: "shadow-red-500", status: "active" },
  { id: "space", title: "Space Food", year: "2050 AD", color: "from-electric-purple/20 to-transparent", glow: "shadow-electric-purple", status: "active" },
  
  // Roadmap Eras
  { id: "egypt", title: "Ancient Egypt", year: "3000 BC", color: "from-yellow-600/10 to-transparent", glow: "shadow-yellow-600/50", status: "locked", teaserText: "Bread, Beer, and Pyramids" },
  { id: "mesopotamia", title: "Mesopotamia", year: "2500 BC", color: "from-orange-400/10 to-transparent", glow: "shadow-orange-400/50", status: "locked", teaserText: "The Fertile Crescent" },
  { id: "persia", title: "Ancient Persia", year: "500 BC", color: "from-purple-600/10 to-transparent", glow: "shadow-purple-600/50", status: "locked", teaserText: "The First Ice Cream" },
  { id: "china", title: "Ancient China", year: "200 BC", color: "from-red-700/10 to-transparent", glow: "shadow-red-700/50", status: "locked", teaserText: "The Origins of Noodles" },
  { id: "aztec", title: "Aztec Empire", year: "1400 AD", color: "from-green-600/10 to-transparent", glow: "shadow-green-600/50", status: "locked", teaserText: "The Discovery of Chocolate" },
  { id: "ottoman", title: "Ottoman Empire", year: "1500 AD", color: "from-amber-600/10 to-transparent", glow: "shadow-amber-600/50", status: "locked", teaserText: "Coffee and Spices" },
  { id: "europe", title: "Medieval Europe", year: "1300 AD", color: "from-stone-600/10 to-transparent", glow: "shadow-stone-600/50", status: "locked", teaserText: "Feasts and Famine" },
  { id: "industrial", title: "Industrial Revolution", year: "1850 AD", color: "from-orange-700/10 to-transparent", glow: "shadow-orange-700/50", status: "locked", teaserText: "The Canning Era" },
  { id: "mars", title: "Mars Colony", year: "2150 AD", color: "from-red-600/10 to-transparent", glow: "shadow-red-600/50", status: "locked", teaserText: "Hydroponics and Survival" },
];
