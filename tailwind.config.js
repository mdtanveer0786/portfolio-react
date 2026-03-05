/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
        './index.html',
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        screens: {
            'xs': '475px',
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px',
            '3xl': '1920px',
        },
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
                sm: '2rem',
                lg: '4rem',
                xl: '5rem',
                '2xl': '6rem',
            },
        },
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            fontSize: {
                'xs': ['0.75rem', { lineHeight: '1rem' }],
                'sm': ['0.875rem', { lineHeight: '1.25rem' }],
                'base': ['1rem', { lineHeight: '1.5rem' }],
                'lg': ['1.125rem', { lineHeight: '1.75rem' }],
                'xl': ['1.25rem', { lineHeight: '1.75rem' }],
                '2xl': ['1.5rem', { lineHeight: '2rem' }],
                '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
                '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
                '5xl': ['3rem', { lineHeight: '1' }],
                '6xl': ['3.75rem', { lineHeight: '1' }],
                '7xl': ['4.5rem', { lineHeight: '1' }],
                '8xl': ['6rem', { lineHeight: '1' }],
                '9xl': ['8rem', { lineHeight: '1' }],
            },
            spacing: {
                '18': '4.5rem',
                '88': '22rem',
                '128': '32rem',
                '144': '36rem',
            },
            borderRadius: {
                'lg': "var(--radius)",
                'md': "calc(var(--radius) - 2px)",
                'sm': "calc(var(--radius) - 4px)",
                'xl': '1rem',
                '2xl': '1.5rem',
                '3xl': '2rem',
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                "fade-in": {
                    from: { opacity: 0, transform: "translateY(10px)" },
                    to: { opacity: 1, transform: "translateY(0)" },
                },
                "fade-out": {
                    from: { opacity: 1, transform: "translateY(0)" },
                    to: { opacity: 0, transform: "translateY(10px)" },
                },
                "slide-in": {
                    from: { transform: "translateX(-100%)" },
                    to: { transform: "translateX(0)" },
                },
                "slide-out": {
                    from: { transform: "translateX(0)" },
                    to: { transform: "translateX(-100%)" },
                },
                "float": {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                "gradient": {
                    "0%, 100%": { backgroundPosition: "0% 50%" },
                    "50%": { backgroundPosition: "100% 50%" },
                },
                "shine": {
                    from: { backgroundPosition: "200% center" },
                    to: { backgroundPosition: "-200% center" },
                },
                "pulse-subtle": {
                    "0%, 100%": { opacity: 1 },
                    "50%": { opacity: 0.5 },
                },
                "spin-slow": {
                    from: { transform: "rotate(0deg)" },
                    to: { transform: "rotate(360deg)" },
                },
                "bounce-slow": {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                },
                "wave": {
                    "0%": { transform: "translateX(0)" },
                    "100%": { transform: "translateX(-50%)" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "fade-in": "fade-in 0.5s ease-out",
                "fade-out": "fade-out 0.5s ease-out",
                "slide-in": "slide-in 0.3s ease-out",
                "slide-out": "slide-out 0.3s ease-out",
                "float": "float 6s ease-in-out infinite",
                "gradient": "gradient 15s ease infinite",
                "shine": "shine 3s linear infinite",
                "pulse-subtle": "pulse-subtle 2s ease-in-out infinite",
                "spin-slow": "spin-slow 20s linear infinite",
                "bounce-slow": "bounce-slow 3s ease-in-out infinite",
                "wave": "wave 30s linear infinite",
            },
            backdropBlur: {
                xs: '2px',
            },
            boxShadow: {
                'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
                'medium': '0 4px 20px -3px rgba(0, 0, 0, 0.1), 0 10px 25px -2px rgba(0, 0, 0, 0.05)',
                'hard': '0 10px 40px -5px rgba(0, 0, 0, 0.15), 0 20px 40px -2px rgba(0, 0, 0, 0.08)',
                'glow': '0 0 20px rgba(59, 130, 246, 0.5)',
                'inner-lg': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
            },
            zIndex: {
                '60': '60',
                '70': '70',
                '80': '80',
                '90': '90',
                '100': '100',
            },
        },
    },
    plugins: [],
}