import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef, useState, useCallback } from 'react';
import { Sparkles, Settings, Rocket, Layers } from 'lucide-react';
import InteractiveBackground from '../InteractiveBackground';

/* ═══════════════════════════════════════════════════════ */
/* ── ELLIPTICAL ORBIT SYSTEM                          ── */
/* ═══════════════════════════════════════════════════════ */

const RX = 580;             // horizontal radius — spans near-full viewport width
const RY = 310;             // vertical radius — reaches into bottom corners
const ORBIT_SECONDS = 45;   // seconds per full revolution
const ORBIT_Y_OFFSET = 60;  // px — push orbit center downward from section center

/* Card content definitions */
const orbitCards = [
  {
    id: 'team',
    content: (
      <div className="flex items-center gap-2">
        <div className="flex -space-x-1">
          <div className="w-4 h-4 rounded-full bg-sky-500 border-2 border-white" />
          <div className="w-4 h-4 rounded-full bg-indigo-500 border-2 border-white" />
          <div className="w-4 h-4 rounded-full bg-slate-800 border-2 border-white" />
        </div>
        <div className="ml-1">
          <p className="text-[8px] font-extrabold uppercase tracking-[0.2em] text-slate-400">Team</p>
          <p className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-700">Palette</p>
        </div>
      </div>
    ),
  },
  {
    id: 'intake',
    content: (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 rounded bg-slate-100 text-[9px] font-bold text-slate-600 border border-slate-200">K</kbd>
          <kbd className="px-1.5 py-0.5 rounded bg-slate-100 text-[9px] font-bold text-slate-600 border border-slate-200">K</kbd>
        </div>
        <div className="ml-1">
          <p className="text-[7px] font-extrabold uppercase tracking-[0.2em] text-slate-400">Open</p>
          <p className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-700">Intake</p>
        </div>
      </div>
    ),
  },
  {
    id: 'fps',
    content: (
      <div className="flex items-start gap-3">
        <div>
          <div className="flex items-center gap-1 mb-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-sky-500">
              <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" />
            </svg>
            <span className="text-[9px] font-bold text-emerald-500">+12%</span>
          </div>
          <p className="text-[7px] font-extrabold uppercase tracking-[0.25em] text-slate-400">FPS</p>
          <p className="text-[7px] font-extrabold uppercase tracking-[0.25em] text-slate-400">Optimization</p>
          <p className="text-xl font-black text-slate-900 mt-0.5 tabular-nums">120.4</p>
        </div>
      </div>
    ),
  },
  {
    id: 'ai',
    content: (
      <div className="flex items-center gap-3">
        <div>
          <p className="text-[7px] font-extrabold uppercase tracking-[0.25em] text-slate-400 text-right">AI Mode</p>
          <p className="text-xs font-black text-emerald-500 text-right">Enabled</p>
        </div>
        <div className="w-8 h-4 rounded-full bg-sky-500 flex items-center justify-end px-0.5">
          <div className="w-3 h-3 rounded-full bg-white shadow-sm" />
        </div>
      </div>
    ),
  },
  {
    id: 'visionary',
    content: (
      <div className="flex items-start gap-3 pr-4">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-100 to-cyan-50 flex items-center justify-center shrink-0">
          <Rocket size={14} className="text-sky-500" />
        </div>
        <div>
          <p className="text-sm font-black text-slate-800 italic">Visionary Creation</p>
          <p className="text-[10px] text-slate-400 italic mt-0.5">Push boundaries beyond the grid</p>
        </div>
      </div>
    ),
  },
  {
    id: 'future',
    content: (
      <div className="flex items-start gap-3 pr-4">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-100 to-violet-50 flex items-center justify-center shrink-0">
          <Settings size={14} className="text-indigo-500" />
        </div>
        <div>
          <p className="text-sm font-black text-slate-800 italic">Future Interface</p>
          <p className="text-[10px] text-slate-400 italic mt-0.5">Defining next-gen UX/UI paradigms.</p>
        </div>
      </div>
    ),
  },
];

