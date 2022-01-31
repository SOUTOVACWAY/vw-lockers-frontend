import { CALL_API } from '../middleware/api'

export const AUDITS_REQUEST = 'AUDITS_REQUEST'
export const AUDITS_SUCCESS = 'AUDITS_SUCCESS'
export const AUDITS_FAILURE = 'AUDITS_FAILURE'

export function fetchAudits(machine, type, startDate, endDate) {
  let params = ''

  if (machine !== undefined) {
    params += `&machine=${machine}`
  }

  if (type !== undefined) {
    params += `&type=${type}`
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
      endpoint: `audit?${params}`,
      authenticated: true,
      types: [AUDITS_REQUEST, AUDITS_SUCCESS, AUDITS_FAILURE]
    }
  }
}

export const AUDITS_RESET = 'AUDITS_RESET'

export function resetAudits() {
  return { type: AUDITS_RESET }
}

export const DOWNLOAD_REQUEST = 'DOWNLOAD_REQUEST'
export const DOWNLOAD_SUCCESS = 'DOWNLOAD_SUCCESS'
export const DOWNLOAD_FAILURE = 'DOWNLOAD_FAILURE'

export function fetchAuditsCSV(machine, type, startDate, endDate) {
  let params = ''

  if (machine !== undefined) {
    params += `&machine=${machine}`
  }

  if (type !== undefined) {
    params += `&type=${type}`
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
      endpoint: `audit/csv?${params}`,
      authenticated: true,
      types: [DOWNLOAD_REQUEST, DOWNLOAD_SUCCESS, DOWNLOAD_FAILURE]
    }
  }
}