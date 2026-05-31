'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { FaWhatsapp, FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import TypingText from '@/components/TypingText';
import { supabase } from '@/lib/supabase';

const contactInfo = [
  {
    icon: Phone,
    title: 'Teléfono',
    value: '+591 71902857',
    href: 'tel:+59171902857',
  },
  {
    icon: Mail,
    title: 'Email',
    value: 'pachasoft54@gmail.com',
    href: 'mailto:pachasoft54@gmail.com',
  },
  {
    icon: MapPin,
    title: 'Ubicación',
    value: 'La Paz, Bolivia',
    href: '#',
  },
];

const socialMedia = [
  { name: 'WhatsApp', icon: FaWhatsapp, href: 'https://wa.me/59171902857', color: 'hover:text-[#25D366]' },
  { name: 'Facebook', icon: FaFacebook, href: 'https://www.facebook.com/share/1AyHTAZBaS/', color: 'hover:text-[#1877F2]' },
  { name: 'Instagram', icon: FaInstagram, href: 'https://www.instagram.com/pachasoft.bo?igsh=d3Rya2wxdjM3M25l', color: 'hover:text-[#E4405F]' },
  { name: 'TikTok', icon: FaTiktok, href: 'https://www.tiktok.com/@pachasoft7?_r=1&_t=ZS-96RK5RDLC7h', color: 'hover:text-[#00e5ff] drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]' },
];

