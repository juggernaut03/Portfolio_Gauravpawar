import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Calendar, User, Users, MessageSquare, DollarSign, Search, Filter, Download, ArrowUpRight, Trash2 } from 'lucide-react';

const LeadsPage = () => {
    const [leads, setLeads] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch('http://localhost:5001/api/contact', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setLeads(data);
            } else {
                setError('Failed to fetch leads');
            }
        } catch (err) {
            setError('Error connecting to server');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteLead = async (id) => {
        if (!window.confirm('Are you sure you want to delete this lead?')) return;

        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`http://localhost:5001/api/contact/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                setLeads(leads.filter(lead => lead._id !== id));
            } else {
                alert('Failed to delete lead');
            }
        } catch (err) {
            console.error('Delete error:', err);
            alert('Error deleting lead');
        }
    };

    const filteredLeads = leads.filter(lead =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.message.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 max-w-7xl mx-auto pb-20">
            {/* Stats Header */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Total Leads', value: leads.length, icon: <Users className="w-5 h-5" />, color: 'blue' },
                    { label: 'This Month', value: leads.filter(l => new Date(l.createdAt).getMonth() === new Date().getMonth()).length, icon: <Calendar className="w-5 h-5" />, color: 'purple' },
                    { label: 'Avg. Budget', value: '$' + (leads.length ? (leads.length * 1000).toLocaleString() : '0'), icon: <DollarSign className="w-5 h-5" />, color: 'green' }
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-2xl bg-${stat.color}-500/10 text-${stat.color}-400 border border-${stat.color}-500/20`}>
                                {stat.icon}
                            </div>
                            <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">+12% vs last month</span>
                        </div>
                        <p className="text-3xl font-black tracking-tighter mb-1">{stat.value}</p>
                        <p className="text-white/40 text-[10px] font-mono uppercase tracking-widest">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Table Controls */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                        type="text"
                        placeholder="SEARCH LEADS..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-xs font-mono focus:outline-none focus:border-white/20 transition-all placeholder:text-white/10"
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-mono uppercase tracking-wider transition-all">
                        <Filter className="w-3 h-3" /> Filter
                    </button>
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-mono uppercase tracking-wider transition-all">
                        <Download className="w-3 h-3" /> Export
                    </button>
                </div>
            </div>

            {/* Table Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            >
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/10 bg-white/[0.02]">
                                <th className="px-8 py-6 text-[10px] font-mono uppercase tracking-widest text-white/30">Lead Details</th>
                                <th className="px-8 py-6 text-[10px] font-mono uppercase tracking-widest text-white/30">Budget</th>
                                <th className="px-8 py-6 text-[10px] font-mono uppercase tracking-widest text-white/30">Message</th>
                                <th className="px-8 py-6 text-[10px] font-mono uppercase tracking-widest text-white/30">Date</th>
                                <th className="px-8 py-6 text-[10px] font-mono uppercase tracking-widest text-white/30 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {isLoading ? (
                                Array(5).fill(0).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan="5" className="px-8 py-8 h-20 bg-white/[0.01]" />
                                    </tr>
                                ))
                            ) : filteredLeads.length > 0 ? (
                                filteredLeads.map((lead) => (
                                    <tr key={lead._id} className="group hover:bg-white/[0.03] transition-colors">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20 group-hover:scale-110 transition-transform">
                                                    <User className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm tracking-tight">{lead.name}</p>
                                                    <div className="flex items-center gap-3 mt-1 text-white/30 text-[10px] font-mono">
                                                        <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {lead.email}</span>
                                                        <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {lead.phone}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="px-3 py-1.5 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20 text-[10px] font-mono font-bold tracking-tighter">
                                                {lead.budget}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-xs text-white/50 line-clamp-2 max-w-xs font-mono leading-relaxed italic">
                                                "{lead.message}"
                                            </p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-xs font-mono text-white/30">
                                                {new Date(lead.createdAt).toLocaleDateString()}
                                                <span className="block text-[9px] opacity-50 mt-1 uppercase">
                                                    {new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </p>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white text-white hover:text-black transition-all border border-white/10 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                                                    <ArrowUpRight className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteLead(lead._id)}
                                                    className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center hover:bg-red-500 text-red-500 hover:text-white transition-all border border-red-500/20 shadow-lg shadow-red-500/5 group-hover:opacity-100 opacity-50"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-8 py-20 text-center text-white/20 font-mono text-sm uppercase tracking-widest">
                                        No leads found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
};

export default LeadsPage;
