import React, { PropTypes } from 'react'

import EditsTableRow from '../components/EditsTableRow.jsx'

const renderHeader = (props) => {
  let row = (props.type !== 'macro') ? props.edits.rows[0].row : props.edits[0]
  return (
    <tr>
      {
        Object.keys(row).map((header, i) => {
          if(header === 'rowId') header = 'Row ID'
          if(header === 'edit') header = 'Edit ID'
          if(header === 'justifications') header = 'Justifications'
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
  return props.edits.rows.map((row, i) => {
    return <EditsTableRow row={row.row} key={i}/>
  })
}

const EditsTable = (props) => {
  const edits = props.edits
  const { edit, description } = props.edits
  return (
    <div className="EditsTable bg-color-white">
      <table width="100%" className="margin-top-1">
        <caption>
          <h3>{edit ? `${edit} - ${length}`: null}</h3>
          <p>{description ? `${description}`: null}</p>
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

EditsTable.defaultProps = {
  edits: []
}

export default EditsTable
