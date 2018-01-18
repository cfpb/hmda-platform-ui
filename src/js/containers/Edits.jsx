import React, { Component } from 'react'
import { connect } from 'react-redux'
import submissionProgressHOC from './submissionProgressHOC.jsx'
import EditsTableWrapper from '../components/EditsTableWrapper.jsx'
import fetchEdits from '../actions/fetchEdits.js'
import fetchEditType from '../actions/fetchEditType.js'

export class EditsContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (!this.props.editsFetched && !this.props.isFetching)
      this.props.dispatch(fetchEdits())
  }

  getNeededEdits(props = this.props) {
    if (
      props.page === 'syntacticalvalidity' &&
      !props.syntacticalValidityFetched &&
      !props.types.syntactical.isFetching &&
      !props.types.validity.isFetching
    ) {
      props.dispatch(fetchEditType('syntactical'))
      props.dispatch(fetchEditType('validity'))
    } else if (
      props.page === 'quality' &&
      !props.qualityFetched &&
      !props.types.quality.isFetching
    ) {
      props.dispatch(fetchEditType('quality'))
    } else if (
      props.page === 'macro' &&
      !props.macroFetched &&
      !props.types.macro.isFetching
    ) {
      props.dispatch(fetchEditType('macro'))
    }
  }

  componentWillMount() {
    this.getNeededEdits()
  }

  componentWillReceiveProps(nextProps) {
    this.getNeededEdits(nextProps)
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
  const { isFetching, types, rows } = state.app.edits

  const { pagination } = state.app
  const { paginationFade } = state.app

  return {
    isFetching,
    types,
    rows,
    pagination,
    paginationFade
  }
}

function mapDispatchToProps(dispatch) {
  return { dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditsContainer)
