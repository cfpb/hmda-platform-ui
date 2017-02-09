import { connect } from 'react-redux'

function mapStateToProps(state) {

  const pathname = state.routing ? state.routing.locationBeforeTransitions.pathname : ''
  const page = pathname.split('/').slice(-1)[0]
  const base = pathname.split('/').slice(0,-1).join('/')

  const {
   submission
  } = state.app || {
    status: {
      code: 1,
      message: ''
    }
  }

  const {
    types
  } = state.app.edits || {types: {
    syntactical: {edits: []},
    validity: {edits: []},
    quality: {edits: []},
    macro: {edits: []}
  }}

  const code = submission.status.code

  const syntacticalValidityEditsExist = types.syntactical.edits.length !== 0 ||
    types.validity.edits.length !== 0
  const qualityVerified = types.quality.verified
  const macroVerified = types.macro.edits.filter(edit => {
    return edit.justifications.filter(justification => {
      return justification.verified
    }).length
  }).length === types.macro.edits.length

  return {page, base, code, syntacticalValidityEditsExist, qualityVerified, macroVerified}
}

export default component => {
  return connect(mapStateToProps)(component)
}
