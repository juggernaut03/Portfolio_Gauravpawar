import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import Navigation from './components/Navigation';
import AboutPage from './components/AboutPage';
import WorksPage from './components/WorksPage';
import ServicesPage from './components/ServicesPage';
import ContactPage from './components/ContactPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNavigation = (page) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsTransitioning(false);
    }, 800);
  };

  const customEase = [0.16, 1, 0.3, 1];

  return (
    <>
      {/* Navigation - Always visible */}
      <Navigation currentPage={currentPage} onNavigate={handleNavigation} />

      {/* Page Content with Transitions */}
      <AnimatePresence mode="wait">
        {currentPage === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: customEase }}
          >
            <Hero onNavigate={handleNavigation} />
          </motion.div>
        )}

        {currentPage === 'about' && (
          <motion.div
            key="about"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: customEase }}
          >
            <AboutPage />
          </motion.div>
        )}

        {currentPage === 'works' && (
          <motion.div
            key="works"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: customEase }}
          >
            <WorksPage />
          </motion.div>
        )}

        {currentPage === 'services' && (
          <motion.div
            key="services"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: customEase }}
          >
            <ServicesPage onNavigate={handleNavigation} />
          </motion.div>
        )}

        {currentPage === 'connect' && (
          <motion.div
            key="connect"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: customEase }}
            className="bg-black text-white flex items-center justify-center pt-32 pb-32"
          >
            <h1 className="text-6xl font-black">CONNECT PAGE</h1>
          </motion.div>
        )}

        {currentPage === 'contact' && (
          <motion.div
            key="contact"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: customEase }}
          >
            <ContactPage />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default App
