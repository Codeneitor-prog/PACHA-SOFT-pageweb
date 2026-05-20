import { motion } from 'framer-motion';
import TypingText from '@/components/TypingText';
import PricingSection from '@/components/PricingSection';
import ComparisonTable from '@/components/ComparisonTable';
import ServicesGrid from '@/components/ServicesGrid';
import ProcessSection from '@/components/ProcessSection';
import { supabase } from '@/lib/supabase';

async function getPricingData() {
  const { data: plans } = await supabase.from('pricing_plans').select('*').order('order_index', { ascending: true });
  const { data: features } = await supabase.from('comparison_features').select('*').order('order_index', { ascending: true });
  const { data: settings } = await supabase.from('pricing_settings').select('*').single();

  return {
    plans: plans || [],
    features: features || [],
    settings: settings || {
      pricing_header: 'Inversión Transparente',
      pricing_title: 'Elige el Plan Perfecto',
      pricing_subtitle: 'Pago flexible: 50% inicial y 50% al finalizar el proyecto.',
      comparison_title: 'Detalle de Características',
      comparison_col1: 'Característica',
      comparison_col2: 'Básico',
      comparison_col3: 'Estándar',
      comparison_col4: 'Premium'
    }
  };
}

export default async function ServiciosPage() {
  const { plans, features, settings } = await getPricingData();

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
            Nuestros Servicios
          </span>
          <h1 className="text-5xl md:text-7xl font-black mt-6 mb-8 tracking-tighter flex justify-center gap-4 flex-wrap">
            <span className="text-white">
              <TypingText text="Soluciones" className="inline-block" />
            </span>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-electric-2 to-electric-4 text-glow py-2 inline-block">
              <TypingText text="Digitales Completas" delay={1} className="inline-block" />
            </span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed font-light">
            Ofrecemos servicios integrales de desarrollo web, desde diseño hasta mantenimiento,
            para llevar tu negocio al siguiente nivel digital.
          </p>
        </motion.div>
      </section>

      {/* Pricing Plans */}
      <PricingSection plans={plans} settings={settings} />

      {/* Comparison Table */}
      <section className="container mx-auto px-6 mb-32 max-w-7xl">
        <ComparisonTable features={features} settings={settings} />
      </section>

      {/* Services Grid */}
      <ServicesGrid />

      {/* Process Section */}
      <ProcessSection />

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
              ¿Necesitas un Servicio <span className="text-transparent bg-clip-text bg-linear-to-r from-electric-2 to-electric-4">Personalizado?</span>
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto font-light">
              Contáctanos y cuéntanos sobre tu proyecto. Crearemos una solución a medida diseñada específicamente para ti.
            </p>
            <a href="https://wa.me/59171902857?text=Hola,%20me%20gustar%C3%ADa%20solicitar%20una%20cotizaci%C3%B3n%20personalizada." target="_blank" rel="noopener noreferrer">
              <button className="btn-primary flex items-center gap-3 mx-auto text-sm tracking-widest">
                SOLICITAR COTIZACIÓN
              </button>
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
