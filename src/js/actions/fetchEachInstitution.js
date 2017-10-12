import fetchInstitution from './fetchInstitution.js'

export default function fetchEachInstitution(institutions) {
  return dispatch => {
    return Promise.all(
      institutions.map(institution => {
        dispatch(fetchInstitution(institution))
      })
    )
  }
}
