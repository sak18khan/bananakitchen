"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial, Preload } from "@react-three/drei"

function ParticleSwarm(props: any) {
  const ref = useRef<any>(null)
  const sphere = new Float32Array(5000 * 3)
  
  // Generate random points on a sphere
  for (let i = 0; i < 5000; i++) {
    const r = 1.5 * Math.cbrt(Math.random())
    const theta = Math.random() * 2 * Math.PI
    const phi = Math.acos(2 * Math.random() - 1)

    sphere[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    sphere[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    sphere[i * 3 + 2] = r * Math.cos(phi)
  }

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10
      ref.current.rotation.y -= delta / 15
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#38bdf8"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  )
}

function PortalScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ParticleSwarm />
        <Preload all />
      </Canvas>
      {/* Fog Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-deep-space via-deep-space/50 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-deep-space/50 to-transparent z-10" />
    </div>
  )
}

export function Hero() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 1000], [0, 200])
  const opacity = useTransform(scrollY, [0, 500], [1, 0])

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-deep-space">
      {mounted && <PortalScene />}
      
      <motion.div 
        className="relative z-20 flex flex-col items-center text-center px-4"
        style={{ y: y1, opacity }}
      >
        <motion.h1 
          className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-frost-white mb-6 drop-shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Taste <span className="text-neon-blue drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]">History.</span>
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-frost-white/80 max-w-2xl font-light tracking-wide mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          An interactive cinematic exploration of humanity through food, time, and civilizations.
        </motion.p>
        
        <motion.button
          className="group relative px-8 py-4 bg-transparent overflow-hidden rounded-full border border-neon-blue/30 transition-all hover:border-neon-blue"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          onClick={() => {
            document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          <div className="absolute inset-0 bg-neon-blue/10 blur-md group-hover:bg-neon-blue/20 transition-all" />
          <span className="relative z-10 text-frost-white tracking-widest uppercase text-sm font-semibold flex items-center gap-2">
            Begin Time Travel
            <div className="w-2 h-2 rounded-full bg-neon-blue animate-pulse shadow-[0_0_8px_2px_rgba(56,189,248,0.6)]" />
          </span>
        </motion.button>
      </motion.div>
    </section>
  )
}
