"use client"

import { motion, Variants } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedHeadingProps {
  text: string
  className?: string
  subtitle?: string
}

export function AnimatedHeading({ text, className, subtitle }: AnimatedHeadingProps) {
  const characters = Array.from(text)

  const containerVars: Variants = {
    initial: { opacity: 0 },
    whileInView: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.2
      }
    }
  }

  const childVars: Variants = {
    initial: { opacity: 0, y: 20, filter: "blur(8px)" },
    whileInView: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  }

  return (
    <div className="flex flex-col items-center text-center w-full z-10 relative px-4">
      <motion.h2 
        variants={containerVars}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        className={cn(
          "text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter flex flex-wrap justify-center overflow-hidden leading-none pb-2", 
          className
        )}
      >
        {characters.map((char, i) => (
          <motion.span
            key={i}
            variants={childVars}
            className={cn("inline-block whitespace-pre transition-colors", char === " " ? "w-[0.25em]" : "")}
          >
            {char}
          </motion.span>
        ))}
      </motion.h2>
      
      {subtitle && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-6 flex items-center gap-4"
        >
          <div className="w-8 h-[1px] bg-neon-blue/30 hidden md:block" />
          <p className="text-base md:text-lg font-mono tracking-[0.4em] uppercase text-white/40">
            {subtitle}
          </p>
          <div className="w-8 h-[1px] bg-neon-blue/30 hidden md:block" />
        </motion.div>
      )}
    </div>
  )
}
