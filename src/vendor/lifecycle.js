function validateConfig(config) {
  if (config.pending && typeof config.pending !== 'string') {
    throw new Error('pending must be a string')
  }
  if (config.success && typeof config.success !== 'string') {
    throw new Error('success must be a string')
  }
  if (config.failure && typeof config.failure !== 'string') {
    throw new Error('failure must be a string')
  }
  if (config.onFailure && typeof config.onFailure !== 'function') {
    throw new Error('onFailure must be a function')
  }
}

export default (config = {}) => {
  validateConfig(config)

  const {
    pending = '_PENDING',
    fulfilled = '_FULFILLED',
    rejected = '_REJECTED',
    onRejected = () => {},
  } = config

  return {
    onModel({ name }) {
      const modelActions = this.dispatch[name]
      console.log('onModel es:', name)

      // loop over effects within model
      Object
      .keys(modelActions)
      .filter(action => this.dispatch[name][action].isEffect === true)
      .forEach(action => {
        // create new dispatch functions
        this.dispatch[name][`${action}${pending}`] = this.createDispatcher.apply(this,
          [name, `${action}${pending}`]
        )
        this.dispatch[name][`${action}${fulfilled}`] = this.createDispatcher.apply(this,
          [name, `${action}${fulfilled}`]
        )
        this.dispatch[name][`${action}${rejected}`] = this.createDispatcher.apply(this,
          [name, `${action}${rejected}`]
        )

        // copy orig effect pointer
        const origEffect = this.dispatch[name][action]

        // create effect with pre & post status calls
        const effectWrapper = async (props, rootState) => {
          try {
            //this.dispatch[name][`${action}_PENDING`]({ name, action, props })
            this.dispatch[name][`${action}${pending}`](props)
            // waits for dispatch function to finish before calling "hide"
            const payload = await origEffect(props, rootState)
            //this.dispatch[name][`${action}_SUCCESS`]({ name, action, payload })  // <<<<<< include payload in action!
            this.dispatch[name][`${action}${fulfilled}`](payload)  // <<<<<< include payload in action!
            return payload
          } catch (error) {
            this.dispatch[name][`${action}${rejected}`](error)
            onRejected(error, name, action)
            throw error
          }
        }
        Object.assign(effectWrapper, origEffect) // <<<<<< add isEffect prop to effect wrapper!

        // replace existing effect with new wrapper
        this.dispatch[name][action] = effectWrapper
      })
    },
  }
}
