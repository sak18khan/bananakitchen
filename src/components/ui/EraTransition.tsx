"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface EraTransitionProps {
  from: string
  to: string
  className?: string
}

export function EraTransition({ from, to, className }: EraTransitionProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // Morphing effects
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1.1])
  const warpTranslate = useTransform(scrollYProgress, [0, 1], ["-100%", "100%"])

  return (
    <section 
      ref={ref} 
      className={cn("relative h-[80vh] w-full flex items-center justify-center overflow-hidden bg-black", className)}
    >
      {/* Radial Warp Streaks */}
      <motion.div 
        style={{ opacity, scale }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
         {[...Array(6)].map((_, i) => (
           <motion.div
             key={i}
             className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.05)_0%,transparent_70%)]"
             animate={{ 
               scale: [1, 1.5, 1],
               opacity: [0.1, 0.3, 0.1],
               rotate: [0, 90, 180] 
             }}
             transition={{ 
               duration: 10 + i * 2, 
               repeat: Infinity, 
               ease: "linear",
               delay: i * 1
             }}
           />
         ))}
      </motion.div>

      <motion.div 
        style={{ opacity }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="flex items-center gap-12 md:gap-24">
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-mono text-white/20 tracking-[0.4em] uppercase mb-4">Relinquishing</span>
            <span className="text-xl md:text-3xl font-black text-white/30 uppercase tracking-tighter filter blur-[1px]">{from}</span>
          </div>
          
          <div className="relative w-32 h-[1px] flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <motion.div 
              className="w-1.5 h-1.5 bg-neon-blue rounded-full shadow-[0_0_15px_#38bdf8]"
              animate={{ x: [-60, 60] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="flex flex-col items-center">
            <span className="text-[10px] font-mono text-neon-blue/40 tracking-[0.4em] uppercase mb-4">Approaching</span>
            <span className="text-xl md:text-3xl font-black text-white/80 uppercase tracking-tighter text-glow">{to}</span>
          </div>
        </div>
        
        <div className="mt-16 flex flex-col items-center gap-4">
           <motion.div 
             className="text-[9px] font-mono text-white/30 tracking-[0.8em] uppercase"
             animate={{ opacity: [0.2, 0.6, 0.2] }}
             transition={{ duration: 2, repeat: Infinity }}
           >
             Temporal Synchronization in Progress
           </motion.div>
           <div className="w-48 h-[2px] bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-neon-blue/40"
                style={{ x: warpTranslate }}
              />
           </div>
        </div>
      </motion.div>

      {/* Atmospheric transition background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />
    </section>
  )
}
