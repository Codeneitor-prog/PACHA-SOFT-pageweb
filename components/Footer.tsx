'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaFacebook, FaInstagram, FaTiktok, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const footerLinks = {
  'Enlaces Rápidos': [
    { name: 'Inicio', href: '/' },
    { name: 'Sobre Nosotros', href: '/sobre-nosotros' },
    { name: 'Servicios', href: '/servicios' },
    { name: 'Portafolio', href: '/portafolio' },
    { name: 'Contacto', href: '/contacto' },
  ],
  'Servicios': [
    { name: 'Diseño Web Personalizado', href: '/servicios#diseno-web' },
    { name: 'Catálogos de Tiendas', href: '/servicios#catalogos' },
    { name: 'Mantenimiento Web', href: '/servicios#mantenimiento' },
    { name: 'Optimización SEO', href: '/servicios#seo' },
  ],
};

const socialLinks = [
  { name: 'WhatsApp', icon: FaWhatsapp, href: 'https://wa.me/59171902857', color: 'hover:text-[#25D366]' },
  { name: 'Facebook', icon: FaFacebook, href: 'https://www.facebook.com/share/1AyHTAZBaS/', color: 'hover:text-[#1877F2]' },
  { name: 'Instagram', icon: FaInstagram, href: 'https://www.instagram.com/pachasoft.bo?igsh=d3Rya2wxdjM3M25l', color: 'hover:text-[#E4405F]' },
  { name: 'TikTok', icon: FaTiktok, href: 'https://www.tiktok.com/@pachasoft7?_r=1&_t=ZS-96RK5RDLC7h', color: 'hover:text-[#00e5ff] drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]' },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#000000] border-t border-electric-2/10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-electric-6/10 to-transparent pointer-events-none"></div>
      
      <div className="relative container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4">
              <div className="relative w-10 h-10">
                <Image
                  src="/img/pachaLog.png"
                  alt="Pacha Soft Logo"
                  fill
                  className="object-contain"
                  sizes="40px"
                />
              </div>
              <h3 className="text-xl font-bold tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-electric-1 via-electric-2 to-electric-4">PACHA SOFT</h3>
            </div>
            <p className="text-gray-400 font-light leading-relaxed text-sm">
              Agencia de desarrollo digital especializada en crear experiencias corporativas elegantes y funcionales.
            </p>
            
            {/* Social Links - CSS hover instead of Framer Motion whileHover */}
            <div className="flex gap-4 pt-2">
              {socialLinks.map(({ name, icon: Icon, href, color }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-full card-glass flex items-center justify-center text-gray-400 ${color} transition-all duration-200 hover:scale-110 hover:-translate-y-0.5 active:scale-95`}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links Sections */}
          {Object.entries(footerLinks).map(([title, links], index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <h4 className="text-sm font-bold text-electric-2 tracking-[0.1em] uppercase mb-6">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 font-light hover:text-white transition-colors duration-200 text-sm flex items-center group"
                    >
                      <span className="w-0 h-[1px] bg-electric-2 mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-200"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <h4 className="text-sm font-bold text-electric-2 tracking-[0.1em] uppercase mb-6">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-4 text-gray-400 font-light text-sm group">
                <div className="p-2 rounded-lg bg-electric-2/5 text-electric-2 group-hover:bg-electric-2/20 transition-colors">
                  <FaPhone size={14} />
                </div>
                <a href="tel:+59171902857" className="hover:text-white transition-colors mt-1">
                  +591 71902857
                </a>
              </li>
              <li className="flex items-start gap-4 text-gray-400 font-light text-sm group">
                <div className="p-2 rounded-lg bg-electric-2/5 text-electric-2 group-hover:bg-electric-2/20 transition-colors">
                  <FaEnvelope size={14} />
                </div>
                <a href="mailto:pachasoft54@gmail.com" className="hover:text-white transition-colors mt-1">
                  pachasoft54@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-4 text-gray-400 font-light text-sm group">
                <div className="p-2 rounded-lg bg-electric-2/5 text-electric-2 group-hover:bg-electric-2/20 transition-colors">
                  <FaMapMarkerAlt size={14} />
                </div>
                <span className="mt-1">La Paz, Bolivia</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-electric-2/20 to-transparent mb-8"></div>

        {/* Bottom bar - plain divs instead of motion.div (no animation needed for copyright text) */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 font-light text-xs tracking-wider">
          <p>
            © 2025 Pacha Soft. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <Link href="/privacidad" className="hover:text-electric-2 transition-colors">
              Política de Privacidad
            </Link>
            <Link href="/terminos" className="hover:text-electric-2 transition-colors">
              Términos y Condiciones
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
