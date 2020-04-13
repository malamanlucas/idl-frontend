<template>
  <manager-base @on-click-add="createNewEmpresa">
    <template #modals>
      <EmpresaSteppers :activeStep.sync="activeStep" />
    </template>
    <template #textSearch>
        <v-text-field
          flat
          hide-details
          v-model="razaoSocial"
          label="Pesquisar"
          placeholder="Buscar empresa"
          color="primary"
          background-color="primarysoft2"
          prepend-inner-icon="mdi-magnify"
          rounded
          solo-inverted
      ></v-text-field>
    </template>

    <template #filtroActions>
      <v-select
        v-model="status"
        :items="statusesEmpresa"
        item-text="label"
        item-value="value"
        flat
        :class="{'caption': $vuetify.breakpoint.xsOnly, 'body-1': $vuetify.breakpoint.smAndUp}"
      >
      </v-select>
    </template>

    <template #list>
      <empresa-list @on-click-add="createNewEmpresa"
        @on-click-edit="startEditingEmpresa(arguments[0])"
        @on-click-setor="startEditingSetor(arguments[0])"
        @on-click-funcao="startEditingFuncao(arguments[0])" />
    </template>
  </manager-base>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import { STATUS_EMPRESA } from '@/strings'
  import { SET_FILTRO_EMPRESA, SET_CORPORACAO_ID_IN_EMPRESA } from '@/store/modules/empresa'
  import EmpresaList from '@/module/Empresa/EmpresaList'
  import managerBaseMixin from '@/core/components/ManagerBase/manager-base-mixin'


  export default {
    mixins: [managerBaseMixin],
    data: () => ({
      activeStep: null,
      STATUS_EMPRESA,
      statusesEmpresa: [
        { label: 'Filtrar todas', value: STATUS_EMPRESA.TODAS },
        { label: 'Ativas', value: STATUS_EMPRESA.ATIVA },
        { label: 'Inativas', value: STATUS_EMPRESA.INATIVA },
        { label: 'Bloqueadas', value: STATUS_EMPRESA.BLOQUEADA }
      ]
    }),
    components: {
      EmpresaList,
    },
    computed: {
      ...mapGetters('empresa', ['getFiltroEmpresa', 'hasEmpresas']),
      status: {
        get() {
          return this.getFiltroEmpresa.status
        },
        set(value) {
          if (value !== this.status) {
            this.showLoading()
            setTimeout(() => {
              this.setFiltro({ status: value })
              this.hideLoading()
            }, 300)
          }
        }
      },
      razaoSocial: {
        get() {
          return this.getFiltroEmpresa.razaoSocial
        },
        set(value) {
          this.setFiltro({ razaoSocial: value })
        }
      }
    },
    methods: {
      ...mapMutations('empresa', {
        setFiltro: SET_FILTRO_EMPRESA,
        setCorporacaoIdInEmpresaToCreate: SET_CORPORACAO_ID_IN_EMPRESA
      }),
      createNewEmpresa() {
        this.setCorporacaoIdInEmpresaToCreate(null)
        this.activeStep = 'cadastroCnpj'
      }
    }
  }
</script>
