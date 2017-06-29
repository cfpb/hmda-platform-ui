import React, { Component } from 'react'
import { connect } from 'react-redux'
import submissionProgressHOC from './submissionProgressHOC.jsx'
import Wrapper from '../components/EditsTableWrapper.jsx'
import fetchEdits from '../actions/fetchEdits.js'

const EditsTableWrapper = submissionProgressHOC(Wrapper)

export class EditsContainer extends Component {
  constructor(props) {
      super(props)
  }

  componentDidMount() {
    if(!this.props.fetched && !this.props.isFetching) this.props.dispatch(fetchEdits())
  }

  render() {
    return (
      <EditsTableWrapper {...this.props}/>
    )
  }
}

export function mapStateToProps(state) {
  const {
    isFetching,
    fetched,
    types,
    rows
  } = state.app.edits

  const { pagination } = state.app
  const { paginationFade } = state.app

  return {
    isFetching,
    fetched,
    types,
    rows,
    pagination,
    paginationFade
  }
}

export default connect(mapStateToProps)(EditsContainer)
