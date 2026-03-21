import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef, useState, useCallback } from 'react';
import { Sparkles, Settings, Rocket, Layers, ChevronRight, Plane, Clock, Globe, Package, MapPin, Send, X, CheckCircle2, Circle, ChevronLeft, Search, Bell, Home } from 'lucide-react';
import InteractiveBackground from '../InteractiveBackground';

/* ═══════════════════════════════════════════════════════ */
/* ── ELLIPTICAL ORBIT SYSTEM                          ── */
/* ═══════════════════════════════════════════════════════ */

/* ── HANGING UI HELPER COMPONENT ── */
/* ── HANGING UI CARD COMPONENTS (Extracted from reference image) ── */


/* ── HANGING UI CARD COMPONENTS (Refined Ultra-Compact Style) ── */


const ToolBarBadge = () => (
  <div className="flex items-center gap-1.5 p-1.5 bg-white/90 backdrop-blur-xl border border-white/50 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-200/50">
    {[Plane, Clock, Package, Globe].map((Icon, i) => (
      <div key={i} className="w-7 h-7 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer">
        <Icon size={12} />
      </div>
    ))}
  </div>
);

const LocationCard = () => (
  <div className="flex items-center gap-2.5 p-2 px-3 bg-white/90 backdrop-blur-xl border border-white/50 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-200/50">
    <div className="w-6 h-6 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
      <MapPin size={12} />
    </div>
    <span className="text-[10px] font-black text-slate-700 uppercase tracking-tighter">London, UK</span>
  </div>
);

const ActionPills = () => (
  <div className="flex flex-col gap-1.5 p-1.5 bg-white/90 backdrop-blur-xl border border-white/50 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-200/50">
    <button className="px-5 py-2 bg-indigo-600 rounded-2xl text-[9px] font-black text-white uppercase tracking-widest shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all">Send</button>
    <button className="px-5 py-2 bg-slate-50 rounded-2xl text-[9px] font-black text-slate-400 uppercase tracking-widest border border-slate-100">Cancel</button>
  </div>
);

const DeliveryTimeline = () => (
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
);

const MiniControls = () => (
   <div className="flex gap-1.5 p-1 bg-white/90 backdrop-blur-xl border border-white/50 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-200/50">
      <button 
        aria-label="Previous"
        className="w-7 h-7 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
      >
         <ChevronLeft size={14} />
      </button>
      <button 
        aria-label="Next"
        className="w-7 h-7 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
      >
         <ChevronRight size={14} />
      </button>
   </div>
);

const HangingIcon = ({ icon: Icon, color = "indigo" }: { icon: any, color?: string }) => (
  <div className={`w-10 h-10 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/50 flex items-center justify-center shadow-lg ring-1 ring-slate-200/50 text-${color}-600`}>
    <Icon size={18} />
  </div>
);

const Tag = ({ label, active = false }: { label: string; active?: boolean }) => (
  <div className="flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-lg border border-white/30 rounded-full shadow-sm">
    <div className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-indigo-500 animate-pulse' : 'bg-slate-300'}`} />
    <span className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-700">
      {label}
    </span>
  </div>
);

