"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion"
import { cn } from "@/lib/utils"
import { useScrollState } from "@/providers/ScrollProvider"

export function OriginStory() {
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { setActiveEra } = useScrollState()
  const isInView = useInView(containerRef, { margin: "-40% 0px -40% 0px" })

  useEffect(() => {
    setMounted(true)
    if (isInView) {
      setActiveEra("origin")
    }
  }, [isInView, setActiveEra])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Scene 1: Darkness (0 - 0.25)
  const scene1Opacity = useTransform(scrollYProgress, [0, 0.2, 0.25], [1, 1, 0])
  const text1Opacity = useTransform(scrollYProgress, [0, 0.05, 0.15, 0.2], [0, 1, 1, 0])
  const hungerTextOpacity = useTransform(scrollYProgress, [0.15, 0.2, 0.25], [0, 1, 0])

  // Scene 2: The First Fire (0.25 - 0.6)
  const fireOpacity = useTransform(scrollYProgress, [0.25, 0.3, 0.5, 0.6], [0, 1, 1, 0])
  const fireScale = useTransform(scrollYProgress, [0.25, 0.45], [0.05, 2])
  const fireGlow = useTransform(scrollYProgress, [0.25, 0.45], [0, 100])
  const text2Opacity = useTransform(scrollYProgress, [0.35, 0.45, 0.55], [0, 1, 0])

  // Scene 3: Early Humanity (0.6 - 1.0)
  const humanityOpacity = useTransform(scrollYProgress, [0.6, 0.7, 0.9, 1.0], [0, 1, 1, 0])
  const text3Opacity = useTransform(scrollYProgress, [0.7, 0.8, 0.95], [0, 1, 0])

  return (
    <div ref={containerRef} className="relative h-[600vh] w-full bg-black">
      {/* Scene 1: Darkness */}
      <motion.div 
        style={{ opacity: scene1Opacity }}
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-black" />
        
        {/* Subtle Grain Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay" />
        
        {/* Floating Particles */}
        {mounted && [...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/10 rounded-full blur-[1px]"
            initial={{ x: `${Math.random() * 100}vw`, y: `${Math.random() * 100}vh` }}
            animate={{ 
              y: ["-10vh", "110vh"],
              x: `+=${(Math.random() - 0.5) * 100}px`
            }}
            transition={{ duration: Math.random() * 20 + 20, repeat: Infinity, ease: "linear" }}
          />
        ))}
        
        <div className="relative z-10 text-center flex flex-col items-center">
           <motion.div style={{ opacity: text1Opacity }} className="space-y-6">
              <h2 className="text-3xl md:text-5xl font-extralight text-frost-white/60 tracking-[0.2em] uppercase italic">Before kingdoms...</h2>
              <h2 className="text-3xl md:text-5xl font-extralight text-frost-white/60 tracking-[0.2em] uppercase italic">Before empires...</h2>
              <h2 className="text-3xl md:text-5xl font-extralight text-frost-white/60 tracking-[0.2em] uppercase italic">Before history...</h2>
           </motion.div>
           
           <motion.div 
             style={{ opacity: hungerTextOpacity }}
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
           >
              <h2 className="text-6xl md:text-9xl font-bold text-frost-white tracking-widest uppercase">There was hunger.</h2>
           </motion.div>
        </div>
      </motion.div>

      {/* Scene 2: The First Fire */}
      <motion.div 
        style={{ opacity: fireOpacity }}
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
      >
        {/* Animated Firelight Background */}
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(234,179,8,0.2)_0%,_transparent_70%)]"
          animate={{ opacity: [0.3, 0.6, 0.4, 0.7] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div 
          style={{ 
            scale: fireScale,
            boxShadow: `0 0 ${fireGlow}px rgba(255, 100, 0, 0.6)`,
            background: "radial-gradient(circle, rgba(255, 120, 0, 0.9) 0%, rgba(234, 179, 8, 0.4) 50%, transparent 100%)"
          }}
          className="w-48 h-48 rounded-full blur-[20px]"
        />
        
        <motion.div 
          style={{ opacity: text2Opacity }} 
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
        >
          <p className="text-soft-gold font-mono tracking-[0.8em] uppercase text-xs mb-6">Discovery I</p>
          <h2 className="text-5xl md:text-9xl font-black text-soft-gold drop-shadow-[0_0_50px_rgba(234,179,8,0.5)] tracking-tighter">FIRE CHANGED EVERYTHING.</h2>
        </motion.div>

        {/* Sparks */}
        {mounted && [...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-orange-500 rounded-full"
            initial={{ x: "50vw", y: "55vh" }}
            animate={{ 
              x: `${Math.random() * 100}vw`,
              y: `${Math.random() * -100}vh`,
              opacity: [1, 0],
              scale: [1, 0]
            }}
            transition={{ duration: Math.random() * 2 + 1, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
      </motion.div>

      {/* Scene 3: Early Humanity */}
      <motion.div 
        style={{ opacity: humanityOpacity }}
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-950/10 to-black" />
        
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] mix-blend-overlay" />
        
        <motion.div style={{ opacity: text3Opacity }} className="relative z-10 text-center max-w-3xl px-8 flex flex-col items-center">
          <div className="w-12 h-1 bg-soft-gold mb-12" />
          <h2 className="text-4xl md:text-7xl font-bold text-frost-white mb-8 uppercase tracking-widest tracking-tight">The First Shared Meals</h2>
          <p className="text-xl md:text-3xl text-frost-white/70 leading-relaxed font-light italic">
            "In the shadows of caves, cooking was our first collective ritual. It transformed survival into community, and fire into family."
          </p>
          <div className="w-12 h-1 bg-soft-gold mt-12" />
        </motion.div>
      </motion.div>
    </div>
  )
}
