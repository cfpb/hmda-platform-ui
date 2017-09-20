import React from 'react'
import PropTypes from 'prop-types'

export const getText = (editType, count) => {
  let id = null
  //let title = count === 0 ? '' : ' types of '
  let title = null
  /*if (count === 0) {
    title = ''
  } else if (count === 1) {
    title = ' type of '
  }*/
  let desc = null

  switch (editType) {
    case 'syntacticalvalidity':
      id = 'syntacticalvalidity'
      title = 'Syntactical and validity edits'
      desc =
        'Syntactical edits show if the loan/application register format is incorrect and if the data doesn’t cover the correct filing year. Validity edits show if there are invalid values in data fields. Your HMDA data cannot be submitted until syntactical and validity edits are corrected in your file.'
      break
    case 'quality':
      id = 'quality'
      title = 'Quality edits'
      desc =
        'Quality edits show if data fields do not conform to expected values. Your HMDA file cannot be submitted until the data has been verified or your file has been corrected.'
      break
    case 'macro':
      id = 'macro'
      title = 'Macro edits'
      desc =
        'Macro quality edits check whether the submitted loan/application register as a whole conforms to expected values. The loan/application register cannot be submitted until the filer either confirms the accuracy of all the values flagged by the macro quality edits in the HMDA Platform or corrects the flagged values and reuploads the updated loan/application register to the HMDA Platform.'
      break
    default:
      throw new Error('Unexpected edit type. Unable to create edit description')
  }

  return { id, title, desc }
}

const EditsHeaderDescription = ({ type, count }) => {
  const { id, title, desc } = getText(type, count)

  return (
    <header className="EditsHeaderDescription" id={id}>
      <h2>
        {title} ({count} found)
      </h2>
      <p className="usa-font-lead">{desc}</p>
    </header>
  )
}

EditsHeaderDescription.propTypes = {
  type: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired
}

export default EditsHeaderDescription
