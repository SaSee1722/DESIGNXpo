import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, AlertTriangle, Code } from 'lucide-react';
import { SectionTitle, containerVariants, itemVariants } from './shared';

const Details = () => (
  <section id="details" className="py-24 px-6 max-w-7xl mx-auto space-y-24">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="space-y-12"
      >
        <SectionTitle subtitle="The Panel" title="Event Co-ordinators" centered={false} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { name: 'VIDHARSHANA SHREE R', dept: 'II CSE B', image: '/vidharshana_profile.jpg', objectPosition: 'object-center' },
            { name: 'MUTHUSELVAN SP', dept: 'II CSE B', image: '/muthuselvan_profile.jpg', objectPosition: 'object-center' }
          ].map((item, i) => (
            <motion.div 
              key={i} 
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              className="flex flex-col items-center gap-6 p-8 glass rounded-[2.5rem] border border-sky-50 shadow-sm hover:bg-white hover:shadow-xl transition-all text-center"
            >
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl flex-shrink-0">
                <img src={item.image} alt={item.name} className={`w-full h-full object-cover ${item.objectPosition}`} loading="lazy" />
              </div>
              <div>
                <h4 className="font-black text-slate-900 text-xl mb-0.5">{item.name}</h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">{item.dept}</p>
                <p className="text-xs text-sky-600 font-black uppercase tracking-[0.2em]">Co-ordinator</p>
              </div>
            </motion.div>
          ))}

        </div>
      </motion.div>
      
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="space-y-12"
      >
        <SectionTitle subtitle="Logistics" title="Event Details" centered={false} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {[
            { label: 'Date', value: '27 March', icon: <Calendar /> },
            { label: 'Venue', value: 'CC1 & CC2', icon: <MapPin /> },
            { label: 'Time', value: '9:00 AM - 12:30 PM', icon: <Clock /> },
            { label: 'Deadline', value: '27 March, 8:30 AM', icon: <AlertTriangle /> }
          ].map((item, i) => (
            <motion.div key={i} variants={itemVariants} className="space-y-3 group">
              <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-all duration-300">
                {item.icon}
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">{item.label}</h4>
                <p className="text-xl font-black text-slate-800 tracking-tight group-hover:text-sky-600 transition-colors">{item.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>

    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="space-y-12"
    >
      <SectionTitle subtitle="Technical Team" title="Web Developers" centered={false} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { name: 'SALABADESHWARAN', dept: 'II CSE B', role: 'Lead Developer' },
          { name: 'MITHRAN', dept: 'II CSE B', role: 'Frontend Developer' },
          { name: 'SANJAY', dept: 'II CSE B', role: 'Backend Developer' },
          { name: 'RAJARAJAN', dept: 'II CSE B', role: 'UI/UX Designer' }
        ].map((item, i) => (
          <motion.div 
            key={i} 
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -10 }}
            className="flex flex-col items-center gap-6 p-8 glass rounded-[2.5rem] border-2 border-sky-500 shadow-xl shadow-sky-100/50 hover:bg-white hover:shadow-2xl transition-all text-center"
          >
            <div>
              <h4 className="font-black text-slate-900 text-xl mb-1">{item.name}</h4>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-3">{item.dept}</p>
              <span className="px-4 py-1 rounded-full bg-sky-600 text-white text-[10px] font-black uppercase tracking-[0.2em]">
                {item.role}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center pt-12 text-center"
    >
      <motion.a
        href="#register"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group relative px-12 py-6 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-[0.3em] text-sm overflow-hidden transition-all shadow-2xl hover:shadow-sky-500/20"
      >
        <span className="relative z-10">Register Now</span>
        <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.a>
      <p className="mt-6 text-slate-400 font-bold uppercase tracking-widest text-[10px]">Limited Slots Available</p>
    </motion.div>
  </section>
);

export default Details;
