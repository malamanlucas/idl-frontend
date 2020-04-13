<template>
  <v-app>
    <router-view />
    <page-footer v-if="isAuthenticated()" />
    <v-bottom-sheet v-model="envInfoActive">
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
    </v-bottom-sheet>
    <breakpoint />
  </v-app>
</template>

<script>
import Breakpoint from '@/core/components/Breakpoint'
import PageFooter from '@/core/components/PageFooter'
import autenticacaoService from '@/services/autenticacao'


export default {
  name: 'App',
  data: () => ({
    env: process.env,
    envInfoActive: true
  }),
  computed: {
    theme() {
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    }
  },
  components: {
    Breakpoint,
    PageFooter
  },
  methods: {
    isAuthenticated() {
      return autenticacaoService.isAuthenticated()
    }
  }
};
</script>

<style>
:root {
  --primary: #006bf2;
  --secondary: #F6F7FA;
  --background: #F0F3F5;
  --grey: #535D67;
  --greylight: '#707070';
  --greysoft: '#d7d7d7';
}

.page-title{
  font-size:2em;
  font-weight:normal;
  color:var(--greylight);
}

/*
 * Tabs
 *
*/

.v-slide-group__content {
  border-bottom: solid 1px #d7d7d7;
}


/*
 * Tabs and Tooltip effects
 *
 */

.v-ripple__container {
  background: transparent;
}

.v-tab:before {
  background: transparent;
}


/*
 * Buttons
 *
*/

button:focus{
  outline-style: none !important;
}

/*
 * Pagination
 *
*/
.v-pagination__item,
.v-pagination__item--active,
.v-pagination__navigation {
  box-shadow: none !important;
}
</style>
