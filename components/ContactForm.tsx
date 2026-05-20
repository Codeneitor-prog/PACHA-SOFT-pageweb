'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  name: z.string().min(2, "El nombre es obligatorio"),
  email: z.string().email("Correo electrónico inválido"),
  phone: z.string().min(8, "El número de contacto es obligatorio"),
  type: z.string().min(1, "Selecciona un tipo de proyecto"),
  budget: z.string().optional(),
  reference: z.string().optional(),
  message: z.string().min(10, "Cuéntanos un poco más sobre tu proyecto"),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // 1. Enviar a Formspree
      await fetch("https://formspree.io/f/xdajaook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data)
      });


      // 2. Enviar a Google Sheets
      const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx7P90muEgO3NeC5kqmZ2jCMIo5Szan_jrcNp_DdDXU_AkRooRR2YwU50Ue32DX9RWi/exec";
      
      const sheetData = new URLSearchParams();
      sheetData.append("fecha", new Date().toLocaleString("es-BO"));
      Object.entries(data).forEach(([key, value]) => {
        sheetData.append(key, value || "");
      });

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: sheetData.toString()
      });


      setIsSuccess(true);
      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("Error al enviar el formulario", error);
      // Opcionalmente manejar el error en la UI
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="card-glass p-8 md:p-12 rounded-[3rem] relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-electric-2/5 blur-[80px] -mr-32 -mt-32" />
        
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.form 
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onSubmit={handleSubmit(onSubmit)} 
              className="space-y-8 relative z-10"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400 ml-2 uppercase tracking-widest">Nombre completo *</label>
                  <input 
                    {...register("name")}
                    placeholder="Ej. Juan Pérez"
                    className={cn(
                      "w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-electric-2/50 focus:bg-white/10 transition-all",
                      errors.name && "border-red-500/50"
                    )}
                  />
                  {errors.name && <p className="text-red-400 text-xs ml-2">{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400 ml-2 uppercase tracking-widest">Correo electrónico *</label>
                  <input 
                    {...register("email")}
                    type="email"
                    placeholder="ejemplo@correo.com"
                    className={cn(
                      "w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-electric-2/50 focus:bg-white/10 transition-all",
                      errors.email && "border-red-500/50"
                    )}
                  />
                  {errors.email && <p className="text-red-400 text-xs ml-2">{errors.email.message}</p>}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400 ml-2 uppercase tracking-widest">Teléfono / WhatsApp *</label>
                  <input 
                    {...register("phone")}
                    placeholder="Ej: 71902857"
                    className={cn(
                      "w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-electric-2/50 focus:bg-white/10 transition-all",
                      errors.phone && "border-red-500/50"
                    )}
                  />
                  {errors.phone && <p className="text-red-400 text-xs ml-2">{errors.phone.message}</p>}
                </div>

                {/* Project Type */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400 ml-2 uppercase tracking-widest">Tipo de Proyecto *</label>
                  <select 
                    {...register("type")}
                    className={cn(
                      "w-full bg-[#121212] border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-electric-2/50 focus:bg-white/10 transition-all appearance-none",
                      errors.type && "border-red-500/50"
                    )}
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="corporate">Web Corporativa</option>
                    <option value="ecommerce">Tienda Online</option>
                    <option value="landing">Landing Page</option>
                    <option value="custom">Proyecto a medida</option>
                  </select>
                  {errors.type && <p className="text-red-400 text-xs ml-2">{errors.type.message}</p>}
                </div>

                {/* Budget */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400 ml-2 uppercase tracking-widest">Presupuesto estimado (Opcional)</label>
                  <select 
                    {...register("budget")}
                    className={cn(
                      "w-full bg-[#121212] border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-electric-2/50 focus:bg-white/10 transition-all appearance-none",
                      errors.budget && "border-red-500/50"
                    )}
                  >
                    <option value="">Selecciona un rango</option>
                    <option value="500-1000">Menos de $1000</option>
                    <option value="1000-3000">$1000 - $3000</option>
                    <option value="3000-5000">$3000 - $5000</option>
                    <option value="5000+">Más de $5000</option>
                  </select>
                  {errors.budget && <p className="text-red-400 text-xs ml-2">{errors.budget.message}</p>}
                </div>

                {/* Reference */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400 ml-2 uppercase tracking-widest">Referencias / Ideas (Opcional)</label>
                  <input 
                    {...register("reference")}
                    placeholder="URL de alguna web que te guste"
                    className={cn(
                      "w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-electric-2/50 focus:bg-white/10 transition-all",
                      errors.reference && "border-red-500/50"
                    )}
                  />
                  {errors.reference && <p className="text-red-400 text-xs ml-2">{errors.reference.message}</p>}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 ml-2 uppercase tracking-widest">Cuéntanos sobre tu idea *</label>
                <textarea 
                  {...register("message")}
                  rows={4}
                  placeholder="Describe qué necesitas y tus objetivos..."
                  className={cn(
                    "w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-electric-2/50 focus:bg-white/10 transition-all resize-none",
                    errors.message && "border-red-500/50"
                  )}
                />
                {errors.message && <p className="text-red-400 text-xs ml-2">{errors.message.message}</p>}
              </div>

              <button 
                disabled={isSubmitting}
                className="w-full btn-primary py-5 rounded-2xl flex items-center justify-center gap-3 group relative overflow-hidden"
              >
                {isSubmitting ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    <span className="relative z-10 tracking-[0.2em] font-bold">ENVIAR SOLICITUD</span>
                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform relative z-10" />
                  </>
                )}
              </button>
            </motion.form>
          ) : (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 flex flex-col items-center text-center space-y-6"
            >
              <div className="w-24 h-24 rounded-full bg-electric-2/10 flex items-center justify-center border border-electric-2/30 shadow-[0_0_30px_rgba(0,229,255,0.2)]">
                <CheckCircle2 className="w-12 h-12 text-electric-2" />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-white">¡RECIBIDO CON ÉXITO!</h3>
                <p className="text-gray-400 max-w-sm mx-auto">
                  Hemos recibido tu solicitud. Un consultor experto se pondrá en contacto contigo en las próximas 24 horas.
                </p>
              </div>
              <button 
                onClick={() => setIsSuccess(false)}
                className="text-electric-2 text-sm font-medium hover:underline tracking-widest"
              >
                ENVIAR OTRO MENSAJE
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

