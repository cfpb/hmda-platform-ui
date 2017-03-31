import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchVerifyMacro } from '../actions'
import MacroVerifier from '../components/MacroVerifier.jsx'

class MacroVerifierContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <MacroVerifier {...this.props} />
  }
}

function mapStateToProps(state) {
  const {
    types
  } = state.app.edits

  const verified = types && types.macro.verified !== undefined
    ? (types.macro.verified || types.macro.edits.length === 0)
    : false

  return {
    verified
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onVerify: (checked) => {
      dispatch(fetchVerifyMacro(checked))
    }
  }
}

MacroVerifierContainer.propTypes = {
  verified: React.PropTypes.bool.isRequired,
  onVerify: React.PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(MacroVerifierContainer)
export {MacroVerifierContainer, mapStateToProps, mapDispatchToProps }
