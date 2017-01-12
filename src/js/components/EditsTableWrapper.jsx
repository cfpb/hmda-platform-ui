import React from 'react'
import EditsHeaderDescription from './EditsHeaderDescription.jsx'
import EditsTable from './EditsTable.jsx'

const renderTables = (editObj, type) => {
  let edits
  let label

  if(type === 'rows'){
    edits = editObj
    label = 'syntactical, validity, or quality'
  }else{
    edits = editObj.edits
    label = type
  }

  if(edits.length === 0) {
    return (
      <div className="usa-alert usa-alert-success margin-top-0">
        <div className="usa-alert-body">
          <h3 className="usa-alert-heading">Success</h3>
          <p className="usa-alert-text">No <strong>{label}</strong> edits found.</p>
        </div>
      </div>
    )
  }

  if(type === 'macro'){
    return <EditsTable edits={edits} type={type}/>
  }

  return edits.map((edit, i) => {
    return <EditsTable edits={edit} type={type} key={i}/>
  })
}

const getCount = (editObj, type) => {
  if(type === 'rows') return editObj.length
  return editObj.edits.length
}

const EditsTableWrapper = (props) => {
  const editObj = props.groupByRow ? props.rows : props.types
  return (
    <div className="EditsContainerBody">
    {
      Object.keys(editObj).map((type, i) => {
        return (
          <div className="EditsContainerEntry" key={i}>
            <EditsHeaderDescription count={getCount(editObj[type], type)} type={type} />
            <div className="border margin-bottom-5 padding-1">
              {renderTables(editObj[type], type)}
            </div>
          </div>
        )
      })
    }
    </div>
  )
}

export default EditsTableWrapper