/* ── Helper: responsive orbit radii ── */
function useOrbitRadii() {
  const radii = useRef({ rx: RX, ry: RY, yOff: ORBIT_Y_OFFSET });

  const update = useCallback(() => {
    const w = window.innerWidth;
    if (w < 640) {
      // Mobile
      radii.current = { rx: w * 0.48, ry: 200, yOff: 40 };
    } else if (w < 1024) {
      // Tablet
      radii.current = { rx: w * 0.44, ry: 280, yOff: 70 };
    } else {
      // Desktop
      radii.current = { rx: RX, ry: RY, yOff: ORBIT_Y_OFFSET };
    }
  }, []);

  useEffect(() => {
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [update]);

  return radii;
}

/* ── Orbit Ring Component ── */
const OrbitRing = () => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ringRef = useRef<HTMLDivElement>(null);
  const innerRingRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const count = orbitCards.length;
  const radii = useOrbitRadii();

  /* Delay entrance so the hero text lands first */
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1400);
    return () => clearTimeout(t);
  }, []);

  /* requestAnimationFrame orbit loop — no React re-renders */
  useEffect(() => {
    if (!visible) return;

    let raf: number;
    let angle = 0;
    const speed = (2 * Math.PI) / (ORBIT_SECONDS * 1000); // radians per ms
    let prev = performance.now();

    const tick = (now: number) => {
      const dt = now - prev;
      prev = now;
      angle += speed * dt;

      const { rx, ry, yOff } = radii.current;

      /* Update container position for responsive offset */
      if (containerRef.current) {
        containerRef.current.style.top = `calc(50% + ${yOff}px)`;
      }

      /* Update ring border sizes */
      if (ringRef.current) {
        ringRef.current.style.width = `${rx * 2}px`;
        ringRef.current.style.height = `${ry * 2}px`;
        ringRef.current.style.left = `${-rx}px`;
        ringRef.current.style.top = `${-ry}px`;
      }
      if (innerRingRef.current) {
        innerRingRef.current.style.width = `${rx * 1.5}px`;
        innerRingRef.current.style.height = `${ry * 1.5}px`;
        innerRingRef.current.style.left = `${-rx * 0.75}px`;
        innerRingRef.current.style.top = `${-ry * 0.75}px`;
      }

      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const a = angle + (i / count) * 2 * Math.PI;
        const x = Math.cos(a) * rx;
        const y = Math.sin(a) * ry;

        /* Depth: bottom of ellipse = "front" → bigger & brighter */
        const depth = (Math.sin(a) + 1) / 2;          // 0 → top, 1 → bottom
        const s = 0.82 + 0.18 * depth;                // scale 0.82 … 1.0
        const o = 0.50 + 0.50 * depth;                // opacity 0.50 … 1.0
        const z = Math.round(10 + depth * 30);        // z-index 10 … 40

        el.style.transform = `translate(-50%,-50%) translate(${x}px,${y}px) scale(${s})`;
        el.style.zIndex = `${z}`;
        el.style.opacity = `${o}`;
      });

      /* Small glowing dots that orbit on the ring */
      dotRefs.current.forEach((el, i) => {
        if (!el) return;
        const a = angle + (i / 3) * 2 * Math.PI + Math.PI / 6;
        const x = Math.cos(a) * rx;
        const y = Math.sin(a) * ry;
        el.style.transform = `translate(-50%,-50%) translate(${x}px,${y}px)`;
      });

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, count, radii]);

  return (
    <div
      ref={containerRef}
      className="absolute left-1/2 top-1/2 pointer-events-none w-0 h-0"
    >
      {/* ── Visible elliptical ring ── */}
      <div
        ref={ringRef}
        className="absolute border border-slate-200/40 rounded-[50%]"
      />
      {/* ── Inner decorative dashed ring ── */}
      <div
        ref={innerRingRef}
        className="absolute border border-dashed border-sky-200/20 rounded-[50%]"
      />

      {/* ── Small glowing dots orbiting the ring ── */}
      {visible &&
        [0, 1, 2].map((i) => (
          <div
            key={`dot-${i}`}
            ref={(el) => { dotRefs.current[i] = el; }}
            className="absolute top-1/2 left-1/2 opacity-80"
          >
            <div
              className={`rounded-full ${
                i === 0
                  ? 'w-3 h-3 bg-sky-400 shadow-[0_0_18px_rgba(14,165,233,0.7)]'
                  : i === 1
                  ? 'w-2 h-2 bg-indigo-400 shadow-[0_0_14px_rgba(99,102,241,0.6)]'
                  : 'w-2 h-2 bg-cyan-400 shadow-[0_0_14px_rgba(34,211,238,0.6)]'
              }`}
            />
          </div>
        ))}

      {/* ── Orbiting cards ── */}
      {visible &&
        orbitCards.map((card, i) => (
          <div
            key={card.id}
            ref={(el) => { cardRefs.current[i] = el; }}
            className="absolute top-1/2 left-1/2 pointer-events-auto opacity-0"
          >
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-200/50 border border-white/80 p-2.5 sm:p-4 whitespace-nowrap transition-shadow duration-300 hover:shadow-2xl hover:shadow-sky-200/40">
              {card.content}
            </div>
          </div>
        ))}
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

      {/* ── Ambient glow blobs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-sky-200/60 to-cyan-100/40 blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-40 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-indigo-200/50 to-violet-100/30 blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-sky-100/30 to-blue-50/20 blur-[150px]"
        />
      </div>

      {/* ── Fine grid overlay ── */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] hero-grid-overlay" />

      {/* ═══════════════════════════════════════════ */}
      {/* ── ELLIPTICAL ORBIT WITH CARDS ── */}
      {/* ═══════════════════════════════════════════ */}
      <OrbitRing />



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
            <span className="text-[10px] font-extrabold uppercase tracking-[0.35em] text-sky-600">
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
                <span className="bg-gradient-to-r from-sky-400 via-teal-500 to-indigo-600 bg-clip-text text-transparent">
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

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="mt-10"
        >
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="group relative px-10 py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-bold uppercase tracking-[0.25em] overflow-hidden shadow-xl shadow-sky-500/30 hover:shadow-sky-500/50 transition-all text-sm"
          >
            <span className="relative z-10">Explore Event</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
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
            className="w-1.5 h-1.5 rounded-full bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.5)]"
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
