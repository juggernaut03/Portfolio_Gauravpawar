import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, LogOut, Menu, X, Bell } from 'lucide-react';
import { useState } from 'react';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const adminUser = localStorage.getItem('adminUser') || 'Admin';

    const menuItems = [
        { icon: <Users className="w-5 h-5" />, label: 'Leads', path: '/admin/leads' }
    ];

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        navigate('/admin/auth');
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white flex overflow-hidden">
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-72 bg-white/5 backdrop-blur-2xl border-r border-white/10 transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="flex flex-col h-full p-8">
                    {/* Brand */}
                    <div className="flex items-center gap-3 mb-12">
                        <div className="w-10 h-10 bg-white text-black rounded-xl flex items-center justify-center font-black text-xl">
                            GP
                        </div>
                        <div>
                            <h2 className="font-black tracking-tighter text-lg leading-none">GAURAV</h2>
                            <p className="text-[10px] uppercase font-mono tracking-widest text-white/40">Admin Panel</p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-2">
                        {menuItems.map((item) => (
                            <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${location.pathname.startsWith(item.path)
                                        ? 'bg-white text-black font-bold shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                                        : 'text-white/40 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {item.icon}
                                <span className="text-sm font-medium tracking-wide">{item.label}</span>
                            </button>
                        ))}
                    </nav>

                    {/* User Profile & Logout */}
                    <div className="mt-auto pt-8 border-t border-white/10">
                        <div className="flex items-center gap-4 mb-6 px-2">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center font-bold text-sm">
                                {adminUser[0]}
                            </div>
                            <div>
                                <p className="text-sm font-bold truncate max-w-[120px]">{adminUser}</p>
                                <p className="text-[10px] font-mono text-white/30 uppercase">Authorized</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-red-400/60 hover:text-red-400 hover:bg-red-400/10 transition-all font-medium text-sm"
                        >
                            <LogOut className="w-5 h-5" />
                            Log Out
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
                {/* Header */}
                <header className="h-20 flex items-center justify-between px-8 border-b border-white/10 relative z-20 bg-black/20 backdrop-blur-md">
                    <div className="flex items-center gap-4">
                        <button
                            className="lg:hidden p-2 hover:bg-white/5 rounded-lg"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        >
                            {isSidebarOpen ? <X /> : <Menu />}
                        </button>
                        <h1 className="text-sm font-mono uppercase tracking-[0.3em] text-white/40">
                            Dashboard <span className="mx-2 text-white/10">/</span>
                            <span className="text-white/80">
                                {location.pathname.split('/').pop()}
                            </span>
                        </h1>
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative p-2 text-white/40 hover:text-white transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full border-2 border-[#050505]" />
                        </button>
                        <div className="h-8 w-[1px] bg-white/10" />
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-mono text-white/70">{new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-y-auto p-8 relative z-10">
                    <Outlet />
                </div>

                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[150px] -z-10 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[150px] -z-10 pointer-events-none" />
            </main>
        </div>
    );
};

export default AdminDashboard;
