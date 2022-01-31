import { CALL_API } from '../middleware/api'

export const REMOTE_ACTIONS_REQUEST = 'REMOTE_ACTIONS_REQUEST'
export const REMOTE_ACTIONS_SUCCESS = 'REMOTE_ACTIONS_SUCCESS'
export const REMOTE_ACTIONS_FAILURE = 'REMOTE_ACTIONS_FAILURE'

export function fetchRemoteActions(machine_serial) {
  return {
    [CALL_API]: {
      method: 'GET',
      endpoint: `remoteactions/${machine_serial}`,
      authenticated: true,
      types: [REMOTE_ACTIONS_REQUEST, REMOTE_ACTIONS_SUCCESS,
              REMOTE_ACTIONS_FAILURE]
    }
  }
}

export const REMOTE_ACTION_ADD_REQUEST = 'REMOTE_ACTION_ADD_REQUEST'
export const REMOTE_ACTION_ADD_SUCCESS = 'REMOTE_ACTION_ADD_SUCCESS'
export const REMOTE_ACTION_ADD_FAILURE = 'REMOTE_ACTION_ADD_FAILURE'

export function addRemoteAction(remoteAction) {
  return {
    [CALL_API]: {
      method: 'POST',
      endpoint: 'remoteactions',
      authenticated: true,
      body: JSON.stringify(remoteAction),
      types: [REMOTE_ACTION_ADD_REQUEST, REMOTE_ACTION_ADD_SUCCESS,
              REMOTE_ACTION_ADD_FAILURE]
    }
  }
}

export const REMOTE_ACTIONS_RESET = 'REMOTE_ACTIONS_RESET'

export function resetremoteActions() {
  return { type: REMOTE_ACTIONS_RESET }
}

