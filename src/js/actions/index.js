import { getInstitution, getInstitutions } from '../api'
import * as types from '../constants'



export function requestInstitutions() {
  return {
    type: types.REQUEST_INSTITUTIONS
  }
}

export function receiveInstitutions(data) {
  return {
    type: types.RECEIVE_INSTITUTIONS,
    institutions: data.institutions
  }
}

export function requestInstitution() {
  return {
    type: types.REQUEST_INSTITUTION
  }
}

export function receiveInstitution(data) {
  return {
    type: types.RECEIVE_INSTITUTION,
    institution: data
  }
}

export function clearFilings() {
  return {
    type: types.CLEAR_FILINGS
  }
}

export function fetchInstitutions() {
  return dispatch => {
    dispatch(requestInstitutions())
    return getInstitutions()
      .then(json => dispatch(receiveInstitutions(json)))
      .then(receiveAction => fetchEachInstitution(receiveAction.institutions)(dispatch))
      .catch(err => console.log(err))
  }
}

export function fetchEachInstitution(institutions) {
  return dispatch => {
    dispatch(clearFilings())
    return Promise.all(
      institutions.map( institution => {
        fetchInstitution(institution)(dispatch)
      })
    )
  }
}

export function fetchInstitution(institution) {
  return dispatch => {
    dispatch(requestInstitution())
    return getInstitution(institution.id)
      .then(json => dispatch(receiveInstitution(json)))
      .catch(err => console.log(err))
  }
}

