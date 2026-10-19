/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Orange Palette
        orange: {
          50: '#FFF9F1',
          100: '#FFEDD5', // Light Orange
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316', // Primary Orange
          600: '#EA580C',
          700: '#C2410C', // Deep Orange
          800: '#9A3412',
          900: '#7C2D12',
          DEFAULT: '#F97316',
        },
        // Backward-compatible mapping for terracotta to new orange palette
        terracotta: {
          50: '#FFF9F1',
          100: '#FFEDD5', // Light orange
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316', // Primary orange (#F97316)
          600: '#F97316', // Primary brand orange
          700: '#C2410C', // Deep orange (#C2410C)
          800: '#9A3412',
          900: '#7C2D12',
          DEFAULT: '#F97316',
        },
        cream: {
          50: '#FFFDF9',
          100: '#FFF9F1', // Warm cream
          200: '#FCF4E8',
          300: '#F5E6D3',
          DEFAULT: '#FFF9F1',
        },
        sand: {
          50: '#FFFDF9',
          100: '#FFF9F1',
          200: '#F5EAE0',
          300: '#E8D5C4',
          DEFAULT: '#FFF9F1',
        },
        charcoal: {
          DEFAULT: '#292524', // Dark text (#292524)
          light: '#44403C',
          muted: '#78716C',
        },
        forest: {
          50: '#F4F7F5',
          100: '#E6ECE7',
          500: '#3D5E4D',
          700: '#2C4336',
          800: '#234133',
          900: '#172B22',
          DEFAULT: '#234133',
        },
        gold: {
          50: '#FCF9EE',
          100: '#F9F1D5',
          200: '#F1DE9E',
          400: '#E0B85C',
          500: '#C89B3C',
          DEFAULT: '#C89B3C',
        },
        whatsapp: {
          DEFAULT: '#25D366',
          hover: '#20ba5a',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Outfit', 'system-ui', 'sans-serif'],
        display: ['"Fraunces"', 'Recoleta', 'serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(249, 115, 22, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'soft-hover': '0 12px 30px -4px rgba(249, 115, 22, 0.16), 0 4px 12px -2px rgba(0, 0, 0, 0.06)',
        'premium': '0 20px 40px -8px rgba(194, 65, 12, 0.08), 0 1px 3px 0 rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}
