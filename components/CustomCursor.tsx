'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isDesktop, setIsDesktop] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const springDotX = useSpring(mouseX, { damping: 30, stiffness: 500 });
  const springDotY = useSpring(mouseY, { damping: 30, stiffness: 500 });

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth > 1024);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);
    };

    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', checkDesktop);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  if (!isDesktop) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-electric-2/50 pointer-events-none z-50 mix-blend-screen"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-electric-2 rounded-full pointer-events-none z-50 shadow-[0_0_10px_#00e5ff]"
        style={{
          x: springDotX,
          y: springDotY,
          left: 12,
          top: 12
        }}
      />
    </>
  );
}
