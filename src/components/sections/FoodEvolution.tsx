"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AnimatedHeading } from "@/components/ui/AnimatedHeading"
import { MapPin, ArrowRight } from "lucide-react"

const INGREDIENTS = [
  {
    id: "pepper",
    name: "Black Pepper",
    journey: [
      { location: "Kerala, India", era: "Ancient", description: "The 'Black Gold' of the Malabar Coast. Highly sought after by Phoenicians and Romans." },
      { location: "Persia", era: "Trade Expansion", description: "A luxury staple in the Sasanian courts, marking the rise of the spice routes." },
      { location: "Rome", era: "Empire Demand", description: "So valuable it was used as currency. Pliny the Elder complained about the drain of gold to India for pepper." },
      { location: "Europe", era: "Medieval Feasts", description: "The catalyst for the Age of Discovery. Columbus sailed west looking for a shortcut to these peppercorns." }
    ],
    color: "rgba(255, 255, 255, 0.1)"
  },
  {
    id: "tea",
    name: "Tea",
    journey: [
      { location: "Southwest China", era: "Origins", description: "First used as a medicinal beverage and chewed for energy by ethnic groups in Yunnan." },
      { location: "Japan", era: "Nara Period", description: "Brought by Buddhist monks, eventually evolving into the Zen-inspired tea ceremony." },
      { location: "Britain", era: "Colonial Era", description: "Became the fuel for the industrial revolution and a tool of imperial economic power." }
    ],
    color: "rgba(34, 197, 94, 0.1)"
  },
  {
    id: "chocolate",
    name: "Cacao",
    journey: [
      { location: "Mesoamerica", era: "Olmee / Maya", description: "The 'Food of the Gods'. Consumed as a bitter, spicy drink flavored with chili and vanilla." },
      { location: "Spain", era: "Conquest", description: "Introduced to Europe by Hernán Cortés. Sugar was added to suit European palates." },
      { location: "Switzerland", era: "Industrial", description: "The invention of milk chocolate transformed a luxury beverage into a global snack." }
    ]
  }
]

export function FoodEvolution() {
  const [activeId, setActiveId] = useState(INGREDIENTS[0].id)
  const current = INGREDIENTS.find(i => i.id === activeId)!

  return (
    <section className="relative min-h-screen w-full bg-black py-32 overflow-hidden flex flex-col items-center">
      <div className="relative z-10 text-center mb-24">
        <AnimatedHeading text="The Ingredient Journey" subtitle="Tracing the migration of global flavors" />
      </div>

      <div className="relative z-10 max-w-6xl w-full px-4 grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Selection Sidebar */}
        <div className="flex flex-col gap-4">
           {INGREDIENTS.map((ing) => (
             <button
               key={ing.id}
               onClick={() => setActiveId(ing.id)}
               className={`p-6 text-left border rounded-xl transition-all ${
                 activeId === ing.id 
                 ? "bg-white/10 border-neon-blue shadow-[0_0_20px_rgba(56,189,248,0.2)]" 
                 : "bg-white/5 border-white/10 hover:border-white/30"
               }`}
             >
               <h4 className="text-xl font-bold text-white mb-1">{ing.name}</h4>
               <span className="text-xs text-white/40 uppercase tracking-widest">View Migration</span>
             </button>
           ))}
        </div>

        {/* Migration Timeline */}
        <div className="lg:col-span-3">
           <AnimatePresence mode="wait">
              <motion.div 
                key={activeId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-12"
              >
                {current.journey.map((step, i) => (
                  <div key={i} className="relative pl-12 group">
                     {/* Connector */}
                     {i < current.journey.length - 1 && (
                       <div className="absolute left-6 top-8 bottom-[-32px] w-[2px] bg-gradient-to-b from-neon-blue/40 to-transparent" />
                     )}
                     
                     <div className="absolute left-3 top-2 w-6 h-6 rounded-full border-2 border-neon-blue bg-black flex items-center justify-center group-hover:scale-125 transition-transform">
                        <div className="w-2 h-2 bg-neon-blue rounded-full" />
                     </div>

                     <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                           <div>
                              <p className="text-neon-blue font-mono text-xs uppercase tracking-widest mb-1">{step.era}</p>
                              <h5 className="text-2xl font-bold text-white flex items-center gap-2">
                                 <MapPin className="w-5 h-5 text-neon-blue/60" />
                                 {step.location}
                              </h5>
                           </div>
                           {i < current.journey.length - 1 && (
                             <div className="hidden md:flex items-center gap-2 text-white/20">
                                <span className="text-[10px] uppercase tracking-widest">Migration Path</span>
                                <ArrowRight className="w-4 h-4" />
                             </div>
                           )}
                        </div>
                        <p className="text-lg text-white/60 font-light leading-relaxed">
                           {step.description}
                        </p>
                     </div>
                  </div>
                ))}
              </motion.div>
           </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
