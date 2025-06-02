'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, FileText, Bot, Paintbrush } from 'lucide-react';

const steps = [
  {
    id: '01',
    title: 'Fetch Data',
    icon: Globe,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-700',
    description: 'Talksy AI crawls and fetches all the pages of your website seamlessly.',
  },
  {
    id: '02',
    title: 'Select Pages',
    icon: FileText,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-700',
    description: 'Choose which pages to train your smart chatbot on and click "Train".',
  },
  {
    id: '03',
    title: 'Own Your Chatbot',
    icon: Bot,
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-700',
    description: 'Talksy AI becomes your intelligent assistant, responding Instantly.',
  },
  {
    id: '04',
    title: 'Customize & Launch',
    icon: Paintbrush,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-700',
    description: 'Style it with your brand and go live in seconds with one click.',
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-white py-24 px-6 sm:px-10 font-sans lg:px-24 overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-sans text-center text-gray-900 mb-20"
        >
          How <span className="text-blue-700 font-sans">Talksy AI</span> Works
        </motion.h2>

        {/* Horizontal line behind cards */}
        <div className="hidden md:block absolute left-0 top-1/2 w-full h-1 bg-gray-600 rounded-full z-0 transform -translate-y-1/2" />

        {/* Desktop layout */}
        <div className="hidden md:flex justify-between items-center relative z-10">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="relative bg-white border border-gray-200 p-6 rounded-xl flex flex-col items-start w-64 text-left group"
              >
                {/* Hover blur bar */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-24 h-3 rounded-full bg-blue-400 blur-md opacity-0 group-hover:opacity-80 transition-all duration-500" />

                {/* Step number */}
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-blue-700 text-white font-bold rounded-full flex items-center justify-center text-xs z-20">
                  {step.id}
                </div>

                {/* Icon */}
                <div className={`w-12 h-12 mb-4 rounded-full flex items-center justify-center ${step.iconBg}`}>
                  <Icon className={`w-6 h-6 ${step.iconColor}`} />
                </div>

                <h3 className="text-2xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-700 text-md font-medium leading-relaxed">{step.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile layout */}
        <div className="md:hidden flex flex-col gap-16 mt-12 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative px-4"
              >
                {/* Step number bubble */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -top-5 w-10 h-10 bg-blue-700 text-white font-bold rounded-full flex items-center justify-center text-xs z-10">
                  {step.id}
                </div>

                <div className="bg-white/80 backdrop-blur-lg border border-gray-200 rounded-xl p-6 pt-10">
                  {/* Icon */}
                  <div className={`w-12 h-12 mb-4 rounded-full flex items-center justify-center ${step.iconBg}`}>
                    <Icon className={`w-6 h-6 ${step.iconColor}`} />
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-700 text-md font-medium leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
