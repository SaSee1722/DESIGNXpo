import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { Sparkles, Settings, Rocket, Layers, ChevronRight, Plane, Clock, Globe, Package, MapPin, Send, X, CheckCircle2, Circle, ChevronLeft, Search, Bell, Home } from 'lucide-react';

/* ═══════════════════════════════════════════════════════ */
/* ── HANGING UI CARD COMPONENTS                       ── */
/* ═══════════════════════════════════════════════════════ */

const ToolBarBadge = React.memo(() => (
  <div className="flex items-center gap-1.5 p-1.5 bg-white/90 backdrop-blur-xl border border-white/50 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-200/50">
    {[Plane, Clock, Package, Globe].map((Icon, i) => (
      <div key={i} className="w-7 h-7 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
        <Icon size={12} />
      </div>
    ))}
  </div>
));

const LocationCard = React.memo(() => (
  <div className="flex items-center gap-2.5 p-2 px-3 bg-white/90 backdrop-blur-xl border border-white/50 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-200/50">
    <div className="w-6 h-6 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
      <MapPin size={12} />
    </div>
    <span className="text-[10px] font-black text-slate-700 uppercase tracking-tighter">London, UK</span>
  </div>
));

const ActionPills = React.memo(() => (
  <div className="flex flex-col gap-1.5 p-1.5 bg-white/90 backdrop-blur-xl border border-white/50 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-200/50">
    <button className="px-5 py-2 bg-indigo-600 rounded-2xl text-[9px] font-black text-white uppercase tracking-widest shadow-lg shadow-indigo-200">Send</button>
    <button className="px-5 py-2 bg-slate-50 rounded-2xl text-[9px] font-black text-slate-400 uppercase tracking-widest border border-slate-100">Cancel</button>
  </div>
));

