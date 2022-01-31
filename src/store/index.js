import createHistory from 'history/createBrowserHistory'
import thunkMiddleware from 'redux-thunk'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { routerMiddleware, routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import { createLogger } from 'redux-logger'

import apiMiddleware from '../middleware/api'
import authReducer from '../reducers/auth'
import contractsReducer from '../reducers/contracts'
import customersReducer from '../reducers/customers'
import reportsReducer from '../reducers/reports'
import incidencesReducer from '../reducers/incidences'
import itemsReducer from '../reducers/items'
import machinesReducer from '../reducers/machines'
import salesReducer from '../reducers/sales'
import usersReducer from '../reducers/users'
import remoteActionsReducer from '../reducers/remoteactions'
import updatesReducer from '../reducers/updates'
import shipmentsReducer from '../reducers/shipments'
import auditsReducer from '../reducers/audits'
import shiftsReducer from '../reducers/shifts'
import promoterSalesReducer from '../reducers/promotersales'

import { AUTH_LOGOUT } from '../actions/auth'

export const history = createHistory()

const myRouterMiddleware = routerMiddleware(history)
const loggerMiddleware = createLogger()

const appReducer = combineReducers({
  auth: authReducer,
  contracts: contractsReducer,
  customers: customersReducer,
  reports: reportsReducer,
  incidences: incidencesReducer,
  items: itemsReducer,
  machines: machinesReducer,
  sales: salesReducer,
  users: usersReducer,
  remoteactions: remoteActionsReducer,
  updates: updatesReducer,
  shipments: shipmentsReducer,
  audits: auditsReducer,
  shifts: shiftsReducer,
  promoterSales: promoterSalesReducer,
  form: formReducer,
  router: routerReducer
})

const rootReducer = (state, action) => {
  if (action.type === AUTH_LOGOUT) {
    state = undefined
  }

  return appReducer(state, action)
};

const middleware = process.env.NODE_ENV === 'production' ?
  applyMiddleware(
    thunkMiddleware,
    apiMiddleware,
    myRouterMiddleware
  ) :
  applyMiddleware(
    thunkMiddleware,
    apiMiddleware,
    myRouterMiddleware,
    loggerMiddleware
  )

export const store = createStore(rootReducer, middleware);
