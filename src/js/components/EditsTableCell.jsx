import React, { PropTypes } from 'react'

export const renderCell = (props) => {
  const { field, cell, keyField } = props
  if(field === 'verified') return <td>veriholder</td>
  if(Array.isArray(cell)) return null
  return <td>{cell}</td>
}

const EditsTableCell = props => {
  console.log('EditsTableCell')
  console.log(props)
  return renderCell(props)
}

EditsTableCell.propTypes = {
  field: PropTypes.string,
  cell: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.array
  ]),
  keyField: PropTypes.string
}

EditsTableCell.defaultProps = {
  field: '',
  cell: ''
}

export default EditsTableCell
