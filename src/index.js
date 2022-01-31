import React from 'react'
import ReactDOM from 'react-dom'
import { store, history } from './store'
import Root from './containers/Root'
import { authLoginSuccess } from './actions/auth'

const target = document.getElementById('root')

const root = (
  <Root store={store} history={history} />
)

const token = localStorage.getItem('token')
if (token !== null) {
  store.dispatch(authLoginSuccess(token))
}

ReactDOM.render(root, target)
