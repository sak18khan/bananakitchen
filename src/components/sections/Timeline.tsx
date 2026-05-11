"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Lock, Sparkles, AlertCircle } from "lucide-react"
import { ERAS } from "@/lib/data/timeline"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !wrapperRef.current) return

    const sections = gsap.utils.toArray(".timeline-item")
    
    // Horizontal scrolling timeline
    const scrollTween = gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        end: () => `+=${containerRef.current?.offsetWidth || 0} * ${sections.length}`,
      }
    })

    // Animation for each node
    sections.forEach((section: any, i) => {
      gsap.fromTo(section.querySelector(".timeline-content"), 
        { opacity: 0, scale: 0.9, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            containerAnimation: scrollTween,
            start: "left center",
            end: "right center",
            scrub: true,
          }
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section 
      id="timeline" 
      ref={containerRef} 
      className="relative h-screen flex items-center overflow-hidden bg-black"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.05)_0%,transparent_100%)] z-0" />
      
      {/* Progress Line */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 -translate-y-1/2 z-0" />

      <div 
        ref={wrapperRef} 
        className="relative z-10 flex h-full items-center"
        style={{ width: `${ERAS.length * 100}vw` }}
      >
        {ERAS.map((era, index) => (
          <div 
            key={era.id} 
            className="timeline-item w-[100vw] h-full flex flex-col items-center justify-center relative group/era"
          >
            {/* Ambient Background Glow */}
            <div className={`absolute inset-0 bg-gradient-to-t ${era.color} opacity-10 md:opacity-20 mix-blend-screen pointer-events-none transition-opacity duration-1000 group-hover/era:opacity-40`} />
            
            <div className="timeline-content flex flex-col items-center text-center px-4 max-w-4xl mx-auto relative z-10">
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-[1px] bg-neon-blue/30" />
                <span className={cn(
                  "font-mono tracking-[0.4em] text-xs md:text-sm uppercase transition-colors",
                  era.status === 'locked' ? "text-white/20" : "text-neon-blue"
                )}>
                  {era.year}
                </span>
                <div className="w-12 h-[1px] bg-neon-blue/30" />
              </div>
              
              <h2 className={cn(
                "text-5xl md:text-8xl lg:text-9xl font-black mb-12 tracking-tighter transition-all duration-700 leading-none",
                era.status === 'locked' ? "text-white/5 group-hover/era:text-white/20" : "text-frost-white"
              )}>
                {era.title}
              </h2>

              {/* Status Indicator */}
              <div className="relative group cursor-pointer mb-12">
                <div className={cn(
                  "w-24 h-24 md:w-32 md:h-32 rounded-full border flex items-center justify-center backdrop-blur-md transition-all duration-700 relative",
                  era.status === 'locked' 
                    ? "border-white/5 bg-white/2" 
                    : "border-white/20 glass-morphism hover:border-neon-blue/50 group-hover:scale-110 shadow-[0_0_30px_rgba(56,189,248,0.1)]"
                )}>
                  {era.status === 'locked' ? (
                    <div className="flex flex-col items-center gap-2">
                      <Lock className="w-8 h-8 text-white/10" />
                    </div>
                  ) : (
                    <div className="relative">
                      <div className={`w-3 h-3 rounded-full bg-neon-blue animate-ping absolute inset-0 opacity-40`} />
                      <div className={`w-3 h-3 rounded-full bg-neon-blue relative z-10 shadow-[0_0_15px_#38bdf8]`} />
                    </div>
                  )}
                </div>

                {/* Info Tooltip for Locked Nodes */}
                {era.status === 'locked' && (
                  <div className="absolute top-full mt-6 left-1/2 -translate-x-1/2 w-64 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 pointer-events-none z-20">
                    <div className="glass-morphism p-4 rounded-2xl border border-white/10 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-soft-gold shrink-0 mt-0.5" />
                      <p className="text-xs font-mono text-white/40 leading-relaxed text-left">
                        {era.teaserText || "HISTORICAL FRAGMENT CORRUPTED. AUTHENTICATION REQUIRED."}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Teaser Content for Active Nodes */}
              {era.status !== 'locked' && (
                <p className="text-white/40 font-light tracking-widest text-xs uppercase max-w-xs mx-auto animate-pulse">
                  Scroll to discover
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Scroll indicator for timeline */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <span className="text-[9px] font-mono uppercase tracking-[0.5em]">Navigate History</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-neon-blue to-transparent" />
      </div>
    </section>
  )
}
