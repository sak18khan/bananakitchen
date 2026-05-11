"use client"

import { motion } from "framer-motion"
import { useScrollState } from "@/providers/ScrollProvider"
import { useEffect, useState } from "react"

export function AtmosphereController() {
  const { activeEra } = useScrollState()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Define atmospheric settings for each era
  const atmosphereConfig = {
    hero: { color: "rgba(10, 5, 20, 0)", fog: 0, noise: 0.05, vignette: 0.5 },
    origin: { color: "rgba(0, 0, 0, 1)", fog: 0.5, noise: 0.3, vignette: 0.9 },
    explorer: { color: "rgba(5, 5, 15, 0.2)", fog: 0.1, noise: 0.05, vignette: 0.6 },
    rome: { color: "rgba(42, 27, 10, 0.4)", fog: 0.2, noise: 0.15, vignette: 0.8 },
    viking: { color: "rgba(10, 17, 40, 0.5)", fog: 0.4, noise: 0.2, vignette: 0.9 },
    mughal: { color: "rgba(2, 31, 20, 0.3)", fog: 0.1, noise: 0.08, vignette: 0.7 },
    edo: { color: "rgba(45, 21, 28, 0.3)", fog: 0.1, noise: 0.1, vignette: 0.7 },
    space: { color: "rgba(10, 5, 42, 0.6)", fog: 0.3, noise: 0.25, vignette: 0.9 },
    unknown: { color: "rgba(0, 0, 0, 0)", fog: 0, noise: 0.05, vignette: 0.5 }
  }

  const currentConfig = atmosphereConfig[activeEra as keyof typeof atmosphereConfig] || atmosphereConfig.unknown

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden mix-blend-screen pointer-events-none">
      {/* Dynamic Background Fog Tint */}
      <motion.div 
        className="absolute inset-0 transition-colors duration-1000 ease-in-out opacity-20"
        style={{ backgroundColor: currentConfig.color }}
      />
      
      {/* Global Vignette (Cinema Feel) */}
      <motion.div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,1)_150%)]" 
        animate={{ opacity: currentConfig.vignette }}
        transition={{ duration: 2 }}
      />

      {/* Scratches/Film Damage Simulation */}
      <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay">
        <motion.div 
           className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')]"
           animate={{ 
             x: [0, 5, -5, 0], 
             y: [0, -5, 5, 0] 
           }}
           transition={{ duration: 0.1, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Depth Fog */}
      <motion.div 
        className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent"
        animate={{ opacity: currentConfig.fog }}
      />
    </div>
  )
}
