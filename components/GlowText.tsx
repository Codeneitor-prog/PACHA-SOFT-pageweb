'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlowTextProps {
  text: string;
  className?: string;
}

export default function GlowText({ text, className }: GlowTextProps) {
  return (
    <div className={cn("relative group inline-block", className)}>
      <motion.span
        className="relative z-10"
        animate={{
          textShadow: [
            "0 0 10px rgba(0, 229, 255, 0.3)",
            "0 0 20px rgba(0, 229, 255, 0.6)",
            "0 0 10px rgba(0, 229, 255, 0.3)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.span>
      
      {/* Subtle Glitch Overlay */}
      <motion.span
        className="absolute inset-0 z-0 text-electric-2 opacity-0 group-hover:opacity-40"
        animate={{
          x: [-2, 2, -1, 1, 0],
          y: [1, -1, 2, -2, 0],
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
      >
        {text}
      </motion.span>
    </div>
  );
}
