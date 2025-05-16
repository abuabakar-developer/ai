'use client';

import { useState } from 'react';
import { FiCopy, FiCheckCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function EmbedCode() {
  const [copied, setCopied] = useState(false);

  const embedCode = `<script>
  (function() {
    const chatbot = document.createElement('script');
    chatbot.src = "https://your-domain.com/chatbot-widget.js";
    chatbot.async = true;
    chatbot.dataset.botId = "YOUR_BOT_ID";
    chatbot.dataset.welcomeMessage = "Hi! How can I help you?";
    chatbot.dataset.primaryColor = "#2563eb";
    document.body.appendChild(chatbot);
  })();
</script>`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      toast.success('Embed code copied!');
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      toast.error('Failed to copy!');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-4xl mx-auto border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-blue-800">Embed Code</h2>
      <p className="text-gray-600 mb-6">
        Copy and paste this code into your website’s HTML to embed your chatbot.
      </p>

      <div className="relative bg-gray-100 rounded-lg overflow-auto p-4 text-sm font-mono text-gray-700">
        <pre>{embedCode}</pre>

        <button
          onClick={handleCopy}
          className="absolute top-4 right-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm rounded-md flex items-center gap-2"
        >
          {copied ? (
            <>
              <FiCheckCircle size={16} /> Copied
            </>
          ) : (
            <>
              <FiCopy size={16} /> Copy
            </>
          )}
        </button>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">How it works</h3>
        <ul className="list-disc list-inside text-gray-600">
          <li>Loads your chatbot script asynchronously</li>
          <li>Connects to your bot using a unique ID</li>
          <li>Customizable appearance and welcome message</li>
          <li>Fully responsive and easy to install</li>
        </ul>
      </div>
    </div>
  );
}
