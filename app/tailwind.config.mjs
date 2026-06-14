/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    // Override default theme untuk spacing + radius yang lebih premium
    spacing: {
      '0': '0px',
      '1': '2px',
      '2': '4px',
      '3': '8px',
      '4': '12px',
      '5': '16px',
      '6': '20px',
      '7': '24px',
      '8': '32px',
      '9': '40px',
      '10': '48px',
      '12': '64px',
      '14': '80px',
      '16': '96px',
      '18': '112px',
      '20': '128px',
      '24': '160px',
      '28': '192px',
      '32': '224px',
    },
    extend: {
      colors: {
        // Premium palette
        primary: {
          DEFAULT: '#1B4332',   // Forest Green
          dark: '#0D1B14',       // Deep Green (deeper)
          deeper: '#061009',     // Almost Black
        },
        secondary: {
          DEFAULT: '#D4A574',   // Gold/Sand
          dark: '#A8845C',       // Darker gold
          light: '#E8C896',      // Lighter gold
        },
        accent: {
          DEFAULT: '#F5F0E8',    // Warm Cream
          dark: '#E8DCC8',       // Darker cream
        },
        ink: {
          DEFAULT: '#0D1B14',    // Primary text dark
          soft: '#3D4A40',       // Soft text
          mute: '#7A8479',       // Muted text
          light: '#B8BDB5',      // Very light
        },
        whatsapp: '#25D366',
        success: '#16A34A',
        danger: '#DC2626',
        gold: '#D4A574',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        quote: ['"Cormorant Garamond"', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Editorial display scale
        'hero': ['clamp(3.5rem, 9vw, 8rem)', { lineHeight: '0.95', letterSpacing: '-0.03em', fontWeight: '700' }],
        'display': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1.0', letterSpacing: '-0.02em', fontWeight: '700' }],
        'title': ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.015em', fontWeight: '700' }],
        'heading': ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        'subhead': ['1.25rem', { lineHeight: '1.5', fontWeight: '500' }],
        'body': ['1rem', { lineHeight: '1.7', fontWeight: '400' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7', fontWeight: '400' }],
        'small': ['0.875rem', { lineHeight: '1.6', fontWeight: '400' }],
        'caption': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.15em', fontWeight: '500' }],
        'eyebrow': ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.3em', fontWeight: '600' }],
      },
      letterSpacing: {
        'tightest': '-0.04em',
        'tighter': '-0.02em',
        'tight': '-0.01em',
        'normal': '0',
        'wide': '0.05em',
        'wider': '0.1em',
        'widest': '0.2em',
      },
      borderRadius: {
        'none': '0',
        'sm': '2px',
        'DEFAULT': '0',         // Sharp corners by default (premium)
        'md': '0',
        'lg': '0',
        'xl': '0',
        'full': '9999px',
        'pill': '9999px',
      },
      maxWidth: {
        'container': '1440px',
        'narrow': '720px',
        'wide': '1600px',
        'prose': '65ch',
      },
      boxShadow: {
        'none': 'none',
        'subtle': '0 1px 2px rgba(0,0,0,0.04)',
        'soft': '0 4px 24px rgba(0,0,0,0.06)',
        'md': '0 8px 32px rgba(0,0,0,0.08)',
        'lg': '0 16px 48px rgba(0,0,0,0.10)',
        'xl': '0 24px 64px rgba(0,0,0,0.12)',
        '2xl': '0 32px 80px rgba(0,0,0,0.15)',
        'gold': '0 8px 32px rgba(212, 165, 116, 0.20)',
        'inset': 'inset 0 1px 0 rgba(255,255,255,0.04)',
      },
      transitionTimingFunction: {
        'editorial': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'precise': 'cubic-bezier(0.32, 0.72, 0, 1)',
      },
      transitionDuration: {
        '250': '250ms',
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1200': '1200ms',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-down': 'fadeDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
        'slide-in-left': 'slideLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
        'slide-in-right': 'slideRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
        'scale-in': 'scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        'ken-burns': 'kenBurns 30s ease-in-out infinite alternate',
        'parallax': 'parallax 20s linear infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'marquee': 'marquee 40s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeDown: {
          '0%': { opacity: '0', transform: 'translateY(-40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(-60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        kenBurns: {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '100%': { transform: 'scale(1.08) translate(-2%, -2%)' },
        },
        parallax: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-20%)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.05)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
