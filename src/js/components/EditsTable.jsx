import React, { PropTypes } from 'react'
import Pagination from '../containers/Pagination.jsx'
import LoadingIcon from './LoadingIcon.jsx'
import EditsTableRow from './EditsTableRow.jsx'

export const formatHeader = (text) => {
  if (text === 'rowId') return 'Row ID'
  if (text === 'edit') return 'Edit ID'
  if (text === 'editId') return 'Edit ID'
  if (text === 'description') return 'Description'
  return text
}

export const renderHeader = (edits, rows, type) => {
  let row
  let cellCount = 0
  const cells = []

  let keyCells = rows[0].row
  const fieldCells = rows[0].fields

  const numOfCells = Object.keys(keyCells).length + Object.keys(fieldCells).length
  const cellWidth = `${100/numOfCells}%`

  Object.keys(keyCells).forEach((field) => {
    cells.push(<th key={++cellCount} width={cellWidth}>{formatHeader(field)}</th>)
  })

  Object.keys(fieldCells).forEach((field) => {
    cells.push(<th key={++cellCount} width={cellWidth}>{formatHeader(field)}</th>)
  })

  return <tr>{cells}</tr>
}

export const renderBody = (edits, rows, type) => {
  return rows.map((row, i) => {
    return <EditsTableRow row={row.row} fields={row.fields} key={i}/>
  })
}

export const renderTableCaption = (edit, rowObj, type, pagination) => {
  const name = edit.edit
  if(!name) return null

  const description = edit.description
  const length = pagination[name].total


  const editText = length === 1 ? 'edit' : 'edits'
  const captionHeader = `${length} ${name} ${editText} found.`

  if(type === 'macro') {
    return (
      <div className="caption">
        <h3>{captionHeader}</h3>
        {description ? <p className="usa-font-lead">{description}</p>:null}
      </div>
    )
  }

  return (
    <caption className="caption">
      <h3>{captionHeader}</h3>
      {description ? <p className="usa-font-lead">{description}</p>:null}
    </caption>
  )
}

export const makeTable = (props) => {
  const edit = props.edit
  const type = props.type
  const rowObj = props.rows[edit.edit]

  if(!rowObj || rowObj.isFetching) return <LoadingIcon/>

  return (
    type === 'macro'
    ? renderTableCaption(edit, rowObj, type, props.pagination)
    : <table width="100%">
        {renderTableCaption(edit, rowObj, type, props.pagination)}
        <thead>
          {renderHeader(edit, rowObj.rows, type)}
        </thead>
        <tbody>
          {renderBody(edit, rowObj.rows, type)}
        </tbody>
      </table>
  )
}


const EditsTable = (props) => {
  if (!props.edit) return null

  return (
    <div className="EditsTable" id={props.edit.edit}>
      {makeTable(props)}
      {props.type === 'macro' ? null : <Pagination target={props.edit.edit}/>}
    </div>
  )
}

EditsTable.propTypes = {
  edits: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  type: PropTypes.string
}

export default EditsTable
