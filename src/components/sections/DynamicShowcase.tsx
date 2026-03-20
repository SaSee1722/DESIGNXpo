import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Layers,
  TrendingUp,
  Users,
  BarChart3,
  Activity,
  Bell,
  Search,
  Settings,
  ChevronRight,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  Circle,
  MoreHorizontal,
  Home,
  FolderOpen,
  Star,
  MessageSquare,
} from 'lucide-react';


/* ══════════════════════════════════════════════════════ */
/* ── SCRAMBLED DASHBOARD PIECES                     ── */
/* ══════════════════════════════════════════════════════ */

/* Each dashboard fragment has:
   - scrambled: absolute position + rotation when scattered
   - assembled: grid position when assembled into dashboard
*/

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
  delay: number;
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
          }
        : {
            x: scrambled.x,
            y: scrambled.y,
            rotate: scrambled.rotate,
            scale: scrambled.scale,
            opacity: 0.6,
            width: assembled.width,
            height: assembled.height,
          }
    }
    transition={{
      duration: 1.2,
      delay: isAssembled ? delay : 0,
      ease: [0.16, 1, 0.3, 1],
    }}
    className="absolute"
  >
    {children}
  </motion.div>
);

/* ── Mini dashboard UI pieces ── */
const SidebarFragment = () => (
  <div className="w-full h-full rounded-xl bg-slate-800/80 border border-white/10 p-3 flex flex-col gap-3 overflow-hidden backdrop-blur-sm">
    {/* Logo */}
    <div className="flex items-center gap-2 mb-2">
      <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-sky-400 to-cyan-500 flex items-center justify-center">
        <Layers size={12} className="text-white" />
      </div>
      <span className="text-[10px] font-bold text-white tracking-wider">DX PANEL</span>
    </div>
    {/* Menu items */}
    {[
      { icon: Home, label: 'Dashboard', active: true },
      { icon: BarChart3, label: 'Analytics', active: false },
      { icon: FolderOpen, label: 'Projects', active: false },
      { icon: Users, label: 'Team', active: false },
      { icon: Star, label: 'Starred', active: false },
      { icon: Settings, label: 'Settings', active: false },
    ].map((item) => (
      <div
        key={item.label}
        className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-[9px] font-semibold ${
          item.active
            ? 'bg-sky-500/20 text-sky-400 border border-sky-500/20'
            : 'text-slate-500 hover:text-slate-300'
        }`}
      >
        <item.icon size={12} />
        <span>{item.label}</span>
      </div>
    ))}
  </div>
);

const HeaderFragment = () => (
  <div className="w-full h-full rounded-xl bg-slate-800/80 border border-white/10 px-4 flex items-center justify-between backdrop-blur-sm">
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-700/50 border border-white/5">
        <Search size={12} className="text-slate-400" />
        <span className="text-[9px] text-slate-500">Search modules...</span>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <div className="relative">
        <Bell size={14} className="text-slate-400" />
        <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-sky-500" />
      </div>
      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500" />
    </div>
  </div>
);

const StatsCard = ({ icon: Icon, label, value, change, color }: any) => (
  <div className="w-full h-full rounded-xl bg-slate-800/80 border border-white/10 p-3 flex flex-col justify-between backdrop-blur-sm">
    <div className="flex items-center justify-between">
      <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${color}`}>
        <Icon size={14} className="text-white" />
      </div>
      <span className="text-[9px] font-bold text-emerald-400 flex items-center gap-0.5">
        <ArrowUpRight size={10} />
        {change}
      </span>
    </div>
    <div className="mt-2">
      <p className="text-lg font-black text-white tabular-nums">{value}</p>
      <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-slate-500">{label}</p>
    </div>
  </div>
);

const ChartFragment = () => (
  <div className="w-full h-full rounded-xl bg-slate-800/80 border border-white/10 p-3 flex flex-col backdrop-blur-sm">
    <div className="flex items-center justify-between mb-3">
      <span className="text-[10px] font-bold text-white">Performance Overview</span>
      <div className="flex items-center gap-1">
        <span className="text-[8px] text-sky-400 font-semibold">Live</span>
        <div className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
      </div>
    </div>
    {/* Fake chart bars */}
    <div className="flex-1 flex items-end gap-1.5 px-1">
      {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 50, 70, 88, 65, 78].map((h, i) => (
        <div key={i} className="flex-1 flex flex-col items-center justify-end gap-0.5">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ duration: 1, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className={`w-full rounded-sm ${i === 11 || i === 15 ? 'bg-sky-500' : 'bg-sky-500/30'}`}
          />
        </div>
      ))}
    </div>
    <div className="flex items-center justify-between mt-2 px-1">
      <span className="text-[7px] text-slate-600">Jan</span>
      <span className="text-[7px] text-slate-600">Mar</span>
      <span className="text-[7px] text-slate-600">Jun</span>
      <span className="text-[7px] text-slate-600">Sep</span>
      <span className="text-[7px] text-slate-600">Dec</span>
    </div>
  </div>
);

const ActivityFragment = () => (
  <div className="w-full h-full rounded-xl bg-slate-800/80 border border-white/10 p-3 flex flex-col backdrop-blur-sm overflow-hidden">
    <div className="flex items-center justify-between mb-3">
      <span className="text-[10px] font-bold text-white">Recent Activity</span>
      <MoreHorizontal size={12} className="text-slate-500" />
    </div>
    <div className="flex flex-col gap-2 flex-1 overflow-hidden">
      {[
        { icon: CheckCircle2, text: 'Build deployed successfully', time: '2m ago', color: 'text-emerald-400' },
        { icon: MessageSquare, text: 'New review comment', time: '5m ago', color: 'text-sky-400' },
        { icon: Users, text: '3 team members joined', time: '12m ago', color: 'text-indigo-400' },
        { icon: Activity, text: 'Performance spike detected', time: '18m ago', color: 'text-amber-400' },
        { icon: Star, text: 'Project starred by admin', time: '25m ago', color: 'text-yellow-400' },
      ].map((item, i) => (
        <div key={i} className="flex items-center gap-2 py-1 border-b border-white/5 last:border-0">
          <item.icon size={10} className={item.color} />
          <span className="text-[8px] text-slate-300 flex-1 truncate">{item.text}</span>
          <span className="text-[7px] text-slate-600 whitespace-nowrap">{item.time}</span>
        </div>
      ))}
    </div>
  </div>
);

const ProgressFragment = () => (
  <div className="w-full h-full rounded-xl bg-slate-800/80 border border-white/10 p-3 flex flex-col backdrop-blur-sm">
    <div className="flex items-center justify-between mb-3">
      <span className="text-[10px] font-bold text-white">Sprint Progress</span>
      <span className="text-[8px] font-bold text-sky-400">78%</span>
    </div>
    <div className="flex flex-col gap-2.5 flex-1">
      {[
        { label: 'UI Components', progress: 92, color: 'bg-emerald-500' },
        { label: 'API Integration', progress: 78, color: 'bg-sky-500' },
        { label: 'Testing', progress: 55, color: 'bg-amber-500' },
        { label: 'Documentation', progress: 40, color: 'bg-indigo-500' },
      ].map((item) => (
        <div key={item.label} className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-[8px] text-slate-400">{item.label}</span>
            <span className="text-[7px] text-slate-500 tabular-nums">{item.progress}%</span>
          </div>
          <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${item.progress}%` }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className={`h-full rounded-full ${item.color}`}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const MiniDonutFragment = () => (
  <div className="w-full h-full rounded-xl bg-slate-800/80 border border-white/10 p-3 flex flex-col items-center justify-center backdrop-blur-sm">
    <div className="relative w-16 h-16">
      <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
        <circle cx="18" cy="18" r="14" fill="none" stroke="#1e293b" strokeWidth="3" />
        <motion.circle
          cx="18" cy="18" r="14" fill="none" stroke="#0ea5e9" strokeWidth="3"
          strokeDasharray="88" strokeDashoffset="22"
          strokeLinecap="round"
          initial={{ strokeDashoffset: 88 }}
          animate={{ strokeDashoffset: 22 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.circle
          cx="18" cy="18" r="14" fill="none" stroke="#8b5cf6" strokeWidth="3"
          strokeDasharray="88" strokeDashoffset="66"
          strokeLinecap="round"
          initial={{ strokeDashoffset: 88 }}
          animate={{ strokeDashoffset: 66 }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[10px] font-black text-white">75%</span>
      </div>
    </div>
    <span className="text-[8px] font-semibold text-slate-500 mt-2 uppercase tracking-wider">Uptime</span>
  </div>
);

/* ══════════════════════════════════════════ */
/* ── MAIN COMPONENT                      ── */
/* ══════════════════════════════════════════ */

const DynamicShowcase = () => {
  const [isAssembled, setIsAssembled] = useState(false);

  /* ── Responsive scaling ── */
  const CANVAS_W = 880;
  const CANVAS_H = 600;
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const updateScale = useCallback(() => {
    if (containerRef.current) {
      const parentWidth = containerRef.current.parentElement?.clientWidth ?? CANVAS_W;
      const availableWidth = Math.min(parentWidth, CANVAS_W);
      setScale(Math.min(availableWidth / CANVAS_W, 1));
    }
  }, []);

  useEffect(() => {
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [updateScale]);

  /* Scrambled positions are deliberately spread across the 880×600 canvas.
     They are defined at 1x and get scaled by the wrapper transform. */
  const fragments = useMemo(
    () => [
      {
        id: 'sidebar',
        scrambled: { x: -20, y: 280, rotate: -15, scale: 0.7 },
        assembled: { x: 16, y: 60, width: '120px', height: '340px' },
        delay: 0.0,
        content: <SidebarFragment />,
      },
      {
        id: 'header',
        scrambled: { x: 350, y: -10, rotate: 8, scale: 0.65 },
        assembled: { x: 148, y: 60, width: '680px', height: '44px' },
        delay: 0.05,
        content: <HeaderFragment />,
      },
      {
        id: 'stat1',
        scrambled: { x: 680, y: 350, rotate: 22, scale: 0.55 },
        assembled: { x: 148, y: 116, width: '160px', height: '100px' },
        delay: 0.1,
        content: <StatsCard icon={Users} label="Active Users" value="2,847" change="+12%" color="bg-sky-500/30" />,
      },
      {
        id: 'stat2',
        scrambled: { x: 120, y: 420, rotate: -25, scale: 0.6 },
        assembled: { x: 320, y: 116, width: '160px', height: '100px' },
        delay: 0.15,
        content: <StatsCard icon={TrendingUp} label="Revenue" value="$48.2K" change="+8.4%" color="bg-emerald-500/30" />,
      },
      {
        id: 'stat3',
        scrambled: { x: 550, y: 30, rotate: 18, scale: 0.5 },
        assembled: { x: 492, y: 116, width: '160px', height: '100px' },
        delay: 0.2,
        content: <StatsCard icon={Activity} label="Requests/s" value="1,204" change="+24%" color="bg-amber-500/30" />,
      },
      {
        id: 'stat4',
        scrambled: { x: 40, y: 50, rotate: -12, scale: 0.55 },
        assembled: { x: 664, y: 116, width: '164px', height: '100px' },
        delay: 0.25,
        content: <StatsCard icon={Shield} label="Security" value="99.9%" change="+0.1%" color="bg-indigo-500/30" />,
      },
      {
        id: 'chart',
        scrambled: { x: 300, y: 350, rotate: 10, scale: 0.45 },
        assembled: { x: 148, y: 228, width: '504px', height: '172px' },
        delay: 0.3,
        content: <ChartFragment />,
      },
      {
        id: 'activity',
        scrambled: { x: 700, y: 150, rotate: -20, scale: 0.5 },
        assembled: { x: 664, y: 228, width: '164px', height: '172px' },
        delay: 0.35,
        content: <ActivityFragment />,
      },
      {
        id: 'progress',
        scrambled: { x: 200, y: 150, rotate: 30, scale: 0.5 },
        assembled: { x: 148, y: 412, width: '380px', height: '140px' },
        delay: 0.4,
        content: <ProgressFragment />,
      },
      {
        id: 'donut',
        scrambled: { x: 500, y: 450, rotate: -35, scale: 0.45 },
        assembled: { x: 540, y: 412, width: '120px', height: '140px' },
        delay: 0.45,
        content: <MiniDonutFragment />,
      },
    ],
    []
  );

  return (
    <section className="relative py-16 md:py-32 bg-slate-950 overflow-hidden select-none">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.05)_0%,rgba(15,23,42,0)_70%)] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-12 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight"
          >
            Built for the <span className="text-sky-500">Future</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 100 }}
            viewport={{ once: true }}
            className="h-1 bg-sky-500 mx-auto rounded-full"
          />
        </div>

        {/* ═══════════════════════════════════════════ */}
        {/* ──  SCRAMBLE → ASSEMBLE DASHBOARD AREA  ── */}
        {/* ═══════════════════════════════════════════ */}
        <motion.div
          ref={containerRef}
          className="relative w-full max-w-[880px] mx-auto mt-16 md:mt-32"
          animate={{ height: CANVAS_H * scale }}
          transition={{ duration: 0 }}
        >
        <motion.div
          className="rounded-[20px] md:rounded-[40px] bg-slate-900/30 border border-white/5 shadow-2xl overflow-hidden relative origin-top-left"
          animate={{
            width: CANVAS_W,
            height: CANVAS_H,
            scale: scale,
          }}
          transition={{ duration: 0 }}
        >
          {/* Background grid */}
          <div className="absolute inset-0 opacity-[0.03] mesh-grid" />

          {/* Scan line effect when assembling */}
          <AnimatePresence>
            {isAssembled && (
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 610, opacity: [0, 1, 1, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: 'linear' }}
                className="showcase-scan-line"
              />
            )}
          </AnimatePresence>

          {/* Corner label */}
          <div className="absolute top-8 left-8 z-30">
            <h4 className="text-sky-500 font-bold tracking-[0.3em] uppercase text-xs mb-2">
              {isAssembled ? 'System Online' : '3D Core Module'}
            </h4>
            <motion.div
              animate={{ width: isAssembled ? 80 : 48 }}
              className="h-0.5 bg-sky-500/50 rounded-full"
            />
          </div>

          {/* Status indicator */}
          <div className="absolute top-8 right-8 z-30 flex items-center gap-2">
            <motion.div
              animate={{ backgroundColor: isAssembled ? '#22c55e' : '#64748b' }}
              className="w-2 h-2 rounded-full"
            />
            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-slate-500">
              {isAssembled ? 'Initialized' : 'Standby'}
            </span>
          </div>

          {/* Dashboard Fragments */}
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

          {/* CTA / Initialize button — overlays when not assembled */}
          <AnimatePresence>
            {!isAssembled && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
                className="absolute bottom-8 right-8 z-30 flex flex-col items-end"
              >
                <p className="text-white/50 text-sm font-medium tracking-wide mb-4 text-right max-w-[220px]">
                  Scattered system modules await assembly. Initialize to construct the dashboard.
                </p>
                <motion.button
                  onClick={() => setIsAssembled(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-full border border-sky-500/40 bg-sky-500/15 text-sky-400 text-xs font-bold uppercase tracking-[0.25em] hover:bg-sky-500/25 hover:border-sky-500/60 transition-all shadow-lg shadow-sky-500/10 backdrop-blur-sm"
                >
                  Initialize System
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Reset button — shows after assembled */}
          <AnimatePresence>
            {isAssembled && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 1.2 }}
                onClick={() => setIsAssembled(false)}
                className="absolute bottom-6 right-6 z-30 px-5 py-2 rounded-full border border-white/10 bg-slate-800/60 text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] hover:text-sky-400 hover:border-sky-500/30 transition-all backdrop-blur-sm"
              >
                Scramble
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default DynamicShowcase;
