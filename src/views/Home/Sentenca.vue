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
          <v-form v-model="isValid" @submit.prevent>
            <v-text-field prepend-inner-icon="mdi-magnify" autofocus :rules="rulesSearch"
                  ref="textSearch" outlined label="Pesquisar" class="pesquisar-sentenca"
                  v-model="request.termo" @keyup.enter="search"></v-text-field>
          </v-form>
        </v-col>
        <v-col class="mb-0">
          <v-btn color="primary" @click="search" large
            :fab="$vuetify.breakpoint.xsOnly" :disabled="!isValid">
            <v-icon :left="$vuetify.breakpoint.smAndUp">mdi-magnify</v-icon>
            <div class="d-none d-sm-flex">Buscar</div>
          </v-btn>
        </v-col>
        <v-col cols="12">
          <v-row dense>
            <v-col cols="auto" class="mr-5">
              <v-checkbox v-model="request.ignoreCase" class="ma-0 pa-0"
                label="Ignorar maiusculo ou minusculas?" />
            </v-col>
            <v-col cols="auto">
              <v-checkbox v-model="request.ignoreAccent" class="ma-0 pa-0"
                label="Ignorar acentos?" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12" v-if="sentencas">
      <div class="subtitle font-weight-bold">
        {{ sentencas.total }} ocorrência(s)
      </div>

      <template v-if="isLoaded">
        <v-data-iterator
          :items="items"
          item-key="id"
          @page-count="pageCount = $event"
          class="elevation-1"
          dense
          :fixed-header="true" :items-per-page="itemsPerPage" :page.sync="page"
          hide-default-footer>
          <template #item="{ item }">
            <div class="px-2 pt-1" v-html="highlight(item.texto)" />
          </template>
        </v-data-iterator>

        <v-pagination v-if="shouldShowPagination"
          v-model="page"
          :total-visible="totalVisible"
          :length="pageCount"
          circle
          color="primary"
          class="paginnation-default"
        ></v-pagination>
      </template>

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
      rulesSearch: [
        value => !!value || 'Obrigatório'
      ],
      isValid: true,
      sentencas: null,
      request: {
        termo: '',
        ignoreCase: true,
        ignoreAccent: true
      },
      itemsPerPage: 200,
      pageCount: 0,
      totalVisible: 7,
      page: 1,
    }),
    computed: {
      isLoaded() {
        return this.sentencas !== null
      },
      items() {
        if (this.isLoaded) {
          return this.sentencas.textos
        }
        return []
      },
      shouldShowPagination() {
        return this.pageCount > 1
      }
    },
    methods: {
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
