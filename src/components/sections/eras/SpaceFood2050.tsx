"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { EraSection } from "@/components/ui/EraSection"
import { AnimatedHeading } from "@/components/ui/AnimatedHeading"
import { ParticleOverlay } from "@/components/ui/ParticleOverlay"
import { FoodCard } from "@/components/ui/FoodCard"
import { DepthLayerNavigator, DepthLayer } from "@/components/ui/DepthLayerNavigator"
import { DiscoveryNode } from "@/components/ui/DiscoveryNode"

export function SpaceFood2050() {
  const [activeLayer, setActiveLayer] = useState<DepthLayer>("common")

  return (
    <EraSection id="space-food-2050" themeColor="space">
      <ParticleOverlay type="neon" count={30} />

      {/* Futuristic Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay z-0" />
      
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: "linear-gradient(rgba(56, 189, 248, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.2) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          transform: "perspective(500px) rotateX(60deg) translateY(-100px) translateZ(-200px)",
        }}
      />

      {/* Holographic Scanline Overlay */}
      <motion.div 
        className="absolute inset-0 w-full h-[10px] bg-electric-purple/20 blur-sm z-0 pointer-events-none"
        animate={{ y: ["0vh", "150vh"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center gap-12">
        
        <div className="flex flex-col items-center">
          <span className="text-neon-blue font-mono tracking-[0.5em] text-sm mb-4 bg-neon-blue/10 px-4 py-1 rounded-sm border border-neon-blue/30 uppercase">System Online</span>
          <AnimatedHeading 
            text="Space Food 2050" 
            subtitle="The Future of Interplanetary Nutrition"
            className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-electric-purple to-neon-blue drop-shadow-[0_0_15px_rgba(168,85,247,0.5)] font-mono"
          />
        </div>

        <DepthLayerNavigator 
          activeLayer={activeLayer} 
          onChange={setActiveLayer} 
          eraTheme="space" 
        />

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="max-w-3xl text-center p-8 border border-white/5 bg-black/40 backdrop-blur-xl rounded-xl relative overflow-hidden mb-12"
        >
          {/* Neon animated corner borders */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-neon-blue" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-neon-blue" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-neon-blue" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-neon-blue" />

          <p className="text-xl font-mono text-neon-blue/80 leading-relaxed tracking-wide">
            &gt; INITIATING DATABASE QUERY...<br/>
            As humanity becomes an interplanetary species, our food must survive zero-gravity, extreme radiation, and decades-long voyages.
          </p>
        </motion.div>

        {/* Discovery Node */}
        <div className="absolute top-[20%] left-[20%]">
          <DiscoveryNode 
            title="The Algae Engine" 
            content="90% of the station's oxygen and protein comes from a centralized algae bioreactor that recycles every gram of biological waste."
            themeColor="space"
          />
        </div>

        {/* Food Cards */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
          <FoodCard 
            title="Bio-Printed Wagyu"
            description="Cultured meat grown from stem cells in bioreactors. Perfect marbling achieved through AI-driven 3D printing."
            ingredients={["Bovine Stem Cells", "Nutrient Amino Bath", "Plant-based scaffolding"]}
            socialClass="Premium Output"
            eraTheme="space"
            logicChain={{
              geography: "Lunar base facilities with controlled gravity environments.",
              trade: "Inter-orbital supply lines for essential amino acid precursors.",
              class: "Limited to high-ranking orbital commanders and terraforming pioneers."
            }}
          />
          <FoodCard 
            title="Hydroponic Mars Greens"
            description="Genetically modified spirulina and micro-greens engineered to grow in low-light, high-radiation environments."
            ingredients={["Spirulina", "CRISPR Kale", "Regolith Nutrients"]}
            socialClass="Standard Ration"
            eraTheme="space"
            logicChain={{
              geography: "Grown in underground lava tubes to shield from Martian surface radiation.",
              climate: "Atmospheric scrubbers recycle CO2 from living quarters into the grow-labs.",
              trade: "A closed-loop system requiring zero Earth-side imports."
            }}
          />
          <FoodCard 
            title="Neural Nectar"
            description="A high-density caloric paste engineered for cognitive enhancement during deep-space hypersleep protocols."
            ingredients={["Synthetic Nootropics", "Omega-9", "Caloric Gel"]}
            socialClass="Mission Critical"
            eraTheme="space"
          />
          <FoodCard 
            title="Freeze-Dried Nostalgia"
            description="Classic Earth comfort foods reduced to stable powders, rehydrated using precise thermal injectors."
            ingredients={["Dehydrated Pizza Matter", "Synthetic Cheese Fiber", "H2O"]}
            socialClass="Recreational"
            eraTheme="space"
          />
        </div>

      </div>
    </EraSection>
  )
}
