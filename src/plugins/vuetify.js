import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import pt from 'vuetify/es5/locale/pt';
import { preset } from 'vue-cli-plugin-vuetify-preset-basil/preset'
// import { preset } from 'vue-cli-plugin-vuetify-preset-crane/preset'
// import { preset } from 'vue-cli-plugin-vuetify-preset-fortnightly/preset'
// import { preset } from 'vue-cli-plugin-vuetify-preset-owl/preset'
// import { preset } from 'vue-cli-plugin-vuetify-preset-rally/preset'
// import { preset } from 'vue-cli-plugin-vuetify-preset-reply/preset'
// import { preset } from 'vue-cli-plugin-vuetify-preset-shrine/preset'

Vue.use(Vuetify);

export default new Vuetify({
  preset,
  lang: {
    locales: { pt },
    current: 'pt'
  },
  icons: {
    iconfont: 'mdi'
  },
});

// primary: '#1976D2',
// secondary: '#424242',
// accent: '#82B1FF',
// error: '#FF5252',
// info: '#2196F3',
// success: '#4CAF50',
// warning: '#FB8C00',
