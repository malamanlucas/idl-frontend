<template>
  <CorporacaoForm :value="value" @input="$emit('input', arguments[0])"
    :empresasToInsert.sync="empresasToInsertWrapper" :nome.sync="nome"
    @on-save="save" :empresasToList="empresasToList">
    <template #title>
      Edição
    </template>
    <template #labelButtonSuccess>
      Editar grupo de empresas
    </template>
  </CorporacaoForm>
</template>

<script>
  import { cloneDeep } from 'lodash'
  import corporacaoService from '@/services/corporacao'
  import corporacaoForMixin from '@/module/Corporacao/corporacao-form-mixin'

  export default {
    mixins: [corporacaoForMixin],
    props: ['corporacao'],
    data: () => ({
      empresasToList: []
    }),
    computed: {
      empresasToInsertWrapper: {
        get() {
          return this.empresasToInsert
        },
        set(value) {
          this.empresasToInsert = value
        }
      }
    },
    watch: {
      value(active) {
        if (active) {
          this.empresasToList = cloneDeep(this.corporacao.empresas)
          this.empresasToInsertWrapper = cloneDeep(this.corporacao.empresas)
          this.nome = this.corporacao.nome
        }
      }
    },
    methods: {
      async save() {
        try {
          this.showLoading()
          await corporacaoService.update({
            id: this.corporacao.id,
            nome: this.nome,
            empresas: this.empresasToInsert
          })
          await this.searchEmpresasAndCorporacoes()
          this.showSuccessOnSnackbar('Corporação atualizada com sucesso!')
          this.closeModal()
        } catch (e) {
          this.showErrorOnSnackbar(e)
        } finally {
          this.hideLoading()
        }
      }
    }
  }
</script>
