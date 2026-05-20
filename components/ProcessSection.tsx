import { motion } from 'framer-motion';

const processSteps = [
  {
    step: '01',
    title: 'Consulta Inicial',
    description: 'Llamada gratuita para entender tus necesidades y objetivos.',
  },
  {
    step: '02',
    title: 'Propuesta Personalizada',
    description: 'Ajustamos el plan perfecto para tu negocio.',
  },
  {
    step: '03',
    title: 'Diseño y Desarrollo',
    description: 'Creamos tu sitio con prototipo al 50% del pago.',
  },
  {
    step: '04',
    title: 'Revisiones y Lanzamiento',
    description: 'Publicamos en tu dominio después de tu aprobación.',
  },
  {
    step: '05',
    title: 'Soporte Post-Lanzamiento',
    description: 'Monitoreo y optimización continua.',
  },
];

export default function ProcessSection() {
  return (
    <section className="container mx-auto px-6 mb-32 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.165, 0.84, 0.44, 1] }}
        className="text-center mb-20"
      >
        <span className="text-electric-2 font-medium text-sm uppercase tracking-[0.2em]">
          Nuestro Proceso
        </span>
        <h2 className="text-4xl md:text-5xl font-black mt-6 mb-8 tracking-tighter">
          <span className="text-transparent bg-clip-text bg-linear-to-r from-electric-2 to-electric-4 text-glow">Cómo </span>
          <span className="text-white">Trabajamos</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
          Un proceso transparente y eficiente para garantizar el éxito de tu proyecto.
        </p>
      </motion.div>

      <div className="relative">
        <div className="hidden lg:block absolute top-1/2 left-10 right-10 h-px bg-linear-to-r from-transparent via-electric-2/30 to-transparent -translate-y-1/2"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {processSteps.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.165, 0.84, 0.44, 1] }}
              className="relative"
            >
              <div className="card-glass p-8 rounded-4xl text-center relative z-10 h-full hover:-translate-y-2 transition-transform duration-500">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-black border border-electric-2/30 flex items-center justify-center text-xl font-black text-electric-2/80 shadow-[0_0_30px_rgba(0,229,255,0.1)]">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-white mb-3 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
