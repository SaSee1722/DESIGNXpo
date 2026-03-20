import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle, ShieldCheck, Cpu } from 'lucide-react';
import { SectionTitle, containerVariants, itemVariants } from './shared';

const ToolCard = ({ name, type }: { name: string, type: 'allowed' | 'restricted' }) => (
  <div className={`p-4 rounded-2xl flex items-center gap-3 ${type === 'allowed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'}`}>
    {type === 'allowed' ? <CheckCircle2 className="w-5 h-5 flex-shrink-0" /> : <AlertTriangle className="w-5 h-5 flex-shrink-0" />}
    <span className="font-bold">{name}</span>
  </div>
);

const Tools = () => (
  <section id="tools" className="py-24 px-6 max-w-7xl mx-auto">
    <div className="max-w-7xl mx-auto">
      <SectionTitle subtitle="Environment" title="Tools & Restrictions" />
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12"
      >
        <motion.div 
          variants={itemVariants}
          className="glass p-10 rounded-[2.5rem] border border-emerald-100 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-emerald-100 transition-colors" />
          <div className="flex items-center gap-4 mb-8 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900">Allowed Assistants</h3>
              <p className="text-slate-500 text-sm">For code suggestions only</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
            {['ChatGPT', 'Gemini', 'Claude', 'Grok', 'DeepSeek'].map(item => (
              <ToolCard key={item} name={item} type="allowed" />
            ))}
          </div>
          <p className="mt-8 text-sm text-slate-500 italic p-4 bg-slate-50 rounded-xl border border-slate-100 italic relative z-10">
            Note: Use of AI for code suggestions and design inspiration is allowed.
          </p>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="glass p-10 rounded-[2.5rem] border border-rose-100 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-rose-100 transition-colors" />
          <div className="flex items-center gap-4 mb-8 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-600 group-hover:scale-110 transition-transform">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900">Restricted Tools</h3>
              <p className="text-slate-500 text-sm">Strictly prohibited tools</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
            {['Cursor', 'Antigravity', 'Trae'].map(item => (
              <ToolCard key={item} name={item} type="restricted" />
            ))}
          </div>
          <p className="mt-8 text-sm text-rose-500 font-medium bg-rose-50/50 p-4 rounded-xl border border-rose-100 relative z-10">
            AI coding editors and vibe-coding tools are not permitted in this challenge.
          </p>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default Tools;
