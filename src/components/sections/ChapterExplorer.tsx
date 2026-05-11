"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Civilization, Evidence } from "@/lib/data/civilizations"
import { X, ArrowRight, BookOpen, Anchor, Map, Landmark, ScrollText } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChapterExplorerProps {
  civilization: Civilization
  onBack: () => void
}

export function ChapterExplorer({ civilization, onBack }: ChapterExplorerProps) {
  return (
    <motion.section
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "100%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[200] bg-black overflow-y-auto custom-scrollbar"
    >
      {/* Background Visual */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
         <img src={civilization.visuals} className="w-full h-full object-cover filter grayscale blur-sm" alt="" />
         <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-24">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24">
           <div className="space-y-4">
              <button 
                onClick={onBack}
                className="group flex items-center gap-3 text-neon-blue mb-8 hover:opacity-70 transition-all"
              >
                 <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                 <span className="text-xs font-mono uppercase tracking-[0.4em]">Close Dossier</span>
              </button>
              <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter uppercase leading-none">
                {civilization.title}
              </h1>
              <div className="flex items-center gap-6 text-white/40 font-mono text-sm uppercase tracking-widest">
                 <span>{civilization.period}</span>
                 <div className="w-1.5 h-1.5 rounded-full bg-neon-blue" />
                 <span>{civilization.region}</span>
              </div>
           </div>

           <div className="max-w-md bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md">
              <p className="text-white/60 leading-relaxed font-light italic">
                "{civilization.context}"
              </p>
           </div>
        </header>

        {/* Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-24">
           {/* Section 1: The Foundation (Food Logic) */}
           <div className="lg:col-span-2 space-y-12">
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                 <Landmark className="w-5 h-5 text-neon-blue" />
                 <h2 className="text-xs font-mono uppercase tracking-[0.5em] text-white">Societal Foundation</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-6">
                    <h3 className="text-3xl font-bold text-white">Historical Reasoning</h3>
                    <p className="text-lg text-white/50 leading-relaxed">
                       {civilization.reasoning}
                    </p>
                 </div>
                 <div className="space-y-6">
                    <h3 className="text-3xl font-bold text-white">Core Ingredients</h3>
                    <div className="flex flex-wrap gap-3">
                       {civilization.ingredients.map((ing, i) => (
                         <span key={i} className="px-5 py-2 bg-neon-blue/10 border border-neon-blue/20 rounded-full text-neon-blue text-sm">
                            {ing}
                         </span>
                       ))}
                    </div>
                 </div>
              </div>

              {/* Trade Routes */}
              <div className="bg-white/5 border border-white/10 p-12 rounded-[40px] relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Map className="w-32 h-32 text-white" />
                 </div>
                 <h3 className="text-xs font-mono uppercase tracking-[0.5em] text-neon-blue mb-8">Supply & Trade</h3>
                 <div className="space-y-4">
                    {civilization.tradeRoutes.map((route, i) => (
                      <div key={i} className="flex items-center gap-6">
                         <div className="w-12 h-[1px] bg-white/20" />
                         <span className="text-2xl font-bold text-white/80">{route}</span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* Section 2: Sidebar (Artifacts/Evidence) */}
           <div className="space-y-8">
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                 <ScrollText className="w-5 h-5 text-neon-blue" />
                 <h2 className="text-xs font-mono uppercase tracking-[0.5em] text-white">Primary Evidence</h2>
              </div>

              <div className="space-y-6">
                 {civilization.evidence.map((ev, i) => (
                    <EvidenceCard key={i} evidence={ev} />
                 ))}
              </div>
           </div>
        </div>

        {/* Interactive Scene Placeholder */}
        <div className="relative h-[600px] w-full rounded-[60px] overflow-hidden border border-white/10 group mb-24">
           <img 
             src={civilization.visuals} 
             className="w-full h-full object-cover filter brightness-[0.6] group-hover:scale-110 transition-transform duration-1000" 
             alt="" 
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
           <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center mb-6 animate-pulse">
                 <Anchor className="w-6 h-6 text-neon-blue" />
              </div>
              <h3 className="text-4xl font-bold text-white mb-4 tracking-tighter">Enter Immersive Reconstruction</h3>
              <p className="text-white/60 max-w-md">Experience the {civilization.title} environment through a high-fidelity 3D simulation.</p>
           </div>
        </div>
      </div>
    </motion.section>
  )
}

function EvidenceCard({ evidence }: { evidence: Evidence }) {
  const Icon = evidence.sourceType === 'archaeological' ? Landmark : evidence.sourceType === 'textual' ? ScrollText : BookOpen

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-8 rounded-3xl bg-midnight border border-white/5 hover:border-neon-blue/30 transition-all space-y-6"
    >
       <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-neon-blue/10 flex items-center justify-center text-neon-blue">
             <Icon className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-white/30">{evidence.sourceType}</span>
       </div>
       <h4 className="text-xl font-bold text-white leading-tight">{evidence.title}</h4>
       <p className="text-sm text-white/40 uppercase tracking-[0.2em]">{evidence.description}</p>
       <p className="text-sm text-white/70 leading-relaxed italic border-l-2 border-neon-blue/20 pl-4 py-1">
          {evidence.content}
       </p>
    </motion.div>
  )
}
