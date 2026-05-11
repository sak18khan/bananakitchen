"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

interface MapDescentProps {
  isDescending: boolean
  countryName: string
  onComplete?: () => void
}

export function MapDescent({ isDescending, countryName, onComplete }: MapDescentProps) {
  const [showText, setShowText] = useState(false)

  useEffect(() => {
    if (isDescending) {
      const timer = setTimeout(() => setShowText(true), 1500)
      const completeTimer = setTimeout(() => {
        if (onComplete) onComplete()
      }, 4000)
      return () => {
        clearTimeout(timer)
        clearTimeout(completeTimer)
      }
    } else {
      setShowText(false)
    }
  }, [isDescending, onComplete])

  return (
    <AnimatePresence>
      {isDescending && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden pointer-events-none"
        >
          {/* Deep Space Background Pull */}
          <motion.div 
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.1)_0%,transparent_70%)]"
            animate={{ scale: [1, 2], opacity: [0.3, 0.6] }}
            transition={{ duration: 4, ease: "easeIn" }}
          />

          {/* High-speed Cloud/Fog streaks */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-[200vh] bg-gradient-to-b from-transparent via-white/20 to-transparent blur-[2px]"
              initial={{ 
                top: "-100vh", 
                left: `${Math.random() * 100}vw`,
                opacity: 0
              }}
              animate={{ 
                top: "100vh",
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 0.8, 
                repeat: 3,
                ease: "easeIn", 
                delay: Math.random() * 1.5 
              }}
            />
          ))}

          {/* Large Atmospheric Clouds */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`cloud-${i}`}
              className="absolute w-[150vw] h-[150vw] bg-white/5 rounded-full blur-[100px]"
              initial={{ scale: 0.1, opacity: 0, z: -100 }}
              animate={{ scale: 4, opacity: [0, 0.3, 0], z: 100 }}
              transition={{ duration: 2, ease: "easeIn", delay: i * 0.4 }}
            />
          ))}

          {/* Destination Text */}
          <AnimatePresence>
            {showText && (
              <motion.div 
                initial={{ opacity: 0, y: 100, scale: 0.8, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -100, scale: 1.2, filter: "blur(20px)" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-[101] text-center"
              >
                <motion.span 
                  className="text-neon-blue font-mono tracking-[1.5em] uppercase text-[10px] mb-8 block opacity-50"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Temporal Descent Initiated
                </motion.span>
                <h2 className="text-7xl md:text-[12vw] font-black text-frost-white uppercase tracking-tighter leading-none">
                  {countryName}
                </h2>
                <div className="mt-8 flex items-center justify-center gap-4">
                   <div className="w-12 h-[1px] bg-white/20" />
                   <span className="text-white/40 font-mono text-sm uppercase tracking-widest">Century Discovery System</span>
                   <div className="w-12 h-[1px] bg-white/20" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Flash Effect on Finish */}
          <motion.div 
            className="absolute inset-0 bg-white pointer-events-none z-[105]"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0] }}
            transition={{ delay: 3.5, duration: 0.5 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
