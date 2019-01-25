import { init } from '@rematch/core'
import createImmerPlugin from '@rematch/immer' // state manipulation
import createUpdatedPlugin from '@rematch/updated' // throttling
import createSelectPlugin from '@rematch/select'
import { createCachedSelector } from 're-reselect'

// import createLoadingPlugin from '@rematch/loading'
import createLoadingPlugin from './vendor/loading' // <<<< customized
import createLifecyclePlugin from './vendor/lifecycle' // <<<< new

import apiModel from './api/model'
import appModel from './App.model'

const loadingPlugin = createLoadingPlugin({ asNumber: true })
const lifecyclePlugin = createLifecyclePlugin({
  onRejected(error, name, action) {
    console.log('ON_FAILURE:::', error.message, name, action)
  },
})
const immerPlugin = createImmerPlugin()
const updatedPlugin = createUpdatedPlugin()
const selectPlugin = createSelectPlugin({
  selectorCreator: createCachedSelector
})

const logger = ({ getState, dispatch }) => next => action => {
  console.log('REDUX ACTION LOG:', action.type, action, { rootState: getState() })
  return next(action)
}

const store = init({
  redux: { middlewares: [logger] },
  plugins: [
    lifecyclePlugin,
    loadingPlugin,
    immerPlugin,
    updatedPlugin,
    selectPlugin,
  ],
  models: [
    apiModel,
    appModel,
  ]
})

export default store;
