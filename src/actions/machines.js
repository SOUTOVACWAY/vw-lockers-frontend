import { CALL_API } from '../middleware/api'

export const MACHINES_REQUEST = 'MACHINES_REQUEST'
export const MACHINES_SUCCESS = 'MACHINES_SUCCESS'
export const MACHINES_FAILURE = 'MACHINES_FAILURE'

export function fetchMachines(customer) {
  let params = ''

  if (customer !== undefined) {
    params += `&customer=${customer}`
  }

  return {
    [CALL_API]: {
      method: 'GET',
      endpoint: `machines?${params}`,
      authenticated: true,
      types: [MACHINES_REQUEST, MACHINES_SUCCESS, MACHINES_FAILURE]
    }
  }
}

export const MACHINE_REQUEST = 'MACHINE_REQUEST'
export const MACHINE_SUCCESS = 'MACHINE_SUCCESS'
export const MACHINE_FAILURE = 'MACHINE_FAILURE'

export function fetchMachine(serial) {
  return {
    [CALL_API]: {
      method: 'GET',
      endpoint: `machines/${serial}`,
      authenticated: true,
      types: [MACHINE_REQUEST, MACHINE_SUCCESS, MACHINE_FAILURE]
    }
  }
}

export const MACHINE_ADD_REQUEST = 'MACHINE_ADD_REQUEST'
export const MACHINE_ADD_SUCCESS = 'MACHINE_ADD_SUCCESS'
export const MACHINE_ADD_FAILURE = 'MACHINE_ADD_FAILURE'

export function addMachine(machine) {
  return {
    [CALL_API]: {
      method: 'POST',
      endpoint: 'machines',
      authenticated: true,
      body: JSON.stringify(machine),
      types: [MACHINE_ADD_REQUEST, MACHINE_ADD_SUCCESS, MACHINE_ADD_FAILURE]
    }
  }
}

export const MACHINE_UPDATE_REQUEST = 'MACHINE_UPDATE_REQUEST'
export const MACHINE_UPDATE_SUCCESS = 'MACHINE_UPDATE_SUCCESS'
export const MACHINE_UPDATE_FAILURE = 'MACHINE_UPDATE_FAILURE'

export function updateMachine(serial, props) {
  return {
    [CALL_API]: {
      method: 'PUT',
      endpoint: `machines/${serial}`,
      authenticated: true,
      body: JSON.stringify(props),
      types: [MACHINE_UPDATE_REQUEST, MACHINE_UPDATE_SUCCESS,
              MACHINE_UPDATE_FAILURE]
    }
  }
}

export const MACHINE_DELETE_REQUEST = 'MACHINE_DELETE_REQUEST'
export const MACHINE_DELETE_SUCCESS = 'MACHINE_DELETE_SUCCESS'
export const MACHINE_DELETE_FAILURE = 'MACHINE_DELETE_FAILURE'

export function deleteMachine(serial) {
  return {
    [CALL_API]: {
      method: 'DELETE',
      endpoint: `machines/${serial}`,
      authenticated: true,
      types: [MACHINE_DELETE_REQUEST, MACHINE_DELETE_SUCCESS,
              MACHINE_DELETE_FAILURE]
    }
  }
}

export const MACHINES_RESET = 'MACHINES_RESET'

export function resetMachines() {
  return { type: MACHINES_RESET }
}
