import { CALL_API } from '../middleware/api'

export const ITEMS_REQUEST = 'ITEMS_REQUEST'
export const ITEMS_SUCCESS = 'ITEMS_SUCCESS'
export const ITEMS_FAILURE = 'ITEMS_FAILURE'

export function fetchItems() {
  return (dispatch, getState) => {
    const items = getState().items

    if (!items.items || items.itemsNeedRefresh) {
      return dispatch({
        [CALL_API]: {
          method: 'GET',
          endpoint: 'items',
          authenticated: true,
          types: [ITEMS_REQUEST, ITEMS_SUCCESS, ITEMS_FAILURE]
        }
      })
    }

    return null
  }
}

export const ITEM_REQUEST = 'ITEM_REQUEST'
export const ITEM_SUCCESS = 'ITEM_SUCCESS'
export const ITEM_FAILURE = 'ITEM_FAILURE'

export function fetchItem(code) {
  return (dispatch, getState) => {
    const item = getState().items.item

    if (!item || item.code !== code) {
      return dispatch({
        [CALL_API]: {
          method: 'GET',
          endpoint: `items/${code}`,
          authenticated: true,
          types: [ITEM_REQUEST, ITEM_SUCCESS, ITEM_FAILURE]
        }
      })
    }

    return null
  }
}

export const ITEM_ADD_REQUEST = 'ITEM_ADD_REQUEST'
export const ITEM_ADD_SUCCESS = 'ITEM_ADD_SUCCESS'
export const ITEM_ADD_FAILURE = 'ITEM_ADD_FAILURE'

export function addItem(item) {
  return {
    [CALL_API]: {
      method: 'POST',
      endpoint: 'items',
      authenticated: true,
      body: JSON.stringify(item),
      types: [ITEM_ADD_REQUEST, ITEM_ADD_SUCCESS, ITEM_ADD_FAILURE]
    }
  }
}

export const ITEM_UPDATE_REQUEST = 'ITEM_UPDATE_REQUEST'
export const ITEM_UPDATE_SUCCESS = 'ITEM_UPDATE_SUCCESS'
export const ITEM_UPDATE_FAILURE = 'ITEM_UPDATE_FAILURE'

export function updateItem(code, props) {
  return {
    [CALL_API]: {
      method: 'PUT',
      endpoint: `items/${code}`,
      authenticated: true,
      body: JSON.stringify(props),
      types: [ITEM_UPDATE_REQUEST, ITEM_UPDATE_SUCCESS,
              ITEM_UPDATE_FAILURE]
    }
  }
}
