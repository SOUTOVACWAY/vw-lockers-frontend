import { CALL_API } from '../middleware/api'

export const UPDATES_REQUEST = 'UPDATES_REQUEST'
export const UPDATES_SUCCESS = 'UPDATES_SUCCESS'
export const UPDATES_FAILURE = 'UPDATES_FAILURE'

export function fetchUpdates() {
  return {
    [CALL_API]: {
      method: 'GET',
      endpoint: 'updates',
      authenticated: true,
      types: [UPDATES_REQUEST, UPDATES_SUCCESS, UPDATES_FAILURE]
    }
  }
}

export const UPDATE_REQUEST = 'UPDATE_REQUEST'
export const UPDATE_SUCCESS = 'UPDATE_SUCCESS'
export const UPDATE_FAILURE = 'UPDATE_FAILURE'

export function fetchUpdate(id) {
  return {
    [CALL_API]: {
      method: 'GET',
      endpoint: `updates/${id}`,
      authenticated: true,
      types: [UPDATE_REQUEST, UPDATE_SUCCESS, UPDATE_FAILURE]
    }
  }
}

export const UPDATE_ADD_REQUEST = 'UPDATE_ADD_REQUEST'
export const UPDATE_ADD_SUCCESS = 'UPDATE_ADD_SUCCESS'
export const UPDATE_ADD_FAILURE = 'UPDATE_ADD_FAILURE'

export function addUpdate(update) {
  return {
    [CALL_API]: {
      method: 'POST',
      endpoint: 'updates',
      authenticated: true,
      body: JSON.stringify(update),
      types: [UPDATE_ADD_REQUEST, UPDATE_ADD_SUCCESS, UPDATE_ADD_FAILURE]
    }
  }
}

export const UPDATE_UPDATE_REQUEST = 'UPDATE_UPDATE_REQUEST'
export const UPDATE_UPDATE_SUCCESS = 'UPDATE_UPDATE_SUCCESS'
export const UPDATE_UPDATE_FAILURE = 'UPDATE_UPDATE_FAILURE'

export function updateUpdate(id, props) {
  return {
    [CALL_API]: {
      method: 'PUT',
      endpoint: `updates/${id}`,
      authenticated: true,
      body: JSON.stringify(props),
      types: [UPDATE_UPDATE_REQUEST, UPDATE_UPDATE_SUCCESS,
              UPDATE_UPDATE_FAILURE]
    }
  }
}

export const UPDATE_RESET = 'UPDATE_RESET'

export function resetUpdate() {
  return { type: UPDATE_RESET }
}

