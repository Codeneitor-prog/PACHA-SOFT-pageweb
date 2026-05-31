'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  const whatsappUrl = "https://wa.me/59171902857?text=Hola%20Pacha%20Soft,%20vi%20su%20web%20y%20quiero%20una%20cotizaci%C3%B3n%20para%20mi%20negocio%20en%20La%20Paz.";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-999 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.4)] group floating-whatsapp-enter hover:scale-110 active:scale-90 transition-transform duration-200"
    >
      <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 group-hover:opacity-40" />
      <MessageCircle className="w-8 h-8 text-white relative z-10" />
      
      {/* Tooltip */}
      <div className="absolute right-full mr-4 bg-white text-black px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
        ¿Necesitas ayuda? ¡Hablemos!
        <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-white rotate-45" />
      </div>
    </a>
  );
}
