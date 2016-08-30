import React, { Component, PropTypes } from 'react'

export default class DivisionHeader extends Component {
  render() {
    return (
      <h2 className="DivisionHeader">{this.props.children}</h2>
    )
  }
}

DivisionHeader.propTypes = {
  children: React.PropTypes.string.isRequired
}
