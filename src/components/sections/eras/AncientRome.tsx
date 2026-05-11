"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { EraSection } from "@/components/ui/EraSection"
import { AnimatedHeading } from "@/components/ui/AnimatedHeading"
import { ParticleOverlay } from "@/components/ui/ParticleOverlay"
import { FoodCard } from "@/components/ui/FoodCard"
import { DepthLayerNavigator, DepthLayer } from "@/components/ui/DepthLayerNavigator"
import { RomanTentScene } from "@/components/sections/eras/scenes/RomanTentScene"
import { Play } from "lucide-react"

export function AncientRome() {
  const [activeLayer, setActiveLayer] = useState<DepthLayer>("elite")
  const [isSceneOpen, setIsSceneOpen] = useState(false)

  return (
    <>
      <EraSection id="ancient-rome" themeColor="rome">
        <ParticleOverlay type="dust" count={60} />
        
        {/* Giant faded typography */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none opacity-5">
          <span className="text-[25vw] font-black tracking-tighter text-soft-gold">SPQR</span>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full flex flex-col items-center gap-12">
          
          <AnimatedHeading 
            text="Ancient Rome" 
            subtitle="120 AD • The Empire's Table"
            className="text-soft-gold drop-shadow-[0_0_20px_rgba(234,179,8,0.3)]"
          />

          <DepthLayerNavigator 
            activeLayer={activeLayer} 
            onChange={setActiveLayer} 
            eraTheme="rome" 
          />

          {/* Narrative Block */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="max-w-3xl text-center mb-12"
          >
            <p className="text-xl md:text-2xl font-light text-frost-white/80 leading-relaxed">
              In the heart of the empire, dining was a display of power. While the plebeians relied on the grain dole, patricians hosted extravagant feasts featuring exotic meats and the ever-present, pungent fish sauce known as garum.
            </p>
          </motion.div>

          {/* Rich vs Poor Comparison / Food Cards */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            <FoodCard 
              title="Garum"
              description="The ubiquitous umami flavor bomb of Rome. A fermented fish sauce that was added to almost every patrician dish."
              ingredients={["Fermented Fish", "Salt", "Herbs", "Sunlight"]}
              socialClass="Patrician & Plebeian"
              eraTheme="rome"
              logicChain={{
                geography: "Abundant Mediterranean coastline for fishing.",
                trade: "Mass-produced in factories in Spain and shipped in amphorae across the empire.",
                class: "Lower classes ate cheap garum; the elite imported 'garum sociorum' (premium)."
              }}
            />
            <FoodCard 
              title="Panis Quadratus"
              description="The staple bread of Rome, scored into eight slices before baking. Found perfectly preserved in the ruins of Pompeii."
              ingredients={["Spelt Wheat", "Water", "Salt", "Sourdough Starter"]}
              socialClass="Plebeian"
              eraTheme="rome"
            />
            <FoodCard 
              title="Stuffed Dormice"
              description="A luxury appetizer served at elite banquets. Plumped up in special jars called gliraria before being roasted and dipped in honey."
              ingredients={["Dormouse", "Pork minced", "Pine nuts", "Honey"]}
              socialClass="Patrician"
              eraTheme="rome"
            />
          </div>

          {/* Interactive Cinematic Scene Trigger */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full max-w-5xl mt-12 group cursor-pointer"
            onClick={() => setIsSceneOpen(true)}
          >
            <div className="relative rounded-3xl border border-soft-gold/20 bg-midnight/50 backdrop-blur-md p-8 md:p-12 overflow-hidden transition-all duration-500 hover:border-soft-gold/60 hover:shadow-[0_0_50px_rgba(234,179,8,0.2)]">
              {/* Subtle firelight flicker background */}
              <motion.div 
                className="absolute inset-0 bg-soft-gold/5 mix-blend-overlay group-hover:bg-soft-gold/10 transition-colors"
                animate={{ opacity: [0.5, 0.8, 0.4, 0.7] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <span className="text-soft-gold/60 font-mono tracking-widest text-sm uppercase mb-4 block">Interactive Memory</span>
                <h3 className="text-4xl md:text-5xl font-bold text-frost-white mb-6 tracking-tight">You Are A Roman Soldier</h3>
                <p className="text-frost-white/70 leading-relaxed max-w-2xl mb-8">
                  Step inside a legionary tent on the eve of battle. Discover how logistics, preserved rations, and simple porridge forged the greatest military machine of antiquity.
                </p>
                <div className="w-16 h-16 rounded-full bg-soft-gold text-midnight flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <Play className="w-6 h-6 ml-1" />
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </EraSection>

      <RomanTentScene isOpen={isSceneOpen} onClose={() => setIsSceneOpen(false)} />
    </>
  )
}
