'use client';

import { motion } from 'framer-motion';
import TypingText from '@/components/TypingText';
import { Scale } from 'lucide-react';

export default function TerminosPage() {
  return (
    <div className="relative py-20 pb-32">
      {/* Hero Section */}
      <section className="container mx-auto px-6 mb-16 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.165, 0.84, 0.44, 1] }}
          className="text-center max-w-4xl mx-auto"
        >
          <span className="text-electric-2 font-medium text-sm uppercase tracking-[0.2em]">
            Contrato General de Adhesión
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black mt-6 mb-8 tracking-tighter flex justify-center gap-4 flex-wrap">
            <span className="text-white">
              <TypingText text="Términos y" className="inline-block" />
            </span>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-electric-2 to-electric-4 text-glow py-2 inline-block">
              <TypingText text="Condiciones" delay={0.6} className="inline-block" />
            </span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed font-light">
            El acceso, navegación y contratación de los servicios de ingeniería web ofrecidos a través de esta plataforma implican la aceptación incondicional del siguiente clausulado contractual.
          </p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-6 max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="card-glass p-8 md:p-12 rounded-4xl space-y-12 text-gray-300 leading-relaxed font-light text-justify"
        >
          <div className="flex items-center gap-4 border-b border-white/10 pb-6">
            <Scale className="w-10 h-10 text-electric-2 shrink-0 drop-shadow-[0_0_10px_rgba(0,229,255,0.4)]" />
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Condiciones Generales de Contratación</h2>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Vigente a partir del: 17 de Mayo de 2026</p>
            </div>
          </div>

          {/* Section 1 */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-electric-2">1.</span> Objeto y Vinculación Contractual
            </h3>
            <p>
              El presente documento constituye un contrato de adhesión vinculante entre el usuario o cliente contratante (en adelante, el &quot;Cliente&quot;) y la marca comercial <strong>PACHASOFT</strong>. Su objeto es regular la provisión de servicios especializados en diseño, desarrollo de software, mantenimiento de sistemas, optimización de motores de búsqueda (SEO) y hosting web. Al interactuar con el portal o perfeccionar una solicitud de cotización, el Cliente se adhiere plenamente a todas las estipulaciones detalladas en este instrumento legal.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-electric-2">2.</span> Estructura y Protocolo Financiero de Pagos
            </h3>
            <p>
              La provisión de servicios se rige por un esquema de inversión transparente detallado expresamente en las cotizaciones y planes. Salvo estipulación expresa en contrario en contratos privados específicos, los términos comerciales generales consisten en:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li><strong>Anticipo Requerido:</strong> El Cliente deberá abonar obligatoriamente un cincuenta por ciento (50%) del valor total cotizado para dar inicio formal al proceso de diseño UI/UX y maquetación de software.</li>
              <li><strong>Liquidación y Entrega:</strong> El cincuenta por ciento (50%) restante será pagadero en su totalidad inmediatamente antes de la transferencia de archivos, migración al dominio final o despliegue definitivo en producción.</li>
              <li><strong>Mora Automática:</strong> El retraso en la liquidación devengará intereses y suspenderá los servicios de soporte post-lanzamiento acordados.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-electric-2">3.</span> Propiedad Intelectual e Industrial
            </h3>
            <p>
              Los derechos de autor sobre las estructuras de diseño preliminar, marcas, isotipos, logotipos y tecnologías genéricas son propiedad exclusiva de <strong>PACHASOFT</strong>. Una vez completado y liquidado el pago total (100% de la contraprestación financiera), se otorgará al Cliente una licencia de explotación perpetua e intransferible sobre el código fuente a medida y el diseño desarrollado en el marco del proyecto específico, reservándose la firma el derecho a referenciar la obra en su portafolio comercial con fines exclusivamente demostrativos.
            </p>
          </div>

          {/* Section 4 */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-electric-2">4.</span> Limitación de Responsabilidad Tecnológica
            </h3>
            <p>
              <strong>PACHASOFT</strong> se compromete a aplicar estándares de desarrollo y ciberseguridad industrial óptimos para asegurar el correcto funcionamiento del software entregado. No obstante, no asumirá responsabilidad civil, penal u pecuniaria por:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li>Interrupciones debidas a fallos en infraestructuras de terceros ajenos a la firma (servidores DNS de dominio, servidores de hosting cloud no administrados por nosotros, pasarelas de pago externas).</li>
              <li>Alteraciones del código fuente realizadas por el propio Cliente o personal técnico no autorizado explícitamente por <strong>PACHASOFT</strong>.</li>
              <li>Ataques informáticos externos masivos o de fuerza mayor que superen los protocolos estándar instalados.</li>
            </ul>
          </div>

          {/* Section 5 */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-electric-2">5.</span> Resolución de Controversias y Jurisdicción
            </h3>
            <p>
              Las partes acuerdan de buena fe resolver amigablemente cualquier diferencia o incumplimiento derivado del presente clausulado. En caso de no alcanzarse un acuerdo transaccional en un plazo de quince (15) días calendario, ambas partes se someten irrevocablemente a la jurisdicción y competencia exclusiva de las autoridades judiciales del departamento de La Paz, Bolivia, con renuncia expresa a cualquier otro fuero que pudiera corresponderles por razón de sus domicilios presentes o futuros.
            </p>
          </div>

          {/* Firma Simbólica */}
          <div className="flex items-center gap-4 border-t border-white/10 pt-6 justify-between text-xs text-gray-500">
            <p>PACHASOFT - Asesoría Legal Corporativa</p>
            <p>Documento Registrado e Indexado Digitalmente</p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
