import receiveParseErrors from './receiveParseErrors.js'
import receiveError from '../../receiveError.js'
import hasHttpError from '../../utils/hasHttpError.js'
import requestParseErrors from './requestParseErrors.js'
import { getId } from '../submission.js'
import { getParseErrors } from '../../api/api.js'
import { error } from '../../utils/log.js'

export default function fetchParseErrors() {
  return dispatch => {
    dispatch(requestParseErrors())
    return getParseErrors(getId())
      .then(json => {
        return hasHttpError(json).then(hasError => {
          if (hasError) {
            dispatch(receiveError(json))
            throw new Error(json && `${json.status}: ${json.statusText}`)
          }
          return dispatch(receiveParseErrors(json))
        })
      })
      .catch(err => error(err))
  }
}
