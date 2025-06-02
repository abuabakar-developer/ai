'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CustomizeChatbot() {
  const [botName, setBotName] = useState('Talksy');
  const [welcomeMessage, setWelcomeMessage] = useState('Hi there! How can I help you today?');
  const [position, setPosition] = useState<'bottom-right' | 'bottom-left'>('bottom-right');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [bubbleColor, setBubbleColor] = useState('#2563eb');

  // Load customization settings from API on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/chatbot/customize');
        const data = await res.json();
        if (data) {
          setBotName(data.botName);
          setWelcomeMessage(data.welcomeMessage);
          setPosition(data.position);
          setTheme(data.theme);
          setBubbleColor(data.bubbleColor);
        }
      } catch (error) {
        console.error('Failed to load customization', error);
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    const customizationData = {
      botName,
      welcomeMessage,
      position,
      theme,
      bubbleColor,
    };

    try {
      const response = await fetch('/api/chatbot/customize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customizationData),
      });

      if (response.ok) {
        alert('Customization saved!');
      } else {
        alert('Failed to save customization.');
      }
    } catch (error) {
      alert('Error saving customization.');
      console.error(error);
    }
  };

  return (
    <section className="max-w-5xl mx-auto font-sans px-4 py-10 md:py-14 bg-white dark:bg-[#0f172a] rounded-3xl shadow-2xl backdrop-blur-sm">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white">
          🧠 Customize Your Chatbot
        </h1>
        <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium shadow-lg transition"
        >
          💾 Save
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">🤖 Bot Name</label>
          <input
            type="text"
            value={botName}
            onChange={(e) => setBotName(e.target.value)}
            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">💬 Welcome Message</label>
          <textarea
            value={welcomeMessage}
            onChange={(e) => setWelcomeMessage(e.target.value)}
            className="w-full px-4 py-3 h-28 resize-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">🎨 Theme</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">🧁 Bubble Color</label>
          <input
            type="color"
            value={bubbleColor}
            onChange={(e) => setBubbleColor(e.target.value)}
            className="w-16 h-10 border-2 border-gray-300 rounded-lg cursor-pointer shadow-sm"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">📍 Position on Website</label>
          <div className="flex gap-6">
            {['bottom-right', 'bottom-left'].map((opt) => (
              <label key={opt} className="flex items-center gap-2 text-gray-800 dark:text-gray-200 cursor-pointer">
                <input
                  type="radio"
                  value={opt}
                  checked={position === opt}
                  onChange={() => setPosition(opt as 'bottom-right' | 'bottom-left')}
                />
                {opt.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">🔍 Live Preview</h3>
        <div
          className={`relative w-full h-96 border rounded-3xl overflow-hidden transition-all duration-500 shadow-inner ${
            theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'
          }`}
        >
          <motion.div
            animate={{
              x: position === 'bottom-right' ? 150 : -150,
              y: 120,
              backgroundColor: bubbleColor,
            }}
            transition={{ type: 'spring', stiffness: 120 }}
            className="absolute bottom-4 sm:bottom-6 rounded-full w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center text-white text-2xl shadow-lg cursor-pointer"
            style={{
              right: position === 'bottom-right' ? '1rem' : 'auto',
              left: position === 'bottom-left' ? '1rem' : 'auto',
            }}
          >
            💬
          </motion.div>

          <div className="absolute top-6 left-6 text-sm sm:text-base font-medium max-w-[80%]">
            <span className="font-bold">{botName}</span>: {welcomeMessage}
          </div>
        </div>
      </div>
    </section>
  );
}
