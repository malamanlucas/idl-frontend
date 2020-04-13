module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        moment: 'moment/src/moment'
      }
    }
  },
  transpileDependencies: [
    'vuetify'
  ],
  pluginOptions: {
    moment: {
      locales: [
        'pt-br'
      ]
    }
  }
}
