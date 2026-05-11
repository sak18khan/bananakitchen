"use client"

import { motion } from "framer-motion"

export function Footer() {
  return (
    <footer className="relative w-full bg-black py-24 overflow-hidden border-t border-white/10">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-1 bg-gradient-to-r from-transparent via-neon-blue to-transparent opacity-50 blur-sm" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200vw] h-[200vw] max-w-4xl max-h-4xl bg-[radial-gradient(ellipse_at_top,_rgba(56,189,248,0.05),_transparent_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 flex flex-col items-center">
        
        {/* Quote */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center max-w-2xl mb-24"
        >
          <p className="text-2xl md:text-3xl font-serif text-frost-white/60 italic leading-relaxed">
            "Tell me what you eat, and I will tell you what you are."
          </p>
          <span className="block mt-4 text-xs tracking-widest uppercase text-neon-blue/80 font-mono">— Jean Anthelme Brillat-Savarin</span>
        </motion.div>

        {/* Timeline Motif */}
        <div className="w-full flex items-center justify-between mb-24 opacity-30">
          {["Rome", "Vikings", "Mughal", "Edo", "Space 2050"].map((era, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="text-[10px] uppercase tracking-widest hidden md:block">{era}</span>
            </div>
          ))}
          {/* Connecting line */}
          <div className="absolute left-4 right-4 h-[1px] bg-white/20 top-[60%] md:top-[40%] -z-10" />
        </div>

        {/* Links & Copyright */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/5 pt-8 text-sm font-mono text-white/40">
          <p>© {new Date().getFullYear()} Banana Kitchen. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-neon-blue transition-colors uppercase tracking-wider">Twitter</a>
            <a href="#" className="hover:text-neon-blue transition-colors uppercase tracking-wider">Instagram</a>
            <a href="#" className="hover:text-neon-blue transition-colors uppercase tracking-wider">GitHub</a>
          </div>
        </div>

      </div>
    </footer>
  )
}
