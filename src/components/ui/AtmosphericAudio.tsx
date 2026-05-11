"use client"

import { useEffect, useRef, useState } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface AtmosphericAudioProps {
  atmosphere: string
}

const ATMOSPHERE_SOUNDS: Record<string, string> = {
  "misty-river-morning": "https://cdn.pixabay.com/audio/2022/03/10/audio_c8b182d733.mp3", // Nature/River
  "temple-incense-gold": "https://cdn.pixabay.com/audio/2022/01/18/audio_2c0d892019.mp3", // Bells/Atmosphere
  "fortress-stone-warm": "https://cdn.pixabay.com/audio/2021/08/09/audio_88c7a7a510.mp3", // Wind/Stone
  "market-spice-dust": "https://cdn.pixabay.com/audio/2022/03/15/audio_269e855018.mp3", // Crowds/Market
  "palace-rich-spice": "https://cdn.pixabay.com/audio/2021/11/25/audio_9115df68d5.mp3", // Palace/Music
  "harbor-tea-fog": "https://cdn.pixabay.com/audio/2022/02/07/audio_65902123f8.mp3", // Harbor/Birds
  "urban-neon-street": "https://cdn.pixabay.com/audio/2022/03/10/audio_55a297914e.mp3", // City traffic
  "clean-tech-green": "https://cdn.pixabay.com/audio/2021/08/04/audio_1e370a4a88.mp3", // Future/Ambient
}

export function AtmosphericAudio({ atmosphere }: AtmosphericAudioProps) {
  const [isMuted, setIsMuted] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [currentSrc, setCurrentSrc] = useState(ATMOSPHERE_SOUNDS[atmosphere])

  useEffect(() => {
    if (ATMOSPHERE_SOUNDS[atmosphere]) {
      setCurrentSrc(ATMOSPHERE_SOUNDS[atmosphere])
    }
  }, [atmosphere])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3
      if (!isMuted) {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e))
      }
    }
  }, [currentSrc, isMuted])

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
      setIsMuted(!isMuted)
    }
  }

  return (
    <div className="fixed bottom-8 left-8 z-[200]">
      <audio
        ref={audioRef}
        src={currentSrc}
        loop
        autoPlay={!isMuted}
      />
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleMute}
        className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
      >
        <AnimatePresence mode="wait">
          {isMuted ? (
            <motion.div
              key="muted"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <VolumeX className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="unmuted"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <Volume2 className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
