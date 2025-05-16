'use client';

import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

const faqs = [
  {
    question: 'What is Talksy AI?',
    answer:
      'Talksy AI is a no-code platform that helps small business owners create their own AI chatbot to support customers, answer FAQs, and collect leads—all without needing technical skills.',
  },
  {
    question: 'How do I create my chatbot?',
    answer:
      'Simply sign up, add your business FAQs or upload documents, and Talksy AI will generate a chatbot that you can embed into your website with one line of code.',
  },
  {
    question: 'Can I customize the chatbot’s look?',
    answer:
      'Yes! You can customize colors, logo, chat icon, welcome message, and even the chatbot personality from your dashboard.',
  },
  {
    question: 'What type of documents can I upload to train my bot?',
    answer:
      'You can upload PDFs, Word Docs, and text files. Talksy AI will extract the content and use it to train your bot instantly.',
  },
  {
    question: 'Do I need to know how to code?',
    answer:
      'No coding is required! Talksy AI is made for business owners with no technical background.',
  },
  {
    question: 'How do I install the chatbot on my site?',
    answer:
      'Once your chatbot is ready, you’ll get a snippet of embed code. Just paste it into your site’s HTML, and you’re live!',
  },
  {
    question: 'Can I see how my customers interact with the bot?',
    answer:
      'Absolutely. The dashboard includes basic analytics, such as total chats, most common questions, and customer emails collected.',
  },
  {
    question: 'Is there a free trial?',
    answer:
      'Yes! We offer a free trial so you can see the value Talksy AI brings to your business before committing.',
  },
];


const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="faq-section" className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-16 px-6 md:px-20 lg:px-32 scroll-mt-20">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12">
        FAQ's of <span className="text-blue-950">AI chatbot</span> for your website
      </h1>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            onClick={() => toggleFAQ(index)}
            className={`relative group border-[1px] border-gray-800 rounded-none px-6 py-5 transition-all duration-300 hover:border-blue-600 cursor-pointer bg-white shadow-sm hover:shadow-md`}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">{faq.question}</h2>
              {openIndex === index ? (
                <ChevronUpIcon className="h-5 w-5 text-blue-600" />
              ) : (
                <ChevronDownIcon className="h-5 w-5 text-gray-500" />
              )}
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index ? 'max-h-96 mt-4 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <p className="text-gray-700 text-md">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
