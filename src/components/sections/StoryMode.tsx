"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { AnimatedHeading } from "@/components/ui/AnimatedHeading"
import { StoryCard } from "@/components/ui/StoryCard"

export function StoryMode() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // A deep parallax background
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section 
      id="story-mode" 
      ref={ref}
      className="relative min-h-[150vh] w-full flex flex-col items-center bg-deep-space overflow-hidden py-32"
    >
      <motion.div 
        className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-midnight via-deep-space to-black opacity-80"
        style={{ y, opacity }}
      />
      
      <div className="relative z-10 w-full flex flex-col items-center gap-16 px-4">
        
        <AnimatedHeading 
          text="Live the History" 
          subtitle="Immersive Dining Scenarios"
          className="text-frost-white font-serif"
        />

        <div className="w-full max-w-4xl flex flex-col gap-8">
          <StoryCard 
            role="Roman Soldier"
            year="120 AD"
            location="Hadrian's Wall"
            description="You are shivering at the northern edge of the empire. The wind howls, but the smell of woodsmoke and roasting barley brings comfort."
            mealBreakdown="Your contubernium (tent group) shares a pot of 'puls'—a thick barley porridge laced with lard and a few scavenged local beans. If you're lucky, there's sour wine (posca) to wash it down."
            socialCustoms="You eat tightly packed with 7 other men in your tent. There are no tables. Food is survival, cooked over a small portable fire pit."
            environment="Cold, damp, smelling of wet wool and leather armor. The clinking of blacksmiths echoes in the distance."
            themeColor="rome"
          />

          <StoryCard 
            role="Noble Guest"
            year="1620 AD"
            location="Agra Palace"
            description="You have been invited to a royal banquet hosted by Emperor Jahangir. The air is thick with the scent of rosewater and burning oud."
            mealBreakdown="Servants bring silver platters of aromatic lamb biryani, gold-leaf covered kebabs, and rich saffron milk. You finish with falooda cooled by Himalayan ice."
            socialCustoms="You sit on the floor on Persian silk carpets. You eat strictly with your right hand, engaging in poetic conversation and never turning your back to the Emperor."
            environment="Lanterns cast intricate shadows through carved marble jali screens. Court musicians play the sitar softly in the courtyard."
            themeColor="mughal"
          />

          <StoryCard 
            role="Deep Space Botanist"
            year="2050 AD"
            location="Mars Colony Alpha"
            description="It has been 400 days since you left Earth. You are floating in the habitat module, monitoring the latest crop of radiation-resistant microgreens."
            mealBreakdown="Today is a 'luxury' day. You mix a packet of freeze-dried synthetic wagyu powder with hot water from the recycler, pairing it with fresh, hyper-crisp hydroponic kale."
            socialCustoms="Meals are highly regimented and monitored by the AI dietician. You eat while strapped to a wall-mounted station to prevent crumbs from damaging the air filters."
            environment="Humming life support systems, harsh LED spectrum lighting, and the absolute silence of the vacuum outside the reinforced glass."
            themeColor="space"
          />
        </div>
      </div>
    </section>
  )
}
