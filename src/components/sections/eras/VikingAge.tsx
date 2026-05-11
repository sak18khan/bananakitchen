"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { EraSection } from "@/components/ui/EraSection"
import { AnimatedHeading } from "@/components/ui/AnimatedHeading"
import { ParticleOverlay } from "@/components/ui/ParticleOverlay"
import { FoodCard } from "@/components/ui/FoodCard"
import { DepthLayerNavigator, DepthLayer } from "@/components/ui/DepthLayerNavigator"
import { DiscoveryNode } from "@/components/ui/DiscoveryNode"

function StatBar({ label, value, colorClass }: { label: string; value: number; colorClass: string }) {
  return (
    <div className="w-full mb-4">
      <div className="flex justify-between text-xs font-mono tracking-widest text-frost-white/60 uppercase mb-2">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          className={`h-full ${colorClass} rounded-full`}
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        />
      </div>
    </div>
  )
}

export function VikingAge() {
  const [activeLayer, setActiveLayer] = useState<DepthLayer>("military")

  return (
    <EraSection id="viking-age" themeColor="viking">
      <ParticleOverlay type="snow" count={100} />

      {/* Cinematic Frost Vignette & Wind Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-midnight/90 z-0" />
      
      {/* Background Rune */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-4xl max-h-4xl border-[1px] border-neon-blue/10 rounded-full flex items-center justify-center pointer-events-none z-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-[70%] h-[70%] border-[1px] border-neon-blue/5 rounded-full border-dashed" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center gap-12">
        
        <AnimatedHeading 
          text="Viking Age" 
          subtitle="900 AD • Survival of the Fiercest"
          className="text-frost-white drop-shadow-[0_0_20px_rgba(56,189,248,0.4)]"
        />

        <DepthLayerNavigator 
          activeLayer={activeLayer} 
          onChange={setActiveLayer} 
          eraTheme="viking" 
        />

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="max-w-3xl text-center mb-12"
        >
          <p className="text-xl md:text-2xl font-light text-frost-white/80 leading-relaxed">
            In the harsh Nordic climates, food was fuel for survival and war. The Viking diet was surprisingly rich in proteins and preserved foods, essential for enduring long, brutal winters and grueling sea voyages.
          </p>
        </motion.div>

        {/* Discovery Node for Hidden Fact */}
        <div className="absolute top-[20%] right-[10%]">
          <DiscoveryNode 
            title="The Honey Secret" 
            content="Mead was more than a drink; it was a religious offering. Bees were sacred, and honey was the only sweetener in the Nordic world."
            themeColor="viking"
          />
        </div>

        {/* Warrior Energy Stats & Food Cards */}
        <div className="w-full flex flex-col lg:flex-row gap-8 px-4 items-start">
          
          {/* Stats Panel */}
          <motion.div 
            className="w-full lg:w-1/3 p-8 rounded-3xl border border-neon-blue/20 bg-midnight/60 backdrop-blur-md shadow-[0_0_30px_rgba(56,189,248,0.1)] relative overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 21a1.5 1.5 0 0 0 1.5-1.5V17m-4 4a1.5 1.5 0 0 1-1.5-1.5V17m6 0h-8l-2-2V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8l-2 2z"></path><path d="M9 9h6"></path><path d="M9 13h6"></path></svg>
            </div>
            
            <h3 className="text-2xl font-bold text-neon-blue mb-8 uppercase tracking-widest flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-neon-blue animate-pulse" />
              Warrior Stats
            </h3>

            <StatBar label="Combat Endurance" value={85} colorClass="bg-neon-blue" />
            <StatBar label="Cold Resistance" value={92} colorClass="bg-blue-400" />
            <StatBar label="Survival Calories" value={78} colorClass="bg-indigo-400" />
            <StatBar label="Sea Sickness Resistance" value={95} colorClass="bg-cyan-400" />

            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-sm font-mono text-frost-white/50 leading-relaxed">
                Daily intake relied heavily on preserved meats, whey-fermented dairy (Skyr), and hearty barley stews to maintain internal body heat.
              </p>
            </div>
          </motion.div>

          {/* Cards */}
          <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
            <FoodCard 
              title="Smoked Herring"
              description="Fish was abundant. Preserving it through smoking and wind-drying allowed Vikings to stockpile vital proteins."
              ingredients={["Herring", "Sea Salt", "Wood Smoke"]}
              socialClass="Commoner & Warrior"
              eraTheme="viking"
              logicChain={{
                geography: "Vast Nordic coastlines provided infinite fish supply.",
                climate: "Brutal winters required massive protein stockpiles.",
                trade: "Dried fish became the first 'international' trade commodity of the North."
              }}
            />
            <FoodCard 
              title="Mead (Mjöd)"
              description="The legendary drink of the gods. A fermented alcoholic beverage made from honey."
              ingredients={["Honey", "Water", "Wild Yeast", "Herbs"]}
              socialClass="All Classes"
              eraTheme="viking"
              logicChain={{
                religion: "A sacred beverage used in blót (sacrifices).",
                trade: "Honey was rare and imported from warmer southern regions.",
                class: "Only kings and high-ranking warriors drank high-quality mead regularly."
              }}
            />
            <FoodCard 
              title="Skause"
              description="A thick, hearty stew that was kept constantly boiling over the hearth."
              ingredients={["Barley", "Root Vegetables", "Boar Meat", "Bone Broth"]}
              socialClass="Commoner"
              eraTheme="viking"
            />
            <FoodCard 
              title="Skyr"
              description="A staple dairy product similar to thick yogurt, rich in protein and extremely long-lasting."
              ingredients={["Curdled Milk", "Rennet"]}
              socialClass="All Classes"
              eraTheme="viking"
            />
          </div>

        </div>
      </div>
    </EraSection>
  )
}
