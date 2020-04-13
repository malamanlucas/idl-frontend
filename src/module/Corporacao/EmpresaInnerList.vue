<template>
  <v-row no-gutters>
    <v-col cols="12" class="mt-10">
      <v-text-field
        v-model="razaoSocial"
        append-icon="mdi-search"
        prepend-inner-icon="mdi-magnify"
        color="primary"
        label="Pesquisar"
        placeholder="Busque uma empresa deste grupo"
        background-color="primarysoft2"
        class="mx-4 mb-10"
        flat
        single-line
        hide-details
        solo-inverted
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-data-table
        :dense="false" item-key="id" @page-count="pageCount = $event"
        :fixed-header="true" :items-per-page="itemsPerPage" :page.sync="page"
        :headers="headers" :items="itemsFiltered" hide-default-footer>

        <template #header.name="{ header }">
          <slot name="headerName">{{ header.text }}</slot>
        </template>

        <template #no-data>
          <v-alert prominent type="error">
            #no-data Hugo modifique essa mensagem fazendo favor.
          </v-alert>
        </template>

        <template #no-results>
          #no-data Hugo modifique essa mensagem fazendo favor.
        </template>

        <template #item.razaoSocial="{ item }">
          {{ item.razaoSocial }}
        </template>

        <template #item.cnpj="{ item }">
          {{ item.cnpj | cnpj }}
        </template>

        <template #item.qtdColaborador="{ item }">
          {{ item.qtdColaborador }}
        </template>

        <template #item.acoes="{ item }">
          <EmpresaActions :empresa="item"
            @on-click-edit="$emit('on-click-edit', arguments[0])"
            @on-click-funcao="$emit('on-click-funcao', arguments[0])"
            @on-click-setor="$emit('on-click-setor', arguments[0])"
            @on-click-view="$emit('on-click-view', arguments[0])">
            <template #activator="{ on }">
              <v-btn v-on="on" class="text-none mx-2" depressed fab dark small color="transparent">
                <v-icon color="grey">mdi-dots-horizontal</v-icon>
              </v-btn>
            </template>
          </EmpresaActions>
        </template>

      </v-data-table>
    </v-col>
    <v-col cols="12" class="mt-10 mb-1">
      <v-row align="center" justify="space-between" no-gutters>
        <v-col order="1" order-md="2" cols="12" md="6"
          :class="{'mb-3': $vuetify.breakpoint.smAndDown}">
          <v-pagination
            v-model="page"
            :length="pageCount"
            :total-visible="totalVisible"
            circle
            color="primary"
            class="paginnation-default"
          ></v-pagination>
        </v-col>
        <v-col order="2" order-md="1" cols="12" md="6">
          <v-row no-gutters align="center" justify="center" justify-md="start" class="pointer"
            @click="$emit('on-click-add-in-group')">
            <v-col cols="auto">
              <v-btn class="text-none"  color="primary" dark fab
                small>
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="auto" md="9" class="ml-1">
              <div class="d-block">
                <div class="body-2 text-truncate">
                  Adicionar uma nova empresa a este grupo
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
  import { compareTextLettersOnly } from '@/core/utils/comparatorUtils'
  import EmpresaActions from '@/module/Empresa/EmpresaActions'

  export default {
    props: ['empresas'],
    data: () => ({
      headers: [
        { text: 'Razão social', value: 'razaoSocial' },
        { text: 'CNPJ', value: 'cnpj' },
        { text: 'Colaboradores', value: 'qtdColaborador' },
        { text: 'Ações', value: 'acoes', sortable: false }
      ],
      razaoSocial: '',
      itemsPerPage: 4,
      totalVisible: 7,
      pageCount: 0,
      page: 1
    }),
    components: {
      EmpresaActions
    },
    computed: {
      itemsFiltered() {
        let empresasFiltered = this.empresas

        // if (state.busca.empresas.filtro.status !== STATUS_EMPRESA.TODAS) {
        //   empresasFiltered = empresasFiltered.filter(e => e.status === state.busca.empresas.filtro.status)
        // }

        if (this.razaoSocial.length > 0) {
          empresasFiltered = empresasFiltered.filter(e => compareTextLettersOnly(e.razaoSocial, this.razaoSocial))
        }
        return empresasFiltered
      }
    }
  }
</script>
