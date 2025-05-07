'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function WelcomePage() {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 4000); // Auto-hide after 4s
    return () => clearTimeout(timer);
  }, []);

  if (!showWelcome) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center justify-center p-6 text-center"
    >
      <motion.h1
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent"
      >
        Welcome to Talksy AI
      </motion.h1>

      {/* Rotating Colorful Lines */}
      <div className="relative h-4 w-full max-w-sm mb-10">
        <motion.div
          className="absolute inset-0 w-full h-1 rounded-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 animate-pulse"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
        />
      </div>

      {/* Add Website Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-xl shadow-lg hover:shadow-2xl font-semibold text-lg"
        onClick={() => alert('Redirecting to Add Website...')}
      >
        Add Website
      </motion.button>
    </motion.div>
  );
}
