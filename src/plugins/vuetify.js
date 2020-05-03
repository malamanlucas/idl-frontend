import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import pt from 'vuetify/es5/locale/pt';
// import { preset } from 'vue-cli-plugin-vuetify-preset-basil/preset'
// import { preset } from 'vue-cli-plugin-vuetify-preset-crane/preset'
// import { preset } from 'vue-cli-plugin-vuetify-preset-fortnightly/preset'
// import { preset } from 'vue-cli-plugin-vuetify-preset-owl/preset'
// import { preset } from 'vue-cli-plugin-vuetify-preset-rally/preset'
// import { preset } from 'vue-cli-plugin-vuetify-preset-reply/preset'
// import { preset } from 'vue-cli-plugin-vuetify-preset-shrine/preset'

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
    light: true
  }
  // theme: {
  //   themes: {
  //     light: {
  //       primary: '#006bf2', // #2146f5
  //       primarysoft: '#c2d4f4',
  //       primarysoft2: '#E3EAF5',
  //       secondary: '#F6F7FA', // Cinza-azulado claro
  //       background: '#F0F3F5', // #edf0f6
  //       optionprimary: '#3367d6',
  //       bluegreysoft: '#ABB4D4',
  //       bluegreydark: '#263238',
  //       bluegreylight: '#90A4AE',
  //       green: '#148EA4', // Verde
  //       grey: '#535D67', // Cinza
  //       greylight: '#707070',
  //       greysoft: '#d7d7d7',
  //       orange: '#FD701C',
  //       accent: '#82B1FF',
  //       info: '#2196F3',
  //       success: '#4caf50',
  //       warning: '#FB8C00',
  //       error: '#FF5252',
  //       clean: '#FFFFFF'
  //     },
  //   },
  // },
});

// primary: '#1976D2',
// secondary: '#424242',
// accent: '#82B1FF',
// error: '#FF5252',
// info: '#2196F3',
// success: '#4CAF50',
// warning: '#FB8C00',
