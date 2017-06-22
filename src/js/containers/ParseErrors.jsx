import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import fetchParseErrors from '../actions/fetchParseErrors.js'
import ParseErrors from '../components/ParseErrors.jsx'

export class ParseErrorsContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(fetchParseErrors())
  }

  render() {
    return <ParseErrors {...this.props} />
  }
}

export function mapStateToProps(state) {
  const {
    isFetching,
    transmittalSheetErrors,
    larErrors
  } = state.app.parseErrors

  const total = state.app.pagination.parseErrors ?
    state.app.pagination.parseErrors.total :
    null

  const paginationFade = state.app.paginationFade.parseErrors

  return {
    isFetching,
    transmittalSheetErrors,
    larErrors,
    total,
    paginationFade
  }
}

export default connect(mapStateToProps)(ParseErrorsContainer)
