"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface StoryCardProps {
  role: string
  year: string
  location: string
  description: string
  mealBreakdown: string
  socialCustoms: string
  environment: string
  themeColor: "rome" | "viking" | "mughal" | "edo" | "space"
}

export function StoryCard({ role, year, location, description, mealBreakdown, socialCustoms, environment, themeColor }: StoryCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  const themeConfig = {
    rome: "border-soft-gold/30 text-soft-gold hover:shadow-[0_0_30px_rgba(234,179,8,0.2)]",
    viking: "border-neon-blue/30 text-neon-blue hover:shadow-[0_0_30px_rgba(56,189,248,0.2)]",
    mughal: "border-emerald-500/30 text-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]",
    edo: "border-rose-400/30 text-rose-300 hover:shadow-[0_0_30px_rgba(244,63,94,0.2)]",
    space: "border-electric-purple/40 text-electric-purple hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]",
  }

  const bgConfig = {
    rome: "bg-soft-gold/5",
    viking: "bg-neon-blue/5",
    mughal: "bg-emerald-500/5",
    edo: "bg-rose-500/5",
    space: "bg-electric-purple/5",
  }

  return (
    <motion.div 
      layout
      onClick={() => setIsOpen(!isOpen)}
      className={`relative w-full max-w-2xl mx-auto cursor-pointer rounded-2xl border backdrop-blur-md overflow-hidden transition-all duration-300 ${themeConfig[themeColor]} ${bgConfig[themeColor]}`}
    >
      <motion.div layout className="p-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-bold mb-1 font-serif">You are a {role}.</h3>
            <p className="text-sm tracking-widest uppercase opacity-80">{location} • {year}</p>
          </div>
          <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
            <span className="text-xl leading-none mb-1">+</span>
          </div>
        </div>

        <p className="text-frost-white/80 font-light leading-relaxed">
          {description}
        </p>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="mt-6 pt-6 border-t border-current/20 space-y-6"
            >
              <div>
                <h4 className="text-xs uppercase tracking-widest opacity-60 mb-2">Meal Breakdown</h4>
                <p className="text-frost-white/90 text-sm leading-relaxed">{mealBreakdown}</p>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest opacity-60 mb-2">Social Customs</h4>
                <p className="text-frost-white/90 text-sm leading-relaxed">{socialCustoms}</p>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest opacity-60 mb-2">Dining Environment</h4>
                <p className="text-frost-white/90 text-sm leading-relaxed">{environment}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
