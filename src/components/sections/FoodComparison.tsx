"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AnimatedHeading } from "@/components/ui/AnimatedHeading"

const COMPARISON_DATA = [
  {
    id: "rome-vs-viking",
    title: "Empire vs Wilderness",
    civilizationA: {
      name: "Ancient Rome",
      color: "text-soft-gold border-soft-gold/30 bg-soft-gold/5",
      barColor: "bg-soft-gold",
      diet: "Mediterranean (Grain, Olive Oil, Wine)",
      calories: 3000,
      protein: 70,
      preservation: "Fermentation (Garum), Salting",
      status: "High disparity (Patrician vs Plebeian)"
    },
    civilizationB: {
      name: "Viking Age",
      color: "text-neon-blue border-neon-blue/30 bg-neon-blue/5",
      barColor: "bg-neon-blue",
      diet: "Nordic (Meat, Fish, Dairy, Foraged berries)",
      calories: 4500,
      protein: 150,
      preservation: "Smoking, Wind-drying, Freezing",
      status: "Low disparity (Communal survival)"
    }
  },
  {
    id: "emperor-vs-peasant",
    title: "Mughal: Emperor vs Peasant",
    civilizationA: {
      name: "Mughal Emperor",
      color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/5",
      barColor: "bg-emerald-400",
      diet: "Rich, aromatic, heavily spiced (Biryani, Kebabs)",
      calories: 5000,
      protein: 120,
      preservation: "Fresh daily, Rosewater, Ice from Himalayas",
      status: "Absolute Luxury"
    },
    civilizationB: {
      name: "Mughal Peasant",
      color: "text-orange-400 border-orange-500/30 bg-orange-500/5",
      barColor: "bg-orange-400",
      diet: "Simple, lentil-based (Dal, Roti, Onion)",
      calories: 2200,
      protein: 45,
      preservation: "Sun-drying, Pickling (Achaar)",
      status: "Subsistence"
    }
  }
]

function ComparisonBar({ label, valA, valB, max, colorA, colorB }: { label: string, valA: number, valB: number, max: number, colorA: string, colorB: string }) {
  return (
    <div className="mb-6 w-full">
      <p className="text-xs tracking-widest text-white/50 uppercase mb-3 text-center">{label}</p>
      <div className="flex items-center justify-between gap-4">
        <div className="w-full flex justify-end">
          <motion.div 
            className={`h-2 rounded-l-full ${colorA}`}
            initial={{ width: 0 }}
            animate={{ width: `${(valA / max) * 100}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        <div className="font-mono text-sm min-w-[100px] text-center flex justify-between">
          <span className="text-white/80">{valA}</span>
          <span className="text-white/20">vs</span>
          <span className="text-white/80">{valB}</span>
        </div>
        <div className="w-full flex justify-start">
          <motion.div 
            className={`h-2 rounded-r-full ${colorB}`}
            initial={{ width: 0 }}
            animate={{ width: `${(valB / max) * 100}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  )
}

export function FoodComparison() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeData = COMPARISON_DATA[activeIndex]

  return (
    <section id="comparison" className="relative min-h-[120vh] w-full bg-deep-space flex flex-col items-center py-32 overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-midnight via-deep-space to-black z-0" />
      
      <div className="relative z-10 w-full flex flex-col items-center px-4 max-w-6xl mx-auto">
        <AnimatedHeading text="Cross-Era Analytics" subtitle="Comparing Diet & Culture" className="text-frost-white" />

        {/* Tab Navigation */}
        <div className="flex gap-4 mt-12 mb-16 p-1 bg-white/5 rounded-full border border-white/10 backdrop-blur-md">
          {COMPARISON_DATA.map((data, idx) => (
            <button
              key={data.id}
              onClick={() => setActiveIndex(idx)}
              className={`px-6 py-2 rounded-full text-sm tracking-widest uppercase transition-all duration-300 ${activeIndex === idx ? "bg-white/10 text-white shadow-lg" : "text-white/50 hover:text-white"}`}
            >
              {data.title}
            </button>
          ))}
        </div>

        {/* Comparison Display */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeData.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full flex flex-col lg:flex-row gap-8"
          >
            {/* Civ A Card */}
            <div className={`flex-1 rounded-3xl border p-8 backdrop-blur-md ${activeData.civilizationA.color}`}>
              <h3 className="text-3xl font-bold mb-6 font-serif">{activeData.civilizationA.name}</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs uppercase tracking-widest opacity-60 mb-1">Core Diet</h4>
                  <p className="text-sm">{activeData.civilizationA.diet}</p>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest opacity-60 mb-1">Preservation</h4>
                  <p className="text-sm">{activeData.civilizationA.preservation}</p>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest opacity-60 mb-1">Social Status</h4>
                  <p className="text-sm">{activeData.civilizationA.status}</p>
                </div>
              </div>
            </div>

            {/* Middle Stats */}
            <div className="flex-[1.5] bg-black/40 rounded-3xl border border-white/5 p-8 flex flex-col justify-center backdrop-blur-xl">
              <h4 className="text-center text-sm tracking-widest text-white/40 uppercase mb-12">Nutritional Variance</h4>
              
              <ComparisonBar 
                label="Estimated Daily Calories" 
                valA={activeData.civilizationA.calories} 
                valB={activeData.civilizationB.calories} 
                max={6000}
                colorA={activeData.civilizationA.barColor}
                colorB={activeData.civilizationB.barColor}
              />
              
              <ComparisonBar 
                label="Protein Intake (g/day)" 
                valA={activeData.civilizationA.protein} 
                valB={activeData.civilizationB.protein} 
                max={200}
                colorA={activeData.civilizationA.barColor}
                colorB={activeData.civilizationB.barColor}
              />
            </div>

            {/* Civ B Card */}
            <div className={`flex-1 rounded-3xl border p-8 backdrop-blur-md ${activeData.civilizationB.color}`}>
              <h3 className="text-3xl font-bold mb-6 font-serif text-right">{activeData.civilizationB.name}</h3>
              <div className="space-y-4 text-right">
                <div>
                  <h4 className="text-xs uppercase tracking-widest opacity-60 mb-1">Core Diet</h4>
                  <p className="text-sm">{activeData.civilizationB.diet}</p>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest opacity-60 mb-1">Preservation</h4>
                  <p className="text-sm">{activeData.civilizationB.preservation}</p>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest opacity-60 mb-1">Social Status</h4>
                  <p className="text-sm">{activeData.civilizationB.status}</p>
                </div>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  )
}
