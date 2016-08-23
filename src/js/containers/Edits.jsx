import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchEditsByType, fetchEditsByRow } from '../actions'
import EditsByType from '../components/EditsByType.jsx'
import EditsByRow from '../components/EditsByRow.jsx'

/*
var EditsSelector = require('./EditsSelector.jsx');
var EditsGrouped = require('./EditsGrouped.jsx');
var EditsMacro = require('./EditsMacro.jsx');
var EditsQ595 = require('./EditsQ595.jsx');
var EditsHeaderDescription = require('./EditsHeaderDescription.jsx');
*/

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

export default connect(mapStateToProps)(EditsContainer)
