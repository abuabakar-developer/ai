 'use client';

import { useEffect, useState } from 'react';

interface Chatbot {
  _id: string;
  url: string;
  name: string;
  language: string;
  createdAt: string;
}

export default function ChatbotsPage() {
  const [chatbots, setChatbots] = useState<Chatbot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChatbots = async () => {
      try {
        const res = await fetch('/api/chatbots');
        const data = await res.json();
        setChatbots(data);
      } catch (error) {
        console.error('Failed to fetch chatbots', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChatbots();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Your Chatbots</h1>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : chatbots.length === 0 ? (
        <p className="text-gray-600">No chatbots found.</p>
      ) : (
        <div className="overflow-x-auto rounded-md border border-gray-200 shadow">
          <table className="w-full table-auto text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Website URL</th>
                <th className="px-4 py-2 text-left">Language</th>
                <th className="px-4 py-2 text-left">Created At</th>
              </tr>
            </thead>
            <tbody>
              {chatbots.map((bot) => (
                <tr key={bot._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">{bot.name}</td>
                  <td className="px-4 py-2 text-blue-600 break-words">{bot.url}</td>
                  <td className="px-4 py-2">{bot.language}</td>
                  <td className="px-4 py-2 text-gray-500">
                    {new Date(bot.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}