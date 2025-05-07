'use client';

import { useState } from 'react';

interface Props {
  onConfirm: () => void;
}

export default function UserDetailsForm({ onConfirm }: Props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (firstName && lastName && email) {
      onConfirm();
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">First Name</label>
        <input
          type="text"
          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Last Name</label>
        <input
          type="text"
          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email Address</label>
        <input
          type="email"
          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 font-semibold text-lg bg-gradient-to-r from-green-500 to-teal-400 text-white hover:scale-105 transition-all duration-200"
      >
        Confirm Booking
      </button>
    </form>
  );
}
