import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('common', {
      module: 'itemEmpresaModuleActive'
    }),
    title() {
      return this.module === 'funcao' ? 'Função' : 'Setor'
    }
  }
}
