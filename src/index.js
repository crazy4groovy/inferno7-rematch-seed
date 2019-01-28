import { render } from 'inferno'
import { Provider } from 'inferno-redux'
import { BrowserRouter, Route } from 'inferno-router'

import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import store from './store'
import routes, { postWithId } from './routes'

render(
  <Provider store={ store }>
    <BrowserRouter>
      <Route>
        <Route exact path={routes.home} component={App} />
        <Route path={postWithId()} component={App} />
      </Route>
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
