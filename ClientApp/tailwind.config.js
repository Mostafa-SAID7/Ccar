/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Modern Microsoft-inspired color palette
        primary: {
          50: '#e6f0ff',
          100: '#b3d1ff',
          200: '#80b3ff',
          300: '#4d94ff',
          400: '#1a75ff',
          500: '#0066ff', // Main primary
          600: '#0052cc',
          700: '#003d99',
          800: '#002966',
          900: '#001433',
        },
        secondary: {
          50: '#f0e6ff',
          100: '#d1b3ff',
          200: '#b380ff',
          300: '#944dff',
          400: '#751aff',
          500: '#6600ff', // Main secondary
          600: '#5200cc',
          700: '#3d0099',
          800: '#290066',
          900: '#140033',
        },
        accent: {
          50: '#fff0e6',
          100: '#ffd1b3',
          200: '#ffb380',
          300: '#ff944d',
          400: '#ff751a',
          500: '#ff6600', // Main accent
          600: '#cc5200',
          700: '#993d00',
          800: '#662900',
          900: '#331400',
        },
        surface: {
          light: '#ffffff',
          DEFAULT: '#f5f5f5',
          dark: '#1a1a1a',
        },
        background: {
          light: '#fafafa',
          DEFAULT: '#f0f0f0',
          dark: '#0d0d0d',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'fluent': '8px',
      },
      boxShadow: {
        'fluent': '0 4px 16px rgba(0, 0, 0, 0.12)',
        'fluent-lg': '0 8px 32px rgba(0, 0, 0, 0.16)',
      },
    },
  },
  plugins: [],
}
