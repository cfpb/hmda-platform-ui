import { connect } from 'react-redux'

function mapStateToProps(state) {
  if (!state || !state.routing || !state.app) return

  const pathname = state.routing.locationBeforeTransitions.pathname
  const page = pathname.split('/').slice(-1)[0]
  const base = pathname
    .split('/')
    .slice(0, -1)
    .join('/')

  const { code } = state.app.submission.status
  const editsFetched = state.app.edits.fetched
  const qualityExists = !!state.app.edits.types.quality.edits.length
  const qualityVerified = state.app.edits.types.quality.verified

  return {
    page,
    base,
    code,
    editsFetched,
    qualityExists,
    qualityVerified
  }
}

export default component => {
  return connect(mapStateToProps)(component)
}

export { mapStateToProps }
