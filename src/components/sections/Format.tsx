import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle, containerVariants, itemVariants } from './shared';

const Format = () => (
  <section id="format" className="py-24 px-6 bg-slate-50/50">
    <div className="max-w-7xl mx-auto">
      <SectionTitle subtitle="Workflow" title="Challenge Format" />
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {[
          { number: "01", title: "Problem Statement", desc: "Receive a real-world problem statement at the start of the event." },
          { number: "02", title: "Analysis", desc: "Analyze the problem and brainstorm creative solutions with your team." },
          { number: "03", title: "Design Phase", desc: "Design a high-fidelity website prototype in Figma or develop with code." },
          { number: "04", title: "Final Pitch", desc: "Present your solution and design thinking to our expert judges." }
        ].map((step, i) => (
          <motion.div 
            key={i}
            variants={itemVariants}
            className="flex gap-6 p-8 glass rounded-3xl border border-sky-100 relative group hover:bg-white hover:shadow-2xl hover:shadow-sky-100 transition-all duration-500"
          >
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-sky-600 text-white rounded-xl flex items-center justify-center font-black text-xl shadow-lg ring-4 ring-white group-hover:scale-110 group-hover:bg-indigo-600 transition-all">
              {step.number}
            </div>
            <div className="mt-2">
              <h3 className="text-xl font-bold mb-2 text-slate-800 group-hover:text-sky-600 transition-colors">{step.title}</h3>
              <p className="text-slate-500 text-sm">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default Format;
