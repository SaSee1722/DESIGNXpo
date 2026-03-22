import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Search, ArrowLeft, Key, User, Mail, Phone, Hash, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Participant {
  id: number;
  team_name: string;
  department: string;
  candidate_a: { name: string; email: string; phone: string };
  candidate_b: { name: string; email: string; phone: string };
  transaction_id: string;
  created_at: string;
}

const Admin = () => {
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCount = async () => {
            try {
                const { count, error, status } = await supabase
                    .from('registrations')
                    .select('id', { count: 'exact', head: true });
                
                if (error) {
                    console.error('Registration count error:', error.message, 'Status:', status);
                    return;
                }
                
                console.log('Fetched Count:', count);
                if (count !== null) setTotalCount(count);
            } catch (err) {
                console.error('Failed to fetch count:', err);
            }
        }
        
        fetchCount();

        // Subscribe to real-time updates for the count immediately, even before authentication
        // This ensures the 0 shows the actual live number on the login screen
        const countSubscription = supabase
            .channel('public_count')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'registrations' }, () => {
                fetchCount();
            })
            .subscribe((status) => {
                console.log('Count subscription status:', status);
            });

        if (isAuthenticated) {
            fetchParticipants();
            
            const participantsSubscription = supabase
              .channel('admin_data')
              .on('postgres_changes', { event: '*', schema: 'public', table: 'registrations' }, () => {
                fetchParticipants();
                fetchCount();
              })
              .subscribe();

            return () => {
                supabase.removeChannel(countSubscription);
                supabase.removeChannel(participantsSubscription);
            };
        }

        return () => {
            supabase.removeChannel(countSubscription);
        };
    }, [isAuthenticated]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password.toUpperCase() === 'STEVEBILLY') {
            setIsAuthenticated(true);
        } else {
            alert('Incorrect master key access denied.');
        }
    };

    const fetchParticipants = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('registrations')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setParticipants(data || []);
        } catch (error) {
            console.error('Error fetching participants:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredParticipants = participants.filter(p =>
        p.team_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.candidate_a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.candidate_b.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 font-inter overflow-hidden relative">
                {/* Background Decorations */}
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 blur-[120px] rounded-full animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 blur-[120px] rounded-full animate-pulse delay-700" />
                </div>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="max-w-md w-full bg-white/10 backdrop-blur-3xl rounded-[2.5rem] p-10 shadow-2xl border border-white/10 relative z-10"
                >
                    <div className="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center mb-8 mx-auto shadow-2xl shadow-indigo-500/40 rotate-12">
                        <Key className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-4xl font-black text-white text-center mb-2 tracking-tighter uppercase italic leading-none">
                        DESIGN<span className="text-indigo-500">XPO</span>
                    </h1>
                    <p className="text-white/40 text-[10px] font-black tracking-[0.3em] text-center mb-8 uppercase">Administrative Terminal</p>
                    
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="relative group">
                            <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-indigo-400 transition-colors" />
                            <input 
                                type="password"
                                placeholder="ENTER MASTER KEY"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl py-5 pl-12 pr-4 text-white outline-none transition-all font-black tracking-[0.2em] uppercase placeholder:text-white/20 text-center"
                            />
                        </div>
                        <div className="text-center py-2">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 bg-indigo-500/10 px-4 py-2 rounded-full border border-indigo-500/20">
                                {totalCount} TOTAL PARTICIPANTS
                            </span>
                        </div>
                        <button 
                            type="submit"
                            className="w-full bg-white text-slate-950 py-5 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-indigo-500 hover:text-white transition-all shadow-2xl self-center active:scale-95"
                        >
                            Execute Access
                        </button>
                    </form>
                    <button 
                        onClick={() => navigate('/')}
                        className="w-full mt-8 text-white/30 hover:text-white font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-2 transition-colors"
                    >
                        <ArrowLeft className="w-3 h-3" /> Terminate Session
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-inter">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
                    <div>
                        <button 
                            onClick={() => navigate('/')}
                            className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors mb-4 group font-black uppercase tracking-widest text-[10px]"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Console
                        </button>
                        <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
                            Participants <span className="text-indigo-600">[{participants.length}]</span>
                        </h1>
                        <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px] mt-4 ml-1">Live Feed • DesignXpo 1.0</p>
                    </div>
                    
                    <div className="relative group min-w-[320px]">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                        <input 
                            type="text"
                            placeholder="SEARCH TEAMS OR NAMES..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl py-5 pl-14 pr-6 text-slate-900 outline-none transition-all shadow-xl font-bold placeholder:text-slate-300 uppercase tracking-widest"
                        />
                    </div>
                </div>

                {loading && participants.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 gap-6">
                        <div className="w-16 h-16 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin shadow-2xl" />
                        <p className="text-slate-400 font-black uppercase tracking-widest animate-pulse">Establishing secure link...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence>
                            {filteredParticipants.length > 0 ? (
                                filteredParticipants.map((p, idx) => (
                                    <motion.div
                                        key={p.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05, duration: 0.5 }}
                                        className="bg-white rounded-[2.5rem] p-9 border border-slate-100 shadow-2xl shadow-slate-200/50 hover:shadow-indigo-500/20 transition-all group relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-700 blur-2xl" />
                                        
                                        <div className="relative z-10">
                                            <div className="flex items-start justify-between mb-10">
                                                <div>
                                                    <h3 className="text-3xl font-black text-slate-900 tracking-tighter italic uppercase leading-none group-hover:text-indigo-600 transition-colors">
                                                        {p.team_name}
                                                    </h3>
                                                    <div className="flex items-center gap-2 mt-3">
                                                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                                            {p.department}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center shadow-2xl group-hover:bg-indigo-600 group-hover:-translate-y-1 transition-all">
                                                    <Users className="w-6 h-6 text-white" />
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                {/* Candidate A */}
                                                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 relative group/card hover:bg-white hover:shadow-lg transition-all duration-300">
                                                    <span className="absolute -top-3 right-6 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">Lead Designer</span>
                                                    <div className="flex items-center gap-4 mb-3">
                                                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-black text-xs">A</div>
                                                        <span className="font-black text-slate-900 text-lg tracking-tight">{p.candidate_a.name}</span>
                                                    </div>
                                                    <div className="space-y-2 ml-12">
                                                        <div className="flex items-center gap-2 text-slate-500 text-xs font-bold">
                                                            <Mail className="w-3.5 h-3.5" /> {p.candidate_a.email}
                                                        </div>
                                                        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
                                                            <Phone className="w-3.5 h-3.5" /> {p.candidate_a.phone}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Candidate B */}
                                                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 relative group/card hover:bg-white hover:shadow-lg transition-all duration-300">
                                                    <div className="flex items-center gap-4 mb-3">
                                                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-black text-xs">B</div>
                                                        <span className="font-black text-slate-900 text-lg tracking-tight">{p.candidate_b.name}</span>
                                                    </div>
                                                    <div className="space-y-2 ml-12">
                                                        <div className="flex items-center gap-2 text-slate-500 text-xs font-bold">
                                                            <Mail className="w-3.5 h-3.5" /> {p.candidate_b.email}
                                                        </div>
                                                        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
                                                            <Phone className="w-3.5 h-3.5" /> {p.candidate_b.phone}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col gap-4">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2 text-slate-400">
                                                        <Hash className="w-4 h-4" />
                                                        <span className="font-mono text-[10px] font-black tracking-[0.2em]">{p.transaction_id}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-slate-400">
                                                        <Calendar className="w-4 h-4" />
                                                        <span className="text-[10px] font-black uppercase tracking-widest">
                                                            {new Date(p.created_at).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-300 text-center py-2 bg-slate-50 rounded-full italic">
                                                    Registered ID: 00{p.id}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="col-span-full py-32 flex flex-col items-center gap-8">
                                    <div className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center border-4 border-white shadow-2xl">
                                        <Users className="w-12 h-12 text-slate-300" />
                                    </div>
                                    <div className="text-center">
                                        <h2 className="text-3xl font-black text-slate-300 uppercase tracking-tighter italic">No participants found</h2>
                                        <p className="text-slate-400 text-xs font-black uppercase tracking-[0.3em] mt-2">Adjust your filters to see more results</p>
                                    </div>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;
