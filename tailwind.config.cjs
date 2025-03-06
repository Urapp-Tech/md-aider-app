const plugin = require('tailwindcss/plugin');
const forms = require('@tailwindcss/forms');
const {
  default: flattenColorPalette,
} = require('tailwindcss/lib/util/flattenColorPalette');

function withOpacity(value) {
  return typeof value === 'function' ? value({ opacityValue: 1 }) : value;
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  important: '#app',
  prefix: 'tw-',
  corePlugins: {
    preflight: false,
  },
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        mont: ['Mont', 'sans-serif'],
      },
      rotate: {
        30: '30deg',
      },
      width: {
        'fill-available': [
          '-moz-available',
          '-webkit-fill-available',
          'stretch',
        ],
      },
      fontFamily: {
        'anek-gurmukhi': ['Anek Gurmukhi', 'serif'],
        'open-sans': ['Open Sans', 'sans-serif'],
      },
      colors: {
        'app-primary': 'rgb(var(--color-app-primary), <alpha-value>)',
        'app-secondary': 'rgb(var(--color-app-secondary), <alpha-value>)',
        'app-black': 'rgb(var(--color-app-black), <alpha-value>)',
        'app-gray': 'rgb(var(--color-app-gray), <alpha-value>)',
      },
    },
  },
  plugins: [
    forms({ strategy: 'class' }),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'ion-bg': (value) => ({
            '--background': withOpacity(value),
          }),
          'ion-text': (value) => ({
            '--color': withOpacity(value),
          }),
          'ion-color-checked': (value) => ({
            '--color-checked': withOpacity(value),
          }),
          'ion-border-color': (value) => ({
            '--border-color': withOpacity(value),
          }),
          'ion-handle-bg': (value) => ({
            '--handle-background': withOpacity(value),
          }),
          'ion-handle-bg-checked': (value) => ({
            '--handle-background-checked': withOpacity(value),
          }),
          'ion-track-bg': (value) => ({
            '--track-background': withOpacity(value),
          }),
          'ion-track-bg-checked': (value) => ({
            '--track-background-checked': withOpacity(value),
          }),
          'ion-highlight-color-focused': (value) => ({
            '--highlight-color-focused': withOpacity(value),
          }),
          'ion-highlight-color-invalid': (value) => ({
            '--highlight-color-invalid': withOpacity(value),
          }),
          'ion-highlight-color-valid': (value) => ({
            '--highlight-color-valid': withOpacity(value),
          }),
        },
        { type: ['color'], values: flattenColorPalette(theme('colors')) }
      );
    }),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'ion-rounded': (value) => ({
            '--border-radius': value,
          }),
          'ion-inner-rounded': (value) => ({
            '--inner-border-radius': value,
          }),
        },
        { values: theme('borderRadius') }
      );
    }),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'ion-border-width': (value) => ({
            '--border-width': value,
          }),
        },
        { values: flattenColorPalette(theme('borderWidth')) }
      );
    }),
    plugin(function ({ matchUtilities }) {
      matchUtilities(
        {
          'ion-border-style': (value) => ({
            '--border-style': value,
          }),
        },
        {
          values: {
            solid: 'solid',
            dashed: 'dashed',
            dotted: 'dotted',
            double: 'double',
            hidden: 'hidden',
            none: 'none',
          },
        }
      );
    }),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'ion-shadow': (value) => ({
            '--box-shadow': value,
          }),
        },
        { values: theme('boxShadow') }
      );
    }),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'ion-pt': (value) => ({
            '--padding-top': value,
          }),
          'ion-pb': (value) => ({
            '--padding-bottom': value,
          }),
          'ion-pl': (value) => ({
            '--padding-start': value,
          }),
          'ion-pr': (value) => ({
            '--padding-end': value,
          }),
          'ion-px': (value) => ({
            '--padding-start': value,
            '--padding-end': value,
          }),
          'ion-py': (value) => ({
            '--padding-top': value,
            '--padding-bottom': value,
          }),
          'ion-p': (value) => ({
            '--padding-top': value,
            '--padding-bottom': value,
            '--padding-start': value,
            '--padding-end': value,
          }),

          'ion-mt': (value) => ({
            '--margin-top': value,
          }),
          'ion-mb': (value) => ({
            '--margin-bottom': value,
          }),
          'ion-ml': (value) => ({
            '--margin-start': value,
          }),
          'ion-mr': (value) => ({
            '--margin-end': value,
          }),
          'ion-mx': (value) => ({
            '--margin-start': value,
            '--margin-end': value,
          }),
          'ion-my': (value) => ({
            '--margin-top': value,
            '--margin-bottom': value,
          }),
          'ion-m': (value) => ({
            '--margin-top': value,
            '--margin-bottom': value,
            '--margin-start': value,
            '--margin-end': value,
          }),
        },
        { values: theme('spacing') }
      );
    }),
    plugin(function ({ addVariant }) {
      addVariant('ion-native', '&::part(native)');
      addVariant('ion-label', '&::part(label)');
      addVariant('ion-image', '&::part(image)');
      addVariant('ion-container', '&::part(container)');
    }),
  ],
};
