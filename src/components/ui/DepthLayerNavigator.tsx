"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export type DepthLayer = "common" | "elite" | "military" | "religion" | "trade"

interface DepthLayerNavigatorProps {
  activeLayer: DepthLayer
  onChange: (layer: DepthLayer) => void
  eraTheme: "rome" | "viking" | "mughal" | "edo" | "space"
}

const LAYERS: { id: DepthLayer; label: string }[] = [
  { id: "common", label: "Common Folk" },
  { id: "elite", label: "The Elite" },
  { id: "military", label: "Military" },
  { id: "religion", label: "Religion & Ritual" },
  { id: "trade", label: "Trade Routes" }
]

export function DepthLayerNavigator({ activeLayer, onChange, eraTheme }: DepthLayerNavigatorProps) {
  
  const themeColors = {
    rome: "bg-soft-gold text-midnight",
    viking: "bg-neon-blue text-midnight",
    mughal: "bg-emerald-500 text-midnight",
    edo: "bg-rose-500 text-white",
    space: "bg-electric-purple text-white"
  }

  return (
    <div className="flex flex-wrap gap-2 md:gap-4 justify-center items-center p-2 rounded-2xl bg-midnight/50 backdrop-blur-md border border-white/10 w-fit mx-auto mb-12 relative z-20">
      {LAYERS.map((layer) => {
        const isActive = activeLayer === layer.id
        return (
          <button
            key={layer.id}
            onClick={() => onChange(layer.id)}
            className={cn(
              "relative px-4 py-2 rounded-xl text-sm md:text-base font-mono uppercase tracking-wider transition-colors",
              isActive ? "text-midnight font-bold" : "text-frost-white/50 hover:text-frost-white/80"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="activeLayerIndicator"
                className={cn("absolute inset-0 rounded-xl -z-10 shadow-lg", themeColors[eraTheme])}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            {layer.label}
          </button>
        )
      })}
    </div>
  )
}
