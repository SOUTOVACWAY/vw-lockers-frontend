import { CALL_API } from '../middleware/api'

export const INCIDENCES_REQUEST = 'INCIDENCES_REQUEST'
export const INCIDENCES_SUCCESS = 'INCIDENCES_SUCCESS'
export const INCIDENCES_FAILURE = 'INCIDENCES_FAILURE'

export function fetchIncidences(status, machine, startDate, endDate) {
  let params = ''

  if (status !== undefined) {
    params += `&status=${status}`
  }

  if (machine !== undefined) {
    params += `&machine=${machine}`
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
      endpoint: `incidences?${params}`,
      authenticated: true,
      types: [INCIDENCES_REQUEST, INCIDENCES_SUCCESS, INCIDENCES_FAILURE]
    }
  }
}

export const INCIDENCE_REQUEST = 'INCIDENCE_REQUEST'
export const INCIDENCE_SUCCESS = 'INCIDENCE_SUCCESS'
export const INCIDENCE_FAILURE = 'INCIDENCE_FAILURE'

export function fetchIncidence(number) {
  if (typeof number === 'string') {
    number = parseInt(number, 10)
  }

  return {
    [CALL_API]: {
      method: 'GET',
      endpoint: `incidences/${number}`,
      authenticated: true,
      types: [INCIDENCE_REQUEST, INCIDENCE_SUCCESS, INCIDENCE_FAILURE]
    }
  }
}

export const INCIDENCE_ADD_REQUEST = 'INCIDENCE_ADD_REQUEST'
export const INCIDENCE_ADD_SUCCESS = 'INCIDENCE_ADD_SUCCESS'
export const INCIDENCE_ADD_FAILURE = 'INCIDENCE_ADD_FAILURE'

export function addIncidence(incidence) {
  return {
    [CALL_API]: {
      method: 'POST',
      endpoint: 'incidences',
      authenticated: true,
      body: JSON.stringify(incidence),
      types: [INCIDENCE_ADD_REQUEST, INCIDENCE_ADD_SUCCESS,
              INCIDENCE_ADD_FAILURE]
    }
  }
}

export const INCIDENCE_UPDATE_REQUEST = 'INCIDENCE_UPDATE_REQUEST'
export const INCIDENCE_UPDATE_SUCCESS = 'INCIDENCE_UPDATE_SUCCESS'
export const INCIDENCE_UPDATE_FAILURE = 'INCIDENCE_UPDATE_FAILURE'

export function updateIncidence(number, props) {
  if (typeof number === 'string') {
    number = parseInt(number, 10)
  }

  return {
    [CALL_API]: {
      method: 'PUT',
      endpoint: `incidences/${number}`,
      authenticated: true,
      body: JSON.stringify(props),
      types: [INCIDENCE_UPDATE_REQUEST, INCIDENCE_UPDATE_SUCCESS,
              INCIDENCE_UPDATE_FAILURE]
    }
  }
}

export const INCIDENCE_RESET = 'INCIDENCE_RESET'

export function resetIncidence() {
  return { type: INCIDENCE_RESET }
}

export const DOWNLOAD_REQUEST = 'DOWNLOAD_REQUEST'
export const DOWNLOAD_SUCCESS = 'DOWNLOAD_SUCCESS'
export const DOWNLOAD_FAILURE = 'DOWNLOAD_FAILURE'

export function fetchIncidencesCSV(status, machine, startDate, endDate) {
  let params = ''

  if (status !== undefined) {
    params += `&status=${status}`
  }
  
  if (machine !== undefined) {
    params += `&machine=${machine}`
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
      endpoint: `incidences/csv?${params}`,
      authenticated: true,
      types: [DOWNLOAD_REQUEST, DOWNLOAD_SUCCESS, DOWNLOAD_FAILURE]
    }
  }
}