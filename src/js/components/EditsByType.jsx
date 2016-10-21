import React from 'react'
import EditsHeaderDescription from './EditsHeaderDescription.jsx'
import EditsTable from '../containers/EditsTable.jsx'

const renderTables = (editObj, type) => {
  const edits = editObj.edits

  if(edits.length === 0) {
    return <h4>No edits found</h4>
  }

  if(edits[0] && !edits[0].lars){
    return <EditsTable data={edits} type={type} label={edits.edit} />
  }

  return edits.map((edit, i) => {
    return <EditsTable lars={edit.lars} ts={edit.ts} type={type} label={edit.edit} key={i}/>
  })
}

const EditsByType = (props) => {
  return (
    <div className="EditsContainerBody">
      {
        Object.keys(props.types).map((type, i) => {
          return (
            <div className="EditsContainerEntry" key={i}>
              <EditsHeaderDescription count={props.types[type].edits.length} type={type} />
              {
                renderTables(props.types[type], type)
              }
            </div>
          )
        })
      }
    </div>
  )
}

export default EditsByType
