import React from 'react'

const perEditTypes = ['synactical', 'validity', 'quality']

const isPerEdit = (val) => perEditTypes.indexOf(val) !== -1

const renderHeader = (props) => {
  let row = props.data[0]
  if (isPerEdit(props)) row = row.lar

  return (
    <tr>
      {
        Object.keys(row).map((header, i) => {
          return <td className="table-header" key={i}>{header}</td>
        })
      }
    </tr>
  )
}

const renderBody = (props) => {
  return props.data.map((row, i) => {
    if(row.lar) row = row.lar

    return (
      <tr key={i}>
        {
          Object.keys(row).map((field, i) => {
            return <td key={i}>{typeof row[field] === 'object' ? 'placeholder' : '' + row[field]}</td>
          })
        }
      </tr>
    )
  })
}

const EditsTable = (props) => {
  if(!props.data || !props.data.length){
    return (
      <div className="EditsGrouped">
        <h4><span className="cf-icon cf-icon-approved"></span>No edits found</h4>
      </div>
    )
  }

  return (
    <div className="EditsTable">
      {props.label ? props.label : null}
      <table width="100%">
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

export default EditsTable
