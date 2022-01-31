import {
  INCIDENCES_REQUEST, INCIDENCES_SUCCESS, INCIDENCES_FAILURE,
  INCIDENCE_REQUEST, INCIDENCE_SUCCESS, INCIDENCE_FAILURE,
  INCIDENCE_ADD_REQUEST, INCIDENCE_ADD_SUCCESS, INCIDENCE_ADD_FAILURE,
  INCIDENCE_UPDATE_REQUEST, INCIDENCE_UPDATE_SUCCESS, INCIDENCE_UPDATE_FAILURE,
  INCIDENCE_RESET
} from '../actions/incidences'

const INITIAL_STATE = {
  incidences: null, incidence: null, error: null, loading: false
}

const incidencesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case INCIDENCES_REQUEST:
        return {
          ...state,
          error: null, loading: true
        }
      case INCIDENCES_SUCCESS:
        return {
          ...state,
          incidences: action.response, error: null, loading: false
        }
      case INCIDENCES_FAILURE:
        return {
          ...state,
          error: action.error, loading: false
        }
      case INCIDENCE_REQUEST:
        return {
          ...state,
          error: null, loading: true
        }
      case INCIDENCE_SUCCESS:
        return {
          ...state,
          incidence: action.response, error: null, loading: false
        }
      case INCIDENCE_FAILURE:
        return {
          ...state,
          error: action.error, loading: false
        }
      case INCIDENCE_ADD_REQUEST:
        return {
          ...state,
          error: null, loading: true
        }
      case INCIDENCE_ADD_SUCCESS:
        return {
          ...state,
          incidence: action.response, error: null, loading: false
        }
      case INCIDENCE_ADD_FAILURE:
        return {
          ...state,
          error: action.error, loading: false
        }
      case INCIDENCE_UPDATE_REQUEST:
        return {
          ...state,
          error: null, loading: true
        }
      case INCIDENCE_UPDATE_SUCCESS:
        return {
          ...state,
          incidence: action.response, error: null, loading: false
        }
      case INCIDENCE_UPDATE_FAILURE:
        return {
          ...state,
          error: action.error, loading: false
        }
      case INCIDENCE_RESET:
        return {
          ...state,
          incidence: null, error: null, loading: false
        }
      default:
        return state
    }
  }

export default incidencesReducer

