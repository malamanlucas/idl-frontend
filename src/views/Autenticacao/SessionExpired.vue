<template>
  <page-base>
    <v-layout row fill-height justify-center align-center pa-6 mb-0>
      <v-flex shrink>
        <v-card>
          <v-card-title>Sessão expirada</v-card-title>
          <v-card-text>Por favor faça o login denovo na plataforma.</v-card-text>
          <v-card-actions>
            <v-btn class="text-none"  color="primary" outlined x-large :to="{ name: 'login' }">Fazer login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </page-base>
</template>

<script>
export default {
}
</script>
