<template>
  <form-list :items="model.exames" :allItems="exames"
    @on-items-change="model.exames = arguments[0]"
    :loading="loading" title="Exames" buttonLabel="Adicionar Exame(s)" />
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import FormList from '@/module/Empresa/EmpresaItem/Form/FormList'

  export default {
    props: ['model'],
    data: () => ({
      loading: false,
    }),
    components: {
      FormList
    },
    computed: {
      ...mapGetters('exame', ['exames'])
    },
    methods: {
      ...mapActions('exame', ['searchExames']),
      async load() {
        try {
          this.loading = true
          await this.searchExames()
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
