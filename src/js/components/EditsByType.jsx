import React from 'react'
import EditsHeaderDescription from './EditsHeaderDescription.jsx'
import EditsTable from '../containers/EditsTable.jsx'
import QualityVerifier from '../containers/QualityVerifier.jsx'

const renderTables = (editObj, type) => {
  const edits = editObj.edits
  if(edits.length === 0) {
    return (
      <div className="usa-alert usa-alert-success margin-top-0">
        <div className="usa-alert-body">
          <h3 className="usa-alert-heading">Success</h3>
          <p className="usa-alert-text">No <strong>{type}</strong> edits found.</p>
        </div>
      </div>
    )
  }

  if(type === 'macro'){
    return <EditsTable data={edits} type={type} />
  }

  const editArray = edits.map((edit, i) => {
    return <EditsTable lars={edit.lars} ts={edit.ts} type={type} label={edit.edit} desc={edit.description} key={i}/>
  })

  if(type === 'quality'){
    return (
      <div>
        {editArray}
        <QualityVerifier/>
      </div>
    )
  }

  return editArray

}

const EditsByType = (props) => {
  return (
    <div className="EditsContainerBody">
      {
        Object.keys(props.types).map((type, i) => {
          return (
            <div className="EditsContainerEntry" key={i}>
              <EditsHeaderDescription count={props.types[type].edits.length} type={type} />
              <div className="border margin-bottom-5 padding-1">
                {renderTables(props.types[type], type)}
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default EditsByType
