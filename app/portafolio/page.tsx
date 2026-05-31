export const revalidate = 60;

import Portfolio3DCarousel from '@/components/Portfolio3DCarousel';
import ProjectsGrid from '@/components/ProjectsGrid';
import PageHero from '@/components/PageHero';
import PageCTA from '@/components/PageCTA';
import { supabase } from '@/lib/supabase';

async function getPortfolioData() {
  try {
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
  } catch (e) {
    console.error("Error fetching portfolio data:", e);
    return {
      projects: [],
      categories: ['Todos']
    };
  }
}

export default async function PortafolioPage() {
  const { projects, categories } = await getPortfolioData();

  return (
    <div className="relative py-20 pb-32">
      <PageHero 
        title="Proyectos que"
        subtitle="Nuestro Portafolio"
        highlight="Transforman"
        description="Explora nuestros trabajos más destacados y descubre cómo hemos ayudado a empresas a alcanzar sus objetivos digitales con tecnología moderna."
      />

      {/* 3D Carousel Section */}
      <section className="mb-32 relative">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-electric-6/5 to-transparent pointer-events-none"></div>
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-8 tracking-tighter text-white">Casos de Éxito</h2>
          </div>
          <Portfolio3DCarousel />
        </div>
      </section>

      {/* Portfolio Grid - Server Side Data */}
      <ProjectsGrid projects={projects} categories={categories} />

      {/* CTA Section */}
      <PageCTA 
        title="¿Quieres construir el"
        highlight="Próximo Éxito?"
        description="Conversemos sobre tu visión. Nosotros nos encargamos del diseño elegante y la tecnología avanzada."
        buttonText="COMENZAR PROYECTO"
        whatsappMessage="Hola, quisiera comenzar un proyecto."
      />
    </div>
  );
}
