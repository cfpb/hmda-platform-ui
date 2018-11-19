import React, { Component } from 'react'
import { connect } from 'react-redux'
import ValidationProgress from './ValidationProgress.jsx'

export class ValidationProgressContainer extends Component {
  render() {
    return (
      <React.Fragment>
        <ValidationProgress target="uploading" {...this.props} /> 
        <ValidationProgress target="parsing" {...this.props} /> 
        <ValidationProgress target="validating" {...this.props} /> 
      </React.Fragment>
    )
  }
}

export function mapStateToProps(state) {
  const { code } = state.app.submission.status
  const  { progress } = state.app

  return {
    code,
    progress
  }
}


export default connect(
  mapStateToProps
)(ValidationProgressContainer)
