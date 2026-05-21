'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { Rocket, Shield, Zap, ChevronDown } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import TypingText from '@/components/TypingText';
import Counter from '@/components/Counter';
import Portfolio3DCarousel from '@/components/Portfolio3DCarousel';
import Testimonials from '@/components/Testimonials';
import ProcessTimeline from '@/components/ProcessTimeline';
import ContactForm from '@/components/ContactForm';
import ResultsSection from '@/components/ResultsSection';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameCount = 150;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Animación del contenido: Aparece al 40% (0.4) y se queda visible (1) hasta el final (1.0).
  // Ya no desaparece hasta que la sección sticky termine naturalmente.
  const opacity = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]);
  const y = useTransform(scrollYProgress, [0.35, 0.45], [20, 0]);

  useEffect(() => {
    const loadImages = async () => {
      const images: HTMLImageElement[] = [];
      const firstImg = new Image();
      firstImg.src = `/frames/frame_0001.webp`;
      images[0] = firstImg;
      
      for (let i = 2; i <= 20; i++) {
        const img = new Image();
        img.src = `/frames/frame_${i.toString().padStart(4, '0')}.webp`;
        images[i - 1] = img;
      }
      
      setTimeout(() => {
        for (let i = 21; i <= frameCount; i++) {
          const img = new Image();
          img.src = `/frames/frame_${i.toString().padStart(4, '0')}.webp`;
          images[i - 1] = img;
        }
      }, 1000);
      imagesRef.current = images;
    };
    loadImages();
  }, []);

  useEffect(() => {
    let animationFrameId: number;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let targetFrame = 0;
    let currentFrame = 0;
    let lastRenderedFrame = -1;
    
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();

    const renderLoop = () => {
      const diff = targetFrame - currentFrame;
      currentFrame += diff * 0.12;
      if (Math.abs(targetFrame - currentFrame) < 0.01) currentFrame = targetFrame;
      
      const frameIndex = Math.min(frameCount - 1, Math.max(0, Math.round(currentFrame)));
      const img = imagesRef.current[frameIndex];
      
      if (img && img.complete) {
        if (frameIndex !== lastRenderedFrame) {
          const hRatio = canvas.width / img.naturalWidth;
          const vRatio = canvas.height / img.naturalHeight;
          const ratio  = Math.max(hRatio, vRatio);
          const centerShift_x = (canvas.width - img.naturalWidth * ratio) / 2;
          const centerShift_y = (canvas.height - img.naturalHeight * ratio) / 2;
          
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, centerShift_x, centerShift_y, img.naturalWidth * ratio, img.naturalHeight * ratio);
          lastRenderedFrame = frameIndex;
        }
      }
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const scrollDistance = container.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / scrollDistance));
      
      const isMobile = window.innerWidth < 768;
      targetFrame = progress * (frameCount - 1) * (isMobile ? 1.2 : 1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    renderLoop();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="w-full flex flex-col pt-0">
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full object-cover opacity-80 -z-20" />
      <div className="fixed inset-0 bg-black/40 pointer-events-none -z-10"></div>

      <section ref={containerRef} className="h-[300vh] md:h-[500vh] relative w-full overflow-x-hidden">
        <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-center items-center text-center px-6 bg-transparent">
          
          {/* TÍTULO HERO: ABSOLUTO PARA SOBREPONERSE A TODO */}
          <motion.div 
            style={{ opacity, y }}
            className="absolute inset-0 z-[100] flex flex-col justify-center items-center px-6"
          >
            <div className="max-w-5xl space-y-4 md:space-y-8">
              <h1 className="text-3xl sm:text-4xl md:text-8xl font-black text-white leading-[1.1] tracking-tighter drop-shadow-2xl flex flex-col items-center gap-2">
                <TypingText text="TRANSFORMA TU" className="inline-block" />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-electric-2 to-electric-4 text-glow py-1 md:py-2 inline-block">
                  <TypingText text="PRESENCIA DIGITAL" delay={1} className="inline-block" />
                </span>
              </h1>
              
              <p className="text-sm md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed font-light tracking-wide drop-shadow-lg px-4">
                Creamos experiencias web modernas y corporativas que impulsan tu negocio 
                con tecnología de vanguardia y diseño de alto impacto.
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-6 pt-8">
                <a 
                  href="#contacto"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <button className="btn-primary py-4 px-10 text-sm tracking-[0.2em] font-medium drop-shadow-lg hover:scale-105 transition-transform">
                    SOLICITAR COTIZACIÓN
                  </button>
                </a>
                <Link href="/portafolio">
                  <button className="relative group overflow-hidden py-4 px-10 rounded-full border border-electric-2/60 text-white text-sm tracking-[0.2em] font-medium transition-all duration-500 hover:border-electric-2 hover:bg-electric-2/10 backdrop-blur-sm">
                    <span className="relative z-10">VER PORTAFOLIO</span>
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-20 bg-black/10 backdrop-blur-md pt-20 pb-12 border-t border-white/5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl mx-auto px-6">
          {[
            { v: 50, s: '+', l: 'Proyectos Realizados' },
            { v: 98, s: '%', l: 'Clientes Satisfechos' },
            { v: 24, s: '/7', l: 'Soporte Especializado' },
            { v: 500, p: 'Bs ', l: 'Desde el Plan Básico' }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="card-glass-hover p-8 rounded-2xl flex flex-col items-center justify-center text-center gap-3 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-linear-to-b from-electric-2/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="text-4xl font-bold text-electric-2 tracking-tighter drop-shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                <Counter value={stat.v} prefix={stat.p} suffix={stat.s} />
              </div>
              <span className="text-xs text-gray-400 font-light uppercase tracking-[0.2em]">{stat.l}</span>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="relative z-20 bg-gradient-to-b from-black/60 via-[#010312]/80 to-[#000000]/95 backdrop-blur-3xl">
        <ProcessTimeline />
        <section className="py-32 relative">
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-electric-6/5 to-transparent"></div>
          <div className="container mx-auto px-6 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20 space-y-6">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">NUESTRO PORTAFOLIO</h2>
              <p className="text-gray-400 tracking-wider font-light">Diseños corporativos que marcan la diferencia</p>
            </motion.div>
            <Portfolio3DCarousel />
          </div>
        </section>
        <Testimonials />
        <section className="py-32">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { i: Rocket, t: 'Crecimiento Escalamiento', d: 'Optimizamos cada sección para que conviertas visitas en ventas y prospectos reales.' },
                { i: Zap, t: 'Performance Superior', d: 'Usamos tecnologías como Next.js para asegurar tiempos de carga y respuesta inmediatos.' },
                { i: Shield, t: 'Seguridad Empresarial', d: 'Protección avanzada, arquitectura sólida y certificados de seguridad integrados.' }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, duration: 0.8 }}
                  className="card-glass-hover p-10 rounded-4xl space-y-6 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-electric-2/10 flex items-center justify-center border border-electric-2/20 group-hover:bg-electric-2/20 transition-colors duration-500">
                    <item.i className="w-6 h-6 text-electric-2" />
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">{item.t}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-light">{item.d}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <ResultsSection />
        <section className="py-32 px-6" id="contacto">
          <div className="container mx-auto text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">¿Listo para empezar?</h2>
            <p className="text-gray-400 tracking-wider font-light">Cuéntanos tu idea y la haremos realidad.</p>
          </div>
          <ContactForm />
        </section>
        <section className="py-32 px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.165, 0.84, 0.44, 1] }}
            className="max-w-6xl mx-auto card-glass rounded-[3rem] p-16 md:p-24 flex flex-col items-center text-center gap-10 relative overflow-hidden"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-radial from-electric-6/20 to-transparent opacity-50 blur-[50px]"></div>
            <h2 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter z-10">
              ¿LISTO PARA EL <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-electric-2 to-electric-4">SIGUIENTE NIVEL?</span>
            </h2>
            <a href="https://wa.me/59171902857?text=Hola,%20estoy%20listo%20para%20iniciar%20un%20proyecto." target="_blank" rel="noopener noreferrer" className="z-10">
              <button className="btn-primary py-5 px-14 text-sm tracking-[0.2em]">
                INICIAR PROYECTO
              </button>
            </a>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
