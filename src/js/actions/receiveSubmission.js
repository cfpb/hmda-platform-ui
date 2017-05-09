export function receiveSubmission(data) {
  latestSubmissionId = data.id.sequenceNumber

  return {
    type: types.RECEIVE_SUBMISSION,
    ...data
  }
}
