# PACHA SOFT - Sitio Web Premium con Estilo Gaming

¡Bienvenido al sitio web de **PACHA SOFT**! Una agencia de desarrollo web en La Paz, Bolivia, con un diseño moderno, elegante y gaming-style.

## 🚀 Tecnologías Utilizadas

- **Next.js 15** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utilitarios
- **Framer Motion** - Animaciones avanzadas
- **Lucide React** - Iconos modernos
- **React Icons** - Iconos de redes sociales
- **Swiper** - Carruseles y sliders

## ✨ Características Principales

### Diseño Gaming Premium

- ✅ Tema oscuro con acentos cyan/azul brillante
- ✅ Efectos de brillo (glow) en textos y elementos
- ✅ Glassmorphism (efecto de vidrio esmerilado)
- ✅ Gradientes animados
- ✅ Partículas y grid patterns de fondo
- ✅ Scrollbar personalizado

### Componentes Interactivos

- ✅ **Navbar** con glassmorphism y menú móvil animado
- ✅ **Carrusel 3D** con perspectiva y auto-play
- ✅ **Tarjetas** con hover effects y animaciones
- ✅ **Footer** completo con redes sociales
- ✅ **Formularios** con validación y diseño premium

### Páginas Implementadas

1. **Inicio (`/`)**
   - Hero section con estadísticas
   - Carrusel 3D de proyectos destacados
   - Grid de beneficios con iconos animados
   - CTA (Call to Action) con gradiente animado

2. **Servicios (`/servicios`)**
   - Grid de servicios con tarjetas interactivas
   - Timeline del proceso de trabajo
   - Características detalladas de cada servicio
   - CTA para solicitar servicios

3. **Portafolio (`/portafolio`)**
   - Carrusel 3D de proyectos
   - Grid de proyectos con filtros por categoría
   - Overlay con enlaces y detalles
   - Tecnologías badges

4. **Sobre Nosotros (`/sobre-nosotros`)**
   - Valores de la empresa
   - **3 Planes de Precios Detallados:**
     - **Básico** - Bs. 500
     - **Estándar** - Bs. 1,500 (Más Popular)
     - **Premium** - Bs. 3,500
   - Tabla de comparación de planes
   - Información de pago (50% inicial, 50% al finalizar)

5. **Contacto (`/contacto`)**
   - Formulario de contacto completo
   - Integración con WhatsApp
   - Tarjetas de información de contacto
   - Enlaces a redes sociales
   - Horario de atención

## 🎨 Paleta de Colores

- **Fondo Principal:** `#0a0a0f` (Negro profundo)
- **Primario:** Cyan (`#06b6d4`)
- **Secundario:** Azul (`#3b82f6`)
- **Acento:** Purple (`#8b5cf6`)
- **Texto:** Blanco / Gris claro

## 📦 Instalación y Ejecución

### Prerequisitos

- Node.js 18+ instalado
- npm o yarn

### Pasos de Instalación

```bash
# 1. Navegar al directorio del proyecto
cd pachasoft-web

# 2. Instalar dependencias
npm install

# 3. Ejecutar en modo desarrollo
npm run dev

# 4. Abrir en el navegador
# http://localhost:3000
```

### Comandos Disponibles

```bash
# Desarrollo
npm run dev

# Construcción para producción
npm run build

# Ejecutar versión de producción
npm start

# Verificar linting
npm run lint
```

## 📁 Estructura del Proyecto

```
pachasoft-web/
├── app/
│   ├── layout.tsx              # Layout principal
│   ├── page.tsx                # Página de inicio
│   ├── globals.css             # Estilos globales
│   ├── servicios/
│   │   └── page.tsx            # Página de servicios
│   ├── portafolio/
│   │   └── page.tsx            # Página de portafolio
│   ├── sobre-nosotros/
│   │   └── page.tsx            # Página sobre nosotros + precios
│   └── contacto/
│       └── page.tsx            # Página de contacto
├── components/
│   ├── Navbar.tsx              # Navegación con glassmorphism
│   ├── Footer.tsx              # Footer con redes sociales
│   └── Portfolio3DCarousel.tsx # Carrusel 3D interactivo
├── public/
│   └── img/
│       ├── pachaLog.png        # Logo de Pacha Soft
│       ├── pachasoft.png       # Imagen 1
│       └── pachasoft2.png      # Imagen 2
└── package.json
```

## 🎯 Características Técnicas

### Animaciones

- **Framer Motion** para transiciones de página
- Animaciones de entrada (fade in, slide up)
- Hover effects con scale y glow
- Gradientes animados con keyframes CSS
- Carrusel 3D con perspectiva 3D real

### Responsive Design

- Mobile-first approach
- Breakpoints: sm, md, lg, xl
- Menú hamburguesa en móvil
- Grid adaptativo

### SEO Optimizado

- Meta tags dinámicos
- OpenGraph para redes sociales
- Títulos y descripciones optimizados
- Sitemap structure
- Scroll suave

### Performance

- Server Components donde es posible
- Client Components solo cuando es necesario
- Lazy loading de imágenes
- Optimización de Next.js Image

## 🌐 Información de Contacto

- **Teléfono:** +591 71902857
- **Email:** pachasoft54@gmail.com
- **Ubicación:** La Paz, Bolivia
- **WhatsApp:** https://wa.me/59171902857

## 📝 Servicios Ofrecidos

1. **Diseño Web Personalizado**
2. **Catálogos de Tiendas / E-commerce**
3. **Mantenimiento Web**
4. **Optimización SEO**
5. **Desarrollo a Medida**
6. **Desarrollo Mobile**

## 💰 Planes de Precios

### Plan Básico - Bs. 500

- 5 páginas básicas
- Diseño minimalista
- SEO básico
- 1 mes de soporte

### Plan Estándar - Bs. 2,500 ⭐ MÁS POPULAR

- 10 páginas personalizadas
- Diseño custom con animaciones
- SEO avanzado
- Hosting/Dominio 1 año gratis
- 3 meses de soporte

### Plan Premium - Bs. 5,500

- 15+ páginas ilimitadas
- Diseño UX/UI premium
- E-commerce completo
- Blog y CMS
- SEO completo
- Hosting premium 2 años
- 6 meses de soporte ilimitado

## 🔧 Personalización

Para personalizar el sitio:

1. **Colores:** Editar `app/globals.css` - variables CSS
2. **Contenido:** Modificar archivos en `app/`
3. **Imágenes:** Reemplazar en `public/img/`
4. **Componentes:** Editar en `components/`

## 🚀 Deployment

### Vercel (Recomendado)

```bash
# Conectar con Vercel
vercel

# O usar Vercel CLI
npm run build
vercel --prod
```

### Otros Hosts

```bash
npm run build
# Subir carpeta .next y archivos necesarios
```

## 📄 Licencia

© 2025 Pacha Soft. Todos los derechos reservados.

## 🎉 ¡Gracias!

Este sitio web fue creado con pasión usando las últimas tecnologías web para ofrecer una experiencia visual increíble y un rendimiento excepcional.

---

**Desarrollado con ❤️ por Pacha Soft en La Paz, Bolivia**
# PACHA-SOFT-pageweb
