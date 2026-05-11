"use client"

import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { NewHero } from "@/components/sections/NewHero"
import { ChronologicalTimeline } from "@/components/sections/ChronologicalTimeline"
import { CountryExplorer } from "@/components/sections/CountryExplorer"
import { AboutSection } from "@/components/sections/AboutSection"
import { ScrollProvider } from "@/providers/ScrollProvider"
import { AtmosphereController } from "@/components/ui/AtmosphereController"
import { AudioController } from "@/components/ui/AudioController"
import { Footer } from "@/components/layout/Footer"
import { IndiaTimeline } from "@/components/sections/india/IndiaTimeline"

type ExperienceMode = "landing" | "timeline" | "countries" | "india-timeline"

export default function Home() {
  const [mode, setMode] = useState<ExperienceMode>("landing")

  // Handle browser back button or escape to return to landing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMode("landing")
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <ScrollProvider>
      <main className="flex min-h-screen flex-col bg-black selection:bg-neon-blue/30 selection:text-frost-white overflow-x-hidden relative">
        <AtmosphereController />
        <AudioController />

        <AnimatePresence mode="wait">
          {mode === "landing" && (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 1 }}
              className="flex flex-col"
            >
              <NewHero 
                onStartFromTime={() => setMode("timeline")} 
                onExploreCountries={() => setMode("countries")} 
              />
              <AboutSection />
              <Footer />
            </motion.div>
          )}

          {mode === "timeline" && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <ChronologicalTimeline onBack={() => setMode("landing")} />
            </motion.div>
          )}

          {mode === "countries" && (
            <motion.div
              key="countries"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <CountryExplorer 
                onBack={() => setMode("landing")} 
                onSelectIndia={() => setMode("india-timeline")}
              />
            </motion.div>
          )}

          {mode === "india-timeline" && (
            <motion.div
              key="india-timeline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <IndiaTimeline onBack={() => setMode("countries")} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </ScrollProvider>
  )
}
