import React, { PropTypes } from 'react'

const EditsByType = (props) => {
  return (
    <div className="EditsContainerBody">
      <EditsHeaderDescription>Syntactical Edits</EditsHeaderDescription>
      <EditsGrouped group={this.state.syntactical.edits} groupByRow={this.state.groupByRow} appStatus={this.props.appStatus}/>

      <EditsHeaderDescription>Validity Edits</EditsHeaderDescription>
      <EditsGrouped group={this.state.validity.edits} groupByRow={this.state.groupByRow} appStatus={this.props.appStatus}/>

      <EditsHeaderDescription>Quality Edits</EditsHeaderDescription>
      <EditsGrouped group={this.state.quality.edits} groupByRow={this.state.groupByRow} appStatus={this.props.appStatus}/>

      <EditsHeaderDescription>Macro Edits</EditsHeaderDescription>
      <EditsMacro edits={this.state.macro} appStatus={this.props.appStatus}/>

      <EditsHeaderDescription>Q595 Edits</EditsHeaderDescription>
      <EditsQ595 group={this.state.q595.edits}/>
    </div>
  )

export default EditsByType
