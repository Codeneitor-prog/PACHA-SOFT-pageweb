'use client';

import { cn } from '@/lib/utils';

interface GlowTextProps {
  text: string;
  className?: string;
}

export default function GlowText({ text, className }: GlowTextProps) {
  return (
    <div className={cn("relative group inline-block", className)}>
      <span
        className="relative z-10 glow-text-pulse"
      >
        {text}
      </span>
      
      {/* Subtle Glitch Overlay - CSS only, activated on hover */}
      <span
        className="absolute inset-0 z-0 text-electric-2 opacity-0 group-hover:opacity-40 transition-opacity duration-300 glow-text-glitch"
        aria-hidden="true"
      >
        {text}
      </span>
    </div>
  );
}
