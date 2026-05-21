'use client';

import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Rocket, Shield, Zap, ChevronDown } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import TypingText from '@/components/TypingText';
import Counter from '@/components/Counter';

// Lazy load heavy components
const Portfolio3DCarousel = dynamic(() => import('@/components/Portfolio3DCarousel'), { ssr: false });
const Testimonials = dynamic(() => import('@/components/Testimonials'), { ssr: false });
const ProcessTimeline = dynamic(() => import('@/components/ProcessTimeline'), { ssr: false });
const ContactForm = dynamic(() => import('@/components/ContactForm'), { ssr: false });
const ResultsSection = dynamic(() => import('@/components/ResultsSection'), { ssr: false });

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [showContent, setShowContent] = useState(false);
  const showContentRef = useRef(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const hasScrolledRef = useRef(false);
  const frameCount = 150;

  useEffect(() => {
    // Precarga progresiva de imágenes
    const loadImages = async () => {
      const images: HTMLImageElement[] = [];
      
      // 1. Cargar el primer frame inmediatamente (prioritario para LCP)
      const firstImg = new Image();
      firstImg.src = `/frames/frame_0001.webp`;
      images[0] = firstImg;
      
      // 2. Cargar los siguientes 20 frames rápidamente
      for (let i = 2; i <= 20; i++) {
        const img = new Image();
        img.src = `/frames/frame_${i.toString().padStart(4, '0')}.webp`;
        images[i - 1] = img;
      }
      
      // 3. Cargar el resto de forma diferida en el background
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
    
    // Forzar redibujado en resize
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();

    // Dibujar la primera imagen cuando cargue
    if (imagesRef.current[0]) {
      imagesRef.current[0].onload = () => {
        updateCanvasSize();
      }
    }

    const renderLoop = () => {
      // --- LERP DE SUAVIZADO SIN REBOTES (OSCILACIONES) ---
      // Reemplazamos el modelo de física de resorte (que causaba rebotes y retrocesos molestos)
      // por una interpolación lineal de primer orden (LERP). Esto garantiza matemáticamente
      // cero sobreimpulso (overshoot) y una desaceleración perfectamente orgánica.
      const diff = targetFrame - currentFrame;
      currentFrame += diff * 0.12;
      
      // Auto-snap cuando está extremadamente cerca para evitar renders innecesarios
      if (Math.abs(targetFrame - currentFrame) < 0.01) {
        currentFrame = targetFrame;
      }
      
      // Limitar a los bounds del frame
      const frameIndex = Math.min(
        frameCount - 1,
        Math.max(0, Math.round(currentFrame))
      );
      
      const img = imagesRef.current[frameIndex];
      
      // Pintar en canvas como 'object-cover'
      if (img && img.complete && img.naturalWidth !== 0) {
        const needsResize = canvas.width !== window.innerWidth || canvas.height !== window.innerHeight;
        
        // OPTIMIZACIÓN: Solo redibujar si cambió el frame o el tamaño de la ventana
        if (frameIndex !== lastRenderedFrame || needsResize) {
          if (needsResize) {
            updateCanvasSize();
          }
          
          const hRatio = canvas.width / img.naturalWidth;
          const vRatio = canvas.height / img.naturalHeight;
          const ratio  = Math.max(hRatio, vRatio);
          
          const centerShift_x = (canvas.width - img.naturalWidth * ratio) / 2;
          const centerShift_y = (canvas.height - img.naturalHeight * ratio) / 2;
          
          // Desactivar el suavizado de imagen temporalmente durante el movimiento rápido puede mejorar FPS
          // ctx.imageSmoothingEnabled = Math.abs(velocity) < 2; 
          
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight,
                        centerShift_x, centerShift_y, img.naturalWidth * ratio, img.naturalHeight * ratio);
                        
          lastRenderedFrame = frameIndex;
        }
      }
      
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollDistance = container.offsetHeight - windowHeight;
      const scrolled = -rect.top;
      
      let progress = 0;
      if (scrolled >= 0 && scrolled <= scrollDistance) {
        progress = scrolled / scrollDistance;
      } else if (scrolled > scrollDistance) {
        progress = 1;
      } else {
        progress = 0;
      }

      // --- OPTIMIZACIÓN MÓVIL: Respuesta más rápida ---
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
      const sensitivity = isMobile ? 1.4 : 1; 
      const adjustedProgress = Math.min(1, progress * sensitivity);

      // Tiempo objetivo exacto basado en el progreso del scroll (0 a 149)
      targetFrame = adjustedProgress * (frameCount - 1);
      
      // Efecto de mostrar contenido (textos)
      const contentThreshold = isMobile ? 0.25 : 0.4;
      if (progress > contentThreshold && !showContentRef.current) {
        showContentRef.current = true;
        setShowContent(true);
      } else if (progress <= contentThreshold && showContentRef.current) {
        showContentRef.current = false;
        setShowContent(false);
      }

      // Efecto de desaparecer el indicador (la flecha)
      if (progress > 0.01 && !hasScrolledRef.current) {
        hasScrolledRef.current = true;
        setHasScrolled(true);
      } else if (progress <= 0.01 && hasScrolledRef.current) {
        hasScrolledRef.current = false;
        setHasScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    
    renderLoop();
    handleScroll(); // Trigger initial state
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  return (
    <div className="w-full flex flex-col pt-0">
      
      {/* Background Canvas (Fijo en toda la página, detrás de todo) */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full object-cover opacity-80 -z-20"
      />
      
      {/* Dark Overlay global para que los textos sean legibles */}
      <div className="fixed inset-0 bg-black/40 pointer-events-none -z-10"></div>

      {/* Hero Video Scrubbing Container */}
      <section ref={containerRef} className="h-[500vh] md:h-[800vh] relative w-full overflow-x-hidden">
        <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-center items-center text-center px-6 bg-transparent">

          <motion.div
            initial={{ opacity: 1, scale: 0.9 }}
            animate={{ opacity: hasScrolled ? 0 : 1, scale: hasScrolled ? 1.1 : 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 m-auto flex flex-col items-center justify-center text-electric-2 z-20 pointer-events-none drop-shadow-[0_0_20px_rgba(0,229,255,0.8)]"
          >
            <span className="text-xs md:text-base font-bold uppercase tracking-[0.3em] mb-4 text-glow">
              Desliza hacia abajo
            </span>
            <div className="p-2 md:p-3 rounded-full bg-electric-2/10 border border-electric-2/30 backdrop-blur-sm animate-bounce">
              <ChevronDown className="w-6 h-6 md:w-10 md:h-10 text-electric-2" />
            </div>
          </motion.div>

          <motion.div 
            className="max-w-5xl space-y-4 md:space-y-8 z-10 relative"
            initial={{ opacity: 0, y: 50 }}
            animate={{ 
              opacity: showContent ? 1 : 0, 
              y: showContent ? 0 : 50,
              pointerEvents: showContent ? 'auto' : 'none'
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
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
                href="https://wa.me/59171902857?text=Hola,%20quisiera%20solicitar%20una%20cotizaci%C3%B3n." 
                target="_blank" 
                rel="noopener noreferrer"
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
          </motion.div>
        </div>
      </section>

      {/* Stats Grid - Fondo de video congelado visible aquí */}
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

      {/* Wrap everything else in a translucent dark gradient to let the beautiful electric background bleed through */}
      <div className="relative z-20 bg-gradient-to-b from-black/60 via-[#010312]/80 to-[#000000]/95 backdrop-blur-3xl">
        {/* Process Section */}
      <ProcessTimeline />

      {/* Portfolio Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-electric-6/5 to-transparent"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20 space-y-6"
          >
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">NUESTRO PORTAFOLIO</h2>
            <p className="text-gray-400 tracking-wider font-light">Diseños corporativos que marcan la diferencia</p>
          </motion.div>
          <Portfolio3DCarousel />
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Benefits */}
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

      {/* Results Section */}
      <ResultsSection />

      {/* Contact Form Section */}
      <section className="py-32 px-6" id="contacto">
        <div className="container mx-auto text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">¿Listo para empezar?</h2>
          <p className="text-gray-400 tracking-wider font-light">Cuéntanos tu idea y la haremos realidad.</p>
        </div>
        <ContactForm />
      </section>

      {/* Final CTA */}
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
