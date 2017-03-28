import React, { PropTypes } from 'react'

import EditsTableRow from './EditsTableRow.jsx'

export const formatHeader = (text) => {
  if (text === 'rowId') return 'Row ID'
  if (text === 'edit') return 'Edit ID'
  if (text === 'editId') return 'Edit ID'
  if (text === 'description') return 'Description'
  return text
}

export const renderHeader = (edits, type) => {
  let row
  let cellCount = 0
  let keyCells
  let fieldCells = {}
  const cells = []

  if (type === 'macro' ) {
    keyCells = edits[0]
  } else {
    keyCells = edits.rows[0].row
    fieldCells = edits.rows[0].fields
  }

  const numOfCells = Object.keys(keyCells).length + Object.keys(fieldCells).length
  const cellWidth = `${100/numOfCells}%`

  Object.keys(keyCells).forEach((field) => {
    if(field !== 'justifications') {
      cells.push(<th key={++cellCount} width={cellWidth}>{formatHeader(field)}</th>)
    }
  })

  Object.keys(fieldCells).forEach((field) => {
    cells.push(<th key={++cellCount} width={cellWidth}>{formatHeader(field)}</th>)
  })

  return <tr>{cells}</tr>
}

export const renderBody = (edits, type) => {
  if (type === 'macro') {
    return edits.map((macro, i) => {
      return <EditsTableRow row={macro} key={i}/>
    })
  }
  return edits.rows.map((row, i) => {
    return <EditsTableRow row={row.row} fields={row.fields} key={i}/>
  })
}

export const renderTableCaption = (edits) => {
  let name
  let description
  let length

  if(edits.edit) {
    name = edits.edit
    description = edits.description
    length = edits.rows.length
  } else if(edits.rowId) {
    name = edits.rowId
    length = edits.edits.length
  }

  if(!name) return null

  const editText = length === 1 ? 'edit' : 'edits'

  let captionHeader = `${length} ${name} ${editText} found.`
  if(edits.rowId && name !== 'Transmittal Sheet'){
    captionHeader = `${length} ${editText} found in row ${name}.`
  }

  return (
    <caption>
      <h3>{captionHeader}</h3>
      {description ? <p className="usa-font-lead">{description}</p>:null}
    </caption>
  )
}

export const makeTables = (props) => {
  const edits = props.edits

  const makeTable = (edit, i) => {
    return (
    <table width="100%" key={i}>
      {i === 0 ? renderTableCaption(edits):null}
      <thead>
        {renderHeader(edit, props.type)}
      </thead>
      <tbody>
        {renderBody(edit, props.type)}
      </tbody>
    </table>
    )
  }

  if(edits.rowId){
    return edits.edits.map(makeTable)
  }
  return makeTable(edits, 0)
}


const EditsTable = (props) => {
  if (!props.edits) return null

  return (
    <div className="EditsTable">
      {makeTables(props)}
    </div>
  )
}

EditsTable.propTypes = {
  edits: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  type: PropTypes.string
}

export default EditsTable
