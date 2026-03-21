import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, CheckCircle2, QrCode, Phone, Mail, User, Users, Building, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
    const navigate = useNavigate();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        teamName: '',
        department: '',
        candidateA: { name: '', email: '', phone: '' },
        candidateB: { name: '', email: '', phone: '' },
        transactionId: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    const handleInputChange = (field: string, value: string, candidate?: 'A' | 'B') => {
        if (candidate) {
            setFormData(prev => ({
                ...prev,
                [candidate === 'A' ? 'candidateA' : 'candidateB']: {
                    ...prev[candidate === 'A' ? 'candidateA' : 'candidateB'],
                    [field]: value
                }
            }));
        } else {
            setFormData(prev => ({ ...prev, [field]: value }));
        }
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-inter">
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="max-w-md w-full bg-white border border-slate-200 rounded-3xl p-8 text-center shadow-2xl shadow-slate-200/50"
                >
                    <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Registered Successful!</h2>
                    <p className="text-slate-500 mb-8 leading-relaxed">
                        Your registration has been confirmed. Please join our official community group to stay updated.
                    </p>
                    <a 
                        href="https://chat.whatsapp.com/HqTvGrIw71KEaJoLxB0LgD?mode=gi_t" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 w-full py-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold rounded-2xl transition-all shadow-lg shadow-[#25D366]/20 group"
                    >
                        Join WhatsApp Group
                        <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                    <button 
                        onClick={() => navigate('/')}
                        className="mt-6 text-slate-400 hover:text-slate-600 text-sm font-medium transition-colors"
                    >
                        Return to Home
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 selection:bg-sky-500/30 font-inter py-12 px-6">
            <div className="max-w-4xl mx-auto">
                <button 
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-12 group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Back to Event
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Form Side */}
                    <motion.div 
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                    >
                        <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tighter">Registration</h1>
                        <p className="text-slate-500 mb-10">Secure your spot at DesignXpo 1.0</p>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Team Info */}
                            <div className="space-y-4">
                                <h3 className="text-sky-600 font-bold uppercase text-xs tracking-widest">Team Identity</h3>
                                <div className="space-y-4">
                                    <div className="relative group">
                                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-sky-600 transition-colors" />
                                        <input 
                                            required
                                            type="text"
                                            placeholder="Team Name"
                                            value={formData.teamName}
                                            onChange={(e) => handleInputChange('teamName', e.target.value)}
                                            className="w-full bg-white border border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/5 rounded-2xl py-4 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 outline-none transition-all shadow-sm"
                                        />
                                    </div>
                                    <div className="relative group">
                                        <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-sky-600 transition-colors" />
                                        <input 
                                            required
                                            type="text"
                                            placeholder="Department"
                                            value={formData.department}
                                            onChange={(e) => handleInputChange('department', e.target.value)}
                                            className="w-full bg-white border border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/5 rounded-2xl py-4 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 outline-none transition-all shadow-sm"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Candidate A */}
                            <div className="space-y-4 pt-4 border-t border-slate-100">
                                <h3 className="text-sky-600 font-bold uppercase text-xs tracking-widest leading-none">Candidate A (Lead)</h3>
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="relative group">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-sky-600 transition-colors" />
                                        <input 
                                            required
                                            type="text"
                                            placeholder="Full Name"
                                            value={formData.candidateA.name}
                                            onChange={(e) => handleInputChange('name', e.target.value, 'A')}
                                            className="w-full bg-white border border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/5 rounded-2xl py-4 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 outline-none transition-all shadow-sm"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="relative group">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-sky-600 transition-colors" />
                                            <input 
                                                required
                                                type="email"
                                                placeholder="Email ID"
                                                value={formData.candidateA.email}
                                                onChange={(e) => handleInputChange('email', e.target.value, 'A')}
                                                className="w-full bg-white border border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/5 rounded-2xl py-4 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 outline-none transition-all shadow-sm text-sm"
                                            />
                                        </div>
                                        <div className="relative group">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-sky-600 transition-colors" />
                                            <input 
                                                required
                                                type="tel"
                                                placeholder="Phone Number"
                                                value={formData.candidateA.phone}
                                                onChange={(e) => handleInputChange('phone', e.target.value, 'A')}
                                                className="w-full bg-white border border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/5 rounded-2xl py-4 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 outline-none transition-all shadow-sm text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Candidate B */}
                            <div className="space-y-4 pt-4 border-t border-slate-100">
                                <h3 className="text-sky-600 font-bold uppercase text-xs tracking-widest leading-none">Candidate B</h3>
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="relative group">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-sky-600 transition-colors" />
                                        <input 
                                            required
                                            type="text"
                                            placeholder="Full Name"
                                            value={formData.candidateB.name}
                                            onChange={(e) => handleInputChange('name', e.target.value, 'B')}
                                            className="w-full bg-white border border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/5 rounded-2xl py-4 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 outline-none transition-all shadow-sm"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="relative group">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-sky-600 transition-colors" />
                                            <input 
                                                required
                                                type="email"
                                                placeholder="Email ID"
                                                value={formData.candidateB.email}
                                                onChange={(e) => handleInputChange('email', e.target.value, 'B')}
                                                className="w-full bg-white border border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/5 rounded-2xl py-4 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 outline-none transition-all shadow-sm text-sm"
                                            />
                                        </div>
                                        <div className="relative group">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-sky-600 transition-colors" />
                                            <input 
                                                required
                                                type="tel"
                                                placeholder="Phone Number"
                                                value={formData.candidateB.phone}
                                                onChange={(e) => handleInputChange('phone', e.target.value, 'B')}
                                                className="w-full bg-white border border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/5 rounded-2xl py-4 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 outline-none transition-all shadow-sm text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </motion.div>

                    {/* Payment Side */}
                    <motion.div 
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="lg:pt-12"
                    >
                        <div className="bg-white border border-slate-200 rounded-3xl p-8 sticky top-12 shadow-2xl shadow-slate-200/50">
                            <h3 className="text-slate-900 font-bold mb-6 flex items-center gap-2">
                                <QrCode className="w-5 h-5 text-sky-600" />
                                Payment Verification
                            </h3>
                            
                            <div className="aspect-square bg-slate-50 rounded-2xl mb-8 overflow-hidden relative border border-slate-100 flex items-center justify-center p-4">
                                <img 
                                    src="/images/qr_payment.png" 
                                    alt="Payment QR Code" 
                                    className="w-full h-full object-contain"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent flex items-end p-6">
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                                        Scan to Pay Registration Fee
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">
                                        Transaction ID
                                    </label>
                                    <input 
                                        required
                                        type="text"
                                        placeholder="Enter ID after payment"
                                        value={formData.transactionId}
                                        onChange={(e) => handleInputChange('transactionId', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/5 rounded-xl py-4 px-4 text-slate-900 placeholder:text-slate-400 outline-none transition-all font-mono text-sm"
                                    />
                                </div>

                                <button 
                                    onClick={handleSubmit}
                                    className="w-full h-16 bg-sky-600 hover:bg-sky-700 text-white font-black rounded-2xl transition-all shadow-lg shadow-sky-600/20 flex items-center justify-center gap-3 active:scale-95"
                                >
                                    Complete Registration
                                    <Send className="w-5 h-5" />
                                </button>

                                <p className="text-[10px] text-slate-400 text-center uppercase font-bold tracking-widest">
                                    By clicking, you agree to the Rulebook
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Registration;
