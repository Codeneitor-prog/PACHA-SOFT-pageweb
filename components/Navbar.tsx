'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const navLinks = [
  { name: 'Inicio', href: '/' },
  { name: 'Sobre Nosotros', href: '/sobre-nosotros' },
  { name: 'Servicios', href: '/servicios' },
  { name: 'Portafolio', href: '/portafolio' },
  { name: 'Contacto', href: '/contacto' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.165, 0.84, 0.44, 1] }}
      className={`fixed top-0 left-0 w-full z-100 transition-all duration-500 ${
        isOpen 
          ? 'bg-black/95 backdrop-blur-2xl' 
          : isScrolled 
            ? 'bg-black/70 backdrop-blur-xl py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-electric-2/10' 
            : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group relative">
          <div className="absolute inset-0 bg-electric-2/20 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-700"></div>
          <div className="relative w-10 h-10">
            <Image src="/img/pachaLog.png" alt="Logo" fill className="object-contain" sizes="40px" priority />
          </div>
          <span className="text-xl font-bold tracking-[0.2em] bg-clip-text text-transparent bg-linear-to-r from-electric-1 via-electric-2 to-electric-4">
            PACHA SOFT
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="relative text-sm font-medium text-gray-300 hover:text-white transition-colors uppercase tracking-widest group"
            >
              {link.name}
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-electric-2 group-hover:w-full transition-all duration-300 ease-out"></span>
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-electric-2 blur-xs group-hover:w-full transition-all duration-300 ease-out opacity-0 group-hover:opacity-100"></span>
            </Link>
          ))}
          <a href="https://wa.me/59171902857?text=Hola,%20me%20gustar%C3%ADa%20cotizar%20un%20proyecto." target="_blank" rel="noopener noreferrer">
            <button className="btn-primary ml-2 p-3 flex items-center justify-center rounded-full">
              <FaWhatsapp size={20} />
            </button>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-white relative z-50 transition-transform active:scale-90" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} className="text-electric-2" /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for Tablet/Mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[-2] lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen bg-black/98 z-[-1] flex flex-col justify-center lg:hidden p-10 w-full sm:w-[70%] md:w-[60%] border-l border-white/5"
            >
            <div className="flex flex-col gap-6 max-w-xs">
              {navLinks.map((link, index) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
                  key={link.name}
                >
                  <Link 
                    href={link.href} 
                    onClick={() => setIsOpen(false)}
                    className="text-4xl font-bold tracking-tighter text-white hover:text-electric-2 transition-all duration-300 flex items-center gap-4 group"
                  >
                    <span className="text-xs font-mono text-electric-2/40 group-hover:text-electric-2 transition-colors">0{index + 1}</span>
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + navLinks.length * 0.1, duration: 0.5 }}
                className="mt-12 pt-12 border-t border-white/10"
              >
                <p className="text-gray-500 text-xs uppercase tracking-[0.3em] mb-6">Proyecto en mente?</p>
                <a href="https://wa.me/59171902857?text=Hola,%20me%20gustar%C3%ADa%20cotizar%20un%20proyecto." target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}>
                  <button className="flex items-center gap-3 text-white hover:text-electric-2 transition-colors group">
                    <span className="text-sm font-bold tracking-widest uppercase">Cotizar ahora</span>
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-electric-2 group-hover:bg-electric-2/10 transition-all">
                      <FaWhatsapp size={18} />
                    </div>
                  </button>
                </a>
              </motion.div>
            </div>

            {/* Background decorative element */}
            <div className="absolute bottom-0 right-0 p-10 opacity-10 pointer-events-none">
              <span className="text-[15vh] font-black text-white leading-none select-none">PACHA</span>
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
