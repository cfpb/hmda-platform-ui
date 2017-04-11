import React, { Component } from 'react'
import { connect } from 'react-redux'
import EditsTableWrapper from '../components/EditsTableWrapper.jsx'
import { fetchEdits } from '../actions'

export class EditsContainer extends Component {
  constructor(props) {
      super(props)
  }

  componentDidMount() {
    if(!this.props.fetched && !this.props.isFetching) this.props.dispatch(fetchEdits())
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
    types,
    rows
  } = state.app.edits

  const editTypeFromPath = state.routing.locationBeforeTransitions.pathname.split('/').slice(-1)[0]
  const {
    pagination
  } = state.app

  return {
    isFetching,
    fetched,
    types,
    rows,
    editTypeFromPath,
    pagination
  }
}

export default connect(mapStateToProps)(EditsContainer)