const DeliveryTimeline = React.memo(() => (
  <div className="flex flex-col gap-2.5 p-3 px-4 bg-white/90 backdrop-blur-xl border border-white/50 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-200/50 min-w-[140px]">
    <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest border-b border-indigo-50 pb-1.5 mb-0.5">Live Tracking</span>
    {[
      { label: 'City Hub', time: '12:00 PM', done: true },
      { label: 'In Transit', time: 'Pending', done: false }
    ].map((step, i) => (
      <div key={i} className="flex items-start gap-2.5">
        <div className="flex flex-col items-center">
          <div className={`w-4 h-4 rounded-full flex items-center justify-center ${step.done ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
            {step.done ? <CheckCircle2 size={10} /> : <Circle size={10} />}
          </div>
          {i === 0 && <div className="w-px h-3 bg-slate-200 my-1" />}
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] font-black text-slate-800 leading-none">{step.label}</span>
          <span className="text-[7px] font-bold text-slate-400 mt-0.5">{step.time}</span>
        </div>
      </div>
    ))}
  </div>
));

const MiniControls = React.memo(() => (
   <div className="flex gap-1.5 p-1 bg-white/90 backdrop-blur-xl border border-white/50 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-200/50">
      <button 
        aria-label="Previous"
        className="w-7 h-7 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400"
      >
         <ChevronLeft size={14} />
      </button>
      <button 
        aria-label="Next"
        className="w-7 h-7 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400"
      >
         <ChevronRight size={14} />
      </button>
   </div>
));

const HangingIcon = React.memo(({ icon: Icon, color = "indigo" }: { icon: any, color?: string }) => (
  <div className={`w-10 h-10 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/50 flex items-center justify-center shadow-lg ring-1 ring-slate-200/50 text-${color}-600`}>
    <Icon size={18} />
  </div>
));

const Tag = React.memo(({ label, active = false }: { label: string; active?: boolean }) => (
  <div className="flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-lg border border-white/30 rounded-full shadow-sm">
    <div className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-indigo-500 animate-pulse' : 'bg-slate-300'}`} />
    <span className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-700">
      {label}
    </span>
  </div>
));

/* ── Floating element positions — CSS animations instead of Framer Motion ── */
const floatingElements = [
  { id: 'toolbar', content: <ToolBarBadge />, position: { left: '8%', top: '25%' }, showOnMobile: true },
  { id: 'timeline', content: <DeliveryTimeline />, position: { left: '80%', top: '15%' }, showOnMobile: true },
  { id: 'location', content: <LocationCard />, position: { left: '15%', top: '65%' }, showOnMobile: true },
  { id: 'actions', content: <ActionPills />, position: { left: '75%', top: '55%' }, showOnMobile: true },
  { id: 'home-icon', content: <HangingIcon icon={Home} color="slate" />, position: { left: '25%', top: '82%' }, showOnMobile: false },
  { id: 'bell-icon', content: <HangingIcon icon={Bell} color="indigo" />, position: { left: '70%', top: '80%' }, showOnMobile: false },
  { id: 'controls', content: <MiniControls />, position: { left: '10%', top: '85%' }, showOnMobile: true },
  { id: 'team', content: <Tag label="ELITE DESIGNERS" active />, position: { left: '82%', top: '88%' }, showOnMobile: true },
];

/* ── Floating UI — uses generated <style> rules, no inline styles ── */
const FloatingUI = React.memo(() => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const floatingCSS = useMemo(() =>
    floatingElements.map((el, i) => {
      const s = isMobile ? 0.7 : 0.9;
      return `.hero-fl-${i}{left:${el.position.left};top:${el.position.top};transform:scale(${s});animation:hero-float-${(i % 3) + 1} ${10 + i * 2}s ease-in-out infinite;animation-delay:${i * 0.3}s;will-change:transform}`;
    }).join(''),
  [isMobile]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <style>{floatingCSS}</style>
      {floatingElements.map((el, index) => (
        isMobile && !el.showOnMobile ? null : (
          <div key={el.id} className={`absolute pointer-events-auto hero-fl-${index}`}>
            {el.content}
          </div>
        )
      ))}
    </div>
  );
});


/* ═══════════════════════════════════════════════════════ */
/* ── HERO SECTION                                     ── */
/* ═══════════════════════════════════════════════════════ */

const Hero = () => {
  const { scrollY } = useScroll();
  const yContent = useTransform(scrollY, [0, 800], [0, 250]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  const calculateTimeLeft = useCallback(() => {
    const targetDate = new Date('2026-03-27T09:00:00');
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      const s = seconds.toString().padStart(2, '0');
      
      setTimeLeft(prev => {
        if (prev.seconds === s) return prev;
        return {
          days: days.toString().padStart(2, '0'),
          hours: hours.toString().padStart(2, '0'),
          minutes: minutes.toString().padStart(2, '0'),
          seconds: s
        };
      });
    } else {
      setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
    }
  }, []);

  useEffect(() => {
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-slate-50"
    >
      {/* ── Ambient glow blobs — CSS only ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-indigo-300/40 via-blue-200/20 to-transparent blur-[140px] hero-glow-1"
        />
        <div
          className="absolute -bottom-40 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-indigo-300/40 via-violet-200/20 to-transparent blur-[140px] hero-glow-2"
        />
      </div>

      {/* ── Fine grid overlay ── */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] hero-grid-overlay" />

      {/* ═══════════════════════════════════════════ */}
      {/* ── FLOATING UI — CSS animations only ── */}
      {/* ═══════════════════════════════════════════ */}
      <FloatingUI />

      {/* ═══════════════════════════════════════════ */}
      {/* ── MAIN CONTENT ── */}
      {/* ═══════════════════════════════════════════ */}

      <motion.div
        style={{ y: yContent, opacity }}
        className="relative z-10 flex flex-col items-center px-6"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <div className="flex flex-col items-center gap-3">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.35em] text-indigo-600">
              Presented by DESIGN CLUB
            </span>
          </div>
        </motion.div>

        {/* Title block */}
        <div className="text-center relative select-none">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <h1 className="text-6xl sm:text-7xl md:text-[100px] lg:text-[130px] font-black leading-[0.95] tracking-tight text-slate-900">
              <span className="block">DESIGN</span>
              <span className="block mt-[-0.02em]">
                <span className="bg-gradient-to-r from-indigo-500 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                  XPO
                </span>{' '}
                <span className="text-slate-900">1.0</span>
              </span>
            </h1>
          </motion.div>
        </div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-8 text-center max-w-xl"
        >
          <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed">
            A 2-hour high-stakes creative challenge where elite designers
            <br className="hidden sm:block" />
            redefine digital excellence through innovation.
          </p>
        </motion.div>

        {/* ── CTA Buttons ── */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="flex flex-col items-center"
        >
          <div className="flex flex-col sm:flex-row gap-5 items-center justify-center p-2 mb-10 mt-8">
            <motion.button
              onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="group relative px-12 py-4.5 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-[0.3em] overflow-hidden shadow-[0_25px_50px_-12px_rgba(15,23,42,0.4)] hover:shadow-indigo-500/30 transition-all text-xs border border-white/10"
            >
              <span className="relative z-10 flex items-center gap-3">
                Join Challenge <Rocket size={16} className="text-indigo-400" />
              </span>
            </motion.button>

            <motion.button
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="group relative px-12 py-4.5 rounded-2xl bg-white text-slate-900 font-black uppercase tracking-[0.3em] overflow-hidden shadow-[0_20px_40px_-12px_rgba(99,102,241,0.1)] hover:shadow-indigo-500/20 transition-all text-xs border border-slate-200"
            >
              <span className="relative z-10">Explore Event</span>
            </motion.button>
          </div>

          {/* ── Countdown Board ── */}
          <div className="flex flex-col items-center">
            <div
              className="bg-white/80 backdrop-blur-xl border border-white/60 p-5 rounded-[2.5rem] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.05)] flex items-center gap-6 sm:gap-10"
            >
              {[
                { val: timeLeft.days, label: 'DAYS' },
                { val: timeLeft.hours, label: 'HRS' },
                { val: timeLeft.minutes, label: 'MIN' },
                { val: timeLeft.seconds, label: 'SEC' }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center">
                  <span className="text-4xl font-black text-slate-800 tabular-nums leading-none tracking-tighter">
                    {item.val}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 mt-2 tracking-[0.4em]">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="absolute bottom-8 flex flex-col items-center gap-3 group cursor-pointer z-10"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-[9px] font-bold uppercase tracking-[0.5em] text-slate-400 group-hover:text-indigo-500 transition-colors">
          Explore
        </span>
        <div className="w-6 h-10 rounded-full border-2 border-slate-200/60 p-1 flex justify-center group-hover:border-indigo-300 transition-colors">
          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]"
          />
        </div>
      </motion.div>

      {/* ── Corner decorations ── */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-slate-200/30 rounded-tl-3xl pointer-events-none hidden md:block" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-slate-200/30 rounded-br-3xl pointer-events-none hidden md:block" />
    </section>
  );
};

export default Hero;
