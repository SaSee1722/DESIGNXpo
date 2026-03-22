import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { SectionTitle, containerVariants, itemVariants } from './shared';

const Judging = () => {
  const criteria = [
    { title: 'Creativity & Innovation', desc: 'Originality and creative approach to solving the problem statement.' },
    { title: 'User Interface Design', desc: 'Visual appeal, consistency, and professional aesthetic of the design.' },
    { title: 'User Experience (UX)', desc: 'Intuitive navigation, ease of use, and overall user flow.' },
    { title: 'Problem Understanding', desc: 'How well the solution addresses the specific pain points mentioned.' },
    { title: 'Functionality & Feasibility', desc: 'Practicality of the solution and its technical viability.' },
    { title: 'Presentation of the Idea', desc: 'Clarity and persuasiveness of the final solution pitch.' }
  ];

  return (
    <section id="judging" className="py-24 px-6 bg-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.05),transparent)]" />
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionTitle subtitle="Evaluation" title="Judging Criteria" />
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {criteria.map((item, i) => (
            <motion.div 
              key={i}
              variants={itemVariants}
              className="p-8 rounded-[2.5rem] bg-slate-50/50 border border-indigo-100 hover:border-indigo-500/50 transition-all group hover:bg-white hover:shadow-2xl hover:shadow-indigo-100/50"
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300 shadow-sm">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-indigo-600 transition-colors">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Judging;
