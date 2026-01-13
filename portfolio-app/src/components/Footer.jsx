import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Footer = ({ onNavigate }) => {
    const [currentTime, setCurrentTime] = useState('');
    const customEase = [0.16, 1, 0.3, 1];

    // Update time every second
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const options = { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
            setCurrentTime(now.toLocaleTimeString('en-US', options));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <footer className="bg-white text-black">
            {/* Footer Contact Section */}
            <section className="py-16 px-6 md:px-12 border-t border-black/20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Left Column - Navigation Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: customEase }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <div className="space-y-3">
                                <button
                                    onClick={() => onNavigate && onNavigate('about')}
                                    className="block text-sm font-bold hover:opacity-60 transition-opacity"
                                >
                                    ABOUT ME
                                </button>
                                <button
                                    onClick={() => onNavigate && onNavigate('services')}
                                    className="block text-sm font-bold hover:opacity-60 transition-opacity"
                                >
                                    SERVICES
                                </button>
                                <button
                                    onClick={() => onNavigate && onNavigate('works')}
                                    className="block text-sm font-bold hover:opacity-60 transition-opacity"
                                >
                                    WORKS
                                </button>
                            </div>
                        </motion.div>

                        {/* Right Column - Contact Details */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: customEase }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            {/* Phone & Email */}
                            <div className="text-right">
                                <h3 className="text-2xl md:text-4xl font-black mb-1">+91 8108053372</h3>
                                <p className="text-lg md:text-2xl font-bold">gauravpawar904@gmail.com</p>
                            </div>

                            {/* Social Links */}
                            <div className="flex gap-6 justify-end flex-wrap">
                                <a
                                    href="https://www.linkedin.com/in/gauravvpawar/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm font-bold border-b border-black pb-0.5 hover:opacity-60 transition-opacity inline-flex items-center gap-1"
                                >
                                    LINKEDIN
                                    <svg className="w-3 h-3 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </a>
                                <a
                                    href="https://x.com/Gauravvpawar"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm font-bold border-b border-black pb-0.5 hover:opacity-60 transition-opacity inline-flex items-center gap-1"
                                >
                                    TWITTER
                                    <svg className="w-3 h-3 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </a>
                                <a
                                    href="https://github.com/juggernaut03"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm font-bold border-b border-black pb-0.5 hover:opacity-60 transition-opacity inline-flex items-center gap-1"
                                >
                                    GITHUB
                                    <svg className="w-3 h-3 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </a>
                                <a
                                    href="mailto:gauravpawar904@gmail.com"
                                    className="text-sm font-bold border-b border-black pb-0.5 hover:opacity-60 transition-opacity inline-flex items-center gap-1"
                                >
                                    EMAIL
                                    <svg className="w-3 h-3 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </a>
                            </div>

                            {/* Address */}
                            <div className="text-right text-xs font-mono leading-relaxed text-black/70">
                                <p className="font-bold text-black">Location:</p>
                                <p>Navi Mumbai, Maharashtra</p>
                                <p>India</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Large Name Footer */}
            <section className="py-8 px-6 md:px-12 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: customEase }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-6xl lg:text-[9rem] xl:text-[11rem] font-black tracking-tighter leading-none text-center md:text-left whitespace-nowrap"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                        GAURAV PAWAR
                    </motion.h2>
                </div>
            </section>

            {/* Copyright Footer */}
            <section className="py-6 px-6 md:px-12 border-t border-black/10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-black/60">
                        <p>NAVI MUMBAI, INDIA: (GMT+5:30) {currentTime}</p>
                        <p>FULL STACK DEVELOPER</p>
                        <p className="text-right text-[10px] leading-relaxed">
                            2025 All Rights Reserved. Gaurav Pawar.<br />
                            Built with React, Tailwind CSS & Framer Motion.
                        </p>
                    </div>
                </div>
            </section>
        </footer>
    );
};

export default Footer;
