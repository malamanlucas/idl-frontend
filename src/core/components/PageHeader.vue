<template>
  <div>
    <v-app-bar
      dense
      app
      clipped-left
      height="74"
      style="border-bottom: #e4e4e4 solid 1px; box-shadow: none;">
      <v-app-bar-nav-icon class="ml-1"  color="blue lighten-3" @click="$emit('on-click-menu')"></v-app-bar-nav-icon>
      <v-icon class="mx-4">fab fa-youtube</v-icon>
      <v-toolbar-title class="mr-4 align-center">
        <v-img src="logoAso.png"></v-img>
      </v-toolbar-title>
      <v-spacer></v-spacer>


      <v-toolbar-title>
        Olá
        <span class="font-weight-black">{{ username }}</span>
      </v-toolbar-title>
      <v-btn class="text-none mr-4 ml-2" icon color="blue" @click="logoutWrapper">
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'PageHeader',
  computed: {
    ...mapGetters('autenticacao', ['username'])
  },
  methods: {
    ...mapActions('autenticacao', ['logout']),
    logoutWrapper() {
      this.logout()
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
