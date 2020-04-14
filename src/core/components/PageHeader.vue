<template>
  <v-app-bar
    app
    fixed
    elevate-on-scroll>
    <v-toolbar-title class="display-1 mr-2">
      Igreja dos loucos
    </v-toolbar-title>

    <v-row>
      <v-col>
        <v-btn v-if="shouldSeeLink" link color="info" rounded :to="{ name: 'sentenca' }">
          Buscar na bíblia
        </v-btn>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'PageHeader',
  computed: {
    ...mapGetters('autenticacao', ['username']),
    shouldSeeLink() {
      return this.$route.name !== 'sentenca'
    }
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
