'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Star } from 'lucide-react';
import Image from 'next/image';

interface HeroDataType {
  title: string;
  subtitle: string;
  description: string;
  secondaryCta: {
    label: string;
    href: string;
  };
  highlights: string[];
  imageUrl: string;
}

const mockHeroData: HeroDataType = {
  title: 'Launch Your AI Chatbot Effortlessly',
  subtitle: 'Fast, Modern, and Fully Customizable',
  description:
    'Create and deploy a powerful AI chatbot in minutes. Boost engagement, automate support, and enhance satisfaction.',
  secondaryCta: {
    label: 'Book a Demo',
    href: '/bookingdialog',
  },
  highlights: ['No credit card required'],
  imageUrl: '/dashboar.png',
};

export default function HeroSection() {
  const [heroData, setHeroData] = useState<HeroDataType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setHeroData(mockHeroData), 300);
    const token = localStorage.getItem('token');
    if (token) {
      try {
        JSON.parse(atob(token.split('.')[1]));
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    }
    return () => clearTimeout(timer);
  }, []);

  const handlePrimaryClick = () => {
    router.push(isAuthenticated ? '/dashboard' : '/login');
  };

  const handleSecondaryClick = () => {
    router.push(heroData?.secondaryCta.href || '/');
  };

  if (!heroData) return null;

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 font-sans pt-20 sm:pt-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center animate-fadeIn">
        {/* Subtitle & rating */}
        <div className="inline-flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full mb-4">
          <div className="flex gap-0.5">
            {[...Array(2)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <p className="text-sm font-medium text-gray-600">{heroData.subtitle}</p>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
          <span className="text-blue-700">AI-Chatbot</span>{' '}
          <span className="text-gray-800">For</span>
          <br />
          <span>Your Website</span>
        </h1>

        {/* Description */}
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8 font-medium">
          {heroData.description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
          <button
            onClick={handlePrimaryClick}
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-all"
          >
            Create Your Chatbot
          </button>
          <button
            onClick={handleSecondaryClick}
            className="border border-blue-700 text-blue-700 hover:bg-blue-50 font-semibold px-8 py-3 rounded-full transition-all"
          >
            {heroData.secondaryCta.label}
          </button>
        </div>

        {/* Highlights */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 text-sm text-gray-700 font-medium">
          {heroData.highlights.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hero Image */}
      <div className="max-w-7xl mx-auto mt-16">
        <div className="relative w-full h-[75vh] sm:h-[85vh] md:h-[90vh] rounded-3xl overflow-hidden border border-gray-200">
<Image
  src={heroData.imageUrl} // update path as needed
  alt="Chatbot Dashboard"
  width={1400}
  height={800}
  className="w-full max-w-[1400px] mx-auto h-auto object-contain md:px-6 lg:px-12"
/>

        </div>
      </div>
    </section>
  );
}
