'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
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

  return (
    <motion.nav
      initial={{ height: '4rem' }}
      animate={{ height: isScrolled ? '3.5rem' : '4rem' }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 w-full z-50 bg-blue-950/80 backdrop-blur-md transition-all duration-300 ${
        isScrolled ? 'shadow-lg' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-white hover:text-blue-300 transition"
          >
            💬 Talksy AI
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink href="/" label="Home" />
            <NavLink href="/pricing" label="Pricing" />
            <NavLink href="/features" label="Features" />
            {isAuthenticated ? (
              <NavLink href="/dashboard" label="Dashboard" />
            ) : (
              <NavLink href="/register" label="Get Started" />
            )}

            <button
              onClick={handleLoginClick}
              className="text-white font-medium hover:text-blue-300 transition"
            >
              Login
            </button>

            <div>
              <Button
              onClick={handleBookDemo}
               className="rounded-full font-semibold text-blue-700 bg-white hover:bg-gray-100 px-6 py-2 text-sm">
                Book a Demo
              </Button>
              </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white p-3 rounded-full focus:outline-none transition hover:bg-white/10"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
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
            className="md:hidden fixed top-16 left-0 w-full bg-blue-950/90 backdrop-blur-md z-40 px-6 py-8 flex flex-col gap-6"
          >
            <NavLink
              href="/"
              label="Home"
              onClick={() => setMenuOpen(false)}
              className="text-lg"
            />
            <NavLink
              href="/pricing"
              label="Pricing"
              onClick={() => setMenuOpen(false)}
              className="text-lg"
            />
            <NavLink
              href="/features"
              label="Features"
              onClick={() => setMenuOpen(false)}
              className="text-lg"
            />
            <button
              onClick={() => {
                handleLoginClick();
                setMenuOpen(false);
              }}
              className="text-white font-medium text-lg hover:text-blue-300"
            >
              Login
            </button>

            <Link href="/bookingdialog" onClick={() => setMenuOpen(false)}>
              <Button className="w-full text-sm font-semibold bg-blue-900">Book a Demo</Button>
            </Link>
            {isAuthenticated ? (
              <Link href="/dashboard" onClick={() => setMenuOpen(false)}>
                <Button variant="outline" className="w-full text-sm font-semibold text-white hover:text-blue-800">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/register" onClick={() => setMenuOpen(false)}>
                <Button variant="outline" className="w-full text-sm">
                  Get Started
                </Button>
              </Link>
            )}
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
      className={`text-white font-medium hover:text-blue-300 transition ${className}`}
    >
      {label}
    </Link>
  );
}

