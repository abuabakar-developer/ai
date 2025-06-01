'use client';

import { Check, ArrowRight } from 'lucide-react';

const monthlyPlans = [
  {
    name: 'Basic',
    subtitle: 'For Freelancers',
    price: '$12',
    duration: '/month',
    features: [
      '100 web pages',
      '1 Website',
      '2000 Chat Messages / Month',
      'Chat Analytics',
      'Unlimited Chat Replies',
      'Chat History',
      'Customizable Chatbot Design',
    ],
  },
  {
    name: 'Standard',
    subtitle: 'Small Businesses',
    price: '$29',
    duration: '/month',
    features: [
      '300 web pages',
      '2 Websites',
      '5000 Chat Messages / Month',
      'Chat Analytics',
      'Unlimited Chat Replies',
      'Chat History',
      'Customizable Chatbot Design',
    ],
  },
  {
    name: 'Enterprise',
    subtitle: 'Large Scale Companies',
    price: '$299',
    duration: '/month',
    features: [
      '5000 web pages',
      '10 Websites',
      'Unlimited Chat Messages / Month',
      'Chat Analytics',
      'Unlimited Chat Replies',
      'Chat History',
      'Customizable Chatbot Design',
    ],
  },
];

export default function Pricing() {
  return (
    <section className="bg-white font-sans py-24 px-6 md:px-12 lg:px-20 text-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center space-y-4">
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight text-gray-900">
            Flexible Plans <span className="text-blue-600">for Every Team</span>
          </h2>
          <p className="text-lg text-gray-600">
            Start free. No credit card needed. Launch your chatbot in minutes.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {monthlyPlans.map((plan, idx) => {
            const isStandard = plan.name === 'Standard';

            return (
              <div
                key={idx}
                className={`relative group p-8 rounded-3xl border transition-all duration-300 transform flex flex-col justify-between ${
                  isStandard
                    ? 'border-2 border-blue-600 bg-white text-gray-900 shadow-lg'
                    : 'border border-gray-200 bg-white text-gray-900'
                }`}
              >
                {isStandard && (
                  <span className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                )}

                <div>
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <p className="mt-1 text-gray-500">{plan.subtitle}</p>

                  <div className="mt-6 flex items-end space-x-2">
                    <span className="text-4xl font-extrabold">{plan.price}</span>
                    <span className="text-base font-medium text-gray-500">
                      {plan.duration}
                    </span>
                  </div>

                  <ul className="mt-6 space-y-3 text-sm text-gray-700">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="w-4 h-4 mr-2 mt-1 text-blue-600" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  className={`group mt-8 w-full py-2 rounded-full font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                    isStandard
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-white text-gray-800 border border-blue-600 hover:bg-blue-100'
                  }`}
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
