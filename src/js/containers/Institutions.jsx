import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchInstitutions } from '../actions'
import Institutions from '../components/Institutions.jsx'

class InstitutionContainer extends Component {
  constructor(props) {
      super(props)
  }

  componentDidMount() {
    this.props.dispatch(fetchInstitutions())
  }

  render() {
    return <Institutions {...this.props}/>
  }
}

function mapStateToProps(state) {
  const {
    isFetching,
    institutions
  } = state.app.institutions || {
    isFetching: true,
    institutions: []
  }

  const {
    filings
  } = state.app

  return {
    isFetching,
    institutions,
    filings
  }
}

InstitutionContainer.propTypes = {
  params: PropTypes.object,
  dispatch: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(InstitutionContainer)
