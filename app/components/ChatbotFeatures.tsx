'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { CheckCircle } from 'lucide-react';

const features = [
  {
    title: 'Rapid Response',
    desc: 'Super quick setup and lightning fast response is all it takes for Talksy AI chatbot to start handling your customer queries.',
    image: '/chaat.png',
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
  },
  {
    title: 'AI Nudge',
    description: 'Guide customers toward actions like calling or booking demos with smart AI prompts in every answer.',
  },
  {
    title: 'Next-Level AI With OpenAI',
    description: 'Choose ChatGPT 3.5 or 4.0 to enhance responsiveness and intelligence of your chatbot.',
  },
  {
    title: 'Customized Chatbot Tone',
    description: 'Select a tone like sales-focused or friendly to match your brand’s voice.',
  },
  {
    title: 'Flexible Embedding Options',
    description: 'Embed chatbot on your website or share as standalone widget with ease.',
  },
  {
    title: 'Train Your Chatbot',
    description: 'Add links, documents, PDFs, or chats to continuously improve chatbot performance.',
  },
  {
    title: 'Automated Content Updates',
    description: 'Configure your chatbot to crawl websites periodically and stay updated.',
  },
  {
    title: 'Get Weekly AI Notifications',
    description: 'Receive weekly email reports on chatbot conversations and performance.',
  },
  {
    title: 'Human Handover',
    description: 'Enable smooth transfer to human agents for personalized support.',
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

  return (
    <>
      <section className="bg-white py-16 px-6 sm:px-12 md:px-16 lg:px-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
            Build a Trustworthy <span className='text-blue-950'>AI Chatbot</span>
          </h2>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4 pt-2" ref={leftRef}>
            {features.map((feature, index) => {
              const isActive = activeFeature.title === feature.title;
              return (
                <div
                  key={index}
                  onMouseEnter={() => setActiveFeature(feature)}
                  className={`group px-5 py-4 rounded-xl cursor-pointer transition-all duration-300 
                    border-l-4 ${
                      isActive
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-gray-500 w-5 h-5 mt-1 group-hover:text-blue-400 transition" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-800">
                        {feature.title}
                      </h3>
                      {isActive && (
                        <p className="text-gray-600 text-sm font-semibold mt-1 transition-opacity duration-300">
                          {feature.desc}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Image Section Hidden on Small Screens */}
          <div
            className="hidden md:flex justify-center items-center"
            style={{ height: leftHeight ? `${leftHeight}px` : 'auto' }}
          >
            <div className="w-full md:w-[600px] lg:w-[720px] border-[1px] border-gray-800 shadow-lg bg-white p-4 flex items-center justify-center transition-all duration-300">
              <Image
                src={activeFeature.image}
                alt={activeFeature.title}
                width={activeFeature.title === 'Customized Chatbot Widget' ? 540 : 500}
                height={activeFeature.title === 'Customized Chatbot Widget' ? 540 : 500}
                className={`object-contain transition-all duration-300 ${
                  activeFeature.title === 'Customized Chatbot Widget'
                    ? 'max-h-[340px]'
                    : 'max-h-full'
                }`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Powerful Features */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6">
          {(showAll ? advancedFeatures : advancedFeatures.slice(0, 6)).map((feature, index) => (
            <div
              key={index}
              className="border-[1px] border-gray-800 shadow-lg p-5 transition-all duration-300 bg-white hover:shadow-xl"
            >
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h4>
              <p className="text-gray-600 text-sm font-semibold">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {!showAll && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-semibold transition"
            >
              See All
            </button>
          </div>
        )}
      </section>
    </>
  );
}
