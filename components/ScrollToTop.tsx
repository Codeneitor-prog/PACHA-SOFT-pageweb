'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Forzar el scroll al inicio de forma inmediata al cambiar de ruta
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
