import React from 'react'
import EditsHeaderDescription from './EditsHeaderDescription.jsx'
import EditsTable from './EditsTable.jsx'
import Verifier from '../containers/Verifier.jsx'

export const getEdits = (editObj) => {
  return editObj.edits
}

export const filterByType = (type, typeFromPath) => {
  if(typeFromPath.indexOf(type) === -1) return true
}

export const renderTables = (edits, type) => {
  if(edits.length === 0) {
    return (
      <div className="usa-alert usa-alert-success">
        <div className="usa-alert-body">
          <p className="usa-alert-text">Your data did not trigger any <strong>{type}</strong> edits.</p>
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
  const editsObj = props.types

  return (
    <div className="EditsContainerBody">
    {
      Object.keys(editsObj).map((type, i) => {
        if(filterByType(type, props.editTypeFromPath)) return null
        const edits = getEdits(editsObj[type])
        return (
          <div className="EditsContainerEntry" key={i}>
            <EditsHeaderDescription
              count={edits.length}
              type={type}
              onDownloadClick={props.onDownloadClick}
            />
            {renderTables(edits, type)}
            {(type === 'quality' || type === 'macro') ? <Verifier type={type}/> : null}
            {type === 'syntactical' ? <hr /> : null}
          </div>
        )
      })
    }
    </div>
  )
}

export default EditsTableWrapper
