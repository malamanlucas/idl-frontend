<template>
  <v-dialog retain-focus
    :value="value" @input="$emit('input', arguments[0])" scrollable>
    <v-card color="danger" dark>
      <v-card-text class="display-3 text-center">{{ message }}</v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['value', 'message']
  }
</script>
