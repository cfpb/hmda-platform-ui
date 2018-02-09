import requestEdit from './requestEdit.js'
import receiveEdit from './receiveEdit.js'
import requestEditType from './requestEditType.js'
import receiveEditType from './receiveEditType.js'
import receiveError from './receiveError.js'
import hasHttpError from './hasHttpError.js'
import { getEdit } from '../api/api.js'
import { error } from '../utils/log.js'

export default function fetchEditType(type) {
  return (dispatch, getState) => {
    dispatch(requestEditType(type))
    const promises = []
    const editTypes = getState().app.edits.types
    editTypes[type].edits.forEach(edit => {
      dispatch(requestEdit(edit.edit))
      promises.push(
        getEdit({ edit: edit.edit })
          .then(json => {
            return hasHttpError(json).then(hasError => {
              if (hasError) {
                dispatch(receiveError(json))
                throw new Error(json && `${json.status}: ${json.statusText}`)
              }
              return dispatch(receiveEdit(json))
            })
          })
          .catch(err => error(err))
      )
    })
    return Promise.all(promises).then(json => {
      return dispatch(receiveEditType(type))
    })
  }
}
