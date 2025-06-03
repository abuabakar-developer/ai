'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateNewChatbot() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Checking if the user is authenticated
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleClick = () => {
    // If authenticated, navigate to the dashboard, otherwise to the login page
    if (isAuthenticated) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  };

  return (
    <section className="bg-blue-950 text-white font-sans rounded-3xl shadow-xl mx-4 sm:mx-6 md:mx-12 my-10 py-16 sm:py-20 text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
          Join future of <span className='text-blue-800'>AI chatbots </span>today
        </h1>
        <div className="flex justify-center">
          <button
            onClick={handleClick}
            className="bg-white text-blue-700 font-semibold text-sm sm:text-base md:text-lg py-3 px-6 sm:px-8 rounded-full shadow-md hover:bg-blue-100 transition-all duration-300"
          >
            Create your own chatbot
          </button>
        </div>
      </div>
    </section>
  );
}
