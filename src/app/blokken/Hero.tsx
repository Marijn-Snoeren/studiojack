"use client";
import React from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

export default function Hero() {
  // Varianten voor de container om de kinderen (h1 en p) na elkaar te laten verschijnen
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  // Varianten voor de individuele tekstelementen
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1], // Nu correct herkend als Cubic-bezier
      },
    },
  };

  return (
    /* min-h-screen zorgt voor de volledige hoogte.
       pt-24 (96px) compenseert voor de vaste header zodat de content niet te hoog staat.
    */
    <section className="min-h-screen w-full flex flex-col items-center justify-center px-8 bg-[#2A3233] pt-24 overflow-hidden">
      <motion.div 
        className="text-center flex-1 flex flex-col justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          variants={itemVariants}
          className="text-[48px] md:text-[48px] lg:text-[18vw] font-montserrat-black leading-none uppercase text-[#F0FFA0]"
        >
          JACK.
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="mt-8 text-[16px] font-raleway-regular uppercase tracking-[0.4em] text-white leading-relaxed"
        >
          Knippen voor jong en oud.
        </motion.p>
      </motion.div>

      {/* De pijl aan de onderkant met een subtiele zweef-animatie */}
      <motion.div 
        className="mb-12"
        initial={{ opacity: 0, y: -10 }}
        animate={{ 
          opacity: 1, 
          y: [0, 10, 0] 
        }}
        transition={{ 
          opacity: { delay: 1.5, duration: 1 },
          y: { 
            repeat: Infinity, 
            duration: 2, 
            ease: "easeInOut" 
          }
        }}
      >
        <ArrowUp className="rotate-180 text-[#F0FFA0]" size={24} />
      </motion.div>
    </section>
  );
}