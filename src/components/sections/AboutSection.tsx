"use client"

import { motion } from "framer-motion"
import { AnimatedHeading } from "@/components/ui/AnimatedHeading"
import { BookOpen, Globe, Cpu, Clock, Utensils, History } from "lucide-react"

export function AboutSection() {
  const features = [
    {
      icon: Clock,
      title: "Chronological Engine",
      description: "A synchronized timeline spanning from the first controlled fire to speculative orbital nutrition in 2100 AD."
    },
    {
      icon: Globe,
      title: "Global Archives",
      description: "Deep-dive dossiers on national cuisines, tracing the migration of ingredients across empires and oceans."
    },
    {
      icon: History,
      title: "Evidence-Based",
      description: "Every era is backed by archaeological findings, ancient texts, and logistical records from historical archives."
    },
    {
      icon: Cpu,
      title: "Cinematic Simulation",
      description: "Immersive 3D environments and atmospheric soundscapes designed to transport you through time."
    }
  ]

  return (
    <section className="relative w-full bg-black py-32 overflow-hidden border-t border-white/5">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-blue/5 blur-[150px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-soft-gold/5 blur-[150px] translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          {/* Visual Side */}
          <div className="relative">
             <div className="relative rounded-[60px] overflow-hidden border border-white/10 aspect-[4/5]">
                <img 
                  src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=2000" 
                  className="w-full h-full object-cover grayscale brightness-75"
                  alt="Ancient Cooking"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                
                <div className="absolute bottom-12 left-12 right-12">
                   <div className="glass-morphism p-8 rounded-3xl border border-white/10 backdrop-blur-xl">
                      <p className="text-xl text-white font-light leading-relaxed italic">
                        "Food is the most profound fingerprint of our species. To eat is to engage with the collective history of our ancestors."
                      </p>
                      <div className="mt-6 flex items-center gap-3">
                         <div className="w-8 h-[1px] bg-neon-blue" />
                         <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-neon-blue">Mission Protocol</span>
                      </div>
                   </div>
                </div>
             </div>

             {/* Floating Badge */}
             <motion.div 
               animate={{ y: [0, -20, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -top-12 -right-12 w-48 h-48 rounded-full glass-morphism border border-white/10 flex flex-col items-center justify-center text-center p-6 backdrop-blur-2xl"
             >
                <Utensils className="w-8 h-8 text-neon-blue mb-2" />
                <span className="text-[9px] font-mono uppercase tracking-widest text-white/40">Established</span>
                <span className="text-sm font-bold text-white tracking-widest">ORIGIN ERA</span>
             </motion.div>
          </div>

          {/* Text Side */}
          <div className="space-y-12">
            <div>
               <div className="flex items-center gap-4 text-neon-blue font-mono mb-6">
                  <span className="text-xs uppercase tracking-[0.5em]">System Intelligence</span>
               </div>
               <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-8">
                 BEYOND THE<br/>PLATE.
               </h2>
               <p className="text-xl text-white/50 leading-relaxed font-light">
                 Banana Kitchen is a cinematic historical discovery engine. We map the evolution of humanity through the lens of agriculture, trade, and the culinary arts. 
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {features.map((feature, i) => (
                 <div key={i} className="space-y-4">
                    <div className="flex items-center gap-3">
                       <feature.icon className="w-5 h-5 text-neon-blue" />
                       <h4 className="text-sm font-bold text-white uppercase tracking-widest">{feature.title}</h4>
                    </div>
                    <p className="text-sm text-white/40 leading-relaxed">
                       {feature.description}
                    </p>
                 </div>
               ))}
            </div>

            <div className="pt-12 border-t border-white/10">
               <div className="flex items-center gap-8">
                  <div className="flex flex-col">
                     <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest mb-1">Civilizations</span>
                     <span className="text-3xl font-bold text-white">12+</span>
                  </div>
                  <div className="w-[1px] h-10 bg-white/10" />
                  <div className="flex flex-col">
                     <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest mb-1">Centuries</span>
                     <span className="text-3xl font-bold text-white">21+</span>
                  </div>
                  <div className="w-[1px] h-10 bg-white/10" />
                  <div className="flex flex-col">
                     <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest mb-1">Archived Sources</span>
                     <span className="text-3xl font-bold text-white">500+</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
