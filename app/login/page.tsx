'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(email.trim() !== '' && password.trim() !== '');
  }, [email, password]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setLoading(true);
    setError('');

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('token', data.token);
      router.push('/dashboard');
    } else {
      setError(data || 'Login failed');
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10 space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-gray-800">Login to Talksy</h2>

        {error && <p className="text-blue-600 text-sm text-center">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-5">
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

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full p-4 pr-12 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-blue-600 focus:outline-none"
            >
              {showPassword ? (
                <EyeSlashIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
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
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <p className="text-sm text-center mt-4">
            Don’t have an account?{' '}
            <a href="/register" className="text-blue-600 hover:underline font-medium">
              Register here
            </a>
          </p>

          <p className="text-sm text-center mt-2">
            <a
              href="/reset-password"
              className="inline-block text-white bg-gradient-to-r from-blue-500 to-blue-700 py-2 px-5 rounded-full hover:from-blue-600 hover:to-blue-800 focus:ring-2 focus:ring-blue-500 transition duration-300"
            >
              Forgot your password?
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
