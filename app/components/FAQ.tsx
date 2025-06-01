'use client';

import React, { useState } from 'react';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  LightBulbIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  Cog6ToothIcon,
  DocumentArrowUpIcon,
  CodeBracketIcon,
  WindowIcon,
  EyeIcon,
  GiftIcon,
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: 'What is Talksy AI?',
    answer:
      'Talksy AI is a no-code platform that helps small business owners create their own AI chatbot to support customers, answer FAQs, and collect leads—all without needing technical skills.',
    icon: LightBulbIcon,
  },
  {
    question: 'How do I create my chatbot?',
    answer:
      'Simply sign up, add your business FAQs or upload documents, and Talksy AI will generate a chatbot that you can embed into your website with one line of code.',
    icon: ChatBubbleOvalLeftEllipsisIcon,
  },
  {
    question: 'Can I customize the chatbot’s look?',
    answer:
      'Yes! You can customize colors, logo, chat icon, welcome message, and even the chatbot personality from your dashboard.',
    icon: Cog6ToothIcon,
  },
  {
    question: 'What type of documents can I upload to train my bot?',
    answer:
      'You can upload PDFs, Word Docs, and text files. Talksy AI will extract the content and use it to train your bot instantly.',
    icon: DocumentArrowUpIcon,
  },
  {
    question: 'Do I need to know how to code?',
    answer:
      'No coding is required! Talksy AI is made for business owners with no technical background.',
    icon: CodeBracketIcon,
  },
  {
    question: 'How do I install the chatbot on my site?',
    answer:
      'Once your chatbot is ready, you’ll get a snippet of embed code. Just paste it into your site’s HTML, and you’re live!',
    icon: WindowIcon,
  },
  {
    question: 'Can I see how my customers interact with the bot?',
    answer:
      'Absolutely. The dashboard includes basic analytics, such as total chats, most common questions, and customer emails collected.',
    icon: EyeIcon,
  },
  {
    question: 'Is there a free trial?',
    answer:
      'Yes! We offer a free trial so you can see the value Talksy AI brings to your business before committing.',
    icon: GiftIcon,
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
<section
  id="faq"
  className="font-sans bg-gradient-to-b from-white via-blue-300/20 to-white dark:from-gray-950 dark:via-blue-800/20 dark:to-gray-950 py-24 px-6 sm:px-12 lg:px-28 scroll-mt-24"
>

      <div className="max-w-5xl mx-auto text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-gray-300">
          Everything you need to know about using{' '}
          <span className="text-blue-700 dark:text-blue-400 font-semibold">Talksy AI</span> on your website.
        </p>
      </div>

      <div className="max-w-4xl mx-auto divide-y divide-gray-200 dark:divide-gray-700">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          const Icon = faq.icon;

          return (
            <div key={index} className="py-6 transition-all duration-300">
              <button
                className="w-full text-left flex items-center justify-between gap-4 text-gray-800 dark:text-gray-100 hover:text-blue-700 dark:hover:text-blue-400 focus:outline-none group"
                onClick={() => toggleFAQ(index)}
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 border-2 border-gray-400 dark:border-gray-500 group-hover:border-blue-600 dark:group-hover:border-blue-400 rounded-sm flex items-center justify-center transition-colors duration-300">
                    <Icon className="w-5 h-5 text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-400" />
                  </div>

                  <span className="text-lg sm:text-xl font-medium transition-colors duration-300">
                    {faq.question}
                  </span>
                </div>

                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isOpen ? (
                    <ChevronUpIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  ) : (
                    <ChevronDownIcon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                  )}
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mt-3">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQ;
