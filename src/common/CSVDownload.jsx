import React, { Component } from 'react'
import { connect } from 'react-redux'
import fetchCSV from '../actions/fetchCSV.js'

export class CSVContainer extends Component {
  constructor() {
    super()
    this.state = { isFetching: false }
  }

  render() {
    console.log('rendering CSVcontainer', this.props)
    return React.Children.map(this.props.children, child => {
      return React.cloneElement(child, this.props)
    })
  }
}

export function mapStateToProps(state) {
  const { submission } = state.app

  return { submission }
}

export function mapDispatchToProps(dispatch) {
  // triggered by a click on "Download edit report"
  const onDownloadClick = (institutionId, filing, submissionId) => {
    return e => {
      e.preventDefault()
      dispatch(fetchCSV(institutionId, filing, submissionId)).then(() => {})
    }
  }

  return { onDownloadClick }
}

export default connect(mapStateToProps, mapDispatchToProps)(CSVContainer)
