'use client';

import { motion } from 'framer-motion';
import TypingText from '@/components/TypingText';
import { Shield } from 'lucide-react';

export default function PrivacidadPage() {
  return (
    <div className="relative py-20 pb-32">
      {/* Hero Section */}
      <section className="container mx-auto px-6 mb-16 max-w-6xl">
        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0, y: 30 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.165, 0.84, 0.44, 1] }}
          className="text-center max-w-4xl mx-auto"
        >
          <span className="text-electric-2 font-medium text-sm uppercase tracking-[0.2em]">
            Marco Legal Corporativo
          </span>
          <h1 className="text-4xl md:text-6xl font-black mt-6 mb-8 tracking-tighter flex justify-center gap-4 flex-wrap">
            <span className="text-white">
              <TypingText text="Política de" className="inline-block" />
            </span>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-electric-2 to-electric-4 text-glow py-2 inline-block">
              <TypingText text="Privacidad" delay={0.6} className="inline-block" />
            </span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed font-light">
            En cumplimiento estricto de las normativas de protección de datos vigentes, salvaguardamos la integridad y confidencialidad de la información proporcionada por nuestros mandantes y usuarios.
          </p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-6 max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="card-glass p-8 md:p-12 rounded-4xl space-y-12 text-gray-300 leading-relaxed font-light text-justify"
        >
          <div className="flex items-center gap-4 border-b border-white/10 pb-6">
            <Shield className="w-10 h-10 text-electric-2 shrink-0 drop-shadow-[0_0_10px_rgba(0,229,255,0.4)]" />
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Declaración de Confidencialidad</h2>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Última actualización: 17 de Mayo de 2026</p>
            </div>
          </div>

          {/* Section 1 */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-electric-2">1.</span> Identidad y Responsabilidad del Tratamiento
            </h3>
            <p>
              El presente instrumento jurídico regula el tratamiento de datos personales llevado a cabo por la firma corporativa <strong>PACHASOFT</strong>, constituida y operando de conformidad con las leyes vigentes del Estado Plurinacional de Bolivia, con domicilio legal en la ciudad de La Paz. En adelante, el Responsable del Tratamiento se compromete a garantizar la máxima tutela del derecho a la privacidad y autodeterminación informativa de las personas naturales que utilicen este canal digital.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-electric-2">2.</span> Licitud y Fines de la Recolección de Datos
            </h3>
            <p>
              Toda información de carácter personal recabada mediante nuestros formularios de cotización, contacto directo o sistemas automatizados (direcciones IP, metadatos y cookies) se procesa bajo el principio de licitud y consentimiento expreso del titular. Dichos datos serán estrictamente destinados a:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li>El análisis técnico y formulación de propuestas contractuales para el desarrollo y diseño web especializado.</li>
              <li>El perfeccionamiento de relaciones precontractuales y contractuales de prestación de servicios tecnológicos.</li>
              <li>La provisión de soporte técnico continuo y optimización de rendimiento de los productos entregados.</li>
              <li>El envío de notificaciones y ofertas comerciales legítimamente consentidas por el usuario.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-electric-2">3.</span> Transferencia y Acceso de Terceros
            </h3>
            <p>
              <strong>PACHASOFT</strong> declara solemnemente que no efectúa venta, arriendo o transferencia lucrativa de datos personales a terceras entidades ajenas a la relación contractual principal. Solo se contempla la transferencia a proveedores de infraestructura tecnológica en la nube (como servidores y pasarelas de pago reguladas), bajo estrictos contratos de confidencialidad y cláusulas estandarizadas de protección de datos, asegurando la no vulneración del secreto profesional.
            </p>
          </div>

          {/* Section 4 */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-electric-2">4.</span> Medidas de Seguridad Tecnológica y Organizativa
            </h3>
            <p>
              Para mitigar riesgos de pérdida, alteración, acceso no autorizado o mal uso de la información, se han implementado rigurosos protocolos de ciberseguridad, incluyendo encriptación SSL/TLS de grado bancario en tránsito de datos, restricciones de accesos segregados y auditorías constantes del código fuente. Todo el personal con acceso a bases de datos está sujeto a acuerdos de confidencialidad de carácter civil y penal con duración indefinida.
            </p>
          </div>

          {/* Section 5 */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-electric-2">5.</span> Ejercicio de Derechos (ARCO)
            </h3>
            <p>
              Los titulares de los datos conservan en todo momento la prerrogativa de ejercer sus derechos de <strong>Acceso, Rectificación, Cancelación y Oposición (ARCO)</strong>. Cualquier petición de revocatoria de consentimiento o supresión definitiva de datos deberá formalizarse por escrito a través del canal electrónico corporativo: <strong>pachasoft54@gmail.com</strong>, debiendo ser procesada y resuelta en un plazo no mayor a cinco (5) días hábiles administrativos.
            </p>
          </div>

          {/* Jurisdicción */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-sm text-gray-400">
            <p className="font-semibold text-white mb-2">Cláusula de Competencia Jurisdiccional:</p>
            Esta política de privacidad se rige e interpreta de conformidad con el ordenamiento constitucional del Estado Plurinacional de Bolivia, en particular bajo la tutela constitucional de la Acción de Protección de Privacidad establecida en el Artículo 130 de la Constitución Política del Estado. Cualquier controversia será dilucidada ante las autoridades jurisdiccionales competentes de la sede de gobierno en La Paz.
          </div>
        </motion.div>
      </section>
    </div>
  );
}
