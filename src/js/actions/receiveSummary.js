export function receiveSummary(data) {
  return {
    type: types.RECEIVE_SUMMARY,
    respondent: data.respondent,
    file: data.file
  }
}
