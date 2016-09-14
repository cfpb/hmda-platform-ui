import React, { PropTypes } from 'react'

import JustificationSelector from '../containers/JustificationSelector.jsx'

const renderCell = (field, cell) => {
  console.log(cell)
  if(field === 'justifications') return <JustificationSelector justifications={cell}/>
  if(field === 'verified') return 'veriholder'//<JustificationSelector/>
  return cell
}

const EditsTableCell = props => {
  return <td>{renderCell(props.field, props.cell)}</td>
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
