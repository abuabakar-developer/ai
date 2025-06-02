// components/ConfirmContent.tsx
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { format } from 'date-fns';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ConfirmContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dateParam = searchParams.get('date');
  const selectedDate = dateParam ? new Date(dateParam) : null;

  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '' });
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleConfirm = () => {
    if (formData.firstName && formData.lastName && formData.email) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setConfirmed(true);
      }, 4000);
    } else {
      alert('Please fill in all fields.');
    }
  };

  const handleBack = () => router.back();

  return (
    <div className="min-h-screen font-sans bg-gradient-to-br from-white via-slate-50 to-gray-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Confirm Your Meeting</h1>
        {selectedDate && (
          <p className="text-gray-500 mb-6 text-base text-center">
            You selected:
            <span className="block mt-1 text-lg font-semibold text-blue-600">
              {format(selectedDate, 'eeee, MMMM d, yyyy h:mm a')}
            </span>
          </p>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : confirmed ? (
          <div className="flex flex-col items-center text-center animate-fade-in">
            <CheckCircle2 className="text-green-500 w-16 h-16 mb-4 animate-bounce" />
            <h3 className="text-2xl font-bold text-green-600">Booking Confirmed!</h3>
            <p className="mt-2 text-gray-700">
              Thank you, <span className="font-semibold text-gray-900">{formData.firstName}</span>! An invitation has
              been sent to <span className="font-semibold text-gray-900">{formData.email}</span>.
            </p>
            <button
              onClick={() => router.push('/')}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition shadow-lg"
            >
              Go to Home
            </button>
          </div>
        ) : (
          <div className="space-y-4 animate-fade-in">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex items-center justify-between pt-4">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
              >
                <ArrowLeft size={18} />
                <span>Back</span>
              </button>
              <button
                onClick={handleConfirm}
                className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-3 px-6 rounded-xl font-semibold text-lg hover:scale-[1.03] transition-all duration-300"
              >
                Confirm
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
