export default function fetchPage(target, pathname) {
  return dispatch => {
    dispatch(getPaginationRequestAction(target))
    return fetch({pathname: pathname})
      .then(json => {
        if(hasHttpError(json)) throw new Error(JSON.stringify(dispatch(receiveError(json))))
        return dispatch(getPaginationReceiveAction(target, json))
      })
      .catch(err => console.error(err))
  }
}
