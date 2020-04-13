import { toLower } from 'lodash'
import { normalizeText } from '@/core/utils/formatter'

export const compareTextLettersOnly = (value, queryText) => toLower(normalizeText(value)).includes(toLower(normalizeText(queryText)))
export const equalsTextLettersOnly = (value, queryText) => toLower(normalizeText(value)) === toLower(normalizeText(queryText))

export default compareTextLettersOnly
