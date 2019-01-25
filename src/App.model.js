import types, { namespace } from './App.actionTypes'
import apiActions, { namespace as apiNamespace } from './api/model/actionTypes'

// logout model
export default {
  name: namespace,
  state: true,
  reducers: {
    [types.toggle]: state => !state,
    [`${apiNamespace}/${apiActions.getNumber}_FULFILLED`]: (state, payload) => alert([state, payload]) || state
  },
  effects: {},
}
