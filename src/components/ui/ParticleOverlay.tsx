"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface ParticleOverlayProps {
  type: "dust" | "snow" | "spice" | "sakura" | "neon"
  count?: number
}

export function ParticleOverlay({ type, count = 50 }: ParticleOverlayProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number; delay: number }>>([])

  useEffect(() => {
    const newParticles = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (type === "snow" || type === "sakura" ? 6 : 4) + 2,
      duration: Math.random() * (type === "sakura" ? 15 : 10) + 10,
      delay: Math.random() * 5,
    }))
    setParticles(newParticles)
  }, [count, type])

  const getColor = () => {
    if (type === "dust") return "bg-soft-gold/30"
    if (type === "snow") return "bg-frost-white/60"
    if (type === "spice") return "bg-orange-500/40"
    if (type === "sakura") return "bg-rose-300/40"
    if (type === "neon") return "bg-neon-blue/40 shadow-[0_0_10px_rgba(56,189,248,0.5)]"
    return "bg-white/30"
  }

  const getAnimation = (pType: string) => {
    if (pType === "snow") {
      return { y: ["0vh", "100vh"], x: ["-5vw", "5vw", "-5vw"], rotate: [0, 360] }
    }
    if (pType === "sakura") {
      return { y: ["-10vh", "110vh"], x: ["0vw", "10vw", "5vw", "15vw"], rotate: [0, 180, 360] }
    }
    if (pType === "neon") {
      return { y: ["0vh", "-100vh"], opacity: [0, 1, 0] }
    }
    return { y: ["-10vh", "10vh", "-10vh"], x: ["-5vw", "5vw", "-5vw"], opacity: [0, 0.8, 0] }
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute blur-[1px] ${type === "sakura" ? "rounded-tl-[50%] rounded-br-[50%]" : "rounded-full"} ${getColor()}`}
          style={{
            width: p.size * (type === "sakura" ? 1.5 : 1),
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={getAnimation(type)}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}
