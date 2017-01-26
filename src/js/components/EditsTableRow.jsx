import React, { PropTypes } from 'react'

import EditsTableCell from '../components/EditsTableCell.jsx'

const EditsTableRow = props => {
  const edit = props.row.edit
  const lar = props.row.rowId
  const cells = []
  let cellCount = 0

  Object.keys(props.row).forEach((field) => {
    cells.push(<EditsTableCell keyField={lar||edit} field={field} cell={props.row[field]} key={++cellCount}/>)
  })

  Object.keys(props.fields).forEach((field) => {
    cells.push(<EditsTableCell keyField={lar||edit} field={field} cell={props.fields[field]} key={++cellCount}/>)
  })

  return <tr>{cells}</tr>
}

EditsTableRow.propTypes = {
  row: PropTypes.object,
  fields: PropTypes.object
}

EditsTableRow.defaultProps = {
  row: {},
  fields: {}
}

export default EditsTableRow
