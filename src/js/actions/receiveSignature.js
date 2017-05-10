export function receiveSignature(data) {
  return {
    type: types.RECEIVE_SIGNATURE,
    timestamp: data.timestamp,
    receipt: data.receipt
  }
}
