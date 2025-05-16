'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLoginClick = () => {
    router.push(isAuthenticated ? '/dashboard' : '/login');
  };

  const handleBookDemo = () => {
    router.push('/bookingdialog');
  };

  const scrollToFeatures = () => {
    const section = document.getElementById('features');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ height: '4rem' }}
      animate={{ height: isScrolled ? '3.25rem' : '4rem' }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-900 via-blue-950 to-blue-900 backdrop-blur-lg transition-all duration-300 ${isScrolled ? 'shadow-xl' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          <Link href="/" className="text-2xl font-bold text-white hover:text-blue-300 transition tracking-wide">
            💬 Talksy AI
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink href="/" label="Home" />
            <NavLink href="/pricing" label="Pricing" />
            <UnderlineButton onClick={scrollToFeatures} label="Features" />
            {isAuthenticated ? (
              <NavLink href="/dashboard" label="Dashboard" />
            ) : (
              <NavLink href="/register" label="Get Started" />
            )}
            <UnderlineButton onClick={handleLoginClick} label="Login" />
            <button
              onClick={handleBookDemo}
              className="bg-white text-blue-800 font-semibold px-6 py-2 text-sm rounded-full shadow hover:border hover:border-blue-800 hover:text-blue-800 transition"
            >
              Book a Demo
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white p-2 rounded-lg hover:bg-white/10 focus:outline-none transition"
              aria-label="Toggle menu"
            >
              <Menu size={26} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed top-16 left-0 w-full bg-blue-950/95 backdrop-blur-md z-40 px-6 py-6 flex flex-col gap-5 shadow-lg items-start"
          >
            <NavLink href="/" label="Home" onClick={() => setMenuOpen(false)} className="text-lg" />
            <NavLink href="/pricing" label="Pricing" onClick={() => setMenuOpen(false)} className="text-lg" />
            <UnderlineButton onClick={() => {
              scrollToFeatures();
              setMenuOpen(false);
            }} label="Features" className="text-lg" />
            <UnderlineButton onClick={() => {
              handleLoginClick();
              setMenuOpen(false);
            }} label="Login" className="text-lg" />

            <div className="flex flex-row gap-4 w-full">
              {isAuthenticated ? (
                <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="w-full">
                  <div className="text-white font-semibold text-center py-2 px-4 rounded-full border border-white hover:border-blue-400 hover:text-blue-800 hover:bg-white transition w-full">
                    Dashboard
                  </div>
                </Link>
              ) : (
                <Link href="/register" onClick={() => setMenuOpen(false)} className="w-full">
                  <div className="text-white text-center py-2 px-4 rounded-full border border-white hover:border-blue-400 hover:text-blue-400 hover-bg-white transition w-full">
                    Get Started
                  </div>
                </Link>
              )}

              <button
                onClick={() => {
                  handleBookDemo();
                  setMenuOpen(false);
                }}
                className="text-sm font-semibold bg-white text-blue-800 px-4 py-2 rounded-full hover:bg-blue-100 transition w-full text-center hover:border border-blue-800"
              >
                Book a Demo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ✅ NavLink
function NavLink({
  href,
  label,
  onClick,
  className = '',
}: {
  href: string;
  label: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group relative text-white font-medium transition duration-200 ${className}`}
    >
      {label}
      <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300 ease-in-out" />
    </Link>
  );
}

// ✅ UnderlineButton
function UnderlineButton({
  label,
  onClick,
  className = '',
}: {
  label: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative text-white font-medium transition duration-200 ${className}`}
    >
      {label}
      <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300 ease-in-out" />
    </button>
  );
}
