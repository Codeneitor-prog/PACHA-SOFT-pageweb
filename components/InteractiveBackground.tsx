'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  targetY: number;
  duration: number;
  startTime: number;
  opacity: number;
  size: number;
}

export default function InteractiveBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0, viewportHeight: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const updateDimensions = () => {
      if (!containerRef.current || !canvasRef.current) return;
      const parent = containerRef.current.parentElement;
      if (!parent) return;

      // Medimos el alto real del contenedor padre (que contiene todo el scroll)
      const rect = parent.getBoundingClientRect();
      const scrollHeight = parent.scrollHeight;
      
      setDimensions({
        width: rect.width,
        height: scrollHeight,
        viewportHeight: window.innerHeight
      });

      canvasRef.current.width = rect.width;
      canvasRef.current.height = scrollHeight;
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);
    if (containerRef.current?.parentElement) {
      resizeObserver.observe(containerRef.current.parentElement);
    }

    window.addEventListener('resize', updateDimensions);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.height === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: Particle[] = [];
    const particleCount = Math.min(Math.floor(dimensions.height / 40), 120);

    const createParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      targetY: Math.random() * -200 - 50,
      duration: (Math.random() * 8 + 5) * 1000,
      startTime: Date.now() + Math.random() * 5000,
      opacity: Math.random() * 0.4 + 0.2,
      // TAMAÑOS: Algunos pequeños y otros hasta 3 veces más grandes (aprox 4.5px - 6px)
      size: Math.random() < 0.25 ? Math.random() * 4 + 1.5 : Math.random() * 1.5 + 0.5
    });

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle());
    }

    let animationId: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = Date.now();

      particles.forEach((p) => {
        const elapsed = now - p.startTime;
        const progress = (elapsed % p.duration) / p.duration;
        const currentY = p.y + (p.targetY * progress);
        const currentOpacity = Math.sin(progress * Math.PI) * p.opacity;

        ctx.beginPath();
        ctx.arc(p.x, currentY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 229, 255, ${currentOpacity})`;
        ctx.shadowBlur = p.size * 2;
        ctx.shadowColor = 'rgba(0, 229, 255, 0.8)';
        ctx.fill();
      });

      animationId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationId);
  }, [dimensions.width, dimensions.height]);

  const parallaxX = useTransform(smoothX, [0, dimensions.width || 1000], [-15, 15]);
  const parallaxY = useTransform(smoothY, [0, dimensions.viewportHeight || 1000], [-15, 15]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#000000]">
      {/* Fondo base - ABSOLUTO inset-0 rellena el padre relative */}
      <div 
        className="absolute inset-0" 
        style={{
          background: 'radial-gradient(circle at 50% 20%, #000a1a 0%, #000000 60%, #000000 100%)'
        }}
      />
      
      {/* Grid 3D - FIJO para efecto horizonte */}
      <div className="fixed inset-0 overflow-hidden flex justify-center items-end" style={{ perspective: '800px' }}>
        <motion.div 
          className="absolute w-[300vw] h-[200vh] origin-bottom opacity-20"
          style={{
            backgroundImage: 'linear-gradient(rgba(0, 229, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 255, 0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            transform: 'rotateX(75deg) translateY(10%)',
            maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 60%)',
            WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 60%)',
          }}
          animate={{
            backgroundPosition: ["0px 0px", "0px 60px"]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Canvas de partículas - ABSOLUTO cubriendo todo el alto medido */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Glows decorativos - ABSOLUTOS para que se muevan con el scroll */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[45rem] h-[45rem] rounded-full flex items-center justify-center top-[10%] left-[-15%]"
          style={{ x: parallaxX, y: parallaxY }}
        >
          <div className="absolute w-[5rem] h-[5rem] bg-white rounded-full blur-[20px] opacity-20" />
          <div className="absolute w-[15rem] h-[15rem] bg-[#00e5ff] rounded-full blur-[60px] opacity-40" />
          <div className="absolute inset-0 bg-[#0091ea] rounded-full blur-[120px] opacity-20" />
        </motion.div>

        <motion.div
          className="absolute w-[55rem] h-[55rem] rounded-full flex items-center justify-center top-[60%] right-[-20%]"
          style={{ x: parallaxX, y: parallaxY }}
        >
          <div className="absolute w-[6rem] h-[6rem] bg-white rounded-full blur-[25px] opacity-15" />
          <div className="absolute w-[20rem] h-[20rem] bg-[#00e5ff] rounded-full blur-[80px] opacity-30" />
          <div className="absolute inset-0 bg-[#021abd] rounded-full blur-[140px] opacity-20" />
        </motion.div>

        <motion.div 
          className="absolute w-[120vw] h-[120vw] border-t-[1px] border-[#00e5ff] rounded-full opacity-30 blur-[1px] top-[5%] left-[-10%]"
          style={{ x: parallaxX }}
          animate={{ rotate: [0, 5, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
