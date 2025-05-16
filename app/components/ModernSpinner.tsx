'use client';

import React from 'react';

export default function ModernSpinner() {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="relative w-24 h-24">
        {/* Spinner ring with blue theme */}
        <div className="w-full h-full border-4 border-t-transparent border-r-transparent border-b-blue-600 border-l-blue-500 rounded-full animate-spin" />

        {/* Brand name in the center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-blue-700 font-bold text-base md:text-lg tracking-wide animate-pulse drop-shadow-sm">
            Talksy AI
          </span>
        </div>

        {/* Soft animated glow */}
        <div className="absolute -inset-1 rounded-full bg-blue-500/10 blur-xl animate-ping" />
      </div>
    </div>
  );
}
