"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Shield, Wine, Map, Info } from "lucide-react"
import { cn } from "@/lib/utils"

interface RomanTentSceneProps {
  isOpen: boolean
  onClose: () => void
}

export function RomanTentScene({ isOpen, onClose }: RomanTentSceneProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const [activeObject, setActiveObject] = useState<string | null>(null)

  const objects = {
    armor: {
      title: "Legionary Lorica Segmentata",
      description: "Plate armor that provided excellent protection but required constant oiling to prevent rust. Notice how the firelight catches the hammered iron.",
      icon: Shield,
      style: "top-[40%] left-[20%]"
    },
    wine: {
      title: "Posca Vessel",
      description: "A mixture of sour wine or vinegar and water. It was safer than plain water, provided calories, and prevented scurvy. The military ran on it.",
      icon: Wine,
      style: "top-[60%] right-[30%]"
    },
    map: {
      title: "Campaign Map",
      description: "Logistics won wars. A legion consumed vast amounts of grain, requiring constant supply lines across the Mediterranean.",
      icon: Map,
      style: "bottom-[20%] left-[40%]"
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 overflow-hidden bg-black flex items-center justify-center"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 z-50 w-12 h-12 rounded-full bg-black/50 border border-soft-gold/30 flex items-center justify-center text-soft-gold hover:bg-soft-gold/20 transition-colors backdrop-blur-md"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Layer 1: Distant Background (Dark Tent Canvas) */}
          <div className="absolute inset-0 bg-[#0a0602] opacity-80" />
          <motion.div 
            className="absolute inset-0 opacity-30 mix-blend-multiply"
            style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/black-scales.png')" }}
            animate={{ backgroundPositionX: [0, -20], backgroundPositionY: [0, -10] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />

          {/* Layer 2: Firelight & Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,_rgba(234,179,8,0.15)_0%,_transparent_60%)] pointer-events-none" />
          <motion.div 
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,_rgba(255,100,0,0.1)_0%,_transparent_50%)] mix-blend-overlay pointer-events-none"
            animate={{ opacity: [0.5, 1, 0.6, 0.9, 0.4] }}
            transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Layer 3: Ash Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {mounted && [...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-orange-500/60 rounded-full blur-[1px]"
                initial={{
                  x: `${Math.random() * 100}vw`,
                  y: "110vh",
                  opacity: Math.random(),
                  scale: Math.random() * 2
                }}
                animate={{
                  y: "-10vh",
                  x: `+=${(Math.random() - 0.5) * 100}`,
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 5
                }}
              />
            ))}
          </div>

          {/* Layer 4: Interactive Objects */}
          <div className="absolute inset-0 max-w-5xl mx-auto relative w-full h-full">
            {Object.entries(objects).map(([key, obj]) => {
              const Icon = obj.icon;
              const isActive = activeObject === key;
              return (
                <div key={key} className={cn("absolute", obj.style)}>
                  <motion.button
                    onMouseEnter={() => setActiveObject(key)}
                    onMouseLeave={() => setActiveObject(null)}
                    whileHover={{ scale: 1.1 }}
                    className={cn(
                      "w-16 h-16 rounded-full border flex items-center justify-center transition-all duration-300 backdrop-blur-md z-10",
                      isActive ? "bg-soft-gold/20 border-soft-gold shadow-[0_0_30px_rgba(234,179,8,0.5)]" : "bg-black/40 border-soft-gold/30 text-soft-gold/60"
                    )}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.button>
                  
                  {/* Info Popup */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                        className="absolute top-20 left-1/2 -translate-x-1/2 w-64 bg-black/80 backdrop-blur-xl border border-soft-gold/30 p-4 rounded-xl shadow-2xl z-20"
                      >
                        <h4 className="text-soft-gold font-bold mb-2 uppercase tracking-widest text-sm">{obj.title}</h4>
                        <p className="text-frost-white/70 text-sm leading-relaxed">{obj.description}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>

          {/* Story Context Overlay (Bottom) */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center max-w-2xl px-4 pointer-events-none">
            <h2 className="text-3xl font-bold text-soft-gold tracking-widest mb-4 drop-shadow-md">NIGHT BEFORE THE MARCH</h2>
            <p className="text-frost-white/60 text-lg font-light drop-shadow-sm">
              The fire provides warmth, but it also cooks the puls (barley porridge) that will sustain you tomorrow. Hover over items to explore the legion's logistics.
            </p>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  )
}
