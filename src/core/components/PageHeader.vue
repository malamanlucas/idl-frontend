<template>
  <div>
    <v-app-bar
      dense
      app
      clipped-left>
      <v-app-bar-nav-icon class="ml-1" @click="$emit('on-click-menu')"></v-app-bar-nav-icon>
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
