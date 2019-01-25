import types from './model/actionTypes'
import * as http from './http.fake'

export default Object.freeze({
  [types.getNumber]: async ({ id = 'blah', a, b, cached } = {}) =>
    http.get(`/numbers/${id}`, {a, b}, cached),

  [types.setNumber]: async ({ id = 'blah', number } = {}) =>
    http.set('POST', `/numbers/${id}`, number),

  [types.addNumber]: async ({ id = 'blah', number } = {}) =>
    http.set('PUT', `/numbers/${id}`, number),
})
