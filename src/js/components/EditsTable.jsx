import React, { PropTypes } from 'react'

import EditsTableRow from './EditsTableRow.jsx'

const renderHeader = (props) => {
  let row

  if (props.type === 'macro' ) row = props.edits[0]
  else if (props.type === 'rows' ) row = props.edits.edits[0]
  else row = props.edits.rows[0].row

  return (
    <tr>
      {
        Object.keys(row).map((header, i) => {
          if (header === 'rowId') header = 'Row ID'
          if (header === 'edit') header = 'Edit ID'
          if (header === 'justifications') header = 'Justifications'
          if (header === 'description') header = 'Description'
          return <th key={i}>{header}</th>
        })
      }
    </tr>
  )
}

const renderBody = (props) => {
  if (props.type === 'macro') {
    return props.edits.map((macro, i) => {
      return <EditsTableRow row={macro} key={i}/>
    })
  }
  if (props.type === 'rows') {
    return props.edits.edits.map((edit, i) => {
      return <EditsTableRow row={edit} key={i}/>
    })
  }
  return props.edits.rows.map((row, i) => {
    return <EditsTableRow row={row.row} key={i}/>
  })
}

const EditsTable = (props) => {
  const edits = props.edits

  if (!edits) return null

  let name
  let description = null
  let length

  if(edits.edit) {
    name = edits.edit
    description = edits.description
    length = edits.rows.length
  }else if(edits.rowId) {
    name = edits.rowId
    length = edits.edits.length
  }

  return (
    <div className="EditsTable bg-color-white">
      <table width="100%" className="margin-top-1">
        <caption>
          <h3>{name ? `${name} - ${length}`:null}</h3>
          <p>{description}</p>
        </caption>
        <thead>
          {renderHeader(props)}
        </thead>
        <tbody>
          {renderBody(props)}
        </tbody>
      </table>
    </div>
  )
}

EditsTable.propTypes = {
  edits: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  type: PropTypes.string
}

export default EditsTable
