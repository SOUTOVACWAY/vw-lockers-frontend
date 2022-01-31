import { CALL_API } from '../middleware/api'

export const CUSTOMERS_REQUEST = 'CUSTOMERS_REQUEST'
export const CUSTOMERS_SUCCESS = 'CUSTOMERS_SUCCESS'
export const CUSTOMERS_FAILURE = 'CUSTOMERS_FAILURE'

export function fetchCustomers() {
  return {
    [CALL_API]: {
      method: 'GET',
      endpoint: 'customers',
      authenticated: true,
      types: [CUSTOMERS_REQUEST, CUSTOMERS_SUCCESS, CUSTOMERS_FAILURE]
    }
  }
}

export const CUSTOMER_REQUEST = 'CUSTOMER_REQUEST'
export const CUSTOMER_SUCCESS = 'CUSTOMER_SUCCESS'
export const CUSTOMER_FAILURE = 'CUSTOMER_FAILURE'

export function fetchCustomer(number) {
  if (typeof number === 'string') {
    number = parseInt(number, 10)
  }

  return {
    [CALL_API]: {
      method: 'GET',
      endpoint: `customers/${number}`,
      authenticated: true,
      types: [CUSTOMER_REQUEST, CUSTOMER_SUCCESS, CUSTOMER_FAILURE]
    }
  }
}

export const CUSTOMER_ADD_REQUEST = 'CUSTOMER_ADD_REQUEST'
export const CUSTOMER_ADD_SUCCESS = 'CUSTOMER_ADD_SUCCESS'
export const CUSTOMER_ADD_FAILURE = 'CUSTOMER_ADD_FAILURE'

export function addCustomer(customer) {
  return {
    [CALL_API]: {
      method: 'POST',
      endpoint: 'customers',
      authenticated: true,
      body: JSON.stringify(customer),
      types: [CUSTOMER_ADD_REQUEST, CUSTOMER_ADD_SUCCESS, CUSTOMER_ADD_FAILURE]
    }
  }
}

export const CUSTOMER_UPDATE_REQUEST = 'CUSTOMER_UPDATE_REQUEST'
export const CUSTOMER_UPDATE_SUCCESS = 'CUSTOMER_UPDATE_SUCCESS'
export const CUSTOMER_UPDATE_FAILURE = 'CUSTOMER_UPDATE_FAILURE'

export function updateCustomer(number, props) {
  return {
    [CALL_API]: {
      method: 'PUT',
      endpoint: `customers/${number}`,
      authenticated: true,
      body: JSON.stringify(props),
      types: [CUSTOMER_UPDATE_REQUEST, CUSTOMER_UPDATE_SUCCESS,
              CUSTOMER_UPDATE_FAILURE]
    }
  }
}

export const CUSTOMER_RESET = 'CUSTOMER_RESET'

export function resetCustomer() {
  return { type: CUSTOMER_RESET }
}

