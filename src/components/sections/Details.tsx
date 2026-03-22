import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, AlertTriangle, Code } from 'lucide-react';
import { SectionTitle, containerVariants, itemVariants } from './shared';

const Details = () => (
  <section id="details" className="py-24 px-6 max-w-7xl mx-auto space-y-20 relative overflow-hidden">
    {/* Decorative background element */}
    <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-[0.03]">
      <Code className="w-96 h-96 -mr-20 -mt-20 text-indigo-900" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
      {/* Leadership Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="space-y-12"
      >
        <div className="flex flex-col gap-2">
          <SectionTitle subtitle="Visionary Panel" title="Event Leadership" centered={false} />
          <div className="h-1 bg-indigo-500 w-16 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { name: 'VIDHARSHANA SHREE R', dept: 'II CSE B', image: '/vidharshana_profile.jpg' },
            { name: 'MUTHUSELVAN SP', dept: 'II CSE B', image: '/muthuselvan_profile.jpg' }
          ].map((item, i) => (
            <motion.div 
              key={i} 
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="relative group pt-10"
            >
              {/* Refined Cable Visual */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-slate-100 bg-white shadow-sm z-10" />
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-slate-100" />

              <div className="h-full flex flex-col items-center gap-6 p-8 glass rounded-[2.5rem] border border-white/60 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] transition-all duration-500 text-center">
                <div className="w-28 h-28 rounded-3xl overflow-hidden border-4 border-white shadow-xl flex-shrink-0 relative group-hover:scale-105 transition-transform duration-500">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-lg mb-1 tracking-tight leading-tight">{item.name}</h4>
                  <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em] mb-4">{item.dept}</p>
                  <p className="text-[9px] text-indigo-600 font-black uppercase tracking-[0.2em] py-1.5 px-4 bg-indigo-50/50 rounded-full inline-block border border-indigo-100">Co-ordinator</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Schedule Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="space-y-12"
      >
        <div className="flex flex-col gap-2">
          <SectionTitle subtitle="Protocol" title="Event Schedule" centered={false} />
          <div className="h-1 bg-indigo-500 w-16 rounded-full" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-2">
          {[
            { label: 'Date', value: '27 March', icon: Calendar, color: 'text-indigo-500', bg: 'bg-indigo-50/50' },
            { label: 'Venue', value: 'CC1 & CC2', icon: MapPin, color: 'text-emerald-500', bg: 'bg-emerald-50/50' },
            { label: 'Time', value: '09:00 - 12:30', icon: Clock, color: 'text-indigo-500', bg: 'bg-indigo-50/50' },
            { label: 'Deadline', value: '27 March, 8:30', icon: AlertTriangle, color: 'text-rose-500', bg: 'bg-rose-50/50' }
          ].map((item, i) => (
            <motion.div 
              key={i} 
              variants={itemVariants} 
              whileHover={{ y: -8 }}
              className="flex flex-col p-6 glass rounded-3xl border border-white/60 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] transition-all duration-500 gap-4 h-full"
            >
              <div className="bg-indigo-50/50 w-12 h-12 rounded-2xl flex items-center justify-center text-indigo-500 mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-sm">
                <item.icon size={18} />
              </div>
              <div className="space-y-1">
                <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">{item.label}</h4>
                <p className="text-lg font-black text-slate-800 tracking-tight leading-tight">{item.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>

    {/* Engineering Lead Spotlight */}
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="space-y-10"
    >
      <div className="flex items-center justify-between">
        <SectionTitle subtitle="Architecture" title="Engineering Lead" centered={false} />
      </div>
      
      <motion.div 
        variants={itemVariants}
        whileHover={{ y: -5 }}
        className="p-1 glass rounded-[3.5rem] border border-indigo-400/30 shadow-[0_40px_100px_-20px_rgba(79,70,229,0.15)] overflow-hidden group"
      >
        <div className="bg-white/40 backdrop-blur-3xl rounded-[3.25rem] p-10 flex flex-col md:flex-row items-center gap-10 md:gap-14 border border-white/80">
          <div className="w-56 h-56 rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl relative transition-transform duration-700">
            <img src="/team/salabadeshwaran.jpg" alt="Salabadeshwaran" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
              <span className="px-5 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.3em] shadow-lg">Lead Developer</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            
            <h4 className="text-2xl md:text-3xl font-black text-slate-900 mb-2 tracking-tighter uppercase italic">SALABADESHWARAN S</h4>
            <p className="text-sm text-slate-500 font-bold uppercase tracking-[0.5em] mb-1">II CSE B • DESIGN XPO • VIBECODER</p>
            <p className="text-[10px] text-indigo-600 font-extrabold uppercase tracking-widest mb-6">SHREE SAKTHI ENGINEERING COLLEGE - KARAMADAI</p>
            
            <p className="text-slate-600 text-sm font-medium leading-relaxed max-w-2xl mb-8 mx-auto md:mx-0">
              Responsible for the technical architecture and seamless delivery of DesignXpo 1.0. 
              Passionate about building performant web platforms that push the boundaries of 
              modern UI/UX design.
            </p>
            
          </div>
        </div>
      </motion.div>
    </motion.div>

  </section>
);

export default Details;
