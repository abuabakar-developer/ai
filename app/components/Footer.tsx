'use client';

import React, { useEffect, useState } from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import Link from 'next/link';
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

  return (
    <footer className="bg-[#0A1D37] text-white pt-16 pb-10 px-6 md:px-20 lg:px-32">
      {/* Top CTA Banner */}
      <div className="bg-white text-gray-800 p-8 md:p-10 mb-14 shadow-lg flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h3 className="text-2xl font-bold mb-2">Ready to build your chatbot?</h3>
          <p className="text-gray-950">Get started with Talksy AI in minutes—no code required.</p>
        </div>
        <button
          onClick={handleCreateBotClick}
          className="inline-block mt-4 md:mt-0 px-6 py-3 text-sm font-semibold bg-blue-800 rounded-full text-white shadow hover:bg-blue-900 transition duration-300"
        >
          Create Your Bot
        </button>
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
            <li><Link href="/features" className="hover:text-white transition">Features</Link></li>
            <li><Link href="/pricing" className="hover:text-white transition">Pricing</Link></li>
            <li><Link href="/faq" className="hover:text-white transition">FAQ</Link></li>
            <li><Link href="/dashboard" className="hover:text-white transition">Dashboard</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-3 text-gray-300">
            <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
            <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
            <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
            <li><Link href="/terms" className="hover:text-white transition">Terms & Privacy</Link></li>
          </ul>
        </div>

        {/* Stay Connected */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>
          <p className="text-gray-300 mb-4">Join us on social media:</p>
          <div className="flex gap-4 text-xl">
            <a href="https://facebook.com" className="hover:text-green-400 transition"><FaFacebookF /></a>
            <a href="https://twitter.com" className="hover:text-green-400 transition"><FaTwitter /></a>
            <a href="https://linkedin.com" className="hover:text-green-400 transition"><FaLinkedinIn /></a>
            <a href="https://github.com" className="hover:text-green-400 transition"><FaGithub /></a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-14 border-t border-white/10 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Talksy AI. Empowering small businesses with smart chatbots.
      </div>
    </footer>
  );
};

export default Footer;
