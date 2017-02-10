import React, { Component } from 'react'
import { connect } from 'react-redux'
import EditsTableWrapper from '../components/EditsTableWrapper.jsx'
import SortPicker from '../containers/SortPicker.jsx'
import { fetchEditsByType, fetchEditsByRow, fetchCSVByType } from '../actions'

export class EditsContainer extends Component {
  constructor(props) {
      super(props)
  }

  componentDidMount() {
    if(!this.props.fetched) this.getEditsByGrouping()
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

export function mapStateToProps(state) {
  const {
    isFetching,
    fetched,
    groupByRow,
    types,
    rows
  } = state.app.edits

  const editTypeFromPath = state.routing.locationBeforeTransitions.pathname.split('/').slice(-1)[0]

  return {
    isFetching,
    fetched,
    groupByRow,
    types,
    rows,
    editTypeFromPath
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // triggered by a edit type download click
    onDownloadClick: (type) => {
      dispatch(fetchCSVByType(type))
    },
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditsContainer)
