/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      colors: {
        gray: {
          800: '#1f2937',
          900: '#111827',
        },
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
        },
        red: {
          500: '#ef4444',
        },
      },
      transitionProperty: {
        'width': 'width',
        'spacing': 'margin, padding',
      },
      transitionTimingFunction: {
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '300': '300ms',
      },
      width: {
        '20': '5rem',    // 80px
        '40': '10rem',   // 160px
        '64': '16rem',   // 256px
      },
      minWidth: {
        '40': '40px',
      },
      zIndex: {
        40: '40',
        50: '50',
      },
    },
  },
  plugins: [],
}
