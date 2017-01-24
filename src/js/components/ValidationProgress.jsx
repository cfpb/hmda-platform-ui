import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const checkMark = <img src="/img/checkMark.svg" />

const getUploadStatus = (code) => {
  if(code < 3) return <li>Uploading ...</li>
  return <li>Upload complete {checkMark}</li>
}

const getParsingStatus = (code) => {
  if(code < 4) return null
  if(code === 4) return <li>Parsing ...</li>
  return <li>Parsing complete {checkMark}</li>
}

const getValidationStatus = (code) => {
  if(code < 7) return null
  if(code === 7) return <li>Validating ...</li>
  return <li>Validation complete {checkMark}</li>
}

const getReviewLink = (code, base) => {
  if(code < 8) return null
  return (
    <li>
      <Link className='usa-button' to={base + '/edits'}>Review Edits</Link>
    </li>
  )
}

const ValidationProgress = (props) => {
  const code = props.status.code

  return (
    <ul className="ValidationProgress usa-unstyled-list">
      {getUploadStatus(code)}
      {getParsingStatus(code)}
      {getValidationStatus(code)}
      {getReviewLink(code, props.base)}
    </ul>
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
