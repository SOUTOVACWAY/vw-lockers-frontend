import React from 'react'
import { Provider } from 'react-redux'
import { Switch, Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'

import App from './App'

import { requireAuthentication } from '../components/AuthenticatedComponent'
import LoginAdminView from '../views/LoginAdminView'
import LoginCustomerView from '../views/LoginCustomerView'

import 'bootstrap/dist/css/bootstrap.css';
import '../style.css'

class Root extends React.Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <ConnectedRouter history={this.props.history}>
          <Switch>
            <Route exact path="/login/admin" component={LoginAdminView} />
            <Route exact path="/login" component={LoginCustomerView} />
            <Route path="/" component={requireAuthentication(App)} />
          </Switch>
        </ConnectedRouter>
      </Provider>

    )
  }
}

export default Root
