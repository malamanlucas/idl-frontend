import moment from 'moment'

const futureDate = (value) => {
  const removeSlash = value => value.replace(/\/|\s+|\_/g, '')

  if (!value || removeSlash(value).length !== 8) {
    return false
  }

  const maxData = new Date()
  const valueDate = moment(value, 'DD/MM/YYYY')
  const inputData = new Date(valueDate)

  return inputData.getTime() <= maxData.getTime()
}

export default futureDate
