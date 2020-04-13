<template>
  <manager-base @on-click-add="startCreating">
    <template #modals>
      <CorporacaoInsert v-model="activeCorporacaoCreate" />
      <CorporacaoEdit v-model="activeCorporacaoEdit" :corporacao="corporacaoToEdit" />

      <EmpresaSteppers :activeStep.sync="activeStep" />
    </template>
    <template #textSearch>
      <v-text-field
        flat
        hide-details
        label="Pesquisar"
        placeholder="Buscar grupo"
        color="primary"
        background-color="primarysoft2"
        prepend-inner-icon="mdi-magnify"
        rounded
        solo-inverted
        v-model="nomeGrupo"
        ></v-text-field>
    </template>

    <template #list>
      <CorporacoesList
        @on-click-edit-empresa="startEditingEmpresa(arguments[0])"
        @on-click-edit-funcao="startEditingFuncao(arguments[0])"
        @on-click-edit-setor="startEditingSetor(arguments[0])"
        @on-click-edit="startEditing(arguments[0])"
        @on-call-add-in-group="activeStep = 'cadastroCnpj'"
        @on-click-create-group="startCreating" />
    </template>

    <template #labelTooltipAdd>
      Adicionar um novo grupo
    </template>

    <template #labelAdd>
      Adicionar grupo
    </template>
  </manager-base>
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex'
  import CorporacoesList from '@/module/Corporacao/CorporacoesList'
  import CorporacaoInsert from '@/module/Corporacao/CorporacaoInsert'
  import CorporacaoEdit from '@/module/Corporacao/CorporacaoEdit'
  import { SET_FILTRO_CORPORACAO } from '@/store/modules/empresa'
  import managerBaseMixin from '@/core/components/ManagerBase/manager-base-mixin'

  export default {
    mixins: [managerBaseMixin],
    data: () => ({
      activeCorporacaoCreate: false,
      activeCorporacaoEdit: false,
      corporacaoToEdit: null,
    }),
    components: {
      CorporacoesList,
      CorporacaoEdit,
      CorporacaoInsert
    },
    computed: {
      ...mapGetters('empresa', ['getFiltroCorporacao']),
      nomeGrupo: {
        get() {
          return this.getFiltroCorporacao.nome
        },
        set(nome) {
          this.setFiltro({ nome })
        }
      }
    },
    methods: {
      ...mapMutations('empresa', {
        setFiltro: SET_FILTRO_CORPORACAO
      }),
      startCreating() {
        this.activeCorporacaoCreate = true
      },
      startEditing(corporacao) {
        this.activeCorporacaoEdit = true
        this.corporacaoToEdit = corporacao
      }
    }
  }
</script>
