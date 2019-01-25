export const namespace = 'api'
export const getNamespace = state => state[namespace]

export default Object.freeze({
  // effects
  getNumber: 'getNumber',
  addNumber: 'addNumber',
  setNumber: 'setNumber',
})
