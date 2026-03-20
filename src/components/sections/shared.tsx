import { motion } from 'framer-motion';

export const SectionTitle = ({ subtitle, title, centered = true }: { subtitle: string, title: string, centered?: boolean }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`mb-16 ${centered ? 'text-center' : 'text-left'}`}
  >
    <span className="text-sky-500 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">{subtitle}</span>
    <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900">
      {title}
    </h2>
  </motion.div>
);

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};
