'use client';

import { motion } from 'framer-motion';
import { Monitor, ShoppingCart, Settings, TrendingUp, Code, Smartphone } from 'lucide-react';

const services = [
  {
    id: 'diseno-web',
    icon: Monitor,
    title: 'Diseño Web Personalizado',
    description: 'Creamos sitios web únicos y atractivos que reflejan la identidad de tu marca con diseños modernos y responsive.',
    features: [
      'Diseño 100% personalizado',
      'Responsive (móvil, tablet, desktop)',
      'UI/UX optimizado',
      'Animaciones modernas',
      'Colores y tipografía de marca',
    ],
  },
  {
    id: 'catalogos',
    icon: ShoppingCart,
    title: 'Catálogos de Tiendas',
    description: 'Plataformas e-commerce completas con catálogos de productos, carrito de compras y pasarelas de pago.',
    features: [
      'Catálogo de productos',
      'Carrito de compras',
      'Pasarela de pagos',
      'Panel administrativo',
      'Gestión de inventario',
    ],
    color: 'from-blue-500 to-purple-600',
  },
  {
    id: 'mantenimiento',
    icon: Settings,
    title: 'Mantenimiento Web',
    description: 'Mantenemos tu sitio web actualizado, seguro y funcionando perfectamente con soporte continuo.',
    features: [
      'Actualizaciones regulares',
      'Backups automáticos',
      'Monitoreo 24/7',
      'Corrección de errores',
      'Optimización de rendimiento',
    ],
    color: 'from-purple-500 to-pink-600',
  },
  {
    id: 'seo',
    icon: TrendingUp,
    title: 'Optimización SEO',
    description: 'Mejoramos tu posicionamiento en buscadores para aumentar tu visibilidad y atraer más clientes.',
    features: [
      'Análisis de palabras clave',
      'Optimización On-Page',
      'Meta tags optimizados',
      'Sitemap y indexación',
      'Reportes mensuales',
    ],
    color: 'from-pink-500 to-red-600',
  },
  {
    id: 'desarrollo',
    icon: Code,
    title: 'Desarrollo a Medida',
    description: 'Soluciones web personalizadas según las necesidades específicas de tu negocio.',
    features: [
      'Aplicaciones web custom',
      'APIs y integraciones',
      'Dashboards administrativos',
      'Sistemas internos',
      'Automatización de procesos',
    ],
    color: 'from-red-500 to-orange-600',
  },
  {
    id: 'mobile',
    icon: Smartphone,
    title: 'Desarrollo Mobile',
    description: 'Aplicaciones móviles nativas y web apps optimizadas para dispositivos móviles.',
    features: [
      'Progressive Web Apps',
      'Diseño mobile-first',
      'Notificaciones push',
      'Offline functionality',
      'App Store ready',
    ],
  },
];

export default function ServicesGrid() {
  return (
    <section className="container mx-auto px-6 mb-32 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.165, 0.84, 0.44, 1] }}
            id={service.id}
            className="card-glass-hover p-8 md:p-10 rounded-4xl group flex flex-col"
          >
            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl bg-electric-2/10 border border-electric-2/20 flex items-center justify-center mb-8 group-hover:bg-electric-2/20 transition-all duration-500 group-hover:scale-110">
              <service.icon className="w-8 h-8 text-electric-2" />
            </div>

            {/* Content */}
            <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-electric-2 transition-colors">
              {service.title}
            </h3>
            <p className="text-gray-400 mb-8 font-light leading-relaxed grow">
              {service.description}
            </p>

            {/* Features */}
            <ul className="space-y-3 mb-8">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-400 text-sm font-light">
                  <span className="text-electric-2 mt-0.5">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* Button */}
            <a href={`https://wa.me/59171902857?text=${encodeURIComponent('Hola, me gustaría solicitar el servicio de: ' + service.title)}`} target="_blank" rel="noopener noreferrer" className="mt-auto">
              <button className="w-full py-4 rounded-xl border border-electric-2/30 text-electric-2 text-sm font-semibold tracking-wider uppercase hover:bg-electric-2/10 hover:border-electric-2 transition-all duration-300">
                Solicitar Servicio
              </button>
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
