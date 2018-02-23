import React, { Component } from 'react'
import { connect } from 'react-redux'
import CSVDownload from '../common/CSVDownload.jsx'
import RefileWarning from './index.jsx'

export class RefileWarningContainer extends Component {
  render() {
    return (
      <CSVDownload {...this.props}>
        <RefileWarning />
      </CSVDownload>
    )
  }
}

export default connect()(RefileWarningContainer)
