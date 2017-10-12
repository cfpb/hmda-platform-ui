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
    if (
      !this.props.transmittalSheetErrors.length &&
      !this.props.larErrors.length
    )
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

  const pagination = state.app.pagination.parseErrors

  const paginationFade = state.app.paginationFade.parseErrors

  return {
    isFetching,
    transmittalSheetErrors,
    larErrors,
    pagination,
    paginationFade
  }
}

export default connect(mapStateToProps)(ParseErrorsContainer)
