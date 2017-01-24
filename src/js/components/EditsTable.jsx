import React, { PropTypes } from 'react'

import EditsTableRow from './EditsTableRow.jsx'

const formatHeader = (text) => {
  if (text === 'rowId') return 'Row ID'
  if (text === 'edit') return 'Edit ID'
  if (text === 'justifications') return 'Justifications'
  if (text === 'description') return 'Description'
  return text
}

const renderHeader = (props) => {
  let row
  let cellCount = 0
  let keyCells
  let fieldCells = {}
  const cells = []

  if (props.type === 'macro' ){
    keyCells = props.edits[0]
  }else if (props.type === 'rows' ){
    keyCells = {editId: props.edits.edits[0].editId}
    fieldCells = props.edits.edits[0].fields
  }else{
    keyCells = props.edits.rows[0].row
    fieldCells = props.edits.rows[0].fields
  }

  Object.keys(keyCells).forEach((field) => {
    cells.push(<th key={++cellCount}>{formatHeader(field)}</th>)
  })

  Object.keys(fieldCells).forEach((field) => {
    cells.push(<th key={++cellCount}>{formatHeader(field)}</th>)
  })

  return <tr>{cells}</tr>
}

const renderBody = (props) => {
  if (props.type === 'macro') {
    return props.edits.map((macro, i) => {
      return <EditsTableRow row={macro} key={i}/>
    })
  }
  if (props.type === 'rows') {
    return props.edits.edits.map((edit, i) => {
      return <EditsTableRow row={{editId:edit.editId}} fields={edit.fields} key={i}/>
    })
  }
  return props.edits.rows.map((row, i) => {
    return <EditsTableRow row={row.row} fields={row.fields} key={i}/>
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

  const editText = length === 1 ? 'edit' : 'edits'

  return (
    <div className="EditsTable">
      <table width="100%" className="margin-top-1">
        <caption>
          <h3>{name ? `${length} ${name} ${editText} found.`:null}</h3>
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
