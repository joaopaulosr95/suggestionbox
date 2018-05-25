import axios from 'axios'

const client = axios.create({
  baseURL: 'http://suggestionbox:3000/suggestions',
  json: false
})

export default {
  async execute (method, resource, data) {
    return client({
      method: method,
      url: resource,
      data
    }).then(req => {
      return req.data
    }).catch(err => {
      console.error(err)
    })
  },
  getSuggestions () {
    return this.execute('get', '/')
  },
  getSuggestion (id) {
    return this.execute('get', `/${id}`)
  },
  createSuggestion (data) {
    return this.execute('post', '/', data)
  },
  updateSuggestion (id, data) {
    return this.execute('patch', `/${id}`, data)
  },
  deleteSuggestion (id) {
    return this.execute('delete', `/${id}`)
  }
}
