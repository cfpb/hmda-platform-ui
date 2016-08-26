import React from 'react'
import EditsHeaderDescription from './EditsHeaderDescription.jsx'
import EditsTable from '../containers/EditsTable.jsx'

const renderTables = (editObj) => {
  const edits = editObj.edits

  if(edits[0] && !edits[0].lars){
    return <EditsTable data={edits} type={editObj.type}/>
  }

  return edits.map((edit, i) => {
    return <EditsTable data={edit.lars} type={editObj.type} label={edit.edit} key={i}/>
  })
}

const EditsByType = (props) => {
  return (
    <div className="EditsContainerBody">
      {
        Object.keys(props.types).map((type, i) => {
          return (
            <div className="EditsContainerEntry" key={i}>
              <EditsHeaderDescription>{type}</EditsHeaderDescription>
              {
                renderTables(props.types[type])
              }
            </div>
          )
        })
      }
    </div>
  )
}

export default EditsByType
