

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
import { routeModule } from 'next/dist/build/templates/pages';

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
      const res = await fetch(`/api/chatbots/${botId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete chatbot');
      }

      // Refresh the page or revalidate data
      router.refresh();
    } catch (error) {
      console.error('Error deleting chatbot:', error);
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
        headers: {
          'Content-Type': 'application/json',
        },
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
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard icon={<MessageCircleIcon className="w-6 h-6 text-blue-600 bg-blue-100" />} value="0" label="Replies-Today" />
        <StatCard icon={<Clock3Icon className="w-6 h-6 text-green-600" />} value="3" label="Replies-This Month" />
        <StatCard icon={<Clock3Icon className="w-6 h-6 text-purple-600" />} value="6" label="Replies-Last 90 Days" />
        <StatCard icon={<ThumbsDownIcon className="w-6 h-6 text-red-600" />} value="0" label="Down-Ratings" />
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
        <h1 className="text-4xl font-bold text-blue-800">🤖 My Chatbots</h1>
      </div>

      {/* No Chatbots */}
      {chatbots.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-32 bg-gray-50 rounded-xl shadow-inner border border-dashed border-gray-300">
          <p className="text-2xl text-blue-800 mb-4">🚫 No chatbots created yet.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
          {chatbots.slice(0, MAX_CHATBOTS).map((bot) => (
            <div
              key={bot._id}
              className="group bg-white border border-gray-200 rounded-2xl shadow-sm p-6 transition hover:shadow-lg hover:border-blue-500"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold text-gray-900 group-hover:text-blue-600 transition">
                    {bot.name}
                  </h2>
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <CalendarIcon className="w-4 h-4" />
                    {new Date(bot.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-sm text-gray-500">{bot.language}</p>

                <a
                  href={bot.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm underline break-all hover:text-blue-800 transition"
                >
                  {bot.url}
                </a>
              </div>

              <div className="mt-6 flex gap-4">
                <button
                  onClick={() => handleDeleteChatbot(bot._id)}
                  className="inline-flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-800 transition disabled:opacity-50"
                  disabled={deletingId === bot._id}
                >
                  <TrashIcon className="w-4 h-4" />
                  {deletingId === bot._id ? 'Deleting...' : 'Delete Chatbot'}
                </button>
                <button
                  onClick={() => handleEditClick(bot)}
                  className="inline-flex items-center gap-2 bg-gray-100 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
                >
                  <PencilIcon className="w-4 h-4" />
                  Edit Chatbot
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingBot && editedBot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative">
            <button
              onClick={() => setEditingBot(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <XIcon className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Edit Chatbot</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  name="name"
                  value={editedBot.name}
                  onChange={handleEditChange}
                  className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">URL</label>
                <input
                  name="url"
                  value={editedBot.url}
                  onChange={handleEditChange}
                  className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Language</label>
                <input
                  name="language"
                  value={editedBot.language}
                  onChange={handleEditChange}
                  className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={() => setEditingBot(null)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// StatCard Component
function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 flex items-center gap-4 transition hover:shadow-md">
      <div className="p-2 bg-gray-100 rounded-full">{icon}</div>
      <div>
        <p className="text-xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
}

