import { connect } from 'react-redux'

export const verifyMacro = edits => {
  return edits.filter(edit => {
    return edit.justifications.filter(justification => {
      return justification.verified
    }).length
  }).length === edits.length
}

function mapStateToProps(state) {

  if(!state || !state.routing || !state.app) return

  const pathname = state.routing.locationBeforeTransitions.pathname
  const page = pathname.split('/').slice(-1)[0]
  const base = pathname.split('/').slice(0,-1).join('/')

  const { code } = state.app.submission.status
  const { types, fetched } = state.app.edits

  const syntacticalValidityEditsExist = !fetched || types.syntactical.edits.length !== 0 ||
    types.validity.edits.length !== 0
  const qualityVerified = types.quality.verified || types.quality.edits.length === 0
  const macroVerified = verifyMacro(types.macro.edits)

  return {page, base, code, syntacticalValidityEditsExist, qualityVerified, macroVerified}
}

export default component => {
  return connect(mapStateToProps)(component)
}

export { mapStateToProps }
