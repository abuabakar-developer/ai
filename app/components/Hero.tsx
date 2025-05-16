'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Star } from 'lucide-react';

// ✅ Define the proper type
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

// ✅ Mock data with correct type
const mockHeroData: HeroDataType = {
  title: 'Launch Your AI Chatbot Effortlessly',
  subtitle: 'Fast, Modern, and Fully Customizable',
  description:
    'Create and deploy a powerful AI chatbot in minutes. Boost engagement, automate support, and enhance customer satisfaction — no coding skills needed.',
  secondaryCta: {
    label: 'Book a Demo',
    href: '/bookingdialog',
  },
  highlights: ['Free 14-day trial', 'No credit card required'],
  imageUrl: '/chats.png',
};

export default function HeroSection() {
  const [heroData, setHeroData] = useState<HeroDataType | null>(null); // ✅ Strongly typed
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setHeroData(mockHeroData);
    }, 400);

    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    }
  }, []);

  const handlePrimaryClick = () => {
    router.push(isAuthenticated ? '/dashboard' : '/login');
  };

  const handleSecondaryClick = () => {
    router.push('/bookingdialog');
  };

  if (!heroData) return null;

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#f3f4f6"
            d="M0,192L48,181.3C96,171,192,149,288,160C384,171,480,213,576,218.7C672,224,768,192,864,165.3C960,139,1056,117,1152,101.3C1248,85,1344,75,1392,69.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 py-20 pt-30 sm:py-24 md:px-12 lg:px-20 lg:pt-34">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-16">
          {/* Left Text Section */}
          <div className="text-center md:text-left space-y-4">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-500 text-sm sm:text-base font-semibold">
                {heroData.subtitle}
              </p>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
              Launch Your <span className="text-blue-950">AI Chatbot</span> Effortlessly
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-gray-600 font-medium leading-relaxed max-w-md mx-auto md:mx-0">
              {heroData.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4">
              <button
                onClick={handlePrimaryClick}
                className="bg-blue-800 hover:bg-blue-50 hover:border border-blue-700 hover:text-blue-800 text-white font-semibold px-6 py-3 rounded-full shadow-md transition-all duration-300 text-sm sm:text-base"
              >
                Create Your Chatbot
              </button>
              <button
                onClick={handleSecondaryClick}
                className="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-full font-semibold text-sm sm:text-base"
              >
                {heroData.secondaryCta.label}
              </button>
            </div>

            {/* Highlights */}
            <div className="flex flex-col items-center md:items-start gap-2 pt-5">
              {heroData.highlights.map((item: string, index: number) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-gray-700 font-medium text-xs sm:text-sm"
                >
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image Section */}
          <div className="flex justify-center md:justify-end lg:ml-10">
            <img
              src={heroData.imageUrl}
              alt="AI Chatbot Illustration"
              className="w-72 sm:w-80 md:w-96 object-contain rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
