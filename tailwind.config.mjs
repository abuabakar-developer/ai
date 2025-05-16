/** @type {import('tailwindcss').Config} */
export default {
  darkMode: false, // ❌ Disable all dark mode behavior
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'bounce-delay-1': 'bounceDelay 1.2s infinite 0s',
        'bounce-delay-2': 'bounceDelay 1.2s infinite 0.2s',
        'bounce-delay-3': 'bounceDelay 1.2s infinite 0.4s',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        bounceDelay: {
          '0%, 80%, 100%': { transform: 'scale(0)' },
          '40%': { transform: 'scale(1)' },
            animation: {
        spin: 'spin 1.2s linear infinite',
        pulse: 'pulse 2s ease-in-out infinite',
        ping: 'ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
          colors: {
      primary: '#1e3a8a', // deep blue
      accent: '#38bdf8',  // light blue
    },
    fontFamily: {
      sans: ['Inter', 'ui-sans-serif', 'system-ui'],
    },
        },
      },
    },
  },
  plugins: [],
};
