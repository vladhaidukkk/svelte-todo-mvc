/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,svelte}'],
  theme: {
    extend: {
      spacing: {
        5.5: '1.375rem',
        13: '3.25rem',
      },
      boxShadow: {
        '3xl': '0 2px 4px 0 rgb(0 0 0 / 20%), 0 25px 50px 0 rgb(0 0 0 / 10%)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@iconify/tailwind').addDynamicIconSelectors(),
  ],
};
