"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface Region {
  id: string
  name: string
}

interface RegionSelectorProps {
  regions: Region[]
  activeRegionId: string
  onSelect: (id: string) => void
}

export function RegionSelector({ regions, activeRegionId, onSelect }: RegionSelectorProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 my-8">
      {regions.map((region) => {
        const isActive = region.id === activeRegionId
        
        return (
          <button
            key={region.id}
            onClick={() => onSelect(region.id)}
            className={cn(
              "px-6 py-2 rounded-full border text-xs font-mono uppercase tracking-[0.2em] transition-all duration-300",
              isActive 
                ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]" 
                : "bg-white/5 text-white/40 border-white/10 hover:border-white/30 hover:text-white"
            )}
          >
            {region.name}
          </button>
        )
      })}
    </div>
  )
}