const floatingElements = [
  { 
    id: 'toolbar', 
    delay: 0, 
    content: <ToolBarBadge />, 
    position: { left: '8%', top: '25%', mobileLeft: '2%', mobileTop: '6%' },
    depth: 1.2,
    showOnMobile: true
  },
  { 
    id: 'timeline', 
    delay: 0.2, 
    content: <DeliveryTimeline />, 
    position: { left: '80%', top: '15%', mobileLeft: '58%', mobileTop: '15%' },
    depth: 1.5,
    showOnMobile: true
  },
  { 
    id: 'location', 
    delay: 0.4, 
    content: <LocationCard />, 
    position: { left: '15%', top: '65%', mobileLeft: '5%', mobileTop: '75%' },
    depth: 0.8,
    showOnMobile: true
  },
  { 
    id: 'actions', 
    delay: 0.6, 
    content: <ActionPills />, 
    position: { left: '75%', top: '55%', mobileLeft: '65%', mobileTop: '82%' },
    depth: 1.1,
    showOnMobile: true
  },
  { 
    id: 'home-icon', 
    delay: 0.7, 
    content: <HangingIcon icon={Home} color="slate" />, 
    position: { left: '25%', top: '82%', mobileLeft: '10%', mobileTop: '85%' },
    depth: 0.9,
    showOnMobile: false
  },
  { 
    id: 'bell-icon', 
    delay: 0.9, 
    content: <HangingIcon icon={Bell} color="indigo" />, 
    position: { left: '70%', top: '80%', mobileLeft: '80%', mobileTop: '85%' },
    depth: 1.3,
    showOnMobile: false
  },
  { 
    id: 'controls', 
    delay: 0.8, 
    content: <MiniControls />, 
    position: { left: '10%', top: '85%', mobileLeft: '0%', mobileTop: '92%' },
    depth: 1.4,
    showOnMobile: true
  },
  { 
    id: 'team', 
    delay: 1, 
    content: <Tag label="ELITE DESIGNERS" active />, 
    position: { left: '82%', top: '88%', mobileLeft: '72%', mobileTop: '92%' },
    depth: 0.7,
    showOnMobile: true
  },
];


