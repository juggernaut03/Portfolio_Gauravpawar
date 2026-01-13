import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Footer from './Footer';
import Carousel from './ui/Carousel';

import works from '../data/works.json';

    const WorksPage = () => {
    const containerRef = useRef(null);
    const [selectedWork, setSelectedWork] = useState(null);

    // Reset scroll when modal opens and lock body scroll
    useEffect(() => {
        if (selectedWork) {
            // Lock body scroll
            document.body.classList.add('modal-open');

            // Reset modal scroll position
            setTimeout(() => {
                const modal = document.getElementById('work-modal-content');
                if (modal) {
                    modal.scrollTop = 0;
                }
            }, 0);
        } else {
            // Unlock body scroll
            document.body.classList.remove('modal-open');
        }

        // Cleanup on unmount
        return () => {
            document.body.classList.remove('modal-open');
        };
    }, [selectedWork]);

    const customEase = [0.16, 1, 0.3, 1];

    return (
        <div ref={containerRef} className="min-h-dvh bg-black relative overflow-clip pt-20">
            {/* Hero Title */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: customEase }}
                className="pt-8 pb-6 text-center"
            >
                <h1 className="text-[14vw] md:text-[8vw] font-black text-white uppercase tracking-tighter leading-none">
                    RECENT<br />WORKS
                </h1>
            </motion.div>

            {/* Carousel Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3, ease: customEase }}
                className="pb-12 md:pb-20"
            >
                <div className="relative w-full overflow-hidden py-20">
                    <Carousel
                        slides={works.map(work => ({
                            title: work.title,
                            button: "VIEW CASE",
                            src: work.image || null,
                            color: work.color,
                            ...work
                        }))}
                        onSlideClick={(slide) => setSelectedWork(slide)}
                    />
                </div>
            </motion.div>

            {/* Footer */}
            <Footer />

            {/* Case Study Detail Modal */}
            <AnimatePresence>
                {selectedWork && (
                    <motion.div
                        key={selectedWork.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        id="work-modal-content"
                        className="fixed inset-0 z-50 min-h-dvh bg-white overflow-y-auto overflow-x-clip"
                        onClick={() => setSelectedWork(null)}
                    >
                        <div
                            className="max-w-7xl mx-auto px-6 md:px-8 pt-8 md:pt-16 pb-24 overflow-clip"
                            style={{ contain: 'layout style paint' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Back Button */}
                            <button
                                onClick={() => setSelectedWork(null)}
                                className="text-sm font-mono mb-12 hover:opacity-60 transition-opacity"
                            >
                                ← BACK
                            </button>

                            {/* Case Title */}
                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: customEase }}
                                className="text-6xl md:text-8xl font-black mb-16 tracking-tighter"
                            >
                                {selectedWork.title.split(' ')[0]}<br />
                                {selectedWork.title.split(' ').slice(1).join(' ')}
                            </motion.h2>

                            {/* Metadata Grid */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2, ease: customEase }}
                                className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
                            >
                                <div>
                                    <div className="text-[10px] font-mono text-gray-400 mb-2 flex items-center gap-1">
                                        CHALLENGE
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                    <div className="text-sm font-mono">{selectedWork.challenge}</div>
                                </div>
                                <div>
                                    <div className="text-[10px] font-mono text-gray-400 mb-2 flex items-center gap-1">
                                        SERVICE
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                    <div className="text-sm font-mono">{selectedWork.service}</div>
                                </div>
                                <div>
                                    <div className="text-[10px] font-mono text-gray-400 mb-2 flex items-center gap-1">
                                        INDUSTRY
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                    <div className="text-sm font-mono">{selectedWork.industry}</div>
                                </div>
                                <div>
                                    <div className="text-[10px] font-mono text-gray-400 mb-2 flex items-center gap-1">
                                        YEAR
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                    <div className="text-sm font-mono">{selectedWork.year}</div>
                                </div>
                            </motion.div>

                            {/* Barcode */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4, ease: customEase }}
                                className="mb-16"
                            >
                                <div className="text-center text-xs font-mono mb-4">( AROUND THE WORLD )</div>
                                <div className="flex justify-center gap-[2px] h-16">
                                    {Array.from({ length: 60 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className="bg-black"
                                            style={{
                                                width: Math.random() > 0.5 ? '3px' : '2px',
                                                opacity: Math.random() > 0.3 ? 1 : 0.3,
                                            }}
                                        />
                                    ))}
                                </div>
                            </motion.div>

                            {/* Overview */}
                            {selectedWork.overview && (
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.6, ease: customEase }}
                                    className="mb-16"
                                >
                                    <h3 className="text-2xl font-black mb-6">// OVERVIEW</h3>
                                    <p className="text-sm md:text-base font-mono leading-relaxed whitespace-pre-line">
                                        {selectedWork.overview}
                                    </p>
                                </motion.div>
                            )}

                            {/* Solution */}
                            {selectedWork.solution && (
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.7, ease: customEase }}
                                    className="mb-16"
                                >
                                    <h3 className="text-2xl font-black mb-6">// SOLUTION</h3>
                                    <p className="text-sm md:text-base font-mono leading-relaxed">
                                        {selectedWork.solution}
                                    </p>
                                </motion.div>
                            )}

                            {/* Tech Stack */}
                            {selectedWork.techStack && (
                                <div className="grid md:grid-cols-2 gap-16 mb-16">
                                    <div>
                                        <h3 className="text-2xl font-black mb-6">// TECH STACK</h3>
                                        <div className="space-y-2">
                                            {selectedWork.techStack.map((tech, idx) => (
                                                <div key={idx} className="flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 bg-black rounded-full" />
                                                    <span className="text-sm font-mono">{tech}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Key Features */}
                                    {selectedWork.features && (
                                        <div>
                                            <h3 className="text-2xl font-black mb-6">// KEY FEATURES</h3>
                                            <div className="space-y-2">
                                                {selectedWork.features.map((feature, idx) => (
                                                    <div key={idx} className="flex items-center gap-2">
                                                        <div className="w-1.5 h-1.5 bg-black rounded-full" />
                                                        <span className="text-sm font-mono">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* View Live Project */}
                            {selectedWork.link && (
                                <div className="text-center py-12">
                                    <a
                                        href={selectedWork.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm font-bold border-b-2 border-black pb-1 hover:opacity-60 transition-opacity"
                                    >
                                        VIEW LIVE PROJECT
                                        <svg className="w-4 h-4 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </a>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default WorksPage;