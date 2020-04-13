import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import pt from 'vuetify/es5/locale/pt';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#006bf2', // #2146f5
        primarysoft: '#c2d4f4',
        primarysoft2: '#E3EAF5',
        secondary: '#F6F7FA', // Cinza-azulado claro
        background: '#F0F3F5', // #edf0f6
        optionprimary: '#3367d6',
        bluegreysoft: '#ABB4D4',
        bluegreydark: '#263238',
        bluegreylight: '#90A4AE',
        green: '#148EA4', // Verde
        grey: '#535D67', // Cinza
        greylight: '#707070',
        greysoft: '#d7d7d7',
        orange: '#FD701C',
        accent: '#82B1FF',
        info: '#2196F3',
        success: '#4caf50',
        warning: '#FB8C00',
        error: '#FF5252',
        clean: '#FFFFFF'
      },
    },
  },
  lang: {
    locales: { pt },
    current: 'pt'
  },
  icons: {
    iconfont: 'mdi'
  },
});
