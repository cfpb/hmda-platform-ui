export function fetchEachInstitution(institutions) {
  return dispatch => {
    return Promise.all(
      institutions.map( institution => {
        dispatch(fetchInstitution(institution))
      })
    )
  }
}
