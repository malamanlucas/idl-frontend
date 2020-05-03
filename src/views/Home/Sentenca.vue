<template>
  <v-row no-gutters>
    <v-col cols="12" class="mb-3">
      <v-btn ripple color="error" link :to="{ name: 'welcome' }">
        <v-icon left large>mdi-arrow-left-bold</v-icon>
        <div>
          Voltar
        </div>
      </v-btn>
    </v-col>
    <v-col cols="12">
      <v-row no-gutters>
        <v-col cols="auto" class="mr-3">
          <div class="title font-weight-bold">
            Buscar na bíblia por sentenças
          </div>
        </v-col>
        <v-col>
          <SentencaVersaoFilter />
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <v-row dense align="start">
        <v-col cols="9" sm="6">
          <v-form v-model="isValid" @submit.prevent>
            <v-text-field prepend-inner-icon="mdi-magnify" autofocus :rules="rulesSearch"
                  ref="textSearch" outlined label="Pesquisar" class="pesquisar-sentenca"
                  v-model="termo" @keyup.enter="search"></v-text-field>
          </v-form>
        </v-col>
        <v-col class="mb-0">
          <v-btn color="primary" @click="search" large
            :fab="$vuetify.breakpoint.xsOnly" :disabled="!isValid">
            <v-icon :left="$vuetify.breakpoint.smAndUp">mdi-magnify</v-icon>
            <div class="d-none d-sm-flex">Buscar</div>
          </v-btn>
        </v-col>

      </v-row>
      <v-row no-gutters>
        <v-col cols="12">
          <v-row dense>
            <v-col cols="auto" class="mr-5">
              <v-checkbox v-model="ignoreCase" class="ma-0 pa-0"
                label="Ignorar maiusculo ou minusculas?" />
            </v-col>
            <v-col cols="auto">
              <v-checkbox v-model="ignoreAccent" class="ma-0 pa-0"
                label="Ignorar acentos?" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>

    <SentencaList :sentencas="sentencas" :termo="termo" @on-item-expanded="focusInTextSearch" />
  </v-row>
</template>

<style lang="scss" >
  .pesquisar-sentenca {
    .v-text-field__details {
      display: none !important;
    }
  }
</style>

<script>
  import { mapGetters } from 'vuex'
  import { isEmpty, get } from 'lodash'
  import sentencaService from '@/services/sentenca'
  import SentencaVersaoFilter from '@/module/Sentenca/SentencaVersaoFilter'
  import SentencaList from '@/module/Sentenca/SentencaList'

  export default {
    data: () => ({
      rulesSearch: [
        value => !!value || 'Obrigatório'
      ],
      isValid: true,
      sentencas: null,
      termo: '',
      ignoreCase: true,
      ignoreAccent: true,
    }),
    components: {
      SentencaList,
      SentencaVersaoFilter,
    },
    computed: {
      ...mapGetters('sentenca', ['mainVersion']),
      request() {
        return {
          termo: this.termo,
          ignoreCase: this.ignoreCase,
          ignoreAccent: this.ignoreAccent,
          versoes: [this.mainVersion]
        }
      }
    },
    methods: {
      focusInTextSearch() {
        this.$refs.textSearch.focus()
      },
      async search() {
        if (!this.isValid) {
          this.$refs.textSearch.focus()
          return
        }
        try {
          this.showLoading()
          const response = await sentencaService.search(this.request)
          this.sentencas = response.data
          await this.$nextTick()
          this.focusInTextSearch()
        } catch (e) {
          this.showErrorOnSnackbar(get(e, 'response.data.err.message', e))
        } finally {
          this.hideLoading()
        }
      }
    }
  }
</script>
