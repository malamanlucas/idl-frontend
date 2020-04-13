import { isNil } from 'lodash'
import Vue from 'vue'
import formatter from '@/core/utils/formatter'

Vue.filter('cpf', formatter.formatCPF)
Vue.filter('rg', formatter.formatRG)
Vue.filter('cnpj', formatter.formatCnpj)
Vue.filter('cep', formatter.formatCep)
Vue.filter('telefone', formatter.formatTelefone)
Vue.filter('telefoneDDD', formatter.formatTelefoneDDD)
Vue.filter('dateBr', v => formatter.formatDate(v, 'YYYY-MM-DD', 'DD/MM/YYYY'))
Vue.filter('sexo', (v) => {
  if (isNil(v)) {
    return null
  }
  return v === 'M' ? 'Masculino' : 'Feminino'
})
