import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const ValidationProgress = (props) => {
  const code = props.status.code

  let uploadComplete = 'Uploading...'
  let parsingStatus = null
  let validationStatus = null
  let reviewEdits = null

  if(code > 2) uploadComplete = 'Upload complete'
  if(code > 3) parsingStatus = 'Parsing started...'
  if(code > 4) parsingStatus = 'Parsing complete'
  if(code > 6) validationStatus = 'Validation started...'
  if(code > 7) validationStatus = 'Validation complete'
  if(code > 7) reviewEdits = <Link className='Navlink' to={props.base + '/edits'}>Review Edits</Link>

  return (
    <div className="usa-width-one-half">
      <ul className="ValidationProgress usa-unstyled-list">
        <li>{uploadComplete}</li>
        <li>{parsingStatus}</li>
        <li>{validationStatus}</li>
        <li>{reviewEdits}</li>
      </ul>
    </div>
  )
}

ValidationProgress.propTypes = {
  code: PropTypes.number,
  base: PropTypes.string
}

ValidationProgress.defaultProps = {
  status: {}
}

export default ValidationProgress
