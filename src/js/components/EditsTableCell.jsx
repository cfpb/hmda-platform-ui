import React, { PropTypes } from 'react'

const EditsTableCell = props => {
  return <td>{props.cell}</td>
}

EditsTableCell.propTypes = {
  cell: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ])
}

EditsTableCell.defaultProps = {
  cell: ''
}

export default EditsTableCell
