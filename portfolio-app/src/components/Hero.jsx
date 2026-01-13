import { motion, useInView, useScroll } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import profileImage from '../assets/image_profile.png';
import Footer from './Footer';

const Hero = ({ onNavigate }) => {
    const philosophyRef = useRef(null);
    const portraitRef = useRef(null);
    const quoteRef = useRef(null);

    const [shouldExplode, setShouldExplode] = useState(false);
    const [hoveredService, setHoveredService] = useState(null);

    // Contact Form State
    const [selectedBudget, setSelectedBudget] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: ''
    });

    const budgetOptions = ['1K-5K', '5K-10K', '10K-20K', 'MORE'];

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', { ...formData, budget: selectedBudget });
    };

    const philosophyInView = useInView(philosophyRef, { once: true, margin: "-100px" });
    const portraitInView = useInView(portraitRef, { once: true, margin: "-100px" });

    // Custom easing for luxury feel
    const customEase = [0.16, 1, 0.3, 1];

    // Track scroll position to trigger explosion and reform
    const { scrollY } = useScroll();

    useEffect(() => {
        const unsubscribe = scrollY.on("change", (latest) => {
            // Trigger explosion when scrolled past 1200px (adjusted for home page)
            if (latest > 1200 && !shouldExplode) {
                setShouldExplode(true);
            }
            // Reform letters when scrolling back up above 1000px
            if (latest < 1000 && shouldExplode) {
                setShouldExplode(false);
            }
        });

        return () => unsubscribe();
    }, [scrollY, shouldExplode]);

    // Generate random trajectory for each character - optimized for smoothness
    const generateRandomTrajectory = (charIndex) => {
        const randomX = (Math.random() - 0.5) * 800;
        const randomY = Math.random() * 800 + 400;
        const randomRotate = (Math.random() - 0.5) * 360;
        const randomDelay = (charIndex % 10) * 0.02;

        return {
            x: randomX,
            y: randomY,
            rotate: randomRotate,
            delay: randomDelay,
        };
    };

    // Split text into lines with characters
    const quoteLines = [
        { text: "SOFTWARE", color: "text-black" },
        { text: "ENGINEERING IS NOT", color: "text-gray-500" },
        { text: "JUST TYPING CODE,", color: "text-gray-500" },
        { text: "BUT CREATING ", color: "text-black" },
        { text: "SOLUTIONS", color: "text-black" },
    ];

    return (
        <div className="bg-white">
            {/* Hero Section - White Background */}
            <section className="min-h-dvh bg-white relative overflow-clip pt-20">
                <div className="max-w-7xl mx-auto px-6 md:px-8 pt-8 md:pt-16 pb-12 md:pb-20 relative">

                    {/* Version Number */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-sm font-mono mb-2 italic"
                    >
                        1,618
                    </motion.div>

                    {/* Large Title - Full Width */}
                    <div className="relative" style={{ zIndex: 20 }}>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[7rem] 2xl:text-[9rem] font-black leading-[0.85] tracking-tighter whitespace-nowrap"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                            SOFTWARE ENGINEER
                        </motion.h1>
                    </div>

                    {/* Based in India - Vertical Text */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="absolute top-1/2 right-4 md:right-8 transform -translate-y-1/2 hidden md:block text-xs tracking-[0.3em]"
                        style={{
                            writingMode: 'vertical-rl',
                            textOrientation: 'mixed'
                        }}
                    >
                        BASED IN INDIA
                    </motion.div>

                    {/* Portrait Image - Behind title text */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="absolute top-20 md:top-42 lg:top-4 xl:top-43 left-1/2 transform -translate-x-1/4 md:-translate-x-0 md:left-[50%] lg:left-[45%] w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 aspect-[3/4] bg-gray-300 shadow-2xl overflow-hidden"
                        style={{ zIndex: 5 }}
                    >
                        <img
                            src={profileImage}
                            alt="Gaurav Pawar"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    {/* Services List - Bottom Left */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="mt-72 sm:mt-56 md:mt-64 lg:mt-72 space-y-0"
                    >
                        <div className="text-base md:text-xl lg:text-2xl font-black tracking-tight">/ MOBILE APP DEVELOPMENT</div>
                        <div className="text-base md:text-xl lg:text-2xl font-black tracking-tight">/ SYSTEM ARCHITECTURE</div>
                        <div className="text-base md:text-xl lg:text-2xl font-black tracking-tight">/ PRODUCT DEVELOPMENT</div>
                    </motion.div>

                    {/* Description - Center Bottom */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        className="mt-12 md:mt-16 text-center max-w-lg mx-auto"
                    >
                        <p className="text-xs md:text-sm font-mono tracking-wider leading-relaxed">
                            I'M AN EXPERIENCED FULL STACK DEVELOPER,<br />
                            WHO BUILDS SCALABLE WEB & MOBILE APPLICATIONS FOR<br />
                            STARTUPS AND ENTERPRISES
                        </p>
                    </motion.div>

                    {/* Recent Work - Bottom Right */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="mt-12 md:mt-16 flex justify-end"
                    >
                        <button
                            onClick={() => onNavigate && onNavigate('works')}
                            className="flex items-center gap-2 text-sm font-mono tracking-wider hover:opacity-60 transition-opacity"
                        >
                            RECENT WORK
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Quote Section with Letter Explosion - White Background */}
            <section ref={quoteRef} className="flex items-center justify-center px-6 md:px-12 pt-20 md:pt-8 pb-8 md:pb-20 bg-white overflow-clip">
                <div className="max-w-6xl w-full overflow-clip">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: customEase }}
                        style={{ contain: 'layout style paint' }}
                    >
                        <h2
                            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-none tracking-tighter mb-8 inline-block"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                            {quoteLines.map((line, lineIndex) => (
                                <div key={lineIndex}>
                                    <span className={line.color}>
                                        {line.text.split('').map((char, charIndex) => {
                                            const trajectory = generateRandomTrajectory(lineIndex * 100 + charIndex);
                                            return (
                                                <motion.span
                                                    key={charIndex}
                                                    className="inline-block"
                                                    style={{
                                                        willChange: shouldExplode ? 'transform, opacity' : 'auto',
                                                        backfaceVisibility: 'hidden',
                                                        WebkitFontSmoothing: 'antialiased',
                                                    }}
                                                    initial={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                                                    animate={shouldExplode ? {
                                                        opacity: 0,
                                                        x: trajectory.x,
                                                        y: trajectory.y,
                                                        rotate: trajectory.rotate,
                                                    } : {
                                                        opacity: 1,
                                                        x: 0,
                                                        y: 0,
                                                        rotate: 0,
                                                    }}
                                                    transition={{
                                                        duration: 1.5,
                                                        delay: trajectory.delay,
                                                        ease: [0.25, 0.46, 0.45, 0.94],
                                                        opacity: {
                                                            duration: 1.2,
                                                            ease: 'easeOut',
                                                        },
                                                    }}
                                                >
                                                    {char === ' ' ? '\u00A0' : char}
                                                </motion.span>
                                            );
                                        })}
                                    </span>
                                    <br />
                                </div>
                            ))}
                        </h2>
                    </motion.div>
                </div>
            </section>

            {/* Philosophy Section - White Background */}
            <section ref={philosophyRef} className="flex items-center px-6 md:px-12 py-12 md:py-20 bg-white overflow-clip">
                <div className="max-w-6xl w-full mx-auto overflow-clip">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={philosophyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                        transition={{ duration: 1, ease: customEase }}
                    >
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-mono mb-12">
                            IT'S NOT JUST A PROFESSION — IT'S A WAY OF THINKING.
                        </h3>

                        <motion.div
                            initial={{ width: 0 }}
                            animate={philosophyInView ? { width: "100%" } : { width: 0 }}
                            transition={{ duration: 1.2, ease: customEase, delay: 0.3 }}
                            className="h-px bg-black mb-12"
                        />

                        <div className="grid md:grid-cols-2 gap-12">
                            <div>
                                <p className="text-sm md:text-base font-mono leading-relaxed">
                                    MY WORK IS PART OF MY LIFESTYLE. AS A FULL STACK DEVELOPER, I AM CONSTANTLY EXPLORING NEW TECHNOLOGIES: I OBSERVE HOW USERS INTERACT WITH APPLICATIONS, SYSTEMS, AND INTERFACES.
                                </p>
                            </div>
                            <div className="flex flex-col items-end">
                                <motion.button
                                    whileHover={{ x: 10 }}
                                    className="text-sm font-mono flex items-center gap-2 hover:opacity-60 transition-opacity"
                                >
                                    MY PHILOSOPHY
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </motion.button>
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={philosophyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 1, ease: customEase, delay: 0.6 }}
                            className="mt-16 text-sm md:text-base font-mono leading-relaxed max-w-3xl"
                        >
                            <p className="mb-6">
                                I VALUE CLEAN CODE, SCALABLE ARCHITECTURE, AND USER-CENTRIC DESIGN. I BELIEVE IN BUILDING PRODUCTS THAT ARE NOT JUST FUNCTIONAL BUT DELIGHTFUL TO USE.
                            </p>
                            <p>
                                I LOVE TACKLING COMPLEX CHALLENGES AND TURNING IDEAS INTO REALITY THROUGH CODE AND CREATIVITY.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Portrait Section - White Background */}
            <section ref={portraitRef} className="min-h-dvh flex items-center justify-center px-6 md:px-12 py-20 bg-white overflow-clip">
                <div className="max-w-4xl w-full overflow-clip">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={portraitInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                        transition={{ duration: 1, ease: customEase }}
                        className="text-center"
                    >
                        <h4 className="text-sm font-mono mb-8">ABOUT ME</h4>

                        {/* Portrait Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={portraitInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                            transition={{ duration: 1.2, ease: customEase, delay: 0.3 }}
                            className="w-64 h-80 mx-auto bg-gray-400 mb-8 grayscale overflow-hidden"
                        >
                            <img
                                src={profileImage}
                                alt="Gaurav Pawar"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={portraitInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 1, ease: customEase, delay: 0.6 }}
                        >
                            <p className="text-lg font-mono mb-2">HELLO!</p>
                            <p className="text-lg font-mono mb-12">I'M GAURAV PAWAR</p>
                        </motion.div>

                        <motion.div
                            initial={{ width: 0 }}
                            animate={portraitInView ? { width: "100%" } : { width: 0 }}
                            transition={{ duration: 1.2, ease: customEase, delay: 0.8 }}
                            className="h-px bg-black mb-12 mx-auto"
                        />

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={portraitInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 1, ease: customEase, delay: 1 }}
                            className="text-sm md:text-base font-mono leading-relaxed"
                        >
                            A FULL STACK DEVELOPER & MOBILE APP DEVELOPER WITH EXPERIENCE IN FLUTTER, MERN STACK, AND BUILDING PRODUCTION-READY APPLICATIONS FOR STARTUPS AND ENTERPRISES.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Works Section - Black Background */}
            <section className="min-h-dvh bg-black text-white py-20 px-6 md:px-12 overflow-clip">
                <div className="max-w-7xl mx-auto overflow-clip">
                    {/* Section Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: customEase }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <h2 className="text-7xl md:text-9xl font-black tracking-tighter leading-none mb-4">
                            RECENT<br />WORKS
                        </h2>
                        <div className="text-sm font-mono text-white/60">/ SELECTED PROJECTS</div>
                    </motion.div>

                    {/* Works Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Work 1 - Tokyo */}
                        <motion.div
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0, ease: customEase }}
                            viewport={{ once: true }}
                            className="group cursor-pointer"
                            onClick={() => onNavigate && onNavigate('works')}
                        >
                            <div
                                className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-2xl transform transition-all duration-500 group-hover:scale-105"
                                style={{ boxShadow: '0 0 60px #1a3a5240' }}
                            >
                                {/* Background Image */}
                                <img
                                    src="/collab_thumbnail.png"
                                    alt="Collab"
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #1a3a52ee 0%, #1a3a5280 30%, transparent 60%)' }} />
                                <div className="relative h-full p-6 flex flex-col justify-between">
                                    <div>
                                        <div className="text-xs font-mono text-white/60 mb-2">/ DSGN 1</div>
                                        <h3 className="text-2xl md:text-3xl font-black text-white leading-tight tracking-tight">
                                            COLLAB
                                        </h3>
                                    </div>
                                    <div>
                                        <div className="text-sm font-mono text-white/80 mb-2">DEPLOYED</div>
                                        <div className="text-xs font-mono text-white/60">GLOBAL</div>
                                    </div>
                                </div>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    className="absolute inset-0 bg-black/80 flex items-center justify-center"
                                >
                                    <span className="text-white font-bold text-lg">VIEW CASE →</span>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Work 2 - London */}
                        <motion.div
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: customEase }}
                            viewport={{ once: true }}
                            className="group cursor-pointer"
                            onClick={() => onNavigate && onNavigate('works')}
                        >
                            <div
                                className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-2xl transform transition-all duration-500 group-hover:scale-105"
                                style={{ boxShadow: '0 0 60px #ff572240' }}
                            >
                                {/* Background Image */}
                                <img
                                    src="/resume_builder_thumbnail.png"
                                    alt="Resume Builder"
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #ff5722ee 0%, #ff572280 30%, transparent 60%)' }} />
                                <div className="relative h-full p-6 flex flex-col justify-between">
                                    <div>
                                        <div className="text-xs font-mono text-white/60 mb-2">/ DSGN 2</div>
                                        <h3 className="text-2xl md:text-3xl font-black text-white leading-tight tracking-tight">
                                            RESUME BUILDER
                                        </h3>
                                    </div>
                                    <div>
                                        <div className="text-sm font-mono text-white/80 mb-2">DEPLOYED</div>
                                        <div className="text-xs font-mono text-white/60">GLOBAL</div>
                                    </div>
                                </div>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    className="absolute inset-0 bg-black/80 flex items-center justify-center"
                                >
                                    <span className="text-white font-bold text-lg">VIEW CASE →</span>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Work 3 - Madrid */}
                        <motion.div
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4, ease: customEase }}
                            viewport={{ once: true }}
                            className="group cursor-pointer"
                            onClick={() => onNavigate && onNavigate('works')}
                        >
                            <div
                                className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-2xl transform transition-all duration-500 group-hover:scale-105"
                                style={{ boxShadow: '0 0 60px #2a2a2a40' }}
                            >
                                {/* Background Image */}
                                <img
                                    src="/white_lotus.png"
                                    alt="White Lotus Hospital"
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #2a2a2aee 0%, #2a2a2a80 30%, transparent 60%)' }} />
                                <div className="relative h-full p-6 flex flex-col justify-between">
                                    <div>
                                        <div className="text-xs font-mono text-white/60 mb-2">/ DSGN 3</div>
                                        <h3 className="text-2xl md:text-3xl font-black text-white leading-tight tracking-tight">
                                            WHITE LOTUS HOSPITAL
                                        </h3>
                                    </div>
                                    <div>
                                        <div className="text-sm font-mono text-white/80 mb-2">WEB • DEPLOYED</div>
                                        <div className="text-xs font-mono text-white/60">INDIA</div>
                                    </div>
                                </div>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    className="absolute inset-0 bg-black/80 flex items-center justify-center"
                                >
                                    <span className="text-white font-bold text-lg">VIEW CASE →</span>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>

                    {/* View All Works Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: customEase }}
                        viewport={{ once: true }}
                        className="mt-16 text-center"
                    >
                        <button
                            onClick={() => onNavigate && onNavigate('works')}
                            className="inline-flex items-center gap-3 px-8 py-4 border-2 border-white text-white font-bold text-sm tracking-wider hover:bg-white hover:text-black transition-all duration-300"
                        >
                            VIEW ALL WORKS
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Services Accordion Section - White Background */}
            <section className="min-h-dvh bg-white py-20 overflow-clip">
                <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 overflow-clip">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: customEase }}
                        viewport={{ once: true }}
                        className="text-center mb-8"
                    >
                        <div className="text-xs font-mono mb-4 tracking-wider">[ EXPERTISE ]</div>
                        <h2 className="text-7xl md:text-9xl font-black tracking-tighter leading-none">
                            SERVICES
                        </h2>
                    </motion.div>
                </div>

                {/* Accordion Grid */}
                <div className="flex h-[600px] border-t-2 border-b-2 border-black">
                    {[
                        {
                            id: 1,
                            number: "00-1",
                            title: "MOBILE APP DEVELOPMENT",
                            features: ["FLUTTER", "REACT NATIVE", "IOS & ANDROID", "APP STORE"]
                        },
                        {
                            id: 2,
                            number: "00-2",
                            title: "BACKEND SERVICES",
                            features: ["API DEV", "DATABASE DESIGN", "CLOUD", "SECURITY"]
                        },
                        {
                            id: 3,
                            number: "00-3",
                            title: "SYSTEM ARCHITECTURE",
                            features: ["SCALABILITY", "MICROSERVICES", "PERFORMANCE", "TECH STACK"]
                        },
                        {
                            id: 4,
                            number: "00-4",
                            title: "PRODUCT DEVELOPMENT",
                            features: ["MVP DEV", "STRATEGY", "PROTOTYPING", "LIFECYCLE"]
                        },
                        {
                            id: 5,
                            number: "00-5",
                            title: "WEB DEVELOPMENT",
                            features: ["REACT/NEXT.JS", "FRONTEND", "SEO", "RESPONSIVE"]
                        }
                    ].map((service) => (
                        <motion.div
                            key={service.id}
                            className="relative border-r-2 border-black last:border-r-0 cursor-pointer overflow-clip"
                            style={{
                                width: !hoveredService ? '20%' : hoveredService === service.id ? '40%' : '15%',
                            }}
                            animate={{
                                width: !hoveredService ? '20%' : hoveredService === service.id ? '40%' : '15%',
                            }}
                            transition={{ duration: 0.6, ease: customEase }}
                            onMouseEnter={() => setHoveredService(service.id)}
                            onMouseLeave={() => setHoveredService(null)}
                        >
                            {/* Collapsed State - Vertical Text */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    animate={{ opacity: hoveredService === service.id ? 0 : 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="transform -rotate-90 whitespace-nowrap"
                                >
                                    <div className="text-xs font-mono mb-2">{service.number}</div>
                                    <h3 className="text-xl font-black tracking-tight">{service.title}</h3>
                                </motion.div>
                            </div>

                            {/* Expanded State - Full Content */}
                            {hoveredService === service.id && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4, delay: 0.2 }}
                                    className="absolute inset-0 p-8 flex flex-col justify-between"
                                >
                                    <div>
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ duration: 0.5, delay: 0.3, ease: customEase }}
                                        >
                                            <div className="text-xs font-mono mb-4">{service.number}</div>
                                            <h2 className="text-2xl md:text-3xl font-black mb-6 tracking-tight">
                                                // {service.title}
                                            </h2>
                                        </motion.div>

                                        {/* Features with Mask Animation */}
                                        <div className="space-y-2 mb-6">
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
                                                    className="text-sm font-bold"
                                                >
                                                    /{feature}
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Icon */}

                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* View All Services Button */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: customEase }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <button
                        onClick={() => onNavigate && onNavigate('services')}
                        className="inline-flex items-center gap-3 px-8 py-4 border-2 border-black text-black font-bold text-sm tracking-wider hover:bg-black hover:text-white transition-all duration-300"
                    >
                        VIEW ALL SERVICES
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </motion.div>
            </section>

            {/* Contact Form Section - Added from ContactPage */}
            <section className="py-20 px-6 md:px-12 bg-white border-t border-black/10 overflow-clip">
                <div className="max-w-xl mx-auto overflow-clip">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: customEase }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <p className="text-xs md:text-sm font-mono mb-4 tracking-wider italic">
                            LET'S START THE CONVERSATION
                        </p>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-4">
                            GET IN TOUCH
                        </h2>
                    </motion.div>

                    <motion.form
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: customEase }}
                        viewport={{ once: true }}
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >
                        {/* Name Input */}
                        <div>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="YOUR NAME*"
                                required
                                className="w-full border-b border-black/30 bg-transparent py-4 text-sm font-mono placeholder-black/50 focus:outline-none focus:border-black transition-colors"
                            />
                        </div>

                        {/* Phone Input */}
                        <div>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="PHONE*"
                                required
                                className="w-full border-b border-black/30 bg-transparent py-4 text-sm font-mono placeholder-black/50 focus:outline-none focus:border-black transition-colors"
                            />
                        </div>

                        {/* Email Input */}
                        <div>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="YOUR EMAIL*"
                                required
                                className="w-full border-b border-black/30 bg-transparent py-4 text-sm font-mono placeholder-black/50 focus:outline-none focus:border-black transition-colors"
                            />
                        </div>

                        {/* Message Input */}
                        <div>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                placeholder="HOW CAN I HELP YOU"
                                rows="3"
                                className="w-full border-b border-black/30 bg-transparent py-4 text-sm font-mono placeholder-black/50 focus:outline-none focus:border-black transition-colors resize-none"
                            />
                        </div>

                        {/* Budget Selection */}
                        <div className="pt-8 border-t border-black/20">
                            <label className="block text-xs font-mono mb-6 tracking-wider text-black/60">
                                PROJECT BUDGET (USD)
                            </label>
                            <div className="flex flex-wrap gap-4 md:gap-8">
                                {budgetOptions.map((budget) => (
                                    <button
                                        key={budget}
                                        type="button"
                                        onClick={() => setSelectedBudget(budget)}
                                        className={`text-sm font-bold tracking-wider transition-all duration-300 pb-1 ${selectedBudget === budget
                                            ? 'border-b-2 border-black text-black'
                                            : 'text-black/60 hover:text-black'
                                            }`}
                                    >
                                        {budget}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Discuss Project Button */}
                        <div className="text-center py-12">
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-flex items-center gap-2 text-sm font-bold tracking-wider border-b-2 border-black pb-1 hover:opacity-60 transition-opacity"
                            >
                                DISCUSS THE PROJECT
                                <svg className="w-4 h-4 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </motion.button>
                        </div>
                    </motion.form>
                </div>
            </section>

            {/* Footer */}
            <Footer onNavigate={onNavigate} />
        </div>
    );
};

export default Hero;
