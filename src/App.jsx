import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, Navigate } from 'react-router-dom';
import Hero from './components/Hero';
import Navigation from './components/Navigation';
import AboutPage from './components/AboutPage';
import WorksPage from './components/WorksPage';
import ServicesPage from './components/ServicesPage';
import ContactPage from './components/ContactPage';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import LeadsPage from './components/LeadsPage';

const Portfolio = () => {
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
      <Navigation currentPage={currentPage} onNavigate={handleNavigation} />
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
  );
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  if (!token) return <Navigate to="/admin/auth" replace />;
  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/admin/auth" element={<AdminLogin />} />
      <Route path="/admin" element={
        <ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/admin/leads" replace />} />
        <Route path="leads" element={<LeadsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
