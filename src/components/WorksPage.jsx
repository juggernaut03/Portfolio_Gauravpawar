import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Footer from './Footer';
import Carousel from './ui/Carousel';

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

    const works = [
        {
            id: 1,
            title: "REAL-TIME COLLAB TOOL",
            subtitle: "DEPLOYED",
            location: "GLOBAL",
            challenge: "REAL-TIME SYNC",
            service: "FULL STACK",
            industry: "PRODUCTIVITY",
            year: "2024",
            color: "#1a3a52",
            image: "/collab_thumbnail.png",
            overview: "The Real-Time Collaboration Tool is a full-stack web application designed to enable remote teams to collaborate synchronously on shared documents. Inspired by platforms like Google Docs, the system supports real-time document editing, live chat, presence awareness, and communication features, all powered by WebSockets.\n\nThe platform is built using Next.js with TypeScript on the frontend and a Node.js + Express backend, with Socket.IO enabling real-time interactions across users.",
            solution: "I designed and developed a real-time collaboration platform where multiple users can edit documents simultaneously while seeing live updates, cursor positions, and user presence. The system uses Socket.IO for real-time synchronization, JWT-based authentication for security, and a rich-text editor for collaborative document creation. The architecture is scalable and modular, allowing future extensions like screen sharing and advanced analytics.",
            techStack: ["Next.js 14", "TypeScript", "Node.js", "Express", "Socket.IO", "MongoDB", "Chakra UI", "WebRTC"],
            features: [
                "Real-Time Document Editing",
                "Live Cursor Tracking",
                "Integrated Text Chat",
                "Video & Audio Calls",
                "Presence Indicators (Online/Offline)",
                "Secure JWT Authentication",
                "Workspace Management"
            ],
            link: "https://collab-frontend-one.vercel.app/"
        },
        {
            id: 2,
            title: "RESUME BUILDER",
            subtitle: "DEPLOYED",
            location: "GLOBAL",
            challenge: "USER EXPERIENCE",
            service: "WEB APPLICATION",
            industry: "UTILITY",
            year: "2024",
            color: "#ff5722",
            image: "/resume_builder_thumbnail.png",
            overview: "Resume Builder is a modern, feature-rich web application that allows users to create, customize, and export professional resumes through an intuitive, real-time interface. The platform is designed to simplify resume creation while giving users full control over layout, styling, and content.\n\nBuilt using React and TypeScript, the application offers drag-and-drop section management, live preview, customizable themes, and a multi-page architecture including landing, templates, builder, and dashboard views.",
            solution: "I developed a React + TypeScript resume builder that uses a 3-column editor layout to separate structure, content editing, and preview. The application provides instant visual feedback, allowing users to design resumes interactively while maintaining professional formatting standards. The system emphasizes strong typing, modular architecture, and scalable UI design.",
            techStack: ["React 19.2", "TypeScript", "Vite", "Chakra UI v3", "React Router", "@dnd-kit", "React Hook Form", "Zod"],
            features: [
                "Drag & Drop Section Reordering",
                "Real-Time Resume Preview",
                "Custom Themes & Typography",
                "Modular Resume Sections",
                "Multi-Page Architecture",
                "Professional Layout Standards",
                "Export to PDF"
            ],
            link: "https://resumebuilder.gauravpawar.in/"
        },
        {
            id: 3,
            title: "WHITE LOTUS HOSPITAL",
            subtitle: "WEB • DEPLOYED",
            location: "INDIA",
            challenge: "CUSTOM CMS & WEBSITE",
            service: "WEB DEVELOPMENT",
            industry: "HEALTHCARE",
            year: "2024",
            color: "#2a2a2a",
            image: "/white_lotus.png",
            overview: "White Lotus Hospital is a healthcare organization based in Navi Mumbai that required a modern, trustworthy digital presence along with a content management system that allows their internal team to manage website content independently.\n\nI developed a fully responsive hospital website along with a custom-built CMS using React.js, enabling complete control over content updates without technical dependency.",
            solution: "I built a modern React-based website supported by a custom React CMS, connected through API integration. The system allows hospital staff to manage pages, services, and content dynamically while ensuring a consistent experience across desktop and mobile devices.",
            techStack: ["React.js", "Tailwind CSS", "Custom React CMS", "REST APIs"],
            features: [
                "Responsive Hospital Website",
                "Custom CMS Dashboard",
                "Mobile-Responsive CMS",
                "Real-time API Integration",
                "Scalable Architecture"
            ],
            link: "https://whitelotushospital.com/"
        },
        {
            id: 4,
            title: "PATEL R MART",
            subtitle: "APP • DEPLOYED",
            location: "INDIA",
            challenge: "E-COMMERCE",
            service: "MOBILE APP",
            industry: "RETAIL",
            year: "2024",
            color: "#4caf50",
            image: "/patelrmart_thumbnail.jpg",
            overview: "Local retail stores needed a digital shopping solution to reduce dependency on physical visits and support home delivery.\n\nThe app had to be simple, fast, and scalable, while working smoothly on both Android and iOS.",
            solution: "A cross-platform mobile application built using Flutter that delivers a smooth grocery shopping experience with intuitive navigation, responsive layouts, and production-ready performance.",
            techStack: ["Flutter", "Dart", "REST API", "Material UI"],
            features: [
                "Product Browsing",
                "Smart Cart Management",
                "Seamless Order Placement",
                "Promotional Banners",
                "Responsive UI",
                "Unified Android & iOS Experience"
            ],
            link: "https://play.google.com/store/apps/details?id=com.patelrmart.app"
        },
        {
            id: 5,
            title: "PRASAD FOOD DIVINE",
            subtitle: "APP • DEPLOYED",
            location: "INDIA",
            challenge: "FOOD DELIVERY",
            service: "APP DEVELOPMENT",
            industry: "FOOD & BEVERAGE",
            year: "2024",
            color: "#ff9800",
            image: "/prasad_food.jpg",
            overview: "Prasad Food Divine is a food ordering and delivery mobile application developed using Flutter, designed to help users easily browse food items, place orders, and receive updates in real time.\n\nThe app is powered by a Node.js backend and uses Firebase Cloud Messaging (FCM) for push notifications, enabling smooth communication between the system and users.",
            solution: "I developed a Flutter-based mobile application supported by a Node.js backend, integrated with Firebase FCM push notifications to provide real-time order updates. The app delivers a smooth user experience while ensuring timely communication and efficient order flow.",
            techStack: ["Flutter", "Dart", "Node.js", "Firebase FCM", "REST APIs"],
            features: [
                "Food Menu Browsing",
                "Order Placement Flow",
                "Push Notifications (FCM)",
                "Responsive UI",
                "API Integration",
                "Performance-Focused UI"
            ],
            link: "https://play.google.com/store/apps/details?id=com.hotel_oms.trijap"
        },
        {
            id: 6,
            title: "CHAT APP",
            subtitle: "FLUTTER FIREBASE • DEPLOYED",
            location: "GLOBAL",
            challenge: "REAL-TIME COMM",
            service: "APP DEVELOPMENT",
            industry: "SOCIAL",
            year: "2024",
            color: "#2196f3"
        },
        {
            id: 7,
            title: "TRACZI",
            subtitle: "DEPLOYED",
            location: "GLOBAL",
            challenge: "TRACKING SYSTEM",
            service: "SYSTEM ARCHITECTURE",
            industry: "LOGISTICS",
            year: "2024",
            color: "#9c27b0",
            image: "/traczi.png"
        },
        {
            id: 8,
            title: "DISHA MARG",
            subtitle: "DEPLOYED",
            location: "INDIA",
            challenge: "GUIDANCE PLATFORM",
            service: "WEB PLATFORM",
            industry: "EDUCATION",
            year: "2024",
            color: "#607d8b",
            image: "/dishamarg_thumbnail.png",
            overview: "DishaMarg is an AI-powered career navigation web platform designed to help students and professionals make informed career decisions using intelligent analysis and personalized guidance. The platform leverages Google Gemini AI to analyze skill gaps, generate learning paths, build optimized resumes, and provide real-time career mentoring through an interactive AI assistant.\n\nThe application is deployed on a live subdomain and built as a feature-rich, future-ready platform focused on career growth and upskilling.",
            solution: "I developed DishaMarg, a web-based AI career guidance platform that combines multiple career tools into one seamless experience. Using Gemini AI, the platform analyzes user input to provide personalized recommendations, learning paths, resume improvements, and job suggestions. The system focuses on usability, personalization, and intelligent automation to empower users in their career journey.",
            techStack: ["HTML5", "JavaScript", "Tailwind CSS", "Google Gemini API", "Three.js", "Web Speech API", "jsPDF"],
            features: [
                "AI Skill Gap Analyzer",
                "Learning Path Generator",
                "AI Resume Builder",
                "3D Interactive AI Mentor",
                "Job Matching Module",
                "Voice & Text Interaction",
                "Export to PDF/DOCX"
            ],
            link: "https://dishamarg.gauravpawar.in"
        },
        {
            id: 9,
            title: "ECOMMERCE BACKEND",
            subtitle: "DEPLOYED",
            location: "GLOBAL",
            challenge: "SCALABLE API",
            service: "BACKEND DEV",
            industry: "E-COMMERCE",
            year: "2024",
            color: "#3f51b5",
            image: "/ecomm_backend.png",
            overview: "Patel E-commerce Backend is a production-grade RESTful API system built to power a full-scale e-commerce platform. The backend supports authentication, product catalog, cart, orders, payments, notifications, admin operations, and content management.\n\nTo improve developer experience, onboarding speed, and long-term maintainability, I implemented comprehensive Swagger/OpenAPI 3.0 documentation covering 100+ API endpoints, making the entire backend self-documented, testable, and standards-compliant.",
            solution: "I implemented Swagger (OpenAPI 3.0) documentation across the entire backend using swagger-jsdoc and swagger-ui-express. The solution automatically generates interactive API documentation from structured JSDoc comments, enabling live API testing from the browser, clear request/response schemas, authentication-aware endpoint testing, and logical grouping of APIs using tags.",
            techStack: ["Node.js", "Express.js", "Swagger UI", "OpenAPI 3.0", "JWT", "Razorpay"],
            features: [
                "100+ Endpoints Documented",
                "29+ API Categories",
                "JWT Authentication",
                "Interactive API Testing",
                "Reusable Schema Definitions",
                "Admin & User APIs",
                "Exportable OpenAPI Spec"
            ],
            link: "https://ecommerceapi-web.onrender.com/api-docs/#/"
        },
        {
            id: 10,
            title: "GO GREEN BIN GO BACKEND",
            subtitle: "DEPLOYED",
            location: "INDIA",
            challenge: "WASTE MGMT",
            service: "BACKEND DEV",
            industry: "SUSTAINABILITY",
            year: "2024",
            color: "#009688",
            image: "/gogreenbingo.png",
            overview: "Go Green Bin Go is a smart waste management platform designed to modernize garbage collection and civic engagement using real-time data. The backend powers services such as bin fill-level detection, optimized collection routing, litter detection, notifications, citizen engagement, and administrative operations.\n\nThe backend API is fully documented with Swagger/OpenAPI, providing interactive and organized documentation for fast onboarding, reliable API contracts, and seamless integration by frontend and mobile teams.",
            solution: "I built a scalable Node.js backend API for Go Green Bin Go with complete Swagger/OpenAPI documentation, enabling interactive API testing directly in the browser, clear data models and request/response contracts, organized categories for fast navigation, and secure and standardized endpoint definitions.",
            techStack: ["Node.js", "Express.js", "Swagger UI", "OpenAPI 3.0", "MongoDB", "JWT"],
            features: [
                "Swagger API Documentation",
                "Endpoint Categorization",
                "Secure Routes (JWT)",
                "Interactive Testing",
                "Real-Time Waste Data APIs",
                "Route Optimization",
                "Analytics & Dashboards"
            ],
            link: "https://go-green-bin-go-api.onrender.com/api-docs/#/"
        }
    ];

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