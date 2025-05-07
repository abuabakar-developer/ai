'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(
      email.trim() !== '' &&
      password.trim() !== '' &&
      businessName.trim() !== ''
    );
  }, [email, password, businessName]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, businessName }),
      });

      if (res.ok) {
        router.push('/login');
      } else {
        const data = await res.text();
        setError(data || 'Registration failed');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10 space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-gray-800">
          Register for Talksy
        </h2>

        {error && (
          <p className="text-blue-500 text-sm text-center bg-blue-50 p-2 rounded-md">
            {error}
          </p>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-4 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-4 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Business Name"
              className="w-full p-4 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full text-white py-3 rounded-full text-lg font-semibold transition duration-300 shadow-md ${
              isFormValid
                ? 'bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800'
                : 'bg-gradient-to-r from-blue-500 to-blue-700 opacity-50 cursor-not-allowed'
            }`}
            disabled={loading || !isFormValid}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>

          <p className="text-sm text-center mt-4">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 hover:underline font-medium">
              Login here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
