import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchEditsByType, fetchEditsByRow } from '../actions'
import EditsTableWrapper from '../components/EditsTableWrapper.jsx'
import SortPicker from '../containers/SortPicker.jsx'


class EditsContainer extends Component {
  constructor(props) {
      super(props)
  }

  componentDidMount() {
    this.getEditsByGrouping()
  }


  getEditsByGrouping() {
    const selectedFetch = this.props.groupByRow ? fetchEditsByRow : fetchEditsByType
    this.props.dispatch(selectedFetch())
  }

  render() {
    return (
      <div className="EditsContainer">
        <SortPicker/>
        <EditsTableWrapper {...this.props}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {
    isFetching,
    groupByRow,
    types,
    rows
  } = state.app.edits || {
    isFetching: true,
    groupByRow: false,
    types: {},
    rows: []
  }

  return {
    isFetching,
    groupByRow,
    types,
    rows
  }
}

export default connect(mapStateToProps)(EditsContainer)
