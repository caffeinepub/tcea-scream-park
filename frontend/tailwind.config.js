/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Creepster', 'cursive'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        chart: {
          1: 'var(--chart-1)',
          2: 'var(--chart-2)',
          3: 'var(--chart-3)',
          4: 'var(--chart-4)',
          5: 'var(--chart-5)',
        },
        'employee-bg-primary': 'var(--employee-bg-primary)',
        'employee-bg-secondary': 'var(--employee-bg-secondary)',
        'employee-bg-dark': 'var(--employee-bg-dark)',
        'employee-bg-darker': 'var(--employee-bg-darker)',
        'employee-orange': 'var(--employee-orange)',
        'employee-red': 'var(--employee-red)',
        'employee-grey': 'var(--employee-grey)',
        'employee-text': 'var(--employee-text)',
        'employee-text-muted': 'var(--employee-text-muted)',
        'employee-border': 'var(--employee-border)',
      },
      boxShadow: {
        'glow-green': '0 0 20px oklch(0.55 0.20 145 / 0.5)',
        'glow-orange': '0 0 20px oklch(0.65 0.25 40 / 0.5)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'strobe-flash': 'strobe-flash 0.15s ease-in-out infinite',
        'horror-drift-1': 'horror-drift-1 60s linear infinite',
        'horror-drift-2': 'horror-drift-2 80s linear infinite',
        'horror-drift-3': 'horror-drift-3 70s linear infinite',
        'horror-drift-4': 'horror-drift-4 90s linear infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '0.8', filter: 'brightness(1)' },
          '50%': { opacity: '1', filter: 'brightness(1.3)' },
        },
        'strobe-flash': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        'horror-drift-1': {
          '0%': { transform: 'translate(0, 0) scale(1.1)' },
          '25%': { transform: 'translate(-2%, 2%) scale(1.12)' },
          '50%': { transform: 'translate(-4%, 0%) scale(1.1)' },
          '75%': { transform: 'translate(-2%, -2%) scale(1.08)' },
          '100%': { transform: 'translate(0, 0) scale(1.1)' },
        },
        'horror-drift-2': {
          '0%': { transform: 'translate(0, 0) scale(1.15)' },
          '33%': { transform: 'translate(3%, -2%) scale(1.13)' },
          '66%': { transform: 'translate(-3%, 2%) scale(1.17)' },
          '100%': { transform: 'translate(0, 0) scale(1.15)' },
        },
        'horror-drift-3': {
          '0%': { transform: 'translate(0, 0) scale(1.12)' },
          '40%': { transform: 'translate(-3%, -3%) scale(1.14)' },
          '80%': { transform: 'translate(3%, 3%) scale(1.10)' },
          '100%': { transform: 'translate(0, 0) scale(1.12)' },
        },
        'horror-drift-4': {
          '0%': { transform: 'translate(0, 0) scale(1.08)' },
          '30%': { transform: 'translate(2%, -3%) scale(1.12)' },
          '60%': { transform: 'translate(-2%, 3%) scale(1.06)' },
          '100%': { transform: 'translate(0, 0) scale(1.08)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
};
