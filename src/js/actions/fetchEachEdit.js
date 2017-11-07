import requestEdit from './requestEdit.js'
import receiveEdit from './receiveEdit.js'
import receiveError from './receiveError.js'
import hasHttpError from './hasHttpError.js'
import { getEdit } from '../api/api.js'
import { getId } from './Submission.js'
import { error } from '../utils/log.js'

export default function fetchEachEdit(editTypes) {
  return dispatch => {
    const promises = []
    Object.keys(editTypes).forEach(key => {
      if (key !== 'status' && editTypes[key].edits) {
        editTypes[key].edits.forEach(edit => {
          dispatch(requestEdit(edit.edit))
          promises.push(
            getEdit({ submission: getId(), edit: edit.edit })
              .then(json => {
                return hasHttpError(json).then(hasError => {
                  if (hasError) {
                    dispatch(receiveError(json))
                    throw new Error(`${json.status}: ${json.statusText}`)
                  }
                  return dispatch(receiveEdit(json))
                })
              })
              .catch(err => error(err))
          )
        })
      }
    })
    return Promise.all(promises)
  }
}
