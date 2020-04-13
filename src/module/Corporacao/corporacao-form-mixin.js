import { mapActions } from 'vuex'
import CorporacaoForm from '@/module/Corporacao/CorporacaoForm'

export default {
  props: ['value'],
  data: () => ({
    empresasToInsert: [],
    nome: ''
  }),
  components: {
    CorporacaoForm
  },
  watch: {
    value(active) {
      if (active) {
        this.clean()
      }
    }
  },
  methods: {
    ...mapActions('empresa', ['searchEmpresasAndCorporacoes']),
    closeModal() {
      this.$emit('input', false)
    },
    clean() {
      this.nome = ''
      this.empresasToInsert.splice(0, this.empresasToInsert.length)
    },
  }
}
