
'use client';

import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    id: '01',
    title: 'Fetch Data',
    description: 'Talksy AI automatically fetches all the pages on your website.',
  },
  {
    id: '02',
    title: 'Select Pages',
    description: 'Choose which pages to train your chatbot on and click "Start Training".',
  },
  {
    id: '03',
    title: 'Own Your Chatbot',
    description: 'Talksy AI becomes your smart assistant, answering anything about your site.',
  },
  {
    id: '04',
    title: 'Customize & Launch',
    description: 'Style it your way and launch instantly on your website.',
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-gradient-to-br from-white to-gray-50 py-24 px-6 sm:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-20">
          How Talksy <span className='text-blue-950'>AI Works</span>
        </h2>

        {/* Desktop Layout */}
        <div className="hidden md:grid grid-cols-2 gap-x-24 gap-y-40 relative">
          {/* Step 1 */}
{/* Step 1 */}
<motion.div
  initial={{ opacity: 0, y: -50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
  className="relative pb-6 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-[118%] after:bg-gray-800"
>
  <div className="absolute -top-3 -left-10 w-10 h-10 bg-blue-950 text-white font-bold rounded-full flex items-center justify-center shadow-lg text-sm">
    01
  </div>
  <h3 className="text-2xl font-semibold text-gray-800">{steps[0].title}</h3>
  <p className="text-gray-600 mt-2">{steps[0].description}</p>
</motion.div>


          {/* Step 2 */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="relative border-b-[1px] border-gray-800 border-l-[1px] pl-6 pb-6 translate-y-8"
          >
            <div className="absolute -top-4 -left-4 w-10 h-10 bg-blue-950 text-white font-bold rounded-full flex items-center justify-center shadow-lg text-sm">
              02
            </div>
            <h3 className="text-2xl font-semibold text-gray-800">{steps[1].title}</h3>
            <p className="text-gray-600 mt-2">{steps[1].description}</p>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative -mt-20 ml-20"
          >
            <div className="absolute -top-3 -left-10 w-10 h-10 bg-blue-950 text-white font-bold rounded-full flex items-center justify-center shadow-lg text-sm">
              03
            </div>
            <h3 className="text-2xl font-semibold text-gray-800">{steps[2].title}</h3>
            <p className="text-gray-600 mt-2">{steps[2].description}</p>
          </motion.div>

          {/* Step 4 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="relative -mt-28 ml-32 border-l-[1px] pl-6 border-gray-800"
          >
            <div className="absolute -top-4 -left-4 w-10 h-10 bg-blue-950 text-white font-bold rounded-full flex items-center justify-center shadow-lg text-sm">
              04
            </div>
            <h3 className="text-2xl font-semibold text-gray-800">{steps[3].title}</h3>
            <p className="text-gray-600 mt-2">{steps[3].description}</p>
          </motion.div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden space-y-12">
          {steps.map((step) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative pl-6 border-l-[1px] border-gray-600"
            >
              <div className="absolute -left-4 top-0 w-8 h-8 bg-blue-950 text-white font-bold rounded-full flex items-center justify-center shadow-md text-sm">
                {step.id}
              </div>
              <h3 className="text-2xl font-semibold text-gray-800">{step.title}</h3>
              <p className="text-gray-600 mt-2">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;


