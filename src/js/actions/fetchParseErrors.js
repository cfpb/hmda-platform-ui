// downloading the csv edit reports, no reducer required
export function fetchCSV(institutionId, filing, submissionId) {
  return dispatch => {
    dispatch(requestCSV())
    return getCSV({
      id: institutionId,
      filing: filing,
      submission: submissionId
    })
    .then(csv => {
      if(hasHttpError(csv)) throw new Error(JSON.stringify(dispatch(receiveError(csv))))
      return fileSaver.saveAs(new Blob([csv], {type: 'text/csv;charset=utf-16'}), `${submissionId}-full-edit-report.csv`)
    })
    .catch(err => console.error(err))
  }
}
