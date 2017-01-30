import React from 'react'
import EditsHeaderDescription from './EditsHeaderDescription.jsx'
import EditsTable from './EditsTable.jsx'

const filterByType = (editObj, type, typeFromPath) => {
  if(type === 'rows' && (typeFromPath === 'quality' || typeFromPath === 'syntacticalvalidity')) return
  if(typeFromPath.indexOf(type) === -1) return true
}

const renderTables = (editObj, type, typeFromPath) => {
  let edits
  let label

  if(type === 'rows'){
    edits = JSON.parse(JSON.stringify(editObj))
    editObj.forEach((editOverview,i) => {
      edits[i].edits = editOverview.edits.filter((edit)=>{
        return (typeFromPath === 'quality' && edit.editId.slice(0,1) === 'Q') ||
          (typeFromPath !== 'quality' && edit.editId.slice(0,1) !== 'Q')
      })
    })
    edits = edits.filter((editOverview) => {
      return editOverview.edits.length
    })
    label = typeFromPath === 'quality' ? 'quality' : 'syntactical or validity'
  }else{
    edits = editObj.edits
    label = type
  }

  if(edits.length === 0) {
    return (
      <div className="usa-alert usa-alert-success">
        <div className="usa-alert-body">
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
        if(filterByType(editObj, type, props.editTypeFromPath)) return null
        return (
          <div className="EditsContainerEntry" key={i}>
            <EditsHeaderDescription count={getCount(editObj[type], type)} type={type} onDownloadClick={props.onDownloadClick}/>
            {renderTables(editObj[type], type, props.editTypeFromPath)}
          </div>
        )
      })
    }
    </div>
  )
}

export default EditsTableWrapper
