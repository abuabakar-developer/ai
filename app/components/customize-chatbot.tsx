'use client';

import { useState } from 'react';

export default function CustomizeChatbot() {
  const [botName, setBotName] = useState('Talksy');
  const [welcomeMessage, setWelcomeMessage] = useState('Hi there! How can I help you today?');
  const [position, setPosition] = useState<'bottom-right' | 'bottom-left'>('bottom-right');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [bubbleColor, setBubbleColor] = useState('#2563eb');

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8 mt-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-3xl shadow-2xl transition-all relative">
      
      {/* Save Button Top */}
      <div className="absolute top-4 right-6">
        <button
          onClick={() => alert('Customization saved!')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-xl shadow-md transition duration-300"
        >
          💾 Save
        </button>
      </div>

      {/* Heading */}
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-8 tracking-tight">
        🛠️ Customize Your Chatbot
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Bot Name */}
        <div>
          <label className="text-gray-700 dark:text-gray-300 font-medium mb-2 block">🤖 Bot Name</label>
          <input
            type="text"
            value={botName}
            onChange={(e) => setBotName(e.target.value)}
            placeholder="Enter bot name"
            className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>

        {/* Welcome Message */}
        <div>
          <label className="text-gray-700 dark:text-gray-300 font-medium mb-2 block">💬 Welcome Message</label>
          <textarea
            value={welcomeMessage}
            onChange={(e) => setWelcomeMessage(e.target.value)}
            className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl p-3 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>

        {/* Chat Bubble Color */}
        <div>
          <label className="text-gray-700 dark:text-gray-300 font-medium mb-2 block">🎨 Chat Bubble Color</label>
          <input
            type="color"
            value={bubbleColor}
            onChange={(e) => setBubbleColor(e.target.value)}
            className="w-16 h-10 border-2 border-gray-300 rounded-lg cursor-pointer shadow-sm"
          />
        </div>

        {/* Theme */}
        <div>
          <label className="text-gray-700 dark:text-gray-300 font-medium mb-2 block">🌗 Chat Theme</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
            className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        {/* Position */}
        <div className="sm:col-span-2">
          <label className="text-gray-700 dark:text-gray-300 font-medium mb-2 block">📍 Position on Website</label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer text-gray-800 dark:text-gray-200">
              <input
                type="radio"
                value="bottom-right"
                checked={position === 'bottom-right'}
                onChange={() => setPosition('bottom-right')}
              />
              Bottom Right
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-gray-800 dark:text-gray-200">
              <input
                type="radio"
                value="bottom-left"
                checked={position === 'bottom-left'}
                onChange={() => setPosition('bottom-left')}
              />
              Bottom Left
            </label>
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">🔍 Live Preview</h3>
        <div
          className={`relative w-full h-80 sm:h-96 border rounded-2xl overflow-hidden shadow-inner transition-all ${
            theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'
          }`}
        >
          <div
            className={`absolute transition-all duration-300 ${
              position === 'bottom-right' ? 'bottom-4 right-4' : 'bottom-4 left-4'
            } w-16 sm:w-20 h-16 sm:h-20 rounded-full hover:scale-105`}
            style={{ backgroundColor: bubbleColor }}
          >
            <div className="flex items-center justify-center h-full text-white text-xl sm:text-2xl">💬</div>
          </div>
          <div className="absolute top-4 left-4 text-sm sm:text-base font-medium max-w-[80%]">
            <span className="font-bold">{botName}</span>: {welcomeMessage}
          </div>
        </div>
      </div>
    </div>
  );
}
