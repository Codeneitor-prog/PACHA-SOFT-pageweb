'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Code2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';

const categories = ["Todos", "Sistema Web", "Landing Eventos", "E-Commerce", "Restaurante", "Inmobiliaria"];

function TiltCard({ children, isCenter }: { children: React.ReactNode, isCenter: boolean }) {
  // OPTIMIZACIÓN: Se eliminó el tracking 3D del mouse (rotateX/Y) ya que los iframes 
  // causan lag severo al re-renderizar transformaciones continuas. 
  // En su lugar, usamos una escala suave al hacer hover.
  return (
    <motion.div
      whileHover={isCenter ? { scale: 1.02, y: -5 } : {}}
      transition={{ duration: 0.3, ease: "easeOut" }}
      style={{
        willChange: isCenter ? "transform" : "auto", 
      }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}

export default function Portfolio3DCarousel() {
  const [portfolioItems, setPortfolioItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("Todos");

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('archived', false)
        .order('created_at', { ascending: true });
      
      if (!error && data) {
        setPortfolioItems(data);
      }
      setLoading(false);
    }
    fetchProjects();
  }, []);

  const filteredItems = useMemo(() => {
    if (activeCategory === "Todos") return portfolioItems;
    return portfolioItems.filter(item => item.category === activeCategory);
  }, [activeCategory, portfolioItems]);

  const items = filteredItems.length > 0 ? filteredItems : [];
  const safeIndex = currentIndex >= items.length ? 0 : currentIndex;

  const handleNext = () => items.length > 0 && setCurrentIndex((prev) => (prev + 1) % items.length);
  const handlePrev = () => items.length > 0 && setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);

  // Navegación por teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (items.length === 0) return;
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [items.length]); // se usa closure con el estado previo dentro de handlePrev/Next

  if (loading) {
    return (
      <div className="py-32 flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-electric-2 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-400 font-light tracking-widest text-xs uppercase animate-pulse">Cargando portafolio...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="relative w-full flex flex-col items-center py-10 px-6">
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setCurrentIndex(0);
              }}
              className={cn(
                "px-6 py-2.5 rounded-full text-xs font-bold tracking-[0.2em] transition-all uppercase border",
                activeCategory === cat 
                  ? "bg-electric-2 border-electric-2 text-black shadow-[0_0_20px_rgba(0,229,255,0.4)]" 
                  : "border-white/10 text-gray-400 hover:border-electric-2/50 hover:text-white"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="card-glass p-12 rounded-4xl text-center max-w-lg w-full border border-white/5">
          <p className="text-gray-400 font-light">No hay proyectos públicos en esta categoría en este momento.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full flex flex-col items-center py-10">
      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-16 px-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setCurrentIndex(0);
            }}
            className={cn(
              "px-6 py-2.5 rounded-full text-xs font-bold tracking-[0.2em] transition-all uppercase border",
              activeCategory === cat 
                ? "bg-electric-2 border-electric-2 text-black shadow-[0_0_20px_rgba(0,229,255,0.4)]" 
                : "border-white/10 text-gray-400 hover:border-electric-2/50 hover:text-white"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="relative w-full max-w-[1400px] h-[500px] md:h-[650px] flex items-center justify-center group" style={{ perspective: '2000px' }}>
        
        {/* Navigation Buttons: REPOSICIONADOS A LOS LADOS */}
        <button 
          onClick={handlePrev} 
          className="absolute left-4 md:left-12 z-50 p-4 rounded-full card-glass hover:bg-electric-2/10 hover:border-electric-2/50 text-white transition-all active:scale-95 opacity-50 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100"
          aria-label="Anterior"
        >
          <ChevronLeft size={24} className="hover:-translate-x-1 transition-transform" />
        </button>

        <button 
          onClick={handleNext} 
          className="absolute right-4 md:right-12 z-50 p-4 rounded-full card-glass hover:bg-electric-2/10 hover:border-electric-2/50 text-white transition-all active:scale-95 opacity-50 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100"
          aria-label="Siguiente"
        >
          <ChevronRight size={24} className="hover:translate-x-1 transition-transform" />
        </button>

        <AnimatePresence mode="sync">
          {items.map((item, index) => {
            const diff = (index - safeIndex + items.length) % items.length;
            const isCenter = diff === 0;
            const isLeft = items.length > 1 && diff === items.length - 1;
            const isRight = items.length > 1 && diff === 1;

            if (!isCenter && !isLeft && !isRight) return null;

            let x: string | number = 0;
            let z = 0;
            let rotateY = 0;
            let opacity = 1;
            let scale = 1;
            let zIndex = 0;

            if (isLeft) { x = '-45%'; z = -200; rotateY = 25; opacity = 0.4; scale = 0.8; zIndex = 1; }
            else if (isRight) { x = '45%'; z = -200; rotateY = -25; opacity = 0.4; scale = 0.8; zIndex = 1; }
            else if (isCenter) { x = '0%'; z = 100; rotateY = 0; opacity = 1; scale = 1.05; zIndex = 10; }

            return (
              <motion.div
                key={item.id}
                animate={{ x, z, rotateY, opacity, scale, zIndex }}
                transition={{ duration: 0.5, ease: [0.165, 0.84, 0.44, 1] }}
                className="absolute w-[320px] sm:w-[500px] md:w-[700px] lg:w-[800px] aspect-16/10"
                style={{ pointerEvents: isCenter ? 'auto' : 'none' }}
              >
                <TiltCard isCenter={isCenter}>
                  <div className={cn(
                    "w-full h-full rounded-4xl overflow-hidden card-glass group/card relative",
                    isCenter ? 'border-electric-2/50 shadow-[0_0_60px_rgba(0,229,255,0.25)] ring-1 ring-electric-2/50' : 'bg-black/80 border-white/10'
                  )}>
                    {/* Live Preview Iframe */}
                    {/* OPTIMIZACIÓN EXTREMA: Solo cargar el iframe si es el elemento central. 
                        Esto ahorra gigabytes de transferencia de datos y ciclos de CPU. */}
                    <div className="absolute inset-0 w-full h-full bg-[#050505] opacity-90 group-hover/card:opacity-100 transition-opacity flex items-center justify-center">
                      {isCenter ? (
                        <iframe 
                          src={item.url} 
                          className="w-full h-full origin-top-left border-none" 
                          style={{ pointerEvents: 'none' }}
                          tabIndex={-1}
                          loading="lazy"
                          title={`Vista previa de ${item.title}`}
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-4 text-center p-10">
                          <div className="w-16 h-16 rounded-full border-2 border-electric-2/20 flex items-center justify-center animate-pulse">
                            <Code2 className="text-electric-2/40 w-8 h-8" />
                          </div>
                          <p className="text-gray-500 text-xs tracking-widest uppercase font-light">Desliza para ver proyecto</p>
                        </div>
                      )}
                    </div>
                    
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent pointer-events-none"></div>

                    {/* Content */}
                    <div className={cn(
                      "absolute inset-0 w-full p-6 md:p-10 flex flex-col justify-end items-start text-left z-10 transition-all duration-500",
                      isCenter ? "opacity-100" : "opacity-0"
                    )}>
                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-2 mb-4 translate-y-4 group-hover/card:translate-y-0 opacity-0 group-hover/card:opacity-100 transition-all duration-500 delay-100">
                        {item.tech.map((t: string) => (
                          <span key={t} className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold text-white border border-white/10 flex items-center gap-1.5">
                            <Code2 size={10} className="text-electric-2" /> {t}
                          </span>
                        ))}
                      </div>

                      <p className="text-electric-2 text-xs md:text-sm font-bold uppercase tracking-[0.3em] mb-1">{item.category}</p>
                      <h3 className="text-white text-xl md:text-4xl font-black tracking-tight mb-2 drop-shadow-md">{item.title}</h3>
                      <p className="text-gray-300 text-sm font-light mb-6 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500">{item.result}</p>
                      
                      <div className="mt-2 flex gap-4 translate-y-8 group-hover/card:translate-y-0 opacity-0 group-hover/card:opacity-100 transition-all duration-500 delay-200">
                        <a 
                          href={item.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center gap-3 bg-electric-2 text-black px-6 py-3 rounded-full font-bold text-xs md:text-sm tracking-widest hover:bg-white transition-all relative z-50 shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:scale-105 active:scale-95"
                          style={{ pointerEvents: 'auto' }}
                        >
                          VER EN VIVO <ExternalLink size={16} />
                        </a>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

