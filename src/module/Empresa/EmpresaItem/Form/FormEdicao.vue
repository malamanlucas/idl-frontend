<template>
  <base-form :value="value" @input="$emit('input', arguments[0])"
    @on-save="save" @on-cancel="$emit('on-cancel')" :model="model">
    <template #title>Edição</template>
    <template #labelButtonSuccess>Salvar alterações</template>
  </base-form>
</template>

<script>
  import { cloneDeep } from 'lodash'
  import BaseForm from '@/module/Empresa/EmpresaItem/Form/BaseForm'
  import empresaItemMixin from '@/module/Empresa/EmpresaItem/empresa-item-mixin'

  export default {
    mixins: [empresaItemMixin],
    props: ['value'],
    data: () => ({
      model: {}
    }),
    components: {
      BaseForm
    },
    computed: {
      modelForEdit() {
        return this.$store.getters[`${this.module}/modelForEdit`]
      }
    },
    methods: {
      save() {
        this.showSuccessOnSnackbar(`${this.title} atualizada com sucesso.`)
        this.$emit('on-save')
      },
      load() {
        this.model = cloneDeep(this.modelForEdit)
      }
    },
    mounted() {
      this.load()
    }
  }
</script>
