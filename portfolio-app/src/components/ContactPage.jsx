import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../constants/config';

const ContactPage = () => {
    const [selectedBudget, setSelectedBudget] = useState(null);
    const [currentTime, setCurrentTime] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error'
    const [errorMessage, setErrorMessage] = useState('');

    const customEase = [0.16, 1, 0.3, 1];
    const budgetOptions = ['1K-5K', '5K-10K', '10K-20K', 'MORE'];

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

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedBudget) {
            setSubmitStatus('error');
            setErrorMessage('Please select a budget');
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);
        setErrorMessage('');

        try {
            const response = await fetch(API_ENDPOINTS.CONTACT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    budget: selectedBudget
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    message: ''
                });
                setSelectedBudget(null);
            } else {
                setSubmitStatus('error');
                setErrorMessage(data.error || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setSubmitStatus('error');
            setErrorMessage('Could not connect to the server. Please check if the backend is running.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-dvh bg-white text-black overflow-clip">
            {/* Hero Section */}
            <section className="pt-32 pb-16 px-6 md:px-12 overflow-clip">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: customEase }}
                    >
                        <p className="text-xs md:text-sm font-mono mb-8 tracking-wider italic">
                            LET'S START THE CONVERSATION
                        </p>
                        <div className="space-y-2 md:space-y-4">
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none">
                                GREAT DESIGN
                            </h1>
                            <p className="text-xs md:text-sm tracking-[0.4em] font-mono py-2">
                                S T A R T S &nbsp;&nbsp; W I T H
                            </p>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none">
                                GREAT COLLABORATION
                            </h1>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="py-12 px-6 md:px-12">
                <div className="max-w-xl mx-auto">
                    <motion.form
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: customEase }}
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
                                disabled={isSubmitting}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`inline-flex items-center gap-2 text-sm font-bold tracking-wider border-b-2 border-black pb-1 transition-all ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-60'}`}
                            >
                                {isSubmitting ? 'SENDING...' : 'DISCUSS THE PROJECT'}
                                <svg className="w-4 h-4 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </motion.button>

                            {/* Status Messages */}
                            {submitStatus === 'success' && (
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-4 text-green-600 font-mono text-sm"
                                >
                                    MESSAGE SENT SUCCESSFULLY! I'LL GET BACK TO YOU SOON.
                                </motion.p>
                            )}
                            {submitStatus === 'error' && (
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-4 text-red-600 font-mono text-sm uppercase"
                                >
                                    {errorMessage}
                                </motion.p>
                            )}
                        </div>
                    </motion.form>
                </div>
            </section>

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
                                <button className="block text-sm font-bold hover:opacity-60 transition-opacity">
                                    ABOUT ME
                                </button>
                                <button className="block text-sm font-bold hover:opacity-60 transition-opacity">
                                    SERVICES
                                </button>
                                <button className="block text-sm font-bold hover:opacity-60 transition-opacity">
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
        </div>
    );
};

export default ContactPage;
