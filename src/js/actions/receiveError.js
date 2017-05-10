export function receiveError(error) {
  return {
    type: types.RECEIVE_ERROR,
    error: error
  }
}
