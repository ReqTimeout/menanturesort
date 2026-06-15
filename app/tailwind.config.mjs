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
          soft: '#3D4A40',
          mute: '#7A8479',
        },
        // Status
        whatsapp: '#25D366',
        // Semantic colors (V5.2) — untuk ROI/income/urgency/badge
        success: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
          DEFAULT: '#2D6A4F',
        },
        warning: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#D97706',
          600: '#B5651D',
          700: '#92400E',
          800: '#78350F',
          900: '#451A03',
          DEFAULT: '#B5651D',
        },
        danger: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
          800: '#9D2A2A',
          900: '#7F1D1D',
          DEFAULT: '#9D2A2A',
        },
        info: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#1B5E8C',
          700: '#1E40AF',
          800: '#1E3A8A',
          900: '#172554',
          DEFAULT: '#1B5E8C',
        },
        // Villa type identifiers (V5.2) — untuk badge/card highlight per villa
        villa: {
          bijak: '#A8845C',
          idaman: '#D4A574',
          mapan: '#1B4332',
        },
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
        display: ['"Fraunces"', '"Plus Jakarta Sans"', 'Georgia', 'serif'],
        displayAlt: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        quote: ['"Fraunces"', '"Plus Jakarta Sans"', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'hero': ['clamp(2.5rem, 5vw, 4.5rem)', { lineHeight: '0.95', letterSpacing: '-0.03em', fontWeight: '700' }],
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
        'slide-in-left': {
          from: { opacity: '0', transform: 'translateX(-20px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212, 165, 116, 0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(212, 165, 116, 0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'counter': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        // V5.2 — additional animations
        'text-shimmer': {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'breathe': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.85' },
        },
        'ping-soft': {
          '0%': { transform: 'scale(1)', opacity: '0.6' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
        'scroll-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(8px)' },
        },
        'reveal-up': {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fade-in 0.6s ease-out both',
        'slide-in-right': 'slide-in-right 0.5s ease-out both',
        'slide-in-left': 'slide-in-left 0.5s ease-out both',
        'scale-in': 'scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
        'counter': 'counter 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        // V5.2
        'text-shimmer': 'text-shimmer 3s linear infinite',
        'breathe': 'breathe 3s ease-in-out infinite',
        'ping-soft': 'ping-soft 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'scroll-bounce': 'scroll-bounce 2s ease-in-out infinite',
        'reveal-up': 'reveal-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [],
};
