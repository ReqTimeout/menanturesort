/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: { '2xl': '1440px' },
    },
    extend: {
      colors: {
        // Brand — Forest Green scale
        forest: {
          50: '#F0F5F1',
          100: '#D4E1D6',
          200: '#A8C3AC',
          300: '#7CA583',
          400: '#508759',
          500: '#1B4332', // PRIMARY
          600: '#163626',
          700: '#0D1B14', // dark text
          800: '#091410',
          900: '#061009', // deepest
          950: '#030806',
        },
        // Brand — Gold/Sand scale
        gold: {
          50: '#FBF7F0',
          100: '#F4E8D2',
          200: '#EBD4A8',
          300: '#E8C896',
          400: '#DEB57E',
          500: '#D4A574', // SECONDARY
          600: '#BE9160',
          700: '#A8845C', // darker
          800: '#856240',
          900: '#5C4329',
        },
        // Brand — Warm Cream
        cream: {
          50: '#F5F0E8',
          100: '#E8DCC8',
          200: '#D9C9AE',
        },
        // Neutral text
        ink: {
          500: '#3D4A40',
          700: '#7A8479',
          900: '#0D1B14',
        },
        // Status
        whatsapp: '#25D366',
        success: '#16A34A',
        danger: '#DC2626',
        // shadcn convention
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        none: '0',
        sm: '2px',
        DEFAULT: '4px',
        md: '6px',
        lg: '8px',
        xl: '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        quote: ['"Cormorant Garamond"', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'hero': ['clamp(2.75rem, 7vw, 6rem)', { lineHeight: '0.95', letterSpacing: '-0.03em', fontWeight: '700' }],
        'display': ['clamp(2.25rem, 5vw, 4rem)', { lineHeight: '1.0', letterSpacing: '-0.02em', fontWeight: '700' }],
        'title': ['clamp(1.75rem, 3.5vw, 2.75rem)', { lineHeight: '1.1', letterSpacing: '-0.015em', fontWeight: '700' }],
        'heading': ['clamp(1.375rem, 2.5vw, 1.875rem)', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        'subhead': ['1.25rem', { lineHeight: '1.5', fontWeight: '500' }],
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
        'small': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        'caption': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.15em', fontWeight: '500' }],
        'eyebrow': ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.3em', fontWeight: '600' }],
      },
      letterSpacing: {
        'tightest': '-0.04em',
        'tighter': '-0.02em',
        'tight': '-0.01em',
        'normal': '0',
        'wide': '0.05em',
        'wider': '0.1em',
        'widest': '0.3em',
      },
      transitionTimingFunction: {
        'premium': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgb(13 27 20 / 0.05)',
        'DEFAULT': '0 1px 3px 0 rgb(13 27 20 / 0.1), 0 1px 2px -1px rgb(13 27 20 / 0.1)',
        'md': '0 4px 6px -1px rgb(13 27 20 / 0.1), 0 2px 4px -2px rgb(13 27 20 / 0.1)',
        'lg': '0 10px 15px -3px rgb(13 27 20 / 0.1), 0 4px 6px -4px rgb(13 27 20 / 0.1)',
        'xl': '0 20px 25px -5px rgb(13 27 20 / 0.1), 0 8px 10px -6px rgb(13 27 20 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(13 27 20 / 0.25)',
        'gold': '0 8px 32px -8px rgba(212, 165, 116, 0.4)',
        'inner': 'inset 0 2px 4px 0 rgb(13 27 20 / 0.05)',
      },
      keyframes: {
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-in-right': {
          from: { opacity: '0', transform: 'translateX(20px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212, 165, 116, 0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(212, 165, 116, 0)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fade-in 0.6s ease-out both',
        'slide-in-right': 'slide-in-right 0.5s ease-out both',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
