/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-ibm-plex-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-ibm-plex-mono)', 'monospace'],
      },
      colors: {
        ink: '#0f0e0c',
        paper: '#f7f3ec',
        'cream-mid': '#ede8de',
        divider: '#ccc4b4',
        neutral: '#5a5245',
        'futurist-primary': '#1a2e5c',
        'futurist-accent': '#c0392b',
        'futurist-light': '#d6e4f7',
        'sda-primary': '#1a3d2b',
        'sda-accent': '#e8a020',
        'sda-light': '#d4edda',
        'red-flag': '#c0392b',
        'green-check': '#1a6b3c',
      },
    },
  },
  plugins: [],
};
