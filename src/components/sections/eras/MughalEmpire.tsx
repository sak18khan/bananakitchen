"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { EraSection } from "@/components/ui/EraSection"
import { AnimatedHeading } from "@/components/ui/AnimatedHeading"
import { ParticleOverlay } from "@/components/ui/ParticleOverlay"
import { FoodCard } from "@/components/ui/FoodCard"
import { DepthLayerNavigator, DepthLayer } from "@/components/ui/DepthLayerNavigator"
import { DiscoveryNode } from "@/components/ui/DiscoveryNode"

export function MughalEmpire() {
  const [activeLayer, setActiveLayer] = useState<DepthLayer>("elite")

  return (
    <EraSection id="mughal-empire" themeColor="mughal">
      <ParticleOverlay type="spice" count={80} />

      {/* Decorative Arch Silhouette Background */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none opacity-10">
         {/* Abstract geometric pattern */}
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-30 mix-blend-overlay" />
         
         <svg viewBox="0 0 100 100" className="w-[120vw] h-[120vw] absolute top-[-10vh] stroke-emerald-500/20 fill-none" strokeWidth="0.5">
           <path d="M 10 90 L 10 50 C 10 20, 50 10, 50 10 C 50 10, 90 20, 90 50 L 90 90" />
           <path d="M 20 90 L 20 50 C 20 30, 50 20, 50 20 C 50 20, 80 30, 80 50 L 80 90" />
           <path d="M 30 90 L 30 50 C 30 40, 50 30, 50 30 C 50 30, 70 40, 70 50 L 70 90" />
         </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center gap-12">
        
        <AnimatedHeading 
          text="Mughal Empire" 
          subtitle="1600 AD • The Royal Kitchens"
          className="text-emerald-400 drop-shadow-[0_0_20px_rgba(16,185,129,0.4)]"
        />

        <DepthLayerNavigator 
          activeLayer={activeLayer} 
          onChange={setActiveLayer} 
          eraTheme="mughal" 
        />

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="max-w-3xl text-center mb-12"
        >
          <p className="text-xl md:text-2xl font-light text-frost-white/80 leading-relaxed">
            A synthesis of Persian elegance and Indian spices. The Mughal emperors elevated cooking to a high art form, resulting in rich, complex dishes that defined luxury and sophisticated taste.
          </p>
        </motion.div>

        {/* Discovery Node */}
        <div className="absolute top-[30%] left-[5%]">
          <DiscoveryNode 
            title="The Ice Runners" 
            content="Mughal emperors loved chilled sherbet so much they had runners carry ice from the Himalayas all the way to Delhi and Agra."
            themeColor="mughal"
          />
        </div>

        {/* Food Cards */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          <FoodCard 
            title="Biryani"
            description="The crown jewel of Mughal cuisine. A fragrant, layered masterpiece of basmati rice, marinated meats, and complex spice blends."
            ingredients={["Basmati Rice", "Mutton", "Saffron", "Rose Water"]}
            socialClass="Royal Court"
            eraTheme="mughal"
            logicChain={{
              geography: "Vast fertile plains of North India for grain cultivation.",
              trade: "Imported saffron from Kashmir and rose water from Persia.",
              class: "A status symbol used in imperial banquets to showcase wealth."
            }}
          />
          <FoodCard 
            title="Nihari"
            description="A rich, slow-cooked stew consumed by the Nawabs in the early morning after Fajr prayers."
            ingredients={["Beef/Mutton", "Bone Marrow", "Garam Masala"]}
            socialClass="Nobility"
            eraTheme="mughal"
            logicChain={{
              climate: "Dense, oily stew provided energy during cool North Indian winters.",
              trade: "Complex spices (mace, nutmeg, cardamom) were the backbone of the empire's economy.",
              class: "Evolved from a working-class morning meal to a royal delicacy."
            }}
          />
          <FoodCard 
            title="Sheermal"
            description="A mildly sweet, saffron-flavored flatbread originating from Persian influences, baked in a tandoor."
            ingredients={["Maida Flour", "Milk", "Saffron", "Ghee"]}
            socialClass="All Classes"
            eraTheme="mughal"
            logicChain={{
              geography: "Adaptation of Central Asian bread-making to Indian tandoors.",
              trade: "Availability of quality dairy products enabled refined, rich doughs.",
              class: "A bridge between common staples and celebratory royal breads."
            }}
          />
        </div>

        {/* Food of the Emperors Subsection */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="w-full max-w-5xl mt-12 relative rounded-3xl border border-emerald-500/20 bg-midnight/50 backdrop-blur-md p-8 md:p-12 overflow-hidden"
        >
          <motion.div 
            className="absolute inset-0 bg-emerald-500/5 mix-blend-overlay"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <div className="relative z-10 text-center">
            <h3 className="text-3xl font-bold text-soft-gold mb-6 uppercase tracking-widest">Food of the Emperors</h3>
            <p className="text-frost-white/80 leading-relaxed max-w-2xl mx-auto mb-8 text-lg font-light">
              Emperor Akbar established a highly organized royal kitchen department (<i>Matbakh</i>). Food was served in gold and silver dishes tied in red cloths, escorted by guards. The royal tasters ensured safety, while the chefs pushed the boundaries of culinary extravagance.
            </p>
            
            <div className="flex justify-center gap-4 text-emerald-400">
              <span className="w-12 h-[1px] bg-emerald-400/50 self-center" />
              <span className="text-xl">✧</span>
              <span className="w-12 h-[1px] bg-emerald-400/50 self-center" />
            </div>
          </div>
        </motion.div>

      </div>
    </EraSection>
  )
}
