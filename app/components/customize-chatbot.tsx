'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CustomizeChatbot() {
  const [botName, setBotName] = useState('Talksy');
  const [welcomeMessage, setWelcomeMessage] = useState('Hi there! How can I help you today?');
  const [position, setPosition] = useState<'bottom-right' | 'bottom-left'>('bottom-right');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [bubbleColor, setBubbleColor] = useState('#2563eb');

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
    const customizationData = { botName, welcomeMessage, position, theme, bubbleColor };

    try {
      const response = await fetch('/api/chatbot/customize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customizationData),
      });

      if (response.ok) {
        alert('✅ Customization saved successfully!');
      } else {
        alert('❌ Failed to save customization.');
      }
    } catch (error) {
      alert('❌ Error saving customization.');
      console.error(error);
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-12 md:py-16 font-sans bg-gradient-to-br from-white to-gray-100 dark:from-[#0f172a] dark:to-[#1e293b] rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 transition-all">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <h1 className="text-3xl text-blue-800 font-bold dark:text-white tracking-tight">
          🤖 Customize Your Chatbot
        </h1>
        <button
          onClick={handleSave}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-xl transition duration-300"
        >
          💾 Save Settings
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Bot Name</label>
          <input
            type="text"
            value={botName}
            onChange={(e) => setBotName(e.target.value)}
            className="w-full px-5 py-3 rounded-xl border dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-4 focus:ring-blue-500"
            placeholder="Enter bot name"
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Welcome Message</label>
          <textarea
            value={welcomeMessage}
            onChange={(e) => setWelcomeMessage(e.target.value)}
            className="w-full h-28 px-5 py-3 rounded-xl border dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-4 focus:ring-blue-500"
            placeholder="Type welcome message"
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Theme</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
            className="w-full px-5 py-3 rounded-xl border dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-4 focus:ring-blue-500"
          >
            <option value="light">🌞 Light</option>
            <option value="dark">🌙 Dark</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Bubble Color</label>
          <input
            type="color"
            value={bubbleColor}
            onChange={(e) => setBubbleColor(e.target.value)}
            className="w-16 h-12 p-1 rounded-xl border-2 border-gray-300 dark:border-gray-600 cursor-pointer shadow-md"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Chatbot Position</label>
          <div className="flex gap-6">
            {['bottom-right', 'bottom-left'].map((opt) => (
              <label
                key={opt}
                className={`flex items-center gap-3 text-gray-800 dark:text-gray-100 font-medium cursor-pointer`}
              >
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

      {/* Live Preview */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">🔍 Live Preview</h2>
        <div
          className={`relative w-full h-[24rem] rounded-3xl border-2 border-dashed transition-all duration-500 overflow-hidden ${
            theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
          }`}
        >
          <motion.div
            animate={{
              x: position === 'bottom-right' ? 140 : -140,
              y: 110,
              backgroundColor: bubbleColor,
            }}
            transition={{ type: 'spring', stiffness: 120 }}
            className="absolute rounded-full w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center text-white text-3xl shadow-xl cursor-pointer"
            style={{
              right: position === 'bottom-right' ? '1.5rem' : 'auto',
              left: position === 'bottom-left' ? '1.5rem' : 'auto',
              bottom: '1.5rem',
            }}
          >
            💬
          </motion.div>

          <div className="absolute top-6 left-6 text-base sm:text-lg font-semibold max-w-[85%]">
            <span className="font-bold">{botName}</span>: {welcomeMessage}
          </div>
        </div>
      </div>
    </section>
  );
}
