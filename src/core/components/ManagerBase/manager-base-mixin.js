import { mapActions, mapMutations } from 'vuex'
import ManagerBase from '@/core/components/ManagerBase'
import EmpresaSteppers from '@/module/Empresa/EmpresaSteppers'
import { SET_EMPRESA } from '@/store/modules/empresa'
import { SET_EMPRESA_ITEM_MODULE_ACTIVE } from '@/store/modules/common'

export default {
  data: () => ({
    activeStep: null,
  }),
  components: {
    ManagerBase,
    EmpresaSteppers
  },
  methods: {
    ...mapMutations('empresa', {
      setEmpresa: SET_EMPRESA
    }),
    ...mapMutations('common', {
      setModule: SET_EMPRESA_ITEM_MODULE_ACTIVE
    }),
    ...mapActions('empresa', ['loadEmpresaById']),
    startEditingSetor(empresa) {
      this.setModule('setor')
      this.setEmpresa(empresa)
      this.activeStep = 'setorEdicao'
    },
    startEditingFuncao(empresa) {
      this.setModule('funcao')
      this.setEmpresa(empresa)
      this.activeStep = 'funcaoEdicao'
    },
    async startEditingEmpresa(empresa) {
      try {
        this.showLoading()
        await this.loadEmpresaById(empresa.id)
        this.activeStep = 'empresaEdicao'
      } catch (e) {
        console.error(e)
        this.showErrorOnSnackbar(e)
      } finally {
        this.hideLoading()
      }
    }
  }
}
