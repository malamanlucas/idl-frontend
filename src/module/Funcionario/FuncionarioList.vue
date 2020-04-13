<template>
  <div>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="funcionarios"
      :loading="loading"
      :server-items-length="perPage"
      :options.sync="options"
      :items-per-page="perPage"
    >
      <template v-slot:top>
        <FuncionarioListSearch />
      </template>
      <template #header.status="{ header }">
        <FuncionarioListStatus
          :items="statusMenuItems"
          :text="header.text"
          column="situacao"
          @on-reload="getDataFromApi()"
        />
      </template>
      <template #item.status="{ item }">
        <v-layout d-flex justify-start align-center>
          <span class="dot mr-2" :style="corStatus(item.status)"></span>
          <span>{{ nomeStatus(item.status) }}</span>
        </v-layout>
      </template>

      <template #no-data>
        <v-alert prominent type="error">#no-data Hugo modifique essa mensagem fazendo favor.</v-alert>
      </template>

      <template #no-results>#no-data Hugo modifique essa mensagem fazendo favor.</template>

      <template #item.editar>
        <FuncionarioListActions />
      </template>
    </v-data-table>

    <v-layout justify-end mt-5>
      <v-flex>
        <v-pagination
          :value="page"
          :length="lastPage"
          circle
          @input="onChangePagination"
        ></v-pagination>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { isEmpty, get } from 'lodash'

import {
  SET_PAGE,
  SET_COLUMN,
  SET_DESC,
  SET_PER_PAGE
} from '@/store/modules/funcionario'

import { STATUS_FUNCIONARIO } from '@/strings'

import FuncionarioListStatus from '@/module/Funcionario/FuncionarioListStatus'
import FuncionarioListActions from '@/module/Funcionario/FuncionarioListActions'
import FuncionarioListSearch from '@/module/Funcionario/FuncionarioListSearch'

export default {
  components: {
    FuncionarioListStatus,
    FuncionarioListActions,
    FuncionarioListSearch
  },
  data: () => ({
    headers: [
      { text: 'NOME', value: 'nome' },
      { text: 'SITUAÇÃO', value: 'status', sortable: false },
      { text: 'ÚLTIMO EXAME', value: 'aso.dt_agendamento' },
      { text: 'EMPRESA', value: 'empresa.razao_social' },
      { text: 'TAREFAS', value: 'editar', sortable: false }
    ],
    statusMenuItems: STATUS_FUNCIONARIO,
    options: {},
    selected: []
  }),
  watch: {
    options: {
      handler() {
        this.getDataFromApi()
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters('funcionario', [
      'funcionarios',
      'page',
      'lastPage',
      'total',
      'perPage',
      'loading',
      'funcionariosFiltered',
      'getFiltro'
    ])
  },
  methods: {
    ...mapActions('funcionario', ['buscaFuncionarios']),
    ...mapMutations('funcionario', {
      setPage: SET_PAGE,
      setColumn: SET_COLUMN,
      setDesc: SET_DESC,
      setPerPage: SET_PER_PAGE
    }),
    async load() {
      try {
        this.showLoading()
        this.getDataFromApi()
      } catch (e) {
        this.showErrorInSnackbar(e)
      } finally {
        this.hideLoading()
      }
    },
    async onChangePagination(page) {
      this.setPage(page)
      this.getDataFromApi()
    },
    async getDataFromApi() {
      try {
        let { sortBy, sortDesc } = this.options
        sortBy = isEmpty(sortBy) ? null : sortBy[0]
        sortDesc = sortDesc[0] ? 1 : 0

        this.setColumn(sortBy)
        this.setDesc(sortDesc)

        const { itemsPerPage } = this.options
        this.setPerPage(itemsPerPage)

        await this.buscaFuncionarios()
      } catch (error) {
        this.showErrorOnSnackbar(get(error, 'response.data.err.message'))
      }
    },
    nomeStatus(value) {
      const status = this.statusMenuItems.find(s => s.id === value)
      return status.label
    },
    corStatus(value) {
      const status = this.statusMenuItems.find(s => s.id === value)
      return {
        backgroundColor: status.color,
        boxShadow: `0 0 .4em ${status.color}`
      }
    }
  }
};
</script>

<style>
.dot {
  height: 13px;
  width: 13px;
  border-radius: 50%;
  display: inline-block;
}
.column-header {
  cursor: pointer;
}
.column-header:hover {
  color: black
}
.column-header:hover ~ .column-arrow {
  opacity: 1;
}
.column-arrow {
  opacity: 0;
  font-size: 18px !important;
}
.v-data-footer__pagination,
.v-data-footer__icons-before,
.v-data-footer__icons-after {
  display: none !important;
}
</style>
