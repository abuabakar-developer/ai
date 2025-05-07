'use client';

import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { FiUsers, FiMessageCircle, FiClock, FiMail } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

const COLORS = ['#2563eb', '#60a5fa', '#93c5fd', '#bfdbfe'];

const activityData = [
  { name: '10 AM', chats: 12 },
  { name: '12 PM', chats: 24 },
  { name: '2 PM', chats: 18 },
  { name: '4 PM', chats: 32 },
  { name: '6 PM', chats: 14 },
];

const commonQuestionsData = [
  { name: 'Pricing', value: 35 },
  { name: 'Support', value: 25 },
  { name: 'Returns', value: 20 },
  { name: 'Delivery Time', value: 20 },
];

export default function Analytics() {
  const [stats] = useState({
    totalChats: 180,
    uniqueUsers: 90,
    peakTime: '4 PM',
    emailCaptures: 35,
  });

  const [timeFilter, setTimeFilter] = useState('Last 7 Days');

  const cards = [
    { label: 'Chats Handled', value: stats.totalChats, icon: <FiMessageCircle className="text-3xl text-blue-600 dark:text-blue-400" /> },
    { label: 'Unique Users', value: stats.uniqueUsers, icon: <FiUsers className="text-3xl text-green-500 dark:text-green-400" /> },
    { label: 'Peak Time', value: stats.peakTime, icon: <FiClock className="text-3xl text-yellow-500 dark:text-yellow-300" /> },
    { label: 'Emails Captured', value: stats.emailCaptures, icon: <FiMail className="text-3xl text-red-500 dark:text-red-400" /> },
  ];

  const filters = ['Today', 'Last 7 Days', 'Last 30 Days'];

  return (
    <div className="w-full px-4 py-8 min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Filters */}
      <div className="flex justify-end mb-6">
        <div className="relative inline-block text-left">
          <button
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-100 dark:hover:bg-gray-600"
          >
            {timeFilter}
            <FaChevronDown className="ml-2 text-xs" />
          </button>
          <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 z-10">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setTimeFilter(filter)}
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 w-full text-left"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-300"
          >
            {card.icon}
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">{card.label}</p>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-1">{card.value}</h2>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <motion.div
          whileInView={{ opacity: [0, 1], y: [20, 0] }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6"
        >
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">📊 Chat Activity by Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={activityData}>
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <RechartsTooltip
                contentStyle={{ backgroundColor: '#f9fafb', borderColor: '#e5e7eb' }}
                cursor={{ fill: '#f3f4f6' }}
              />
              <Bar dataKey="chats" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          whileInView={{ opacity: [0, 1], y: [20, 0] }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6"
        >
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">📈 Most Common Questions</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={commonQuestionsData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                innerRadius={50}
                label
              >
                {commonQuestionsData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <RechartsTooltip
                contentStyle={{ backgroundColor: '#f9fafb', borderColor: '#e5e7eb' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}
