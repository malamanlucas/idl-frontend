import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import pt from 'vuetify/es5/locale/pt'
import minifyTheme from 'minify-css-string'

Vue.use(Vuetify);

export default new Vuetify({
  // preset,
  lang: {
    locales: { pt },
    current: 'pt'
  },
  icons: {
    iconfont: 'mdi'
  },
  theme: {
    options: {
      minifyTheme
    },
    themes: {
      light: {
        primary: '#1867C0',
        secondary: '#5CBBF6',
        tertiary: '#E57373',
        accent: '#005CAF',
      },
    },
  },
});

// primary: '#1976D2',
// secondary: '#424242',
// accent: '#82B1FF',
// error: '#FF5252',
// info: '#2196F3',
// success: '#4CAF50',
// warning: '#FB8C00',