export default function ContactoPage() {
  const [activeTab, setActiveTab] = useState<'contact' | 'testimonial'>('contact');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.get('tab') === 'testimonial') {
        setTimeout(() => setActiveTab('testimonial'), 0);
      }
    }
  }, []);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    servicio: '',
    mensaje: '',
  });

  const [testimonialData, setTestimonialData] = useState({
    name: '',
    role: '',
    business: '',
    content: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create WhatsApp message
    const message = `*Nuevo Contacto - Pacha Soft*\n\n*Nombre:* ${formData.nombre}\n*Email:* ${formData.email}\n*Teléfono:* ${formData.telefono}\n*Empresa:* ${formData.empresa}\n*Servicio:* ${formData.servicio}\n*Mensaje:*\n${formData.mensaje}`;
    const whatsappUrl = `https://wa.me/59171902857?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    
    setIsSubmitting(false);
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      empresa: '',
      servicio: '',
      mensaje: '',
    });
  };

  const handleTestimonialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    const { error } = await supabase
      .from('testimonials')
      .insert([
        {
          name: testimonialData.name,
          role: testimonialData.role,
          business: testimonialData.business,
          content: testimonialData.content,
          approved: false,
        }
      ]);

    setIsSubmitting(false);

    if (error) {
      setSubmitMessage('Hubo un error al enviar tu comentario. Inténtalo nuevamente.');
    } else {
      setSubmitMessage('¡Gracias por tu comentario! Ha sido enviado para revisión.');
      setTestimonialData({ name: '', role: '', business: '', content: '' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTestimonialChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTestimonialData({
      ...testimonialData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="relative py-20 pb-32">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.165, 0.84, 0.44, 1] }}
          className="text-center max-w-4xl mx-auto"
        >
          <span className="text-electric-2 font-medium text-sm uppercase tracking-[0.2em]">
            Contáctanos
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black mt-6 mb-8 tracking-tighter flex justify-center gap-4 flex-wrap">
            <span className="text-white">
              <TypingText text="Hablemos de Tu" className="inline-block" />
            </span>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-electric-2 to-electric-4 text-glow py-2 inline-block">
              <TypingText text="Proyecto" delay={1} className="inline-block" />
            </span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed font-light">
            Estamos listos para ayudarte a transformar tu visión digital en realidad.
            Contáctanos y obtén una cotización gratuita.
          </p>
        </motion.div>
      </section>

      {/* Contact Info Cards */}
      <section className="container mx-auto px-6 mb-20 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactInfo.map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.165, 0.84, 0.44, 1] }}
              className="card-glass-hover p-8 rounded-[2rem] text-center group block"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-electric-2/10 p-4 mb-6 group-hover:bg-electric-2/20 transition-colors duration-500 border border-electric-2/20">
                <item.icon className="w-full h-full text-electric-2" />
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight mb-2 group-hover:text-electric-2 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-400 font-light">
                {item.value}
              </p>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.165, 0.84, 0.44, 1] }}
          >
            <div className="card-glass p-8 md:p-12 rounded-[2rem]">
              <div className="flex gap-4 mb-8 border-b border-white/10 pb-4">
                <button
                  onClick={() => { setActiveTab('contact'); setSubmitMessage(''); }}
                  className={`text-lg font-bold tracking-tight transition-colors ${activeTab === 'contact' ? 'text-white border-b-2 border-electric-2 pb-1' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  Contacto
                </button>
                <button
                  onClick={() => { setActiveTab('testimonial'); setSubmitMessage(''); }}
                  className={`text-lg font-bold tracking-tight transition-colors ${activeTab === 'testimonial' ? 'text-white border-b-2 border-electric-2 pb-1' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  Dejar un Comentario
                </button>
              </div>

              {activeTab === 'contact' ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="nombre" className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      required
                      value={formData.nombre}
                      onChange={handleChange}
                      className="w-full bg-black/50 border border-electric-2/20 rounded-xl px-4 py-4 text-white focus:border-electric-2 focus:ring-1 focus:ring-electric-2 transition-all duration-300 outline-none font-light"
                      placeholder="Juan Pérez"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-black/50 border border-electric-2/20 rounded-xl px-4 py-4 text-white focus:border-electric-2 focus:ring-1 focus:ring-electric-2 transition-all duration-300 outline-none font-light"
                      placeholder="juan@ejemplo.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="telefono" className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      required
                      value={formData.telefono}
                      onChange={handleChange}
                      className="w-full bg-black/50 border border-electric-2/20 rounded-xl px-4 py-4 text-white focus:border-electric-2 focus:ring-1 focus:ring-electric-2 transition-all duration-300 outline-none font-light"
                      placeholder="+591 12345678"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="empresa" className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                      Empresa
                    </label>
                    <input
                      type="text"
                      id="empresa"
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleChange}
                      className="w-full bg-black/50 border border-electric-2/20 rounded-xl px-4 py-4 text-white focus:border-electric-2 focus:ring-1 focus:ring-electric-2 transition-all duration-300 outline-none font-light"
                      placeholder="Mi Empresa S.A."
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="servicio" className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                    Servicio de Interés *
                  </label>
                  <select
                    id="servicio"
                    name="servicio"
                    required
                    value={formData.servicio}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-electric-2/20 rounded-xl px-4 py-4 text-white focus:border-electric-2 focus:ring-1 focus:ring-electric-2 transition-all duration-300 outline-none font-light appearance-none"
                  >
                    <option value="" className="bg-black">Selecciona un servicio</option>
                    <option value="Diseño Web Personalizado" className="bg-black">Diseño Web Personalizado</option>
                    <option value="Catálogos de Tiendas" className="bg-black">Catálogos de Tiendas</option>
                    <option value="Mantenimiento Web" className="bg-black">Mantenimiento Web</option>
                    <option value="Optimización SEO" className="bg-black">Optimización SEO</option>
                    <option value="Desarrollo a Medida" className="bg-black">Desarrollo a Medida</option>
                    <option value="Otro" className="bg-black">Otro</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="mensaje" className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                    Mensaje *
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    required
                    rows={5}
                    value={formData.mensaje}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-electric-2/20 rounded-xl px-4 py-4 text-white focus:border-electric-2 focus:ring-1 focus:ring-electric-2 transition-all duration-300 outline-none resize-none font-light"
                    placeholder="Cuéntanos sobre tu proyecto..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span className="tracking-widest">ENVIANDO...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span className="tracking-widest">ENVIAR MENSAJE</span>
                    </>
                  )}
                </button>
              </form>
              ) : (
                <form onSubmit={handleTestimonialSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={testimonialData.name}
                        onChange={handleTestimonialChange}
                        className="w-full bg-black/50 border border-electric-2/20 rounded-xl px-4 py-4 text-white focus:border-electric-2 focus:ring-1 focus:ring-electric-2 transition-all duration-300 outline-none font-light"
                        placeholder="Juan Pérez"
                      />
                    </div>
                    <div>
                      <label htmlFor="business" className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                        Rubro o Industria *
                      </label>
                      <input
                        type="text"
                        id="business"
                        name="business"
                        required
                        value={testimonialData.business}
                        onChange={handleTestimonialChange}
                        className="w-full bg-black/50 border border-electric-2/20 rounded-xl px-4 py-4 text-white focus:border-electric-2 focus:ring-1 focus:ring-electric-2 transition-all duration-300 outline-none font-light"
                        placeholder="E-commerce, Salud, etc."
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="role" className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                      Cargo / Rol en la Empresa *
                    </label>
                    <input
                      type="text"
                      id="role"
                      name="role"
                      required
                      value={testimonialData.role}
                      onChange={handleTestimonialChange}
                      className="w-full bg-black/50 border border-electric-2/20 rounded-xl px-4 py-4 text-white focus:border-electric-2 focus:ring-1 focus:ring-electric-2 transition-all duration-300 outline-none font-light"
                      placeholder="CEO, Fundador, etc."
                    />
                  </div>
                  <div>
                    <label htmlFor="content" className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                      Comentario *
                    </label>
                    <textarea
                      id="content"
                      name="content"
                      required
                      rows={5}
                      value={testimonialData.content}
                      onChange={handleTestimonialChange}
                      className="w-full bg-black/50 border border-electric-2/20 rounded-xl px-4 py-4 text-white focus:border-electric-2 focus:ring-1 focus:ring-electric-2 transition-all duration-300 outline-none resize-none font-light"
                      placeholder="Cuéntanos tu experiencia trabajando con nosotros..."
                    ></textarea>
                  </div>

                  {submitMessage && (
                    <div className={`p-4 rounded-xl text-sm ${submitMessage.includes('error') ? 'bg-red-500/20 text-red-200' : 'bg-electric-2/20 text-electric-2'}`}>
                      {submitMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span className="tracking-widest">ENVIANDO...</span>
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        <span className="tracking-widest">ENVIAR COMENTARIO</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.165, 0.84, 0.44, 1] }}
            className="space-y-8"
          >
            {/* WhatsApp Direct */}
            <div className="card-glass p-8 md:p-10 rounded-[2rem]">
              <h3 className="text-2xl font-black text-white mb-4 tracking-tight">Atención <span className="text-electric-2">Inmediata</span></h3>
              <p className="text-gray-400 mb-8 font-light leading-relaxed">
                ¿Prefieres hablar directamente? Envíanos un mensaje por WhatsApp y te responderemos a la brevedad posible.
              </p>
              <a
                href="https://wa.me/59171902857"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white text-black font-semibold py-4 px-8 rounded-full hover:bg-gray-200 transition-all duration-300 hover:scale-105"
              >
                <FaWhatsapp size={22} className="text-[#25D366]" />
                <span className="tracking-wide">Abrir WhatsApp</span>
              </a>
            </div>

            {/* Social Media */}
            <div className="card-glass p-8 md:p-10 rounded-[2rem]">
              <h3 className="text-xl font-bold text-white mb-4 tracking-tight">
                Síguenos en las Redes
              </h3>
              <div className="flex gap-4">
                {socialMedia.map(({ name, icon: Icon, href, color }) => (
                  <motion.a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 ${color} transition-all duration-300 hover:bg-white/5`}
                  >
                    <Icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Hours */}
            <div className="card-glass p-8 md:p-10 rounded-[2rem]">
              <h3 className="text-xl font-bold text-white mb-6 tracking-tight">
                Horario de Atención
              </h3>
              <div className="space-y-4 text-gray-400 font-light">
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span>Lunes - Viernes</span>
                  <span className="text-electric-2 font-medium">9:00 - 18:00</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span>Sábados</span>
                  <span className="text-electric-2 font-medium">9:00 - 13:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Domingos</span>
                  <span className="text-gray-500">Cerrado</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
