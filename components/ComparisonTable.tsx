'use client';

import { motion } from 'framer-motion';

interface ComparisonFeature {
  id?: string | number;
  feature: string;
  basic: string;
  standard: string;
  premium: string;
  order_index?: number;
}

interface ComparisonProps {
  features: ComparisonFeature[];
  settings: any;
}

export default function ComparisonTable({ features, settings }: ComparisonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.165, 0.84, 0.44, 1] }}
    >
      <h3 className="text-2xl sm:text-3xl font-black text-center mb-10 tracking-tighter text-white">
        {settings.comparison_title}
      </h3>
      <div className="card-glass rounded-4xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-black/40">
                <th className="text-left py-6 px-8 text-electric-2 font-semibold uppercase tracking-wider text-xs">{settings.comparison_col1}</th>
                <th className="text-center py-6 px-4 text-gray-400 font-semibold uppercase tracking-wider text-xs">{settings.comparison_col2}</th>
                <th className="text-center py-6 px-4 text-electric-2 font-semibold uppercase tracking-wider text-xs bg-electric-2/5">{settings.comparison_col3}</th>
                <th className="text-center py-6 px-4 text-gray-400 font-semibold uppercase tracking-wider text-xs">{settings.comparison_col4}</th>
              </tr>
            </thead>
            <tbody>
              {features.map((row, index) => (
                <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-5 px-8 text-white font-medium">{row.feature}</td>
                  <td className="py-5 px-4 text-center text-gray-400 font-light">{row.basic}</td>
                  <td className="py-5 px-4 text-center text-electric-2 font-medium bg-electric-2/5">{row.standard}</td>
                  <td className="py-5 px-4 text-center text-white font-medium">{row.premium}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
