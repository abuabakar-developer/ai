'use client';

import { useState } from 'react';

const BookDemo = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      console.log('Demo booked:', formData);
    }, 1000);
  };

  return (
    <section className="min-h-screen font-sans bg-white py-20 px-6 flex items-center justify-center">
      <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">

        {/* Left Side: Why Book a Demo */}
        <div className="bg-white text-gray-900 p-10">
          <h2 className="text-4xl font-bold mb-6 leading-snug">
            Why Book a Demo?
          </h2>
          <p className="text-lg mb-4">Free consultation on how your business can leverage Conversational AI</p>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <p className="text-lg">🔹 Explore solutions to upgrade your entire digital customer journey</p>
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-lg">🔹 Learn about automating 70% of your customer support through chatbots</p>
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-lg">🔹 Identify how Virtual Agents can slash costs & free-up your team</p>
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-lg">🔹 Explore flexible packages that fit your precise business needs</p>
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-lg">🔹 Understand our proven results, across industries</p>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="bg-white text-gray-900 p-10 rounded-3xl shadow-xl">
          <div className="bg-indigo-600 text-white py-3 px-6 rounded-t-xl mb-6 w-full">
            <h3 className="text-3xl font-semibold lg:w-full">
              Book Your <span className="font-bold">Personalized Demo</span>
            </h3>
          </div>

          {submitted ? (
            <div className="bg-green-100 text-green-800 p-6 rounded-xl shadow text-center">
              <h3 className="text-2xl font-semibold mb-2">🎉 Demo Booked!</h3>
              <p>We’ll get in touch with you soon. Thanks for choosing Talksy!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <input
                type="text"
                name="company"
                required
                placeholder="Company Name"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <textarea
                name="message"
                rows={4}
                placeholder="Tell us about your needs..."
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <button
                type="submit"
                className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-semibold py-3 rounded-xl transition duration-200"
              >
                Book My Demo
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};

export default BookDemo;