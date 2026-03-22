import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Brain, Layout, Code } from 'lucide-react';
import { SectionTitle, containerVariants, itemVariants } from './shared';

const About = () => (
  <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <SectionTitle subtitle="Overview" title="About the Event" centered={false} />
        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
          DesignXpo 1.0 is a 2-hour offline creative design challenge where participants will receive a problem statement and must design a website that solves the problem using innovative UI/UX ideas.
        </p>
        <div className="grid grid-cols-2 gap-6">
          {[
            { label: 'Creativity', icon: <Zap className="w-5 h-5" /> },
            { label: 'Problem Solving', icon: <Brain className="w-5 h-5" /> },
            { label: 'UI/UX Design', icon: <Layout className="w-5 h-5" /> },
            { label: 'Web Development', icon: <Code className="w-5 h-5" /> }
          ].map((item, i) => (
            <motion.div key={i} variants={itemVariants} className="flex items-center gap-3 p-4 glass rounded-2xl border border-indigo-50 hover:bg-white hover:shadow-xl hover:shadow-indigo-100 transition-all cursor-default">
              <div className="text-indigo-500">{item.icon}</div>
              <span className="font-bold text-slate-700">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <div className="relative h-[500px]">
        <div className="grid grid-cols-2 gap-6 h-full">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-[2.5rem] overflow-hidden shadow-2xl shadow-indigo-100 relative z-20 h-[80%] group self-start border-4 border-white"
          >
            <img 
              src="/assets/workspace.png" 
              alt="UI Design Workspace" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
              <span className="text-white font-bold text-xs tracking-widest uppercase">UX Interface</span>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: -30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-[2.5rem] overflow-hidden shadow-2xl shadow-indigo-100 relative z-10 h-[80%] mt-auto group border-4 border-white"
          >
            <img 
              src="/assets/prototyping.png" 
              alt="UX Prototyping" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
              <span className="text-white font-bold text-xs tracking-widest uppercase">Prototyping</span>
            </div>
          </motion.div>
        </div>
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-indigo-100 rounded-full blur-[80px] opacity-40 animate-pulse" />
        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-indigo-100 rounded-full blur-[80px] opacity-40 animate-pulse" />
      </div>
    </div>
  </section>
);

export default About;
