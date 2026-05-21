'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Target, BarChart3 } from 'lucide-react';
import Counter from './Counter';

const results = [
  {
    icon: TrendingUp,
    value: 340,
    suffix: "%",
    label: "Incremento en Tráfico",
    description: "Promedio de crecimiento en visitas mensuales tras el relanzamiento."
  },
  {
    icon: Users,
    value: 85,
    suffix: "%",
    label: "Retención de Clientes",
    description: "Mejora en la tasa de retorno gracias a una experiencia de usuario optimizada."
  },
  {
    icon: Target,
    value: 120,
    suffix: "%",
    label: "Tasa de Conversión",
    description: "Aumento en leads y ventas directas reportado por nuestros clientes."
  },
  {
    icon: BarChart3,
    value: 50,
    suffix: "+",
    label: "Modelos de Negocio",
    description: "Soluciones personalizadas para diversos sectores en Bolivia."
  }
];

export default function ResultsSection() {
  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 space-y-8"
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight">
              RESULTADOS <span className="text-transparent bg-clip-text bg-linear-to-r from-electric-2 to-electric-4">QUE SE NOTAN</span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed">
              No solo creamos páginas bonitas; construimos herramientas de alto rendimiento 
              diseñadas para cumplir objetivos comerciales reales.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
              <div className="card-glass p-6 rounded-3xl border-l-4 border-l-electric-2">
                <p className="text-white font-bold mb-2">Antes</p>
                <p className="text-gray-500 text-sm italic">Sitios lentos, no responsivos y con baja conversión.</p>
              </div>
              <div className="card-glass p-6 rounded-3xl border-l-4 border-l-electric-4">
                <p className="text-white font-bold mb-2">Después</p>
                <p className="text-gray-500 text-sm italic">Carga instantánea, diseño premium y flujo de ventas optimizado.</p>
              </div>
            </div>
          </motion.div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {results.map((res, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-glass-hover p-8 rounded-[2.5rem] space-y-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-electric-2/10 flex items-center justify-center border border-electric-2/20 group-hover:scale-110 transition-transform">
                  <res.icon className="w-6 h-6 text-electric-2" />
                </div>
                <div className="space-y-1">
                  <div className="text-4xl font-black text-white">
                    <Counter value={res.value} suffix={res.suffix} />
                  </div>
                  <p className="text-electric-2 text-sm font-bold tracking-widest uppercase">{res.label}</p>
                </div>
                <p className="text-gray-500 text-xs leading-relaxed font-light">
                  {res.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
