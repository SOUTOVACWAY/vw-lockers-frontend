import { CALL_API } from '../middleware/api'

export const SALES_REQUEST = 'SALES_REQUEST'
export const SALES_SUCCESS = 'SALES_SUCCESS'
export const SALES_FAILURE = 'SALES_FAILURE'

export function fetchSales(machine, customer, startDate, endDate) {
  let params = ''

  if (machine !== undefined) {
    params += `&machine=${machine}`
  }

  if (customer !== undefined) {
    params += `&customer=${customer}`
  }

  if (startDate !== undefined) {
    params += `&startDate=${startDate}`
  }

  if (endDate !== undefined) {
    params += `&endDate=${endDate}`
  }

  return {
    [CALL_API]: {
      method: 'GET',
      endpoint: `sales?${params}`,
      authenticated: true,
      types: [SALES_REQUEST, SALES_SUCCESS, SALES_FAILURE]
    }
  }
}

export const SALE_REQUEST = 'SALE_REQUEST'
export const SALE_SUCCESS = 'SALE_SUCCESS'
export const SALE_FAILURE = 'SALE_FAILURE'

export function fetchSale(number) {
  if (typeof number === 'string') {
    number = parseInt(number, 10)
  }

  return {
    [CALL_API]: {
      method: 'GET',
      endpoint: `sales/${number}`,
      authenticated: true,
      types: [SALE_REQUEST, SALE_SUCCESS, SALE_FAILURE]
    }
  }
}

export const SALE_ADD_REQUEST = 'SALE_ADD_REQUEST'
export const SALE_ADD_SUCCESS = 'SALE_ADD_SUCCESS'
export const SALE_ADD_FAILURE = 'SALE_ADD_FAILURE'

export function addSale(sale) {
  return {
    [CALL_API]: {
      method: 'POST',
      endpoint: 'sales',
      authenticated: true,
      body: JSON.stringify(sale),
      types: [SALE_ADD_REQUEST, SALE_ADD_SUCCESS, SALE_ADD_FAILURE]
    }
  }
}

export const SALE_UPDATE_REQUEST = 'SALE_UPDATE_REQUEST'
export const SALE_UPDATE_SUCCESS = 'SALE_UPDATE_SUCCESS'
export const SALE_UPDATE_FAILURE = 'SALE_UPDATE_FAILURE'

export function updateSale(number, props) {
  return {
    [CALL_API]: {
      method: 'PUT',
      endpoint: `sales/${number}`,
      authenticated: true,
      body: JSON.stringify(props),
      types: [SALE_UPDATE_REQUEST, SALE_UPDATE_SUCCESS,
              SALE_UPDATE_FAILURE]
    }
  }
}

export const SALE_DELETE_REQUEST = 'SALE_DELETE_REQUEST'
export const SALE_DELETE_SUCCESS = 'SALE_DELETE_SUCCESS'
export const SALE_DELETE_FAILURE = 'SALE_DELETE_FAILURE'

export function deleteSale(id) {
  return {
    [CALL_API]: {
      method: 'DELETE',
      endpoint: `sales/${id}`,
      authenticated: true,
      types: [
        SALE_DELETE_REQUEST,
        SALE_DELETE_SUCCESS,
        SALE_DELETE_FAILURE
      ]
    }
  }
}

export const SALE_RESET = 'SALE_RESET'

export function resetSale() {
  return { type: SALE_RESET }
}

export const DOWNLOAD_REQUEST = 'DOWNLOAD_REQUEST'
export const DOWNLOAD_SUCCESS = 'DOWNLOAD_SUCCESS'
export const DOWNLOAD_FAILURE = 'DOWNLOAD_FAILURE'

export function fetchSalesCSV(machine, customer, startDate, endDate) {
  let params = ''

  if (machine !== undefined) {
    params += `&machine=${machine}`
  }

  if (customer !== undefined) {
    params += `&customer=${customer}`
  }

  if (startDate !== undefined) {
    params += `&startDate=${startDate}`
  }

  if (endDate !== undefined) {
    params += `&endDate=${endDate}`
  }

  return {
    [CALL_API]: {
      method: 'GET',
      endpoint: `sales/csv?${params}`,
      authenticated: true,
      types: [DOWNLOAD_REQUEST, DOWNLOAD_SUCCESS, DOWNLOAD_FAILURE]
    }
  }
}
