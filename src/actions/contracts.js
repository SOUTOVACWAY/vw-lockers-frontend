import { CALL_API } from '../middleware/api'

export const CONTRACTS_REQUEST = 'CONTRACTS_REQUEST'
export const CONTRACTS_SUCCESS = 'CONTRACTS_SUCCESS'
export const CONTRACTS_FAILURE = 'CONTRACTS_FAILURE'

export function fetchContracts() {
  return {
    [CALL_API]: {
      method: 'GET',
      endpoint: 'contracts',
      authenticated: true,
      types: [CONTRACTS_REQUEST, CONTRACTS_SUCCESS, CONTRACTS_FAILURE]
    }
  }
}

export const CONTRACT_REQUEST = 'CONTRACT_REQUEST'
export const CONTRACT_SUCCESS = 'CONTRACT_SUCCESS'
export const CONTRACT_FAILURE = 'CONTRACT_FAILURE'

export function fetchContract(number) {
  if (typeof number === 'string') {
    number = parseInt(number, 10)
  }

  return {
    [CALL_API]: {
      method: 'GET',
      endpoint: `contracts/${number}`,
      authenticated: true,
      types: [CONTRACT_REQUEST, CONTRACT_SUCCESS, CONTRACT_FAILURE]
    }
  }
}

export const CONTRACT_POP_REQUEST = 'CONTRACT_POP_REQUEST'
export const CONTRACT_POP_SUCCESS = 'CONTRACT_POP_SUCCESS'
export const CONTRACT_POP_FAILURE = 'CONTRACT_POP_FAILURE'

export function fetchPopulatedContract(number) {
  if (typeof number === 'string') {
    number = parseInt(number, 10)
  }

  return {
    [CALL_API]: {
      method: 'GET',
      endpoint: `contracts/${number}?populate=true`,
      authenticated: true,
      types: [CONTRACT_POP_REQUEST, CONTRACT_POP_SUCCESS,
              CONTRACT_POP_FAILURE]
    }
  }
}

export const CONTRACT_ADD_REQUEST = 'CONTRACT_ADD_REQUEST'
export const CONTRACT_ADD_SUCCESS = 'CONTRACT_ADD_SUCCESS'
export const CONTRACT_ADD_FAILURE = 'CONTRACT_ADD_FAILURE'

export function addContract(contract) {
  return {
    [CALL_API]: {
      method: 'POST',
      endpoint: 'contracts',
      authenticated: true,
      body: JSON.stringify(contract),
      types: [CONTRACT_ADD_REQUEST, CONTRACT_ADD_SUCCESS, CONTRACT_ADD_FAILURE]
    }
  }
}

export const CONTRACT_UPDATE_REQUEST = 'CONTRACT_UPDATE_REQUEST'
export const CONTRACT_UPDATE_SUCCESS = 'CONTRACT_UPDATE_SUCCESS'
export const CONTRACT_UPDATE_FAILURE = 'CONTRACT_UPDATE_FAILURE'

export function updateContract(number, props) {
  if (typeof number === 'string') {
    number = parseInt(number, 10)
  }

  return {
    [CALL_API]: {
      method: 'PUT',
      endpoint: `contracts/${number}`,
      authenticated: true,
      body: JSON.stringify(props),
      types: [CONTRACT_UPDATE_REQUEST, CONTRACT_UPDATE_SUCCESS,
              CONTRACT_UPDATE_FAILURE]
    }
  }
}

export const CONTRACT_RESET = 'CONTRACT_RESET'

export function resetContract() {
  return { type: CONTRACT_RESET }
}

