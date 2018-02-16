import { connect } from 'react-redux'
import fetchCSV from '../actions/fetchCSV.js'

export function mapStateToProps(state) {
  const { submission } = state.app

  return { submission }
}

export function mapDispatchToProps(dispatch) {
  // triggered by a click on "Download edit report"
  const onDownloadClick = (institutionId, filing, submissionId) => {
    dispatch(fetchCSV(institutionId, filing, submissionId))
  }

  return { onDownloadClick }
}

export default component => {
  return connect(mapStateToProps, mapDispatchToProps)(component)
}
