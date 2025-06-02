'use client';

import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MailIcon } from 'lucide-react';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/auth/reset/request', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        toast.success('Reset email sent! Check your inbox 📧');
        setEmail('');
      } else {
        const error = await res.text();
        toast.error(error || 'Something went wrong.');
      }
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-sans items-center justify-center bg-white px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">Reset Your Password</h2>
        <p className="text-sm text-gray-500 text-center">
          Enter your email to receive a password reset link.
        </p>

        <form onSubmit={handleResetRequest} className="space-y-4">
          <div className="relative">
            <MailIcon className="absolute left-3 top-3.5 text-gray-400 h-5 w-5" />
            <input
              type="email"
              placeholder="you@example.com"
              className="pl-10 pr-4 py-3 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-yellow-600 text-white py-3 rounded-md hover:bg-yellow-700 transition duration-300 ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? (
              <span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              'Send Reset Email'
            )}
          </button>

          <p className="text-sm text-center mt-4">
            Remembered your password?{' '}
            <a href="/login" className="text-blue-600 hover:underline">
              Login here
            </a>
          </p>
        </form>
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
}
