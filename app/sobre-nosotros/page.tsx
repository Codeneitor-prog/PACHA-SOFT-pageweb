'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Award, TrendingUp, ShieldCheck, Zap, BadgeDollarSign, CheckCircle2, UserCircle2 } from 'lucide-react';
import TypingText from '@/components/TypingText';
import { supabase } from '@/lib/supabase';

const values = [
  {
    icon: ShieldCheck,
    title: 'Transparencia',
    description: 'Comunicación clara y honesta en cada etapa. Sin costos ocultos ni letras pequeñas.',
  },
  {
    icon: Award,
    title: 'Calidad Premium',
    description: 'Productos de alto nivel, robustos y diseñados con estándares globales.',
  },
  {
    icon: Users,
    title: 'Cercanía y Atención',
    description: 'Acompañamiento constante y personalizado. Tu proyecto nos importa tanto como a ti.',
  },
  {
    icon: Zap,
    title: 'Innovación y Diseño Moderno',
    description: 'Creamos interfaces estéticas, funcionales y alineadas con las últimas tendencias.',
  },
  {
    icon: Target,
    title: 'Compromiso con Resultados',
    description: 'No solo hacemos páginas bonitas, construimos herramientas que impulsan tus ventas.',
  },
  {
    icon: BadgeDollarSign,
    title: 'Accesibilidad',
    description: 'Creemos en precios justos para democratizar el acceso a la tecnología en Bolivia.',
  },
];

const reasons = [
  'Experiencia sólida en negocios locales bolivianos.',
  'Diseños modernos y totalmente responsivos (adaptables a celulares).',
  'Precios accesibles y completamente transparentes.',
  'Soporte técnico cercano y 100% en español.',
  'Entregas rápidas sin comprometer la calidad.',
  'Fuerte enfoque en resultados: SEO, visibilidad y ventas.',
  'Atención personalizada, de emprendedor a emprendedor.',
];

const getDirectImageUrl = (url: string) => {
  if (!url) return url;
  const driveRegex = /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/;
  const match = url.match(driveRegex);
  if (match && match[1]) {
    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  }
  return url;
};

