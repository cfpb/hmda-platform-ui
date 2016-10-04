import React, { PropTypes } from 'react'

const ValidationProgress = (props) => {
  const code = props.status.code

  let uploadComplete = null
  let parsingStatus = null
  let validationStatus = null

  if(code > 2) uploadComplete = 'Upload complete'
  if(code > 3) parsingStatus = 'Parsing started...'
  if(code > 4) parsingStatus = 'Parsing complete'
  if(code > 5) validationStatus = 'Validation started...'
  if(code > 6) validationStatus = 'Validation complete'

  return (
    <ul className="ValidationProgress usa-sidenav-list">
      <li><a href="">{uploadComplete}</a></li>
      <li><a href="">{parsingStatus}</a></li>
      <li><a href="">{validationStatus}</a></li>
    </ul>
  )
}

ValidationProgress.propTypes = {
  code: PropTypes.number
}

ValidationProgress.defaultProps = {
  status: {}
}

export default ValidationProgress
