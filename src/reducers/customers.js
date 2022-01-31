import {
  CUSTOMERS_REQUEST, CUSTOMERS_SUCCESS, CUSTOMERS_FAILURE,
  CUSTOMER_REQUEST, CUSTOMER_SUCCESS, CUSTOMER_FAILURE,
  CUSTOMER_ADD_REQUEST, CUSTOMER_ADD_SUCCESS, CUSTOMER_ADD_FAILURE,
  CUSTOMER_UPDATE_REQUEST, CUSTOMER_UPDATE_SUCCESS, CUSTOMER_UPDATE_FAILURE,
  CUSTOMER_RESET
} from '../actions/customers'

const INITIAL_STATE = {
  customers: null, customersNeedRefresh: false, customer: null, error: null,
  loading: false
}

const customersReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case CUSTOMERS_REQUEST:
        return {
          ...state,
          customers: null, error: null, loading: true
        }
      case CUSTOMERS_SUCCESS:
        return {
          ...state,
          customers: action.response, error: null, loading: false
        }
      case CUSTOMERS_FAILURE:
        return {
          ...state,
          error: action.error, loading: false
        }
      case CUSTOMER_REQUEST:
        return {
          ...state,
          error: null, loading: true
        }
      case CUSTOMER_SUCCESS:
        return {
          ...state,
          customer: action.response, error: null, loading: false
        }
      case CUSTOMER_FAILURE:
        return {
          ...state,
          error: action.error, loading: false
        }
      case CUSTOMER_ADD_REQUEST:
        return {
          ...state,
          error: null, loading: true
        }
      case CUSTOMER_ADD_SUCCESS:
        return {
          ...state,
          customer: action.response, customersNeedRefresh: true, error: null,
          loading: false
        }
      case CUSTOMER_ADD_FAILURE:
        return {
          ...state,
          error: action.error, loading: false
        }
      case CUSTOMER_UPDATE_REQUEST:
        return {
          ...state,
          error: null, loading: true
        }
      case CUSTOMER_UPDATE_SUCCESS:
        return {
          ...state,
          customer: action.response, customersNeedRefresh: true, error: null,
          loading: false
        }
      case CUSTOMER_UPDATE_FAILURE:
        return {
          ...state,
          error: action.error, loading: false
        }
      case CUSTOMER_RESET:
        return {
          ...state,
          customer: null, error: null, loading: false
        }
      default:
        return state
    }
  }

export default customersReducer

