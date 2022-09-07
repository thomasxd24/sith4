// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

// Vuetify
import { createVuetify, ThemeDefinition } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const light: ThemeDefinition = {
  dark: false,
  colors: {
    primary: '#0d1117',
    secondary: '#161b22',
    tertiary: '#21262d',
    gray: '#a5afb9',
    light_gray: '#c6cdd5',
    white: 'ecf2f8',
    danger: '#ff1a0a',
    warning: '#faa356',
    success: '#7ce38b',
    info: '#56b1ff',
    link: '#3592e4',
    purple: '#6f42c1',
  },
};
const dark: ThemeDefinition = {
  dark: true,
  colors: {
    primary: '#0d1117',
    secondary: '#161b22',
    tertiary: '#21262d',
    gray: '#6a737d',
    light_gray: '#c6cdd5',
    white: 'ecf2f8',
    danger: '#aa3028',
    warning: '#e27c22',
    success: '#3e8949',
    info: '#a2d2fb',
    link: '#77bdfb',
    purple: '#6f42c1',
  },
};

const colorblindLight: ThemeDefinition = {
  dark: false,
  colors: {},
};
const colorblindDark: ThemeDefinition = {
  dark: true,
  colors: {},
};

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light,
      dark,
      colorblindLight,
      colorblindDark,
    },
  },
});
