<template>
  <v-row no-gutters>
    <v-col>
      <v-select label="Tradução" outlined v-model="selected" dense
        filled :items="versoes" item-text="nome" item-value="id"></v-select>
    </v-col>
  </v-row>
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex'
  import versaoService from '@/services/versao'

  export default {
    data: () => ({
      versoes: []
    }),
    computed: {
      ...mapGetters('sentenca', ['mainVersion']),
      selected: {
        set(value) {
          this.setMainVersion(value)
        },
        get() {
          return this.mainVersion
        }
      }
    },
    methods: {
      ...mapMutations('sentenca', {
        setMainVersion: 'SET_MAIN_VERSION'
      }),
      async loadVersoes() {
        this.callAsync(async () => {
          this.versoes = (await versaoService.findAll()).data
          await this.$nextTick()
          this.selected = this.versoes.find(v => v.padrao === true).id
        })
      }
    },
    mounted() {
      this.loadVersoes()
    }
  }
</script>
