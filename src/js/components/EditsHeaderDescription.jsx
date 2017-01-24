import React, { PropTypes } from 'react'

const getText = (editType, count) => {
  let id = null
  let title = null
  let desc = null

  switch (editType) {
    case 'lar':
      id = 'lar'
      title = count === 1 ? 'Loan Application Record' : 'Loan Application Records'
      desc = 'LAR refers to the loan/application register. Loan/Application Register means both the record of information required to be collected pursuant to § 1003.4 and the record submitted annually or quarterly, as applicable, pursuant to § 1003.5(a).'
      break
    case 'syntactical':
      id = 'syntactical'
      title = count === 1 ? 'Syntactical Edit' : 'Syntactical Edits'
      desc = 'Edits that check whether the loan/application register is in the correct format and whether the data covers the correct filing year. The loan/application register cannot be filed until the filer corrects all syntactical edit errors and reuploads the updated loan/application register to the HMDA Platform.'
      break
    case 'validity':
      id = 'validity'
      title = count === 1 ? 'Validity Edit' : 'Validity Edits'
      desc = 'Edits that check whether there are valid values in each data field. The loan/application register cannot be filed until the filer corrects all validity edit errors and reuploads the updated loan/application register to the HMDA Platform.'
      break
    case 'quality':
      id = 'quality'
      title = count === 1 ? 'Quality Edit' : 'Quality Edits'
      desc = 'Edits that check whether entries in the individual data fields or combinations of data fields conform to expected values. The loan/application register cannot be filed until the filer either confirms the accuracy of all values flagged by quality edits in the HMDA Platform, or corrects the flagged values and reuploads the updated loan/application register to the HMDA Platform.'
      break
    case 'macro':
      id = 'macro'
      title = count === 1 ? 'Macro Edit' : 'Macro Edits'
      desc = 'Edits that check whether the submitted loan/application register as a whole conforms to expected values. The loan/application register cannot be filed until the filer either confirms the accuracy of all the values flagged by the macro quality edits in the HMDA Platform or corrects the flagged values and reuploads the updated loan/application register to the HMDA Platform.'
      break
    case 'rows':
      id = 'rowheader'
      title =  'Edits by Row'
      desc = 'Syntactical, Validity, and Quality edits grouped together by row from the source file.'
      break
    default:
      throw new Error('Unexpected edit type. Unable to create edit description')
  }

  return {id, title, desc}
}

const renderCSVLink = (props) => {
  if(props.count === 0) return null

  return (
    <p><a href="#" onClick={(e) => {
      e.preventDefault()
      props.onDownloadClick(props.type)
    }}>Download {props.type} edits (CSV)</a></p>
  )
}

const EditsHeaderDescription = (props) => {
  const { type, count } = props
  const { id, title, desc } = getText(type, count)
  const headingClass = count > 0 ? 'text-secondary' : 'text-green'

  return (
    <div className="EditsHeaderDescription" id={id}>
      <h2 className={headingClass}>{count} {title}</h2>
      <p className="usa-font-lead">{desc}</p>
      {renderCSVLink(props)}
    </div>
  )
}

EditsHeaderDescription.propTypes = {
  type: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired
}

export default EditsHeaderDescription
