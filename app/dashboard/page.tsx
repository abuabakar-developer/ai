'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import jwt from 'jsonwebtoken';
import {
  FiBookOpen, FiUpload, FiSettings, FiBarChart2, FiCode,
  FiMenu, FiLogOut, FiChevronLeft, FiChevronRight, FiPlus
} from 'react-icons/fi';

import KnowledgeBase from '../components/knowledge-base';
import UploadFiles from '../components/upload-files';
import CustomizeChatbot from '../components/customize-chatbot';
import Analytics from '../components/analytics';
import EmbedCode from '../components/embed-code';
import ChatbotModal from '../components/ChatbotModal';
import ChatbotList from '../components/ChatbotList';
import ModernSpinner from '../components/ModernSpinner';

interface Chatbot {
  _id: string;
  name: string;
  url: string;
  language: string;
  createdAt: string;
}

export default function Dashboard() {
  const [email, setEmail] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<string>('add-website');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [chatbots, setChatbots] = useState<Chatbot[]>([]);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setInitialLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener('resize', handleResize);

    const token = localStorage.getItem('token');
    if (!token) return router.push('/login');

    try {
      const decoded = jwt.decode(token) as { email?: string };
      if (!decoded?.email) throw new Error('Invalid token');
      setEmail(decoded.email);
    } catch {
      router.push('/login');
    }

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchChatbots = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/chatbots', {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setChatbots(data);
        }
      } catch (err) {
        console.error('Failed to fetch chatbots:', err);
      }
    };
    fetchChatbots();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !(dropdownRef.current as any).contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const handleChatbotSuccess = (newChatbot: Chatbot) => {
    setChatbots(prev => [...prev, newChatbot]);
    setIsModalOpen(false);
  };

  const toggleSidebarCollapse = () => setIsSidebarCollapsed(prev => !prev);

  const handleFeatureClick = (id: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedFeature(id);
      setIsLoading(false);
    }, 600);
    if (!isDesktop) setIsSidebarOpen(false);
  };

  const renderWelcome = () => (
    <div className="flex flex-col items-center justify-center h-full bg-white rounded-xl p-10 shadow-md animate-fade-in text-center">
      <div className="text-6xl mb-4">🤖</div>
      <h1 className="text-4xl font-bold text-blue-700">Welcome to Talksy AI</h1>
      <p className="mt-4 text-gray-600 max-w-xl">
        Build intelligent, no-code AI chatbots in seconds. Click below to get started.
      </p>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-6 px-6 py-3 rounded-full text-white bg-blue-600 hover:bg-blue-700 transition shadow-lg"
      >
        🚀 Let's Build Your Bot
      </button>
    </div>
  );

  const renderFeature = () => {
    if (isLoading) return <ModernSpinner />;
    switch (selectedFeature) {
      case 'add-website':
        return chatbots.length > 0 ? <ChatbotList chatbots={chatbots} /> : renderWelcome();
      case 'knowledge-base':
        return <KnowledgeBase email={email} />;
      case 'upload-files':
        return <UploadFiles />;
      case 'customize-chatbot':
        return <CustomizeChatbot />;
      case 'analytics':
        return <Analytics />;
      case 'embed-code':
        return <EmbedCode />;
      default:
        return renderWelcome();
    }
  };

  const features = [
    { title: 'Home', id: 'add-website', icon: <FiPlus /> },
    { title: 'Knowledge Base', id: 'knowledge-base', icon: <FiBookOpen /> },
    { title: 'Upload Files', id: 'upload-files', icon: <FiUpload /> },
    { title: 'Customize Chatbot', id: 'customize-chatbot', icon: <FiSettings /> },
    { title: 'Analytics', id: 'analytics', icon: <FiBarChart2 /> },
    { title: 'Embed Code', id: 'embed-code', icon: <FiCode /> },
  ];

  const sidebarContent = (
    <div className={`flex flex-col h-full bg-gradient-to-b from-blue-800 to-blue-900 text-white transition-all duration-300 ${isSidebarCollapsed ? 'w-20' : 'w-64'} shadow-2xl`}>
      <div className="flex items-center justify-between p-4 border-b border-blue-700 bg-blue-900 sticky top-0 z-10">
        <h2 className="text-lg font-bold">{isSidebarCollapsed ? 'T' : '💬 Talksy'}</h2>
        <button onClick={toggleSidebarCollapse} className="hover:text-blue-300">
          {isSidebarCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
        </button>
      </div>

      <ul className="mt-6 space-y-1">
        {features.map(({ title, id, icon }) => (
          <li
            key={id}
            onClick={() => handleFeatureClick(id)}
            className={`flex items-center gap-3 px-4 py-2 text-sm font-medium cursor-pointer rounded-lg transition hover:bg-blue-700 ${
              selectedFeature === id ? 'bg-blue-700 text-white' : 'text-blue-200'
            }`}
          >
            <span>{icon}</span>
            {!isSidebarCollapsed && <span>{title}</span>}
          </li>
        ))}
      </ul>

      <div className="mt-auto p-4 border-t border-blue-700" ref={dropdownRef}>
        {!isSidebarCollapsed ? (
          <div className="relative">
            <button onClick={() => setShowDropdown(!showDropdown)} className="text-sm w-full text-left truncate hover:text-blue-300">
              {email}
            </button>
            {showDropdown && (
              <div className="absolute bottom-full right-0 mb-2 bg-white text-black border shadow-md rounded-lg z-50 w-52">
                <div className="px-4 py-2 text-sm text-gray-500 border-b">Signed in as</div>
                <div className="px-4 py-2 text-sm truncate font-medium text-blue-600 border-b">{email}</div>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 flex items-center gap-2 text-red-600 hover:bg-gray-100"
                >
                  <FiLogOut /> Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button onClick={handleLogout} className="w-full flex justify-center hover:text-red-400" title="Logout">
            <FiLogOut size={20} />
          </button>
        )}
      </div>
    </div>
  );

  if (initialLoading) return <ModernSpinner />;

  return (
    <div className="flex h-screen overflow-hidden bg-white text-gray-800">
      {!isDesktop && (
        <button
          className="absolute top-4 left-4 z-50 bg-white border border-gray-300 p-2 rounded-full shadow-md md:hidden"
          onClick={() => setIsSidebarOpen(true)}
        >
          <FiMenu />
        </button>
      )}

      {(isDesktop || isSidebarOpen) && (
        <>
          {!isDesktop && (
            <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setIsSidebarOpen(false)} />
          )}
          <aside className={`fixed md:static z-50 h-full ${isSidebarCollapsed ? 'w-20' : 'w-64'}`}>
            {sidebarContent}
          </aside>
        </>
      )}

      <main className="flex-1 h-full overflow-y-auto px-6 py-6 bg-white">
        {renderFeature()}
        <ChatbotModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleChatbotSuccess}
          email={email}
        />
      </main>
    </div>
  );
}
