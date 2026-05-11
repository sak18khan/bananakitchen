"use client"

import { useState, useMemo, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { YearController } from "./YearController"
import { RegionSelector } from "./RegionSelector"
import { MealCard } from "./MealCard"
import { AtmosphericAudio } from "@/components/ui/AtmosphericAudio"
import { WorldEnvironment } from "./WorldEnvironment"
import { ChevronLeft, Share2, Info, BookOpen, Compass, Map, Globe, Database } from "lucide-react"

import centuriesData from "@/lib/data/india/centuries.json"
import regionsData from "@/lib/data/india/regions.json"
import mealsData from "@/lib/data/india/meals.json"

interface IndiaTimelineProps {
  onBack: () => void
}

export function IndiaTimeline({ onBack }: IndiaTimelineProps) {
  const [activeCenturyId, setActiveCenturyId] = useState(centuriesData[0].id)
  const [activeRegionId, setActiveRegionId] = useState(regionsData[0].id)
  const [isReady, setIsReady] = useState(false)
  const [showIntro, setShowIntro] = useState(true)

  const activeCentury = useMemo(() => 
    centuriesData.find(c => c.id === activeCenturyId),
    [activeCenturyId]
  )

  const activeRegion = useMemo(() => 
    regionsData.find(r => r.id === activeRegionId),
    [activeRegionId]
  )

  const filteredMeals = useMemo(() => 
    mealsData.filter(m => m.centuryId === activeCenturyId && m.regionId === activeRegionId),
    [activeCenturyId, activeRegionId]
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true)
      const introTimer = setTimeout(() => setShowIntro(false), 2000)
      return () => clearTimeout(introTimer)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] bg-black text-white flex flex-col overflow-hidden"
      style={{ 
        fontFamily: activeCentury?.typography === 'serif' ? 'serif' : 
                   activeCentury?.typography === 'mono' ? 'monospace' : 'sans-serif' 
      }}
    >
      <AtmosphericAudio atmosphere={activeCentury?.atmosphere || "misty-river-morning"} />
      
      <WorldEnvironment 
        centuryId={activeCenturyId} 
        regionId={activeRegionId} 
        visuals={activeCentury?.visuals} 
        weather={activeRegion?.visuals.weather || "clear"} 
      />

      <AnimatePresence>
        {showIntro && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1.5, ease: "circOut" }}
            className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center pointer-events-none"
          >
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.5 }}
               className="text-center"
             >
                <span className="text-[10px] font-mono text-neon-blue uppercase tracking-[1em] block mb-4">Establishing Temporal Stream</span>
                <h1 className="text-6xl font-black tracking-[0.5em] uppercase text-white mb-2">INDIA</h1>
                <div className="w-64 h-[1px] bg-white/10 mx-auto overflow-hidden relative">
                   <motion.div 
                     animate={{ x: ["-100%", "100%"] }}
                     transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                     className="absolute inset-0 bg-neon-blue"
                   />
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header / Nav */}
      <div className="relative z-[200] flex items-center justify-between px-8 py-6 border-b border-white/5 bg-black/40 backdrop-blur-xl">
        <button 
          onClick={onBack}
          className="group flex items-center gap-3 text-white/40 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-mono uppercase tracking-[0.3em]">Exit Simulation</span>
        </button>

        <div className="text-center">
           <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.8em] block mb-1">Temporal Archive System</span>
           <h1 className="text-2xl font-black tracking-[0.5em] uppercase text-white/90">
             India <span className="text-white/20">Simulation</span>
           </h1>
        </div>

        <div className="flex items-center gap-4">
           <div className="px-4 py-2 rounded-full border border-white/10 bg-white/5 hidden md:flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-neon-blue animate-pulse" />
              <span className="text-[10px] font-mono text-white/60 uppercase tracking-widest">System Online</span>
           </div>
           <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all">
             <Share2 className="w-4 h-4" />
           </button>
        </div>
      </div>

      <div 
        className="flex-1 overflow-y-auto relative z-[150] scroll-smooth"
        data-lenis-prevent
      >
        {/* Timeline Controller */}
        <YearController 
          centuries={centuriesData} 
          activeCenturyId={activeCenturyId} 
          onSelect={setActiveCenturyId} 
        />

        <div className="max-w-[1400px] mx-auto px-8 py-12">
           {/* Main Content Grid */}
           <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
              
              {/* Left Column: Era & Region Intel (4 cols) */}
              <div className="xl:col-span-4 space-y-12">
                 <motion.div
                   key={activeCenturyId}
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   className="space-y-6"
                 >
                    <div className="flex items-center gap-3 text-neon-blue/60 font-mono text-[10px] uppercase tracking-[0.4em]">
                       <Compass className="w-4 h-4" />
                       <span>Era Intelligence</span>
                    </div>
                    <h2 className="text-6xl font-black tracking-tighter uppercase leading-none text-white">
                      {activeCentury?.title}
                    </h2>
                    <p className="text-white/50 text-lg leading-relaxed">
                      {activeCentury?.description}
                    </p>
                 </motion.div>

                 <div className="space-y-8">
                    <div className="flex items-center justify-between text-white/20 uppercase tracking-[0.3em] text-[10px] font-mono border-b border-white/5 pb-4">
                       <span>Region Selection</span>
                    </div>
                    <RegionSelector 
                      regions={regionsData} 
                      activeRegionId={activeRegionId} 
                      onSelect={setActiveRegionId} 
                    />
                 </div>

                 {/* Region Deep Dive Card */}
                 <motion.div
                   key={`${activeCenturyId}-${activeRegionId}`}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 space-y-8"
                 >
                    <div className="aspect-video rounded-2xl overflow-hidden border border-white/10 relative">
                       <motion.img 
                          animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 1, 0]
                          }}
                          transition={{
                            duration: 30,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                          src={filteredMeals[0]?.visualUrl || `https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=2000&sig=${activeRegionId}`} 
                          alt={activeRegion?.name}
                          className="w-full h-full object-cover grayscale opacity-50 transition-all duration-1000 hover:grayscale-0 hover:opacity-100 cursor-zoom-in"
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                       <div className="absolute bottom-4 left-4 flex items-center gap-2">
                          <Map className="w-3 h-3 text-white/40" />
                          <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{activeRegion?.culturalSignature}</span>
                       </div>
                    </div>

                    <div className="space-y-4">
                       <h3 className="text-3xl font-bold uppercase tracking-tight text-white/90">{activeRegion?.name}</h3>
                       <p className="text-white/40 text-sm leading-relaxed">
                         {activeRegion?.description}
                       </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                          <span className="text-[9px] font-mono text-white/30 uppercase block mb-1">Weather System</span>
                          <span className="text-xs text-white/70 capitalize">{activeRegion?.visuals.weather}</span>
                       </div>
                       <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                          <span className="text-[9px] font-mono text-white/30 uppercase block mb-1">Architecture</span>
                          <span className="text-xs text-white/70 line-clamp-1">{activeCentury?.visuals.environment}</span>
                       </div>
                    </div>
                 </motion.div>

                 {/* Discovery Mini-Panel */}
                 <div className="p-6 rounded-2xl border border-dashed border-white/10 space-y-4 opacity-60">
                    <div className="flex items-center gap-3 text-white/30 font-mono text-[9px] uppercase tracking-widest">
                       <Database className="w-3 h-3" />
                       <span>Archive Status</span>
                    </div>
                    <p className="text-[11px] text-white/40 leading-relaxed">
                      Scanning trade routes and ingredient migrations for {activeCentury?.year}. Discovery systems are 84% synchronized for {activeRegion?.name}.
                    </p>
                 </div>
              </div>

              {/* Right Column: Experience Feed (8 cols) */}
              <div className="xl:col-span-8 space-y-12">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <div className="w-8 h-[1px] bg-white/20" />
                       <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em]">Culinary Evolution Feed</span>
                    </div>
                    <div className="flex gap-2">
                       <button className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[9px] font-mono text-white/40 uppercase hover:text-white transition-colors">Filter: Poor</button>
                       <button className="px-3 py-1 rounded-md bg-white/10 border border-white/20 text-[9px] font-mono text-white/90 uppercase">Filter: Royal</button>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 gap-12">
                    {filteredMeals.length > 0 ? (
                      filteredMeals.map(meal => (
                        <MealCard key={meal.id} meal={meal} />
                      ))
                    ) : (
                      <div className="py-40 text-center border border-dashed border-white/10 rounded-[3rem] bg-white/[0.02]">
                         <Globe className="w-12 h-12 text-white/10 mx-auto mb-6" />
                         <p className="text-white/20 font-mono uppercase tracking-[0.3em] max-w-sm mx-auto">
                           Archive entry incomplete for this century/region combination. Data restoration in progress.
                         </p>
                      </div>
                    )}
                 </div>

                 {/* Interactive Trade Route Teaser */}
                 <div className="p-12 rounded-[3rem] bg-gradient-to-br from-white/5 to-transparent border border-white/10 relative overflow-hidden group/trade">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-neon-blue/10 blur-[100px] group-hover/trade:bg-neon-blue/20 transition-colors" />
                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                       <div className="space-y-6">
                          <span className="px-3 py-1 rounded-full bg-neon-blue/10 text-neon-blue text-[9px] font-mono uppercase tracking-widest border border-neon-blue/20">Coming Soon</span>
                          <h4 className="text-4xl font-black uppercase tracking-tighter">Interactive Trade Routes</h4>
                          <p className="text-white/40 text-sm leading-relaxed">
                            Trace the movement of spices, silk, and ingredients across the Indian Ocean and Silk Road. See how global migrations redefined the local plate.
                          </p>
                          <button className="px-8 py-3 rounded-full bg-white text-black text-[10px] font-mono uppercase tracking-widest font-bold hover:bg-neon-blue hover:text-white transition-all">
                            Unlock Module
                          </button>
                       </div>
                       <div className="relative aspect-square md:aspect-auto h-full flex items-center justify-center">
                          <div className="w-full h-full border border-white/5 rounded-full animate-spin-slow flex items-center justify-center">
                             <div className="w-3/4 h-3/4 border border-white/10 rounded-full flex items-center justify-center">
                                <div className="w-1/2 h-1/2 border border-white/20 rounded-full" />
                             </div>
                          </div>
                          <Compass className="absolute w-12 h-12 text-white/20" />
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Footer info */}
        <div className="max-w-7xl mx-auto px-8 py-20 border-t border-white/5 opacity-40 text-center">
           <p className="text-[10px] font-mono uppercase tracking-[0.5em]">
             Temporal Stream Terminated // Archive entry {activeCentury?.year} Closed
           </p>
        </div>
      </div>
    </motion.div>
  )
}
