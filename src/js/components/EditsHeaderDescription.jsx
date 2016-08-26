import React, { PropTypes } from 'react'

const getText = (editType) => {
  let title = null
  let desc = null

  switch (editType) {
    case 'lar':
      title = 'Loan Application Records'
      desc = 'This is the LAR description'
      break
    case 'syntactical':
      title = 'Syntactical Edits'
      desc = 'This is the syntactical description.'
      break
    case 'validity':
      title =  'Validity Edits'
      desc = 'This is the validity description.'
      break
    case 'quality':
      title =  'Quality Edits'
      desc = 'This is the quality description.'
      break
    case 'macro':
      title =  'Macro Edits'
      desc = 'This is the macro description.'
      break
    case 'q595':
      title =  'Q595 Edits'
      desc = 'MSA/MD not on respondent panel.'
      break
    default:
      throw new Error('Unexpected edit type. Unable to create edit description')
  }

  return {title, desc}
}

const EditsHeaderDescription = (props) => {
  const textObj = getText(props.children)
  return (
    <div className="EditsHeaderDescription">
      <h2>{textObj.title}</h2>
      <p>{textObj.desc}</p>
    </div>
  )
}

EditsHeaderDescription.propTypes = {
  children: PropTypes.string.isRequired
}

export default EditsHeaderDescription
