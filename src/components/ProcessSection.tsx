import React from 'react';
import { motion } from 'framer-motion';

const ProcessStep = ({ number, title, description, icon, isLast }: { number: string, title: string, description: string, icon: React.ReactNode, isLast: boolean }) => (
  <div className="relative">
    <div className="flex items-start gap-8 mb-16 relative">
      <div className="flex-shrink-0 relative z-20">
        <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-sky-400 font-bold text-xl group hover:border-sky-500 transition-colors shadow-lg shadow-sky-500/10">
          {icon}
        </div>
      </div>
      <div className="flex-grow pt-2">
        <span className="text-sky-500 font-bold text-sm tracking-widest uppercase mb-2 block">{number}</span>
        <h3 className="text-2xl font-bold text-slate-900 mb-4">{title}</h3>
        <p className="text-slate-600 leading-relaxed max-w-xl">{description}</p>
      </div>
      {!isLast && (
        <div className="absolute left-[31px] top-16 w-[2px] h-[calc(100%+64px)] bg-gradient-to-b from-sky-400/50 via-slate-200 to-transparent -z-10" />
      )}
    </div>
  </div>
);

const ProcessSection: React.FC = () => {
  return (
    <section id="process" className="py-24 relative overflow-hidden bg-white">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-block px-4 py-2 bg-sky-50 text-sky-600 rounded-full text-sm font-semibold mb-6 tracking-wide">
            Our Methodology
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            The <span className="text-sky-600">Science</span> of Connection
          </h2>
          <p className="text-slate-600 text-lg">
            We've developed a unique framework for bridging the gap between digital and physical spaces through advanced spatial intelligence.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <ProcessStep 
            number="Phase 01"
            title="Spatial Scanning"
            description="Our neural engines analyze the underlying architecture of your digital environment, mapping every interaction point with millimeter precision."
            icon={<svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-current stroke-2"><path d="M3 3h18v18H3z"/><path d="M12 8v8m-4-4h8"/></svg>}
            isLast={false}
          />
          <ProcessStep 
            number="Phase 02"
            title="Neural Synthesis"
            description="Advanced LLMs process these data points to generate meaningful connections, creating an emergent intelligence that understands user intent."
            icon={<svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-current stroke-2"><circle cx="12" cy="12" r="3"/><path d="M12 5V3m0 18v-2M5 12H3m18 0h-2M7.05 7.05L5.64 5.64m12.72 12.72l-1.41-1.41M16.95 7.05l1.41-5.64M7.05 16.95l-1.41 1.41"/></svg>}
            isLast={false}
          />
          <ProcessStep 
            number="Phase 03"
            title="Ambient Rendering"
            description="The final layer brings the experience to life through immersive visuals and soundscapes that adapt in real-time to human movement and interaction."
            icon={<svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-current stroke-2"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>}
            isLast={true}
          />
        </div>
      </div>
      
      {/* Mesh Background Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mesh-grid" />
    </section>
  );
};

export default ProcessSection;
