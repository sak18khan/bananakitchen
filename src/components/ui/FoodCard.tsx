"use client"

import { useState, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { ChevronDown, Map, Wind, TrendingUp, Users, Sparkles } from "lucide-react"

export interface LogicChain {
  geography?: string;
  climate?: string;
  trade?: string;
  class?: string;
}

interface FoodCardProps {
  title: string
  description: string
  ingredients: string[]
  socialClass: string
  eraTheme: "rome" | "viking" | "mughal" | "edo" | "space"
  logicChain?: LogicChain
}

export function FoodCard({ title, description, ingredients, socialClass, eraTheme, logicChain }: FoodCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  // Mouse position values for 3D tilt
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth out the tilt
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), { damping: 30, stiffness: 200 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), { damping: 30, stiffness: 200 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || isExpanded) return 
    const rect = ref.current.getBoundingClientRect()
    const clientX = e.clientX - rect.left
    const clientY = e.clientY - rect.top
    mouseX.set(clientX / rect.width - 0.5)
    mouseY.set(clientY / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    mouseX.set(0)
    mouseY.set(0)
  }

  // Theme specific colors
  const themeStyles = {
    rome: { glow: "shadow-[0_0_40px_rgba(234,179,8,0.2)] border-soft-gold/20", icon: "text-soft-gold", textGlow: "text-glow-gold" },
    viking: { glow: "shadow-[0_0_40px_rgba(56,189,248,0.2)] border-neon-blue/20", icon: "text-neon-blue", textGlow: "text-glow" },
    mughal: { glow: "shadow-[0_0_40px_rgba(16,185,129,0.2)] border-emerald-500/20", icon: "text-emerald-500", textGlow: "text-shadow:0_0_20px_rgba(16,185,129,0.4)" },
    edo: { glow: "shadow-[0_0_40px_rgba(244,63,94,0.2)] border-rose-500/20", icon: "text-rose-500", textGlow: "text-shadow:0_0_20px_rgba(244,63,94,0.4)" },
    space: { glow: "shadow-[0_0_40px_rgba(168,85,247,0.3)] border-electric-purple/30", icon: "text-electric-purple", textGlow: "text-shadow:0_0_20px_rgba(168,85,247,0.4)" },
  }

  const currentTheme = themeStyles[eraTheme]

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: isExpanded ? 0 : rotateX, rotateY: isExpanded ? 0 : rotateY, perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => setIsExpanded(!isExpanded)}
      layout
      className={cn(
        "group relative w-full max-w-sm rounded-3xl p-[1px] transition-all duration-500 cursor-pointer overflow-hidden flex flex-col",
        isHovered && currentTheme.glow
      )}
    >
      {/* Animated Border Gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/5 opacity-40"
        animate={isHovered ? { opacity: 1 } : { opacity: 0.4 }}
      />

      <div className="relative z-10 w-full h-full glass-morphism rounded-[23px] p-6 flex flex-col transition-colors duration-500">
        {/* Header */}
        <motion.div layout className="flex justify-between items-start mb-6">
          <h3 className={cn(
            "text-2xl md:text-3xl font-bold tracking-tight text-frost-white transition-all duration-500 leading-tight",
            isHovered && currentTheme.textGlow
          )}>
            {title}
          </h3>
          <div className="flex flex-col items-end gap-1">
            <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-white/30">Class</span>
            <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-md border border-white/10 bg-white/5 text-white/70">
              {socialClass}
            </span>
          </div>
        </motion.div>

        {/* Abstract Visual Placeholder */}
        {!isExpanded && (
          <motion.div 
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: isHovered ? 1.02 : 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-32 rounded-2xl bg-white/5 border border-white/5 mb-6 overflow-hidden relative group-hover:border-white/10 transition-colors"
          >
             <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent" />
             <Sparkles className={cn("absolute top-4 right-4 w-4 h-4 opacity-0 group-hover:opacity-40 transition-opacity", currentTheme.icon)} />
          </motion.div>
        )}

        <motion.p layout className="text-frost-white/60 font-light leading-relaxed mb-6 text-sm md:text-base">
          {description}
        </motion.p>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && logicChain && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mb-8 space-y-6 pt-4 border-t border-white/5"
            >
              <div className="grid grid-cols-1 gap-5">
                {Object.entries(logicChain).map(([key, val]) => {
                  const Icons = { geography: Map, climate: Wind, trade: TrendingUp, class: Users };
                  const Icon = Icons[key as keyof typeof Icons];
                  if (!val) return null;
                  return (
                    <div key={key} className="flex gap-4 group/item">
                      <div className={cn("w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/5 group-hover/item:border-white/10 transition-colors", currentTheme.icon)}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 block mb-1">{key}</span>
                        <p className="text-sm text-frost-white/80 leading-snug">{val}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer/Ingredients */}
        <motion.div layout className="mt-auto pt-4 border-t border-white/10 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[9px] uppercase tracking-[0.4em] text-frost-white/40">Composition</span>
            <ChevronDown className={cn("w-4 h-4 text-white/20 transition-transform duration-500", isExpanded ? "rotate-180" : "")} />
          </div>
          <div className="flex flex-wrap gap-2">
            {ingredients.map((ing, i) => (
              <span key={i} className="text-[10px] font-medium bg-white/5 px-3 py-1.5 rounded-full text-frost-white/60 border border-white/5 hover:border-white/20 transition-colors">
                {ing}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
