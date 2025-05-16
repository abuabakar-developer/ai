'use client';

import { useEffect, useState, useRef } from 'react';
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
    const timer = setTimeout(() => setInitialLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener('resize', handleResize);

    const token = localStorage.getItem('token');
    if (!token) return router.push('/login');

    try {
      const decoded = jwt.decode(token) as any;
      if (!decoded?.email) throw new Error();
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
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (res.ok) setChatbots(await res.json());
      } catch (err) {
        console.error('Error fetching chatbots:', err);
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
    setChatbots([...chatbots, newChatbot]);
    setIsModalOpen(false);
  };

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleFeatureClick = (id: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedFeature(id);
      setIsLoading(false);
    }, 1000);
    if (!isDesktop) setIsSidebarOpen(false);
  };

  const renderWelcome = () => (
    <div className="flex flex-col items-center justify-center h-full bg-white rounded-xl p-10 shadow-md animate-fade-in text-center">
      <div className="text-6xl mb-4">🤖</div>
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-600">
        Welcome to Talksy AI
      </h1>
      <p className="mt-4 text-gray-600 max-w-xl">
        Build intelligent, no-code AI chatbots in seconds. Click below to get started.
      </p>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-6 px-6 py-3 rounded-full text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition shadow-xl"
      >
        🚀 Let's Build Your Bot
      </button>
    </div>
  );

  const renderFeature = () => {
    if (isLoading) return <ModernSpinner />;
    switch (selectedFeature) {
      case 'add-website': return chatbots.length > 0 ? <ChatbotList chatbots={chatbots} /> : renderWelcome();
      case 'knowledge-base': return <KnowledgeBase email={email} />;
      case 'upload-files': return <UploadFiles />;
      case 'customize-chatbot': return <CustomizeChatbot  />;
      case 'analytics': return <Analytics  />;
      case 'embed-code': return <EmbedCode  />;
      default: return renderWelcome();
    }
  };

  const features = [
    { title: 'Add Website', id: 'add-website', icon: <FiPlus /> },
    { title: 'Knowledge Base', id: 'knowledge-base', icon: <FiBookOpen /> },
    { title: 'Upload Files', id: 'upload-files', icon: <FiUpload /> },
    { title: 'Customize Chatbot', id: 'customize-chatbot', icon: <FiSettings /> },
    { title: 'Analytics', id: 'analytics', icon: <FiBarChart2 /> },
    { title: 'Embed Code', id: 'embed-code', icon: <FiCode /> }
  ];

  const sidebarContent = (
    <div className={`flex flex-col h-full bg-gradient-to-b from-blue-950 to-blue-900 text-white transition-all duration-300 ${isSidebarCollapsed ? 'w-20' : 'w-64'} shadow-2xl`}>
      <div className="flex items-center justify-between p-4 border-b border-blue-800 sticky top-0 bg-blue-950 z-10">
        {!isSidebarCollapsed ? (
          <h2 className="text-2xl font-bold tracking-tight">💬Talksy</h2>
        ) : (
          <span className="text-xl font-bold">T</span>
        )}
        <button onClick={toggleSidebarCollapse} className="hover:text-blue-300">
          {isSidebarCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
        </button>
      </div>
      <ul className="mt-4 space-y-1">
        {features.map(({ title, id, icon }) => (
          <li
            key={id}
            onClick={() => handleFeatureClick(id)}
            className={`flex items-center gap-3 px-4 py-2 text-sm font-medium cursor-pointer rounded-lg transition hover:bg-blue-800 hover:text-white ${
              selectedFeature === id ? 'bg-blue-700 text-white' : 'text-blue-200'
            }`}
          >
            <span>{icon}</span>
            {!isSidebarCollapsed && <span>{title}</span>}
          </li>
        ))}
      </ul>
      <div className="mt-10 p-4 border-t border-blue-800" ref={dropdownRef}>
{!isSidebarCollapsed ? (
  <div className="relative">
    <button
      onClick={() => setShowDropdown(!showDropdown)}
      className="text-sm w-full text-left truncate hover:text-blue-200"
    >       
      {email}
    </button>
    {showDropdown && (
      <div className="absolute bottom-full right-0 mb-2 bg-white text-black border shadow-lg rounded-md z-50 w-48">
        <div className="px-4 py-2 text-sm text-gray-500 border-b">Signed in as</div>
        <div className="px-4 py-2 text-sm truncate font-medium text-blue-600 border-b">
          {email}
        </div>
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
  <button
    onClick={handleLogout}
    className="w-full flex justify-center hover:text-red-400"
    title="Logout"
  >
    <FiLogOut size={20} />
  </button>
)}


      </div>
    </div>
  );

  if (initialLoading) return <ModernSpinner />;

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden relative">
      {!isDesktop && (
        <button
          className="absolute top-4 left-4 z-50 bg-white p-2 shadow rounded-full md:hidden"
          onClick={() => setIsSidebarOpen(true)}
        >
          <FiMenu />
        </button>
      )}

      {(isDesktop || isSidebarOpen) && (
        <>
          {!isDesktop && (
            <div
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}
          <aside className={`fixed md:static z-50 h-full ${isSidebarCollapsed ? 'w-20' : 'w-64'}`}>
            {sidebarContent}
          </aside>
        </>
      )}

      <main className="flex-1 overflow-y-auto p-6 md:p-10 bg-gray-50 transition-all duration-300">
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
