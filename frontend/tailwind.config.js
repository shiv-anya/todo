/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#0f1115',
          soft: '#151822',
          card: 'rgba(255, 255, 255, 0.04)',
        },
        accent: {
          DEFAULT: '#6366f1',
          soft: '#818cf8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.08)',
        'card-hover': '0 4px 10px rgba(0,0,0,0.12), 0 10px 28px rgba(0,0,0,0.16)',
        glow: '0 8px 24px -6px rgba(99, 102, 241, 0.45)',
        'glow-green': '0 0 0 1px rgba(34,197,94,0.25), 0 0 14px rgba(34,197,94,0.35)',
        'glow-amber': '0 0 0 1px rgba(245,158,11,0.25), 0 0 14px rgba(245,158,11,0.35)',
        'glow-red': '0 0 0 1px rgba(239,68,68,0.25), 0 0 14px rgba(239,68,68,0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.25)',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0, transform: 'translateY(4px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: 0, transform: 'scale(0.96)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.25s ease-out',
        'scale-in': 'scale-in 0.18s ease-out',
        shimmer: 'shimmer 1.4s linear infinite',
      },
    },
  },
  plugins: [],
}
