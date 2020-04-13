import moment from 'moment'
import { isNil } from 'lodash'

const minDate = (value, [minDate = '1000']) => {
  if (isNil(value)) {
    return false
  }
  const removeSlash = value => value.replace(/\/|\s+|\_/g, '')

  if (!value || removeSlash(value).length !== 8) {
    return false
  }

  const valueDate = moment(value, 'DD/MM/YYYY')

  return valueDate > moment(`01/01/${minDate}`, 'DD/MM/YYYY')
}

export default minDate
