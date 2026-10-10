/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        terracotta: {
          50: '#FDF7F3',
          100: '#FBECE3',
          200: '#F6D7C3',
          300: '#EEB999',
          400: '#E4986C',
          500: '#DA8B5A',
          600: '#D97746', // Primary Brand Terracotta
          700: '#B8582C',
          800: '#944423',
          900: '#7A381F',
          DEFAULT: '#D97746',
        },
        cream: {
          50: '#FDFBF8',
          100: '#FAF7F2',
          200: '#F5EFE6',
          300: '#ECE2D3',
          DEFAULT: '#FAF7F2',
        },
        sand: {
          50: '#FAF8F5',
          100: '#F4EFEA',
          200: '#E9E0D7',
          DEFAULT: '#F4EFEA',
        },
        sage: {
          50: '#F4F7F5',
          100: '#E6ECE7',
          200: '#C7D7CB',
          300: '#A4BEAA',
          400: '#7B9E84', // Soft Sage Green
          500: '#64876D',
          DEFAULT: '#7B9E84',
        },
        forest: {
          50: '#F1F4F2',
          100: '#DDE5DF',
          500: '#3D5E4D',
          700: '#2C4336',
          800: '#234133', // Deep Forest Green
          900: '#172B22',
          DEFAULT: '#234133',
        },
        gold: {
          50: '#FCF9EE',
          100: '#F9F1D5',
          200: '#F1DE9E',
          400: '#E0B85C',
          500: '#C89B3C', // Muted Warm Gold
          DEFAULT: '#C89B3C',
        },
        charcoal: {
          DEFAULT: '#2D2B2A',
          light: '#4A4644',
          muted: '#736E6A',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Outfit', 'system-ui', 'sans-serif'],
        display: ['"Fraunces"', 'Recoleta', 'serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(217, 119, 70, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'soft-hover': '0 12px 30px -4px rgba(217, 119, 70, 0.14), 0 4px 12px -2px rgba(0, 0, 0, 0.06)',
        'premium': '0 20px 40px -8px rgba(35, 65, 51, 0.08), 0 1px 3px 0 rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}
