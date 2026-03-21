import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Format', href: '#format' },
  { name: 'Tools', href: '#tools' },
  { name: 'Evaluation', href: '#judging' },
  { name: 'Rewards', href: '#prizes' },
  { name: 'Details', href: '#details' },
];

const quotes = [
  "Design is intelligence made visible.",
  "Innovation distinguishes leaders.",
  "The details make the design.",
  "Less is more, but better.",
];

const Nav = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active section logic
      const sections = navItems.map(item => item.href.substring(1));
      const scrollPos = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 px-8 py-4 flex justify-between items-center m-4 md:m-6 rounded-[2.5rem] border border-white/40 shadow-2xl backdrop-blur-2xl transition-all duration-500 ${
          scrolled ? "bg-white/70 py-3 shadow-sky-500/5 translate-y-[-4px]" : "bg-white/40"
        }`}
      >
        <div className="flex items-center gap-12">
          <Link to="/" className="group relative flex items-center gap-4">
            <motion.div 
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center shadow-2xl relative overflow-hidden group-hover:bg-indigo-600 transition-colors duration-500"
            >
              <span className="text-white font-black text-sm z-10 text-[10px]">1.0</span>
              {/* Reflection */}
              <div className="absolute top-0 -left-full w-full h-full bg-white/20 skew-x-[-20deg] group-hover:left-[200%] transition-all duration-[800ms] pointer-events-none" />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-slate-900 tracking-tighter leading-none italic">
                DESIGN<span className="text-indigo-600">XPO</span>
              </span>
            </div>
          </Link>

          {/* Dynamic Quote Section */}
          <div className="hidden xl:flex items-center h-8 border-l border-slate-200/50 pl-8 ml-4">
            <AnimatePresence mode="wait">
              <motion.p
                key={quoteIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-[10px] font-black text-slate-400 uppercase tracking-widest h-6 flex items-center leading-none"
              >
                {quotes[quoteIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
        
        <div className="flex items-center gap-10">
          <div className="hidden min-[1100px]:flex gap-10 items-center">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <motion.a 
                  key={item.name}
                  href={item.href} 
                  className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-300 relative py-2 ${
                    isActive ? "text-slate-900" : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div 
                      layoutId="navUnderline"
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-500 rounded-full"
                    />
                  )}
                </motion.a>
              );
            })}
          </div>
          
          <div className="flex items-center gap-5">
            <div className="hidden md:flex items-center gap-3 pr-4 border-r border-slate-100">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">System Ready</span>
            </div>

            <Link 
              to="/register"
              className="hidden sm:flex px-8 py-3 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-indigo-600 hover:scale-105 active:scale-95 transition-all duration-300 group"
            >
              Sign Up <ChevronRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center hover:bg-slate-100 transition-colors"
            >
              {isMenuOpen ? <X size={18} className="text-slate-900" /> : <Menu size={18} className="text-slate-900" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 lg:hidden p-4 pt-28"
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-white/90 backdrop-blur-2xl rounded-3xl border border-white/40 shadow-2xl p-6 overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-100/50 blur-3xl -z-10 rounded-full" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-100/50 blur-3xl -z-10 rounded-full" />
              
              <div className="flex flex-col gap-2">
                {navItems.map((item, idx) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors group"
                  >
                    <span className="text-lg font-bold text-slate-700">{item.name}</span>
                    <ChevronRight size={18} className="text-slate-400 group-hover:text-sky-500 transition-colors" />
                  </motion.a>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">Event Live Now</span>
                </div>
                <button 
                  onClick={() => {
                    setIsMenuOpen(false);
                    document.getElementById('details')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10"
                >
                  Join Challenge
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;
