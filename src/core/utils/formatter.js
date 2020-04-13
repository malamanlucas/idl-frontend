import moment from 'moment'
import { conformToMask } from 'vue-text-mask'
import { isNil } from 'lodash'
import maskHelpers from './maskHelpers'

export const extractOnlyNumbers = value => (isNil(value) ? '' : value.trim().replace(/[^0-9]/g, ''))
export const extractOnlyNumbersAndLetters = value => (isNil(value) ? '' : value.trim().replace(/[^0-9a-zA-Z]]/g, ''))
export const normalizeText = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

const formatter = {
  normalizeText,
  extractOnlyNumbers,
  extractOnlyNumbersAndLetters,
  formatDate: (value, patternFrom = 'DD/MM/YYYY', patternTo = 'YYYY-MM-DD') => {
    if (isNil(value)) {
      return ''
    }

    let dateFormatted = moment(value, patternFrom).utc().format(patternTo)

    if (!moment(dateFormatted, patternTo).isValid()) {
      dateFormatted = ''
    }

    return dateFormatted
  },
  defaultFormat: (value, mask) => (!isNil(value) ? conformToMask(value, mask, { guide: false }).conformedValue : null),
  formatCep: value => formatter.defaultFormat(value, maskHelpers.cepMask),
  formatCnpj: value => formatter.defaultFormat(value, maskHelpers.cnpjMask),
  formatCnae: value => formatter.defaultFormat(value, maskHelpers.cnaeMask),
  formatTelefone: value => formatter.defaultFormat(value, maskHelpers.changePhoneMask(value)),
  formatTelefoneDDD: value => formatter.defaultFormat(value, maskHelpers.phoneMask10),
  formatCPF: value => formatter.defaultFormat(value, maskHelpers.cpfMask),
  formatRG: value => formatter.defaultFormat(value, maskHelpers.rgMask),
  parseDate: value => moment(value, 'dd/MM/yyyy').utc().toISOString(),
  formatNumberAsText: value => (value ? value.toString().replace('.', ',') : ''),
  extractFirstWord: (sentence) => {
    if (sentence === undefined || sentence === null) {
      return sentence
    }
    const position = sentence.indexOf(' ')

    if (position > -1) {
      return sentence.substr(0, position)
    }
    return sentence
  }
}

export default formatter
