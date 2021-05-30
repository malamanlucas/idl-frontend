<template>
  <v-app-bar
    app
    fixed
    elevate-on-scroll>
    <v-toolbar-title class="display-1 mr-2">
      Igreja dos loucos
    </v-toolbar-title>

    <v-row no-gutters>
      <v-col cols="3">
        <v-btn v-if="shouldSeeLinkSentenca" link color="info" rounded :to="{ name: 'sentenca' }">
          Buscar na bíblia
        </v-btn>
      </v-col>
      <v-col>
        <v-btn v-if="shouldSeeLinkMergePdf" link color="primary" rounded :to="{ name: 'merge-pdf' }">
          Merge PDF
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
    shouldSeeLinkSentenca() {
      return this.$route.name !== 'sentenca'
    },
    shouldSeeLinkMergePdf() {
      return this.$route.name !== 'merge-pdf'
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
