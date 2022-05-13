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
    primary: '#264653',
    secondary: '#2A9D8F',
    tertiary: '#F36E4D',
  },
};
const dark: ThemeDefinition = {
  dark: true,
  colors: {
    primary: '#1D353F',
    secondary: '#2B61A1',
    tertiary: '#F45353',
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
