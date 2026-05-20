'use client';

import { motion } from 'framer-motion';

interface PageCTAProps {
  title: string;
  highlight: string;
  description: string;
  buttonText: string;
  whatsappMessage: string;
}

export default function PageCTA({ title, highlight, description, buttonText, whatsappMessage }: PageCTAProps) {
  return (
    <section className="container mx-auto px-6 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.165, 0.84, 0.44, 1] }}
        className="card-glass rounded-[3rem] p-16 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-radial from-electric-4/10 to-transparent pointer-events-none"></div>

        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter text-white">
            {title} <span className="text-transparent bg-clip-text bg-linear-to-r from-electric-2 to-electric-4">{highlight}</span>
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto font-light">
            {description}
          </p>
          <a href={`https://wa.me/59171902857?text=${encodeURIComponent(whatsappMessage)}`} target="_blank" rel="noopener noreferrer">
            <button className="btn-primary">
              {buttonText}
            </button>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
