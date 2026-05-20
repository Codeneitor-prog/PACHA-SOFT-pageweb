'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, MessageCircle } from 'lucide-react';

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseOut = (e: MouseEvent) => {
      if (!hasShown && e.clientY <= 0) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseOut);
    return () => document.removeEventListener('mouseleave', handleMouseOut);
  }, [hasShown]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-9999 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          className="relative max-w-lg w-full card-glass p-10 rounded-[3rem] overflow-hidden text-center space-y-8"
        >
          <button 
            onClick={() => setIsVisible(false)}
            className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="w-20 h-20 bg-electric-2/10 rounded-full flex items-center justify-center mx-auto border border-electric-2/30 shadow-[0_0_30px_rgba(0,229,255,0.2)]">
            <Gift className="w-10 h-10 text-electric-2" />
          </div>

          <div className="space-y-4">
            <h2 className="text-4xl font-black text-white leading-tight tracking-tighter">
              ¡ESPERA! <br />
              <span className="text-electric-2">TENEMOS UN REGALO</span>
            </h2>
            <p className="text-gray-400 font-light">
              Obtén un <span className="text-white font-bold">15% de descuento</span> en tu primer proyecto si solicitas tu cotización hoy mismo.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <a 
              href="https://wa.me/59171902857?text=Hola%20Pacha%20Soft,%20quiero%20reclamar%20mi%20descuento%20del%2015%%20para%20mi%20web."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary py-4 rounded-2xl flex items-center justify-center gap-3 group"
            >
              <span className="tracking-[0.2em] font-bold">RECLAMAR DESCUENTO</span>
              <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
            <button 
              onClick={() => setIsVisible(false)}
              className="text-gray-500 text-xs hover:text-gray-300 uppercase tracking-widest font-medium transition-colors"
            >
              No gracias, prefiero pagar el precio completo
            </button>
          </div>

          {/* Decorative Background */}
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-electric-2 to-transparent" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
