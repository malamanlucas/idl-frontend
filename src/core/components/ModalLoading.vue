<template>
  <v-dialog retain-focus
    :value="value" @input="$emit('input', arguments[0])"
    no-click-animation content-class="containerOverlay"
    persistent fullscreen :transition="false"
  >
    <v-container fill-height full-width fluid pa-0 ma-0>
      <v-layout row fill-height full-width justify-center align-start>
        <v-flex xs12>
          <v-card>
            <v-progress-linear
              indeterminate
              height="10"
              reactive
              color="primary"
            ></v-progress-linear>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-dialog>
</template>

<style lang="scss">
  .containerOverlay {
    background: rgba(black, .4);
  }
</style>

<script>
  export default {
    props: ['value']
  }
</script>
