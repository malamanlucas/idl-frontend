<template>
  <base-form :value="value" @input="$emit('input', arguments[0])"
    @on-save="save" @on-cancel="$emit('on-cancel')" :model="model" />
</template>

<script>
  import { cloneDeep } from 'lodash'
  import BaseForm from '@/module/Empresa/EmpresaItem/Form/BaseForm'
  import empresaItemMixin from '@/module/Empresa/EmpresaItem/empresa-item-mixin'

  const defaultModel = {
    nome: '',
    riscos: [],
    exames: [{ value: 1, label: 'AVALIAÇÃO CLÍNICA', disabled: true }]
  }

  export default {
    mixins: [empresaItemMixin],
    props: ['value'],
    data: () => ({
      model: {}
    }),
    watch: {
      value(active) {
        if (active) {
          this.model = cloneDeep(defaultModel)
        }
      }
    },
    components: {
      BaseForm
    },
    methods: {
      save() {
        this.showSuccessOnSnackbar(`${this.title} cadastrada com sucesso.`)
        this.$emit('on-save')
      }
    }
  }
</script>
