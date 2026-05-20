'use client';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonials() {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('approved', true)
        .order('created_at', { ascending: false });
      
      if (!error && data) {
        setTestimonials(data);
      }
      setLoading(false);
    }
    fetchTestimonials();
  }, []);

  if (loading) {
    return <div className="py-32 flex justify-center"><div className="w-10 h-10 border-4 border-electric-2 border-t-transparent rounded-full animate-spin"></div></div>;
  }

  if (testimonials.length === 0) return null;

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 space-y-4"
        >
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
            LO QUE DICEN <span className="text-electric-2">NUESTROS CLIENTES</span>
          </h2>
          <p className="text-gray-400 tracking-wider font-light max-w-2xl mx-auto">
            Empresas que ya escalaron su negocio con nuestras soluciones digitales.
          </p>
        </motion.div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="testimonials-swiper pb-16!"
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={t.id || i}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-glass-hover p-8 rounded-4xl h-full flex flex-col gap-6 relative group"
              >
                <div className="absolute top-6 right-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="w-12 h-12 text-electric-2" />
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full border-2 border-electric-2/30 overflow-hidden bg-black/50 flex items-center justify-center relative">
                    {t.image ? (
                      <Image src={t.image} alt={t.name} fill className="object-cover" sizes="56px" />
                    ) : (
                      <span className="text-xl font-bold text-electric-2">{t.name.charAt(0)}</span>
                    )}
                  </div>
                  <div>
                    <h4 className="text-white font-bold tracking-tight">{t.name}</h4>
                    <span className="text-xs text-electric-2 font-medium tracking-wide uppercase">{t.business}</span>
                  </div>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed italic">
                  &quot;{t.content}&quot;
                </p>

                <div className="mt-auto pt-4 border-t border-white/5">
                  <span className="text-gray-500 text-xs">{t.role}</span>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link href="/contacto?tab=testimonial" className="text-lg font-bold tracking-tight transition-colors text-white border-b-2 border-electric-2 pb-1 hover:text-electric-2">
            ¿Quieres enviar un comentario?
          </Link>
        </motion.div>
      </div>

      <style jsx global>{`
        .testimonials-swiper .swiper-pagination-bullet {
          background: rgba(0, 229, 255, 0.2);
          opacity: 1;
        }
        .testimonials-swiper .swiper-pagination-bullet-active {
          background: #00e5ff;
          box-shadow: 0 0 10px #00e5ff;
        }
      `}</style>
    </section>
  );
}
