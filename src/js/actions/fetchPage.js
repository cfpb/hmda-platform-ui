import getPaginationReceiveAction from './getPaginationReceiveAction.js'
import receiveError from './receiveError.js'
import hasHttpError from './hasHttpError.js'
import getPaginationRequestAction from './getPaginationRequestAction.js'

import { fetch } from '../api/fetch.js'

export default function fetchPage(target, pathname) {
  return dispatch => {
    dispatch(getPaginationRequestAction(target))
    return fetch({ pathname: pathname })
      .then(json => {
        return new Promise(resolve => {
          setTimeout(
            () =>
              resolve(
                hasHttpError(json).then(hasError => {
                  return hasHttpError(json).then(hasError => {
                    if (hasError) {
                      dispatch(receiveError(json))
                      throw new Error(`${json.status}: ${json.statusText}`)
                    }
                    return dispatch(getPaginationReceiveAction(target, json))
                  })
                })
              ),
            500
          )
        })
      })
      .catch(err => console.error(err))
  }
}
