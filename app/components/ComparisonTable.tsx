'use client'

import React from 'react'
import { Check, X } from 'lucide-react'

const plans = ['Free', 'Basic', 'Standard', 'Professional', 'Enterprise', 'Reseller']

const sections = [
  {
    title: 'Key Features of AI Chatbot Plans',
    features: [
      { label: 'Web Pages', values: ['5', '100', '300', '1000', '5000', '10000'] },
      { label: 'Website', values: ['1', '1', '2', '5', '10', '50'] },
      { label: 'Open AI Key Included', values: [true, true, true, true, true, false] },
      { label: 'Website Chatbot Flow', values: [true, true, true, true, true, true] },
      { label: 'Messages', values: ['1000', '2000', '5000', 'Unlimited', 'Unlimited', 'Unlimited'] },
      { label: 'Chatbot Creation Support', values: [false, false, false, false, true, false] },
    ],
  },
  {
    title: 'Chat Dashboard Overview',
    features: [
      { label: 'Chat Inbox', values: [true, true, true, true, true, true] },
      { label: 'Chat Ratings', values: [true, true, true, true, true, true] },
      { label: 'Chat Analytics', values: [true, true, true, true, true, true] },
      { label: 'Unlimited Chat Replies', values: [true, true, true, true, true, true] },
      { label: 'Chat History', values: [true, true, true, true, true, true] },
    ],
  },
  {
    title: 'Design Capabilities',
    features: [
      { label: 'Customizable Chatbot Design', values: [true, true, true, true, true, true] },
      { label: 'Remove "Powered By" branding', values: [false, true, true, true, true, true] },
    ],
  },
]

const ComparisonTable = () => {
  return (
    <div className="bg-gray-50 px-4 font-sans py-16 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-6 sm:font-semibold">
          AI Chatbot Pricing Comparison Plans
        </h1>
        <p className="text-base sm:text-lg text-center font-medium text-gray-600 mb-12 max-w-3xl mx-auto">
          Can’t decide which plan is right for you? Explore a side-by-side comparison of all our plans and features.
        </p>

        {sections.map((section, index) => (
          <div key={section.title} className="mb-14">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2">
              {section.title}
            </h2>

            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-white text-gray-700">
                  <tr>
                    <th className="p-4 text-left font-semibold text-sm sm:text-base bg-gray-100 sticky left-0 z-10 shadow-md">
                      Features
                    </th>
                    {plans.map((plan) => (
                      <th key={plan} className="p-4 text-center font-semibold whitespace-nowrap text-sm sm:text-base">
                        {plan}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {section.features.map((feature, featureIndex) => (
                    <tr
                      key={feature.label}
                      className={featureIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    >
                      <td className="p-4 text-gray-700 font-semibold sticky left-0 bg-white z-10 shadow-sm">
                        {feature.label}
                      </td>
                      {feature.values.map((val, idx) => (
                        <td key={idx} className="p-4 text-center text-gray-800">
                          {typeof val === 'boolean' ? (
                            val ? (
                              <Check className="text-green-500 w-5 h-5 mx-auto" />
                            ) : (
                              <X className="text-red-500 w-5 h-5 mx-auto" />
                            )
                          ) : (
                            <span className="font-medium">{val}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ComparisonTable
