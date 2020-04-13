<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="display-1 font-weight-black">
        Tela do administrador:
      </v-col>
      <v-col cols="12">
        <template v-if="isActiveAdminRouterRoot">
          <v-btn color="primary" class="mr-2" :to="{ name: 'create-new-user' }">
            Criar Usuario/Senha
          </v-btn>
          <v-btn color="error" :to="{ name: 'change-password' }">Trocar Senha</v-btn>
        </template>
        <v-btn v-else color="danger" :to="{ name: 'admin' }">Voltar</v-btn>
      </v-col>
      <v-col cols="12">
        <router-view></router-view>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'admin-view',
    computed: {
      isActiveAdminRouterRoot() {
        return this.$route.name === 'admin'
      }
    }
  }
</script>
