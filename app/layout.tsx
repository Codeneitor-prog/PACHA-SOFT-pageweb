import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InteractiveBackground from "@/components/InteractiveBackground";
import CustomCursor from "@/components/CustomCursor";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import ScrollToTop from "@/components/ScrollToTop";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Pacha Soft - Desarrollo Web",
  description: "Creamos páginas web modernas y elegantes que impulsan tu negocio en el mundo digital. Diseño web personalizado, e-commerce y optimización SEO en La Paz, Bolivia.",
  keywords: "desarrollo web, diseño web, La Paz Bolivia, páginas web, e-commerce, SEO, Pacha Soft",
  authors: [{ name: "Pacha Soft" }],
  icons: {
    icon: "/img/pachaLog.png",
    apple: "/img/pachaLog.png",
  },
  openGraph: {
    title: "Pacha Soft - Desarrollo Web Premium",
    description: "Diseño web moderno y profesional",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Pacha Soft",
  "image": "https://pachasoft.com/img/pachaLog.png",
  "@id": "",
  "url": "https://pachasoft.com",
  "telephone": "+59171902857",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "La Paz",
    "addressLocality": "La Paz",
    "addressRegion": "La Paz",
    "addressCountry": "BO"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -16.4897,
    "longitude": -68.1193
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "opens": "09:00",
    "closes": "18:00"
  },
  "sameAs": [
    "https://facebook.com/pachasoft",
    "https://instagram.com/pachasoft"
  ],
  "priceRange": "Bs 500 - Bs 5500"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} antialiased selection:bg-electric-4 selection:text-white`}>
        <ScrollToTop />
        <div className="relative min-h-screen flex flex-col">
          {/* Background Effects */}
          <InteractiveBackground />
          <CustomCursor />
          <FloatingWhatsApp />
          <ExitIntentPopup />

          {/* Content */}
          <div className="relative z-50 flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow pt-24">
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
