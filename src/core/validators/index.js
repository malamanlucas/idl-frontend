import VeeValidate, { Validator } from 'vee-validate'
import ptBR from 'vee-validate/dist/locale/pt_BR'
import CPF from 'gerador-validador-cpf'
import { isNil } from 'lodash'
import Vue from 'vue'
import formatter from '@/core/utils/formatter'
import minDate from './minDate'
import futureDate from './futureDate'

Validator.localize('pt_BR', ptBR)

Vue.use(VeeValidate, {
  locale: 'pt_BR',
  events: 'blur|input',
  inject: false
  // delay: 100
})

const baseValidate = (value, maxLength, formatFunc) => isNil(value) || formatFunc(value).length === maxLength
const getMessage = field => `O campo ${field} não está no formato correto.`
const createBaseValidator = (name, maxlength, formatFunc = formatter.extractOnlyNumbers) => {
  Validator.extend(name, {
    validate: value => baseValidate(value, maxlength, formatFunc),
    getMessage
  })
}


Validator.extend('futureDate', (value) => {
  if (!value || value.length === 0) {
    return false
  }

  return futureDate(value)
})

Validator.extend('minDate', minDate)

Validator.extend('cpf', {
  validate: value => CPF.validate(value),
  getMessage
})

createBaseValidator('cep', 8)
createBaseValidator('cnpj', 14)
createBaseValidator('rg', 9, formatter.extractOnlyNumbersAndLetters)
createBaseValidator('cnae', 7)
createBaseValidator('ddd', 2)

Validator.extend('telefone', {
  validate: (value) => {
    if (isNil(value)) {
      return true
    }
    const { length } = formatter.extractOnlyNumbers(value)
    return length === 8 || length === 9
  },
  getMessage
})
