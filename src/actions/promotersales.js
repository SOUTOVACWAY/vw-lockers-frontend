import { CALL_API } from '../middleware/api'

export const PROMOTERSALES_REQUEST = 'PROMOTERSALES_REQUEST'
export const PROMOTERSALES_SUCCESS = 'PROMOTERSALES_SUCCESS'
export const PROMOTERSALES_FAILURE = 'PROMOTERSALES_FAILURE'

export function fetchPromoterSaleStatistics(machine, startDate, endDate) {
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
      endpoint: `promotersales?${params}`,
      authenticated: true,
      types: [PROMOTERSALES_REQUEST, PROMOTERSALES_SUCCESS, PROMOTERSALES_FAILURE]
    }
  }
}
