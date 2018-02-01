import fetchInstitution from './fetchInstitution.js'

export default function fetchEachInstitution(institutions) {
  return dispatch => {
    return Promise.all(
      institutions.map(institution => {
        return dispatch(fetchInstitution(institution))
      })
    )
  }
}
