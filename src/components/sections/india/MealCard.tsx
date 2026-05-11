"use client"

import { motion } from "framer-motion"
import { Utensils, Info, ShoppingCart, Globe, Clock } from "lucide-react"

interface Meal {
  id: string
  type: string
  name: string
  ingredients: string[]
  cookingMethod: string
  historicalContext: string
  socialStatus: string
  category: string
  why: {
    social: string
    religious: string
    climate: string
    trade: string
    nutrition: string
  }
  visualUrl: string
}

export function MealCard({ meal }: { meal: Meal }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-white/[0.03] border border-white/10 rounded-[2rem] overflow-hidden hover:border-white/20 transition-all duration-700 hover:bg-white/[0.05]"
    >
      <div className="aspect-[16/9] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
        <motion.img 
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -10, 0],
            y: [0, -5, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          src={meal.visualUrl || `https://images.unsplash.com/photo-1514222139-179664228414?auto=format&fit=crop&q=80&w=2000&sig=${meal.id}`}
          alt={meal.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-6 left-6 z-20 flex gap-2">
          <span className="px-4 py-1.5 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-mono text-white/90 uppercase tracking-[0.2em] border border-white/10">
            {meal.type}
          </span>
          <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-mono text-white/60 uppercase tracking-[0.2em] border border-white/5">
            {meal.category}
          </span>
        </div>
      </div>

      <div className="p-10 relative z-20">
        <div className="flex items-start justify-between mb-6">
           <div>
              <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em] block mb-2">{meal.socialStatus} Tradition</span>
              <h3 className="text-4xl font-black text-white tracking-tighter leading-none">
                {meal.name}
              </h3>
           </div>
        </div>

        <div className="space-y-8">
          <div>
             <p className="text-white/60 text-sm leading-relaxed italic border-l-2 border-white/10 pl-6 py-1">
               "{meal.historicalContext}"
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-4">
                <div className="flex items-center gap-3 text-white/30 uppercase tracking-widest text-[9px] font-mono">
                   <Clock className="w-3.5 h-3.5" />
                   <span>Evolutionary Technique</span>
                </div>
                <p className="text-white/70 text-xs leading-relaxed">{meal.cookingMethod}</p>
             </div>
             <div className="space-y-4">
                <div className="flex items-center gap-3 text-white/30 uppercase tracking-widest text-[9px] font-mono">
                   <Utensils className="w-3.5 h-3.5" />
                   <span>Core Ingredients</span>
                </div>
                <div className="flex flex-wrap gap-2">
                   {meal.ingredients.map((ing, i) => (
                     <span key={i} className="text-[9px] text-white/40 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5">
                       {ing}
                     </span>
                   ))}
                </div>
             </div>
          </div>

          {/* THE WHY SYSTEM */}
          <div className="pt-8 border-t border-white/10">
             <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-2 rounded-full bg-white/20" />
                <span className="text-[10px] font-mono uppercase text-white/30 tracking-[0.5em]">Historical Reasoning System</span>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="group/why">
                   <span className="text-[9px] font-mono uppercase text-white/20 tracking-widest block mb-2 group-hover/why:text-white/40 transition-colors">Social Impact</span>
                   <p className="text-[11px] text-white/50 leading-relaxed group-hover/why:text-white/70 transition-colors">{meal.why.social}</p>
                </div>
                <div className="group/why">
                   <span className="text-[9px] font-mono uppercase text-white/20 tracking-widest block mb-2 group-hover/why:text-white/40 transition-colors">Religious Influence</span>
                   <p className="text-[11px] text-white/50 leading-relaxed group-hover/why:text-white/70 transition-colors">{meal.why.religious}</p>
                </div>
                <div className="group/why">
                   <span className="text-[9px] font-mono uppercase text-white/20 tracking-widest block mb-2 group-hover/why:text-white/40 transition-colors">Climate Reasoning</span>
                   <p className="text-[11px] text-white/50 leading-relaxed group-hover/why:text-white/70 transition-colors">{meal.why.climate}</p>
                </div>
                <div className="group/why">
                   <span className="text-[9px] font-mono uppercase text-white/20 tracking-widest block mb-2 group-hover/why:text-white/40 transition-colors">Trade Routes</span>
                   <p className="text-[11px] text-white/50 leading-relaxed group-hover/why:text-white/70 transition-colors">{meal.why.trade}</p>
                </div>
                <div className="group/why">
                   <span className="text-[9px] font-mono uppercase text-white/20 tracking-widest block mb-2 group-hover/why:text-white/40 transition-colors">Nutrition Logic</span>
                   <p className="text-[11px] text-white/50 leading-relaxed group-hover/why:text-white/70 transition-colors">{meal.why.nutrition}</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
