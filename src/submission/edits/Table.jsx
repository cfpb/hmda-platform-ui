import React from 'react'
import PropTypes from 'prop-types'
import Pagination from '../../pagination/container.jsx'
import Loading from '../../common/Loading.jsx'
import EditsTableRow from './TableRow.jsx'

export const formatHeader = text => {
  if (text === 'rowId') return 'Loan/Application Number'
  if (text === 'edit') return 'Edit ID'
  if (text === 'editId') return 'Edit ID'
  if (text === 'description') return 'Description'
  return text
}

export const renderHeader = (edits, rows, type) => {
  let cellCount = 0
  const cells = []

  let keyCells = rows[0].row
  const fieldCells = rows[0].fields

  const numOfCells =
    Object.keys(keyCells).length + Object.keys(fieldCells).length
  const cellWidth = `${100 / numOfCells}%`

  Object.keys(keyCells).forEach(field => {
    cells.push(
      <th key={++cellCount} width={cellWidth}>
        {formatHeader(field)}
      </th>
    )
  })

  Object.keys(fieldCells).forEach(field => {
    cells.push(
      <th key={++cellCount} width={cellWidth}>
        {formatHeader(field)}
      </th>
    )
  })

  return <tr>{cells}</tr>
}

export const renderBody = (edits, rows, type) => {
  return rows.map((row, i) => {
    return <EditsTableRow row={row.row} fields={row.fields} key={i} />
  })
}

export const renderTableCaption = (edit, rowObj, type, pagination) => {
  const name = edit.edit
  if (!name) return null

  const description = edit.description
  const length = pagination.total

  const editText = length === 1 ? 'edit' : 'edits'
  let captionHeader =
    type === 'macro'
      ? `Edit ${name} found`
      : `${name} ${editText} (${length} found)`

  if (type === 'macro' || name === 'S040') {
    return (
      <div className="caption">
        <h3>{captionHeader}</h3>
        {description ? <p>{description}</p> : null}
        {name === 'S040' ? (
          <p>
            Please check your file or system of record for duplicate
            application/loan numbers.
          </p>
        ) : null}
      </div>
    )
  }

  return (
    <caption>
      <h3>{captionHeader}</h3>
      {description ? <p>{description}</p> : null}
    </caption>
  )
}

export const makeTable = props => {
  const edit = props.edit
  const name = edit.edit
  const type = props.type
  const rowObj = props.rowObj
  const pagination = props.pagination

  if (!rowObj || !rowObj.rows) return <Loading />

  const caption = renderTableCaption(edit, rowObj, type, pagination)
  if (type === 'macro' || name === 'S040') return caption

  let className = 'PaginationTarget'
  className += props.paginationFade ? ' fadeOut' : ''

  return (
    <table
      width="100%"
      className={className}
      summary={`Report for edit ${edit.edit} - ${edit.description}`}
    >
      {caption}
      <thead>{renderHeader(edit, rowObj.rows, type)}</thead>
      <tbody>{renderBody(edit, rowObj.rows, type)}</tbody>
    </table>
  )
}

const EditsTable = props => {
  if (!props.edit || !props.pagination) return null
  const name = props.edit.edit
  const rowObj = props.rowObj

  return (
    <section className="EditsTable" id={name}>
      {makeTable(props)}
      {props.type === 'macro' ? null : (
        <Pagination isFetching={!rowObj || rowObj.isFetching} target={name} />
      )}
    </section>
  )
}

EditsTable.propTypes = {
  edit: PropTypes.object,
  rowObj: PropTypes.object,
  type: PropTypes.string,
  pagination: PropTypes.object,
  paginationFade: PropTypes.number
}

export default EditsTable
