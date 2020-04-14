<template>
  <v-row no-gutters>
    <v-col cols="12">
      <div class="display-1">Glória a Deus</div>
    </v-col>
    <v-col>
      <v-row dense>
        <v-col>
          <v-card class="pa-5" color="primary" align="center">Primary</v-card>
        </v-col>
        <v-col>
          <v-card class="pa-5" color="secondary" align="center">Secondary</v-card>
        </v-col>
        <v-col>
          <v-card class="pa-5" color="accent" align="center">Accent</v-card>
        </v-col>
        <v-col>
          <v-card class="pa-5" color="error" align="center">Error</v-card>
        </v-col>
        <v-col>
          <v-card class="pa-5" color="info" align="center">Info</v-card>
        </v-col>
        <v-col>
          <v-card class="pa-5" color="success" align="center">Success</v-card>
        </v-col>
        <v-col>
          <v-card class="pa-5" color="warning" align="center">warning</v-card>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col v-for="(v, index) of 10" :key="index" cols="12" class="display-3">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia, sed.
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    data: () => ({
    })
  }
</script>
