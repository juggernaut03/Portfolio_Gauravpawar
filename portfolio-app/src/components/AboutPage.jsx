import { motion, useInView, useScroll } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import profileImage from '../assets/image_profile.png';
import Footer from './Footer';

const AboutPage = () => {
    const philosophyRef = useRef(null);
    const portraitRef = useRef(null);
    const experienceRef = useRef(null);
    const quoteRef = useRef(null);

    const [shouldExplode, setShouldExplode] = useState(false);

    const philosophyInView = useInView(philosophyRef, { once: true, margin: "-100px" });
    const portraitInView = useInView(portraitRef, { once: true, margin: "-100px" });
    const experienceInView = useInView(experienceRef, { once: true, margin: "-100px" });

    // Custom easing for luxury feel
    const customEase = [0.16, 1, 0.3, 1];

    // Track scroll position to trigger explosion and reform
    const { scrollY } = useScroll();

    useEffect(() => {
        const unsubscribe = scrollY.on("change", (latest) => {
            // Trigger explosion when scrolled past 500px
            if (latest > 500 && !shouldExplode) {
                setShouldExplode(true);
            }
            // Reform letters when scrolling back up above 400px
            if (latest < 400 && shouldExplode) {
                setShouldExplode(false);
            }
        });

        return () => unsubscribe();
    }, [scrollY, shouldExplode]);

    // Generate random trajectory for each character - optimized for smoothness
    const generateRandomTrajectory = (charIndex) => {
        const randomX = (Math.random() - 0.5) * 800; // Reduced distance for smoother motion
        const randomY = Math.random() * 800 + 400; // Reduced distance
        const randomRotate = (Math.random() - 0.5) * 360; // Reduced rotation
        const randomDelay = (charIndex % 10) * 0.02; // More controlled stagger

        return {
            x: randomX,
            y: randomY,
            rotate: randomRotate,
            delay: randomDelay,
        };
    };

    // Split text into lines with characters
    const quoteLines = [
        { text: "CODE", color: "text-white" },
        { text: "IS NOT JUST", color: "text-gray-500" },
        { text: "SYNTAX, BUT", color: "text-gray-500" },
        { text: "A TOOL FOR BUILDING", color: "text-white" },
        { text: "THE FUTURE.", color: "text-white" },
    ];

    return (
        <div className="min-h-dvh bg-black text-white overflow-clip">
            {/* Page Indicator */}
            <div className="fixed top-20 left-6 md:left-8 text-sm font-mono z-40">
                2/5
            </div>
            <div className="fixed top-20 right-6 md:right-8 text-sm font-mono z-40">
                DSGN/2
            </div>
            <div className="fixed top-20 left-1/2 transform -translate-x-1/2 text-sm font-mono z-40">
                FOR ME
            </div>

            {/* Hero Quote Section with Letter Explosion */}
            <section ref={quoteRef} className="min-h-dvh flex items-center justify-center px-6 md:px-12 pt-32 pb-20 overflow-clip">
                <div className="max-w-6xl w-full overflow-clip">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: customEase }}
                        style={{ contain: 'layout style paint' }}
                    >
                        <h1
                            className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-none tracking-tighter mb-8 inline-block"
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
                                                        ease: [0.25, 0.46, 0.45, 0.94], // Smoother easeOutQuad
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
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* Philosophy Section */}
            <section ref={philosophyRef} className="min-h-dvh flex items-center px-6 md:px-12 py-20 overflow-clip">
                <div className="max-w-6xl w-full mx-auto overflow-clip">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={philosophyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                        transition={{ duration: 1, ease: customEase }}
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-mono mb-12">
                            IT'S NOT JUST A PROFESSION — IT'S A WAY OF THINKING.
                        </h2>

                        <motion.div
                            initial={{ width: 0 }}
                            animate={philosophyInView ? { width: "100%" } : { width: 0 }}
                            transition={{ duration: 1.2, ease: customEase, delay: 0.3 }}
                            className="h-px bg-white mb-12"
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

            {/* Portrait Section */}
            <section ref={portraitRef} className="flex items-center justify-center px-6 md:px-12 py-20 overflow-clip">
                <div className="max-w-4xl w-full overflow-clip">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={portraitInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                        transition={{ duration: 1, ease: customEase }}
                        className="text-center"
                    >
                        <h3 className="text-sm font-mono mb-8">ABOUT ME</h3>

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
                            <p className="text-lg font-mono mb-6">I'M GAURAV PAWAR</p>
                            <p className="text-sm md:text-base font-mono leading-relaxed text-gray-400 max-w-2xl mx-auto mb-12">
                                A passionate Full Stack Developer & Mobile App Developer with expertise in Flutter, MERN Stack, and building production-ready applications. I transform ideas into elegant, scalable solutions that deliver exceptional user experiences.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ width: 0 }}
                            animate={portraitInView ? { width: "100%" } : { width: 0 }}
                            transition={{ duration: 1.2, ease: customEase, delay: 0.8 }}
                            className="h-px bg-white mb-12 mx-auto"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Experience Section */}
            <section ref={experienceRef} className="flex items-center px-6 md:px-12 py-16 overflow-clip">
                <div className="max-w-4xl w-full mx-auto text-center overflow-clip">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={experienceInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                        transition={{ duration: 1, ease: customEase }}
                    >
                        <motion.button
                            whileHover={{ x: 10 }}
                            className="text-sm font-mono flex items-center gap-2 hover:opacity-60 transition-opacity mx-auto mb-12"
                        >
                            MY EXPERIENCE
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </motion.button>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={experienceInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 1, ease: customEase, delay: 0.3 }}
                            className="text-sm md:text-base font-mono leading-relaxed"
                        >
                            A FULL STACK DEVELOPER & MOBILE APP DEVELOPER WITH EXPERIENCE IN FLUTTER, MERN STACK, AND BUILDING PRODUCTION-READY APPLICATIONS FOR STARTUPS AND ENTERPRISES.
                        </motion.p>

                        <motion.div
                            initial={{ width: 0 }}
                            animate={experienceInView ? { width: "100%" } : { width: 0 }}
                            transition={{ duration: 1.2, ease: customEase, delay: 0.6 }}
                            className="h-px bg-white mt-20 mx-auto"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default AboutPage;
