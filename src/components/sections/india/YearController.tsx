"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface Century {
  id: string
  year: string
  title: string
  color: string
}

interface YearControllerProps {
  centuries: Century[]
  activeCenturyId: string
  onSelect: (id: string) => void
}

export function YearController({ centuries, activeCenturyId, onSelect }: YearControllerProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  // Handle horizontal scroll with mouse wheel
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
        e.preventDefault()
        el.scrollLeft += e.deltaY
      }
    }

    el.addEventListener("wheel", handleWheel, { passive: false })
    return () => el.removeEventListener("wheel", handleWheel)
  }, [])

  // Auto-scroll to active century
  useEffect(() => {
    if (isDragging) return
    const activeElement = document.getElementById(`century-${activeCenturyId}`)
    if (activeElement && scrollRef.current) {
      const scrollLeft = activeElement.offsetLeft - scrollRef.current.offsetWidth / 2 + activeElement.offsetWidth / 2
      scrollRef.current.scrollTo({ left: scrollLeft, behavior: "smooth" })
    }
  }, [activeCenturyId, isDragging])

  return (
    <div className="w-full py-12 border-b border-white/10 relative overflow-hidden bg-black/60 backdrop-blur-xl group">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black via-transparent to-black z-10" />
      
      <motion.div 
        ref={scrollRef}
        drag="x"
        dragConstraints={{ left: -2000, right: 2000 }} // Dynamic constraints would be better but this is a start
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => {
           setIsDragging(false)
           // Logic to snap to nearest century could go here
        }}
        className="flex items-center gap-24 px-[50vw] overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing select-none"
        style={{ scrollSnapType: "x proximity" }}
      >
        {centuries.map((century, index) => {
          const isActive = century.id === activeCenturyId
          
          return (
            <motion.div
              key={century.id}
              id={`century-${century.id}`}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center gap-6 cursor-pointer min-w-max transition-opacity duration-500"
              style={{ scrollSnapAlign: "center" }}
              onClick={() => onSelect(century.id)}
            >
              <div className="relative flex items-center justify-center">
                {/* Connector Line */}
                {index < centuries.length - 1 && (
                  <div className="absolute left-1/2 w-48 h-[1px] bg-gradient-to-r from-white/20 via-white/10 to-transparent" />
                )}
                
                <motion.div
                  animate={{
                    scale: isActive ? 1.8 : 1,
                    backgroundColor: isActive ? century.color : "transparent",
                    borderColor: isActive ? century.color : "rgba(255,255,255,0.2)",
                    boxShadow: isActive ? `0 0 30px ${century.color}88` : "none"
                  }}
                  className={cn(
                    "w-5 h-5 rounded-full border-2 transition-all duration-700 relative z-10"
                  )}
                />
              </div>

              <div className="text-center">
                <motion.span
                  animate={{
                    opacity: isActive ? 1 : 0.2,
                    scale: isActive ? 1.4 : 1,
                    color: isActive ? "#fff" : "rgba(255,255,255,0.6)"
                  }}
                  className="text-4xl font-black font-mono tracking-tighter block leading-none mb-2"
                >
                  {century.year}
                </motion.span>
                <motion.span
                  animate={{
                    opacity: isActive ? 0.8 : 0,
                    y: isActive ? 0 : 10
                  }}
                  className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/40 block"
                >
                  {century.title}
                </motion.span>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
      
      {/* Visual Instruction */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
         <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.5em]">Scroll or Drag to Travel</span>
      </div>
    </div>
  )
}
