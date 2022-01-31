import {
  AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE
} from '../actions/auth'

const INITIAL_STATE = {
  isAuth: false, id: null, fullName: null, role: null, error: null,
  loading: false
}

const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case AUTH_LOGIN_REQUEST:
        return {
          ...state,
          isAuth: false, error: null, loading: true
        }
      case AUTH_LOGIN_SUCCESS:
        return {
          ...state,
          isAuth: true, id: action.data.id, fullName: action.data.fullName,
          role: action.data.role, type: action.data.type, loading: false
        }
      case AUTH_LOGIN_FAILURE:
        return {
          ...state,
          error: action.error, loading: false
        }
      default:
        return state
    }
  }

export default authReducer
