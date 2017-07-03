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
          if(!hasError) return dispatch(receiveSubmission(json))

          if(json.status === 404){
            const splitPath = json.url.split('/institutions/')[1].split('/')
            return dispatch(fetchNewSubmission(splitPath[0], splitPath[2]))
          }

          dispatch(receiveError(json))
          throw new Error(`${json.status}: ${json.statusText}`)
        })
      })
      .catch(err => console.error(err))
  }
}
