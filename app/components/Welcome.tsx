'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function WelcomePage() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 4000); // Auto-hide after 4s
    return () => clearTimeout(timer);
  }, []);

  const modalVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <>
      {showWelcome && (
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

          <div className="relative h-4 w-full max-w-sm mb-10">
            <motion.div
              className="absolute inset-0 w-full h-1 rounded-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 animate-pulse"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-xl shadow-lg hover:shadow-2xl font-semibold text-lg"
            onClick={() => setIsModalOpen(true)}
          >
            Add Website
          </motion.button>
        </motion.div>
      )}

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            key="modal"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            className="fixed inset-0 z-[999] bg-black bg-opacity-60 flex justify-center items-center px-4"
          >
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-8 relative">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl font-bold"
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </button>

              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Create New Chatbot
              </h2>

              {/* Website URL */}
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Website URL <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2 mb-4">
                <select className="w-1/3 border border-gray-300 rounded-lg p-2">
                  <option>https://</option>
                  <option>http://</option>
                </select>
                <input
                  type="text"
                  placeholder="www.example.com"
                  className="flex-1 border border-gray-300 rounded-lg p-2"
                />
              </div>

              {/* Chatbot Name */}
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Chatbot Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter chatbot name"
                className="w-full border border-gray-300 rounded-lg p-2 mb-4"
              />

              {/* Website Language */}
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Website Language
              </label>
              <input
                type="text"
                value="English"
                disabled
                className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100 text-gray-500 mb-6"
              />

              {/* Continue Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow"
              >
                Continue
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
