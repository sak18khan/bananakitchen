"use client"

import { useRef, ReactNode, useEffect } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { cn } from "@/lib/utils"
import { useScrollState } from "@/providers/ScrollProvider"

interface EraSectionProps {
  id: string
  children: ReactNode
  className?: string
  themeColor: "rome" | "viking" | "mughal" | "edo" | "space" | "origin" | "explorer"
}

export function EraSection({ id, children, className, themeColor }: EraSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { setActiveEra } = useScrollState()
  
  const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" })

  useEffect(() => {
    if (isInView) {
      setActiveEra(themeColor)
    }
  }, [isInView, themeColor, setActiveEra])
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // Determine atmospheric colors based on theme
  const gradients = {
    rome: "from-[#1a1005] via-[#2a1b0a] to-[#0a0502]", // Warm gold/brown
    viking: "from-[#0a1128] via-[#102a43] to-[#02050a]", // Cold icy blue
    mughal: "from-[#021f14] via-[#043d28] to-[#010a06]", // Emerald green
    edo: "from-[#1f1014] via-[#2d151c] to-[#0a0507]", // Soft red/sakura
    space: "from-[#0a0515] via-[#1a052a] to-[#020005]", // Neon purple/cyan
    origin: "from-[#000000] via-[#050505] to-[#000000]",
    explorer: "from-[#05050f] via-[#0a0a1f] to-[#000000]",
  }

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100])

  return (
    <section 
      id={id} 
      ref={ref} 
      className={cn("relative min-h-[150vh] w-full flex flex-col items-center", className)}
    >
      {/* Background interpolation layer */}
      <motion.div 
        className={cn("absolute inset-0 bg-gradient-to-b -z-10", gradients[themeColor])}
        style={{ opacity }}
      />
      
      {/* Content wrapper with sticky or parallax potential */}
      <motion.div 
        className="w-full h-full relative z-10 flex flex-col items-center max-w-7xl px-4 py-32 mx-auto"
        style={{ y }}
      >
        {children}
      </motion.div>
    </section>
  )
}
