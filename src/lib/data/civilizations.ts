export interface Evidence {
  title: string;
  description: string;
  sourceType: "archaeological" | "textual" | "logistics" | "cultural";
  content: string;
}

export interface Civilization {
  id: string;
  title: string;
  period: string;
  region: string;
  context: string;
  reasoning: string;
  atmosphere: string;
  visuals: string;
  ingredients: string[];
  tradeRoutes: string[];
  evidence: Evidence[];
}

export const CIVILIZATIONS: Civilization[] = [
  {
    id: "fire-discovery",
    title: "Discovery of Fire",
    period: "c. 1.7 Million Years Ago",
    region: "Africa / Eurasia",
    context: "The first great culinary revolution. Cooking predigested food, allowing for brain growth.",
    reasoning: "Heat breaks down complex fibers and proteins, making more calories available with less effort.",
    atmosphere: "dark-warm-glow",
    visuals: "https://images.unsplash.com/photo-1520114878144-6123749968dd?auto=format&fit=crop&q=80&w=2000",
    ingredients: ["Cooked Meat", "Charred Tuber", "Roasted Seeds"],
    tradeRoutes: ["Local Exchange"],
    evidence: [
      {
        title: "Wonderwerk Cave",
        description: "Archaeological evidence of controlled fire.",
        sourceType: "archaeological",
        content: "Microscopic traces of wood ash and burned bone fragments found in South Africa suggest hominins were using fire over 1 million years ago."
      },
      {
        title: "The Cooking Hypothesis",
        description: "Biological reasoning for human evolution.",
        sourceType: "cultural",
        content: "Richard Wrangham argues that cooking allowed our ancestors to develop smaller guts and larger brains by making digestion significantly more efficient."
      }
    ]
  },
  {
    id: "mesopotamia",
    title: "Ancient Mesopotamia",
    period: "4000 BC - 539 BC",
    region: "Fertile Crescent",
    context: "The cradle of agriculture. Development of beer, bread, and irrigation.",
    reasoning: "Predictable flooding of the Tigris and Euphrates allowed for grain surpluses and urban specialization.",
    atmosphere: "dusty-gold-fertile",
    visuals: "https://images.unsplash.com/photo-1622321457198-d748805f778d?auto=format&fit=crop&q=80&w=2000",
    ingredients: ["Barley", "Dates", "Sesame Oil", "Emmer Wheat"],
    tradeRoutes: ["Persian Gulf Trade"],
    evidence: [
      {
        title: "Hymn to Ninkasi",
        description: "The oldest beer recipe in history.",
        sourceType: "textual",
        content: "A 3,800-year-old Sumerian poem that doubles as a technical manual for brewing barley beer."
      },
      {
        title: "Cuneiform Ration Tablets",
        description: "Evidence of state-controlled food logistics.",
        sourceType: "logistics",
        content: "Clay tablets record the daily distribution of bread and beer to workers, showing food as the primary currency of power."
      }
    ]
  },
  {
    id: "ancient-egypt",
    title: "Ancient Egypt",
    period: "3100 BC - 30 BC",
    region: "Nile Valley",
    context: "A civilization built on bread and beer, governed by the annual Nile flood.",
    reasoning: "Centralized state control over grain silos allowed for massive labor projects (Pyramids).",
    atmosphere: "sunny-desert-river",
    visuals: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&q=80&w=2000",
    ingredients: ["Lotus Root", "Honey", "Onions", "Dried Fish"],
    tradeRoutes: ["Levant Trade", "Punt Expeditions"],
    evidence: [
      {
        title: "The Bakeries of Giza",
        description: "Industrial-scale food production.",
        sourceType: "archaeological",
        content: "Archaeologists discovered massive bakery complexes near the pyramids capable of feeding 20,000 workers daily."
      },
      {
        title: "Hieroglyphic Gastronomy",
        description: "Tomb paintings showing food preparation.",
        sourceType: "cultural",
        content: "Paintings in the Tomb of Ti show detailed steps of bird netting, butchery, and bread making, preserving 4,000-year-old techniques."
      }
    ]
  },
  {
    id: "ancient-rome",
    title: "Ancient Rome",
    period: "753 BC - 476 AD",
    region: "Europe / N. Africa",
    context: "The first global food logistics system. Garum and grain ships.",
    reasoning: "Imperial control of Egypt ensured the 'Annona' (free grain dole) for Rome's citizens.",
    atmosphere: "marble-fire-dust",
    visuals: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=2000",
    ingredients: ["Garum", "Pepper", "Spelt", "Grapes"],
    tradeRoutes: ["Via Appia", "Red Sea Trade"],
    evidence: [
      {
        title: "Garum Factories",
        description: "The Roman industrial condiment.",
        sourceType: "logistics",
        content: "Excavations in Pompeii and Spain reveal massive vats used to produce fermented fish sauce, the MSG of the ancient world."
      },
      {
        title: "Monte Testaccio",
        description: "An artificial hill of olive oil amphorae.",
        sourceType: "archaeological",
        content: "A 115-foot high hill in Rome made entirely of 53 million broken pottery shards, tracing the history of 6 billion liters of olive oil."
      }
    ]
  },
  {
    id: "mughal-empire",
    title: "Mughal Empire",
    period: "1526 AD - 1857 AD",
    region: "South Asia",
    context: "Persian-Indian fusion. The birth of royal slow-cooking and rich spices.",
    reasoning: "The 'Mansabdari' system created a wealthy elite who funded lavish court cuisines.",
    atmosphere: "palace-spice-rich",
    visuals: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=2000",
    ingredients: ["Cardamom", "Rose Water", "Ghee", "Almonds"],
    tradeRoutes: ["Grand Trunk Road"],
    evidence: [
      {
        title: "Ain-i-Akbari",
        description: "Detailed imperial records of the royal kitchen.",
        sourceType: "textual",
        content: "Abu'l-Fazl's 16th-century text meticulously records every ingredient, cost, and recipe used in Emperor Akbar's kitchens."
      },
      {
        title: "The Dam-Pukht Technique",
        description: "Persian influence on Indian slow-cooking.",
        sourceType: "cultural",
        content: "The technique of sealing a pot with dough (Dum) was perfected in the Mughal courts to trap aromatics, leading to the modern Biryani."
      }
    ]
  }
];
