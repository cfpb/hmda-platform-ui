import { connect } from 'react-redux'

function mapStateToProps(state) {

  if(!state || !state.routing || !state.app) return

  const pathname = state.routing.locationBeforeTransitions.pathname
  const page = pathname.split('/').slice(-1)[0]
  const base = pathname.split('/').slice(0,-1).join('/')

  const { code } = state.app.submission.status
  const {
    types,
    fetched
  } = state.app.edits

  let syntacticalValidityEditsExist = false
  let qualityVerified = false
  let macroVerified = false
  if(code === 8) {
    syntacticalValidityEditsExist = !fetched ||
      types.syntactical.edits.length !== 0 ||
      types.validity.edits.length !== 0
    qualityVerified = types.quality.verified || types.quality.edits.length === 0
    macroVerified = types.macro.verified || types.macro.edits.length === 0
  }

  console.log('HOC')
  console.log(syntacticalValidityEditsExist)
  console.log(qualityVerified)
  console.log(macroVerified)
  return {
    page,
    base,
    code,
    syntacticalValidityEditsExist,
    qualityVerified,
    macroVerified
  }
}

export default component => {
  return connect(mapStateToProps)(component)
}

export { mapStateToProps }
