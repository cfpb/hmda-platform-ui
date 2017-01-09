import React, { PropTypes } from 'react'

import EditsTableCell from '../components/EditsTableCell.jsx'

const EditsTableRow = props => {
  const edit = props.row.edit
  const lar = props.row.rowId
  return <tr>
    {
      Object.keys(props.row).map((field, i) => {
        return <EditsTableCell keyField={lar||edit} field={field} cell={props.row[field]} key={i}/>
      })
    }
  </tr>
}

EditsTableRow.propTypes = {
  row: PropTypes.object
}

EditsTableRow.defaultProps = {
  row: {}
}

export default EditsTableRow
