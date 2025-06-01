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
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const router = useRouter();
  const darkMode = false;

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [menuOpen]);

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

  const handleLoginClick = () => router.push(isAuthenticated ? '/dashboard' : '/login');
  const handleBookDemo = () => router.push('/bookingdialog');
  const scrollToFeatures = () => {
    const section = document.getElementById('features');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ height: '4rem' }}
      animate={{ height: isScrolled ? '3.25rem' : '4rem' }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 w-full font-sans z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/60 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full md:hidden">
          <Link href="/" className="text-xl font-bold text-blue-800 hover:text-blue-600 transition duration-200">
            💬 Talksy AI
          </Link>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
            aria-label="Toggle menu"
          >
            <Menu size={26} />
          </motion.button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-center items-center h-full">
          <div className="bg-blue-900 text-white mt-1 px-6 py-2 rounded-full shadow-lg flex items-center gap-6 transition-all duration-300">
            <Link href="/" className="text-lg font-bold hover:text-white flex items-center gap-2">
              💬 Talksy AI
            </Link>
            <NavLink href="/" label="Home" hoveredLink={hoveredLink} setHoveredLink={setHoveredLink} />
            <NavLink href="/pricing" label="Pricing" hoveredLink={hoveredLink} setHoveredLink={setHoveredLink} />
            <NavLink href="#features" label="Features" onClick={scrollToFeatures} hoveredLink={hoveredLink} setHoveredLink={setHoveredLink} />
            {isAuthenticated ? (
              <NavLink href="/dashboard" label="Dashboard" hoveredLink={hoveredLink} setHoveredLink={setHoveredLink} />
            ) : (
              <NavLink href="/register" label="Get Started" hoveredLink={hoveredLink} setHoveredLink={setHoveredLink} />
            )}

            <div className="flex items-center gap-3 ml-4">
              <button
                onClick={handleLoginClick}
                className="px-4 py-1 text-lg font-medium text-white transition relative group"
              >
                <span className="relative">
                  Login
                  <span className="absolute left-0 -bottom-0.5 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                </span>
              </button>

              <button
                onClick={handleBookDemo}
                className="px-5 py-3 text-base font-semibold bg-white text-blue-600 rounded-full hover:bg-blue-50 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Book a Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`fixed top-[4rem] left-0 w-full h-[calc(100vh-4rem)] z-40 ${
              darkMode ? 'bg-black' : 'bg-white'
            } px-6 py-10 flex flex-col justify-between md:hidden`}
          >
            <div className="flex flex-col gap-4">
              <MobileLink href="/" label="Home" onClick={() => setMenuOpen(false)} />
              <MobileLink href="/pricing" label="Pricing" onClick={() => setMenuOpen(false)} />
              <MobileLink href="#features" label="Features" onClick={() => { scrollToFeatures(); setMenuOpen(false); }} />
              <MobileLink href="/login" label="Login" onClick={() => { handleLoginClick(); setMenuOpen(false); }} />

              {/* Flex row buttons */}
              <div className="flex gap-3 mt-4">
                {isAuthenticated ? (
                  <Link
                    href="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="w-1/2 text-center py-2 px-3 rounded-full text-white bg-blue-800 hover:bg-blue-700 transition"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    href="/register"
                    onClick={() => setMenuOpen(false)}
                    className="w-1/2 text-center py-2 px-3 rounded-full text-white bg-blue-800 hover:bg-blue-700 transition"
                  >
                    Get Started
                  </Link>
                )}
                <button
                  onClick={() => { handleBookDemo(); setMenuOpen(false); }}
                  className="w-1/2 text-center py-2 px-3 rounded-full text-blue-800 border border-blue-800 font-medium hover:bg-blue-50 transition"
                >
                  Book a Demo
                </button>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
              Powered by <span className="text-blue-700 font-semibold">Talksy AI</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function NavLink({
  href,
  label,
  onClick,
  className = '',
  hoveredLink,
  setHoveredLink,
}: {
  href: string;
  label: string;
  onClick?: () => void;
  className?: string;
  hoveredLink?: string | null;
  setHoveredLink?: (label: string | null) => void;
}) {
  const active = hoveredLink === label;
  return (
    <Link
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHoveredLink?.(label)}
      onMouseLeave={() => setHoveredLink?.(null)}
      className={`group relative font-medium hover:text-white transition duration-200 ${className}`}
    >
      <span className="inline-block relative">
        {label}
        <span
          className={`absolute left-0 -bottom-0.5 h-0.5 bg-white transition-all duration-300 ease-in-out ${
            active ? 'w-full' : 'w-0 group-hover:w-full'
          }`}
        />
      </span>
    </Link>
  );
}

function MobileLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-left py-3 border-b border-gray-300 text-lg font-medium text-gray-800 hover:text-blue-700 transition"
    >
      {label}
    </Link>
  );
}
