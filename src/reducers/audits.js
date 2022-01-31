import {
  AUDITS_REQUEST, AUDITS_SUCCESS, AUDITS_FAILURE,
  AUDITS_RESET
} from '../actions/audits'

const INITIAL_STATE = {
  audits: null, error: null, loading: false
}

const auditsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case AUDITS_REQUEST:
        return {
          ...state,
          error: null, loading: true
        }
      case AUDITS_SUCCESS:
        return {
          ...state,
          audits: action.response, error: null, loading: false
        }
      case AUDITS_FAILURE:
        return {
          ...state,
          error: action.error, loading: false
        }
      case AUDITS_RESET:
        return {
          ...state,
          audits: null, error: null, loading: false
        }
      default:
        return state
    }
  }

export default auditsReducer


