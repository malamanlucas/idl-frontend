import { get, isNil } from 'lodash'

export const STRING_START_INDEX_OF = 'filename=\"'
export const fileNameIfNull_DEFAULT = 'file.csv'
export const defaultExtension_DEFAULT = '.csv'

export default {
  downloadBytes(filename, bytes) {
    this.download(filename, window.URL.createObjectURL(new Blob([bytes])))
  },
  download(filename, href) {
    const link = window.document.createElement('a')

    link.href = href
    link.setAttribute('download', filename)
    window.document.body.appendChild(link)
    link.click()
    window.document.body.removeChild(link)
  },
  extractFileNameFromContentDisposition(response, fileNameIfNull = fileNameIfNull_DEFAULT, defaultExtension = defaultExtension_DEFAULT) {
    const contentDisposition = get(response, 'headers["content-disposition"]')

    if (isNil(contentDisposition) || contentDisposition.indexOf(STRING_START_INDEX_OF) === -1
       || contentDisposition.indexOf(defaultExtension) === -1) {
      return fileNameIfNull
    }

    const start = contentDisposition.indexOf(STRING_START_INDEX_OF) + STRING_START_INDEX_OF.length

    return contentDisposition.substring(start, contentDisposition.lastIndexOf(defaultExtension) + defaultExtension.length)
  },
  hasExtension(filename, exts = ['.csv']) {
    return (new RegExp(`(${exts.join('|').replace(/\./g, '\\.')})$`)).test(filename);
  }
}
