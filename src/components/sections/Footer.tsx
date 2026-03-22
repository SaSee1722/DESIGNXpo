import React from 'react';
import { Github, Twitter, Instagram, Mail } from 'lucide-react';

const Footer = () => (
  <footer className="py-24 px-6 border-t border-slate-100 bg-white relative">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">
        <div className="col-span-1 lg:col-span-2">
          <div className="text-3xl font-black tracking-tighter mb-4 text-slate-900 italic uppercase">
            Design<span className="text-indigo-600">X</span>po 1.0
          </div>
          <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">
            Presented by DESIGN CLUB • SSEC COIMBATORE
          </p>
          <p className="text-slate-400 max-w-sm mb-6 leading-relaxed">
            Empowering the next generation of designers and developers to solve real-world problems through innovative digital experiences.
          </p>
          <div className="flex gap-4">
            <a href="https://discord.gg/your-discord-link" aria-label="Github" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all border border-slate-100">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all border border-slate-100">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all border border-slate-100">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Mail" className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all border border-slate-100">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-black text-slate-900 uppercase text-[10px] tracking-widest mb-6 border-l-4 border-indigo-600 pl-4 leading-none">Organization</h4>
          <p className="text-slate-500 text-sm mb-4 font-bold">DESIGN CLUB</p>
          <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">SSEC COIMBATORE</p>
        </div>
        <div>
          <h4 className="font-bold text-slate-900 uppercase text-xs tracking-widest mb-6">Quick Links</h4>
          <ul className="space-y-4 text-sm font-medium text-slate-400">
            <li><a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-indigo-600 transition-colors">Rulebook PDF</a></li>
          </ul>
        </div>
      </div>
      <div className="pt-12 border-t border-slate-100 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.4em]">
          © 2026 DESIGN CLUB • SSEC COIMBATORE
        </p>
        <div className="flex gap-8 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
          <span>All Rights Reserved</span>
          <span>Made with AI & Code</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
