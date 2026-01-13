import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Footer from './Footer';

const ServicesPage = ({ onNavigate }) => {
    const [hoveredService, setHoveredService] = useState(null);
    const customEase = [0.16, 1, 0.3, 1];

    const services = [
        {
            id: 1,
            number: "00-1",
            title: "MOBILE APP DEVELOPMENT",
            features: [
                "FLUTTER & REACT NATIVE",
                "IOS & ANDROID",
                "NATIVE PERFORMANCE",
                "CROSS-PLATFORM",
                "APP STORE DEPLOYMENT"
            ],
            description: "BUILDING HIGH-PERFORMANCE MOBILE APPLICATIONS THAT RUN SMOOTHLY ON BOTH IOS AND ANDROID. EXPERTISE IN FLUTTER AND REACT NATIVE TO DELIVER NATIVE-LIKE EXPERIENCES.",
        },
        {
            id: 2,
            number: "00-2",
            title: "BACKEND SERVICES",
            features: [
                "API DEVELOPMENT",
                "DATABASE DESIGN",
                "CLOUD INFRASTRUCTURE",
                "SERVERLESS ARCHITECTURE",
                "AUTHENTICATION SYSTEMS"
            ],
            description: "ROBUST AND SCALABLE BACKEND SOLUTIONS POWERING YOUR APPLICATIONS. FROM RESTFUL APIS TO COMPLEX MICROSERVICES, ENSURING DATA SECURITY AND HIGH AVAILABILITY.",
        },
        {
            id: 3,
            number: "00-3",
            title: "SYSTEM ARCHITECTURE",
            features: [
                "SCALABLE SYSTEMS",
                "MICROSERVICES",
                "PERFORMANCE OPTIMIZATION",
                "SECURITY BEST PRACTICES",
                "TECH STACK SELECTION"
            ],
            description: "DESIGNING RESILIENT AND SCALABLE SOFTWARE ARCHITECTURES THAT CAN GROW WITH YOUR BUSINESS. FOCUSING ON RELIABILITY, MAINTAINABILITY, AND PERFORMANCE AT SCALE.",
        },
        {
            id: 4,
            number: "00-4",
            title: "PRODUCT DEVELOPMENT",
            features: [
                "MVP DEVELOPMENT",
                "PRODUCT STRATEGY",
                "FULL LIFECYCLE MANAGEMENT",
                "RAPID PROTOTYPING",
                "MARKET-FIT ANALYSIS"
            ],
            description: "TURNING IDEAS INTO SUCCESSFUL DIGITAL PRODUCTS. I PARTNER WITH STARTUPS AND ENTERPRISES TO GUIDE PRODUCTS FROM CONCEPT TO LAUNCH AND BEYOND.",
        },
        {
            id: 5,
            number: "00-5",
            title: "WEB DEVELOPMENT",
            features: [
                "REACT & NEXT.JS",
                "MODERN FRONTEND",
                "RESPONSIVE DESIGN",
                "SEO OPTIMIZATION",
                "INTERACTIVE UI"
            ],
            description: "INTERACTIVE AND DYNAMIC WEB EXPERIENCES BUILT WITH MODERN TECHNOLOGIES. FOCUSING ON SPEED, ACCESSIBILITY, AND ENGAGING USER INTERFACES.",
        }
    ];

    // Calculate column width based on hover state
    const getColumnWidth = (serviceId) => {
        if (!hoveredService) return '20%';
        return hoveredService === serviceId ? '40%' : '15%';
    };

    return (
        <div className="min-h-dvh bg-white text-black overflow-clip">
            {/* Page Title and Indicator */}
            <div className="pt-32 px-6 md:px-12 pb-8 overflow-clip">
                <div className="max-w-7xl mx-auto flex items-start justify-between">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: customEase }}
                        className="text-7xl md:text-9xl font-black tracking-tighter leading-none"
                    >
                        SERVICES
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-sm font-mono mt-4"
                    >
                        DSGN/4
                    </motion.div>
                </div>
            </div>

            {/* Accordion Grid */}
            <div className="flex h-[600px] border-t-2 border-b-2 border-black">
                {services.map((service, index) => (
                    <motion.div
                        key={service.id}
                        className="relative border-r-2 border-black last:border-r-0 cursor-pointer overflow-hidden"
                        style={{
                            width: getColumnWidth(service.id),
                        }}
                        animate={{
                            width: getColumnWidth(service.id),
                        }}
                        transition={{
                            duration: 0.6,
                            ease: customEase,
                        }}
                        onMouseEnter={() => setHoveredService(service.id)}
                        onMouseLeave={() => setHoveredService(null)}
                    >
                        {/* Collapsed State - Horizontal Text */}
                        <div className="absolute inset-0 p-6 flex flex-col">
                            <motion.div
                                animate={{
                                    opacity: hoveredService === service.id ? 0 : 1,
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="text-xs font-mono mb-4">{service.number}</div>
                                <h3 className="text-lg md:text-xl font-black tracking-tight leading-tight">
                                    {service.title}
                                </h3>
                            </motion.div>
                        </div>

                        {/* Expanded State - Full Content */}
                        <AnimatePresence>
                            {hoveredService === service.id && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4, delay: 0.2 }}
                                    className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between overflow-y-auto"
                                >
                                    {/* Top Section */}
                                    <div>
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ duration: 0.5, delay: 0.3, ease: customEase }}
                                        >
                                            <div className="text-xs font-mono mb-4">{service.number}</div>
                                            <h2 className="text-3xl md:text-4xl font-black mb-8 tracking-tight">
                                                // {service.title}
                                            </h2>
                                        </motion.div>

                                        {/* Features List with Mask Animation */}
                                        <div className="space-y-2 mb-8 overflow-hidden">
                                            {service.features.map((feature, idx) => (
                                                <motion.div
                                                    key={idx}
                                                    initial={{ y: 30, opacity: 0 }}
                                                    animate={{ y: 0, opacity: 1 }}
                                                    transition={{
                                                        duration: 0.4,
                                                        delay: 0.4 + (idx * 0.08),
                                                        ease: customEase,
                                                    }}
                                                    className="text-sm md:text-base font-bold"
                                                >
                                                    /{feature}
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Middle Section - Image */}
                                    <motion.div
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.6, delay: 0.5, ease: customEase }}
                                        className="my-8"
                                    >
                                        <div className="aspect-[4/3] bg-gray-200 border-4 border-black flex items-center justify-center">
                                            <div className="text-center p-6">
                                                <div className="text-5xl mb-3">

                                                </div>
                                                <div className="text-xs font-mono">
                                                    {service.title}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Bottom Section - Description */}
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 0.7, ease: customEase }}
                                    >
                                        <p className="text-xs md:text-sm font-mono leading-relaxed">
                                            {service.description}
                                        </p>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Hover Overlay Effect */}
                        <motion.div
                            className="absolute inset-0 bg-black pointer-events-none"
                            animate={{
                                opacity: hoveredService === service.id ? 0.03 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                        />
                    </motion.div>
                ))}
            </div>

            {/* Bottom CTA Section */}
            <section className="bg-black text-white py-16 px-6 md:px-12 mt-20">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: customEase }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">
                            LET'S CREATE<br />SOMETHING AMAZING
                        </h2>
                        <p className="text-xs md:text-sm font-mono mb-10 leading-relaxed max-w-2xl mx-auto">
                            READY TO BRING YOUR VISION TO LIFE? LET'S DISCUSS HOW WE CAN WORK TOGETHER.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onNavigate('contact')}
                            className="inline-flex items-center gap-3 px-8 py-4 border-2 border-white text-white font-bold text-sm tracking-wider hover:bg-white hover:text-black transition-all duration-300"
                        >
                            GET IN TOUCH
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </motion.button>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <Footer onNavigate={onNavigate} />
        </div>
    );
};

export default ServicesPage;
