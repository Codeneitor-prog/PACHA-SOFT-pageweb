export const revalidate = 60;

import PageHero from '@/components/PageHero';
import PageCTA from '@/components/PageCTA';
import PricingSection from '@/components/PricingSection';
import ComparisonTable from '@/components/ComparisonTable';
import ServicesGrid from '@/components/ServicesGrid';
import ProcessSection from '@/components/ProcessSection';
import { supabase } from '@/lib/supabase';

async function getPricingData() {
  try {
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
  } catch (e) {
    console.error("Error fetching pricing data:", e);
    return {
      plans: [],
      features: [],
      settings: {
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
}

export default async function ServiciosPage() {
  const { plans, features, settings } = await getPricingData();

  return (
    <div className="relative py-20 pb-32">
      <PageHero 
        title="Soluciones"
        subtitle="Nuestros Servicios"
        highlight="Digitales Completas"
        description="Ofrecemos servicios integrales de desarrollo web, desde diseño hasta mantenimiento, para llevar tu negocio al siguiente nivel digital."
      />

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
      <PageCTA 
        title="¿Necesitas un Servicio"
        highlight="Personalizado?"
        description="Contáctanos y cuéntanos sobre tu proyecto. Crearemos una solución a medida diseñada específicamente para ti."
        buttonText="SOLICITAR COTIZACIÓN"
        whatsappMessage="Hola, me gustaría solicitar una cotización personalizada."
      />
    </div>
  );
}
