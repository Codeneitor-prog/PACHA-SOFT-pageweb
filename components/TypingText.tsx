'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface TypingTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function TypingText({ text, className, delay = 0 }: TypingTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true });

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 250,
      },
    },
    hidden: {
      opacity: 0,
      y: 15,
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 250,
      },
    },
  };

  // Split by words instead of characters to reduce DOM nodes drastically
  const words = text.split(" ");

  return (
    <motion.p
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {words.map((word, index) => (
        <motion.span key={index} variants={child} style={{ display: 'inline-block' }}>
          {word}{index < words.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </motion.p>
  );
}
