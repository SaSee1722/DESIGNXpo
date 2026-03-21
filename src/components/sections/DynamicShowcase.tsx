import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp,
  Users,
  BarChart3,
  MessageSquare,
  Rocket,
  ChevronRight,
  MoreHorizontal,
  Layout,
  Calendar,
  Zap,
  DollarSign,
  Plus
} from 'lucide-react';

/* ══════════════════════════════════════════════════════ */
/* ── SCRAMBLED DASHBOARD PIECES                     ── */
/* ══════════════════════════════════════════════════════ */

const DashboardFragment = ({
  children,
  scrambled,
  assembled,
  isAssembled,
  delay,
}: {
  children: React.ReactNode;
  scrambled: { x: number; y: number; rotate: number; scale: number };
  assembled: { x: number; y: number; width: string; height: string };
  isAssembled: boolean;
  delay?: number;
}) => (
  <motion.div
    animate={
      isAssembled
        ? {
            x: assembled.x,
            y: assembled.y,
            rotate: 0,
            scale: 1,
            opacity: 1,
            width: assembled.width,
            height: assembled.height,
            zIndex: 10,
          }
        : {
            x: scrambled.x,
            y: scrambled.y,
            rotate: scrambled.rotate,
            scale: scrambled.scale,
            opacity: 0.4,
            width: assembled.width,
            height: assembled.height,
            zIndex: 0,
          }
    }
    transition={{
      duration: 1.5,
      delay: isAssembled ? (delay ?? 0) : 0,
      ease: [0.16, 1, 0.3, 1],
    }}
    className="absolute pointer-events-auto"
  >
    {children}
  </motion.div>
);

/* ── UI PIECES ── */

