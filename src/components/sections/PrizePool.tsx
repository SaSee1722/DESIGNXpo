import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, ShieldCheck } from 'lucide-react';
import { SectionTitle, containerVariants, itemVariants } from './shared';

const PrizeCard = ({ rank, amount, color, delay }: { rank: string, amount: string, color: string, delay: number }) => (
  <motion.div 
    variants={itemVariants}
    custom={delay}
    whileHover={{ y: 5, scale: 1.02 }}
    className="relative group pt-16 flex flex-col items-center"
  >
    {/* Visual Tether */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1.5px] h-16 pointer-events-none overflow-visible">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-slate-200 bg-white" />
      <motion.div 
        animate={{ height: [64, 70, 64] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="w-full bg-gradient-to-b from-slate-300 via-slate-200 to-transparent opacity-60" 
      />
    </div>

    <motion.div 
      animate={{ rotate: [-0.5, 0.5, -0.5] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      className={`p-10 rounded-[3rem] glass border border-white/60 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] flex flex-col items-center text-center relative overflow-hidden group hover:backdrop-blur-3xl transition-all duration-500`}
    >
      <div className={`absolute top-0 left-0 w-full h-2 ${color}`} />
      <div className={`w-18 h-18 rounded-3xl mb-8 ${color} flex items-center justify-center text-white shadow-xl group-hover:rotate-12 group-hover:scale-110 transition-all duration-500`}>
        <Trophy className="w-10 h-10" />
      </div>
      <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.4em] mb-4">{rank}</h3>
      <div className="text-6xl font-black text-slate-800 tracking-tighter mb-6 flex items-start">
        <span className="text-xl font-bold text-sky-500 mt-2 mr-1">₹</span>{amount}
      </div>
      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 bg-slate-50/80 px-5 py-2.5 rounded-2xl border border-slate-100 group-hover:bg-sky-500/10 group-hover:text-sky-600 group-hover:border-sky-500/20 transition-all duration-500">
        Cash Prize + Goodies
      </div>

      {/* Animated glow */}
      <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-sky-400/10 blur-[40px] rounded-full group-hover:bg-sky-400/20 transition-colors" />
    </motion.div>
  </motion.div>
);

const PrizePool = () => (
  <section id="prizes" className="py-24 px-6 max-w-7xl mx-auto">
    <div className="max-w-7xl mx-auto">
      <SectionTitle subtitle="Rewards" title="Prize Pool" />
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <PrizeCard rank="1st Place" amount="2,000" color="bg-amber-400" delay={0.1} />
        <PrizeCard rank="2nd Place" amount="1,000" color="bg-slate-300" delay={0.2} />
        <PrizeCard rank="3rd Place" amount="500" color="bg-orange-400" delay={0.3} />
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="mt-16 text-center"
      >
        <div className="inline-flex items-center gap-2 p-4 glass rounded-2xl border border-sky-100 text-slate-600 hover:scale-105 transition-transform cursor-default">
          <ShieldCheck className="w-5 h-5 text-sky-500" />
          <span className="font-bold">Certificates for all participants + Exclusive Swags for Winners</span>
        </div>
      </motion.div>
    </div>
  </section>
);

export default PrizePool;
