import React, { Component, PropTypes } from 'react'

const DivisionHeader = (props) => {
  return <h2 className="DivisionHeader">{props.children}</h2>
}

DivisionHeader.propTypes = {
  children: React.PropTypes.string.isRequired
}

export default DivisionHeader
