import React from 'react';
import { motion } from 'framer-motion';
import { Send, Rocket, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RegisterCTA = () => {
    const navigate = useNavigate();

    return (
        <section id="register" className="py-24 px-6 relative overflow-hidden bg-white/50">
            {/* Visual ascent particles — CSS only, no React re-renders */}
            {[0,1,2,3].map(i => (
                <div
                    key={i}
                    className="absolute w-1 h-1 bg-indigo-400 rounded-full cta-particle-el"
                    style={{
                        '--x': `${20 + i * 18}%`,
                        '--dur': `${12 + i * 3}s`,
                        '--delay': `${i * 4}s`,
                    } as React.CSSProperties}
                />
            ))}

            <div className="max-w-7xl mx-auto text-center relative z-10 px-4">
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="space-y-12"
                >
                    <div className="relative inline-flex flex-col items-center">
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-b from-slate-200 to-indigo-500" />
                        <div className="w-20 h-20 bg-slate-900 rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl relative z-10 hover:rotate-[360deg] transition-transform duration-1000 ease-in-out cursor-pointer">
                            <Rocket className="w-10 h-10" />
                        </div>
                        {/* Glow effect */}
                        <div className="absolute top-0 left-0 w-full h-full bg-indigo-500/20 blur-[50px] -z-10 animate-pulse" />
                    </div>
                    
                    <div className="space-y-6">
                        <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 italic uppercase">
                            Ready to <span className="text-indigo-500 relative inline-block">
                                Innovate?
                                <div className="absolute -bottom-2 sm:-bottom-4 left-0 w-full h-2 bg-indigo-100 -rotate-1 -z-10" />
                            </span>
                        </h2>
                        <p className="text-slate-500 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed font-bold tracking-tight">
                            Join the elite vanguard of designers and engineers redefining the <span className="text-slate-900 underline decoration-indigo-300 underline-offset-4 decoration-4">digital landscape.</span> 
                            Registration is now open for <span className="text-slate-900">teams of two.</span>
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8 relative">
                        <button 
                            onClick={() => navigate('/register')}
                            className="group relative px-16 py-8 bg-slate-900 text-white rounded-[2.5rem] font-black text-2xl hover:bg-slate-800 hover:scale-105 hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 shadow-[0_40px_80px_-20px_rgba(15,23,42,0.3)] flex items-center gap-4 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-4">
                                REGISTER NOW
                                <Send className="w-6 h-6 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-400 via-indigo-600 to-indigo-400 opacity-0 group-hover:opacity-20 transition-opacity duration-700" />
                            {/* Reflection effect */}
                            <div className="absolute top-[-100%] left-[-100%] w-[50%] h-[300%] bg-white/10 rotate-[35deg] group-hover:left-[150%] transition-all duration-[1500ms]" />
                        </button>
                        
                        <div className="absolute -top-12 -right-12 hidden lg:block opacity-40">
                            <Sparkles className="w-24 h-24 text-indigo-200 animate-spin-slow" />
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-6 text-slate-400">
                        <div className="flex items-center gap-2 group cursor-default">
                             <div className="w-2 h-2 rounded-full bg-indigo-500 group-hover:animate-ping" />
                             <span className="text-xs font-black uppercase tracking-[0.3em]">Phase 1 Active</span>
                        </div>
                        <div className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
                        <span className="text-xs font-black uppercase tracking-[0.3em]">Team Size: 2 Pilots</span>
                    </div>
                </motion.div>
            </div>
            
            {/* Background Decorative Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none overflow-hidden -z-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-indigo-100/30 rounded-full opacity-20 scale-110" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-indigo-100/50 rounded-full opacity-10 scale-125" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-50/50 rounded-full blur-[100px] opacity-20" />
            </div>
        </section>
    );
};

export default RegisterCTA;
