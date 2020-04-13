<template>
  <v-layout row align-center mx-2>
    <v-flex>
      <v-chip small
        class="mr-4" color="primarysoft">
        <span class="primary--text caption">
          {{ qtd }}
        </span>
      </v-chip>
    </v-flex>
    <v-flex pl-1>
      <div style="text-transform: none;">
        {{ itemTab.label }}
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    props: ['itemTab'],
    computed: {
      ...mapGetters('empresa', ['qtdEmpresas', 'qtdCorporacoes']),
      qtd() {
        if (this.itemTab.value === 'empresa') {
          return this.qtdEmpresas
        }
        return this.qtdCorporacoes
      }
    }
  }
</script>
