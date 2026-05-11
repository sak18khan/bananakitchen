"use client"

import { useState } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface DiscoveryNodeProps {
  title: string
  content: string
  themeColor: "rome" | "viking" | "mughal" | "edo" | "space"
  position?: "top" | "bottom" | "left" | "right"
  className?: string
}

export function DiscoveryNode({ title, content, themeColor, position = "top", className }: DiscoveryNodeProps) {
  const [isOpen, setIsOpen] = useState(false)

  const themeConfig = {
    rome: "bg-soft-gold text-soft-gold border-soft-gold/30 shadow-[0_0_20px_rgba(234,179,8,0.3)]",
    viking: "bg-neon-blue text-neon-blue border-neon-blue/30 shadow-[0_0_20px_rgba(56,189,248,0.3)]",
    mughal: "bg-emerald-500 text-emerald-500 border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.3)]",
    edo: "bg-rose-500 text-rose-500 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.3)]",
    space: "bg-electric-purple text-electric-purple border-electric-purple/30 shadow-[0_0_20px_rgba(168,85,247,0.4)]",
  }

  const tooltipVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: position === "bottom" ? -10 : 10 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
  }

  const tooltipPosition = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-4",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-4",
    left: "right-full top-1/2 -translate-y-1/2 mr-4",
    right: "left-full top-1/2 -translate-y-1/2 ml-4"
  }

  return (
    <div className={cn("relative z-50 inline-block", className)} onMouseLeave={() => setIsOpen(false)}>
      <motion.button
        onMouseEnter={() => setIsOpen(true)}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative flex items-center justify-center w-8 h-8 rounded-full border bg-midnight/80 backdrop-blur-sm cursor-help transition-transform hover:scale-110",
          themeConfig[themeThemeColor(themeColor)]
        )}
        whileHover={{ rotate: 180 }}
        transition={{ duration: 0.5 }}
      >
        <Sparkles className="w-4 h-4" />
        <span className="absolute inset-0 rounded-full animate-ping opacity-20 bg-inherit" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={tooltipVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              "absolute w-64 p-4 rounded-xl border bg-midnight/90 backdrop-blur-xl pointer-events-none",
              tooltipPosition[position],
              themeConfig[themeThemeColor(themeColor)].replace("text-", "border-").split(" ")[2] // use the border color
            )}
          >
            <h4 className={cn("text-sm font-bold uppercase tracking-wider mb-2", themeConfig[themeThemeColor(themeColor)].split(" ")[1])}>
              {title}
            </h4>
            <p className="text-xs text-frost-white/80 leading-relaxed">
              {content}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function themeThemeColor(theme: string) {
    if(theme === "rome" || theme === "viking" || theme === "mughal" || theme === "edo" || theme === "space") {
        return theme;
    }
    return "rome";
}
