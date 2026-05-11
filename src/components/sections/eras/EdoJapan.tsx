"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { EraSection } from "@/components/ui/EraSection"
import { AnimatedHeading } from "@/components/ui/AnimatedHeading"
import { ParticleOverlay } from "@/components/ui/ParticleOverlay"
import { FoodCard } from "@/components/ui/FoodCard"
import { DepthLayerNavigator, DepthLayer } from "@/components/ui/DepthLayerNavigator"
import { DiscoveryNode } from "@/components/ui/DiscoveryNode"

export function EdoJapan() {
  const [activeLayer, setActiveLayer] = useState<DepthLayer>("common")

  return (
    <EraSection id="edo-japan" themeColor="edo">
      <ParticleOverlay type="sakura" count={40} />

      {/* Japanese Paper Texture Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/rice-paper-2.png')] mix-blend-overlay z-0" />

      {/* Minimal Water Ripple Overlay (Abstract) */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(244,63,94,0.05) 0%, transparent 60%)"
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center gap-12">
        
        <AnimatedHeading 
          text="Edo Japan" 
          subtitle="1750 AD • The Dawn of Modern Sushi"
          className="text-rose-300 drop-shadow-[0_0_20px_rgba(244,63,94,0.3)] font-serif"
        />

        <DepthLayerNavigator 
          activeLayer={activeLayer} 
          onChange={setActiveLayer} 
          eraTheme="edo" 
        />

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="max-w-3xl text-center mb-12"
        >
          <p className="text-xl md:text-2xl font-light text-frost-white/80 leading-relaxed tracking-wide">
            A time of peace and isolation. The bustling streets of Edo (modern Tokyo) gave birth to fast food culture. Sushi evolved from fermented preservation into fresh, hand-pressed nigiri.
          </p>
        </motion.div>

        {/* Discovery Node */}
        <div className="absolute bottom-[20%] left-[10%]">
          <DiscoveryNode 
            title="The Soy Sauce Revolution" 
            content="During the Edo period, soy sauce was refined and became the essential 'umami' engine of Japanese cooking, replacing fermented fish as the primary seasoning."
            themeColor="edo"
            position="top"
          />
        </div>

        {/* Food Cards */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          <FoodCard 
            title="Edo-mae Sushi"
            description="The original 'fast food'. Fresh fish caught in Tokyo Bay, marinated in soy sauce, and pressed over seasoned rice."
            ingredients={["Vinegared Rice", "Fresh Tuna", "Soy Sauce", "Wasabi"]}
            socialClass="All Classes"
            eraTheme="edo"
            logicChain={{
              geography: "Proximity to the rich fishing grounds of Tokyo Bay.",
              trade: "Inland salt production enabled the vinegar-curing process.",
              class: "Started as a street food for commoners before being adopted by samurai."
            }}
          />
          <FoodCard 
            title="Soba Noodles"
            description="Buckwheat noodles served hot or cold. A popular, affordable meal sold from portable stalls late into the night."
            ingredients={["Buckwheat Flour", "Dashi Broth", "Soy Sauce", "Scallions"]}
            socialClass="Commoner"
            eraTheme="edo"
            logicChain={{
              climate: "Buckwheat grows better in the cooler, rugged terrain of the Kanto region.",
              class: "Considered more 'urban' and sophisticated than rice by Edo commoners.",
              trade: "The 'Yatai' stall culture created the world's first modern dining economy."
            }}
          />
          <FoodCard 
            title="Miso Soup"
            description="The comforting foundation of the Japanese meal, providing essential protein and probiotics."
            ingredients={["Miso Paste", "Dashi", "Tofu", "Wakame"]}
            socialClass="All Classes"
            eraTheme="edo"
          />
          <FoodCard 
            title="Tempura"
            description="Introduced by the Portuguese, the Japanese refined this deep-frying technique using lighter batters."
            ingredients={["Shrimp/Vegetables", "Flour", "Ice Water", "Sesame Oil"]}
            socialClass="All Classes"
            eraTheme="edo"
          />
        </div>

      </div>
    </EraSection>
  )
}
