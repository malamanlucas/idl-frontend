import Cookies from 'js-cookie'

export default {
  get(key, jsonParse) {
    const content = Cookies.get(key)

    if (content) {
      return jsonParse ? JSON.parse(atob(content)) : atob(content)
    }
    return content
  },
  set(key, value) {
    Cookies.set(key, value)
  },
  remove(key) {
    Cookies.remove(key)
  }
}
