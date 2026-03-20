import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, ShieldCheck } from 'lucide-react';
import { SectionTitle, containerVariants, itemVariants } from './shared';

const PrizeCard = ({ rank, amount, color }: { rank: string, amount: string, color: string, delay: number }) => (
  <motion.div 
    variants={itemVariants}
    whileHover={{ y: -10, scale: 1.02 }}
    className={`p-10 rounded-[2.5rem] glass border border-sky-100 shadow-xl flex flex-col items-center text-center relative overflow-hidden group hover:bg-white transition-all duration-500`}
  >
    <div className={`absolute top-0 left-0 w-full h-2 ${color}`} />
    <div className={`w-16 h-16 rounded-3xl mb-6 ${color} flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform`}>
      <Trophy className="w-8 h-8" />
    </div>
    <h3 className="text-xl font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">{rank}</h3>
    <div className="text-5xl font-black text-slate-900 tracking-tighter mb-4">
      <span className="text-2xl font-bold text-sky-600 mr-1">₹</span>{amount}
    </div>
    <div className="text-sm font-semibold text-slate-500 bg-slate-50 px-4 py-2 rounded-full border border-slate-100 group-hover:bg-sky-50 group-hover:text-sky-600 transition-colors">
      Cash Prize + Goodies
    </div>
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
