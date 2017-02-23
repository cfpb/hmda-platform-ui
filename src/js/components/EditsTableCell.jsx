import React, { PropTypes } from 'react'

import JustificationSelector from '../containers/JustificationSelector.jsx'

export const renderCell = (props) => {
  const { field, cell, keyField } = props
  if(field === 'justifications') return <JustificationSelector edit={keyField} justifications={cell}/>
  if(field === 'verified') return 'veriholder'
  return cell
}

const EditsTableCell = props => {
  return <td>{renderCell(props)}</td>
}

EditsTableCell.propTypes = {
  field: PropTypes.string,
  cell: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.array
  ])
}

EditsTableCell.defaultProps = {
  field: '',
  cell: ''
}

export default EditsTableCell
