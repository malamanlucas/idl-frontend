<template>
  <v-snackbar v-model="active" :timeout="0" center left v-resize="refreshWidth">
    <v-layout column align-center justify-center class="pa-0 ma-0">
      <v-row align="center" no-gutters>
        <v-col cols="auto" class="mr-5">
          <div class="body-2">Breakpoints: </div>
        </v-col>
        <v-col cols="auto">
            <div class="body-2 d-flex d-sm-none">XS < 600</div>
            <div class="body-2 d-none d-sm-flex d-md-none">SM 600~960</div>
            <div class="body-2 d-none d-md-flex d-lg-none">MD 960~1264</div>
            <div class="body-2 d-none d-lg-flex d-xl-none">LG 1264~1904</div>
            <div class="body-2 d-none d-xl-flex">XL > 1904</div>
        </v-col>
        <v-col>
          <div class="body-2">&nbsp; - {{ width }}px </div>
        </v-col>
        <v-col class="ml-5">
          <v-btn class="text-none"  icon @click="active = false">
            <v-icon large>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-layout>
  </v-snackbar>
</template>

<script>
  export default {
    data: () => ({
      active: true,
      actualWidth: 0
    }),
    computed: {
      width() {
        return this.actualWidth
      }
    },
    methods: {
      refreshWidth() {
        this.actualWidth = window.innerWidth
      }
    }
  }
</script>
