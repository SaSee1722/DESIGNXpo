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
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-3 flex justify-between items-center m-4 md:m-6 rounded-full border transition-all duration-500 ${
          scrolled 
            ? "bg-white/60 border-white/40 shadow-2xl backdrop-blur-2xl py-2 m-2 md:m-4" 
            : "bg-white/30 border-white/20 shadow-xl backdrop-blur-xl"
        }`}
      >
        <div className="flex items-center gap-12">
          <Link to="/" className="group relative flex items-center gap-2">
            <motion.div 
              whileHover={{ rotate: 10 }}
              className="w-8 h-8 bg-gradient-to-tr from-sky-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg"
            >
              <span className="text-white font-black text-xs">DX</span>
            </motion.div>
            <motion.span 
              whileHover={{ scale: 1.02 }}
              className="text-xl font-black bg-gradient-to-r from-sky-600 to-indigo-700 bg-clip-text text-transparent italic tracking-tighter block"
            >
              DESIGNXPO.
            </motion.span>
          </Link>

          {/* Dynamic Quote Section */}
          <div className="hidden xl:block overflow-hidden h-6 min-w-[200px] border-l border-slate-200/50 pl-8">
            <AnimatePresence mode="wait">
              <motion.p
                key={quoteIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.6, ease: "anticipate" }}
                className="text-[10px] font-semibold text-slate-500 italic tracking-wide h-6 flex items-center"
              >
                "{quotes[quoteIndex]}"
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex gap-8 text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500 items-center">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <motion.a 
                  key={item.name}
                  href={item.href} 
                  whileHover={{ color: "#0ea5e9" }}
                  className={`transition-all duration-300 relative group py-2 ${
                    isActive ? "text-sky-600" : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {item.name}
                  <motion.span 
                    initial={false}
                    animate={{ width: isActive ? "100%" : "0%" }}
                    className="absolute -bottom-1 left-0 h-0.5 bg-sky-500 rounded-full"
                  />
                  {!isActive && (
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500/30 transition-all duration-300 group-hover:w-full" />
                  )}
                </motion.a>
              );
            })}
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-100/50 backdrop-blur-sm shadow-inner group cursor-help">
              <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse shadow-[0_0_12px_rgba(14,165,233,0.8)]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-sky-600 whitespace-nowrap">Event Live</span>
            </div>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              {isMenuOpen ? <X size={20} className="text-slate-600" /> : <Menu size={20} className="text-slate-600" />}
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
                  <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-widest text-sky-600">Event Live Now</span>
                </div>
                <Link 
                  to="/register" 
                  onClick={() => setIsMenuOpen(false)}
                  className="px-6 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10"
                >
                  Join Challenge
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;
