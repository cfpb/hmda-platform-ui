import React from 'react'
import EditsHeaderDescription from './EditsHeaderDescription.jsx'
import EditsTable from './EditsTable.jsx'
import QualityVerifier from '../containers/QualityVerifier.jsx'

const getEdits = (editObj, type, typeFromPath) => {
  let edits
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
  }else{
    edits = editObj.edits
  }
  return edits
}

const filterByType = (type, typeFromPath) => {
  if(type === 'rows' && (typeFromPath === 'quality' || typeFromPath === 'syntacticalvalidity')) return
  if(typeFromPath.indexOf(type) === -1) return true
}

const getLabel = (type, typeFromPath) => {
  let label
  if(type === 'rows'){
    label = typeFromPath === 'quality' ? 'quality' : 'syntactical or validity'
  }else{
    label = type
  }
  return label
}

const renderTables = (edits, type, typeFromPath) => {
  let label

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

const EditsTableWrapper = (props) => {
  const editsObj = props.groupByRow ? props.rows : props.types

  return (
    <div className="EditsContainerBody">
    {
      Object.keys(editsObj).map((type, i) => {
        if(filterByType(type, props.editTypeFromPath)) return null
        const edits = getEdits(editsObj[type], type, props.editTypeFromPath)
        const label = getLabel(editsObj[type])
        return (
          <div className="EditsContainerEntry" key={i}>
            <EditsHeaderDescription count={edits.length} type={type==='rows'?'rows'+props.editTypeFromPath:type} onDownloadClick={props.onDownloadClick}/>
            {renderTables(edits, type, props.editTypeFromPath)}
            {type === 'quality' ? <QualityVerifier/> : null}
            {type === 'syntactical' ? <hr /> : null}
          </div>
        )
      })
    }
    </div>
  )
}

export default EditsTableWrapper
