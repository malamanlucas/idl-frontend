<template>
  <v-app>
    <page-navigation />
    <page-header @on-click-menu="drawer = !drawer" />
    <router-view />
    <page-footer />
    <!-- <v-bottom-sheet v-model="envInfoActive">
      <v-sheet height="200px">
        <v-row>
          <v-col>
            <v-layout column align-center justify-center fill-height>
              <div class="text-center display-1">
                Estamos no ambiente de <span class="font-weight-bold">{{ env.VUE_APP_ENV_FRIEND }}</span>
              </div>
              <div class="headline">
                Para fechar: Clique fora ou tecle <span class="font-weight-bold">ESC</span>
              </div>
            </v-layout>
          </v-col>
          <v-col cols="auto">
            <close-icon @on-click="envInfoActive = false" />
          </v-col>
        </v-row>
      </v-sheet>
    </v-bottom-sheet> -->
    <!-- <breakpoint /> -->
  </v-app>
</template>

<script>
import Breakpoint from '@/core/components/Breakpoint'
import PageFooter from '@/core/components/PageFooter'
import autenticacaoService from '@/services/autenticacao'
import PageHeader from '@/core/components/PageHeader'
import PageNavigation from '@/core/components/PageNavigation'


export default {
  name: 'App',
  data: () => ({
    env: process.env,
    envInfoActive: true,
    drawer: false,
    items: [
        { icon: 'mdi-trending-up', text: 'Most Popular' },
        { icon: 'mdi-youtube-subscription', text: 'Subscriptions' },
        { icon: 'mdi-history', text: 'History' },
        { icon: 'mdi-playlist-play', text: 'Playlists' },
        { icon: 'mdi-clock', text: 'Watch Later' },
      ],
      items2: [
        { picture: 28, text: 'Joseph' },
        { picture: 38, text: 'Apple' },
        { picture: 48, text: 'Xbox Ahoy' },
        { picture: 58, text: 'Nokia' },
        { picture: 78, text: 'MKBHD' },
      ],
  }),
  computed: {
    theme() {
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    }
  },
  components: {
    Breakpoint,
    PageFooter,
    PageNavigation,
    PageHeader
  },
  methods: {
    isAuthenticated() {
      return autenticacaoService.isAuthenticated()
    }
  }
};
</script>
