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
      desc = 'Edits that check whether the loan/application register is in the correct format and whether the data covers the correct filing year. The loan/application register cannot be filed until the filer corrects all syntactical edit errors and reuploads the updated loan/application register to the HMDA Platform.'
      break
    case 'validity':
      title =  'Validity Edits'
      desc = 'Edits that check whether there are valid values in each data field. The loan/application register cannot be filed until the filer corrects all validity edit errors and reuploads the updated loan/application register to the HMDA Platform.'
      break
    case 'quality':
      title =  'Quality Edits'
      desc = 'This is the quality description.'
      break
    case 'macro':
      title =  'Macro Edits'
      desc = 'This is the macro description.'
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
      <p className="usa-font-lead">{textObj.desc}</p>
    </div>
  )
}

EditsHeaderDescription.propTypes = {
  children: PropTypes.string.isRequired
}

export default EditsHeaderDescription
