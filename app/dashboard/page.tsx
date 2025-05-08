'use client';

import { useEffect, useState, useRef } from 'react';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/navigation';
import {
  FiBookOpen, FiUpload, FiSettings,
  FiBarChart2, FiCode, FiMenu, FiLogOut,
  FiChevronLeft, FiPlus
} from 'react-icons/fi';

import KnowledgeBase from '../components/knowledge-base';
import UploadFiles from '../components/upload-files';
import CustomizeChatbot from '../components/customize-chatbot';
import Analytics from '../components/analytics';
import EmbedCode from '../components/embed-code';

export default function Dashboard() {
  const [email, setEmail] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedFeature, setSelectedFeature] = useState<string | null>('add-website');
  const [isLoading, setIsLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Collapse sidebar on small screens
    const isMobile = window.innerWidth < 768;
    if (isMobile) setIsSidebarOpen(false);

    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const decoded = jwt.decode(token) as any;
      if (!decoded?.email) throw new Error();

      setTimeout(() => {
        setEmail(decoded.email);
        setIsLoading(false);
      }, 1000);
    } catch {
      router.push('/login');
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
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

  const dashboardFeatures = [
    { title: '➕ Add Website', id: 'add-website', icon: <FiPlus size={22} /> },
    { title: 'Knowledge Base', id: 'knowledge-base', icon: <FiBookOpen size={22} /> },
    { title: 'Upload Files', id: 'upload-files', icon: <FiUpload size={22} /> },
    { title: 'Customize Chatbot', id: 'customize-chatbot', icon: <FiSettings size={22} /> },
    { title: 'Analytics', id: 'analytics', icon: <FiBarChart2 size={22} /> },
    { title: 'Embed Code', id: 'embed-code', icon: <FiCode size={22} /> },
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const renderWelcomeMessage = () => (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-tr from-blue-50 via-white to-purple-100 text-center px-6 rounded-xl relative overflow-hidden">
      <div className="absolute -top-10 left-10 h-40 w-40 bg-purple-300 opacity-20 rounded-full animate-ping"></div>
      <div className="absolute top-20 right-20 h-32 w-32 bg-blue-400 opacity-10 rounded-full animate-pulse"></div>

      <div className="flex flex-col items-center z-10">
        <div className="text-5xl mb-4">💬</div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 via-purple-700 to-pink-600 bg-clip-text text-transparent animate-fade-in">
          Welcome to Talksy AI
        </h1>
        <p className="text-lg text-gray-700 mt-4 max-w-xl animate-fade-in-slow">
          Build intelligent <span className="text-blue-700 font-semibold">chatbots</span> in minutes, no code required. Automate, assist, and grow faster.
        </p>
      </div>
    </div>
  );

  const renderFeatureComponent = () => {
    switch (selectedFeature) {
      case 'add-website': return renderWelcomeMessage();
      case 'knowledge-base': return <KnowledgeBase email={email} />;
      case 'upload-files': return <UploadFiles />;
      case 'customize-chatbot': return <CustomizeChatbot />;
      case 'analytics': return <Analytics />;
      case 'embed-code': return <EmbedCode />;
      default: return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="flex flex-col items-center space-y-6 animate-fade-in">
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-4 border-blue-200"></div>
            <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-t-4 border-blue-600 animate-spin"></div>
          </div>
          <p className="text-blue-600 font-medium text-lg animate-pulse">Loading your Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50">
      {/* Sidebar */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-16'} bg-blue-900 text-white shadow-md p-4 fixed top-0 left-0 h-full z-50`}>
        <div className="flex items-center justify-between mb-6">
          {isSidebarOpen && <h2 className="text-xl font-bold tracking-wide">Talksy</h2>}
          <button onClick={toggleSidebar} className="text-white hover:text-blue-200">
            {isSidebarOpen ? <FiChevronLeft size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        <div className="space-y-2">
          {dashboardFeatures.map((feature) => (
            <button
              key={feature.id}
              onClick={() => setSelectedFeature(feature.id)}
              className={`flex items-center space-x-4 w-full px-3 py-2 rounded-lg transition-all duration-200 hover:bg-blue-600 ${selectedFeature === feature.id ? 'bg-blue-600' : ''}`}
            >
              <div>{feature.icon}</div>
              {isSidebarOpen && <span className="text-sm">{feature.title}</span>}
            </button>
          ))}
        </div>

        <div className="mt-auto pt-6 relative" ref={dropdownRef}>
          <div
            className="cursor-pointer flex items-center space-x-3 text-white hover:text-blue-200"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div className="p-2 bg-white text-blue-700 rounded-full">
              <FiLogOut size={20} />
            </div>
            {isSidebarOpen && <span className="text-sm">Account</span>}
          </div>

          {showDropdown && (
            <div className="absolute left-0 mt-3 w-60 bg-white shadow-2xl rounded-xl py-3 z-50 text-sm text-gray-800">
              <div className="px-4 py-2 border-b">
                <p className="font-medium">Signed in as</p>
                <p className="text-blue-700 font-semibold break-words">{email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-16 md:ml-64 p-6 transition-all duration-300">
        <h1 className="text-3xl font-bold text-blue-900 mb-6 animate-fade-in">
          {dashboardFeatures.find(f => f.id === selectedFeature)?.title}
        </h1>
        {renderFeatureComponent()}
      </div>
    </div>
  );
}
