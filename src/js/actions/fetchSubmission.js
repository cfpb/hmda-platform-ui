import receiveSubmission from './receiveSubmission.js'
import fetchNewSubmission from './fetchNewSubmission.js'
import hasHttpError from './hasHttpError.js'
import receiveError from './receiveError.js'
import requestSubmission from './requestSubmission.js'
import { getLatestSubmission } from '../api/api.js'

export default function fetchSubmission() {
  return dispatch => {
    dispatch(requestSubmission())
    return getLatestSubmission()
      .then(json => {
        return hasHttpError(json).then(hasError => {
          if(json.httpStatus > 399 && json.httpStatus !== 404){
            throw new Error(JSON.stringify(dispatch(receiveError(json))))
          }
          if(json.httpStatus === 404){
            const splitPath = json.path.split('/')
            return dispatch(fetchNewSubmission(splitPath[2], splitPath[4]))
          }
          return dispatch(receiveSubmission(json))
        })
      })
      .catch(err => console.error(err))
  }
}
