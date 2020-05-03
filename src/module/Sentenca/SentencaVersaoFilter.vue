<template>
  <v-row no-gutters>
    <v-col>
      <v-select label="Tradução" outlined v-model="selected" dense
        filled :items="versoes" item-text="nome" item-value="id"></v-select>
    </v-col>
    <v-col>
      <v-combobox
        v-model="versionsCompareWrapper"
        :items="avaiableVersoesCompare"
        label="Traduções comparar"
        item-text="abreviacao" item-value="id"
        multiple dense outlined small-chips
      ></v-combobox>
    </v-col>
  </v-row>
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex'
  import versaoService from '@/services/versao'

  export default {
    data: () => ({
      versoes: [],
    }),
    computed: {
      ...mapGetters('sentenca', ['mainVersion', 'versionsCompare']),
      selected: {
        set(value) {
          this.versionsCompareWrapper = this.versionsCompareWrapper.filter(v => v.id !== value)
          this.setMainVersion(value)
        },
        get() {
          return this.mainVersion
        }
      },
      versionsCompareWrapper: {
        set(value) {
          this.setVersionsCompare(value)
        },
        get() {
          return this.versionsCompare
        }
      },
      avaiableVersoesCompare() {
        return this.versoes.filter(v => v.id !== this.mainVersion)
      }
    },
    methods: {
      ...mapMutations('sentenca', {
        setMainVersion: 'SET_MAIN_VERSION',
        setVersionsCompare: 'SET_VERSIONS_COMPARE'
      }),
      async loadVersoes() {
        this.callAsync(async () => {
          this.versoes = (await versaoService.findAll()).data
          await this.$nextTick()
          this.selectVersionsCompareDefault()
          this.selected = this.versoes.find(v => v.padrao === true).id
        })
      },
      async selectVersionsCompareDefault() {
        const defaultVersionsCompare = [4, 8, 12]
        this.versionsCompareWrapper = this.versoes
          .filter(v => defaultVersionsCompare.some(d => d === v.id))
      }
    },
    mounted() {
      this.loadVersoes()
    }
  }
</script>
