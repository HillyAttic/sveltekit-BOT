import type { Config } from 'tailwindcss'

/**
 * Colours resolve to the Cobalt tokens declared in src/app.css, so the whole
 * admin panel is re-themed from one place. rgb(... / <alpha-value>) keeps the
 * /10-style opacity modifiers working.
 */
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`

const config: Config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        white: token('paper-rgb'),
        black: token('graphite-rgb'),
        paper: {
          DEFAULT: token('paper-rgb'),
          2: token('paper-2-rgb'),
          3: token('paper-3-rgb'),
        },
        sidebar: {
          DEFAULT: token('paper-rgb'),
          hover: token('paper-2-rgb'),
          active: token('accent-wash-rgb'),
          border: token('rule-rgb'),
        },
        accent: {
          DEFAULT: token('accent-rgb'),
          hover: token('accent-deep-rgb'),
          light: token('accent-wash-rgb'),
          muted: token('accent-rgb'),
        },
        teal: {
          DEFAULT: token('accent-rgb'),
          hover: token('accent-deep-rgb'),
          light: token('accent-wash-rgb'),
          muted: token('accent-rgb'),
        },
        surface: {
          DEFAULT: token('paper-2-rgb'),
          card: token('paper-rgb'),
          hover: token('paper-3-rgb'),
          border: token('rule-rgb'),
        },
        ink: {
          DEFAULT: token('ink-rgb'),
          secondary: token('ink-2-rgb'),
          muted: token('muted-rgb'),
          inverse: token('paper-rgb'),
        },
        graphite: {
          DEFAULT: token('graphite-rgb'),
          2: token('graphite-2-rgb'),
          ink: token('graphite-ink-rgb'),
          muted: token('graphite-muted-rgb'),
        },
        success: {
          DEFAULT: token('success-rgb'),
          hover: token('success-rgb'),
          light: token('success-rgb'),
        },
        danger: {
          DEFAULT: token('danger-rgb'),
          hover: token('danger-rgb'),
          light: token('danger-rgb'),
        },
        warning: {
          DEFAULT: token('warning-rgb'),
          hover: token('warning-rgb'),
          light: token('warning-rgb'),
        },
        gold: {
          DEFAULT: token('gold-rgb'),
          light: token('gold-rgb'),
        },
      },
      fontFamily: {
        display: ['"Familjen Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '8px',
        sm: '6px',
      },
      boxShadow: {
        card: '0 1px 2px rgb(23 28 38 / 0.06)',
        'card-hover': '0 2px 6px rgb(23 28 38 / 0.08)',
        modal: '0 24px 64px rgb(23 28 38 / 0.18), 0 8px 24px rgb(23 28 38 / 0.1)',
        sidebar: '1px 0 0 rgb(226 230 238 / 1)',
        bold: '0 4px 0 rgb(23 28 38 / 0.9)',
        'glow-accent': '0 0 20px rgb(28 89 207 / 0.2)',
        'glow-teal': '0 0 20px rgb(28 89 207 / 0.2)',
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
          '0%, 100%': { boxShadow: '0 0 12px rgb(28 89 207 / 0.15)' },
          '50%': { boxShadow: '0 0 24px rgb(28 89 207 / 0.35)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
