import api from './api'

export const REQUEST_NEW_SUBMISSION = 'REQUEST_NEW_SUBMISSION'
export const RECEIVE_NEW_SUBMISSION = 'RECEIVE_NEW_SUBMISSION'

export const REQUEST_INSTITUTIONS = 'REQUEST_INSTITUTIONS'
export const RECEIVE_INSTITUTIONS = 'RECEIVE_INSTITUTIONS'

export const REQUEST_UPLOAD = 'REQUEST_UPLOAD'
export const RECEIVE_UPLOAD = 'RECEIVE_UPLOAD'

export const REQUEST_VALIDATION_PROGRESS = 'REQUEST_VALIDATION_PROGRESS'
export const RECEIVE_VALIDATION_PROGRESS = 'RECEIVE_VALIDATION_PROGRESS'

export const VIEW_SUBMISSION = 'VIEW_SUBMISSION'
export const VIEW_HOMEPAGE= 'VIEW_HOMEPAGE'

export function requestInstitutions() {
  return {
    type: REQUEST_INSTITUTIONS
  }
}

export function receiveInstitutions(data) {
  return {
    type: RECEIVE_INSTITUTIONS,
    institutions: data.institutions
  }
}

export function getInstitutions() {
  return dispatch => {
    dispatch(requestInstitutions())
    return api.getInstitutions()
      .then(json => dispatch(receiveInstitutions(json)))
      .catch(err => console.log(err))
  }
}
