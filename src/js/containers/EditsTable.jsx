import React from 'react'

const renderHeader = (row) => {
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

const EditsTable = (props) => {
  if(!props.rows) return null

  if(!props.rows.length){
    return (
      <div className="EditsGrouped">
        <h4><span className="cf-icon cf-icon-approved"></span>No edits found</h4>
      </div>
    )
  }

  return (
    <div className="EditsTable">
      {props.label}
      <table width="100%">
        <thead>
          {renderHeader(props.rows[0])}
        </thead>
        <tbody>
          {
            props.rows.map((row, i) => {
              return (
                <tr key={i}>
                  {
                    Object.keys(row.lar).map((field, i) => {
                      return <td key={i}>{row.lar[field]}</td>
                    })
                  }
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default EditsTable
