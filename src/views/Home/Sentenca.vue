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
      <div class="title font-weight-bold">
        Buscar na bíblia por sentenças
      </div>
    </v-col>
    <v-col cols="12">
      <v-row dense align="start">
        <v-col cols="9" sm="6">
          <v-text-field prepend-inner-icon="mdi-magnify" autofocus
                ref="textSearch" outlined label="Pesquisar" class="pesquisar-sentenca"
                v-model="request.termo" @keyup.enter="search"></v-text-field>
        </v-col>
        <v-col class="mb-0">
          <v-btn color="primary" @click="search" large
            :fab="$vuetify.breakpoint.xsOnly">
            <v-icon :left="$vuetify.breakpoint.smAndUp">mdi-magnify</v-icon>
            <div class="d-none d-sm-flex">Buscar</div>
          </v-btn>
        </v-col>
        <v-col cols="12">
          <v-checkbox v-model="request.ignoreCase" class="ma-0 pa-0"
            label="Ignorar maiusculo ou minusculas?" />
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12" v-if="sentencas">
      <div class="subtitle font-weight-bold">
        {{ sentencas.total }} ocorrência(s)
      </div>

      <v-list rounded>
        <v-list-item cols="12" v-for="(texto, $textoIndex) of sentencas.textos" :key="$textoIndex">
          <v-list-item-content>
            <div v-html="highlight(texto)"></div>
          </v-list-item-content>
        </v-list-item>
      </v-list>

    </v-col>
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
  import { isEmpty, get } from 'lodash'
  import sentencaService from '@/services/sentenca'

  export default {
    data: () => ({
      sentencas: null,
      request: {
        termo: '',
        ignoreCase: true
      }
    }),
    methods: {
      async search() {
        try {
          this.showLoading()
          const response = await sentencaService.search(this.request)
          this.sentencas = response.data
          await this.$nextTick()
          this.$refs.textSearch.focus()
        } catch (e) {
          this.showErrorOnSnackbar(get(e, 'response.data.err.message', e))
        } finally {
          this.hideLoading()
        }
      },
      highlight(item) {
        if (isEmpty(this.request.termo)) {
          return item
        }
        item = item.replace(/^[\w\W.]+\d/, reference => `<i class="font-weight-bold">${reference}</i>`)
        return item.replace(new RegExp(`(${this.request.termo})`, 'gi'), '<u class="text-primary font-weight-bold">$1</u>')
      }
    }
  }
</script>
