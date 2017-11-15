import Analytics from '../utils/analytics.js'

const sendEvent = (action, label) => {
  Analytics.sendEvent(Analytics.getDataLayerOptions(action, label))
}

const eventTracker = store => next => action => {
  //console.log('eventTracker', action)
  const institutionId = store.getState().app.institution.id
  const sequenceNumber = store.getState().app.submission.id.sequenceNumber
  const filingPeriod = store.getState().app.filingPeriod

  if (action.type === 'CHECK_SIGNATURE') {
    sendEvent(
      'Signature checkbox',
      'Signature was checked as ' +
        action.checked +
        ' for ' +
        institutionId +
        ' for submission number ' +
        sequenceNumber +
        ' during filing period ' +
        filingPeriod
    )
  }

  if (action.type === 'REQUEST_CSV') {
    sendEvent(
      'Download edit report',
      'Edit report for submission number ' +
        action.submissionId +
        ' for ' +
        action.institutionId +
        ' during filing period ' +
        action.filing
    )
  }

  if (action.type === 'RECEIVE_SUBMISSION' && action.fileName === '') {
    sendEvent(
      'New submission',
      'A new submission was created for ' +
        action.id.institutionId +
        ' during filing period ' +
        action.id.period +
        ' with sequence number ' +
        action.id.sequenceNumber
    )
  }

  if (action.type === 'VERIFY_QUALITY') {
    sendEvent(
      'Quality checkbox',
      'Quality was checked as ' +
        action.checked +
        ' for ' +
        institutionId +
        ' for submission number ' +
        sequenceNumber +
        ' during filing period ' +
        filingPeriod
    )
  }

  if (action.type === 'VERIFY_MACRO') {
    sendEvent(
      'Macro checkbox',
      'Macro was checked as ' +
        action.checked +
        ' for ' +
        institutionId +
        ' for submission number ' +
        sequenceNumber +
        ' during filing period ' +
        filingPeriod
    )
  }

  if (action.type === 'REQUEST_IRS_CSV') {
    sendEvent(
      'IRS download',
      'IRS downloaded for ' +
        institutionId +
        ' for submission number ' +
        sequenceNumber +
        ' during filing period ' +
        filingPeriod
    )
  }

  if (action.type === 'PAGINATION_FADE_OUT') {
    sendEvent(
      'Pagination',
      action.target +
        ' was paginated for ' +
        store.getState().app.pagination[action.target].total +
        ' records for ' +
        institutionId +
        ' for submission number ' +
        sequenceNumber +
        ' during filing period ' +
        filingPeriod
    )
  }

  return next(action)
}

export default eventTracker
