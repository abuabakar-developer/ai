'use client';

import { useState } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';

const plans = {
  yearly: [
    {
      name: 'Basic',
      subtitle: 'Freelancers',
      price: '$120',
      duration: '/YEARLY',
      features: [
        '100 web pages',
        '1 Website',
        '2000 Chat Message / Month',
        '100k Characters (free above with your OpenAI Key)',
        'Website Chatbot Flow',
        'Chat Inbox',
        'Chat Ratings',
        'Chat Analytics',
        'Unlimited Chat Replies',
        'Chat History',
        'Remove "Powered By" Branding',
        'Customizable chatbot Design',
        'ChatGPT 4.0',
      ],
    },
    {
      name: 'Standard',
      subtitle: 'Small Size Businesses',
      price: '$290',
      duration: '/YEARLY',
      features: [
        '300 web pages',
        '2 Website',
        '5000 Chat Message / Month',
        '300k Characters (free above with your OpenAI Key)',
        'Website Chatbot Flow',
        'Chat Inbox',
        'Chat Ratings',
        'Chat Analytics',
        'Unlimited Chat Replies',
        'Chat History',
        'Remove "Powered By" Branding',
        'Customizable chatbot Design',
        'ChatGPT 4.0',
      ],
    },
    {
      name: 'Professional',
      subtitle: 'Medium Size Businesses',
      price: '$790',
      duration: '/YEARLY',
      features: [
        '1000 web pages',
        '5 Website',
        'Unlimited Chat Message / Month',
        '1Million Characters (free above with your OpenAI Key)',
        'Website Chatbot Flow',
        'Chat Inbox',
        'Chat Ratings',
        'Chat Analytics',
        'Unlimited Chat Replies',
        'Chat History',
        'Remove "Powered By" Branding',
        'Customizable chatbot Design',
        'ChatGPT 4.0',
      ],
    },
    {
      name: 'Enterprise',
      subtitle: 'Large Scale Businesses',
      price: '$2999',
      duration: '/YEARLY',
      features: [
        '5000 web pages',
        '10 Website',
        'Unlimited Chat Message / Month',
        '5Million Characters (free above with your OpenAI Key)',
        'Website Chatbot Flow',
        'Chat Inbox',
        'Chat Ratings',
        'Chat Analytics',
        'Unlimited Chat Replies',
        'Chat History',
        'Remove "Powered By" Branding',
        'Customizable chatbot Design',
        'ChatGPT 4.0',
      ],
    },
  ],
  monthly: [
    {
      name: 'Basic',
      subtitle: 'Freelancers',
      price: '$12',
      duration: '/MONTHLY',
      features: [
        '100 web pages',
        '1 Website',
        '2000 Chat Message / Month',
        '100k Characters (free above with your OpenAI Key)',
        'Website Chatbot Flow',
        'Chat Inbox',
        'Chat Ratings',
        'Chat Analytics',
        'Unlimited Chat Replies',
        'Chat History',
        'Remove "Powered By" Branding',
        'Customizable chatbot Design',
        'ChatGPT 4.0',
      ],
    },
    {
      name: 'Standard',
      subtitle: 'Small Size Businesses',
      price: '$29',
      duration: '/MONTHLY',
      features: [
        '300 web pages',
        '2 Website',
        '5000 Chat Message / Month',
        '300k Characters (free above with your OpenAI Key)',
        'Website Chatbot Flow',
        'Chat Inbox',
        'Chat Ratings',
        'Chat Analytics',
        'Unlimited Chat Replies',
        'Chat History',
        'Remove "Powered By" Branding',
        'Customizable chatbot Design',
        'ChatGPT 4.0',
      ],
    },
    {
      name: 'Professional',
      subtitle: 'Medium Size Businesses',
      price: '$79',
      duration: '/MONTHLY',
      features: [
        '1000 web pages',
        '5 Website',
        'Unlimited Chat Message / Month',
        '1Million Characters (free above with your OpenAI Key)',
        'Website Chatbot Flow',
        'Chat Inbox',
        'Chat Ratings',
        'Chat Analytics',
        'Unlimited Chat Replies',
        'Chat History',
        'Remove "Powered By" Branding',
        'Customizable chatbot Design',
        'ChatGPT 4.0',
      ],
    },
    {
      name: 'Enterprise',
      subtitle: 'Large Scale Businesses',
      price: '$299',
      duration: '/MONTHLY',
      features: [
        '5000 web pages',
        '10 Website',
        'Unlimited Chat Message / Month',
        '5Million Characters (free above with your OpenAI Key)',
        'Website Chatbot Flow',
        'Chat Inbox',
        'Chat Ratings',
        'Chat Analytics',
        'Unlimited Chat Replies',
        'Chat History',
        'Remove "Powered By" Branding',
        'Customizable chatbot Design',
        'ChatGPT 4.0',
      ],
    },
  ],
};

export default function Pricing() {
  const [billing, setBilling] = useState<'yearly' | 'monthly'>('yearly');

  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-20 min-h-screen">
      <div className="flex flex-col justify-start mb-10">
        <h2 className="text-3xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900">
          Plans that fit your needs
        </h2>

        <div className="flex flex-col sm:flex-row justify-between">
          <p className="pt-6 font-semibold text-md text-gray-600 lg:text-lg">
            Forever free plan. No Credit card needed. No code chatbot.
          </p>

          <div className="flex mt-6 space-x-3">
            <span className="text-m text-gray-600 font-semibold">Monthly</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={billing === 'yearly'}
                onChange={() =>
                  setBilling((prev) => (prev === 'yearly' ? 'monthly' : 'yearly'))
                }
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 relative" />
            </label>
            <span className="text-m text-gray-600 font-semibold">
              Yearly <span className="text-blue-600">(save up to 16%)</span>
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
        {plans[billing].map((plan, idx) => {
          const isStandard = plan.name === 'Standard';
          return (
            <div
              key={idx}
              className={`relative p-6 transition-all duration-300 hover:shadow-md 
                border ${isStandard ? 'border-blue-600' : 'border-gray-800'} 
                ring-1 ring-gray-900
                flex flex-col justify-between`}
            >
              {isStandard && (
                <span className="absolute top-4 right-4 bg-blue-200 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm lg:top-2">
                  Most Popular
                </span>
              )}
              <div>
                <div className="mb-4">
                  <h3 className="text-2xl font-semibold text-gray-800">{plan.name}</h3>
                  <p className="text-gray-500 font-semibold pt-3">{plan.subtitle}</p>
                </div>
                <div className="flex items-center mb-6 space-x-1 pt-4">
                  <span className="text-5xl font-bold text-black">{plan.price}</span>
                  <span className="text-sm text-gray-500 font-semibold">{plan.duration}</span>
                </div>
              </div>
              <div className="mt-auto">
                <button className="w-full group mb-4 py-2 px-4 bg-blue-600 text-white rounded-full font-medium flex items-center justify-center gap-2 hover:bg-blue-700 transition-all duration-300">
                  Get Started
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                <ul className="space-y-2 text-sm text-gray-700 divide-y divide-gray-200">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-blue-500 mt-1 mr-2" />
                      <span className="pt-2">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
