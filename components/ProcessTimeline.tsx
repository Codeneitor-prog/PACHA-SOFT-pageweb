'use client';

import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ClipboardCheck, Code, Eye, MessageSquare, Rocket } from 'lucide-react';

const steps = [
  {
    icon: MessageSquare,
    title: "Consultoría Inicial",
    description: "Analizamos tus objetivos comerciales y definimos la estrategia digital ideal para tu negocio en Bolivia.",
    number: "01"
  },
  {
    icon: ClipboardCheck,
    title: "Planificación & Diseño",
    description: "Creamos prototipos de alta fidelidad con enfoque en la experiencia de usuario y estética premium.",
    number: "02"
  },
  {
    icon: Code,
    title: "Desarrollo Ágil",
    description: "Codificamos tu solución usando tecnologías de vanguardia como Next.js para máxima velocidad.",
    number: "03"
  },
  {
    icon: Eye,
    title: "Pruebas & Calidad",
    description: "Auditamos cada detalle: velocidad, seguridad y compatibilidad en todos los dispositivos.",
    number: "04"
  },
  {
    icon: Rocket,
    title: "Lanzamiento & Soporte",
    description: "Desplegamos tu web y te acompañamos en el crecimiento con soporte técnico 24/7.",
    number: "05"
  }
];

export default function ProcessTimeline() {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24 space-y-4"
        >
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
            NUESTRO <span className="text-electric-2">PROCESO</span>
          </h2>
          <p className="text-gray-400 tracking-wider font-light max-w-2xl mx-auto">
            Metodología ágil diseñada para entregar resultados excepcionales en tiempo récord.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Progress Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block" />
          <motion.div 
            className="absolute left-1/2 top-0 bottom-0 w-px bg-electric-2 origin-top -translate-x-1/2 hidden md:block shadow-[0_0_15px_#00e5ff]"
            style={{ scaleY }}
          />

          <div className="space-y-24">
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`flex flex-col md:flex-row items-center gap-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Content */}
                <div className={`flex-1 w-full ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="card-glass-hover p-8 rounded-4xl space-y-4 relative group">
                    <span className="text-5xl font-black text-white/5 absolute top-4 right-6 group-hover:text-electric-2/10 transition-colors">
                      {step.number}
                    </span>
                    <h3 className="text-2xl font-bold text-white tracking-tight">{step.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed font-light">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Center Icon */}
                <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-2xl bg-[#0a0a0a] border border-electric-2/30 shadow-[0_0_20px_rgba(0,229,255,0.1)] group">
                  <step.icon className="w-8 h-8 text-electric-2" />
                  <div className="absolute inset-0 rounded-2xl bg-electric-2/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Spacer for empty side */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
