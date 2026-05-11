"use client"

import { motion } from "framer-motion"
import { Compass, Clock, Play, ArrowRight, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface NewHeroProps {
  onStartFromTime: () => void
  onExploreCountries: () => void
}

export function NewHero({ onStartFromTime, onExploreCountries }: NewHeroProps) {
  const playButtonSound = () => {
    const audio = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-sci-fi-confirmation-914.mp3")
    audio.volume = 0.4
    audio.play().catch(() => {})
  }

  const handleStartFromTime = () => {
    playButtonSound()
    onStartFromTime()
  }

  const handleExploreCountries = () => {
    playButtonSound()
    onExploreCountries()
  }

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* Background Cinematic Particles (Simplified for Hero) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-deep-space via-black to-black opacity-80" />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-[1px] bg-neon-blue/40" />
            <span className="text-xs md:text-sm font-mono uppercase tracking-[0.5em] text-neon-blue/80">Historical Discovery Engine</span>
            <div className="w-12 h-[1px] bg-neon-blue/40" />
          </div>

          <h1 className="text-6xl md:text-9xl font-black text-frost-white tracking-tighter leading-none mb-6 uppercase">
            BANANA<br/>KITCHEN
          </h1>
          
          <p className="text-xl md:text-2xl text-frost-white/60 font-light tracking-[0.3em] uppercase max-w-2xl mb-16">
            eat through time
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
          <motion.button
            onClick={handleStartFromTime}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="group relative h-64 rounded-3xl overflow-hidden border border-white/10 hover:border-neon-blue/50 transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            
            <div className="relative h-full p-8 flex flex-col items-start justify-between text-left">
               <div className="w-12 h-12 rounded-2xl bg-neon-blue/10 flex items-center justify-center border border-neon-blue/20 group-hover:scale-110 transition-transform">
                  <Clock className="w-6 h-6 text-neon-blue" />
               </div>
               <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Start From Time</h3>
                  <p className="text-sm text-white/50 leading-relaxed">
                    A chronological journey from the first fire to the future of nutrition.
                  </p>
               </div>
               <div className="flex items-center gap-2 text-neon-blue text-xs font-mono uppercase tracking-widest group-hover:gap-4 transition-all">
                  Begin Sequence <ArrowRight className="w-4 h-4" />
               </div>
            </div>
          </motion.button>

          <motion.button
            onClick={handleExploreCountries}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="group relative h-64 rounded-3xl overflow-hidden border border-white/10 hover:border-soft-gold/50 transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-soft-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            
            <div className="relative h-full p-8 flex flex-col items-start justify-between text-left">
               <div className="w-12 h-12 rounded-2xl bg-soft-gold/10 flex items-center justify-center border border-soft-gold/20 group-hover:scale-110 transition-transform">
                  <Compass className="w-6 h-6 text-soft-gold" />
               </div>
               <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Explore Countries</h3>
                  <p className="text-sm text-white/50 leading-relaxed">
                    Search the global map and descend into specific national food histories.
                  </p>
               </div>
               <div className="flex items-center gap-2 text-soft-gold text-xs font-mono uppercase tracking-widest group-hover:gap-4 transition-all">
                  Explore Map <ArrowRight className="w-4 h-4" />
               </div>
            </div>
          </motion.button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
         <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-white">Explore Project</span>
         <motion.div
           animate={{ y: [0, 8, 0] }}
           transition={{ duration: 2, repeat: Infinity }}
         >
            <ChevronDown className="w-4 h-4 text-white" />
         </motion.div>
      </motion.div>
    </section>
  )
}
