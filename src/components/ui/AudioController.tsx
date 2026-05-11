"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Volume2, VolumeX, Wind } from "lucide-react"
import { useScrollState } from "@/providers/ScrollProvider"

// Sound effects only - focusing on environmental ambience
const ERA_SOUNDS: Record<string, string> = {
  origin: "https://assets.mixkit.co/sfx/preview/mixkit-cracking-fire-153.mp3", // Fire crackling
  hero: "https://assets.mixkit.co/sfx/preview/mixkit-wind-loop-1166.mp3", // Cosmic wind
  rome: "https://assets.mixkit.co/sfx/preview/mixkit-cracking-fire-153.mp3", // Campfire
  viking: "https://assets.mixkit.co/sfx/preview/mixkit-cold-wind-loop-1166.mp3", // Arctic wind
  mughal: "https://assets.mixkit.co/sfx/preview/mixkit-forest-birds-ambience-1210.mp3", // Garden birds
  edo: "https://assets.mixkit.co/sfx/preview/mixkit-gentle-rain-loop-1250.mp3", // Gentle rain
  space: "https://assets.mixkit.co/sfx/preview/mixkit-deep-space-hum-2184.mp3", // Tech/Space hum
}

export function AudioController() {
  const { activeEra } = useScrollState()
  const [isMuted, setIsMuted] = useState(true)
  const [currentEra, setCurrentEra] = useState<string>("hero")
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : 0.3 // Lower volume for pure ambience
      if (!isMuted) {
        audioRef.current.play().catch(() => {
          console.log("Autoplay blocked - user interaction required")
        })
      } else {
        audioRef.current.pause()
      }
    }
  }, [isMuted])

  useEffect(() => {
    if (activeEra && activeEra !== currentEra && ERA_SOUNDS[activeEra]) {
       setCurrentEra(activeEra)
    }
  }, [activeEra, currentEra])

  return (
    <div className="fixed bottom-8 left-8 z-[110] flex items-center gap-4">
      <motion.button
        onClick={() => setIsMuted(!isMuted)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-12 h-12 rounded-full glass-morphism flex items-center justify-center border border-white/10 text-white hover:border-white/30 transition-all shadow-2xl"
      >
        {isMuted ? <VolumeX className="w-5 h-5 opacity-50" /> : <Volume2 className="w-5 h-5 text-neon-blue" />}
      </motion.button>

      <AnimatePresence>
        {!isMuted && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="hidden md:flex flex-col"
          >
            <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-white/40 mb-1">Environmental SFX</span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-neon-blue animate-pulse">
               {currentEra === 'hero' ? 'System Hum' : `${currentEra.toUpperCase()} AMBIENCE`}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <audio 
        ref={audioRef}
        loop
        src={ERA_SOUNDS[currentEra] || ERA_SOUNDS.hero}
      />
    </div>
  )
}
