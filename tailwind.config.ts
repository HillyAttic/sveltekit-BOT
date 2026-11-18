import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        sidebar: {
          DEFAULT: '#ffffff',
          hover: '#f1f5f9',
          active: '#e2e8f0',
          border: '#e2e8f0',
        },
        accent: {
          DEFAULT: '#2563eb',
          hover: '#1d4ed8',
          light: '#eff6ff',
          muted: 'rgba(37,99,235,0.12)',
        },
        teal: {
          DEFAULT: '#0891b2',
          hover: '#0e7490',
          light: '#ecfeff',
          muted: 'rgba(8,145,178,0.12)',
        },
        surface: {
          DEFAULT: '#f8fafc',
          card: '#ffffff',
          hover: '#f1f5f9',
          border: '#e2e8f0',
        },
        ink: {
          DEFAULT: '#0f172a',
          secondary: '#334155',
          muted: '#64748b',
          inverse: '#ffffff',
        },
        success: {
          DEFAULT: '#16a34a',
          hover: '#15803d',
          light: 'rgba(22,163,74,0.1)',
        },
        danger: {
          DEFAULT: '#dc2626',
          hover: '#b91c1c',
          light: 'rgba(220,38,38,0.1)',
        },
        warning: {
          DEFAULT: '#d97706',
          hover: '#b45309',
          light: 'rgba(217,119,6,0.1)',
        },
        gold: {
          DEFAULT: '#f59e0b',
          light: '#fef3c7',
        },
      },
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        sans: ['"IBM Plex Sans"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(26,22,38,0.06), 0 1px 2px rgba(26,22,38,0.04)',
        'card-hover': '0 4px 16px rgba(26,22,38,0.08), 0 2px 6px rgba(26,22,38,0.04)',
        modal: '0 24px 64px rgba(26,22,38,0.18), 0 8px 24px rgba(26,22,38,0.10)',
        sidebar: '4px 0 32px rgba(0,0,0,0.18)',
        bold: '0 4px 0 rgba(26,22,38,0.9)',
        'glow-accent': '0 0 20px rgba(232,89,12,0.25)',
        'glow-teal': '0 0 20px rgba(12,133,153,0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.25s cubic-bezier(0.16,1,0.3,1)',
        'slide-up': 'slideUp 0.35s cubic-bezier(0.16,1,0.3,1)',
        'slide-in-right': 'slideInRight 0.35s cubic-bezier(0.16,1,0.3,1)',
        'scale-in': 'scaleIn 0.25s cubic-bezier(0.16,1,0.3,1)',
        'panel-in': 'panelIn 0.4s cubic-bezier(0.16,1,0.3,1)',
        'stagger-in': 'staggerIn 0.3s cubic-bezier(0.16,1,0.3,1) forwards',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'slide-up-sm': 'slideUpSm 0.2s cubic-bezier(0.16,1,0.3,1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUpSm: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        panelIn: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        staggerIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 12px rgba(232,89,12,0.15)' },
          '50%': { boxShadow: '0 0 24px rgba(232,89,12,0.35)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
