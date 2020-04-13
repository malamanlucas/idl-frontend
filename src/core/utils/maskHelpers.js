import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe'
import { isNil } from 'lodash'

export const theMask = {
  dateMask: '##/##/####',
  cepMask: '#####-###',
  phoneMask8: '####-####',
  phoneMask9: '#####-####',
  phoneMask10: '##-####-####',
  cpfMask: '###.###.###-##',
  rgMask: '##.###.###-X',
  cnpjMask: '##.###.###/####-##',
  cnaeMask: '##.##-#-##',
  dddMask: '##'
}

const extractOnlyNumbers = value => (isNil(value) ? '' : value.trim().replace(/[^0-9]/g, ''))

const maskHelpers = {
  changePhoneMask: (phone) => {
    phone = extractOnlyNumbers(phone)
    if (isNil(phone)) {
      return []
    }

    return phone.length === 9 ? maskHelpers.phoneMask9 : maskHelpers.phoneMask8
  },
  onlyNumberMask: createNumberMask({
    prefix: '',
    includeThousandsSeparator: false,
    allowDecimal: false,
    allowLeadingZeroes: false
  }),
  dateMask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
  cepMask: [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  phoneMask9: [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  phoneMask8: [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  phoneMask10: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  cpfMask: [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/],
  rgMask: [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/],
  cnpjMask: [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/],
  cnaeMask: [/\d/, /\d/, '.', /\d/, /\d/, '-', /\d/, '-', /\d/, /\d/],
  datePipe: createAutoCorrectedDatePipe('dd/mm/yyyy'),
  theMask
}

export default maskHelpers
