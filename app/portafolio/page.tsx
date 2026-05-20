import { motion } from 'framer-motion';
import Portfolio3DCarousel from '@/components/Portfolio3DCarousel';
import TypingText from '@/components/TypingText';
import ProjectsGrid from '@/components/ProjectsGrid';
import { supabase } from '@/lib/supabase';

async function getPortfolioData() {
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .eq('archived', false)
    .order('created_at', { ascending: false });

  const categoriesSet = new Set(projects?.map((p) => p.category) || []);
  const categories = ['Todos', ...Array.from(categoriesSet)];

  return {
    projects: projects || [],
    categories
  };
}

export default async function PortafolioPage() {
  const { projects, categories } = await getPortfolioData();

  return (
    <div className="relative py-20 pb-32">
      {/* Hero Section */}
      <section className="container mx-auto px-6 mb-20 max-w-6xl">
        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0, y: 30 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.165, 0.84, 0.44, 1] }}
          className="text-center max-w-4xl mx-auto"
        >
          <span className="text-electric-2 font-medium text-sm uppercase tracking-[0.2em]">
            Nuestro Portafolio
          </span>
          <h1 className="text-5xl md:text-7xl font-black mt-6 mb-8 tracking-tighter flex justify-center gap-4 flex-wrap">
            <span className="text-white">
              <TypingText text="Proyectos que" className="inline-block" />
            </span>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-electric-2 to-electric-4 text-glow py-2 inline-block">
              <TypingText text="Transforman" delay={1} className="inline-block" />
            </span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed font-light">
            Explora nuestros trabajos más destacados y descubre cómo hemos ayudado
            a empresas a alcanzar sus objetivos digitales con tecnología moderna.
          </p>
        </motion.div>
      </section>

      {/* 3D Carousel Section */}
      <section className="mb-32 relative">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-electric-6/5 to-transparent pointer-events-none"></div>
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.165, 0.84, 0.44, 1] }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-black mb-8 tracking-tighter text-white">Casos de Éxito</h2>
          </motion.div>
          <Portfolio3DCarousel />
        </div>
      </section>

      {/* Portfolio Grid - Server Side Data */}
      <ProjectsGrid projects={projects} categories={categories} />

      {/* CTA Section */}
      <section className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.165, 0.84, 0.44, 1] }}
          className="card-glass rounded-[3rem] p-16 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-radial from-electric-4/10 to-transparent pointer-events-none"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter text-white">
              ¿Quieres construir el <span className="text-transparent bg-clip-text bg-linear-to-r from-electric-2 to-electric-4">Próximo Éxito?</span>
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto font-light">
              Conversemos sobre tu visión. Nosotros nos encargamos del diseño elegante y la tecnología avanzada.
            </p>
            <a href="https://wa.me/59171902857?text=Hola,%20quisiera%20comenzar%20un%20proyecto." target="_blank" rel="noopener noreferrer">
              <button className="btn-primary">
                COMENZAR PROYECTO
              </button>
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
