module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-neon': '#00F0FF',
        'secondary-accent': '#FF40FF',
        'matrix-dark': '#0D1117',
        'container-bg': 'rgba(30, 41, 59, 0.4)',
        'sentiment-positive': '#34D399', // Green
        'sentiment-neutral': '#FBBF24', // Yellow
        'sentiment-negative': '#F87171', // Red
      },
      fontFamily: {
        // Use a clean sans-serif for titles and a monospace for data
        sans: ['Inter', 'sans-serif'],
        mono: ['"Fira Code"', 'monospace'],
      },
      boxShadow: {
        // ⭐ Custom Neon Glow Utility
        'neon-shadow': '0 0 5px #00F0FF, 0 0 10px #00F0FF, 0 0 20px rgba(0, 240, 255, 0.5)',
        'accent-shadow': '0 0 5px #FF40FF, 0 0 10px #FF40FF, 0 0 20px rgba(255, 64, 255, 0.5)',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { boxShadow: '0 0 3px rgba(0, 240, 255, 0.5)' },
          '50%': { boxShadow: '0 0 10px #00F0FF' },
        },
      },
      animation: {
        pulse: 'pulse 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
