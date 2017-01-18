import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchEditsByType, fetchEditsByRow, requestCSVByType } from '../actions'
import EditsByType from '../components/EditsByType.jsx'
import EditsByRow from '../components/EditsByRow.jsx'


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
    var Subcomponent = this.props.groupByRow ? EditsByRow : EditsByType
    return (
      <div className="EditsContainer">
        <Subcomponent {...this.props}/>
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

function mapDispatchToProps(dispatch) {
  return {
    // triggered by a edit type download click
    onDownloadClick: (type) => {
      dispatch(requestCSVByType(type))
    },
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditsContainer)
