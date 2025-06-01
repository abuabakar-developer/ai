'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  CheckCircle,
  BarChart3,
  Lightbulb,
  Brain,
  MessageCircle,
  Code2,
  FileText,
  RefreshCcw,
  Bell,
  UserCheck,
} from 'lucide-react';

const features = [
  {
    title: 'Rapid Response',
    desc: 'Super quick setup and lightning fast response is all it takes for Talksy AI chatbot to start handling your customer queries.',
    image: '/chaats.png',
  },
  {
    title: 'Customized Chatbot Widget',
    desc: 'Easily embed and brand the chatbot to match your website for seamless customer interaction.',
    image: '/customs.png',
  },
  {
    title: 'Chatbot Inbox',
    desc: 'Centralized inbox to track, respond, and analyze customer conversations with ease.',
    image: '/inbox.png',
  },
  {
    title: '20+ Advanced Settings',
    desc: 'Fine-tune your chatbot’s behavior with powerful configurations tailored to your business needs.',
    image: '/setting.png',
  },
];

const advancedFeatures = [
  {
    title: 'Analytics and Dashboard',
    description: 'Get detailed reports with user ratings in a user-friendly dashboard for actionable insights.',
    icon: <BarChart3 className="w-5 h-5 text-blue-600" />,
  },
  {
    title: 'AI Nudge',
    description: 'Guide customers toward actions like calling or booking demos with smart AI prompts in every answer.',
    icon: <Lightbulb className="w-5 h-5 text-blue-600" />,
  },
  {
    title: 'Next-Level AI With OpenAI',
    description: 'Choose ChatGPT 3.5 or 4.0 to enhance responsiveness and intelligence of your chatbot.',
    icon: <Brain className="w-5 h-5 text-blue-600" />,
  },
  {
    title: 'Customized Chatbot Tone',
    description: 'Select a tone like sales-focused or friendly to match your brand’s voice.',
    icon: <MessageCircle className="w-5 h-5 text-blue-600" />,
  },
  {
    title: 'Flexible Embedding Options',
    description: 'Embed chatbot on your website or share as standalone widget with ease.',
    icon: <Code2 className="w-5 h-5 text-blue-600" />,
  },
  {
    title: 'Train Your Chatbot',
    description: 'Add links, documents, PDFs, or chats to continuously improve chatbot performance.',
    icon: <FileText className="w-5 h-5 text-blue-600" />,
  },
  {
    title: 'Automated Content Updates',
    description: 'Configure your chatbot to crawl websites periodically and stay updated.',
    icon: <RefreshCcw className="w-5 h-5 text-blue-600" />,
  },
  {
    title: 'Get Weekly AI Notifications',
    description: 'Receive weekly email reports on chatbot conversations and performance.',
    icon: <Bell className="w-5 h-5 text-blue-600" />,
  },
  {
    title: 'Human Handover',
    description: 'Enable smooth transfer to human agents for personalized support.',
    icon: <UserCheck className="w-5 h-5 text-blue-600" />,
  },
];

export default function ChatbotFeatures() {
  const [activeFeature, setActiveFeature] = useState(features[0]);
  const leftRef = useRef<HTMLDivElement>(null);
  const [leftHeight, setLeftHeight] = useState<number | undefined>(undefined);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (leftRef.current) {
      setLeftHeight(leftRef.current.offsetHeight);
    }
  }, [activeFeature]);

  useEffect(() => {
    if (window.location.hash === '#features') {
      const el = document.getElementById('features');
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    }
  }, []);

  return (
    <>
      {/* Main Features Section */}
      <section id="features" className="bg-white py-20 px-4 sm:px-8 md:px-12 lg:px-20 font-sans">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Build <span className="text-blue-800">AI Chatbot</span> Trustworthy
          </h2>
          <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
            Smart, responsive, and completely customizable—your AI-powered support agent.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div className="space-y-4" ref={leftRef}>
            {features.map((feature, index) => {
              const isActive = activeFeature.title === feature.title;
              return (
                <div
                  key={index}
                  onMouseEnter={() => setActiveFeature(feature)}
                  className={`group px-4 py-4 rounded-lg cursor-pointer transition-all duration-300 border-l-2 ${
                    isActive
                      ? 'border-blue-600'
                      : 'border-transparent hover:border-blue-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle
                      className={`w-5 h-5 mt-1 transition ${
                        isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-500'
                      }`}
                    />
                    <div>
                      <h3
                        className={`text-lg font-semibold transition ${
                          isActive ? 'text-blue-800' : 'text-gray-800 group-hover:text-blue-800'
                        }`}
                      >
                        {feature.title}
                      </h3>
                      {isActive && (
                        <p className="text-gray-700 text-md mt-1 leading-relaxed">
                          {feature.desc}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className="hidden md:flex justify-center items-center"
            style={{ height: leftHeight ? `${leftHeight}px` : 'auto' }}
          >
            <div className="w-full md:w-[520px] lg:w-[620px] border border-gray-200 bg-white p-6 rounded-xl shadow-md flex items-center justify-center transition-all duration-300">
              <Image
                src={activeFeature.image}
                alt={activeFeature.title}
                width={500}
                height={400}
                className="object-contain max-h-[340px] transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Features Section */}
<section className="bg-gradient-to-b from-white via-gray-50 font-sans to-white py-20 px-4 sm:px-8 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {(showAll ? advancedFeatures : advancedFeatures.slice(0, 6)).map((feature, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 p-6 rounded-xl hover:shadow-md transition duration-300"
            >
              <div className="flex items-center justify-center mb-4 w-12 h-12 rounded-full bg-blue-100">
                {feature.icon}
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-1">{feature.title}</h4>
              <p className="text-md text-gray-700 mt-1 font-medium leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {!showAll && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-sm sm:text-base font-semibold transition"
            >
              See All Features
            </button>
          </div>
        )}
      </section>
    </>
  );
}
