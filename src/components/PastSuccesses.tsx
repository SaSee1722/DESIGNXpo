import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Trophy, Users, Star } from 'lucide-react';

const SuccessCard = ({ 
  title, 
  year, 
  image, 
  tags, 
  description,
  metrics
}: { 
  title: string, 
  year: string, 
  image: string, 
  tags: string[],
  description: string,
  metrics: { label: string, value: string }[]
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -10 }}
    className="group relative glass rounded-[2.5rem] overflow-hidden border border-indigo-100/50 hover:border-indigo-400/30 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-indigo-200/20"
  >
    <div className="aspect-[16/10] overflow-hidden relative">
      <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
        <button className="flex items-center gap-2 bg-white text-slate-900 px-6 py-2.5 rounded-full font-bold text-sm shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          View Case Study <ExternalLink className="w-4 h-4" />
        </button>
      </div>
      <div className="absolute top-6 left-6 flex gap-2">
        <span className="px-4 py-1.5 rounded-full glass-dark text-[10px] font-black uppercase tracking-widest text-indigo-400 border border-white/10 backdrop-blur-md">
          {year}
        </span>
      </div>
    </div>
    
    <div className="p-8">
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, i) => (
          <span key={i} className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md uppercase tracking-wider">
            {tag}
          </span>
        ))}
      </div>
      
      <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight group-hover:text-indigo-600 transition-colors">
        {title}
      </h3>
      
      <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-2">
        {description}
      </p>
      
      <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
        {metrics.map((metric, i) => (
          <div key={i} className="space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{metric.label}</p>
            <p className="text-lg font-black text-slate-800 tracking-tight">{metric.value}</p>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

const PastSuccesses = () => {
  const events = [
    {
      title: "EcoSphere Digital",
      year: "Winner 2023",
      image: "/past_event_1_landscape_1773724838380.png",
      tags: ["UI/UX", "Sustainability", "FinTech"],
      description: "A revolutionary platform bridging the gap between personal finance and environmental impact tracking.",
      metrics: [
        { label: "UX Rating", value: "9.8/10" },
        { label: "Innovation", value: "Platinum" }
      ]
    },
    {
      title: "NeuroSync Web",
      year: "Winner 2022",
      image: "/past_event_2_landscape_1773724842103.png",
      tags: ["Healthcare", "AI", "Web3"],
      description: "Visualizing complex neural data through an interactive, community-driven diagnostic dashboard.",
      metrics: [
        { label: "Creativity", value: "A+" },
        { label: "Efficiency", value: "95%" }
      ]
    },
    {
       title: "UrbanPulse",
       year: "Finalist 2023",
       image: "/past_event_3_landscape_1773724851219.png",
       tags: ["Smart City", "Dashboard", "IoT"],
       description: "Real-time visualization of city-wide metrics for sustainable urban development and planning.",
       metrics: [
         { label: "Community", value: "Top 5" },
         { label: "Visuals", value: "Elite" }
       ]
     }
  ];

  return (
    <section id="past-successes" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="max-w-2xl">
          <span className="text-indigo-500 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Archive</span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 leading-tight">
            Hall of <span className="text-indigo-600 italic">Winners</span>
          </h2>
          <p className="text-slate-500 mt-6 text-lg leading-relaxed">
            Take inspiration from the legendary designs that pushed the boundaries in our previous editions.
          </p>
        </div>
        
        <div className="flex gap-4">
          <div className="flex flex-col items-center glass px-6 py-4 rounded-3xl border border-indigo-100 shadow-sm">
            <span className="text-2xl font-black text-indigo-600">120+</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Teams Competed</span>
          </div>
          <div className="flex flex-col items-center glass px-6 py-4 rounded-3xl border border-indigo-100 shadow-sm">
            <span className="text-2xl font-black text-indigo-600">45k+</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Grand Prizes</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event, i) => (
          <SuccessCard key={i} {...event} />
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-20 p-12 glass rounded-[3rem] border border-indigo-100/50 bg-gradient-to-br from-white/80 to-indigo-50/50 flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-200/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative z-10 max-w-xl">
          <div className="flex gap-2 mb-6">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />)}
          </div>
          <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">"The most intense design week of my life. DesignXpo shaped my career."</h3>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">— Alex Rivera, 2023 Winner</p>
        </div>

        <div className="relative z-10 flex -space-x-4">
          {[1,2,3,4].map(i => (
            <div key={i} className="w-16 h-16 rounded-full border-4 border-white shadow-xl bg-gradient-to-br from-indigo-400 to-indigo-600 overflow-hidden">
                <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Avatar" className="w-full h-full object-cover" />
            </div>
          ))}
          <div className="w-16 h-16 rounded-full border-4 border-white shadow-xl bg-slate-900 flex items-center justify-center text-white font-bold text-xs ring-2 ring-indigo-500">
            +50
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default PastSuccesses;
