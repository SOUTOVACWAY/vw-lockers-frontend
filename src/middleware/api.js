import { API_ROOT } from '../config'
import { AUTH_LOGOUT } from '../actions/auth'
import { DOWNLOAD_REQUEST } from '../actions/sales'

function callApi(method, endpoint, body, authenticated) {
  const token = localStorage.getItem('token') || null
  let config = { method: method }

  if (authenticated) {
    if (token) {
      config = {
        ...config,
        headers: { 'Authorization': `Bearer ${token}` }
      }
    } else {
      throw new Error('No authentication token saved')
    }
  }

  if (body) {
    config = {
      ...config,
      body: body,
      headers: {
        ...config.headers,
        'Content-type': 'application/json'
      }
    }
  }

  return fetch(API_ROOT + endpoint, config)
}

export const CALL_API = 'CALL_API'

const apiMiddleware = store => next => action => {
  const callAPI = action[CALL_API]

  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  const { method, endpoint, body, types, authenticated } = callAPI
  const [ requestType, successType, errorType ] = types

  next({ type: requestType })

  return callApi(method, endpoint, body, authenticated)
    .then(response => {
      if (response.status === 401) {
        localStorage.removeItem('token')
        return next({ type: AUTH_LOGOUT })
      }

      if (requestType === DOWNLOAD_REQUEST) {
        return response.blob()
          .then(blobby => {
            let filename = ''
            let disposition = response.headers.get('Content-disposition')

            if (disposition && disposition.indexOf('attachment') !== -1) {
                let filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                let matches = filenameRegex.exec(disposition);
                if (matches != null && matches[1]) {
                  filename = matches[1].replace(/['"]/g, '')
                }
            }

            let anchor = document.createElement("a")
            document.body.appendChild(anchor);
            let objectUrl = window.URL.createObjectURL(blobby)

            anchor.href = objectUrl
            anchor.download = filename
            anchor.click()

            document.body.removeChild(anchor);
            window.URL.revokeObjectURL(objectUrl);
          })
      } else {
        return response.json()
          .then(json => {
            if (!response.ok) {
              return next({
                error: json,
                type: errorType
              })
            }

            return next({
              response: json,
              type: successType
            })
          })
      }
    })
    .catch(error => {
      return next({
        error: { message: error.message },
        type: errorType
      })
    })
}

export default apiMiddleware