const FloatingUI = ({ mouseX, mouseY }: { mouseX: any, mouseY: any }) => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1440);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {floatingElements.map((el) => {
        if (isMobile && !el.showOnMobile) return null;
        const leftPos = isMobile ? el.position.mobileLeft : el.position.left;
        const topPos = isMobile ? el.position.mobileTop : el.position.top;
        
        // Multi-layered parallax based on depth
        const xParallax = useTransform(mouseX, [-0.5, 0.5], [-25 * el.depth, 25 * el.depth]);
        const yParallax = useTransform(mouseY, [-0.5, 0.5], [-25 * el.depth, 25 * el.depth]);
        
        return (
          <motion.div
            key={el.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: isMobile ? 0.75 : (0.9 + (el.depth - 0.7) * 0.2),
              x: [0, 10 * el.depth, -10 * el.depth, 0],
              y: [0, -15 * el.depth, 10 * el.depth, 0],
              rotate: [-2 * el.depth, 2 * el.depth, -2 * el.depth]
            }}
            transition={{ 
              opacity: { duration: 1, delay: el.delay },
              scale: { duration: 1, delay: el.delay },
              x: { duration: 8 + el.delay * 5, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 10 + el.delay * 5, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 12 + el.delay * 5, repeat: Infinity, ease: "easeInOut" }
            }}
            style={{ 
              left: leftPos, 
              top: topPos,
              translateX: xParallax,
              translateY: yParallax,
              filter: `blur(${(el.depth - 1) * 2}px)`
            }}
            className="absolute flex flex-col items-center group pointer-events-auto cursor-grab active:cursor-grabbing"
          >
            {/* Suspended card with Dynamic Physics */}
            <motion.div
              whileHover={{ scale: 1.05, filter: 'brightness(1.05)' }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {el.content}
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};




/* ═══════════════════════════════════════════════════════ */
/* ── HERO SECTION                                     ── */
/* ═══════════════════════════════════════════════════════ */

const Hero = () => {
  const { scrollY } = useScroll();
  const yContent = useTransform(scrollY, [0, 800], [0, 250]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.92]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 40, stiffness: 90 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-4, 4]);

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

      setTimeLeft({
        days: days.toString().padStart(2, '0'),
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0'),
        seconds: seconds.toString().padStart(2, '0')
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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-slate-50"
    >
      <InteractiveBackground />

      {/* ── Ambient neon orbits ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <svg className="w-full h-full opacity-[0.4]" viewBox="0 0 1440 900">
          <motion.ellipse
            cx="720" cy="450" rx="900" ry="250"
            stroke="#6366F1" strokeWidth="0.5" fill="none"
            animate={{ rx: [900, 920, 900], ry: [250, 260, 250], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.ellipse
            cx="720" cy="450" rx="600" ry="180"
            stroke="#6366F1" strokeWidth="0.5" fill="none"
            animate={{ rx: [600, 580, 600], ry: [180, 190, 180], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </div>

      {/* ── Ambient glow blobs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-32 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-indigo-300/40 via-blue-200/20 to-transparent blur-[140px]"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 40, 0], scale: [1.2, 1, 1.2] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-40 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-indigo-300/40 via-violet-200/20 to-transparent blur-[140px]"
        />
      </div>

      {/* ── Fine grid overlay ── */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] hero-grid-overlay" />

      {/* ── Central Main-Content Hanging Tether ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0 overflow-hidden hidden md:block">
        <svg className="w-full h-full opacity-30" viewBox="0 0 1440 900" fill="none">
          <motion.path
            d="M720,80 L720,320"
            stroke="#6366F1"
            strokeWidth="2"
            strokeDasharray="4 4"
            animate={{ 
              d: ["M720,80 L720,320", "M718,80 L722,320", "M720,80 L720,320"],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <circle cx="720" cy="80" r="4" fill="#6366F1" fillOpacity="0.5" />
          <circle cx="720" cy="320" r="3" fill="#6366F1" fillOpacity="0.5" />
        </svg>
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* ── FLOATING UI SPATIAL SYSTEM ── */}
      {/* ═══════════════════════════════════════════ */}
      <FloatingUI mouseX={smoothMouseX} mouseY={smoothMouseY} />



      {/* ═══════════════════════════════════════════ */}
      {/* ── MAIN CONTENT ── */}
      {/* ═══════════════════════════════════════════ */}

      <motion.div
        style={{ rotateX, rotateY, y: yContent, opacity, scale }}
        className="relative z-10 flex flex-col items-center px-6"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <div className="flex flex-col items-center gap-3">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.35em] text-indigo-600">
              The Future of Web Design
            </span>
          </div>
        </motion.div>

        {/* Title block */}
        <div className="text-center relative select-none">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <h1 className="text-6xl sm:text-7xl md:text-[100px] lg:text-[130px] font-black leading-[0.9] tracking-tighter text-slate-900">
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

        {/* ── CTA SUSPENDED SYSTEM ── */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="flex flex-col items-center group/cta"
        >
          {/* Central tether line */}
          <div className="w-[1px] h-12 bg-gradient-to-b from-sky-400/0 via-sky-400/40 to-sky-400/60 mb-[-1px] opacity-[0.5]" />

          <motion.div 
            animate={{ rotate: [-0.3, 0.3, -0.3], y: [0, 5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col sm:flex-row gap-5 items-center justify-center p-2 mb-10"
          >
            <motion.button
              onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.04, y: -2, rotate: 1 }}
              whileTap={{ scale: 0.96 }}
              className="group relative px-12 py-4.5 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-[0.3em] overflow-hidden shadow-[0_25px_50px_-12px_rgba(15,23,42,0.4)] hover:shadow-indigo-500/30 transition-all text-xs border border-white/10"
            >
              <span className="relative z-10 flex items-center gap-3">
                Join Challenge <Rocket size={16} className="text-indigo-400 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </motion.button>

            <motion.button
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.04, y: -2, rotate: -1 }}
              whileTap={{ scale: 0.96 }}
              className="group relative px-12 py-4.5 rounded-2xl bg-white text-slate-900 font-black uppercase tracking-[0.3em] overflow-hidden shadow-[0_20px_40px_-12px_rgba(14,165,233,0.1)] hover:shadow-sky-500/20 transition-all text-xs border border-slate-200"
            >
              <span className="relative z-10">Explore Event</span>
              <div className="absolute inset-0 bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          </motion.div>

          {/* ── Suspended Countdown Board ── */}
          <div className="flex flex-col items-center">
            <div className="w-[1.5px] h-8 bg-sky-200/50 mb-[-1px]" />
            <motion.div 
              animate={{ rotate: [0.5, -0.5, 0.5], y: [0, 8, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              className="bg-white/80 backdrop-blur-3xl border border-white/60 p-5 rounded-[2.5rem] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.05)] flex items-center gap-6 sm:gap-10"
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
            </motion.div>
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
        <span className="text-[9px] font-bold uppercase tracking-[0.5em] text-slate-400 group-hover:text-sky-500 transition-colors">
          Explore
        </span>
        <div className="w-6 h-10 rounded-full border-2 border-slate-200/60 p-1 flex justify-center group-hover:border-sky-300 transition-colors">
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
