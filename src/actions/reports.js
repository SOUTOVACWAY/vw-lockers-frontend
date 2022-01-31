import { CALL_API } from '../middleware/api'

export const REPORTS_REQUEST = 'REPORTS_REQUEST'
export const REPORTS_SUCCESS = 'REPORTS_SUCCESS'
export const REPORTS_FAILURE = 'REPORTS_FAILURE'

export function fetchReports() {
  return {
    [CALL_API]: {
      method: 'GET',
      endpoint: 'reports',
      authenticated: true,
      types: [REPORTS_REQUEST, REPORTS_SUCCESS, REPORTS_FAILURE]
    }
  }
}

export const REPORT_REQUEST = 'REPORT_REQUEST'
export const REPORT_SUCCESS = 'REPORT_SUCCESS'
export const REPORT_FAILURE = 'REPORT_FAILURE'

export function fetchReport(number) {
  if (typeof number === 'string') {
    number = parseInt(number, 10)
  }
 
  return {
    [CALL_API]: {
      method: 'GET',
      endpoint: `reports/${number}`,
      authenticated: true,
      types: [REPORT_REQUEST, REPORT_SUCCESS, REPORT_FAILURE]
    }
  }
}

export const REPORT_ADD_REQUEST = 'REPORT_ADD_REQUEST'
export const REPORT_ADD_SUCCESS = 'REPORT_ADD_SUCCESS'
export const REPORT_ADD_FAILURE = 'REPORT_ADD_FAILURE'

export function addReport(report) {
  return {
    [CALL_API]: {
      method: 'POST',
      endpoint: 'reports',
      authenticated: true,
      body: JSON.stringify(report),
      types: [REPORT_ADD_REQUEST, REPORT_ADD_SUCCESS, REPORT_ADD_FAILURE]
    }
  }
}

export const REPORT_UPDATE_REQUEST = 'REPORT_UPDATE_REQUEST'
export const REPORT_UPDATE_SUCCESS = 'REPORT_UPDATE_SUCCESS'
export const REPORT_UPDATE_FAILURE = 'REPORT_UPDATE_FAILURE'

export function updateReport(number, props) {
  return {
    [CALL_API]: {
      method: 'PUT',
      endpoint: `reports/${number}`,
      authenticated: true,
      body: JSON.stringify(props),
      types: [REPORT_UPDATE_REQUEST, REPORT_UPDATE_SUCCESS,
              REPORT_UPDATE_FAILURE]
    }
  }
}

export const REPORT_DELETE_REQUEST = 'REPORT_DELETE_REQUEST'
export const REPORT_DELETE_SUCCESS = 'REPORT_DELETE_SUCCESS'
export const REPORT_DELETE_FAILURE = 'REPORT_DELETE_FAILURE'

export function deleteReport(number) {
  return {
    [CALL_API]: {
      method: 'DELETE',
      endpoint: `reports/${number}`,
      authenticated: true,
      types: [
        REPORT_DELETE_REQUEST,
        REPORT_DELETE_SUCCESS,
        REPORT_DELETE_FAILURE
      ]
    }
  }
}

export const REPORT_RESET = 'REPORT_RESET'

export function resetReport() {
  return { type: REPORT_RESET }
}

