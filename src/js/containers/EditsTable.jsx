import React from 'react'

import EditsTableRow from '../components/EditsTableRow.jsx'

const rowForEachLarTypes = ['syntactical', 'validity', 'quality']

const rowForEachLar = (val) => rowForEachLarTypes.indexOf(val) !== -1

const renderHeader = (props) => {
  let row = props.lars ? props.lars[0] : props.data[0]
  if (rowForEachLar(props.type)) row = row.lar

  return (
    <tr>
      {
        Object.keys(row).map((header, i) => {
          if(header === 'loanId') header = 'Row ID'
          if(header === 'edit') header = 'Edit ID'
          if(header === 'justifications') header = 'Justifications'
          return <th key={i}>{header}</th>
        })
      }
    </tr>
  )
}

const renderTS = (ts) => {
  if (ts) {
    return (
      <tr>
        <td>Transmittal Sheet</td>
      </tr>
    )
  }
}

const renderBody = (props) => {
  // if there is no props.lars (macro)
  if (!props.lars) {
    return props.data.map((macro, i) => {
      return <EditsTableRow row={macro} key={i}/>
    })
  }
  return props.lars.map((row, i) => {
    if(row.lar) row = row.lar
    return <EditsTableRow row={row} key={i}/>
  })
}

const EditsTable = (props) => {
  let editCount = !props.lars ? props.data.length : props.lars.length
  editCount = props.ts ? (editCount + 1) : (editCount)

  return (
    <div className="EditsTable bg-color-white">
      <table width="100%" className="margin-top-1">
        <caption>
          <h3>{props.label ? `${props.label} - ${editCount}`: null}</h3>
          <p>{props.desc? `${props.desc}`: null}</p>
        </caption>
        <thead>
          {renderHeader(props)}
        </thead>
        <tbody>
          {renderTS(props.ts)}
          {renderBody(props)}
        </tbody>
      </table>
    </div>
  )
}

export default EditsTable
