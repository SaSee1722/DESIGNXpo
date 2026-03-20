import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface GlassCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  delay?: number;
}

const GlassCard: React.FC<GlassCardProps> = ({ title, description, icon: Icon, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.8, 
        delay: delay,
        ease: [0.16, 1, 0.3, 1]
      }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -10,
        transition: { duration: 0.3 }
      }}
      className="glass group relative p-8 h-[300px] flex flex-col items-center justify-center text-center overflow-hidden"
    >
      {/* Dynamic Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Icon Container */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <Icon className="w-12 h-12 text-primary relative z-10 group-hover:text-white transition-colors duration-500" />
      </div>

      <h3 className="text-2xl font-bold mb-4 text-slate-800 group-hover:text-sky-500 transition-colors duration-300">
        {title}
      </h3>
      
      <p className="text-slate-500 group-hover:text-slate-600 transition-colors duration-300 leading-relaxed">
        {description}
      </p>

      {/* Border Glow Line */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-sky-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </motion.div>
  );
};

export default GlassCard;
