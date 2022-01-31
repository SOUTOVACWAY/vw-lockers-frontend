import { CALL_API } from '../middleware/api'

export const SHIPMENTS_REQUEST = 'SHIPMENTS_REQUEST'
export const SHIPMENTS_SUCCESS = 'SHIPMENTS_SUCCESS'
export const SHIPMENTS_FAILURE = 'SHIPMENTS_FAILURE'

export function fetchShipments(customer, machine) {
  let params = ''

  if (customer !== undefined) {
    params += `&customer=${customer}`
  }

  if (machine !== undefined) {
    params += `&machine=${machine}`
  }

  return {
    [CALL_API]: {
      method: 'GET',
      endpoint: `shipments?${params}`,
      authenticated: true,
      types: [SHIPMENTS_REQUEST, SHIPMENTS_SUCCESS, SHIPMENTS_FAILURE]
    }
  }
}

export const SHIPMENT_REQUEST = 'SHIPMENT_REQUEST'
export const SHIPMENT_SUCCESS = 'SHIPMENT_SUCCESS'
export const SHIPMENT_FAILURE = 'SHIPMENT_FAILURE'

export function fetchShipment(number) {
  if (typeof number === 'string') {
    number = parseInt(number, 10)
  }

  return {
    [CALL_API]: {
      method: 'GET',
      endpoint: `shipments/${number}`,
      authenticated: true,
      types: [SHIPMENT_REQUEST, SHIPMENT_SUCCESS, SHIPMENT_FAILURE]
    }
  }
}

export const SHIPMENT_ADD_REQUEST = 'SHIPMENT_ADD_REQUEST'
export const SHIPMENT_ADD_SUCCESS = 'SHIPMENT_ADD_SUCCESS'
export const SHIPMENT_ADD_FAILURE = 'SHIPMENT_ADD_FAILURE'

export function addShipment(shipment) {
  return {
    [CALL_API]: {
      method: 'POST',
      endpoint: 'shipments',
      authenticated: true,
      body: JSON.stringify(shipment),
      types: [SHIPMENT_ADD_REQUEST, SHIPMENT_ADD_SUCCESS, SHIPMENT_ADD_FAILURE]
    }
  }
}

export const SHIPMENT_UPDATE_REQUEST = 'SHIPMENT_UPDATE_REQUEST'
export const SHIPMENT_UPDATE_SUCCESS = 'SHIPMENT_UPDATE_SUCCESS'
export const SHIPMENT_UPDATE_FAILURE = 'SHIPMENT_UPDATE_FAILURE'

export function updateShipment(number, props) {
  return {
    [CALL_API]: {
      method: 'PUT',
      endpoint: `shipments/${number}`,
      authenticated: true,
      body: JSON.stringify(props),
      types: [SHIPMENT_UPDATE_REQUEST, SHIPMENT_UPDATE_SUCCESS,
              SHIPMENT_UPDATE_FAILURE]
    }
  }
}

export const SHIPMENT_RESET = 'SHIPMENT_RESET'

export function resetShipment() {
  return { type: SHIPMENT_RESET }
}


