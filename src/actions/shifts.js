import { CALL_API } from '../middleware/api'

export const SHIFTS_REQUEST = 'SHIFTS_REQUEST'
export const SHIFTS_SUCCESS = 'SHIFTS_SUCCESS'
export const SHIFTS_FAILURE = 'SHIFTS_FAILURE'

export function fetchShifts(machine, startDate, endDate) {
  let params = ''

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
      endpoint: `shift?${params}`,
      authenticated: true,
      types: [SHIFTS_REQUEST, SHIFTS_SUCCESS, SHIFTS_FAILURE]
    }
  }
}

export const SHIFTS_RESET = 'SHIFTS_RESET'

export function resetShifts() {
  return { type: SHIFTS_RESET }
}
