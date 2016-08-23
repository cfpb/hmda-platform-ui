/*
  renderByRow: function(){
    return (
      <div className="EditsContainerBody">
        <EditsHeaderDescription>Loan Application Records</EditsHeaderDescription>
        <EditsGrouped group={this.state.lars} groupByRow={this.state.groupByRow} appStatus={this.props.appStatus}/>

        <EditsHeaderDescription>Macro Edits</EditsHeaderDescription>
        <EditsMacro edits={this.state.macro} appStatus={this.props.appStatus}/>

        <EditsHeaderDescription>Q595 Edits</EditsHeaderDescription>
        <EditsQ595 group={this.state.q595.edits}/>
      </div>
    )
  },
  */
import React, { PropTypes } from 'react'

const EditsByRow = (props) => {
  console.log(props.rows)
  return <div>there</div>
}

export default EditsByRow
