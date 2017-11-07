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
    if (!this.props.fetched && !this.props.isFetching)
      this.props.dispatch(fetchEdits())
  }

  didPaginationUpdate(oldFade, newFade) {
    const nextKeys = Object.keys(newFade)

    for (let i = 0; i < nextKeys.length; i++) {
      if (oldFade[nextKeys[i]] !== newFade[nextKeys[i]]) return true
    }

    return false
  }

  shouldComponentUpdate(nextProps) {
    if (!Object.keys(nextProps.paginationFade).length) return true
    return this.didPaginationUpdate(
      this.props.paginationFade,
      nextProps.paginationFade
    )
  }

  render() {
    return <EditsTableWrapper {...this.props} />
  }
}

export function mapStateToProps(state) {
  const { isFetching, fetched, types, rows } = state.app.edits

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
