"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CIVILIZATIONS } from "@/lib/data/civilizations"
import { cn } from "@/lib/utils"
import { ChevronRight, ChevronLeft, MapPin, Calendar, Info, X } from "lucide-react"
import { ChapterExplorer } from "./ChapterExplorer"

export function ChronologicalTimeline({ onBack }: { onBack: () => void }) {
  const [index, setIndex] = useState(0)
  const [showExplorer, setShowExplorer] = useState(false)
  const current = CIVILIZATIONS[index]

  return (
    <section className="fixed inset-0 z-[120] bg-black flex flex-col overflow-hidden">
      {/* Background Visual Layer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.4, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={current.visuals} 
            alt={current.title} 
            className="w-full h-full object-cover filter brightness-[0.4] contrast-[1.2]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Header / Nav */}
      <div className="relative z-20 p-8 flex justify-between items-center">
        <button 
          onClick={onBack}
          className="group flex items-center gap-3 text-white/40 hover:text-white transition-colors"
        >
           <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
           <span className="text-xs font-mono uppercase tracking-[0.3em]">Exit Sequence</span>
        </button>

        <div className="flex items-center gap-6">
           <div className="flex flex-col items-end">
              <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Temporal Coordinate</span>
              <span className="text-sm text-neon-blue font-mono">{current.period}</span>
           </div>
           <div className="w-[1px] h-8 bg-white/10" />
           <div className="flex flex-col items-end">
              <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Region</span>
              <span className="text-sm text-white font-mono">{current.region}</span>
           </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            <motion.h2 
              className="text-7xl md:text-9xl font-black text-white tracking-tighter mb-8"
            >
              {current.title}
            </motion.h2>
            
            <p className="text-xl md:text-2xl text-white/60 font-light leading-relaxed mb-12 max-w-2xl mx-auto">
              {current.context}
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {current.ingredients.map((ing, i) => (
                <span key={i} className="px-4 py-2 rounded-full glass-morphism border border-white/10 text-sm text-white/80">
                  {ing}
                </span>
              ))}
            </div>

            <button 
              onClick={() => setShowExplorer(true)}
              className="group relative px-8 py-4 rounded-full border border-neon-blue/30 text-neon-blue text-xs font-mono uppercase tracking-widest hover:bg-neon-blue/10 transition-all overflow-hidden"
            >
              <span className="relative z-10">Explore Evidence</span>
              <motion.div className="absolute inset-0 bg-neon-blue/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Footer */}
      <div className="relative z-20 p-8 flex justify-between items-end">
        <div className="flex gap-4">
          <button 
            disabled={index === 0}
            onClick={() => setIndex(i => i - 1)}
            className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all disabled:opacity-20"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button 
            disabled={index === CIVILIZATIONS.length - 1}
            onClick={() => setIndex(i => i + 1)}
            className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all disabled:opacity-20"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="flex items-center gap-8">
           {CIVILIZATIONS.map((_, i) => (
             <button 
               key={i}
               onClick={() => setIndex(i)}
               className={cn(
                 "w-2 h-2 rounded-full transition-all duration-500",
                 i === index ? "bg-neon-blue scale-150 shadow-[0_0_10px_#38bdf8]" : "bg-white/10 hover:bg-white/30"
               )}
             />
           ))}
        </div>
      </div>

      {/* Detailed Chapter Explorer Overlay */}
      <AnimatePresence>
        {showExplorer && (
          <ChapterExplorer civilization={current} onBack={() => setShowExplorer(false)} />
        )}
      </AnimatePresence>
    </section>
  )
}
