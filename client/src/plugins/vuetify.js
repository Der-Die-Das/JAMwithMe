import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  customVariables: ['clientVuetify/src/scss/variables.scss'],
  theme: {
      options: {
        customProperties: true,

      },
    themes: {
      light: {
        primary: '#212121',
        secondary: '#5ab4ff',
        accent: '#ffffff',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      },
    },
  },
});
