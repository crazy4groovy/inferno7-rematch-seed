import { version, Component } from 'inferno'
import { connect } from 'inferno-redux'
import { Link } from 'inferno-router'

import {namespace as apiNamespace} from './api/model/actionTypes'
// import store from './store'
import Logo from './logo';
import { namespace as self } from './App.actionTypes'
import './App.css';

// const { select } = store

const mapSelectToProps = rstate => ({
  //doubleCount: select[self].doubleCount(rstate, 3),
})

const mapStateToProps = rstate => ({
  ...mapSelectToProps(rstate),

  isToggled: rstate[self],
})

const mapDispatchToProps = dispatch => ({
  toggle: dispatch[self].toggle,
  getNumber: dispatch[apiNamespace].getNumber,
})

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Logo width="80" height="80" />
          <p>
            {`Welcome to Inferno ${version} `}
          </p>
          <p>
            Routes:{' '}
            <Link to='/'> >>home</Link>{' '}
            <Link to='/posts/123'> >>posts</Link>{' '}
          </p>
          <p>
            Router URL & Params: {this.props.match.url} {JSON.stringify(this.props.match.params)}</p>
          <p>{this.props.isToggled ? 'ON' : 'OFF'}</p>
          <p>
            <button onClick={this.props.toggle}>TOGGLE!</button>
          </p>
          <p>
            <button onClick={this.props.getNumber}>API (Check console logs)</button>
          </p>
        </header>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
