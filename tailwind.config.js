/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Brand Colors - Sophisticated Blue
        primary: {
          50: '#1e293b',   // Darkest for backgrounds
          100: '#334155',  // Dark containers
          200: '#475569',  // Medium dark
          300: '#64748b',  // Muted elements
          400: '#94a3b8',  // Secondary text
          500: '#3b82f6',  // Main brand accent
          600: '#2563eb',  // Hover states
          700: '#1d4ed8',  // Active states
          800: '#1e40af',  // Deep accent
          900: '#1e3a8a',  // Deepest accent
        },

        // Accent Colors - Elegant Purple
        accent: {
          50: '#1e1b4b',   // Dark purple background
          100: '#312e81',  // Purple container
          200: '#3730a3',  // Medium purple
          300: '#4338ca',  // Light purple
          400: '#6366f1',  // Bright purple
          500: '#8b5cf6',  // Main accent
          600: '#a855f7',  // Hover purple
          700: '#c084fc',  // Light accent
          800: '#d8b4fe',  // Very light
          900: '#e9d5ff',  // Lightest
        },

        // Success Colors - Refined Green
        success: {
          50: '#064e3b',   // Dark green
          100: '#065f46',  // Green container
          200: '#047857',  // Medium green
          300: '#059669',  // Bright green
          400: '#10b981',  // Success accent
          500: '#34d399',  // Main success
          600: '#6ee7b7',  // Light success
          700: '#9deccd',  // Very light
          800: '#c6f6d5',  // Lightest
          900: '#d1fae5',  // Palest
        },

        // Warning Colors - Warm Amber
        warning: {
          50: '#451a03',   // Dark amber
          100: '#78350f',  // Amber container
          200: '#92400e',  // Medium amber
          300: '#d97706',  // Bright amber
          400: '#f59e0b',  // Warning accent
          500: '#fbbf24',  // Main warning
          600: '#fcd34d',  // Light warning
          700: '#fde68a',  // Very light
          800: '#fef3c7',  // Lightest
          900: '#fffbeb',  // Palest
        },

        // Error Colors - Sophisticated Red
        error: {
          50: '#450a0a',   // Dark red
          100: '#7f1d1d',  // Red container
          200: '#991b1b',  // Medium red
          300: '#dc2626',  // Bright red
          400: '#ef4444',  // Error accent
          500: '#f87171',  // Main error
          600: '#fca5a5',  // Light error
          700: '#fecaca',  // Very light
          800: '#fee2e2',  // Lightest
          900: '#fef2f2',  // Palest
        },

        // Dark Theme Backgrounds
        dark: {
          50: '#0f172a',   // Deepest background
          100: '#1e293b',  // Main background
          200: '#334155',  // Card background
          300: '#475569',  // Elevated elements
          400: '#64748b',  // Borders
          500: '#94a3b8',  // Muted text
          600: '#cbd5e1',  // Secondary text
          700: '#e2e8f0',  // Primary text
          800: '#f1f5f9',  // Bright text
          900: '#f8fafc',  // Brightest text
        },

        // Background Colors - Dark Theme
        background: {
          primary: '#0f172a',    // Main dark background
          secondary: '#1e293b',  // Card backgrounds
          tertiary: '#334155',   // Elevated elements
        },

        // Text Colors - Dark Theme
        text: {
          primary: '#f8fafc',    // Bright white text
          secondary: '#e2e8f0',  // Light gray text
          tertiary: '#94a3b8',   // Muted text
          inverse: '#0f172a',    // Dark text on light backgrounds
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
