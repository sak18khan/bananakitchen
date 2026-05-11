"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AnimatedHeading } from "@/components/ui/AnimatedHeading"
import { ChevronRight, ChevronLeft, Clock, Building2, Shirt, Utensils } from "lucide-react"
import { INDIA_CENTURIES } from "@/lib/data/countries"
import { cn } from "@/lib/utils"

export function CenturyEvolution() {
  const [index, setIndex] = useState(0)
  const current = INDIA_CENTURIES[index]

  return (
    <section id="century-evolution" className="relative min-h-screen w-full bg-black py-32 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Evolution Visual */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={current.year}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.3, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 z-0"
        >
           <img 
             src={current.visuals} 
             alt={current.title} 
             className="w-full h-full object-cover filter grayscale opacity-50"
           />
           <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl w-full px-4">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-4 text-neon-blue font-mono mb-4">
             <Clock className="w-5 h-5" />
             <span className="tracking-[0.5em] uppercase">National Lineage Explorer</span>
          </div>
          <AnimatedHeading text="India Through Time" subtitle="A lineage of taste and technology" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Content Card */}
          <div className="relative space-y-12">
             <AnimatePresence mode="wait">
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-8"
                >
                  <div className="inline-block px-6 py-2 bg-white/5 border border-white/10 rounded-full">
                     <span className="text-neon-blue font-mono text-xl tracking-widest">{current.year}</span>
                  </div>
                  
                  <h3 className="text-6xl md:text-8xl font-black text-frost-white tracking-tighter leading-none">
                    {current.title}
                  </h3>
                  
                  <p className="text-xl md:text-2xl text-frost-white/60 leading-relaxed font-light">
                    {current.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/10">
                     <div className="space-y-2">
                        <p className="text-neon-blue font-mono text-[10px] uppercase tracking-[0.3em] mb-2 opacity-60">Primary Technology</p>
                        <p className="text-frost-white text-xl font-bold">{current.tech}</p>
                     </div>
                     <div className="space-y-2">
                        <p className="text-neon-blue font-mono text-[10px] uppercase tracking-[0.3em] mb-2 opacity-60">Cultural Influence</p>
                        <p className="text-frost-white text-xl font-bold">{current.influence}</p>
                     </div>
                  </div>
                </motion.div>
             </AnimatePresence>

             {/* Navigation */}
             <div className="flex gap-4">
                <button 
                  onClick={() => setIndex(i => Math.max(0, i - 1))}
                  disabled={index === 0}
                  className="w-14 h-14 rounded-full border border-white/10 hover:bg-white/5 transition-all disabled:opacity-20 flex items-center justify-center"
                >
                  <ChevronLeft className="text-white w-6 h-6" />
                </button>
                <button 
                  onClick={() => setIndex(i => Math.min(INDIA_CENTURIES.length - 1, i + 1))}
                  disabled={index === INDIA_CENTURIES.length - 1}
                  className="w-14 h-14 rounded-full border border-white/10 hover:bg-white/5 transition-all disabled:opacity-20 flex items-center justify-center"
                >
                  <ChevronRight className="text-white w-6 h-6" />
                </button>
             </div>
          </div>

          {/* Evolution Details */}
          <div className="grid grid-cols-1 gap-6 relative z-10">
             <AnimatePresence mode="wait">
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6"
                >
                   <EvolutionCard 
                     icon={Building2} 
                     title="Architecture" 
                     content={current.evolution.architecture} 
                   />
                   <EvolutionCard 
                     icon={Shirt} 
                     title="Aesthetics & Clothing" 
                     content={current.evolution.clothing} 
                   />
                   <EvolutionCard 
                     icon={Utensils} 
                     title="Culinary Evolution" 
                     content={current.evolution.cooking} 
                   />
                </motion.div>
             </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

function EvolutionCard({ icon: Icon, title, content }: { icon: any, title: string, content: string }) {
  return (
    <div className="glass-morphism p-8 rounded-3xl border border-white/5 hover:border-white/20 transition-all group">
       <div className="flex items-center gap-4 mb-4">
          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-neon-blue group-hover:scale-110 transition-transform">
             <Icon className="w-5 h-5" />
          </div>
          <span className="text-xs font-mono uppercase tracking-[0.4em] text-white/40">{title}</span>
       </div>
       <p className="text-frost-white/80 leading-relaxed font-light">
          {content}
       </p>
    </div>
  )
}
