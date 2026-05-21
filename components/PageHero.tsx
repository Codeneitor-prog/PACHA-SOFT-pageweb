'use client';

import { motion } from 'framer-motion';
import TypingText from '@/components/TypingText';

interface PageHeroProps {
  title: string;
  subtitle: string;
  highlight: string;
  description: string;
}

export default function PageHero({ title, subtitle, highlight, description }: PageHeroProps) {
  return (
    <section className="container mx-auto px-6 mb-20 max-w-6xl">
      <motion.div
        initial={{ filter: 'blur(10px)', opacity: 0, y: 30 }}
        animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.165, 0.84, 0.44, 1] }}
        className="text-center max-w-4xl mx-auto"
      >
        <span className="text-electric-2 font-medium text-sm uppercase tracking-[0.2em]">
          {subtitle}
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-7xl font-black mt-6 mb-8 tracking-tighter flex justify-center gap-2 sm:gap-4 flex-wrap">
          <span className="text-white">
            <TypingText text={title} className="inline-block" />
          </span>
          <span className="text-transparent bg-clip-text bg-linear-to-r from-electric-2 to-electric-4 text-glow py-2 inline-block">
            <TypingText text={highlight} delay={1} className="inline-block" />
          </span>
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed font-light">
          {description}
        </p>
      </motion.div>
    </section>
  );
}
