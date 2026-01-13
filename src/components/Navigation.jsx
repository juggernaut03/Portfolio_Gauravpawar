import { motion } from 'framer-motion';
import { useState } from 'react';

const Navigation = ({ currentPage, onNavigate }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 md:py-6 flex items-center justify-between">
                {/* Logo */}
                <motion.button
                    onClick={() => onNavigate('home')}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-base md:text-xl font-bold tracking-tight text-white hover:opacity-80 transition-opacity cursor-pointer"
                >
                    <div className="leading-tight">
                        <div>GAURAV</div>
                        <div>PAWAR</div>
                    </div>
                </motion.button>

                {/* Desktop Navigation Links */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="hidden lg:flex items-center gap-8"
                >
                    <button
                        onClick={() => onNavigate('about')}
                        className="text-sm tracking-wider hover:opacity-60 transition-opacity text-white font-mono"
                    >
                        [ ABOUT ME ]
                    </button>
                    <button
                        onClick={() => onNavigate('works')}
                        className="text-sm tracking-wider hover:opacity-60 transition-opacity text-white font-mono"
                    >
                        [ WORKS ]
                    </button>
                    <button
                        onClick={() => onNavigate('services')}
                        className="text-sm tracking-wider hover:opacity-60 transition-opacity text-white font-mono"
                    >
                        [ SERVICES ]
                    </button>

                </motion.div>

                {/* Desktop Contact Button */}
                <motion.button
                    onClick={() => onNavigate('contact')}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="hidden lg:flex text-sm font-bold tracking-wider border-b-2 border-white pb-1 hover:opacity-60 transition-opacity items-center gap-2 text-white"
                >
                    CONTACT ME
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </motion.button>

                {/* Mobile Contact + Menu */}
                <div className="lg:hidden flex items-center gap-6">
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        onClick={() => onNavigate('contact')}
                        className="text-sm font-bold tracking-wider hover:opacity-60 transition-opacity text-white"
                    >
                        CONTACT
                    </motion.button>
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="text-sm font-bold tracking-wider flex items-center gap-1 text-white"
                    >
                        MENU
                        <span className="text-xs">+</span>
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="lg:hidden border-t border-white/10 bg-black"
                >
                    <div className="px-6 py-6 space-y-4">
                        <button onClick={() => { onNavigate('about'); setMenuOpen(false); }} className="block text-sm tracking-wider hover:opacity-60 transition-opacity text-white font-mono">
                            [ ABOUT ME ]
                        </button>
                        <button onClick={() => { onNavigate('works'); setMenuOpen(false); }} className="block text-sm tracking-wider hover:opacity-60 transition-opacity text-white font-mono">
                            [ WORKS ]
                        </button>
                        <button onClick={() => { onNavigate('services'); setMenuOpen(false); }} className="block text-sm tracking-wider hover:opacity-60 transition-opacity text-white font-mono">
                            [ SERVICES ]
                        </button>

                    </div>
                </motion.div>
            )}
        </nav>
    );
};

export default Navigation;
