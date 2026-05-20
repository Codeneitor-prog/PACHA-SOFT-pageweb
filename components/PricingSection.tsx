'use client';

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PricingPlan {
  id?: string | number;
  name: string;
  subtitle: string;
  price: string;
  description: string;
  features: string[];
  excluded: string[];
  popular: boolean;
  order_index?: number;
}

interface PricingProps {
  plans: PricingPlan[];
  settings: any;
}

export default function PricingSection({ plans, settings }: PricingProps) {
  return (
    <section className="container mx-auto px-6 mb-32 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.165, 0.84, 0.44, 1] }}
        className="text-center mb-20"
      >
        <span className="text-electric-2 font-medium text-sm uppercase tracking-[0.2em]">
          {settings.pricing_header}
        </span>
        <h2 className="text-4xl md:text-5xl font-black mt-6 mb-6 tracking-tighter">
          <span className="text-white">{settings.pricing_title.split(' ').slice(0, -2).join(' ')} </span>
          <span className="text-transparent bg-clip-text bg-linear-to-r from-electric-2 to-electric-4">{settings.pricing_title.split(' ').slice(-2).join(' ')}</span>
        </h2>
        <p className="text-gray-400 text-base max-w-2xl mx-auto font-light">
          {settings.pricing_subtitle}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 items-stretch">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.165, 0.84, 0.44, 1] }}
            whileHover={{ y: -10 }}
            className={cn(
              "relative card-glass rounded-4xl p-10 flex flex-col transition-all duration-500",
              plan.popular 
                ? "border-electric-2/60 shadow-[0_0_50px_rgba(0,229,255,0.2)] bg-electric-9/20 ring-1 ring-electric-2/30 lg:scale-105" 
                : "border-white/5 hover:border-white/20"
            )}
            style={{ zIndex: plan.popular ? 10 : 1 }}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-electric-2 text-black text-xs font-black tracking-[0.2em] shadow-[0_0_20px_#00e5ff] animate-pulse">
                MÁS POPULAR
              </div>
            )}

            <div className="text-center mb-10">
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-gray-400 font-light text-sm mb-6">{plan.subtitle}</p>
              <div className="text-5xl font-black text-white mb-2 tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                {plan.price}
              </div>
              <div className="w-12 h-1 bg-electric-2 mx-auto my-4 rounded-full" />
              <p className="text-electric-2 text-sm max-w-[200px] mx-auto font-medium">{plan.description}</p>
            </div>

            <div className="space-y-4 mb-10 grow">
              {plan.features.map((feature: string, idx: number) => (
                <div key={idx} className="flex items-start gap-3 text-gray-300 text-sm font-light">
                  <Check className="shrink-0 w-4 h-4 text-electric-2 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
              {plan.excluded.map((feature: string, idx: number) => (
                <div key={idx} className="flex items-start gap-3 text-gray-500 text-sm font-light line-through">
                  <X className="shrink-0 w-4 h-4 text-gray-600 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

             <a href={`https://wa.me/59171902857?text=${encodeURIComponent('Hola, me interesa el plan ' + plan.name + ' de ' + plan.price)}`} target="_blank" rel="noopener noreferrer" className="mt-auto block">
              <button className={cn(
                "w-full py-5 rounded-2xl font-bold text-sm tracking-widest uppercase transition-all duration-500",
                plan.popular
                  ? "bg-electric-2 text-black hover:bg-white shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                  : "bg-white/5 border border-white/10 text-white hover:bg-electric-2 hover:text-black hover:border-electric-2"
              )}>
                Elegir Plan
              </button>
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
