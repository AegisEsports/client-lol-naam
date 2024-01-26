import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        icon: '0 3px 10px rgb(0 0 0 / 0.5)',
      },
    },
  },
  plugins: [require('daisyui')],
} satisfies Config;