export default function SobreNosotrosPage() {
  const [team, setTeam] = useState<any[]>([]);

  useEffect(() => {
    const fetchTeam = async () => {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('created_at', { ascending: true });
      if (!error && data) {
        setTeam(data);
      }
    };
    fetchTeam();
  }, []);

  return (
    <div className="relative py-20 pb-32">
      {/* Hero Section */}
      <section className="container mx-auto px-6 mb-20 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.165, 0.84, 0.44, 1] }}
          className="text-center max-w-4xl mx-auto"
        >
          <span className="text-electric-2 font-medium text-sm uppercase tracking-[0.2em]">
            SOBRE NOSOTROS
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black mt-6 mb-8 tracking-tighter flex justify-center gap-4 flex-wrap">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-electric-2 to-electric-4 text-glow py-2 inline-block">
              <TypingText text="PACHA SOFT" className="inline-block mr-2" />
              <TypingText text="NUESTRA HISTORIA" className="inline-block" />
            </span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed font-light">
            Conoce cómo empezamos y qué nos motiva a seguir creando páginas web modernas y de alto impacto en La Paz.
          </p>
        </motion.div>
      </section>

      {/* Quiénes Somos / Historia */}
      <section className="container mx-auto px-6 mb-32 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.165, 0.84, 0.44, 1] }}
          className="card-glass rounded-4xl p-10 md:p-16 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-radial from-electric-2/5 to-transparent pointer-events-none"></div>
          <div className="relative z-10 space-y-6 text-gray-300 font-light leading-relaxed text-lg">
            <p>
              <strong>Pacha Soft</strong> nació informalmente en 2022, con una chispa de curiosidad y un deseo genuino de ayudar. En nuestros primeros días, apoyábamos a amigos, vecinos y pequeños comercios en La Paz que necesitaban urgentemente una página web para mostrar su trabajo.
            </p>
            <p>
              Durante ese proceso, notamos un problema recurrente: muchos negocios y emprendimientos en Bolivia no tenían presencia digital, y los que sí la tenían, a menudo contaban con webs de baja calidad o se enfrentaban a precios inaccesibles. La tecnología de alto nivel parecía estar reservada solo para grandes corporaciones.
            </p>
            <p>
              Nuestra misión inicial fue clara: ayudar a los emprendedores locales a dar el salto al mundo digital mediante la creación de sitios web de primer nivel. Con dedicación y pasión por el desarrollo web, lo que empezó como un apoyo barrial se consolidó formalmente en 2025 como una agencia profesional.
            </p>
            <p>
              Actualmente, seguimos en constante crecimiento ante la gran demanda de páginas web en la actualidad. No solo estamos abarcando todo el territorio nacional, sino que hemos comenzado a expandirnos hacia clientes en Perú, manteniendo intacto nuestro compromiso y cercanía de siempre.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Misión y Visión */}
      <section className="container mx-auto px-6 mb-32 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.165, 0.84, 0.44, 1] }}
            className="card-glass-hover p-10 rounded-4xl relative group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Target className="w-24 h-24 text-electric-2" />
            </div>
            <h2 className="text-3xl font-black mb-6 text-white tracking-tighter">Nuestra Misión</h2>
            <p className="text-gray-400 font-light leading-relaxed text-lg relative z-10">
              Crear páginas web modernas, elegantes y de alto rendimiento que funcionen como verdaderos motores de crecimiento. Ayudamos a los negocios locales a atraer más clientes, multiplicar sus ventas y competir con fuerza en el exigente mundo digital de hoy.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.165, 0.84, 0.44, 1] }}
            className="card-glass-hover p-10 rounded-4xl relative group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <TrendingUp className="w-24 h-24 text-electric-4" />
            </div>
            <h2 className="text-3xl font-black mb-6 text-white tracking-tighter">Nuestra Visión</h2>
            <p className="text-gray-400 font-light leading-relaxed text-lg relative z-10">
              Posicionarnos como la agencia de diseño web en Bolivia más confiable y recomendada del rubro, empoderando a cientos de emprendedores para que hagan crecer sus negocios a través de soluciones digitales de calidad mundial.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="container mx-auto px-6 mb-32 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.165, 0.84, 0.44, 1] }}
          className="text-center mb-16"
        >
          <span className="text-electric-2 font-medium text-sm uppercase tracking-[0.2em] block mb-4">Lo que nos define</span>
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter">
            <span className="text-white">Nuestros </span>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-electric-2 to-electric-4">Valores</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.165, 0.84, 0.44, 1] }}
              className="card-glass-hover p-10 rounded-4xl text-center group"
            >
              <div className="mb-8 flex justify-center">
                <div className="p-4 rounded-2xl bg-electric-2/10 border border-electric-2/20 group-hover:bg-electric-2/20 transition-all duration-500">
                  <value.icon className="w-8 h-8 text-electric-2 drop-shadow-[0_0_10px_rgba(0,229,255,0.6)]" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-4 tracking-tight group-hover:text-electric-2 transition-colors">
                {value.title}
              </h3>
              <p className="text-gray-400 font-light leading-relaxed text-sm">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Por qué elegir Pacha Soft */}
      <section className="container mx-auto px-6 mb-32 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.165, 0.84, 0.44, 1] }}
          className="card-glass rounded-4xl p-10 md:p-16 border border-electric-2/20 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-linear-to-br from-electric-4/5 to-transparent pointer-events-none"></div>
          <div className="relative z-10 text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter text-white">
              ¿Por qué elegir <span className="text-electric-2">Pacha Soft</span>?
            </h2>
            <p className="text-gray-400 font-light text-lg">
              Nos diferenciamos por ofrecer un servicio humano, accesible y orientado a multiplicar tus ingresos.
            </p>
          </div>
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {reasons.map((reason, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-electric-2 shrink-0 mt-1" />
                <p className="text-gray-300 font-light text-lg">{reason}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Nuestro Equipo */}
      <section className="container mx-auto px-6 mb-32 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.165, 0.84, 0.44, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter text-white">
            Nuestro <span className="text-transparent bg-clip-text bg-linear-to-r from-electric-2 to-electric-4">Equipo</span>
          </h2>
          <p className="text-gray-400 font-light text-lg">Los expertos detrás de cada proyecto exitoso</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {team.length > 0 ? team.map((m, index) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.165, 0.84, 0.44, 1] }}
              className="card-glass relative rounded-3xl overflow-hidden border border-electric-2/30 shadow-[0_0_30px_rgba(0,229,255,0.05)] hover:shadow-[0_0_40px_rgba(0,229,255,0.15)] transition-shadow duration-500 max-w-sm mx-auto w-full group"
            >
              {/* Header de Credencial */}
              <div className="bg-black/40 p-4 border-b border-electric-2/20 flex justify-between items-center backdrop-blur-md">
                <div className="font-black text-white text-sm tracking-widest flex items-center gap-2 group-hover:text-electric-2 transition-colors">
                  <Zap className="w-4 h-4 text-electric-2" /> PACHA SOFT
                </div>
                <div className="text-electric-2/70 text-[10px] font-bold uppercase tracking-[0.3em]">ID CREDENCIAL</div>
              </div>
              
              {/* Cuerpo de Credencial */}
              <div className="p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-electric-2/10 blur-[50px] -mr-16 -mt-16 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-electric-4/10 blur-[50px] -ml-16 -mb-16 pointer-events-none"></div>
                
                <div className="relative w-36 h-36 mx-auto rounded-full bg-linear-to-tr from-electric-2/20 to-electric-4/20 border-2 border-electric-2/50 flex items-center justify-center overflow-hidden mb-6 p-1">
                  <div className="w-full h-full rounded-full overflow-hidden bg-black flex items-center justify-center">
                    {m.image_url ? (
                      <img src={getDirectImageUrl(m.image_url)} alt={m.name} className="w-full h-full object-cover" />
                    ) : (
                      <UserCircle2 className="w-24 h-24 text-electric-2/50" />
                    )}
                  </div>
                </div>
                
                <h3 className="text-2xl font-black text-white mb-2 tracking-wide uppercase">{m.name}</h3>
                <div className="inline-block bg-electric-2/10 border border-electric-2/20 px-3 py-1 rounded-full mb-6">
                  <p className="text-electric-2 font-bold tracking-widest text-xs uppercase">{m.role}</p>
                </div>
                
                <div className="w-16 h-[2px] bg-linear-to-r from-electric-2/50 to-electric-4/50 mx-auto mb-6 rounded-full"></div>
                
                <p className="text-gray-400 font-light text-sm leading-relaxed relative z-10 text-justify">
                  {m.description}
                </p>
              </div>
            </motion.div>
          )) : (
            <p className="text-gray-400 text-center py-10 col-span-full">Cargando equipo...</p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.165, 0.84, 0.44, 1] }}
          className="card-glass rounded-4xl p-16 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-radial from-electric-4/10 to-transparent pointer-events-none"></div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter text-white">
              ¿Listo para dar el siguiente paso?
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto font-light">
              Conversemos sobre tu idea. Estaremos encantados de asesorarte y crear una estrategia digital a tu medida.
            </p>
            <a href="https://wa.me/59171902857?text=Hola,%20quisiera%20una%20consulta%20gratuita." target="_blank" rel="noopener noreferrer">
              <button className="btn-primary flex items-center gap-3 mx-auto text-sm tracking-widest">
                CONTÁCTANOS AHORA
              </button>
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
