"use client"

import { useRef, useState, useEffect, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sphere, Html, OrbitControls } from "@react-three/drei"
import { motion, AnimatePresence } from "framer-motion"
import { MapDescent } from "@/components/ui/MapDescent"
import { Globe, Search, Lock, CheckCircle2, ChevronRight, X } from "lucide-react"
import { COUNTRIES } from "@/lib/data/countries"
import { cn } from "@/lib/utils"

function latLongToVector3(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  const x = -(radius * Math.sin(phi) * Math.cos(theta))
  const z = radius * Math.sin(phi) * Math.sin(theta)
  const y = radius * Math.cos(phi)
  return [x, y, z] as [number, number, number]
}

function CountryMarker({ country, onSelect, active }: any) {
  const position = latLongToVector3(country.coordinates[0], country.coordinates[1], 2.05)
  const [hovered, setHovered] = useState(false)

  return (
    <group 
      position={position} 
      onPointerOver={() => setHovered(true)} 
      onPointerOut={() => setHovered(false)} 
      onClick={() => country.status === 'available' && onSelect(country)}
    >
      <mesh>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color={country.status === 'available' ? "#38bdf8" : "#4b5563"} />
      </mesh>
      <mesh scale={hovered || active ? 2 : 1.5}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial 
          color={country.status === 'available' ? "#38bdf8" : "#4b5563"} 
          transparent 
          opacity={active ? 0.4 : 0.2} 
        />
      </mesh>
      
      {(hovered || active) && (
        <Html distanceFactor={10}>
          <div className="bg-black/80 backdrop-blur-md border border-white/20 p-2 rounded-lg text-white whitespace-nowrap pointer-events-none">
            <p className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              {country.name}
              {country.status !== 'available' && <Lock className="w-3 h-3 opacity-40" />}
            </p>
          </div>
        </Html>
      )}
    </group>
  )
}

function GlobeScene({ onSelectCountry, activeCountryId }: { onSelectCountry: (c: any) => void, activeCountryId: string | null }) {
  const globeRef = useRef<any>(null)

  useFrame((state, delta) => {
    if (globeRef.current && !activeCountryId) {
      globeRef.current.rotation.y += delta * 0.05
    }
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      
      <group ref={globeRef}>
        <Sphere args={[2, 64, 64]}>
          <meshPhongMaterial 
            color="#050816" 
            emissive="#1e293b" 
            emissiveIntensity={0.2} 
            shininess={10} 
            wireframe={true} 
            transparent 
            opacity={0.1} 
          />
        </Sphere>
        
        <Sphere args={[1.98, 64, 64]}>
          <meshPhongMaterial color="#020617" />
        </Sphere>

        {COUNTRIES.map((country) => (
          <CountryMarker 
            key={country.id} 
            country={country} 
            onSelect={onSelectCountry} 
            active={activeCountryId === country.id}
          />
        ))}
      </group>
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        autoRotate={false} 
        makeDefault
      />
    </>
  )
}

export function CountryExplorer({ onBack, onSelectIndia }: { onBack: () => void, onSelectIndia?: () => void }) {
  const [search, setSearch] = useState("")
  const [selectedCountry, setSelectedCountry] = useState<any>(null)
  const [isDescending, setIsDescending] = useState(false)

  const filteredCountries = useMemo(() => 
    COUNTRIES.filter(c => c.name.toLowerCase().includes(search.toLowerCase())),
    [search]
  )

  const handleSelectCountry = (country: any) => {
    if (country.status !== 'available') return
    setSelectedCountry(country)
    setIsDescending(true)
  }

  return (
    <section className="fixed inset-0 z-[120] bg-black flex flex-col md:flex-row overflow-hidden">
      {/* Search Sidebar */}
      <div className="w-full md:w-[400px] bg-midnight/80 backdrop-blur-xl border-r border-white/10 z-20 flex flex-col p-8 overflow-y-auto">
        <button 
          onClick={onBack}
          className="group flex items-center gap-3 text-white/40 hover:text-white transition-colors mb-12"
        >
           <ChevronRight className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform" />
           <span className="text-xs font-mono uppercase tracking-[0.3em]">Return to Hub</span>
        </button>

        <h2 className="text-4xl font-black text-white tracking-tighter mb-8 uppercase leading-none">
          Global<br/>Archives
        </h2>
        
        <div className="relative mb-12">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input 
            type="text" 
            placeholder="Search countries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-neon-blue/50 transition-all"
          />
        </div>

        <div className="flex flex-col gap-4 flex-1">
          {filteredCountries.map(country => (
            <button
              key={country.id}
              onClick={() => handleSelectCountry(country)}
              className={cn(
                "group relative p-6 rounded-2xl border transition-all duration-300 text-left overflow-hidden",
                country.status === 'available' 
                  ? "border-white/10 bg-white/5 hover:border-neon-blue/40" 
                  : "border-white/5 bg-transparent opacity-40 grayscale"
              )}
            >
               {country.status === 'available' && (
                 <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
               )}
               
               <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{country.name}</h3>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                      {country.status === 'available' ? 'Data Synchronized' : 'Encrypted Archive'}
                    </span>
                  </div>
                  {country.status === 'available' ? (
                    <CheckCircle2 className="w-5 h-5 text-neon-blue" />
                  ) : (
                    <Lock className="w-4 h-4 text-white/20" />
                  )}
               </div>
            </button>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t border-white/10">
           <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-white/20 leading-relaxed">
             * ONLY INDIA IS FULLY ACCESSIBLE IN THIS BUILD. OTHER ARCHIVES ARE PARTIALLY CORRUPTED AND LOCKED.
           </p>
        </div>
      </div>

      {/* Globe Area */}
      <div className="flex-1 relative bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.05)_0%,transparent_70%)]">
        <div className="absolute inset-0 z-10 pointer-events-none">
           <div className="absolute top-12 right-12 text-right">
              <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.5em] block mb-2">Satellite Status</span>
              <span className="text-xs text-neon-blue font-mono animate-pulse">ORBITAL STABLE</span>
           </div>
        </div>

        <Canvas camera={{ position: [0, 0, 6], fov: 40 }}>
          <GlobeScene onSelectCountry={handleSelectCountry} activeCountryId={selectedCountry?.id} />
        </Canvas>
      </div>

      <MapDescent 
        isDescending={isDescending} 
        countryName={selectedCountry?.name || ""} 
        onComplete={() => {
          setIsDescending(false)
          if (selectedCountry?.id === 'india' && onSelectIndia) {
            onSelectIndia()
          }
        }} 
      />
    </section>
  )
}
