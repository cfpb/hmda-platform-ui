import React, { Component } from 'react'
import { connect } from 'react-redux'
import EditsTableWrapper from './TableWrapper.jsx'
import fetchEditType from '../../actions/fetchEditType.js'
import fetchEdits from '../../actions/fetchEdits.js'

export class EditsContainer extends Component {
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

  render() {
    return <EditsTableWrapper {...this.props} />
  }
}

export function mapStateToProps(state) {
  const { isFetching, types } = state.app.edits
  const { pagination } = state.app

  return {
    isFetching,
    types,
    pagination
  }
}

function mapDispatchToProps(dispatch) {
  return { dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditsContainer)
