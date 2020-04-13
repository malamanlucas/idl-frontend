<template>
  <v-footer
    inset
    padless
  >
  <v-layout full-width fill-height>
    <v-flex>
      <v-card
        tile
        class="flex secundary lighten-5 bluegreydark--text"
      >
        <v-row
          justify="center"
          no-gutters
        >
          <div class="bluegreylight--text pa-1 caption">
            Todos os direitos reservados <strong>Limer - {{ new Date().getFullYear() }} </strong>
          </div>
        </v-row>
      </v-card>
    </v-flex>
  </v-layout>
  </v-footer>
</template>

<script>

  export default {
    data: () => ({
      icons: [
        'mdi-linkedin',
        'mdi-instagram',
      ],
    })
  }
</script>
