import React from 'react';
import { motion } from 'framer-motion';

const VisionaryCard = ({ name, role, image, delay }: { name: string, role: string, image: string, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay }}
    className="group relative"
  >
    <div className="relative h-[450px] w-full overflow-hidden rounded-2xl">
      <img 
        src={image} 
        alt={name} 
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
      
      <div className="absolute bottom-0 left-0 p-8 w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-2xl font-bold text-white mb-1">{name}</h3>
        <p className="text-indigo-400 font-medium tracking-wider text-sm uppercase mb-4">{role}</p>
        <div className="h-0.5 w-0 group-hover:w-12 bg-indigo-500 transition-all duration-300" />
      </div>
    </div>
  </motion.div>
);

const VisionariesSection: React.FC = () => {
  const visionaries = [
    {
      name: "Elara Vance",
      role: "Lead Digital Architect",
      image: "/Users/apple/.gemini/antigravity/brain/9a54bf63-7705-4f0b-b655-c644d867e9d1/visionary_1_1773724077542.png",
      delay: 0.1
    },
    {
      name: "Marcus Thorne",
      role: "Spatial Intelligence Lead",
      image: "/Users/apple/.gemini/antigravity/brain/9a54bf63-7705-4f0b-b655-c644d867e9d1/visionary_2_1773724094420.png",
      delay: 0.2
    },
    {
      name: "Dr. Sarah Chen",
      role: "Neural Network Researcher",
      image: "/Users/apple/.gemini/antigravity/brain/9a54bf63-7705-4f0b-b655-c644d867e9d1/visionary_3_1773724128454.png",
      delay: 0.3
    }
  ];

  return (
    <section id="visionaries" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-16">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
          >
            The Minds Shaping the <span className="text-indigo-600">Future</span>
          </motion.h2>
          <p className="text-slate-600 text-lg">
            Our collective is led by world-class designers and engineers dedicated to pushing the boundaries of what is possible in the digital realm.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {visionaries.map((v, i) => (
            <VisionaryCard key={i} {...v} />
          ))}
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-indigo-200/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl -z-10" />
    </section>
  );
};

export default VisionariesSection;
