<template>
  <v-menu open-on-hover :close-on-content-click="false"
              auto right offset-y>
    <template #activator="{ on }">
      <slot :on="on" name="activator"></slot>
    </template>
    <v-list class="ma-0 pa-0">
      <v-list-item class="ma-0 pa-0">
        <v-btn @click="$emit('on-click-edit', empresa)" class="text-none"  small text color="primary" outlined>Editar dados</v-btn>
      </v-list-item>
      <v-list-item class="ma-0 pa-0">
        <v-btn class="text-none" @click="$emit('on-click-funcao', empresa)" small text color="primary" outlined>Funções</v-btn>
      </v-list-item>
      <v-list-item class="ma-0 pa-0">
        <v-btn class="text-none" @click="$emit('on-click-setor', empresa)" small text color="primary" outlined>Setores</v-btn>
      </v-list-item>
      <v-list-item class="ma-0 pa-0">
        <v-btn class="text-none" @click="$emit('on-click-view', empresa)" small text color="primary" outlined disabled>Ver empresa</v-btn>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
  export default {
    props: ['empresa']
  }
</script>
