<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" icon class="text-none" color="primary">
        <v-icon style="font-size: 30px">mdi-dots-horizontal</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item @click="doAction" v-for="(action, i ) in actions" :key="i">
        <v-list-item-icon>
          <v-icon>{{ action.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ action.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  data: () => ({
    actions: [
      {
        text: 'Editar',
        icon: 'mdi-account-edit'
      },
      {
        text: 'Excluir',
        icon: 'mdi-delete'
      }
    ]
  }),
  methods: {
    doAction() {}
  }
};
</script>
