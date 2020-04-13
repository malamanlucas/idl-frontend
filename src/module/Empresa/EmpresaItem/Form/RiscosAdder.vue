<template>
  <form-list :items="model.riscos" :allItems="riscos" @on-items-change="model.riscos = arguments[0]"
    :loading="loading" title="Riscos" buttonLabel="Adicionar Risco(s)" />
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import FormList from '@/module/Empresa/EmpresaItem/Form/FormList'

  export default {
    props: ['model'],
    data: () => ({
      loading: false
    }),
    components: {
      FormList
    },
    computed: {
      ...mapGetters('risco', ['riscos'])
    },
    methods: {
      ...mapActions('risco', ['searchRiscos']),
      async load() {
        try {
          this.loading = true
          await this.searchRiscos()
        } catch (e) {
          this.showErrorOnSnackbar(e)
        } finally {
          this.loading = false
        }
      }
    },
    mounted() {
      this.load()
    }
  }
</script>
