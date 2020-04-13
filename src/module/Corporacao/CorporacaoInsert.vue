<template>
  <CorporacaoForm :value="value" @input="$emit('input', arguments[0])"
    :empresasToInsert.sync="empresasToInsert" :nome.sync="nome"
    @on-save="save">
  </CorporacaoForm>
</template>

<script>
  import corporacaoService from '@/services/corporacao'
  import corporacaoForMixin from '@/module/Corporacao/corporacao-form-mixin'

  export default {
    mixins: [corporacaoForMixin],
    methods: {
      async save() {
        try {
          this.showLoading()
          await corporacaoService.insert({ nome: this.nome, empresas: this.empresasToInsert })
          await this.searchEmpresasAndCorporacoes()
          this.showSuccessOnSnackbar('Corporação cadastrada com sucesso!')
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
