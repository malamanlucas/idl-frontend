<template>
  <v-snackbar
      :value="value" @input="$emit('input', arguments[0])"
      color="danger"
      :timeout="5000"
      multi-line top
    >
    <v-container class="ma-0 pa-0">
      <v-row justify="space-between" align="center">
        <v-col>
          {{ message }}
        </v-col>
        <v-col cols="auto" class="mr-1">
          <v-btn class="text-none"
            color="red"
            text
            @click.stop="hideErrorOnSnackbar"
          >
            FECHAR
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-snackbar>
</template>

<script>
  export default {
    props: ['value', 'message']
  }
</script>
