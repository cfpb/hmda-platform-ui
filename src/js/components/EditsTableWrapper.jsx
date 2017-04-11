import React from 'react'
import EditsHeaderDescription from './EditsHeaderDescription.jsx'
import LoadingIcon from './LoadingIcon.jsx'
import EditsTable from './EditsTable.jsx'
import Verifier from '../containers/Verifier.jsx'

export const makeEntry = (props, type) => {
  const edits = props.types[type].edits
  return <div className="EditsContainerEntry">
    <EditsHeaderDescription
      count={edits.length}
      type={type}
    />
    {renderTables(props, edits, type)}
  </div>
}

export const renderTables = (props, edits, type) => {
  if(edits.length === 0) {
    return (
      <div className="usa-alert usa-alert-success">
        <div className="usa-alert-body">
          <p className="usa-alert-text">Your data did not trigger any <strong>{type}</strong> edits.</p>
        </div>
      </div>
    )
  }

  return edits.map((edit, i) => {
    return <EditsTable pagination={props.pagination} edit={edit} rows={props.rows} type={type} key={i}/>
  })
}

const EditsTableWrapper = (props) => {
  const type = props.editTypeFromPath
  return props.isFetching
  ? <LoadingIcon/>
  : <div className="EditsContainerBody">
      {type === 'syntacticalvalidity' ? makeEntry(props, 'syntactical') : makeEntry(props, type)}
      {type === 'syntacticalvalidity' ? makeEntry(props, 'validity') : null}
      {(type === 'quality' || type === 'macro') ? <Verifier type={type}/> : null}
      <hr/>
    </div>
}

export default EditsTableWrapper
