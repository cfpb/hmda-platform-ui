import receiveParseErrors from './receiveParseErrors.js'
import receiveError from './receiveError.js'
import hasHttpError from './hasHttpError.js'
import requestParseErrors from './requestParseErrors.js'
import { getId } from './Submission.js'
import { getParseErrors } from '../api/api.js'

export default function fetchParseErrors() {
  return dispatch => {
    dispatch(requestParseErrors())
    return getParseErrors(getId())
      .then(json => {
        return hasHttpError(json).then(hasError => {
          if(hasError) throw new Error(JSON.stringify(dispatch(receiveError(json))))
          return dispatch(receiveParseErrors(json))
        })
      })
      .catch(err => console.error(err))
  }
}
