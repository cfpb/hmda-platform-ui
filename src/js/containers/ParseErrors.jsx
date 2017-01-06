import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchParseErrors } from '../actions'
import ParseErrors from '../components/ParseErrors.jsx'

class ParseErrorsContainer extends Component {
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

function mapStateToProps(state) {
  const {
    isFetching,
    transmittalSheetErrors,
    larErrors
  } = state.app.parseErrors || {
    isFetching: true,
    transmittalSheetErrors: [],
    larErrors: []
  }

  return {
    isFetching,
    transmittalSheetErrors,
    larErrors
  }
}

export default connect(mapStateToProps)(ParseErrorsContainer)
