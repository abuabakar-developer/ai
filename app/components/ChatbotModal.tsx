'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { toast } from 'react-toastify';

export default function ChatbotModal({ isOpen, onClose, onSuccess }: any) {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [language, setLanguage] = useState('English');

  const handleSave = async () => {
    const token = localStorage.getItem('token'); // Ensure token is set on login
    if (!token) {
      toast.error('You must be logged in to create a chatbot.');
      return;
    }

    try {
      const res = await fetch('/api/chatbots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name, url, language }),
      });

      if (res.ok) {
        const newChatbot = await res.json();
        onSuccess(newChatbot);
        setName('');
        setUrl('');
        setLanguage('English');
        onClose();
        toast.success('Chatbot created successfully!');
      } else {
        const error = await res.json();
        toast.error(error.message || 'Failed to create chatbot');
        console.error('Failed to create chatbot:', error);
      }
    } catch (error) {
      console.error('Error creating chatbot:', error);
      toast.error('An error occurred while creating chatbot');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl p-6 animate-fadeIn transition-all">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold text-blue-800 mb-6">Create Your Chatbot</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Chatbot Name
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              placeholder="e.g. Talksy Support Bot"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Website URL
            </label>
            <input
              type="url"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              placeholder="https://yourwebsite.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Language
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              placeholder="e.g. English"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          className="mt-6 w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 rounded-md transition-all"
        >
          Save Chatbot
        </button>
      </div>
    </div>
  );
}
