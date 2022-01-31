import { CALL_API } from '../middleware/api'

export const USERS_REQUEST = 'USERS_REQUEST'
export const USERS_SUCCESS = 'USERS_SUCCESS'
export const USERS_FAILURE = 'USERS_FAILURE'

export function fetchUsers() {
  return (dispatch, getState) => {
    const users = getState().users

    if (!users.users || users.usersNeedRefresh) {
      return dispatch({
        [CALL_API]: {
          method: 'GET',
          endpoint: 'users',
          authenticated: true,
          types: [USERS_REQUEST, USERS_SUCCESS, USERS_FAILURE]
        }
      })
    }

    return null
  }
}

export const USER_REQUEST = 'USER_REQUEST'
export const USER_SUCCESS = 'USER_SUCCESS'
export const USER_FAILURE = 'USER_FAILURE'

export function fetchUser(number) {
  return (dispatch, getState) => {
    const user = getState().users.user

    if (typeof number === 'string') {
      number = parseInt(number, 10)
    }

    if (!user || user.number !== number) {
      return dispatch({
        [CALL_API]: {
          method: 'GET',
          endpoint: `users/${number}`,
          authenticated: true,
          types: [USER_REQUEST, USER_SUCCESS, USER_FAILURE]
        }
      })
    }

    return null
  }
}

export const USER_ADD_REQUEST = 'USER_ADD_REQUEST'
export const USER_ADD_SUCCESS = 'USER_ADD_SUCCESS'
export const USER_ADD_FAILURE = 'USER_ADD_FAILURE'

export function addUser(user) {
  return {
    [CALL_API]: {
      method: 'POST',
      endpoint: 'users',
      authenticated: true,
      body: JSON.stringify(user),
      types: [USER_ADD_REQUEST, USER_ADD_SUCCESS, USER_ADD_FAILURE]
    }
  }
}

export const USER_UPDATE_REQUEST = 'USER_UPDATE_REQUEST'
export const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS'
export const USER_UPDATE_FAILURE = 'USER_UPDATE_FAILURE'

export function updateUser(number, props) {
  return {
    [CALL_API]: {
      method: 'PUT',
      endpoint: `users/${number}`,
      authenticated: true,
      body: JSON.stringify(props),
      types: [USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS,
              USER_UPDATE_FAILURE]
    }
  }
}

export const USER_RESET = 'USER_RESET'

export function resetUser() {
  return { type: USER_RESET }
}

