import effects from '../' // note: each api call is an effect !!

import { namespace } from './actionTypes'

export default {
  name: namespace,
  state: null, // note: no state to maintain
  reducers: {},
  effects,
}
