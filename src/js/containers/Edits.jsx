import React, { Component } from 'react'
import { connect } from 'react-redux'
import EditsTableWrapper from '../components/EditsTableWrapper.jsx'
import { fetchEditsByType, fetchCSVByType } from '../actions'

export class EditsContainer extends Component {
  constructor(props) {
      super(props)
  }

  componentDidMount() {
    if(!this.props.fetched) this.props.dispatch(fetchEditsByType())
  }

  render() {
    return (
      <div className="EditsContainer">
        <EditsTableWrapper {...this.props}/>
      </div>
    )
  }
}

export function mapStateToProps(state) {
  const {
    isFetching,
    fetched,
    types
  } = state.app.edits

  const editTypeFromPath = state.routing.locationBeforeTransitions.pathname.split('/').slice(-1)[0]

  return {
    isFetching,
    fetched,
    types,
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
