'use client';

import React, { useEffect, useState } from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const Footer = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    }
  }, []);

  const handleCreateBotClick = () => {
    router.push(isAuthenticated ? '/dashboard' : '/login');
  };

  const handleBookDemoClick = () => {
    router.push('/bookingdialog');
  };

  const scrollToFAQ = () => {
    const faqSection = document.getElementById('faq-section');
    if (faqSection) {
      faqSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#0A1D37] text-white pt-16 pb-10 px-6 md:px-20 lg:px-32">
      {/* Top CTA Banner */}
      <div className="bg-white text-gray-800 p-8 md:p-10 mb-14 shadow-lg flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-bold mb-2">Ready to build your chatbot?</h3>
          <p className="text-gray-950">Get started with Talksy AI in minutes—no code required.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleCreateBotClick}
            className="px-6 py-3 text-sm font-semibold bg-blue-800 rounded-full text-white shadow hover:bg-blue-50 hover:border border-blue-700 hover:text-blue-800 transition duration-300"
          >
            Create Your Bot
          </button>
          <button
            onClick={handleBookDemoClick}
            className="px-6 py-3 text-sm font-semibold bg-white text-blue-800 border border-blue-700 rounded-full hover:bg-blue-50 transition duration-300"
          >
            Book a Demo
          </button>
        </div>
      </div>

      {/* Footer Columns */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Talksy AI</h2>
          <p className="text-gray-300 leading-relaxed">
            Talksy AI helps small businesses launch AI chatbots without writing code. Easy. Fast. Smart and reliable for all businesses.
          </p>
        </div>

        {/* Product */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Product</h3>
          <ul className="space-y-3 text-gray-300">
            <li><a href="#faq" onClick={scrollToFAQ} className="hover:text-white transition">FAQ</a></li>
            <li>
              <button
                onClick={() => {
                  if (window.location.pathname === '/ChatbotFeatures') {
                    const el = document.getElementById('features');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    router.push('/ChatbotFeatures#features');
                  }
                }}
                className="hover:text-white transition text-left"
              >
                Features
              </button>
            </li>
            <li><a href="/pricing" className="hover:text-white transition">Pricing</a></li>
            <li><a href="/dashboard" className="hover:text-white transition">Dashboard</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-3 text-gray-300">
            <li><a href="/about" className="hover:text-white transition">About Us</a></li>
            <li><a href="/blog" className="hover:text-white transition">Blog</a></li>
            <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
            <li><a href="/terms" className="hover:text-white transition">Terms & Privacy</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>
          <p className="text-gray-300 mb-4">Join us on social media:</p>
          <div className="flex gap-4 text-xl">
            <a href="https://facebook.com" className="hover:text-blue-400 transition"><FaFacebookF /></a>
            <a href="https://twitter.com" className="hover:text-blue-400 transition"><FaTwitter /></a>
            <a href="https://linkedin.com" className="hover:text-blue-400 transition"><FaLinkedinIn /></a>
            <a href="https://github.com" className="hover:text-blue-400 transition"><FaGithub /></a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-14 border-t border-white/10 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Talksy AI. Empowering small businesses with smart chatbots.
      </div>
    </footer>
  );
};

export default Footer;
