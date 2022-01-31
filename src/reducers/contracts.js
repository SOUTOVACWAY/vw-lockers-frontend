import {
  CONTRACTS_REQUEST, CONTRACTS_SUCCESS, CONTRACTS_FAILURE,
  CONTRACT_REQUEST, CONTRACT_SUCCESS, CONTRACT_FAILURE,
  CONTRACT_POP_REQUEST, CONTRACT_POP_SUCCESS, CONTRACT_POP_FAILURE,
  CONTRACT_ADD_REQUEST, CONTRACT_ADD_SUCCESS, CONTRACT_ADD_FAILURE,
  CONTRACT_UPDATE_REQUEST, CONTRACT_UPDATE_SUCCESS, CONTRACT_UPDATE_FAILURE,
  CONTRACT_RESET
} from '../actions/contracts'

const INITIAL_STATE = {
  contracts: null, contractsNeedRefresh: false, contract: null,
  populatedContract: null, error: null, loading: false
}

const contractsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case CONTRACTS_REQUEST:
        return {
          ...state,
          contracts: null, error: null, loading: true
        }
      case CONTRACTS_SUCCESS:
        return {
          ...state,
          contracts: action.response, error: null, loading: false
        }
      case CONTRACTS_FAILURE:
        return {
          ...state,
          error: action.error, loading: false
        }
      case CONTRACT_REQUEST:
        return {
          ...state,
          error: null, loading: true
        }
      case CONTRACT_SUCCESS:
        return {
          ...state,
          contract: action.response, error: null, loading: false
        }
      case CONTRACT_FAILURE:
        return {
          ...state,
          error: action.error, loading: false
        }
      case CONTRACT_POP_REQUEST:
        return {
          ...state,
          error: null, loading: true
        }
      case CONTRACT_POP_SUCCESS:
        return {
          ...state,
          populatedContract: action.response, error: null, loading: false
        }
      case CONTRACT_POP_FAILURE:
        return {
          ...state,
          error: action.error, loading: false
        }
      case CONTRACT_ADD_REQUEST:
        return {
          ...state,
          error: null, loading: true
        }
      case CONTRACT_ADD_SUCCESS:
        return {
          ...state,
          contractsNeedRefresh: true, contract: action.response, error: null,
          loading: false
        }
      case CONTRACT_ADD_FAILURE:
        return {
          ...state,
          error: action.error, loading: false
        }
      case CONTRACT_UPDATE_REQUEST:
        return {
          ...state,
          error: null, loading: true
        }
      case CONTRACT_UPDATE_SUCCESS:
        return {
          ...state,
          contractsNeedRefresh: true, contract: action.response, error: null,
          loading: false
        }
      case CONTRACT_UPDATE_FAILURE:
        return {
          ...state,
          error: action.error, loading: false
        }
      case CONTRACT_RESET:
        return {
          ...state,
          contract: null, error: null, loading: false
        }
      default:
        return state
    }
  }

export default contractsReducer
