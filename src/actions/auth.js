import jwtDecode from 'jwt-decode'

import { API_ROOT } from '../config'

export const AUTH_LOGIN_REQUEST = 'AUTH_LOGIN_REQUEST'
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS'
export const AUTH_LOGIN_FAILURE = 'AUTH_LOGIN_FAILURE'

function authLoginRequest() {
  return {
    type: AUTH_LOGIN_REQUEST
  }
}

export function authLoginSuccess(token) {
  const jwt = jwtDecode(token)

  return {
    type: AUTH_LOGIN_SUCCESS,
    data: {
      id: jwt.id,
      fullName: jwt.fullname,
      role: jwt.role,
      type: jwt.type
    }
  }
}

function authLoginFailure(error) {
  return {
    type: AUTH_LOGIN_FAILURE,
    error
  }
}

export function authLogin(details, admin) {
  return dispatch => {
    dispatch(authLoginRequest())

    const config = {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(details)
    }

    const route = admin ? 'login/admin' : 'login'

    return fetch(API_ROOT + route, config)
      .then(response =>
        response.json().then(json => {
          if (!response.ok) {
            return Promise.reject(json)
          }

          localStorage.setItem('token', json.token)

          return dispatch(authLoginSuccess(json.token))
        })
      ).catch(error => dispatch(authLoginFailure(error)))
  }
}

export const AUTH_LOGOUT = 'AUTH_LOGOUT'

export function authLogout() {
  return dispatch => {
    localStorage.removeItem('token')
    dispatch({ type: AUTH_LOGOUT })
  }
}
