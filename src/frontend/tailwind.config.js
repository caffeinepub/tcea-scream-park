import typography from '@tailwindcss/typography';
import containerQueries from '@tailwindcss/container-queries';
import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['index.html', 'src/**/*.{js,ts,jsx,tsx,html,css}'],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },
        extend: {
            colors: {
                border: 'oklch(var(--border))',
                input: 'oklch(var(--input))',
                ring: 'oklch(var(--ring) / <alpha-value>)',
                background: 'oklch(var(--background))',
                foreground: 'oklch(var(--foreground))',
                primary: {
                    DEFAULT: 'oklch(var(--primary) / <alpha-value>)',
                    foreground: 'oklch(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'oklch(var(--secondary) / <alpha-value>)',
                    foreground: 'oklch(var(--secondary-foreground))'
                },
                destructive: {
                    DEFAULT: 'oklch(var(--destructive) / <alpha-value>)',
                    foreground: 'oklch(var(--destructive-foreground))'
                },
                muted: {
                    DEFAULT: 'oklch(var(--muted) / <alpha-value>)',
                    foreground: 'oklch(var(--muted-foreground) / <alpha-value>)'
                },
                accent: {
                    DEFAULT: 'oklch(var(--accent) / <alpha-value>)',
                    foreground: 'oklch(var(--accent-foreground))'
                },
                popover: {
                    DEFAULT: 'oklch(var(--popover))',
                    foreground: 'oklch(var(--popover-foreground))'
                },
                card: {
                    DEFAULT: 'oklch(var(--card))',
                    foreground: 'oklch(var(--card-foreground))'
                },
                chart: {
                    1: 'oklch(var(--chart-1))',
                    2: 'oklch(var(--chart-2))',
                    3: 'oklch(var(--chart-3))',
                    4: 'oklch(var(--chart-4))',
                    5: 'oklch(var(--chart-5))'
                },
                sidebar: {
                    DEFAULT: 'oklch(var(--sidebar))',
                    foreground: 'oklch(var(--sidebar-foreground))',
                    primary: 'oklch(var(--sidebar-primary))',
                    'primary-foreground': 'oklch(var(--sidebar-primary-foreground))',
                    accent: 'oklch(var(--sidebar-accent))',
                    'accent-foreground': 'oklch(var(--sidebar-accent-foreground))',
                    border: 'oklch(var(--sidebar-border))',
                    ring: 'oklch(var(--sidebar-ring))'
                }
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            boxShadow: {
                xs: '0 1px 2px 0 rgba(0,0,0,0.05)',
                'glow-green': '0 0 20px rgba(0, 255, 100, 0.3)',
                'glow-green-lg': '0 0 40px rgba(0, 255, 100, 0.4)'
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' }
                },
                'pulse-glow': {
                    '0%, 100%': { 
                        boxShadow: '0 0 20px rgba(0, 255, 100, 0.3)',
                        transform: 'scale(1)'
                    },
                    '50%': { 
                        boxShadow: '0 0 40px rgba(0, 255, 100, 0.6)',
                        transform: 'scale(1.02)'
                    }
                },
                'strobe-flash': {
                    '0%, 100%': { 
                        backgroundColor: 'transparent'
                    },
                    '5%': { 
                        backgroundColor: 'rgba(255, 255, 255, 0.4)'
                    },
                    '6%': { 
                        backgroundColor: 'transparent'
                    },
                    '12%': { 
                        backgroundColor: 'rgba(0, 255, 100, 0.35)'
                    },
                    '13%': { 
                        backgroundColor: 'transparent'
                    },
                    '25%': { 
                        backgroundColor: 'rgba(255, 255, 255, 0.45)'
                    },
                    '26%': { 
                        backgroundColor: 'transparent'
                    },
                    '38%': { 
                        backgroundColor: 'rgba(0, 255, 100, 0.3)'
                    },
                    '39%': { 
                        backgroundColor: 'transparent'
                    },
                    '52%': { 
                        backgroundColor: 'rgba(255, 255, 255, 0.5)'
                    },
                    '53%': { 
                        backgroundColor: 'transparent'
                    },
                    '68%': { 
                        backgroundColor: 'rgba(0, 255, 100, 0.4)'
                    },
                    '69%': { 
                        backgroundColor: 'transparent'
                    },
                    '85%': { 
                        backgroundColor: 'rgba(255, 255, 255, 0.35)'
                    },
                    '86%': { 
                        backgroundColor: 'transparent'
                    }
                },
                'horror-drift-slow': {
                    '0%': { 
                        transform: 'translate(0, 0) scale(1.1)'
                    },
                    '100%': { 
                        transform: 'translate(-5%, -5%) scale(1.1)'
                    }
                },
                'horror-drift-medium': {
                    '0%': { 
                        transform: 'translate(0, 0) scale(1.15)'
                    },
                    '100%': { 
                        transform: 'translate(3%, -4%) scale(1.15)'
                    }
                },
                'horror-drift-fast': {
                    '0%': { 
                        transform: 'translate(0, 0) scale(1.2)'
                    },
                    '100%': { 
                        transform: 'translate(-4%, 3%) scale(1.2)'
                    }
                },
                'horror-drift-reverse': {
                    '0%': { 
                        transform: 'translate(0, 0) scale(1.1)'
                    },
                    '100%': { 
                        transform: 'translate(2%, 4%) scale(1.1)'
                    }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
                'strobe-flash': 'strobe-flash 2.5s ease-in-out infinite',
                'horror-drift-slow': 'horror-drift-slow 60s linear infinite',
                'horror-drift-medium': 'horror-drift-medium 45s linear infinite',
                'horror-drift-fast': 'horror-drift-fast 35s linear infinite',
                'horror-drift-reverse': 'horror-drift-reverse 50s linear infinite'
            },
            fontFamily: {
                sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
                display: ['Creepster', 'cursive'],
            }
        }
    },
    plugins: [typography, containerQueries, animate]
};
