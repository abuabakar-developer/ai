'use client';

import {
  CalendarIcon,
  PencilIcon,
  MessageCircleIcon,
  ThumbsDownIcon,
  Clock3Icon,
  XIcon,
  TrashIcon,
} from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface Chatbot {
  _id: string;
  name: string;
  url: string;
  language: string;
  createdAt: string;
}

export default function ChatbotList({ chatbots }: { chatbots: Chatbot[] }) {
  const MAX_CHATBOTS = 4;
  const [editingBot, setEditingBot] = useState<Chatbot | null>(null);
  const [editedBot, setEditedBot] = useState<Chatbot | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  const handleDeleteChatbot = async (botId: string) => {
    if (!confirm('Are you sure you want to delete this chatbot?')) return;
    setDeletingId(botId);
    try {
      const res = await fetch(`/api/chatbots/${botId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete chatbot');
      router.refresh();
    } catch (error) {
      console.error(error);
      alert('Failed to delete chatbot');
    } finally {
      setDeletingId(null);
    }
  };

  const handleEditClick = (bot: Chatbot) => {
    setEditingBot(bot);
    setEditedBot({ ...bot });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editedBot) return;
    setEditedBot({ ...editedBot, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = async () => {
    try {
      const res = await fetch(`/api/chatbots/${editedBot?._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedBot),
      });
      if (!res.ok) throw new Error('Failed to update chatbot');
      setEditingBot(null);
      setEditedBot(null);
      router.refresh();
    } catch (err) {
      console.error(err);
      alert('Failed to save changes');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-10">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<MessageCircleIcon className="w-6 h-6 text-blue-600" />} value="0" label="Replies Today" />
        <StatCard icon={<Clock3Icon className="w-6 h-6 text-green-600" />} value="3" label="Replies This Month" />
        <StatCard icon={<Clock3Icon className="w-6 h-6 text-purple-600" />} value="6" label="Replies in 90 Days" />
        <StatCard icon={<ThumbsDownIcon className="w-6 h-6 text-red-600" />} value="0" label="Down-Ratings" />
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">🤖 My Chatbots</h1>
      </div>

      {/* No Chatbots */}
      {chatbots.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-20 rounded-3xl border-2 border-dashed border-gray-300 bg-gray-50"
        >
          <p className="text-xl font-medium text-gray-700">🚫 You haven’t created any chatbots yet.</p>
          <p className="text-gray-500 mt-2">Create a new chatbot to get started.</p>
        </motion.div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
          {chatbots.slice(0, MAX_CHATBOTS).map((bot) => (
            <motion.div
              layout
              key={bot._id}
              whileHover={{ scale: 1.02 }}
              className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 transition-all"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold text-gray-900">{bot.name}</h2>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <CalendarIcon className="w-4 h-4" />
                    {new Date(bot.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{bot.language}</p>
                <a
                  href={bot.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm underline break-all hover:text-blue-800 transition"
                >
                  {bot.url}
                </a>
              </div>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => handleDeleteChatbot(bot._id)}
                  className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
                  disabled={deletingId === bot._id}
                >
                  <TrashIcon className="inline-block w-4 h-4 mr-1" />
                  {deletingId === bot._id ? 'Deleting...' : 'Delete'}
                </button>
                <button
                  onClick={() => handleEditClick(bot)}
                  className="bg-gray-100 hover:bg-gray-200 text-sm text-gray-800 font-medium px-4 py-2 rounded-lg transition"
                >
                  <PencilIcon className="inline-block w-4 h-4 mr-1" />
                  Edit
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      <AnimatePresence>
        {editingBot && editedBot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white w-full max-w-lg rounded-2xl p-6 relative shadow-xl"
            >
              <button
                onClick={() => setEditingBot(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <XIcon className="w-5 h-5" />
              </button>
              <h2 className="text-2xl font-bold mb-4">Edit Chatbot</h2>
              <div className="space-y-4">
                {['name', 'url', 'language'].map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
                    <input
                      name={field}
                      value={(editedBot as any)[field]}
                      onChange={handleEditChange}
                      className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={() => setEditingBot(null)}
                  className="px-4 py-2 rounded-lg text-sm text-gray-600 bg-gray-100 hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-2 rounded-lg text-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-all">
      <div className="p-2 bg-blue-100 rounded-full">{icon}</div>
      <div>
        <p className="text-xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
}
