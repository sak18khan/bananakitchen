"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

interface WorldEnvironmentProps {
  centuryId: string
  regionId: string
  visuals: any
  weather: string
}

export function WorldEnvironment({ centuryId, regionId, visuals, weather }: WorldEnvironmentProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[140] overflow-hidden">
      {/* Dynamic Background Fog & Lighting */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${centuryId}-${regionId}-lighting`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
          style={{ 
            background: `radial-gradient(circle at center, ${visuals.color || '#fff'}22 0%, transparent 80%)` 
          }}
        />
      </AnimatePresence>

      {/* Atmospheric Particles */}
      <div className="absolute inset-0 z-10">
        {visuals.particles === "smoke" && (
          <div className="absolute inset-0 opacity-20">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={`smoke-${i}`}
                className="absolute w-64 h-64 bg-white/5 rounded-full blur-[60px]"
                animate={{ 
                  x: [Math.random() * 100 + "vw", Math.random() * 100 + "vw"],
                  y: [Math.random() * 100 + "vh", Math.random() * 100 + "vh"],
                  scale: [1, 2, 1],
                  opacity: [0, 0.3, 0]
                }}
                transition={{ 
                  duration: 10 + Math.random() * 10, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              />
            ))}
          </div>
        )}

        {visuals.particles === "incense" && (
          <div className="absolute inset-0 opacity-30">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={`incense-${i}`}
                className="absolute w-1 h-20 bg-gradient-to-t from-gold-500/20 to-transparent blur-[2px]"
                animate={{ 
                  y: [100 + "vh", -10 + "vh"],
                  x: (Math.random() * 100) + "vw",
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 5 + Math.random() * 5, 
                  repeat: Infinity, 
                  ease: "linear",
                  delay: Math.random() * 5
                }}
              />
            ))}
          </div>
        )}

        {visuals.particles === "data-stream" && (
           <div className="absolute inset-0 opacity-10">
             {[...Array(30)].map((_, i) => (
               <motion.div
                 key={`data-${i}`}
                 className="absolute w-[1px] h-32 bg-emerald-400"
                 animate={{ 
                   y: [-10 + "vh", 110 + "vh"],
                   x: (Math.random() * 100) + "vw",
                   opacity: [0, 1, 0]
                 }}
                 transition={{ 
                   duration: 2 + Math.random() * 3, 
                   repeat: Infinity, 
                   ease: "linear",
                   delay: Math.random() * 2
                 }}
               />
             ))}
           </div>
        )}
      </div>

      {/* Weather Overlays */}
      <AnimatePresence>
        {weather === "rain" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 pointer-events-none"
          >
             {[...Array(50)].map((_, i) => (
               <motion.div
                 key={`rain-${i}`}
                 className="absolute w-[1px] h-12 bg-white/20"
                 animate={{ 
                   y: ["-10vh", "110vh"],
                   x: (Math.random() * 100) + "vw"
                 }}
                 transition={{ 
                   duration: 0.5 + Math.random() * 0.3, 
                   repeat: Infinity, 
                   ease: "linear",
                   delay: Math.random()
                 }}
               />
             ))}
          </motion.div>
        )}

        {weather === "snow" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 pointer-events-none"
          >
             {[...Array(50)].map((_, i) => (
               <motion.div
                 key={`snow-${i}`}
                 className="absolute w-1 h-1 bg-white/40 rounded-full"
                 animate={{ 
                   y: ["-10vh", "110vh"],
                   x: [Math.random() * 100 + "vw", (Math.random() * 100 + 5) + "vw"]
                 }}
                 transition={{ 
                   duration: 3 + Math.random() * 5, 
                   repeat: Infinity, 
                   ease: "linear",
                   delay: Math.random() * 5
                 }}
               />
             ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Vignette & Noise */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.8)_150%)]" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.03] mix-blend-overlay" />
    </div>
  )
}