const BrainstormingCard = () => (
  <div className="w-full h-full rounded-[2.5rem] bg-white p-7 shadow-2xl shadow-indigo-500/10 flex flex-col gap-3 border border-slate-100">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="px-3 py-1 bg-rose-50 text-rose-500 text-[9px] font-black uppercase tracking-widest rounded-full">Low</span>
        <h4 className="font-black text-slate-800 text-base tracking-tight">Brainstorming</h4>
      </div>
      <MoreHorizontal size={18} className="text-slate-300" />
    </div>
    <p className="text-[10px] font-medium text-slate-400 leading-relaxed">
      Brainstorming is a group problem-solving technique that involves the spontaneous contribution of ideas from all members of the group...
    </p>
    <div className="flex items-center justify-between mt-auto">
      <div className="flex -space-x-2">
        {[1,2,3].map(i => (
          <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 overflow-hidden">
             <img src={`https://i.pravatar.cc/100?u=${i+10}`} alt={`Member ${i}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
      <div className="flex items-center gap-4 text-[9px] font-bold text-slate-300">
        <span className="flex items-center gap-1"><MessageSquare size={12} /> 12 Comments</span>
        <span className="flex items-center gap-1"><Layout size={12} /> 0 Files</span>
      </div>
    </div>
  </div>
);

const ProjectDeliveriesCard = () => (
  <div className="w-full h-full rounded-[2.5rem] bg-white p-6 shadow-2xl shadow-indigo-500/10 flex flex-col border border-slate-100">
    <div className="flex items-center justify-between mb-4">
      <h4 className="font-black text-slate-800 text-base tracking-tight">Deliveries</h4>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 shadow-sm" />
          <span className="text-[10px] font-black text-slate-900">8</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
          <span className="text-[10px] font-black text-slate-400">2</span>
        </div>
      </div>
    </div>
    <div className="relative flex-1">
      <svg viewBox="0 0 400 80" className="w-full h-full">
        <motion.path
          d="M 0 60 Q 50 10, 100 50 T 200 30 T 300 60 T 400 20"
          fill="none"
          stroke="#6366f1"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </svg>
    </div>
  </div>
);

const StatisticsConcentricCard = () => (
  <div className="w-full h-full rounded-[2.5rem] bg-white p-6 shadow-2xl shadow-indigo-500/10 flex flex-col items-center justify-center border border-slate-100">
    <div className="relative w-32 h-32">
      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
        <circle cx="50" cy="50" r="40" fill="none" stroke="#f8fafc" strokeWidth="8" />
        <motion.circle cx="50" cy="50" r="40" fill="none" stroke="#6366f1" strokeWidth="8" strokeDasharray="251.2" initial={{ strokeDashoffset: 251.2 }} animate={{ strokeDashoffset: 251.2 * (1 - 0.75) }} strokeLinecap="round" transition={{ duration: 2, ease: "circOut" }} />
        
        <circle cx="50" cy="50" r="30" fill="none" stroke="#f8fafc" strokeWidth="8" />
        <motion.circle cx="50" cy="50" r="30" fill="none" stroke="#f43f5e" strokeWidth="8" strokeDasharray="188.4" initial={{ strokeDashoffset: 188.4 }} animate={{ strokeDashoffset: 188.4 * (1 - 0.55) }} strokeLinecap="round" transition={{ duration: 2, delay: 0.2, ease: "circOut" }} />
        
        <circle cx="50" cy="50" r="20" fill="none" stroke="#f8fafc" strokeWidth="8" />
        <motion.circle cx="50" cy="50" r="20" fill="none" stroke="#f59e0b" strokeWidth="8" strokeDasharray="125.6" initial={{ strokeDashoffset: 125.6 }} animate={{ strokeDashoffset: 125.6 * (1 - 0.35) }} strokeLinecap="round" transition={{ duration: 2, delay: 0.4, ease: "circOut" }} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-slate-100 overflow-hidden ring-2 ring-white">
             <img src="https://i.pravatar.cc/100?u=anima" alt="User avatar" className="w-full h-full object-cover" />
          </div>
      </div>
    </div>
    <div className="mt-4 flex flex-col items-center">
      <h4 className="font-black text-slate-800 text-[12px] tracking-tight mb-1">Statistics</h4>
      <div className="flex gap-3">
        <span className="flex items-center gap-1 text-[8px] font-black text-slate-300 uppercase"><div className="w-1 h-1 rounded-full bg-slate-200" /> Inactive</span>
        <span className="flex items-center gap-1 text-[8px] font-black text-indigo-600 uppercase"><div className="w-1 h-1 rounded-full bg-indigo-600" /> 254 Active</span>
      </div>
    </div>
  </div>
);

const GoProCard = () => (
  <div className="w-full h-full rounded-[2.5rem] bg-indigo-600 p-7 shadow-2xl shadow-indigo-600/30 flex flex-col justify-between">
    <div className="flex flex-col gap-1.5">
      <h4 className="font-black text-white text-xl tracking-tight leading-none">Go Pro</h4>
      <p className="text-indigo-100/70 text-[10px] font-medium leading-relaxed max-w-[120px]">
        Upgrade your plans to get pro benefits
      </p>
    </div>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-white py-2.5 rounded-xl text-indigo-600 font-black text-[10px] uppercase tracking-widest shadow-lg"
    >
      Let's Start
    </motion.button>
  </div>
);

const RevenueCard = () => (
  <div className="w-full h-full rounded-[2.5rem] bg-white p-7 shadow-2xl shadow-indigo-500/10 flex flex-col border border-slate-100">
    <div className="flex items-center justify-between mb-3">
      <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 shadow-sm">
          <DollarSign size={18} className="stroke-[3]" />
      </div>
      <MoreHorizontal size={18} className="text-slate-200" />
    </div>
    <div className="mb-4">
      <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-0.5">Total Revenue</p>
      <p className="text-2xl font-black text-slate-900 tracking-tight">$92,983</p>
    </div>
    <div className="w-full h-2.5 bg-slate-50 rounded-full overflow-hidden border border-slate-100 mt-auto">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '65%' }}
        className="h-full bg-indigo-600 rounded-full"
      />
    </div>
  </div>
);

const CalendarGridCard = () => (
  <div className="w-full h-full rounded-[2.5rem] bg-white p-7 shadow-2xl shadow-indigo-500/10 border border-slate-100">
    <div className="flex items-center justify-between mb-6">
      <h4 className="font-black text-slate-800 text-sm tracking-tight uppercase tracking-widest">July 2022</h4>
      <div className="flex gap-1.5">
        <button title="Previous" className="w-6 h-6 rounded-full border border-slate-100 flex items-center justify-center text-slate-400"><ChevronRight className="rotate-180" size={12} /></button>
        <button title="Next" className="w-6 h-6 rounded-full border border-slate-100 flex items-center justify-center text-slate-400"><ChevronRight size={12} /></button>
      </div>
    </div>
    <div className="grid grid-cols-7 gap-y-3 gap-x-1.5 text-center">
      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
        <span key={d} className="text-[8px] font-black text-slate-300">{d}</span>
      ))}
      {[...Array(31)].map((_, i) => (
        <div key={i} className={`text-[10px] font-bold h-6 w-6 flex items-center justify-center rounded-full ${i+1 === 10 ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}>
          {i + 1}
        </div>
      ))}
    </div>
  </div>
);

const MoodboardCard = () => (
  <div className="w-full h-full rounded-[2.5rem] bg-white p-6 shadow-2xl shadow-indigo-500/10 border border-slate-100 flex flex-col gap-3">
    <div className="flex items-center justify-between">
      <h4 className="font-black text-slate-800 text-sm tracking-tight">Moodboard</h4>
      <span className="px-2.5 py-0.5 bg-amber-50 text-amber-600 text-[8px] font-black uppercase tracking-widest rounded-full">Low</span>
    </div>
    <div className="grid grid-cols-2 gap-2 flex-1">
      <div className="rounded-xl bg-slate-50 overflow-hidden"><img src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format" alt="Scene 1" className="w-full h-full object-cover" /></div>
      <div className="rounded-xl bg-slate-50 overflow-hidden"><img src="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format" alt="Scene 2" className="w-full h-full object-cover" /></div>
    </div>
  </div>
);

const SidebarNavCard = () => (
  <div className="w-full h-full rounded-[2.5rem] bg-white p-7 shadow-2xl shadow-indigo-500/10 border border-slate-100 flex flex-col gap-7">
    <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
        <Layout size={20} />
    </div>
    <div className="flex flex-col gap-5">
      {[
        { label: 'Home', icon: Layout, active: true },
        { label: 'Messages', icon: MessageSquare },
        { label: 'Tasks', icon: Zap },
        { label: 'Members', icon: Users },
        { label: 'Teams', icon: Users },
        { label: 'Settings', icon: BarChart3 },
      ].map(item => (
        <div key={item.label} className={`flex items-center gap-4 cursor-pointer transition-all ${item.active ? 'text-indigo-600' : 'text-slate-300 hover:text-slate-500'}`}>
           <item.icon size={18} className={item.active ? "stroke-[3]" : ""} />
           <span className="text-[12px] font-black tracking-tight">{item.label}</span>
        </div>
      ))}
    </div>
  </div>
);


const DynamicShowcase = () => {
  const [isAssembled, setIsAssembled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const CANVAS_W = 1000;
  const CANVAS_H = 750;

  const updateScale = useCallback(() => {
    if (containerRef.current) {
      const parentWidth = containerRef.current.parentElement?.clientWidth ?? CANVAS_W;
      const availableWidth = Math.min(parentWidth - 32, CANVAS_W);
      setScale(Math.min(availableWidth / CANVAS_W, 1));
    }
  }, []);

  useEffect(() => {
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [updateScale]);

  const fragments = useMemo(() => [
    {
      id: 'sidebar',
      scrambled: { x: -100, y: 150, rotate: -12, scale: 0.8 },
      assembled: { x: 20, y: 20, width: '220px', height: '510px' },
      content: <SidebarNavCard />,
      delay: 0.1
    },
    {
      id: 'gopro',
      scrambled: { x: 50, y: 650, rotate: 15, scale: 0.75 },
      assembled: { x: 20, y: 550, width: '220px', height: '180px' },
      content: <GoProCard />,
      delay: 0.2
    },
    {
      id: 'moodboard',
      scrambled: { x: 300, y: -120, rotate: 8, scale: 0.7 },
      assembled: { x: 260, y: 20, width: '350px', height: '240px' },
      content: <MoodboardCard />,
      delay: 0.3
    },
    {
      id: 'brainstorming',
      scrambled: { x: 400, y: 400, rotate: -6, scale: 0.85 },
      assembled: { x: 260, y: 280, width: '350px', height: '240px' },
      content: <BrainstormingCard />,
      delay: 0.4
    },
    {
      id: 'revenue',
      scrambled: { x: 800, y: 650, rotate: -10, scale: 0.8 },
      assembled: { x: 260, y: 540, width: '350px', height: '190px' },
      content: <RevenueCard />,
      delay: 0.5
    },
    {
      id: 'deliveries',
      scrambled: { x: 650, y: -100, rotate: -5, scale: 0.9 },
      assembled: { x: 630, y: 20, width: '350px', height: '200px' },
      content: <ProjectDeliveriesCard />,
      delay: 0.6
    },
    {
      id: 'calendar',
      scrambled: { x: 1050, y: 200, rotate: 20, scale: 0.75 },
      assembled: { x: 630, y: 240, width: '350px', height: '280px' },
      content: <CalendarGridCard />,
      delay: 0.7
    },
    {
      id: 'stats',
      scrambled: { x: 900, y: 450, rotate: 12, scale: 0.8 },
      assembled: { x: 630, y: 540, width: '350px', height: '190px' },
      content: <StatisticsConcentricCard />,
      delay: 0.8
    }
  ], []);

  return (
    <section id="showcase" className="relative py-32 bg-slate-50 overflow-hidden select-none">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.1)_0%,rgba(255,255,255,0)_60%)] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-black text-slate-900 mb-6 uppercase tracking-tighter"
          >
            Precision Meets <span className="text-indigo-600">Play</span>
          </motion.h2>
          <p className="text-slate-500 text-sm md:text-lg max-w-2xl mx-auto font-medium mb-12">
            Reconstructing fragmented systems into a unified architecture.
          </p>
        </div>

        {/* ── SHOWCASE AREA ── */}
        <div 
          ref={containerRef}
          className="relative mx-auto mt-8 flex flex-col items-center w-full"
        >
          <motion.div
            className="relative bg-white/40 backdrop-blur-sm rounded-[3rem] border border-slate-200/50 overflow-hidden shadow-sm"
            animate={{
               width: CANVAS_W * scale,
               height: CANVAS_H * scale
            }}
          >
            <motion.div 
              className="absolute top-0 left-0 origin-top-left"
              animate={{ 
                scale,
                width: CANVAS_W,
                height: CANVAS_H
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="absolute inset-0 mesh-grid opacity-[0.03]" />
              
              <AnimatePresence>
                {fragments.map((f) => (
                  <DashboardFragment
                    key={f.id}
                    scrambled={f.scrambled}
                    assembled={f.assembled}
                    isAssembled={isAssembled}
                    delay={f.delay}
                  >
                    {f.content}
                  </DashboardFragment>
                ))}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* ── EXTERNAL CONTROLS ── */}
          <div className="mt-16 flex flex-col items-center gap-6">
            <motion.p
              animate={{ opacity: isAssembled ? 0 : 1 }}
              className="text-slate-400 text-xs font-bold uppercase tracking-widest text-center"
            >
              System modules awaiting alignment
            </motion.p>
            
            <motion.button
              onClick={() => setIsAssembled(!isAssembled)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all duration-700 shadow-2xl relative overflow-hidden ${isAssembled ? 'bg-slate-900 text-indigo-400' : 'bg-indigo-600 text-white shadow-indigo-500/40'}`}
            >
              <span className="relative z-10 flex items-center gap-3">
                {isAssembled ? 'Reset Components' : 'Initialize Construct'}
                {isAssembled ? <ChevronRight className="rotate-180" size={16} /> : <Rocket size={16} />}
              </span>
              {!isAssembled && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DynamicShowcase;
