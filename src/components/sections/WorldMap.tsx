"use client"

import { useRef, useState, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sphere, Html, OrbitControls, Line, QuadraticBezierLine } from "@react-three/drei"
import { motion, useScroll, useTransform } from "framer-motion"
import { AnimatedHeading } from "@/components/ui/AnimatedHeading"
import { Lock } from "lucide-react"
import { ERAS } from "@/lib/data/timeline"

const LOCATIONS = [
  { id: "rome", name: "Ancient Rome", lat: 41.9, lng: 12.5, color: "#eab308", era: "120 AD", status: "active" },
  { id: "viking", name: "Viking Age", lat: 60.5, lng: 5.3, color: "#38bdf8", era: "900 AD", status: "active" },
  { id: "mughal", name: "Mughal Empire", lat: 27.2, lng: 78.0, color: "#10b981", era: "1600 AD", status: "active" },
  { id: "edo", name: "Edo Japan", lat: 35.7, lng: 139.7, color: "#f43f5e", era: "1750 AD", status: "active" },
  { id: "egypt", name: "Ancient Egypt", lat: 26.8, lng: 30.8, color: "#ca8a04", era: "3000 BC", status: "locked" },
  { id: "aztec", name: "Aztec Empire", lat: 19.4, lng: -99.1, color: "#16a34a", era: "1400 AD", status: "locked" },
]

const ROUTES = [
  { from: "rome", to: "mughal", color: "#eab308" },
  { from: "mughal", to: "edo", color: "#10b981" },
  { from: "rome", to: "viking", color: "#38bdf8" },
]

// Convert lat/lng to 3D Cartesian coordinates
function latLongToVector3(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)

  const x = -(radius * Math.sin(phi) * Math.cos(theta))
  const z = radius * Math.sin(phi) * Math.sin(theta)
  const y = radius * Math.cos(phi)

  return [x, y, z] as [number, number, number]
}

function TradeRoute({ from, to, color }: any) {
  const start = latLongToVector3(from.lat, from.lng, 2.05)
  const end = latLongToVector3(to.lat, to.lng, 2.05)
  
  // Calculate mid point for the arc
  const mid = [
    (start[0] + end[0]) * 0.6,
    (start[1] + end[1]) * 0.6,
    (start[2] + end[2]) * 0.6
  ] as [number, number, number]

  const lineRef = useRef<any>(null)
  
  useFrame(({ clock }) => {
    if (lineRef.current) {
      lineRef.current.dashOffset = -clock.getElapsedTime() * 0.5
    }
  })

  return (
    <QuadraticBezierLine
      ref={lineRef}
      start={start}
      end={end}
      mid={mid}
      color={color}
      lineWidth={1}
      transparent
      opacity={0.3}
      dashed
      dashScale={20}
      dashSize={0.5}
    />
  )
}

function GlobeMarker({ location, isSelected, onClick }: any) {
  const position = latLongToVector3(location.lat, location.lng, 2.05)
  const [hovered, setHovered] = useState(false)
  const isActive = location.status === "active"

  return (
    <group position={position} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} onClick={isActive ? onClick : undefined}>
      <mesh>
        <sphereGeometry args={[isActive ? 0.08 : 0.05, 16, 16]} />
        <meshBasicMaterial color={isActive ? location.color : "#334155"} />
      </mesh>
      
      {/* Glow effect */}
      <mesh>
        <sphereGeometry args={[isActive ? 0.15 : 0.1, 16, 16]} />
        <meshBasicMaterial color={isActive ? location.color : "#1e293b"} transparent opacity={hovered || isSelected ? 0.6 : 0.2} />
      </mesh>

      {(hovered || isSelected) && (
        <Html distanceFactor={10} zIndexRange={[100, 0]}>
          <div className="flex flex-col items-center -translate-x-1/2 -translate-y-[120%] cursor-pointer">
            <div 
              className="px-3 py-1.5 rounded-md backdrop-blur-md border whitespace-nowrap flex items-center gap-2"
              style={{ borderColor: isActive ? location.color : "#334155", backgroundColor: 'rgba(5, 8, 22, 0.8)' }}
            >
              {!isActive && <Lock className="w-3 h-3 text-white/40" />}
              <div>
                <p className="text-white font-bold text-sm">{location.name}</p>
                <p className="text-white/60 font-mono text-xs">{location.era}</p>
              </div>
            </div>
            <div className="w-1 h-6 mt-1" style={{ background: `linear-gradient(to bottom, ${isActive ? location.color : "#334155"}, transparent)` }} />
          </div>
        </Html>
      )}
    </group>
  )
}

function GlobeScene() {
  const globeRef = useRef<any>(null)
  const [selected, setSelected] = useState<string | null>(null)

  useFrame((state, delta) => {
    if (globeRef.current && !selected) {
      globeRef.current.rotation.y += delta * 0.05
    }
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
      
      <group ref={globeRef}>
        {/* Core wireframe sphere */}
        <Sphere args={[2, 64, 64]}>
          <meshBasicMaterial color="#1e293b" wireframe transparent opacity={0.15} />
        </Sphere>
        
        {/* Solid inner sphere */}
        <Sphere args={[1.98, 64, 64]}>
          <meshPhongMaterial color="#020617" emissive="#050816" shininess={30} />
        </Sphere>

        {LOCATIONS.map((loc) => (
          <GlobeMarker 
            key={loc.id} 
            location={loc} 
            isSelected={selected === loc.id} 
            onClick={() => setSelected(loc.id === selected ? null : loc.id)} 
          />
        ))}

        {ROUTES.map((route, i) => {
          const from = LOCATIONS.find(l => l.id === route.from)
          const to = LOCATIONS.find(l => l.id === route.to)
          if (from && to) {
            return <TradeRoute key={i} from={from} to={to} color={route.color} />
          }
          return null
        })}
      </group>
      
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={!selected} autoRotateSpeed={0.5} />
    </>
  )
}

export function WorldMap() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section id="world-map" ref={ref} className="relative min-h-screen w-full bg-deep-space flex flex-col items-center py-32 overflow-hidden border-t border-white/5">
      <motion.div className="relative z-10 w-full flex flex-col items-center px-4 mb-8" style={{ opacity }}>
        <AnimatedHeading text="Evolution Map" subtitle="The Global Flow of Ingredients" className="text-frost-white font-sans" />
        <p className="text-frost-white/60 mt-6 max-w-xl text-center">Trace the glowing trade routes and migrate across culinary history. Locked civilizations represent future temporal nodes.</p>
      </motion.div>

      <motion.div className="relative w-full h-[70vh] max-w-6xl mx-auto cursor-grab active:cursor-grabbing z-20" style={{ opacity }}>
        {/* Subtle radial glow behind the globe */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.05)_0%,transparent_60%)] pointer-events-none -z-10" />
        
        <Canvas camera={{ position: [0, 0, 6], fov: 40 }}>
          <GlobeScene />
        </Canvas>
      </motion.div>
    </section>
  )
}
