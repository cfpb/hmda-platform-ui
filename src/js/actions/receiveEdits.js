export default function receiveEdits(data) {
  return {
    type: types.RECEIVE_EDITS,
    edits: data
  }
}
