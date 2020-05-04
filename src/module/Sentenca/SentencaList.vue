<template>
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
        dense :single-expand="false"
        :fixed-header="true" :items-per-page="itemsPerPage" :page.sync="page"
        hide-default-footer>
        <template #item="{ item, expand, isExpanded }">
          <v-hover #default="{ hover }">
            <v-card :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }">
              <div @click.self.stop="toggleExpand(isExpanded, item, expand)"
                class="px-2 pt-1" v-html="highlight(item.texto)" />
            </v-card>
          </v-hover>
          <template v-if="isExpanded">
            <div class="pl-5 pr-3" v-for="(texto, index) of item.textosComparados" :key="index">
              <span class="body-2" v-html="highlightSubTexto(texto.textoMontado)" />
            </div>
          </template>
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
</template>

<script>
  import { isEmpty, get } from 'lodash'
  import { mapGetters } from 'vuex'
  import sentencaService from '@/services/sentenca'
  import delay from 'delay'

  export default {
    props: ['sentencas', 'termo'],
    data: () => ({
      itemsPerPage: 200,
      pageCount: 0,
      totalVisible: 7,
      page: 1
    }),
    computed: {
      ...mapGetters('sentenca', ['mainVersion', 'versionsCompare']),
      shouldShowPagination() {
        return this.pageCount > 1
      },
      isLoaded() {
        return this.sentencas !== null
      },
      items() {
        if (this.isLoaded) {
          return this.sentencas.textos
        }
        return []
      },
      versionsIdCompare() {
        return this.versionsCompare.map(e => e.id)
      }
    },
    methods: {
      highlightSubTexto(item) {
        item = item.replace(/^[\w\W.]+\d/, reference => `<i class="font-weight-bold">${reference}</i>`)
        return item
      },
      highlight(item) {
        item = item.replace(/^[\w\W.]+\d/, reference => `<i class="font-weight-bold">${reference}</i>`)
        if (isEmpty(this.termo)) {
          return item
        }
        return item.replace(new RegExp(`(${this.termo})`, 'gi'), '<u class="text-primary font-weight-bold">$1</u>')
      },
      async toggleExpand(isExpanded, item, expand) {
        if (!isExpanded) {
          await this.callAsync(async () => {
            const response = await sentencaService
              .findOtherVersionsByVersiculoKey({
                versiculoId: item.versiculoId,
                livroId: item.livroId,
                capituloId: item.capituloId,
                versoesId: this.versionsIdCompare
              })
            this.$set(item, 'textosComparados', response.data)
            await this.$nextTick()
            await delay(300);
            expand(true)
            this.$emit('on-item-expanded')
          })
        } else {
          expand(false)
          this.$set(item, 'textosComparados', [])
          this.$emit('on-item-expanded')
        }
      }
    }
  }
</script>
