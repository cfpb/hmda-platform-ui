import React from 'react'
import EditsHeaderDescription from './EditsHeaderDescription.jsx'
import EditsTable from '../containers/EditsTable.jsx'

const EditsByType = (props) => {
  return (
    <div className="EditsContainerBody">
      {
        Object.keys(props.types).map((type, i) => {
          return (
            <div className="EditsContainerEntry" key={i}>
              <EditsHeaderDescription>{type}</EditsHeaderDescription>
              {
                props.types[type].edits.map((edit, i) => {
                  return <EditsTable rows={edit.lars} label={edit.edit} key={i}/>
                })
              }
            </div>
          )
        })
      }
    </div>
  )
}

export default EditsByType
