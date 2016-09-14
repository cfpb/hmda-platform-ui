import React, { PropTypes } from 'react'

import EditsTableCell from '../components/EditsTableCell.jsx'

const EditsTableRow = props => {
  return <tr>
    {
      Object.keys(props.row).map((field, i) => {
        return <EditsTableCell field={field} cell={props.row[field]} key={i}/>
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

