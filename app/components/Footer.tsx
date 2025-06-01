'use client';

import React, { useEffect, useState } from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Footer = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        JSON.parse(atob(token.split('.')[1]));
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
    faqSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-white text-gray-900 pt-20 pb-10 font-sans px-6 sm:px-12 md:px-24 relative overflow-hidden">
      {/* Background Light Glow */}
      <div
        aria-hidden="true"
        className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-800 via-blue-900 to-blue-950 opacity-10 blur-3xl z-0 pointer-events-none"
      />

      {/* CTA */}
      <section
        aria-label="Call to Action"
        className="relative z-10 bg-white border border-gray-200 shadow-xl rounded-3xl flex flex-col lg:flex-row overflow-hidden mb-20 transition-all duration-500"
      >
        <div className="flex-1 p-10 flex flex-col justify-center space-y-5">
          <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight text-gray-900">
            Ready to <span className="text-blue-800">build your</span> chatbot?
          </h2>
          <p className="text-gray-700 text-lg max-w-md">
            Get started with Talksy AI in minutes — no code required.
          </p>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={handleCreateBotClick}
              className="px-6 py-3 bg-blue-800 text-white font-semibold text-sm sm:text-base rounded-full hover:bg-blue-700 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              Create Your Bot
            </button>
            <button
              onClick={handleBookDemoClick}
              className="px-6 py-3 border border-blue-700 text-blue-800 bg-white font-semibold text-sm sm:text-base rounded-full hover:bg-blue-50 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              Book a Demo
            </button>
          </div>
        </div>

        <div className="flex-1 relative flex items-center justify-center p-10">
          <div className="relative w-72 h-72">
            {/* Base Image */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg ring-1 ring-gray-200 z-10">
              <Image src="/bussiness.png" alt="Chatbot" fill className="object-cover" priority />
            </div>
            {/* Overlay animation */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden border-4 border-white animate-fadeIn z-20">
              <Image src="/bussiness.png" alt="Chatbot Highlight" fill className="object-cover" priority />
            </div>
          </div>
        </div>
      </section>

      {/* Navigation & Info */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 relative z-10 text-sm text-gray-700">
        {/* Logo + Description */}
        <div>
          <h3 className="text-2xl font-bold mb-4 text-gray-900">Talksy AI</h3>
          <p className="max-w-xs">
            Talksy AI helps small businesses launch AI chatbots without writing code. Fast, smart, and reliable.
          </p>
        </div>

        {/* Product */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-gray-900">Product</h4>
          <ul className="space-y-3">
            <li>
              <button onClick={scrollToFAQ} className="hover:text-blue-800 border-b border-gray-600 transition">
                FAQ
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  if (window.location.pathname === '/ChatbotFeatures') {
                    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    router.push('/ChatbotFeatures#features');
                  }
                }}
                className="hover:text-blue-800 border-b border-gray-600 transition"
              >
                Features
              </button>
            </li>
            <li>
              <a href="/pricing" className="hover:text-blue-800 border-b border-gray-600 transition">Pricing</a>
            </li>
            <li>
              <a href="/dashboard" className="hover:text-blue-800 border-b border-gray-600 transition">Dashboard</a>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-gray-900">Company</h4>
          <ul className="space-y-3">
            <li><a href="/about" className="hover:text-blue-800 border-b border-gray-600 transition">About Us</a></li>
            <li><a href="/blog" className="hover:text-blue-800 border-b border-gray-600 transition">Blog</a></li>
            <li><a href="/contact" className="hover:text-blue-800 border-b border-gray-600 transition">Contact</a></li>
            <li><a href="/terms" className="hover:text-blue-800 border-b border-gray-600 transition">Terms & Privacy</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-gray-900">Connect with Us</h4>
          <p className="mb-4">Join us on social media:</p>
          <div className="flex gap-6 text-xl text-gray-500">
            <a href="https://facebook.com" aria-label="Facebook" target="_blank" className="hover:text-blue-600">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" aria-label="Twitter" target="_blank" className="hover:text-blue-600">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" className="hover:text-blue-600">
              <FaLinkedinIn />
            </a>
            <a href="https://github.com" aria-label="GitHub" target="_blank" className="hover:text-blue-600">
              <FaGithub />
            </a>
          </div>
        </div>
      </section>

      {/* Footer bottom */}
      <div className="mt-14 pt-6 text-center text-sm text-gray-500 border-t border-gray-300 relative z-10">
        © {new Date().getFullYear()} Talksy AI — Empowering small businesses with smart chatbots.
      </div>
    </footer>
  );
};

export default Footer;
