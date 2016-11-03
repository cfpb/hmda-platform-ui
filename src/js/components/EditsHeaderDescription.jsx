import React, { PropTypes } from 'react'

const getText = (editType) => {
  let id = null
  let title = null
  let desc = null

  switch (editType) {
    case 'lar':
      id = 'lar'
      title = 'Loan Application Records'
      desc = 'LAR refers to the loan/application register. Loan/Application Register means both the record of information required to be collected pursuant to § 1003.4 and the record submitted annually or quarterly, as applicable, pursuant to § 1003.5(a).'
      break
    case 'syntactical':
      id = 'syntactical'
      title = 'Syntactical Edits'
      desc = 'Edits that check whether the loan/application register is in the correct format and whether the data covers the correct filing year. The loan/application register cannot be filed until the filer corrects all syntactical edit errors and reuploads the updated loan/application register to the HMDA Platform.'
      break
    case 'validity':
      id = 'validity'
      title =  'Validity Edits'
      desc = 'Edits that check whether there are valid values in each data field. The loan/application register cannot be filed until the filer corrects all validity edit errors and reuploads the updated loan/application register to the HMDA Platform.'
      break
    case 'quality':
      id = 'quality'
      title =  'Quality Edits'
      desc = 'Edits that check whether entries in the individual data fields or combinations of data fields conform to expected values. The loan/application register cannot be filed until the filer either confirms the accuracy of all values flagged by quality edits in the HMDA Platform, or corrects the flagged values and reuploads the updated loan/application register to the HMDA Platform.'
      break
    case 'macro':
      id = 'marco'
      title =  'Macro Edits'
      desc = 'Edits that check whether the submitted loan/application register as a whole conforms to expected values. The loan/application register cannot be filed until the filer either confirms the accuracy of all the values flagged by the macro quality edits in the HMDA Platform or corrects the flagged values and reuploads the updated loan/application register to the HMDA Platform.'
      break
    default:
      throw new Error('Unexpected edit type. Unable to create edit description')
  }

  return {id, title, desc}
}

const EditsHeaderDescription = (props) => {
  const textObj = getText(props.type)
  return (
    <div className="EditsHeaderDescription" id={textObj.id}>
      <h2>{textObj.title} - {props.count}</h2>
      <p className="usa-font-lead">{textObj.desc}</p>
    </div>
  )
}

EditsHeaderDescription.propTypes = {
  type: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired
}

export default EditsHeaderDescription
