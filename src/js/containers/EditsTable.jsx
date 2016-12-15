import React from 'react'

import EditsTableRow from '../components/EditsTableRow.jsx'

const rowForEachLarTypes = ['syntactical', 'validity', 'quality']

const rowForEachLar = (val) => rowForEachLarTypes.indexOf(val) !== -1

/*const renderHeader = (props) => {
  let row = props.lars[0]
  if (rowForEachLar(props.type)) row = row.lar

  return (
    <tr>
      {
        Object.keys(row).map((header, i) => {
          return <th key={i}>{header}</th>
        })
      }
    </tr>
  )
}*/

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
      <table width="100%">
        <caption><h3>{props.label ? props.label : null} - {editCount}</h3></caption>
        <thead>
          {/*renderHeader(props)*/}
          <tr><th>Row ID</th></tr>
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
