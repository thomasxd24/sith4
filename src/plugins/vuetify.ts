// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

// Vuetify
import { createVuetify, ThemeDefinition } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const lightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: '#264653',
  },
};
const darkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    primary: '#1D353F',
  },
};
const colorblindLightTheme: ThemeDefinition = {};
const colorblindDarkTheme: ThemeDefinition = {};

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'lightTheme',
    themes: {
      lightTheme,
      darkTheme,
      colorblindLightTheme,
      colorblindDarkTheme,
    },
  },
});
