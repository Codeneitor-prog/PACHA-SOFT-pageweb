'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Code } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface Project {
  id: string;
  title: string;
  category: string;
  url: string;
  tech: string[];
  result?: string;
}

interface ProjectsGridProps {
  projects: Project[];
  categories: string[];
}

export default function ProjectsGrid({ projects, categories }: ProjectsGridProps) {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  const filteredProjects = activeCategory === 'Todos' 
    ? projects 
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section className="container mx-auto px-6 mb-20 max-w-6xl">
      <div className="flex flex-col items-center mb-16">
        <h2 className="text-3xl font-black mb-8 tracking-tighter text-white">Directorio de Proyectos</h2>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-6 py-2.5 rounded-full text-xs font-bold tracking-[0.2em] transition-all uppercase border",
                activeCategory === category
                  ? 'bg-electric-4 border-electric-4 text-white shadow-[0_4px_15px_rgba(0,145,234,0.3)] shadow-[0_0_20px_rgba(0,229,255,0.4)]'
                  : 'bg-black/40 border border-white/10 text-gray-400 hover:text-white hover:border-electric-2/30'
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="card-glass-hover rounded-3xl overflow-hidden group flex flex-col h-[480px]"
            >
              <div 
                onMouseEnter={() => setHoveredProjectId(project.id)}
                className="relative h-60 bg-linear-to-br from-electric-6/20 to-black overflow-hidden flex items-center justify-center border-b border-white/5"
              >
                <div className="absolute inset-0 w-full h-full bg-[#050505] opacity-85 group-hover:opacity-95 transition-opacity duration-500 flex items-center justify-center">
                  {hoveredProjectId === project.id ? (
                    <iframe 
                      src={project.url} 
                      className="w-full h-full origin-top-left border-none" 
                      style={{ pointerEvents: 'none' }}
                      tabIndex={-1}
                      title={`Vista previa de ${project.title}`}
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Code size={32} className="text-electric-2/20" />
                      <span className="text-[10px] text-gray-600 uppercase tracking-widest">Pasa el mouse para ver</span>
                    </div>
                  )}
                </div>
                
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent pointer-events-none"></div>

                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm z-20">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                  >
                    <ExternalLink size={20} />
                  </a>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white/10 transition-transform duration-300"
                  >
                    <Code size={20} />
                  </a>
                </div>
              </div>

              <div className="p-8 grow flex flex-col justify-between">
                <div>
                  <span className="text-electric-2 text-xs font-bold uppercase tracking-wider mb-2 block">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-black text-white group-hover:text-electric-2 transition-colors mb-3 line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-light line-clamp-3">
                    {project.result || 'Proyecto web interactivo optimizado y desarrollado profesionalmente.'}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tech && project.tech.map((t: string) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 text-[10px] font-bold tracking-wider uppercase"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
