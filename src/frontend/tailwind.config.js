/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Outfit"', 'sans-serif'],
        display: ['"Bricolage Grotesque"', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'oklch(var(--background) / <alpha-value>)',
        foreground: 'oklch(var(--foreground) / <alpha-value>)',
        card: {
          DEFAULT: 'oklch(var(--card) / <alpha-value>)',
          foreground: 'oklch(var(--card-foreground) / <alpha-value>)',
        },
        popover: {
          DEFAULT: 'oklch(var(--popover) / <alpha-value>)',
          foreground: 'oklch(var(--popover-foreground) / <alpha-value>)',
        },
        primary: {
          DEFAULT: 'oklch(var(--primary) / <alpha-value>)',
          foreground: 'oklch(var(--primary-foreground) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'oklch(var(--secondary) / <alpha-value>)',
          foreground: 'oklch(var(--secondary-foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'oklch(var(--muted) / <alpha-value>)',
          foreground: 'oklch(var(--muted-foreground) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'oklch(var(--accent) / <alpha-value>)',
          foreground: 'oklch(var(--accent-foreground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'oklch(var(--destructive) / <alpha-value>)',
          foreground: 'oklch(var(--destructive-foreground) / <alpha-value>)',
        },
        border: 'oklch(var(--border) / <alpha-value>)',
        input: 'oklch(var(--input) / <alpha-value>)',
        ring: 'oklch(var(--ring) / <alpha-value>)',
        'blood-red': 'oklch(0.55 0.22 25 / <alpha-value>)',
        'orange-glow': 'oklch(0.65 0.18 60 / <alpha-value>)',
        'dark-card': 'oklch(0.11 0.01 0 / <alpha-value>)',
      },
      boxShadow: {
        'glow-red': '0 0 20px oklch(0.55 0.22 25 / 0.5)',
        'glow-orange': '0 0 20px oklch(0.65 0.18 60 / 0.5)',
        'card-horror': '0 4px 32px oklch(0.55 0.22 25 / 0.2)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'carnival-spin': 'carnival-spin 20s linear infinite',
        'drift-fog': 'drift-fog 12s ease-in-out infinite',
        'slide-up-fade': 'slide-up-fade 0.7s ease-out forwards',
        'scale-in': 'scale-in 0.5s ease-out forwards',
        'float-up': 'float-up 0.6s ease-out forwards',
        'section-flicker': 'section-flicker 8s ease-in-out infinite',
        'strobe-overlay': 'strobe-overlay-anim 0.12s step-end infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 10px oklch(0.55 0.22 25 / 0.3)' },
          '50%': { boxShadow: '0 0 30px oklch(0.55 0.22 25 / 0.7), 0 0 60px oklch(0.55 0.22 25 / 0.3)' },
        },
        'carnival-spin': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'drift-fog': {
          '0%, 100%': { transform: 'translateX(0) scaleY(1)', opacity: '0.15' },
          '50%': { transform: 'translateX(40px) scaleY(1.1)', opacity: '0.25' },
        },
        'slide-up-fade': {
          from: { transform: 'translateY(30px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        'scale-in': {
          from: { transform: 'scale(0.92)', opacity: '0' },
          to: { transform: 'scale(1)', opacity: '1' },
        },
        'float-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'section-flicker': {
          '0%, 95%, 100%': { opacity: '1' },
          '96%': { opacity: '0.85' },
          '97%': { opacity: '1' },
          '98%': { opacity: '0.7' },
          '99%': { opacity: '1' },
        },
        'strobe-overlay-anim': {
          '0%, 88%, 100%': { opacity: '0' },
          '90%': { opacity: '0.04' },
          '92%': { opacity: '0' },
          '94%': { opacity: '0.06' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
};
